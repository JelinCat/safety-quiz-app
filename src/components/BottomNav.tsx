import { navItems } from '@/data/mockData';
import { Shield, Lightbulb, Heart, User } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const iconMap: Record<string, React.ElementType> = {
  shield: Shield,
  lightbulb: Lightbulb,
  heart: Heart,
  user: User
};

export default function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-2 py-[2px] flex items-center z-40">
      {navItems.map((item) => {
        const IconComponent = iconMap[item.icon] || Shield;
        return (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`flex-1 flex flex-col items-center gap-1 py-2 rounded-xl transition-all ${
              activeTab === item.id
                ? 'text-blue-500'
                : 'text-gray-400'
            }`}
          >
            <IconComponent className="w-5 h-5" />
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}