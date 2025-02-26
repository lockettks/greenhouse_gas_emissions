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
  parsing: true,
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
// const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']

// export const data = {
//   labels: labels,
//   datasets: [
//     {
//       fill: true,
//       label: 'Dataset 1',
//       id: 1,
//       data: labels.map(() => Math.random() * 1000),
//       borderColor: 'rgb(235,53,102)',
//       backgroundColor: 'rgba(235,53,102, 0.5)',
//     },
//     {
//       fill: true,
//       label: 'Dataset 2',
//       id: 2,
//       data: labels.map(() => Math.random() * 1000),
//       borderColor: 'rgb(53, 162, 235)',
//       backgroundColor: 'rgba(53, 162, 235, 0.5)',
//     },
//   ],
// }

const toDelete = {
  labels: [
    '2022',
    '2021',
    '2020',
    '2019',
    '2018',
    '2017',
    '2016',
    '2015',
    '2014',
    '2013',
    '2012',
    '2011',
    '2010',
    '2009',
    '2008',
    '2007',
    '2006',
    '2005',
    '2004',
    '2003',
    '2002',
    '2001',
    '2000',
    '1999',
    '1998',
    '1997',
    '1996',
    '1995',
    '1994',
    '1993',
    '1992',
    '1991',
    '1990',
    '1989',
  ],
  datasets: [
    {
      label: 'United States',
      id: 0,
      data: [
        6046.2157, 5997.6507, 5671.6044, 6212.4567, 6337.3997, 6151.7724, 6206.2848, 6328.9979, 6448.3313, 6409.4189,
        6268.253, 6509.5922, 6709.5343, 6461.8831, 6927.6771, 7106.6268, 7011.7599, 7123.6333, 7110.399, 7015.2909,
        6947.4117, 7118.6222, 7203.3344, 7043.7367, 7038.5345, 6992.3475, 6711.3773, 6543.4297, 6479.2191, 6372.3574,
        6249.6825, 6151.7909, 6209.2947, 6291.0606,
      ],
    },
  ],
}

export const Visualization = ({ labels, datasets }) => {
  const data = {
    labels: labels,
    datasets: datasets,
    // datasets: [
    //   {
    //     fill: true,
    //     label: 'Dataset 1',
    //     id: 1,
    //     data: labels.map(() => Math.random() * 1000),
    //     // borderColor: 'rgb(235,53,102)',
    //     // backgroundColor: 'rgba(235,53,102, 0.5)',
    //   },
    //   {
    //     fill: true,
    //     label: 'Dataset 2',
    //     id: 2,
    //     data: labels.map(() => Math.random() * 1000),
    //     borderColor: 'rgb(53, 162, 235)',
    //     backgroundColor: 'rgba(53, 162, 235, 0.5)',
    //   },
    // ],
  }

  return (
    <Card title="Visualization">
      <Line options={options} data={data} style={{ width: '100%', height: '100%' }} />
    </Card>
  )
}
