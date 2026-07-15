import { useState, useEffect, useMemo, useRef, useLayoutEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Lightbulb, BookMarked } from 'lucide-react';
import { getQuizByCategory, getRandomUnlearnedQuestions, markQuestionLearned, getLearnedQuestions, QuizQuestion } from '@/data/quizData';
import OptimizedImage from '@/components/OptimizedImage';

export default function Quiz() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const initializedRef = useRef(false);

  const quizCategory = useMemo(() => getQuizByCategory(categoryId || 'home'), [categoryId]);
  const totalQuestions = quizCategory?.questions.length || 0;

  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswering, setIsAnswering] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [learnedCount, setLearnedCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useLayoutEffect(() => {
    if (categoryId && !initializedRef.current) {
      initializedRef.current = true;
      const randomQuestions = getRandomUnlearnedQuestions(categoryId);
      const learned = getLearnedQuestions();
      const categoryQuestions = quizCategory?.questions || [];
      const count = categoryQuestions.filter(q => learned.has(q.id)).length;
      
      setQuestions(randomQuestions);
      setCurrentIndex(0);
      setSelectedAnswer(null);
      setIsAnswering(false);
      setCorrectCount(0);
      setLearnedCount(count);
      setIsLoading(false);
    }
  }, [categoryId]);

  useEffect(() => {
    if (categoryId && initializedRef.current && questions.length > 0) {
      const learned = getLearnedQuestions();
      const categoryQuestions = quizCategory?.questions || [];
      const count = categoryQuestions.filter(q => learned.has(q.id)).length;
      setLearnedCount(count);
    }
  }, [categoryId, questions.length]);

  if (!quizCategory) {
    return (
      <div className="h-full bg-[#f0f0f0] flex items-center justify-center">
        <div className="text-center">题库不存在</div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="h-full bg-white relative flex flex-col">
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
            <button onClick={() => navigate('/')} className="absolute left-4 text-gray-600 flex items-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="text-sm text-gray-500 font-medium">
              {learnedCount} / {totalQuestions}
            </span>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
            <div className="mt-4 text-gray-500 text-sm">加载中...</div>
          </div>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="h-full bg-white relative flex flex-col">
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
        <div className="bg-[#eaf0ff] px-4 py-3 relative z-30">
          <div className="flex items-center justify-center h-8">
            <button onClick={() => navigate('/')} className="absolute left-4 text-gray-600 flex items-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="text-sm text-gray-500 font-medium">
              {learnedCount} / {totalQuestions}
            </span>
          </div>
          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden mt-[1px]">
            <div
              className="h-full bg-blue-500 rounded-full"
              style={{ width: '100%' }}
            ></div>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <div className="text-lg font-bold mb-2">全部题目已学完</div>
            <div className="text-sm">恭喜你完成所有题目！</div>
          </div>
        </div>
        <div className="bg-[#eaf0ff] py-3 flex justify-around z-40">
          <button className="flex flex-col items-center text-gray-400 hover:text-blue-500 transition-colors">
            <Lightbulb className="w-6 h-6" />
          </button>
          <button className="flex flex-col items-center text-gray-400 hover:text-blue-500 transition-colors">
            <BookMarked className="w-6 h-6" />
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  const handleChoiceAnswer = (answer: string) => {
    if (isAnswering) return;
    setIsAnswering(true);
    setSelectedAnswer(answer);
    const isCorrect = answer === currentQuestion.correctAnswer;
    if (isCorrect) {
      setCorrectCount(prev => prev + 1);
      markQuestionLearned(currentQuestion.id);
      setLearnedCount(prev => prev + 1);
      setTimeout(() => {
        if (currentIndex < questions.length - 1) {
          setCurrentIndex(prev => prev + 1);
          setSelectedAnswer(null);
          setIsAnswering(false);
        } else {
          navigate('/');
        }
      }, 1200);
    } else {
      setTimeout(() => {
        navigate(`/answer/${categoryId}/${currentQuestion.id}`, {
          state: {
            categoryId,
            questionId: currentQuestion.id,
            selectedAnswer: answer,
            correctCount
          }
        });
      }, 500);
    }
  };

  const getOptionStyle = (optionId: string, isJudge = false) => {
    const bgColor = isJudge ? 'bg-[#c7dfff]' : 'bg-[#eaf0ff]';
    if (!isAnswering) {
      return `border-transparent ${bgColor} text-[#74a8fb]`;
    }
    if (optionId === currentQuestion.correctAnswer) {
      return 'border-green-500 bg-green-50 text-green-600 ring-2 ring-green-500';
    }
    if (optionId === selectedAnswer && optionId !== currentQuestion.correctAnswer) {
      return 'border-red-500 bg-red-50 text-red-600 ring-2 ring-red-500';
    }
    return `border-transparent ${bgColor} text-[#74a8fb] opacity-50`;
  };

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
          <button onClick={() => navigate('/')} className="absolute left-4 text-gray-600 flex items-center">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span className="text-sm text-gray-500 font-medium">
            {learnedCount} / {totalQuestions}
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-[60px] scrollbar-hide">
        {currentQuestion.type === 'choice' && currentQuestion.options && (
          <div className="px-4 pt-[26px] pb-4 mt-[70px]">
            <div className="font-bold text-gray-800 text-xl mb-2 flex items-start gap-2 flex-wrap text-left leading-relaxed mt-[60px] w-[380px]">
              <span className="text-[23px] w-[322px] mt-[-80px]">{currentQuestion.question}</span>
              <span className="inline-block px-2 py-0.5 bg-blue-100 text-blue-600 text-xs rounded-full flex-shrink-0 mt-[6px]">
                {quizCategory.title}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-[40px]">
              {currentQuestion.options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleChoiceAnswer(option.id)}
                  disabled={isAnswering}
                  className={`overflow-hidden rounded-xl border-2 transition-all ${getOptionStyle(option.id)}`}
                >
                  <OptimizedImage
                    src={option.imageUrl}
                    alt={option.text}
                    className="w-full h-32"
                  />
                </button>
              ))}
            </div>
          </div>
        )}

        {currentQuestion.type === 'judge' && (
          <div className="px-4 pt-[26px] pb-4 flex flex-col">
            {currentQuestion.imageUrl && (
              <div className="w-full mb-0 mt-10">
                <OptimizedImage
                  src={currentQuestion.imageUrl}
                  alt="判断题配图"
                  className="w-full h-[200px] rounded-xl"
                />
              </div>
            )}

            <div className="font-medium text-gray-800 text-xl text-left mb-0 flex items-center gap-2 justify-start flex-wrap leading-relaxed mt-[20px]">
              <span className="text-[24px]">{currentQuestion.question}</span>
              <span className="inline-block px-2 py-0.5 bg-blue-100 text-blue-600 text-xs rounded-full flex-shrink-0 mt-1">
                {quizCategory.title}
              </span>
            </div>

            <div className="flex gap-4 w-full mt-[50px]">
              <button
                onClick={() => handleChoiceAnswer('false')}
                disabled={isAnswering}
                className={`flex-1 h-[60px] rounded-2xl transition-all ${getOptionStyle('false', true)} flex items-center justify-center`}
              >
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
              <button
                onClick={() => handleChoiceAnswer('true')}
                disabled={isAnswering}
                className={`flex-1 h-[60px] rounded-2xl transition-all ${getOptionStyle('true', true)} flex items-center justify-center`}
              >
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12l5 5L20 7"/>
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-[#d7e8fe] py-3 flex justify-around z-40">
        <button className="flex flex-col items-center text-gray-400 hover:text-blue-500 transition-colors">
          <Lightbulb className="w-6 h-6" />
        </button>
        <button className="flex flex-col items-center text-gray-400 hover:text-blue-500 transition-colors">
          <BookMarked className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
