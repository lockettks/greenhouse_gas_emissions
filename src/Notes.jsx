import { Card } from 'antd'
import { Typography } from 'antd'

const { Text, Link } = Typography

export const Notes = () => {
  return (
    <Card title="Notes" style={{ marginTop: '20px' }}>
      <p>
        This is a simple application that allows users to visualize greenhouse gas emissions data from the World Bank
        API. Users can filter the data by country and date range, and view the results in a line chart.
      </p>
      <p>
        The application uses Ant Design for the UI components, Axios for API requests, and Chart.js for the data
        visualization.
      </p>
      <p>To run the application:</p>
      <ol>
        <li>
          Clone the repository:{' '}
          <Link href="https://github.com/lockettks/greenhouse_gas_emissions" target="_blank">
            Greenhouse Gas Emissions
          </Link>
        </li>
        <li>
          Install dependencies with <Text code>pnpm install</Text>
        </li>
        <li>
          Run the application with <Text code>pnpm run dev</Text>
        </li>
      </ol>
      <p>
        If this were a production app, I would be implementing the following additional functionality:
        <ul>Automated testing (unit and component level).</ul>
        <ul>Better error handling.</ul>
        <ul>Improve the UX for if a user wants to select a single year instead of a range.</ul>
        <ul>At least one additional visualization, especially when a single year is selected.</ul>
        <ul>
          Improve the responsiveness of the visualization. The chart as of right now is at the charting library's limits
          for responsiveness, so additional tooling would be required.
        </ul>
        <ul>Improve the accessibility of the application.</ul>
        <ul>Add an empty state, error state, and loading state.</ul>
        <ul>
          Depending on other project factors such as engineering team size, experience level, and the app roadmap, I
          would consider using Typescript in order to improve maintainability and dependability.
        </ul>
      </p>
    </Card>
  )
}
