import { useEffect, useState } from 'react'
import { Button, Card, Col, Form, Row, Space } from 'antd'
import axios from 'axios'
import { FilterCountries } from './FilterCountries.jsx'
import { FilterDates } from './FilterDates.jsx'
import { Visualization } from './Visualization.jsx'

export const FiltersAndVisualizations = () => {
  const [form] = Form.useForm()
  const [isSubmittable, setIsSubmittable] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const values = Form.useWatch([], form)
  const [chartData, setChartData] = useState(null)

  useEffect(() => {
    form
      .validateFields({
        validateOnly: true,
      })
      .then(() => setIsSubmittable(true))
      .catch(() => setIsSubmittable(false))
  }, [form, values])

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
    // console.log(allFields)
  }

  const handleFinish = async (values) => {
    setIsLoading(true)
    console.log(values)
    const baseURL = 'https://api.worldbank.org/v2/country/'
    const endURL = '/indicator/EN.GHG.ALL.MT.CE.AR5?format=json'
    const countriesString = form.getFieldValue('countries').join(';')
    const dates = form.getFieldValue('dates')
    const dateParams = `&date=${dates[0].year()}:${dates[1].year()}`
    const frequencyParams = `&frequency=Y`

    const url = `${baseURL}${countriesString}${endURL}${dateParams}${frequencyParams}`

    // Make initial axios get request.  If response contains multiple pages, make subsequent requests for each page.
    try {
      setIsLoading(false)
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
      setChartData(transformData(data))
      console.log(initialResponse)
    } catch (error) {
      console.error(error)
    }
  }

  const handleReset = () => {
    form.resetFields()
  }

  return (
    <>
      <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 16]} style={{ border: '1px solid orange' }}>
        {/*<Col xs={24} sm={12} md={12} lg={12} xl={10}>*/}
        <Card title="Filters" style={{ width: '100%', minHeight: '170px' }}>
          <Form
            name="filters"
            form={form}
            layout="inline"
            onFieldsChange={handleFieldsChange}
            onFinish={handleFinish}
            style={{ alignItems: 'flex-start' }}
          >
            {/*<Space direction="vertical" size="middle" style={{ display: 'flex' }}>*/}
            <FilterCountries />
            <FilterDates />
            <Space>
              <Button type="primary" htmlType="submit" disabled={!isSubmittable} loading={isLoading}>
                View data
              </Button>
              <Button onClick={handleReset}>Clear</Button>
            </Space>
            {/*</Space>*/}
          </Form>
        </Card>
        {/*</Col>*/}
      </Row>
      <Row style={{ border: '1px solid orange' }}>
        {/*<Col flex={'auto'}>*/}
        {chartData && chartData.labels && chartData.datasets && chartData.labels.length > 0 && (
          <Visualization labels={chartData.labels} datasets={chartData.datasets} />
        )}
        {/*</Col>*/}
      </Row>
    </>
  )
}

// Transform raw data into data for visualization
function transformData(rawData) {
  const data = {
    labels: [],
    datasets: [],
  }
  const countries = [...new Set(rawData.map((d) => d.country.value))]
  countries.forEach((country, i) => {
    const countryData = rawData.filter((d) => d.country.value === country)
    const dataSet = {
      label: country,
      id: i,
      data: [],
      borderColor: `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(
        Math.random() * 255,
      )})`,
      backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(
        Math.random() * 255,
      )}, 0.5)`,
    }
    countryData.forEach((d) => {
      data.labels.push(d.date)
      dataSet.data.push(d.value)
    })
    data.datasets.push(dataSet)
  })
  return data
}
