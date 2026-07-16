import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { firstAidDetails } from '@/data/mockData';
import BottomNav from '@/components/BottomNav';

export default function FirstAidDetail() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('first-aid');
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const detail = firstAidDetails.find(d => d.id === id);

  useEffect(() => {
    if (!detail) {
      navigate('/first-aid');
      return;
    }
    if (detail.tabs.length > 0) {
      setCurrentTabIndex(0);
      setCurrentStepIndex(0);
    }
  }, [id, detail, navigate]);

  const currentTab = detail?.tabs[currentTabIndex];
  const currentStep = currentTab?.steps[currentStepIndex];

  const handleStepClick = (index: number) => {
    setCurrentStepIndex(index);
  };

  const handleBack = () => {
    navigate('/first-aid');
  };

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

  if (!detail || !currentTab || !currentStep) {
    return null;
  }

  return (
    <div className="h-full bg-[#f0f0f0] relative flex flex-col">
      <div className="flex-1 overflow-y-auto pb-[74px] scrollbar-hide">
        <div className="pt-[54px]">
          <div className="bg-white border-b border-gray-100">
          <div className="flex items-center px-3 py-2 border-b border-gray-100">
            <button
              onClick={handleBack}
              className="w-[32px] h-[32px] rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-gray-200 transition-colors active:scale-95"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="flex-1"></div>
          </div>
          <div className="flex border-b border-gray-100">
            {detail.tabs.map((tab, index) => (
              <button
                key={tab.id}
                onClick={() => {
                  setCurrentTabIndex(index);
                  setCurrentStepIndex(0);
                }}
                className={`flex-1 py-3 text-center text-sm font-medium transition-colors relative ${
                  currentTabIndex === index
                    ? 'text-[#5888f9]'
                    : 'text-[#999999]'
                }`}
              >
                {tab.title}
                {currentTabIndex === index && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[50px] h-[3px] bg-[#5888f9] rounded-full"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="px-4 py-3">
          <span className="text-[#999999] text-xs">步骤 {currentStepIndex + 1} / {currentTab.steps.length}</span>
        </div>

        <div className="px-4 mb-4">
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
            <div className="relative w-full" style={{ aspectRatio: '4/3' }}>
              <img
                src={currentStep.imageUrl}
                alt={currentStep.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-[32px] h-[32px] rounded-full bg-[#5888f9] flex items-center justify-center text-white font-bold text-lg">
                  {currentStep.id}
                </div>
                <h2 className="text-lg font-bold text-gray-800">{currentStep.title}</h2>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">{currentStep.description}</p>
            </div>
          </div>
        </div>

        <div className="px-4 mb-6">
          <div className="bg-[#fff8f0] rounded-xl p-3 flex items-start gap-2">
            <svg className="w-[18px] h-[18px] text-[#ff9800] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
            </svg>
            <span className="text-[#ff9800] text-sm font-medium">
              {detail?.id === 'fire-extinguisher' ? '紧急情况立即拨打119' : '紧急情况请立即拨打120'}
            </span>
          </div>
        </div>

        <div className="flex justify-center gap-3 pb-4">
          {currentTab.steps.map((_, index) => (
            <button
              key={index}
              onClick={() => handleStepClick(index)}
              className={`w-[32px] h-[32px] rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                currentStepIndex === index
                  ? 'bg-[#5888f9] text-white shadow-md'
                  : 'bg-white text-[#999999] border border-gray-200'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
        </div>
      </div>

      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
}