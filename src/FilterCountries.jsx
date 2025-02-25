import { Card, Form, Select, Space } from 'antd'
import { useMemo } from 'react'

const options = [
  {
    label: 'USA',
    value: 'usa',
    emoji: '🇺🇸',
  },
  {
    label: 'Brazil',
    value: 'Brazil',
    emoji: '🇧🇷',
  },
  {
    label: 'China',
    value: 'china',
    emoji: '🇨🇳',
  },
  {
    label: 'France',
    value: 'france',
    emoji: '🇫🇷',
  },
  {
    label: 'India',
    value: 'india',
    emoji: '🇮🇳',
  },
  {
    label: 'Japan',
    value: 'japan',
    emoji: '🇯🇵',
  },
]

const SELECT_ALL_OPTION = { label: 'Select All', value: 'selectAll' }

const formItemName = 'countries'

// function useSelectAllOption(options) {
//   /** pass this to Form.Item's getValueFromEvent prop */
//   const getValueFromEvent = useCallback(
//     (value, selections) => {
//       if (!selections?.length) return selections
//       if (!selections?.some((s) => s.value === SELECT_ALL_OPTION.value)) {
//         return selections
//       }
//       const labelInValue = typeof value[0]?.label === 'string'
//       // if "Select All" option selected, set value to all options
//       // also keep labelInValue in consideration
//       return labelInValue ? options : options.map((o) => o.value)
//     },
//     [options],
//   )
//
//   return [getValueFromEvent, optionsWithAllOption]
// }

export const FilterCountries = () => {
  const form = Form.useFormInstance()

  const optionsWithAllOption = useMemo(() => [SELECT_ALL_OPTION, ...options], [options])
  // const [getValueFromEvent, optionsWithAllOption] = useSelectAllOption(options)

  const handleChange = (value) => {
    if (value.includes(SELECT_ALL_OPTION.value)) {
      form.setFieldValue(
        formItemName,
        options.map((option) => option.value),
      )
    }
  }

  return (
    <Card title="Countries">
      <Form.Item
        label="Countries"
        name={formItemName}
        // getValueFromEvent={getValueFromEvent}
        rules={[{ required: true, message: 'Please select at least one country' }]}
      >
        <Select
          mode="multiple"
          style={{ width: '100%' }}
          placeholder="select at least one country"
          onChange={handleChange}
          allowClear
          options={optionsWithAllOption}
          optionRender={(option) => (
            <Space>
              <span role="img" aria-label={option.data.label}>
                {option.data.emoji}
              </span>
              {option.data.label}
            </Space>
          )}
        />
      </Form.Item>
    </Card>
  )
}
