import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { firstAidCategories, CommonSenseCategory } from '@/data/mockData';
import BottomNav from '@/components/BottomNav';

export default function FirstAid() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('first-aid');

  useEffect(() => {
    if (location.pathname === '/first-aid') {
      setActiveTab('first-aid');
    }
  }, [location.pathname]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'knowledge') {
      navigate('/');
    } else if (tab === 'common') {
      navigate('/common');
    } else if (tab === 'first-aid') {
      navigate('/first-aid');
    }
  };

  const handleLearnQuiz = (category: CommonSenseCategory) => {
    console.log('学习答题:', category.title);
  };

  const handleViewContent = (category: CommonSenseCategory) => {
    console.log('查看内容:', category.title);
  };

  return (
    <div className="h-full bg-[#f0f0f0] relative flex flex-col">
      <div className="flex-1 overflow-y-auto pb-[74px] scrollbar-hide">
        <div className="px-4 pt-[54px] pb-2">
          <div className="font-bold text-gray-800 text-lg">急救知识</div>
        </div>
        
        <div className="px-4 flex flex-col gap-4">
          {firstAidCategories.map((category) => (
            <div 
              key={category.id} 
              className="bg-white rounded-xl shadow-sm overflow-hidden"
            >
              <div className="relative h-[98px] overflow-hidden">
                <img 
                  src={category.imageUrl} 
                  alt={category.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="text-white font-bold text-xl mb-1">{category.title}</div>
                  <div className="text-white/80 text-sm">{category.description}</div>
                </div>
              </div>
              
              <div className="p-4 h-[100px]">
                <div className="flex flex-wrap gap-2 mb-[10px] mt-[-6px] ml-[-8px]">
                  {category.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-[#666666] text-xs rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-3 ml-[-8px] mr-[-8px] w-[306px]">
                  <button
                    onClick={() => handleLearnQuiz(category)}
                    className="flex-1 bg-[#5888f9] text-white py-[10px] h-[40px] rounded-xl font-semibold text-sm flex items-center justify-center gap-2 active:scale-95 transition-transform"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    </svg>
                    学习答题
                  </button>
                  <button
                    onClick={() => handleViewContent(category)}
                    className="flex-1 bg-[#e8f0fe] text-[#5888f9] py-[10px] h-[40px] rounded-xl font-semibold text-sm flex items-center justify-center gap-2 active:scale-95 transition-transform"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                    查看内容
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
}