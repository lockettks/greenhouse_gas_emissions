// Transform raw data into data for visualization

// TODO: This should be unit tested
export function transformData(rawData) {
  const data = {
    labels: [],
    datasets: [],
  }
  const countries = [...new Set(rawData.map((d) => d.country.value))]
  countries.forEach((country, i) => {
    const countryData = rawData.filter((d) => d.country.value === country)
    const dataSet = {
      label: country,
      id: i,
      data: [],
      // TODO: Standardize these colors better to more distinct from each-other
      backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(
        Math.random() * 255,
      )}, 0.5)`,
    }
    countryData.forEach((d) => {
      data.labels.push(Number(d.date))
      dataSet.data.push({ x: d.date, y: d.value })
    })
    data.datasets.push(dataSet)
  })
  return data
}
