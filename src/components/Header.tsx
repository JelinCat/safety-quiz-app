import { userInfo } from '@/data/mockData';

export default function Header() {
  return (
    <div className="px-4 pt-[54px] pb-[8px]">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">安</span>
          </div>
          <div>
            <div className="text-gray-800 font-bold text-lg">{userInfo.name}</div>
          </div>
        </div>
        <div className="flex items-center gap-1 bg-orange-100 px-3 py-1.5 rounded-full">
          <span className="text-orange-500 text-sm">🔥</span>
          <span className="text-orange-600 text-sm font-medium">连续{userInfo.streakDays}天</span>
        </div>
      </div>
    </div>
  );
}