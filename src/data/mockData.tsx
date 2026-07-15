export interface UserInfo {
  name: string;
  streakDays: number;
  greeting: string;
}

import type { ReactNode } from 'react';
import { Home, Train, UtensilsCrossed, Leaf, Mountain } from 'lucide-react';

export interface KnowledgeCategory {
  id: string;
  title: string;
  description: string;
  progress: number;
  total: number;
  icon: ReactNode;
  iconBgColor: string;
  imageUrl: string;
  tags: string[];
}

export interface DailyLearning {
  id: string;
  title: string;
  question: string;
  actionText: string;
  imageUrl: string;
}

export interface NavItem {
  id: string;
  label: string;
  icon: string;
}

export interface CommonSenseCategory {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
}

export const userInfo: UserInfo = {
  name: '游客',
  streakDays: 1,
  greeting: ''
};

export const dailyLearningItems: DailyLearning[] = [
  {
    id: '1',
    title: '每日一学',
    question: '高铁站台为什么不能打伞？',
    actionText: '点击学习 →',
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=high%20speed%20train%20platform%20station%20safety%20warning%20umbrella%20danger&image_size=landscape_16_9'
  },
  {
    id: '2',
    title: '每日一学',
    question: '台风预警怎么看？',
    actionText: '点击学习 →',
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=typhoon%20weather%20warning%20signal%20storm%20clouds%20safety%20information&image_size=landscape_16_9'
  },
  {
    id: '3',
    title: '每日一学',
    question: '自行车如何正确刹车？',
    actionText: '点击学习 →',
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=bicycle%20brake%20safety%20riding%20technique%20cycling%20tips&image_size=landscape_16_9'
  }
];

export const knowledgeCategories: KnowledgeCategory[] = [
  {
    id: 'home',
    title: '居家安全',
    description: '厨房·用电·防滑·防跌倒',
    progress: 0,
    total: 36,
    icon: <Home className="w-6 h-6 text-gray-700" />,
    iconBgColor: '#FCE4EC',
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20home%20kitchen%20interior%20safety%20concept&image_size=landscape_16_9',
    tags: ['厨房安全', '用电安全', '防滑跌倒']
  },
  {
    id: 'travel',
    title: '出行安全',
    description: '交通·公共场所·户外出行',
    progress: 0,
    total: 36,
    icon: <Train className="w-6 h-6 text-gray-700" />,
    iconBgColor: '#E3F2FD',
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=public%20transportation%20subway%20station%20travel%20safety%20concept&image_size=landscape_16_9',
    tags: ['交通安全', '公共场所', '户外出行']
  },
  {
    id: 'food',
    title: '食品安全',
    description: '储存·毒素辨别·饮食风险',
    progress: 0,
    total: 32,
    icon: <UtensilsCrossed className="w-6 h-6 text-gray-700" />,
    iconBgColor: '#FFF3E0',
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fresh%20vegetables%20and%20fruits%20on%20kitchen%20table%20food%20safety%20concept&image_size=landscape_16_9',
    tags: ['储存方法', '毒素辨别', '饮食风险']
  },
  {
    id: 'animal',
    title: '动植物接触',
    description: '宠物·昆虫·野外生物防范',
    progress: 0,
    total: 24,
    icon: <Leaf className="w-6 h-6 text-gray-700" />,
    iconBgColor: '#E8F5E9',
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cute%20pets%20animals%20insects%20nature%20safety%20concept&image_size=landscape_16_9',
    tags: ['宠物安全', '昆虫防范', '野外生物']
  },
  {
    id: 'nature',
    title: '自然安全',
    description: '天气·灾害·户外生存',
    progress: 0,
    total: 38,
    icon: <Mountain className="w-6 h-6 text-gray-700" />,
    iconBgColor: '#F3E5F5',
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=nature%20landscape%20mountains%20weather%20natural%20disaster%20safety&image_size=landscape_16_9',
    tags: ['天气预警', '灾害防范', '户外生存']
  }
];

export const commonSenseCategories: CommonSenseCategory[] = [
  {
    id: 'fresh-food',
    title: '生鲜食材辨别',
    description: '肉类、蔬果、水产新鲜度判断',
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fresh%20raw%20meat%20vegetables%20fruits%20seafood%20on%20white%20kitchen%20table%20food%20quality%20inspection&image_size=landscape_16_9',
    tags: ['肉类辨识', '果蔬挑选', '海鲜鉴别']
  },
  {
    id: 'stainless-steel',
    title: '不锈钢材质辨别',
    description: '304/316型号辨识与选购技巧',
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=stainless%20steel%20cookware%20pots%20pans%20on%20white%20background%20kitchen%20utensils%20metal%20texture&image_size=landscape_16_9',
    tags: ['型号区分', '磁铁测试', '标识识别']
  },
  {
    id: 'plastic-silicone',
    title: '塑料 & 硅胶材质辨别',
    description: '回收标识解读、安全等级判断',
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=various%20plastic%20containers%20silicone%20kitchenware%20food%20storage%20boxes%20on%20white%20background&image_size=landscape_16_9',
    tags: ['回收标识', '安全等级', '材质区分']
  },
  {
    id: 'clothing-material',
    title: '衣物材质辨别',
    description: '棉麻丝毛化纤的识别与保养',
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=various%20fabric%20samples%20cotton%20linen%20silk%20wool%20textile%20materials%20on%20white%20background&image_size=landscape_16_9',
    tags: ['燃烧测试', '标签阅读', '触感辨别']
  }
];

export const firstAidCategories: CommonSenseCategory[] = [
  {
    id: 'heimlich',
    title: '海姆立克急救法',
    description: '异物卡喉的紧急处理方法',
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Heimlich%20maneuver%20first%20aid%20choking%20emergency%20medical%20illustration%20on%20white%20background&image_size=landscape_16_9',
    tags: ['成人急救', '儿童急救', '婴儿急救']
  },
  {
    id: 'fire-extinguisher',
    title: '灭火器标准使用',
    description: '各类灭火器的正确操作流程',
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fire%20extinguisher%20usage%20safety%20training%20emergency%20equipment%20on%20white%20background&image_size=landscape_16_9',
    tags: ['提握步骤', '瞄准火焰', '按压喷射']
  },
  {
    id: 'burn-treatment',
    title: '烧烫伤急救',
    description: '不同程度烧烫伤的应急处理',
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=burn%20treatment%20first%20aid%20medical%20care%20cool%20water%20bandage%20on%20white%20background&image_size=landscape_16_9',
    tags: ['冷疗降温', '伤口保护', '禁忌事项']
  },
  {
    id: 'epilepsy-response',
    title: '癫痫发作应对方法',
    description: '癫痫发作时的正确处理方式',
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=epilepsy%20seizure%20first%20aid%20medical%20emergency%20response%20safety%20illustration&image_size=landscape_16_9',
    tags: ['保持冷静', '保护头部', '清除障碍']
  }
];

export const navItems: NavItem[] = [
  { id: 'knowledge', label: '首页', icon: 'shield' },
  { id: 'common', label: '生活常识', icon: 'lightbulb' },
  { id: 'first-aid', label: '急救知识', icon: 'heart' },
  { id: 'profile', label: '我的', icon: 'user' }
];