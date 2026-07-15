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

export interface FirstAidStep {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

export interface FirstAidTab {
  id: string;
  title: string;
  steps: FirstAidStep[];
}

export interface FirstAidDetail {
  id: string;
  title: string;
  tabs: FirstAidTab[];
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

export const firstAidDetails: FirstAidDetail[] = [
  {
    id: 'heimlich',
    title: '海姆立克急救法',
    tabs: [
      {
        id: 'adult-child',
        title: '成人/儿童急救',
        steps: [
          {
            id: 1,
            title: '站到患者身后',
            description: '站在患者身后，双臂环抱其腰部。确保患者处于站立姿势，身体放松。',
            imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Heimlich%20maneuver%20step%201%20stand%20behind%20patient%20arms%20around%20waist%20medical%20illustration%20flat%20design%20blue%20white&image_size=portrait_4_3'
          },
          {
            id: 2,
            title: '握拳定位',
            description: '一手握拳，拳眼（拇指侧）朝内，放在患者肚脐上方、胸骨下方位置。',
            imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Heimlich%20maneuver%20step%202%20fist%20position%20on%20abdomen%20medical%20illustration%20flat%20design%20blue%20white&image_size=portrait_4_3'
          },
          {
            id: 3,
            title: '快速冲击',
            description: '另一手握住拳头，快速向内、向上冲击腹部。冲击方向为斜向上方。',
            imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Heimlich%20maneuver%20step%203%20quick%20thrust%20upward%20abdominal%20thrusts%20medical%20illustration%20flat%20design%20blue%20white&image_size=portrait_4_3'
          },
          {
            id: 4,
            title: '重复冲击5次',
            description: '重复冲击5次，每次冲击应为独立、有力的动作。检查异物是否排出。',
            imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Heimlich%20maneuver%20step%204%20repeat%20thrusts%20five%20times%20medical%20illustration%20flat%20design%20blue%20white&image_size=portrait_4_3'
          },
          {
            id: 5,
            title: '必要时进行CPR',
            description: '如异物未排出，继续重复以上步骤；如患者失去意识，立即放平做CPR。',
            imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=CPR%20cardiopulmonary%20resuscitation%20chest%20compressions%20medical%20illustration%20flat%20design%20blue%20white&image_size=portrait_4_3'
          }
        ]
      },
      {
        id: 'infant',
        title: '婴儿急救',
        steps: [
          {
            id: 1,
            title: '抱持婴儿',
            description: '将婴儿面朝下，趴在你的前臂上，用手托住婴儿下巴和胸部。',
            imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Heimlich%20maneuver%20infant%20step%201%20hold%20baby%20face%20down%20forearm%20medical%20illustration%20flat%20design%20blue%20white&image_size=portrait_4_3'
          },
          {
            id: 2,
            title: '背部拍击',
            description: '用另一只手的手掌根部，在婴儿两肩胛骨之间用力拍击5次。',
            imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Heimlich%20maneuver%20infant%20step%202%20back%20slaps%20between%20shoulder%20blades%20medical%20illustration%20flat%20design%20blue%20white&image_size=portrait_4_3'
          },
          {
            id: 3,
            title: '翻转婴儿',
            description: '将婴儿翻转过来，面朝上，放在你的大腿或前臂上。',
            imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Heimlich%20maneuver%20infant%20step%203%20flip%20baby%20face%20up%20medical%20illustration%20flat%20design%20blue%20white&image_size=portrait_4_3'
          },
          {
            id: 4,
            title: '胸部冲击',
            description: '用食指和中指在婴儿乳头连线下方，快速向内向上按压5次。',
            imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Heimlich%20maneuver%20infant%20step%204%20chest%20thrusts%20below%20nipple%20line%20medical%20illustration%20flat%20design%20blue%20white&image_size=portrait_4_3'
          },
          {
            id: 5,
            title: '交替重复',
            description: '交替进行背部拍击和胸部冲击，直到异物排出或婴儿失去意识。',
            imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Heimlich%20maneuver%20infant%20step%205%20alternate%20back%20slaps%20chest%20thrusts%20medical%20illustration%20flat%20design%20blue%20white&image_size=portrait_4_3'
          }
        ]
      },
      {
        id: 'self-rescue',
        title: '自救',
        steps: [
          {
            id: 1,
            title: '寻找支撑物',
            description: '迅速寻找椅背、桌角或其他坚固的水平物体作为支撑。',
            imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Heimlich%20self%20rescue%20step%201%20find%20chair%20back%20support%20medical%20illustration%20flat%20design%20blue%20white&image_size=portrait_4_3'
          },
          {
            id: 2,
            title: '定位腹部',
            description: '将腹部顶住支撑物边缘，位置在肚脐上方、胸骨下方。',
            imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Heimlich%20self%20rescue%20step%202%20position%20abdomen%20against%20chair%20edge%20medical%20illustration%20flat%20design%20blue%20white&image_size=portrait_4_3'
          },
          {
            id: 3,
            title: '快速冲击',
            description: '身体前倾，利用身体重量快速向下冲击腹部，产生向上的推力。',
            imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Heimlich%20self%20rescue%20step%203%20lean%20forward%20thrust%20abdomen%20medical%20illustration%20flat%20design%20blue%20white&image_size=portrait_4_3'
          },
          {
            id: 4,
            title: '重复动作',
            description: '重复冲击动作，直到异物排出或有人前来协助。',
            imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Heimlich%20self%20rescue%20step%204%20repeat%20thrusts%20medical%20illustration%20flat%20design%20blue%20white&image_size=portrait_4_3'
          },
          {
            id: 5,
            title: '寻求帮助',
            description: '在自救的同时，大声呼救，吸引周围人的注意。',
            imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Heimlich%20self%20rescue%20step%205%20call%20for%20help%20shout%20medical%20illustration%20flat%20design%20blue%20white&image_size=portrait_4_3'
          }
        ]
      }
    ]
  },
  {
    id: 'fire-extinguisher',
    title: '灭火器标准使用',
    tabs: [
      {
        id: 'operation',
        title: '操作步骤',
        steps: [
          {
            id: 1,
            title: '提起灭火器',
            description: '将灭火器从存放位置提起，握住提把，保持竖直状态。',
            imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fire%20extinguisher%20step%201%20pick%20up%20hold%20handle%20safety%20training%20illustration%20flat%20design%20blue%20white&image_size=portrait_4_3'
          },
          {
            id: 2,
            title: '拔掉保险销',
            description: '用手拔掉灭火器顶部的保险销，解除锁定状态。',
            imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fire%20extinguisher%20step%202%20pull%20safety%20pin%20safety%20training%20illustration%20flat%20design%20blue%20white&image_size=portrait_4_3'
          },
          {
            id: 3,
            title: '握住喷管',
            description: '一只手握住喷管，对准火焰根部，保持适当距离。',
            imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fire%20extinguisher%20step%203%20aim%20nozzle%20at%20fire%20base%20safety%20training%20illustration%20flat%20design%20blue%20white&image_size=portrait_4_3'
          },
          {
            id: 4,
            title: '按压喷射',
            description: '另一只手按压手柄，开始喷射灭火剂，左右摆动喷管。',
            imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fire%20extinguisher%20step%204%20squeeze%20handle%20spray%20extinguishant%20safety%20training%20illustration%20flat%20design%20blue%20white&image_size=portrait_4_3'
          },
          {
            id: 5,
            title: '检查余火',
            description: '灭火后继续观察，确保无复燃，如有必要重复喷射。',
            imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fire%20extinguisher%20step%205%20check%20remaining%20fire%20ensure%20extinguished%20safety%20training%20illustration%20flat%20design%20blue%20white&image_size=portrait_4_3'
          }
        ]
      }
    ]
  },
  {
    id: 'burn-treatment',
    title: '烧烫伤急救',
    tabs: [
      {
        id: 'treatment',
        title: '急救步骤',
        steps: [
          {
            id: 1,
            title: '迅速脱离热源',
            description: '立即用冷水冲洗或浸泡伤处，持续15-30分钟，降低皮肤温度。',
            imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=burn%20treatment%20step%201%20cool%20water%20flush%20first%20aid%20medical%20illustration%20flat%20design%20blue%20white&image_size=portrait_4_3'
          },
          {
            id: 2,
            title: '脱掉覆盖物',
            description: '小心脱去伤处的衣物或饰品，必要时可剪开。',
            imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=burn%20treatment%20step%202%20remove%20clothing%20jewelry%20first%20aid%20medical%20illustration%20flat%20design%20blue%20white&image_size=portrait_4_3'
          },
          {
            id: 3,
            title: '覆盖伤口',
            description: '用干净的纱布或毛巾轻轻覆盖伤口，保持清洁。',
            imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=burn%20treatment%20step%203%20cover%20wound%20gauze%20bandage%20first%20aid%20medical%20illustration%20flat%20design%20blue%20white&image_size=portrait_4_3'
          },
          {
            id: 4,
            title: '及时就医',
            description: '严重烧烫伤立即拨打120，送往医院治疗。',
            imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=burn%20treatment%20step%204%20call%20ambulance%20120%20first%20aid%20medical%20illustration%20flat%20design%20blue%20white&image_size=portrait_4_3'
          },
          {
            id: 5,
            title: '注意禁忌',
            description: '不要涂抹牙膏、酱油等，不要挑破水泡，不要用冰块直接冰敷。',
            imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=burn%20treatment%20step%205%20do%20not%20apply%20toothpaste%20soy%20sauce%20first%20aid%20medical%20illustration%20flat%20design%20blue%20white&image_size=portrait_4_3'
          }
        ]
      }
    ]
  },
  {
    id: 'epilepsy-response',
    title: '癫痫发作应对方法',
    tabs: [
      {
        id: 'response',
        title: '应对步骤',
        steps: [
          {
            id: 1,
            title: '保持冷静',
            description: '保持镇定，不要惊慌，立即拨打120急救电话。',
            imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=epilepsy%20seizure%20response%20step%201%20stay%20calm%20call%20120%20first%20aid%20medical%20illustration%20flat%20design%20blue%20white&image_size=portrait_4_3'
          },
          {
            id: 2,
            title: '保护头部',
            description: '用衣物或软垫垫在患者头部下方，防止撞击受伤。',
            imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=epilepsy%20seizure%20response%20step%202%20protect%20head%20pillow%20cushion%20first%20aid%20medical%20illustration%20flat%20design%20blue%20white&image_size=portrait_4_3'
          },
          {
            id: 3,
            title: '清除障碍',
            description: '移开患者周围的桌椅等危险物品，保持周围环境安全。',
            imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=epilepsy%20seizure%20response%20step%203%20clear%20surroundings%20remove%20obstacles%20first%20aid%20medical%20illustration%20flat%20design%20blue%20white&image_size=portrait_4_3'
          },
          {
            id: 4,
            title: '松开衣物',
            description: '松开患者衣领、腰带等紧身衣物，保持呼吸通畅。',
            imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=epilepsy%20seizure%20response%20step%204%20loosen%20clothing%20collar%20belt%20first%20aid%20medical%20illustration%20flat%20design%20blue%20white&image_size=portrait_4_3'
          },
          {
            id: 5,
            title: '观察等待',
            description: '不要强行按住患者，不要往嘴里塞东西，静静等待发作结束。',
            imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=epilepsy%20seizure%20response%20step%205%20observe%20wait%20do%20not%20restrain%20first%20aid%20medical%20illustration%20flat%20design%20blue%20white&image_size=portrait_4_3'
          }
        ]
      }
    ]
  }
];

export const navItems: NavItem[] = [
  { id: 'knowledge', label: '首页', icon: 'shield' },
  { id: 'first-aid', label: '急救知识', icon: 'heart' },
  { id: 'common', label: '生活常识', icon: 'lightbulb' },
  { id: 'profile', label: '我的', icon: 'user' }
];

export interface CommonSenseDetailSection {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  tag?: string;
  tagColor?: string;
}

export interface CommonSenseDetail {
  id: string;
  title: string;
  tabs: {
    id: string;
    title: string;
    sections: CommonSenseDetailSection[];
  }[];
  comparison?: {
    headers: string[];
    rows: {
      model: string;
      nickelChromium: string;
      corrosionResistance: string;
      foodSafety: string;
      price: string;
    }[];
  };
  coreDifferences?: {
    title: string;
    items: {
      icon: string;
      title: string;
      content: string;
    }[];
  };
}

export const stainlessSteelDetail: CommonSenseDetail = {
  id: 'stainless-steel',
  title: '不锈钢材质辨别',
  tabs: [
    {
      id: 'types',
      title: '类型',
      sections: [
        {
          id: 'intro',
          title: '',
          content: '常见不锈钢型号有201、304、316三种，家用建议选择304或316食品级不锈钢。',
          imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=three%20types%20of%20stainless%20steel%20cookware%20pots%20side%20by%20side%20kitchen%20utensils%20comparison%20201%20304%20316%20on%20white%20background&image_size=landscape_16_9',
          tag: '',
          tagColor: ''
        },
        {
          id: '201',
          title: '201不锈钢',
          content: '含锰较高，防腐性能较差。价格低廉，常用于工业用途，不建议作为食品接触容器。',
          tag: '工业级',
          tagColor: 'bg-red-100 text-red-600'
        },
        {
          id: '304',
          title: '304不锈钢',
          content: '最常用的食品级不锈钢，含镍约8-10%、铬约18-20%。适合日常厨具使用。',
          tag: '食品级',
          tagColor: 'bg-green-100 text-green-600'
        },
        {
          id: '316',
          title: '316不锈钢',
          content: '医疗级不锈钢，含钼约2-3%，耐腐蚀性能更优。适合高要求的医疗设备和沿海地区使用。',
          tag: '医疗级',
          tagColor: 'bg-blue-100 text-blue-600'
        }
      ]
    },
    {
      id: 'identify',
      title: '辨别',
      sections: [
        {
          id: 'mark',
          title: '标识辨别',
          content: '查看锅具底部或包装上的标识，如"SUS304"、"SUS316"或"18/10"、"18/8"等字样。这是最直接的辨别方式。',
          imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=stainless%20steel%20pot%20bottom%20with%20SUS304%20marking%20close%20up%20macro%20shot%20kitchen%20cookware%20identification&image_size=landscape_16_9',
          tag: '最准确',
          tagColor: 'bg-green-100 text-green-600'
        },
        {
          id: 'magnet',
          title: '磁铁测试',
          content: '304/316不锈钢通常无磁性或弱磁性，201不锈钢可能有弱磁性。此方法仅供参考，不绝对准确。',
          imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=hand%20holding%20magnet%20testing%20stainless%20steel%20pot%20magnetic%20test%20method%20kitchenware%20identification&image_size=landscape_16_9',
          tag: '辅助方法',
          tagColor: 'bg-orange-100 text-orange-600'
        }
      ]
    },
    {
      id: 'usage',
      title: '用途',
      sections: [
        {
          id: '201-use',
          title: '201不锈钢用途',
          content: '适用于装饰材料、建筑装饰、工业货架等非食品接触场景，不建议用于厨房厨具。',
          tag: '工业用途',
          tagColor: 'bg-red-100 text-red-600'
        },
        {
          id: '304-use',
          title: '304不锈钢用途',
          content: '适用于餐具、厨具、食品加工设备、保温杯、厨房水槽等食品接触场景，是家庭首选。',
          tag: '家庭首选',
          tagColor: 'bg-green-100 text-green-600'
        },
        {
          id: '316-use',
          title: '316不锈钢用途',
          content: '适用于医疗器械、化学设备、沿海地区建筑、高端厨具等对耐腐蚀要求极高的场景。',
          tag: '高端应用',
          tagColor: 'bg-blue-100 text-blue-600'
        }
      ]
    },
    {
      id: 'comparison',
      title: '对比',
      sections: []
    },
    {
      id: 'tips',
      title: '选购提示',
      sections: [
        {
          id: 'tip1',
          title: '看标识',
          content: '优先选择明确标注"SUS304"、"SUS316"、"18/10"或"食品级"的产品。',
          tag: '关键',
          tagColor: 'bg-green-100 text-green-600'
        },
        {
          id: 'tip2',
          title: '看价格',
          content: '同等规格下，304价格高于201，316价格高于304。过于便宜的不锈钢厨具需谨慎购买。',
          tag: '参考',
          tagColor: 'bg-orange-100 text-orange-600'
        },
        {
          id: 'tip3',
          title: '看品牌',
          content: '选择知名品牌产品，质量更有保障。避免购买无品牌、无标识的三无产品。',
          tag: '建议',
          tagColor: 'bg-blue-100 text-blue-600'
        }
      ]
    }
  ],
  comparison: {
    headers: ['型号', '镍铬含量', '耐腐蚀', '食品安全', '价格'],
    rows: [
      { model: '201', nickelChromium: '低', corrosionResistance: '差', foodSafety: '不建议', price: '低' },
      { model: '304', nickelChromium: '高', corrosionResistance: '好', foodSafety: '食品级', price: '中' },
      { model: '316', nickelChromium: '更高', corrosionResistance: '优秀', foodSafety: '医疗级', price: '高' }
    ]
  },
  coreDifferences: {
    title: '核心差异',
    items: [
      {
        icon: '成分差异',
        title: '成分差异',
        content: '316比304多含2%钼元素，大幅提升耐腐蚀性。201以锰代镍，成本降低但性能下降。'
      },
      {
        icon: '耐腐蚀性',
        title: '耐腐蚀性',
        content: '316 > 304 >> 201。201在潮湿环境中数月即可出现锈蚀，304和316则表现良好。'
      }
    ]
  }
};

export const plasticSiliconeDetail: CommonSenseDetail = {
  id: 'plastic-silicone',
  title: '塑料 & 硅胶材质辨别',
  tabs: [
    {
      id: 'types',
      title: '类型',
      sections: [
        {
          id: 'intro',
          title: '',
          content: '常见塑料材质有PP、PE、PS、PVC、PET、PC等，硅胶是一种特殊的弹性材料。食品接触建议选择PP、PE、食品级硅胶。',
          imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=various%20plastic%20containers%20silicone%20kitchenware%20food%20storage%20boxes%20different%20types%20on%20white%20background&image_size=landscape_16_9',
          tag: '',
          tagColor: ''
        },
        {
          id: 'pp',
          title: 'PP（聚丙烯）',
          content: '耐热温度约-10℃~140℃，唯一可微波加热的塑料。硬度适中，耐酸碱，适合制作餐盒、水杯、奶瓶等。',
          tag: '可微波',
          tagColor: 'bg-green-100 text-green-600'
        },
        {
          id: 'pe',
          title: 'PE（聚乙烯）',
          content: '分为HDPE（高密度）和LDPE（低密度）。HDPE硬度高，适合食品容器；LDPE柔软，适合塑料袋、保鲜膜。',
          tag: '常用',
          tagColor: 'bg-blue-100 text-blue-600'
        },
        {
          id: 'pet',
          title: 'PET（聚对苯二甲酸乙二醇酯）',
          content: '透明度高，轻便。耐热温度较低（约70℃），不建议反复使用，常用于饮料瓶、一次性餐具。',
          tag: '一次性',
          tagColor: 'bg-orange-100 text-orange-600'
        },
        {
          id: 'pc',
          title: 'PC（聚碳酸酯）',
          content: '透明度极高，耐冲击。但可能释放双酚A（BPA），不建议用于婴幼儿用品和高温环境。',
          tag: '慎用',
          tagColor: 'bg-red-100 text-red-600'
        },
        {
          id: 'silicone',
          title: '硅胶',
          content: '耐热温度约-40℃~230℃，柔软有弹性，无毒无味。适合制作厨具、烘焙模具、婴幼儿用品等。',
          tag: '食品级首选',
          tagColor: 'bg-green-100 text-green-600'
        }
      ]
    },
    {
      id: 'identify',
      title: '辨别',
      sections: [
        {
          id: 'recycle-mark',
          title: '回收标识解读',
          content: '查看塑料容器底部的三角形回收标志，数字1-7代表不同材质。数字5（PP）、2（HDPE）通常是安全的食品级塑料。',
          imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=plastic%20recycling%20symbols%20numbers%201%20through%207%20on%20white%20background%20identification%20guide&image_size=landscape_16_9',
          tag: '最准确',
          tagColor: 'bg-green-100 text-green-600'
        },
        {
          id: 'touch-test',
          title: '触感辨别',
          content: 'PP材质较硬但有韧性；PE较软；PET透明光滑；硅胶柔软有弹性，摸起来有轻微粘性。',
          tag: '辅助方法',
          tagColor: 'bg-orange-100 text-orange-600'
        },
        {
          id: 'heat-test',
          title: '耐热测试',
          content: 'PP可承受开水和微波；PE耐热性中等；PET遇高温易变形；硅胶可直接放入烤箱。',
          tag: '实用技巧',
          tagColor: 'bg-blue-100 text-blue-600'
        }
      ]
    },
    {
      id: 'usage',
      title: '用途',
      sections: [
        {
          id: 'kitchen',
          title: '厨房用品',
          content: '推荐使用PP餐盒、硅胶厨具、HDPE砧板。避免使用PVC和PS制品接触食品。',
          tag: '推荐',
          tagColor: 'bg-green-100 text-green-600'
        },
        {
          id: 'baby',
          title: '婴幼儿用品',
          content: '优先选择食品级硅胶奶瓶、奶嘴，PP材质餐具。避免使用PC材质产品。',
          tag: '安全优先',
          tagColor: 'bg-blue-100 text-blue-600'
        },
        {
          id: 'storage',
          title: '食品储存',
          content: '冷藏可用PP、PE容器；冷冻建议用耐低温PP容器；避免用普通塑料高温加热。',
          tag: '注意事项',
          tagColor: 'bg-orange-100 text-orange-600'
        }
      ]
    },
    {
      id: 'comparison',
      title: '对比',
      sections: []
    },
    {
      id: 'tips',
      title: '选购提示',
      sections: [
        {
          id: 'tip1',
          title: '看标识',
          content: '选择标注"食品级"、"可微波"、"PP5"、"硅胶"的产品，避免无标识产品。',
          tag: '关键',
          tagColor: 'bg-green-100 text-green-600'
        },
        {
          id: 'tip2',
          title: '闻气味',
          content: '购买时闻一下，有刺鼻气味的塑料产品可能含有有害物质，不要购买。',
          tag: '简单有效',
          tagColor: 'bg-orange-100 text-orange-600'
        },
        {
          id: 'tip3',
          title: '选颜色',
          content: '食品接触容器优先选择无色透明或浅色产品，深色塑料可能含有更多添加剂。',
          tag: '建议',
          tagColor: 'bg-blue-100 text-blue-600'
        }
      ]
    }
  ],
  comparison: {
    headers: ['材质', '耐热温度', '食品接触', '微波适用', '建议'],
    rows: [
      { model: 'PP(5)', nickelChromium: '-10~140℃', corrosionResistance: '安全', foodSafety: '是', price: '推荐' },
      { model: 'PE(2)', nickelChromium: '-60~110℃', corrosionResistance: '安全', foodSafety: '部分', price: '推荐' },
      { model: 'PET(1)', nickelChromium: '-20~70℃', corrosionResistance: '一般', foodSafety: '否', price: '慎用' },
      { model: 'PC(7)', nickelChromium: '-10~130℃', corrosionResistance: '风险', foodSafety: '否', price: '避免' },
      { model: '硅胶', nickelChromium: '-40~230℃', corrosionResistance: '安全', foodSafety: '是', price: '推荐' }
    ]
  },
  coreDifferences: {
    title: '核心差异',
    items: [
      {
        icon: '耐热性',
        title: '耐热性',
        content: '硅胶 > PP > PC > PE > PET。选择时根据使用场景（冷藏、加热、微波）选择合适材质。'
      },
      {
        icon: '安全性',
        title: '安全性',
        content: '硅胶和PP是食品接触最安全的选择。PC可能释放BPA，PET不建议反复使用。'
      }
    ]
  }
};

export const clothingMaterialDetail: CommonSenseDetail = {
  id: 'clothing-material',
  title: '衣物材质辨别',
  tabs: [
    {
      id: 'types',
      title: '类型',
      sections: [
        {
          id: 'intro',
          title: '',
          content: '常见衣物材质有棉、麻、丝、毛、化纤（涤纶、锦纶、腈纶等）。天然材质透气舒适，化学纤维耐用易打理。',
          imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=various%20fabric%20samples%20cotton%20linen%20silk%20wool%20polyester%20textile%20swatches%20on%20white%20background&image_size=landscape_16_9',
          tag: '',
          tagColor: ''
        },
        {
          id: 'cotton',
          title: '棉（Cotton）',
          content: '天然植物纤维，吸湿性好，透气性佳，柔软舒适。适合内衣、T恤、衬衫等贴身衣物。缺点是易缩水、易皱。',
          tag: '舒适首选',
          tagColor: 'bg-green-100 text-green-600'
        },
        {
          id: 'linen',
          title: '麻（Linen）',
          content: '天然植物纤维，透气性极强，凉爽舒适，强度高。适合夏季服装、床上用品。缺点是手感较硬、易皱。',
          tag: '夏季首选',
          tagColor: 'bg-blue-100 text-blue-600'
        },
        {
          id: 'silk',
          title: '丝（Silk）',
          content: '天然动物纤维，光泽柔和，手感滑爽，吸湿透气。是高档面料，适合礼服、围巾、睡衣。价格较高，需小心护理。',
          tag: '高档面料',
          tagColor: 'bg-purple-100 text-purple-600'
        },
        {
          id: 'wool',
          title: '毛（Wool）',
          content: '天然动物纤维，保暖性极佳，吸湿排汗，弹性好。适合冬季服装、毛衣、大衣。缺点是易缩水、需干洗。',
          tag: '保暖首选',
          tagColor: 'bg-orange-100 text-orange-600'
        },
        {
          id: 'polyester',
          title: '涤纶（Polyester）',
          content: '化学纤维，强度高，耐磨，不易缩水，易打理。缺点是透气性差，易产生静电。常用于外套、运动服、混纺面料。',
          tag: '耐用',
          tagColor: 'bg-gray-100 text-gray-600'
        }
      ]
    },
    {
      id: 'identify',
      title: '辨别',
      sections: [
        {
          id: 'tag',
          title: '标签阅读',
          content: '查看衣物内侧的成分标签，正规产品会标注面料成分及比例，如"棉100%"、"棉60%+涤纶40%"。',
          imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=clothing%20care%20label%20fabric%20content%20tag%20close%20up%20on%20white%20textile%20showing%20cotton%20polyester%20blend&image_size=landscape_16_9',
          tag: '最准确',
          tagColor: 'bg-green-100 text-green-600'
        },
        {
          id: 'touch',
          title: '触感辨别',
          content: '棉质柔软有温暖感；麻质手感较硬有粗糙感；丝绸光滑凉爽；羊毛柔软有弹性；涤纶手感滑但偏硬。',
          tag: '辅助方法',
          tagColor: 'bg-orange-100 text-orange-600'
        },
        {
          id: 'burn',
          title: '燃烧测试',
          content: '棉麻燃烧像烧纸，有灰烬；丝绸燃烧像烧毛发，有黑色脆灰；羊毛燃烧有毛发味；化纤燃烧会熔化滴油，有塑料味。注意安全！',
          tag: '专业方法',
          tagColor: 'bg-red-100 text-red-600'
        }
      ]
    },
    {
      id: 'usage',
      title: '用途',
      sections: [
        {
          id: 'underwear',
          title: '内衣',
          content: '推荐纯棉或莫代尔材质，吸汗透气，减少皮肤刺激。避免化纤材质直接接触皮肤。',
          tag: '贴身首选',
          tagColor: 'bg-green-100 text-green-600'
        },
        {
          id: 'summer',
          title: '夏季服装',
          content: '棉、麻、真丝是夏季首选，透气凉爽。亚麻混纺面料兼顾舒适度和易打理。',
          tag: '凉爽透气',
          tagColor: 'bg-blue-100 text-blue-600'
        },
        {
          id: 'winter',
          title: '冬季服装',
          content: '羊毛、羊绒保暖性最好。羽绒服填充羽绒，轻便保暖。防风外套可选涤纶面料。',
          tag: '保暖御寒',
          tagColor: 'bg-orange-100 text-orange-600'
        }
      ]
    },
    {
      id: 'comparison',
      title: '对比',
      sections: []
    },
    {
      id: 'tips',
      title: '选购提示',
      sections: [
        {
          id: 'tip1',
          title: '看成分',
          content: '贴身衣物优先选择纯棉、莫代尔等天然材质。标注"100%棉"比"纯棉"更可靠。',
          tag: '关键',
          tagColor: 'bg-green-100 text-green-600'
        },
        {
          id: 'tip2',
          title: '摸手感',
          content: '相同材质下，手感柔软细腻的通常质量更好。过于便宜的"纯棉"衣物可能掺杂化纤。',
          tag: '实用技巧',
          tagColor: 'bg-orange-100 text-orange-600'
        },
        {
          id: 'tip3',
          title: '看做工',
          content: '缝线整齐、面料均匀、无异味的产品质量更有保障。注意查看洗涤说明标签。',
          tag: '建议',
          tagColor: 'bg-blue-100 text-blue-600'
        }
      ]
    }
  ],
  comparison: {
    headers: ['材质', '透气性', '保暖性', '舒适度', '易打理'],
    rows: [
      { model: '棉', nickelChromium: '好', corrosionResistance: '中', foodSafety: '高', price: '一般' },
      { model: '麻', nickelChromium: '极佳', corrosionResistance: '差', foodSafety: '中', price: '差' },
      { model: '丝', nickelChromium: '好', corrosionResistance: '差', foodSafety: '极高', price: '一般' },
      { model: '毛', nickelChromium: '中', corrosionResistance: '极佳', foodSafety: '高', price: '差' },
      { model: '涤纶', nickelChromium: '差', corrosionResistance: '中', foodSafety: '中', price: '极佳' }
    ]
  },
  coreDifferences: {
    title: '核心差异',
    items: [
      {
        icon: '天然vs化纤',
        title: '天然vs化纤',
        content: '天然材质（棉麻丝毛）透气舒适但易皱难打理；化学纤维耐用抗皱但透气性差，易产生静电。'
      },
      {
        icon: '价格差异',
        title: '价格差异',
        content: '真丝、羊绒价格最高，棉麻次之，化纤最便宜。混纺面料兼顾性能和价格。'
      }
    ]
  }
};

export const commonSenseDetails: Record<string, CommonSenseDetail> = {
  'stainless-steel': stainlessSteelDetail,
  'plastic-silicone': plasticSiliconeDetail,
  'clothing-material': clothingMaterialDetail
};