import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button, Col, ConfigProvider, Form, Grid, Layout, Row, Space, Tag, theme, Typography } from 'antd'
import { FilterCountries } from './FilterCountries.jsx'
import { FilterDates } from './FilterDates.jsx'

const { Title } = Typography
const { Content, Footer } = Layout
const { useBreakpoint } = Grid

function App() {
  const [form] = Form.useForm()
  const [count, setCount] = useState(0)
  const screens = useBreakpoint()

  const {
    token: { colorBgContainer },
  } = theme.useToken()

  const onFieldsChange = (_, allFields) => {
    // Known issue: onFieldsChange is called three times
    // https://ant.design/components/form#why-does-onfieldschange-trigger-three-times-on-change-when-field-sets-rules
    console.log(allFields)
  }

  const onFinish = (values) => {
    console.log(values)
  }

  const onReset = () => {
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
          {/*<div>*/}
          {/*  <a href="https://vite.dev" target="_blank">*/}
          {/*    <img src={viteLogo} className="logo" alt="Vite logo" />*/}
          {/*  </a>*/}
          {/*</div>*/}
          <Title>Greenhouse Emissions</Title>
          <Form name="filters" form={form} onFieldsChange={onFieldsChange} onFinish={onFinish}>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} style={{ border: '1px solid orange' }}>
              <Col xs={24} sm={12} md={12} lg={12} xl={10}>
                <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                  <FilterCountries />
                  <FilterDates />
                  <Space>
                    <Button type="primary" htmlType="submit">
                      View data
                    </Button>
                    <Button onClick={onReset}>Clear</Button>
                  </Space>
                </Space>
              </Col>
              <Col flex={'auto'}></Col>
            </Row>
          </Form>
          {/*<div className="card">*/}
          {/*  <Button type='primary' onClick={() => setCount((count) => count + 1)}>*/}
          {/*    count is {count}*/}
          {/*  </Button>*/}
          {/*  <p>*/}
          {/*    Edit <code>src/App.jsx</code> and save to test HMR*/}
          {/*  </p>*/}
          {/*</div>*/}
        </Content>
        <Footer style={{ position: 'absolute', bottom: 0, width: '100%', textAlign: 'center' }}>
          <div>© {new Date().getFullYear()} Kim Mathieu. All rights reserved.</div>
        </Footer>
      </Layout>
    </ConfigProvider>
  )
}

export default App
