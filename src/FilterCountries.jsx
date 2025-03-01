import { Form, Grid, Select, Space } from 'antd'
import { useMemo } from 'react'
import { countriesConfig } from './countriesConfig.js'
const { useBreakpoint } = Grid

const SELECT_ALL_OPTION = { label: 'Select All', value: 'selectAll' }

const formItemName = 'countries' // TODO: Fix the warnings that this generates below

export const FilterCountries = () => {
  const form = Form.useFormInstance()
  const screens = useBreakpoint()

  const optionsWithAllOption = useMemo(() => [SELECT_ALL_OPTION, ...countriesConfig], [countriesConfig])

  const handleChange = (value) => {
    if (value.includes(SELECT_ALL_OPTION.value)) {
      form.setFieldValue(
        // Ignore console warning here - it's not applicable
        formItemName,
        countriesConfig.map((option) => option.value),
      )
    }
  }

  return (
    <Form.Item
      label="Countries"
      name={formItemName}
      rules={[{ required: true, message: 'Please select at least one country' }]}
    >
      <Select
        mode="multiple"
        style={screens.xs ? { minWidth: '150px' } : { width: '300px' }}
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
