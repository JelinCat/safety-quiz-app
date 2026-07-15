import { knowledgeCategories } from '@/data/mockData';
import KnowledgeCard from './KnowledgeCard';

export default function KnowledgeList() {
  const totalLearned = knowledgeCategories.reduce((sum, cat) => sum + cat.progress, 0);
  const totalItems = knowledgeCategories.reduce((sum, cat) => sum + cat.total, 0);

  return (
    <div className="px-4">
      <div className="flex justify-between items-center mb-4">
        <div className="font-bold text-gray-800 text-lg">知识自检</div>
        <div className="text-gray-400 text-sm">已学{totalLearned}/{totalItems}</div>
      </div>
      <div className="flex flex-col gap-3">
        {knowledgeCategories.map((category) => (
          <KnowledgeCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}