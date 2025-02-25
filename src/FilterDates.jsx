import { Card, DatePicker, Form } from 'antd'
import dayjs from 'dayjs'

const formItemName = 'dates'

const { RangePicker } = DatePicker

export const FilterDates = () => {
  const form = Form.useFormInstance()

  return (
    <Card title="Date Range">
      <Form.Item
        label="Date range"
        name={formItemName}
        rules={[{ required: true, message: 'Please select a date range' }]}
        initialValue={[dayjs('1972'), dayjs('2022')]}
      >
        <RangePicker
          picker="year"
          // defaultValue={[dayjs('1972'), dayjs('2022')]}
          minDate={dayjs('1972')}
          maxDate={dayjs('2025')}
        />
      </Form.Item>
      Todo: Need to find real min and max dates allowed by api
    </Card>
  )
}
