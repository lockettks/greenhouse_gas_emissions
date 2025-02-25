import { DatePicker, Form } from 'antd'
import dayjs from 'dayjs'

const formItemName = 'dates'

const { RangePicker } = DatePicker

export const FilterDates = () => {
  return (
    <Form.Item
      label="Date range"
      name={formItemName}
      rules={[{ required: true, message: 'Please select a date range' }]}
      initialValue={[dayjs('1972'), dayjs('2022')]}
    >
      <RangePicker picker="year" minDate={dayjs('1960')} maxDate={dayjs('2023')} />
    </Form.Item>
  )
}
