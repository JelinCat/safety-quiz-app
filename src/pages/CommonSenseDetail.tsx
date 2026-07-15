import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { commonSenseDetails } from '@/data/mockData';
import BottomNav from '@/components/BottomNav';

export default function CommonSenseDetail() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('common');
  const [currentTabIndex, setCurrentTabIndex] = useState(0);

  const detail = id ? commonSenseDetails[id] : null;

  useEffect(() => {
    if (!detail) {
      navigate('/common');
      return;
    }
    setCurrentTabIndex(0);
  }, [id, detail, navigate]);

  const currentTab = detail?.tabs[currentTabIndex];

  const handleBack = () => {
    navigate('/common');
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

  const handleTabClick = (index: number) => {
    setCurrentTabIndex(index);
  };

  const getStatusColor = (text: string) => {
    if (text.includes('差') || text.includes('不建议') || text.includes('避免') || text.includes('慎用') || text.includes('风险')) {
      return 'text-red-500';
    } else if (text.includes('好') || text.includes('安全') || text.includes('推荐') || text.includes('首选') || text.includes('是')) {
      return 'text-green-500';
    } else if (text.includes('极佳') || text.includes('极高') || text.includes('优秀') || text.includes('医疗')) {
      return 'text-blue-500';
    } else if (text.includes('中') || text.includes('部分') || text.includes('一般')) {
      return 'text-orange-500';
    }
    return 'text-gray-600';
  };

  if (!detail || !currentTab) {
    return null;
  }

  return (
    <div className="h-full bg-[#f5f5f5] relative flex flex-col">
      <div className="flex-1 overflow-y-auto pb-[74px] scrollbar-hide">
        <div className="pt-[54px]">
          <div className="bg-white">
            <div className="flex items-center px-3 py-3 border-b border-gray-100">
              <button
                onClick={handleBack}
                className="w-[32px] h-[32px] rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-gray-200 transition-colors active:scale-95"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className="flex-1 text-center">
                <div className="font-bold text-gray-800 text-lg">{detail.title}</div>
              </div>
              <div className="w-[32px]"></div>
            </div>
            <div className="flex border-b border-gray-100">
              {detail.tabs.map((tab, index) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(index)}
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

          {currentTab.id === 'comparison' ? (
            <div className="px-4 py-4">
              <div className="bg-white rounded-xl overflow-hidden shadow-sm">
                <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
                  <img
                    src={detail.tabs[0]?.sections[0]?.imageUrl || ''}
                    alt="对比图"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-800 text-lg mb-4">全面对比</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-100">
                          {detail.comparison?.headers.map((header, idx) => (
                            <th key={idx} className="text-left py-3 px-2 text-[#999999] font-medium">{header}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {detail.comparison?.rows.map((row, idx) => (
                          <tr key={idx} className="border-b border-gray-50 last:border-b-0">
                            <td className="py-3 px-2 font-bold text-gray-800">{row.model}</td>
                            <td className={`py-3 px-2 font-medium ${getStatusColor(row.nickelChromium)}`}>{row.nickelChromium}</td>
                            <td className={`py-3 px-2 font-medium ${getStatusColor(row.corrosionResistance)}`}>{row.corrosionResistance}</td>
                            <td className={`py-3 px-2 font-medium ${getStatusColor(row.foodSafety)}`}>{row.foodSafety}</td>
                            <td className={`py-3 px-2 font-medium ${getStatusColor(row.price)}`}>{row.price}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {detail.coreDifferences && (
                <div className="mt-4 bg-white rounded-xl p-4 shadow-sm">
                  <h3 className="font-bold text-gray-800 text-lg mb-3">{detail.coreDifferences.title}</h3>
                  {detail.coreDifferences.items.map((item, idx) => (
                    <div key={idx} className="mb-3 last:mb-0">
                      <div className="flex items-center gap-2 mb-1">
                        <svg className="w-5 h-5 text-[#5888f9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          {idx === 0 ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                          ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          )}
                        </svg>
                        <span className="font-bold text-gray-800">{item.title}</span>
                      </div>
                      <p className="text-gray-600 text-sm ml-7">{item.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="px-4 py-4 space-y-4">
              {currentTab.sections.map((section, idx) => (
                <div key={section.id} className="bg-white rounded-xl overflow-hidden shadow-sm">
                  {section.imageUrl && (
                    <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
                      <img
                        src={section.imageUrl}
                        alt={section.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    {section.tag && (
                      <span className={`inline-block px-2 py-0.5 rounded-md text-xs font-medium ${section.tagColor || 'bg-gray-100 text-gray-600'} mb-2`}>
                        {section.tag}
                      </span>
                    )}
                    {section.title && (
                      <h3 className="font-bold text-gray-800 text-lg mb-2">{section.title}</h3>
                    )}
                    <p className="text-gray-600 text-sm leading-relaxed">{section.content}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
}