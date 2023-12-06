import { images } from "../../conf/config.json";

const { backgroundPoints } = images;

export default function PointsDisplay({ points }) {
  return (
    <div className="points">
      <span id="score-displayed">{points}</span>
      <img src={backgroundPoints} alt="Points background image" />
    </div>
  );
}
