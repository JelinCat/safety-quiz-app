import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { getQuizByCategory, QuizQuestion, getLearnedQuestions } from '@/data/quizData';
import { BookMarked } from 'lucide-react';
import OptimizedImage from '@/components/OptimizedImage';

export default function AnswerPage() {
  const { categoryId, questionId } = useParams<{ categoryId: string; questionId: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const quizCategory = getQuizByCategory(categoryId || 'home');
  const question = quizCategory?.questions.find(q => q.id === questionId);

  const selectedAnswer = (location.state as { selectedAnswer?: string })?.selectedAnswer;
  const correctCount = (location.state as { correctCount?: number })?.correctCount || 0;

  const learned = getLearnedQuestions();
  const totalQuestions = quizCategory?.questions.length || 0;
  const learnedCount = quizCategory?.questions.filter(q => learned.has(q.id)).length || 0;

  if (!quizCategory || !question) {
    return (
      <div className="h-full bg-white flex items-center justify-center">
        <div className="text-center">题目不存在</div>
      </div>
    );
  }

  const handleNext = () => {
    navigate(`/quiz/${categoryId}`);
  };

  const handleBack = () => {
    navigate(`/quiz/${categoryId}`);
  };

  const getCorrectAnswerImage = () => {
    if (question.type === 'choice' && question.options) {
      const correctOption = question.options.find(opt => opt.id === question.correctAnswer);
      return correctOption?.imageUrl;
    }
    return question.imageUrl;
  };

  const correctAnswerImage = getCorrectAnswerImage();

  return (
    <div className="h-full bg-white relative flex flex-col overflow-hidden">
      <div className="bg-[#f5f5f5] h-[42px] flex items-center justify-between px-4 relative z-30">
        <div className="text-gray-900 font-medium text-[15px]">9:41</div>
        <div className="flex items-center gap-1.5">
          <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <svg className="w-4 h-4 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
          </svg>
          <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
      </div>
      <div className="bg-[#d7e8fe] px-0 py-3 relative z-30">
        <div className="flex items-center justify-end h-8 pr-4">
          <button onClick={handleBack} className="absolute left-4 text-gray-600 flex items-center">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span className="text-sm text-gray-500 font-medium">
            {learnedCount} / {totalQuestions}
          </span>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto pb-[80px] scrollbar-hide">
        <div className="px-4 pt-[26px]">
          <div className="font-bold text-gray-800 text-xl mb-2 flex items-start gap-2 flex-wrap text-left leading-relaxed">
            <span>{question.question}</span>
            <span className="inline-block px-2 py-0.5 bg-blue-100 text-blue-600 text-xs rounded-full flex-shrink-0 mt-1">
              {quizCategory.title}
            </span>
          </div>

          {correctAnswerImage && (
            <div className="w-full mt-4 mb-6 flex justify-center">
              <OptimizedImage
                src={correctAnswerImage}
                alt="正确答案配图"
                className="w-[300px] h-[200px] rounded-xl"
              />
            </div>
          )}

          <div className="mb-4">
            <span className="font-bold text-gray-800 text-lg">小知识</span>
          </div>

          <div className="space-y-3">
            {question.analysis.map((item, index) => (
              <div
                key={index}
                className="bg-[#d4e2f7] rounded-lg p-4 text-[#5e6673] leading-relaxed"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-white h-[60px] px-4 flex items-center gap-3 z-40">
        <button className="flex flex-col items-center text-gray-400 hover:text-blue-500 transition-colors">
          <BookMarked className="w-6 h-6" />
        </button>
        <button
          onClick={handleNext}
          className="h-[37px] w-[270px] rounded-xl font-bold text-lg bg-[#5888f9] text-white hover:bg-blue-700 transition-colors flex items-center justify-center mr-[8px]"
        >下一题</button>
      </div>
    </div>
  );
}
