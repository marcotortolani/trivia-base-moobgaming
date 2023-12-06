export default function QuestionsAnswered({
  questionsAnswered,
  catQuestionsTotal,
}) {
  return (
    <div className="questions-answered">
      <span>
        {questionsAnswered < 10 ? `0${questionsAnswered}` : questionsAnswered}/
        {catQuestionsTotal < 10 ? `0${catQuestionsTotal}` : catQuestionsTotal}
      </span>
    </div>
  );
}
