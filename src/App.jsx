import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button, Col, ConfigProvider, Grid, Layout, Row, theme, Typography } from 'antd'

const { Title } = Typography
const { Content, Footer } = Layout
const { useBreakpoint } = Grid

function App() {
  const [count, setCount] = useState(0)
  const screens = useBreakpoint()

  const {
    token: { colorBgContainer },
  } = theme.useToken()

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
          {/*<div>*/}
          {/*  <a href="https://vite.dev" target="_blank">*/}
          {/*    <img src={viteLogo} className="logo" alt="Vite logo" />*/}
          {/*  </a>*/}
          {/*</div>*/}
          <Title>Greenhouse Emissions</Title>
          <Row>
            <Col></Col>
            <Col></Col>
          </Row>
          {/*<div className="card">*/}
          {/*  <Button type='primary' onClick={() => setCount((count) => count + 1)}>*/}
          {/*    count is {count}*/}
          {/*  </Button>*/}
          {/*  <p>*/}
          {/*    Edit <code>src/App.jsx</code> and save to test HMR*/}
          {/*  </p>*/}
          {/*</div>*/}
        </Content>
        <Footer>
          <div>© {new Date().getFullYear()} Kim Mathieu. All rights reserved.</div>
        </Footer>
      </Layout>
    </ConfigProvider>
  )
}

export default App
