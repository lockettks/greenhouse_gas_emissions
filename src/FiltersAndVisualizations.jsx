import { useEffect, useState } from 'react'
import { Button, Card, Form, Row, Space } from 'antd'
import axios from 'axios'
import { FilterCountries } from './FilterCountries.jsx'
import { FilterDates } from './FilterDates.jsx'
import { Visualization } from './Visualization.jsx'
import { transformData } from './transformData.js'

export const FiltersAndVisualizations = () => {
  const [form] = Form.useForm()
  const [isSubmittable, setIsSubmittable] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const values = Form.useWatch([], form)
  const [chartData, setChartData] = useState(null)

  // TODO: Test this logic
  useEffect(() => {
    form
      .validateFields({
        validateOnly: true,
      })
      .then(() => setIsSubmittable(true))
      .catch(() => setIsSubmittable(false))
  }, [form, values])

  const handleFinish = async () => {
    //TODO: Put this under test
    setIsLoading(true)
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
      console.log('Raw data:', data)
      const transformedData = transformData(data)
      setChartData(transformedData)
      console.log('Transformed data:', transformedData)
    } catch (error) {
      // TODO: Handle error
      console.error(error)
    }
  }

  const handleReset = () => {
    form.resetFields()
    setChartData(null)
  }

  return (
    <Space direction={'vertical'} size="large">
      <Row>
        <Card title="Filters" style={{ width: '100%', minHeight: '170px' }}>
          <Form
            name="filters"
            form={form}
            layout="inline"
            onFinish={handleFinish}
            style={{ alignItems: 'flex-start', rowGap: '10px' }}
          >
            <FilterCountries />
            <FilterDates />
            <Space>
              <Button type="primary" htmlType="submit" disabled={!isSubmittable} loading={isLoading}>
                View data
              </Button>
              <Button onClick={handleReset}>Clear</Button>
            </Space>
          </Form>
        </Card>
      </Row>
      <Row>
        {/*TODO: ADD A LOADING STATE AND EMPTY STATE*/}
        {chartData && chartData.labels && chartData.datasets && chartData.labels.length > 0 && (
          <Visualization labels={chartData.labels} datasets={chartData.datasets} />
        )}
      </Row>
    </Space>
  )
}
