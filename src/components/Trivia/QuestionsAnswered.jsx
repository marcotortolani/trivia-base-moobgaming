export default function QuestionsAnswered({
  questionsAnswered,
  catQuestionsTotal,
  textColor,
}) {
  return (
    <div className="questions-answered" style={{ color: textColor }}>
      <span>
        {questionsAnswered < 10 ? `0${questionsAnswered}` : questionsAnswered}/
        {catQuestionsTotal < 10 ? `0${catQuestionsTotal}` : catQuestionsTotal}
      </span>
    </div>
  )
}
