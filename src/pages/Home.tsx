import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import DailyLearning from '@/components/DailyLearning';
import KnowledgeList from '@/components/KnowledgeList';
import BottomNav from '@/components/BottomNav';

export default function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('knowledge');

  useEffect(() => {
    if (location.pathname === '/') {
      setActiveTab('knowledge');
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

  return (
    <div className="h-full bg-[#f0f0f0] relative flex flex-col">
      <div className="flex-1 overflow-y-auto pb-[74px] scrollbar-hide">
        <Header />
        <DailyLearning />
        <KnowledgeList />
      </div>
      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
}