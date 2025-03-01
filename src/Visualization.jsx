import { Card } from 'antd'
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  SubTitle,
  TimeScale,
  Title,
  Tooltip,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import 'chartjs-adapter-date-fns'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  TimeScale,
  SubTitle,
  Title,
  Tooltip,
  Filler,
  Legend,
)

export const options = {
  responsive: true,
  adapters: {
    type: 'time',
  },
  parsing: true,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  scales: {
    x: {
      type: 'time',
      time: {
        unit: 'year',
      },
      title: {
        display: true,
        text: 'Year',
      },
      position: 'bottom',
    },
    y: {
      title: {
        display: true,
        text: 'Million Metric Tons CO2',
      },
    },
  },
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Greenhouse Gas Emissions',
    },
    subtitle: {
      display: true,
      text: 'Click on a country to toggle its visibility and zoom in/out',
    },
    tooltip: {
      title: {
        display: true,
      },
      callbacks: {
        label: function (tooltipItem) {
          return `${tooltipItem.dataset.label}: ${tooltipItem.raw.y.toLocaleString()} Mt CO2e`
        },
        title: function (tooltipItem) {
          // TODO: It'd be robust to get the date by parsing instead
          return tooltipItem[0].dataset.data[0].x
        },
      },
    },
  },
}

// TODO: Add this reference to the visualization
// https://data.worldbank.org/indicator/EN.GHG.ALL.MT.CE.AR5

// TODO: Add a diffusion-based cartogram visualization
export const Visualization = ({ datasets }) => {
  const data = {
    datasets: datasets,
  }

  // TODO: Make the visualization more responsive
  return (
    <Card title="Visualization" style={{ width: '100%', height: '100%' }}>
      <Line options={options} data={data} style={{ width: '100%', height: '100%' }} />
    </Card>
  )
}
