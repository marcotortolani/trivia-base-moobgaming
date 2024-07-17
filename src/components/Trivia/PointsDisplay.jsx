export default function PointsDisplay({ img, points, textColor }) {
  return (
    <div className="points">
      <span id="score-displayed" style={{ color: textColor }}>
        {points}
      </span>
      <img src={img} alt="Points background image" />
    </div>
  )
}
