import { Card } from 'antd'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend)

/*
x-axis = labels = unique years <string[]|number[]>
y-axis = dataSet[ for each country: { label = country name, data = emissions <number[]> equivalent to labels.length }]

type DataSet {
  label: string -> country name
  data: number[] -> pluck value for each year for that country
}

type data {
  labels: string,
  dataSets: DataSet[],
}
 */

export const options = {
  responsive: true,
  stacked: true,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Greenhouse Gas Emissions by Country',
    },
  },
}
const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']
export const data = {
  labels: labels,
  datasets: [
    {
      fill: true,
      label: 'Dataset 1',
      id: 1,
      data: labels.map(() => Math.random() * 1000),
      borderColor: 'rgb(235,53,102)',
      backgroundColor: 'rgba(235,53,102, 0.5)',
    },
    {
      fill: true,
      label: 'Dataset 2',
      id: 2,
      data: labels.map(() => Math.random() * 1000),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
}

export const Visualization = () => {
  return (
    <Card title="Visualization">
      <Line options={options} data={data} />
    </Card>
  )
}
