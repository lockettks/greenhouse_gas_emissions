import { useState } from 'react'
import { Button, Col, ConfigProvider, Form, Grid, Layout, Row, Space, Tag, theme, Typography } from 'antd'
import axios from 'axios'
import { FilterCountries } from './FilterCountries.jsx'
import { FilterDates } from './FilterDates.jsx'

const { Title } = Typography
const { Content, Footer } = Layout
const { useBreakpoint } = Grid

function App() {
  const [form] = Form.useForm()
  const screens = useBreakpoint()

  const {
    token: { colorBgContainer },
  } = theme.useToken()

  /*
  Their example:
    https://api.worldbank.org/v2/country/USA/indicator/EN.GHG.ALL.MT.CE.AR5?format=json

  USA and JPN, page 2
    https://api.worldbank.org/v2/country/usa;jpn/indicator/EN.GHG.ALL.MT.CE.AR5?format=json&page=2

  Doc example:
  https://data.worldbank.org/indicator/EN.GHG.CO2.AG.MT.CE.AR5?end=2024&start=2024&view=bar

  Docs:
    Argument based: https://api.worldbank.org/V2/country?incomeLevel=LIC
    URL based: https://api.worldbank.org/V2/incomeLevel/LIC/country

  Logical and
    Use a semicolon ; to represent logical “AND”. For example, us;ge specifies the United States AND Georgia.

    Example: https://api.worldbank.org/v2/country/us;ge/indicator/SI.POV.DDAY

  Date range examples:
    https://api.worldbank.org/v2/country/all/indicator/SP.POP.TOTL?date=2000:2001
    https://api.worldbank.org/v2/country/chn;bra/indicator/DPANUSSPB?date=2012M01:2012M08
    https://api.worldbank.org/v2/country/CHL/indicator/DP.DOD.DECD.CR.BC.CD?date=2013Q1:2013Q4

  Frequency: For fetching quarterly (Q), monthly (M) or yearly (Y) values. This feature currently works along with MRV. This query string is useful for querying high frequency data.
    Example: https://api.worldbank.org/v2/en/country/ind;chn/indicator/DPANUSSPF?mrv=7&frequency=M

   */

  async function getData() {
    // axios.defaults.baseURL = 'https://api.worldbank.org/v2/country/'
    // const instance = axios.create({
    //   baseURL: 'https://api.worldbank.org/v2/country/',
    //   timeout: 1000,
    //   responseType: 'json',
    //   // headers: { 'X-Custom-Header': 'foobar' },
    // })
  }

  const handleFieldsChange = (_, allFields) => {
    // Known issue: onFieldsChange is called three times
    // https://ant.design/components/form#why-does-onfieldschange-trigger-three-times-on-change-when-field-sets-rules
    console.log(allFields)
  }

  const handleFinish = async (values) => {
    console.log(values)
    const baseURL = 'https://api.worldbank.org/v2/country/'
    const endURL = '/indicator/EN.GHG.ALL.MT.CE.AR5?format=json'
    const countriesString = form.getFieldValue('countries').join(';')
    const dates = form.getFieldValue('dates')
    const dateParams = `&date=${dates[0].year()}:${dates[1].year()}`
    const frequencyParams = `&frequency=Y`
    // date=2000:2001

    const url = `${baseURL}${countriesString}${endURL}${dateParams}${frequencyParams}`

    // Make initial axios get request.  If response contains multiple pages, make subsequent requests for each page.
    try {
      const initialResponse = await axios.get(url)
      let data = initialResponse.data[1]

      // If there are multiple pages, make subsequent requests for each page
      if (initialResponse.data[0].pages > 1) {
        const pageNumberParam = `&page=`
        const pages = initialResponse.data[0].pages
        for (let i = 2; i <= pages; i++) {
          const pageResponse = await axios.get(`${url}&${pageNumberParam}${i}`)
          data = [...data, ...pageResponse.data[1]]
        }
      }

      console.log(initialResponse)
    } catch (error) {
      console.error(error)
    }
  }

  const handleReset = () => {
    form.resetFields()
  }

  return (
    <ConfigProvider theme={{ token: { colorPrimary: '#00b96b' } }}>
      <Layout>
        <Content
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
          }}
        >
          <>
            Current break point:{' '}
            {Object.entries(screens)
              .filter((screen) => !!screen[1])
              .map((screen) => (
                <Tag color="blue" key={screen[0]}>
                  {screen[0]}
                </Tag>
              ))}
          </>
          <Title>Greenhouse Emissions</Title>
          <Form name="filters" form={form} onFieldsChange={handleFieldsChange} onFinish={handleFinish}>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} style={{ border: '1px solid orange' }}>
              <Col xs={24} sm={12} md={12} lg={12} xl={10}>
                <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                  <FilterCountries />
                  <FilterDates />
                  <Space>
                    <Button type="primary" htmlType="submit">
                      View data
                    </Button>
                    <Button onClick={handleReset}>Clear</Button>
                  </Space>
                </Space>
              </Col>
              <Col flex={'auto'}></Col>
            </Row>
          </Form>
        </Content>
        <Footer style={{ position: 'absolute', bottom: 0, width: '100%', textAlign: 'center' }}>
          <div>© {new Date().getFullYear()} Kim Mathieu. All rights reserved.</div>
        </Footer>
      </Layout>
    </ConfigProvider>
  )
}

export default App
