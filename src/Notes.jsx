import { Card } from 'antd'

export const Notes = () => {
  return (
    <Card title="Notes" style={{ marginTop: '20px' }}>
      <p>
        This is a simple application that allows users to visualize greenhouse gas emissions data from the World Bank
        API. Users can filter the data by country and date range, and view the results in a line chart.
      </p>
      <p>
        The application uses Ant Design for the UI components, Axios for API requests, and Chart.js for data
        visualization.
      </p>
      <p>To run the application:</p>
      <ul>
        <li>Clone the repository</li>
        <li>Install dependencies with npm install</li>
        <li>Run the application with npm start</li>
      </ul>
    </Card>
  )
}
