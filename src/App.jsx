import { ConfigProvider, Layout, Typography } from 'antd'
import { FiltersAndVisualizations } from './FiltersAndVisualizations.jsx'
import { Notes } from './Notes.jsx'
import greenhouseSvg from './assets/greenhouse.svg'

const { Title } = Typography
const { Content, Footer } = Layout

function App() {
  return (
    <ConfigProvider theme={{ token: { colorPrimary: '#00b96b' } }}>
      <Layout>
        <Content
          style={{
            background: '#f5f5f5',
            minHeight: 280,
            padding: 24,
          }}
        >
          <Title
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'start', gap: '10px', flexWrap: 'wrap' }}
          >
            <img src={greenhouseSvg} style={{ width: '100px' }} alt="Greenhouse icon" />
            Greenhouse Gas Emissions
          </Title>
          <FiltersAndVisualizations />
          <Notes />
        </Content>
      </Layout>
      <Footer>
        <div>© {new Date().getFullYear()} Kim Mathieu. All rights reserved.</div>
      </Footer>
    </ConfigProvider>
  )
}

export default App
