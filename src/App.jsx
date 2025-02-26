import { ConfigProvider, Grid, Layout, Tag, theme, Typography } from 'antd'
import { FiltersAndVisualizations } from './FiltersAndVisualizations.jsx'

const { Title } = Typography
const { Content, Footer } = Layout
const { useBreakpoint } = Grid

function App() {
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
          <Title>Greenhouse Gas Emissions</Title>
          <FiltersAndVisualizations />
        </Content>
        <Footer style={{ position: 'absolute', bottom: 0, width: '100%', textAlign: 'center' }}>
          <div>© {new Date().getFullYear()} Kim Mathieu. All rights reserved.</div>
        </Footer>
      </Layout>
    </ConfigProvider>
  )
}

export default App
