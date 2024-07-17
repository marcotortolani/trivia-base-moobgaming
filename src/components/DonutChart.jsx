import { useMemo, useState, useEffect } from 'react'
import * as d3 from 'd3'

const MARGIN = 1

export const dataInitial = [
  { name: 'correct', value: 80, color: '' },
  { name: 'incorrect', value: 20, color: '' },
]

export const DonutChart = ({
  answers,
  colorCorrect,
  colorWrong,
  width = 170,
  height = 170,
}) => {
  const [data, setData] = useState(dataInitial)

  const valuePercentage =
    parseInt((answers.correct / (answers.correct + answers.incorrect)) * 100) ||
    0

  const radius = Math.min(width, height) / 2 - MARGIN

  const pie = useMemo(() => {
    const pieGenerator = d3.pie().value((d) => d.value)
    return pieGenerator(data)
  }, [data])

  const arcs = useMemo(() => {
    const arcPathGenerator = d3.arc()
    return pie.map((p) =>
      arcPathGenerator({
        innerRadius: 70,
        outerRadius: radius,
        startAngle: p.startAngle,
        endAngle: p.endAngle,
      })
    )
  }, [radius, pie])

  useEffect(() => {
    setData((prevData) =>
      prevData.map((d) => {
        if (d.name === 'correct') {
          return { ...d, value: answers.correct, color: colorCorrect }
        }
        if (d.name === 'incorrect') {
          return { ...d, value: answers.incorrect, color: colorWrong }
        }
        return d
      })
    )
  }, [])

  return (
    <div className=" donut-chart" style={{ width: width/2, height: height / 2 }}>
      <svg width={width} height={height}>
        <g transform={`translate(${width / 2}, ${height / 2})`}>
          {arcs.map((arc, i) => {
            return <path key={i} d={arc} fill={data[i].color} />
          })}
        </g>
      </svg>
      <span className="value">{valuePercentage}%</span>
    </div>
  )
}
