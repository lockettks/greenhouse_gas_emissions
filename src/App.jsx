import { ConfigProvider, Grid, Layout, Tag, theme, Typography } from 'antd'
import { FiltersAndVisualizations } from './FiltersAndVisualizations.jsx'
import { Notes } from './Notes.jsx'

const { Title } = Typography
const { Content } = Layout
const { useBreakpoint } = Grid

function App() {
  const {
    token: { colorBgContainer },
  } = theme.useToken()
  const screens = useBreakpoint()
  const isMobile = !screens.xl && !screens.lg && !screens.md

  return (
    <ConfigProvider theme={{ token: { colorPrimary: '#00b96b' } }}>
      <Layout>
        <Content
          style={{
            // background: colorBgContainer,
            background: '#f5f5f5',
            minHeight: 280,
            padding: 24,
            // maxWidth: '850px',
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
          <Notes />
        </Content>
      </Layout>
    </ConfigProvider>
  )
}

export default App
