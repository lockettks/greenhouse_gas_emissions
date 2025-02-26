import { Form, Select, Space } from 'antd'
import { useMemo } from 'react'

const options = [
  {
    label: 'USA',
    value: 'usa',
    emoji: '🇺🇸',
  },
  {
    label: 'Brazil',
    value: 'bra',
    emoji: '🇧🇷',
  },
  {
    label: 'China',
    value: 'chn',
    emoji: '🇨🇳',
  },
  {
    label: 'France',
    value: 'fra',
    emoji: '🇫🇷',
  },
  {
    label: 'India',
    value: 'ind',
    emoji: '🇮🇳',
  },
  {
    label: 'Japan',
    value: 'jpn',
    emoji: '🇯🇵',
  },
]

const SELECT_ALL_OPTION = { label: 'Select All', value: 'selectAll' }

const formItemName = 'countries' // TODO: Fix the warnings that this generates below

export const FilterCountries = () => {
  const form = Form.useFormInstance()

  const optionsWithAllOption = useMemo(() => [SELECT_ALL_OPTION, ...options], [options])

  const handleChange = (value) => {
    if (value.includes(SELECT_ALL_OPTION.value)) {
      form.setFieldValue(
        // Ignore console warning here - it's not applicable
        formItemName,
        options.map((option) => option.value),
      )
    }
  }

  return (
    <Form.Item
      label="Countries"
      name={formItemName}
      rules={[{ required: true, message: 'Please select at least one country' }]}
      style={{ flexGrow: 1 }}
    >
      <Select
        mode="multiple"
        style={{ width: '250px' }}
        // style={{ width: '100%' }}
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
  )
}
