import { ConfigProvider, Layout, theme, Typography } from 'antd'
import { FiltersAndVisualizations } from './FiltersAndVisualizations.jsx'

const { Title } = Typography
const { Content } = Layout

function App() {
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
          <Title>Greenhouse Gas Emissions</Title>
          <FiltersAndVisualizations />
        </Content>
      </Layout>
    </ConfigProvider>
  )
}

export default App
