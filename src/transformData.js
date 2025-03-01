// Transform raw data into data for visualization
import { countriesConfig } from './countriesConfig.js'

// TODO: This should be unit tested
export function transformData(rawData) {
  const data = {
    labels: [],
    datasets: [],
  }
  // In a production app, I would add better error handling here
  const countries = [...new Set(rawData.map((d) => d.country.value))]
  countries.forEach((country, i) => {
    const countryData = rawData.filter((d) => d.country.value.toLocaleLowerCase() === country.toLocaleLowerCase())
    const dataSet = {
      label: country,
      id: i,
      data: [],
      backgroundColor:
        countriesConfig.find((c) => c.label === country)?.color ||
        `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(
          Math.random() * 255,
        )}, 0.5)`,
    }
    countryData.forEach((d) => {
      data.labels.push(d.date)
      dataSet.data.push({ x: d.date, y: d.value })
    })
    data.datasets.push(dataSet)
  })
  return data
}
