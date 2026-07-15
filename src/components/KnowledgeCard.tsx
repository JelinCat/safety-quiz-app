import { KnowledgeCategory } from '@/data/mockData';
import { useNavigate } from 'react-router-dom';
import { getLearnedQuestions, getQuizByCategory } from '@/data/quizData';

interface KnowledgeCardProps {
  category: KnowledgeCategory;
}

export default function KnowledgeCard({ category }: KnowledgeCardProps) {
  const navigate = useNavigate();

  const learned = getLearnedQuestions();
  const quizCategory = getQuizByCategory(category.id);
  const learnedCount = quizCategory?.questions.filter(q => learned.has(q.id)).length || 0;

  const handleQuiz = () => {
    navigate(`/quiz/${category.id}`);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer p-3 flex items-center gap-4 h-[80px]" onClick={handleQuiz}>
      <div 
        className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: category.iconBgColor }}
      >
        {category.icon}
      </div>
      <div className="flex-1 min-w-0 flex flex-col items-center justify-center text-center ml-[8px]">
        <div className="font-bold text-[#1c1c28] text-sm mb-1">{category.title}</div>
        <div className="text-[#9ca3af] text-[11px] text-center tracking-[1px] w-[calc(100%+6px)]">{category.description}</div>
      </div>
      <div className="flex flex-col items-end justify-center gap-1 flex-shrink-0 ml-[20px] mr-[-6px] mt-[0px]">
        <span className="text-blue-500 font-bold text-sm">{learnedCount}/{category.total}</span>
        <div className="w-[66px] h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-500 rounded-full transition-all"
            style={{ width: `${(learnedCount / category.total) * 100}%` }}
          ></div>
        </div>
      </div>
      <svg className="w-[18.5px] h-[18.5px] text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </div>
  );
}