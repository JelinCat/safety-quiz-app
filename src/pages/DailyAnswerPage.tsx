import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { dailyLearningAnswers } from '@/data/mockData';
import { BookMarked } from 'lucide-react';
import OptimizedImage from '@/components/OptimizedImage';

export default function DailyAnswerPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const answer = id ? dailyLearningAnswers[id] : undefined;
  // 接收卡片标题参数（用于校验/扩展展示）
  const titleFromState = (location.state as { title?: string } | null)?.title;

  if (!answer) {
    return (
      <div className="h-full bg-white flex items-center justify-center">
        <div className="text-center text-gray-500">内容不存在</div>
      </div>
    );
  }

  const handleBack = () => navigate('/');
  const handleHome = () => navigate('/');

  return (
    <div className="h-full bg-white relative flex flex-col overflow-hidden">
      {/* 状态栏 */}
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

      {/* 顶部信息栏 */}
      <div className="bg-[#d7e8fe] px-0 py-3 relative z-30">
        <div className="flex items-center justify-end h-8 pr-4">
          <button onClick={handleBack} className="absolute left-4 text-gray-600 flex items-center" aria-label="返回">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span className="text-sm text-gray-500 font-medium">每日一学</span>
        </div>
      </div>

      {/* 内容区 */}
      <div className="flex-1 overflow-y-auto pb-[80px] scrollbar-hide">
        <div className="px-4 pt-[26px]">
          <div className="font-bold text-gray-800 text-xl mb-2 flex items-start gap-2 flex-wrap text-left leading-relaxed">
            <span>{titleFromState || answer.question}</span>
            <span className="inline-block px-2 py-0.5 bg-blue-100 text-blue-600 text-xs rounded-full flex-shrink-0 mt-1">
              每日一学
            </span>
          </div>

          {answer.imageUrl && (
            <div className="w-full mt-4 mb-6 flex justify-center">
              <OptimizedImage
                src={answer.imageUrl}
                alt="答案配图"
                className="w-[300px] h-[200px] rounded-xl"
              />
            </div>
          )}

          <div className="mb-4">
            <span className="font-bold text-gray-800 text-lg">小知识</span>
          </div>

          <div className="space-y-3">
            {answer.analysis.map((item, index) => (
              <div
                key={index}
                className={`rounded-lg p-3 flex gap-3 items-center ${
                  index % 2 === 0 ? 'bg-[#d4e2f7]' : 'bg-[#b8cdf0]'
                }`}
              >
                <OptimizedImage
                  src={item.image}
                  alt={item.title}
                  className="w-[72px] h-[72px] rounded-md object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-[15px] text-[#3f4654] mb-1">{item.title}</div>
                  <div className="text-sm text-[#5e6673] leading-relaxed">{item.content}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 底部操作栏 */}
      <div className="absolute bottom-0 left-0 right-0 bg-white h-[60px] px-4 flex items-center gap-3 z-40">
        <button className="flex flex-col items-center text-gray-400 hover:text-blue-500 transition-colors">
          <BookMarked className="w-6 h-6" />
        </button>
        <button
          onClick={handleHome}
          className="h-[37px] w-[270px] rounded-xl font-bold text-lg bg-[#5888f9] text-white hover:bg-blue-700 transition-colors flex items-center justify-center mr-[8px]"
        >返回首页</button>
      </div>
    </div>
  );
}
