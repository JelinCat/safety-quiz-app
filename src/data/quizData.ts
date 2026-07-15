export interface QuizOption {
  id: string;
  text: string;
  imageUrl: string;
}

export interface QuizQuestion {
  id: string;
  type: 'choice' | 'judge';
  question: string;
  options?: QuizOption[];
  imageUrl?: string;
  correctAnswer: string;
  answer: string;
  analysis: string[];
  learned?: boolean;
}

const LEARNED_KEY = 'quiz_learned_questions';

export function getLearnedQuestions(): Set<string> {
  try {
    const data = localStorage.getItem(LEARNED_KEY);
    return new Set(data ? JSON.parse(data) : []);
  } catch {
    return new Set();
  }
}

export function markQuestionLearned(questionId: string) {
  const learned = getLearnedQuestions();
  learned.add(questionId);
  localStorage.setItem(LEARNED_KEY, JSON.stringify([...learned]));
}

export function getUnlearnedQuestions(categoryId: string): QuizQuestion[] {
  const category = getQuizByCategory(categoryId);
  if (!category) return [];
  const learned = getLearnedQuestions();
  return category.questions.filter(q => !learned.has(q.id));
}

export function getRandomUnlearnedQuestions(categoryId: string): QuizQuestion[] {
  const unlearned = getUnlearnedQuestions(categoryId);
  const shuffled = [...unlearned];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export interface QuizCategory {
  id: string;
  title: string;
  questions: QuizQuestion[];
}

export const quizCategories: QuizCategory[] = [
  {
    id: 'home',
    title: '居家安全',
    questions: [
      {
        id: 'choice-1',
        type: 'choice',
        question: '下面哪种食物不能直接放进微波炉加热？',
        options: [
          { id: 'A', text: '煮熟的米饭', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cooked%20rice%20in%20bowl&image_size=square' },
          { id: 'B', text: '带壳的整颗鸡蛋', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=whole%20egg%20with%20shell&image_size=square' },
          { id: 'C', text: '切好的蔬菜', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cut%20vegetables%20on%20cutting%20board&image_size=square' },
          { id: 'D', text: '一碗清汤', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=bowl%20of%20clear%20soup&image_size=square' }
        ],
        correctAnswer: 'B',
        answer: '带壳的整颗鸡蛋',
        analysis: [
          '鸡蛋壳内的水分在微波炉加热时会变成水蒸气，体积膨胀但无法释放。',
          '这会导致内部压力急剧升高，最终可能引发爆炸，造成烫伤危险。',
          '如果需要加热鸡蛋，应先去壳并戳破蛋黄膜，或使用微波炉专用容器。'
        ]
      },
      {
        id: 'choice-2',
        type: 'choice',
        question: '微波炉可以使用以下哪种容器加热食物？',
        options: [
          { id: 'A', text: '不锈钢碗', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=stainless%20steel%20bowl&image_size=square' },
          { id: 'B', text: '带密封盖的塑料饭盒', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=plastic%20food%20container%20with%20lid&image_size=square' },
          { id: 'C', text: '标注可微波加热的玻璃碗', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=microwave%20safe%20glass%20bowl&image_size=square' },
          { id: 'D', text: '锡纸包裹的剩菜', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=aluminum%20foil%20wrapped%20food&image_size=square' }
        ],
        correctAnswer: 'C',
        answer: '标注可微波加热的玻璃碗',
        analysis: [
          '玻璃材质耐高温且不会吸收微波，是微波炉的理想容器。',
          '不锈钢和锡纸属于金属，会反射微波，可能损坏微波炉甚至引发火灾。',
          '普通塑料容器在高温下可能释放有害物质，必须选择标注"可微波加热"的产品。'
        ]
      },
      {
        id: 'choice-3',
        type: 'choice',
        question: '微波炉加热带壳的栗子会怎样？',
        options: [
          { id: 'A', text: '没有任何危险', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chestnuts%20in%20microwave%20safe&image_size=square' },
          { id: 'B', text: '栗子壳会爆炸', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=exploding%20chestnut%20shell&image_size=square' },
          { id: 'C', text: '栗子更好剥', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=easy%20to%20peel%20chestnuts&image_size=square' },
          { id: 'D', text: '栗子变得不好吃', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=bad%20tasting%20chestnuts&image_size=square' }
        ],
        correctAnswer: 'B',
        answer: '栗子壳会爆炸',
        analysis: [
          '栗子壳坚硬且密封性强，内部水分受热变成水蒸气后无法排出。',
          '压力不断积聚最终导致外壳破裂甚至爆炸，可能造成烫伤。',
          '正确做法是在栗子壳上切一个小口，让蒸汽能够顺利释放。'
        ]
      },
      {
        id: 'choice-4',
        type: 'choice',
        question: '高压锅内的食物和水量最多能装多少？',
        options: [
          { id: 'A', text: '1/2', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=pressure%20cooker%20half%20full&image_size=square' },
          { id: 'B', text: '2/3', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=pressure%20cooker%20two%20thirds%20full&image_size=square' },
          { id: 'C', text: '3/4', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=pressure%20cooker%20three%20fourths%20full&image_size=square' },
          { id: 'D', text: '装满', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=pressure%20cooker%20completely%20full&image_size=square' }
        ],
        correctAnswer: 'B',
        answer: '2/3',
        analysis: [
          '高压锅需要足够的空间让蒸汽产生和循环，装得太满会导致压力过高。',
          '特别是易膨胀的食物如豆类、粥等，建议只装1/2到2/3容量。',
          '如果装得太满，食物可能堵塞排气阀，引发安全事故。'
        ]
      },
      {
        id: 'choice-5',
        type: 'choice',
        question: '使用塑料饭盒不能装什么？',
        options: [
          { id: 'A', text: '热油', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=hot%20oil%20in%20plastic%20container&image_size=square' },
          { id: 'B', text: '冰块', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=ice%20cubes%20in%20plastic%20container&image_size=square' },
          { id: 'C', text: '酸奶', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=yogurt%20in%20plastic%20container&image_size=square' },
          { id: 'D', text: '酱油', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=soy%20sauce%20in%20plastic%20container&image_size=square' }
        ],
        correctAnswer: 'A',
        answer: '热油',
        analysis: [
          '塑料饭盒通常不耐高温，倒入热油会使塑料软化甚至熔化。',
          '高温还可能使塑料释放有害物质如塑化剂，污染食物。',
          '装热菜时应先让菜降温，或使用耐热玻璃、陶瓷容器。'
        ]
      },
      {
        id: 'choice-6',
        type: 'choice',
        question: '油锅起火了，怎么灭火？',
        options: [
          { id: 'A', text: '用水浇灭', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=water%20pouring%20on%20oil%20fire&image_size=square' },
          { id: 'B', text: '立刻用锅盖盖住', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=putting%20lid%20on%20burning%20pan&image_size=square' },
          { id: 'C', text: '用嘴吹灭', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=blowing%20on%20oil%20fire&image_size=square' },
          { id: 'D', text: '把锅扔出厨房', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=throwing%20burning%20pan%20out&image_size=square' }
        ],
        correctAnswer: 'B',
        answer: '立刻用锅盖盖住',
        analysis: [
          '盖上锅盖可以隔绝空气，火焰因缺氧而熄灭，这是最安全有效的方法。',
          '千万不能用水浇，水比油重会沉到锅底，瞬间汽化引发热油飞溅。',
          '也不要用嘴吹，会增大火势并可能烧伤自己。'
        ]
      },
      {
        id: 'choice-7',
        type: 'choice',
        question: '开着明火的燃气灶旁边最好不要做什么？',
        options: [
          { id: 'A', text: '切菜', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cutting%20vegetables%20near%20gas%20stove&image_size=square' },
          { id: 'B', text: '倒面粉', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=pouring%20flour%20near%20gas%20stove%20fire&image_size=square' },
          { id: 'C', text: '揉面', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=kneading%20dough%20near%20gas%20stove&image_size=square' },
          { id: 'D', text: '洗碗', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=washing%20dishes%20near%20gas%20stove&image_size=square' }
        ],
        correctAnswer: 'B',
        answer: '倒面粉',
        analysis: [
          '面粉是细小的粉尘，在空气中达到一定浓度时遇到明火会发生粉尘爆炸。',
          '其他选项如切菜、揉面、洗碗都是安全的厨房操作。',
          '烹饪时如需添加面粉等粉末状食材，应先关火或远离火源。'
        ]
      },
      {
        id: 'choice-8',
        type: 'choice',
        question: '燃气泄漏下面哪种做法正确？',
        options: [
          { id: 'A', text: '通电打开排气扇通风', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=turning%20on%20exhaust%20fan%20with%20gas%20leak&image_size=square' },
          { id: 'B', text: '开灯查看漏气', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=turning%20on%20light%20with%20gas%20leak&image_size=square' },
          { id: 'C', text: '到室外拨打燃气公司电话求助', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=calling%20gas%20company%20outside&image_size=square' },
          { id: 'D', text: '打开燃气灶检查', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=checking%20gas%20stove%20with%20leak&image_size=square' }
        ],
        correctAnswer: 'C',
        answer: '到室外拨打燃气公司电话求助',
        analysis: [
          '燃气泄漏时室内可能形成爆炸性混合气体，任何电器开关都可能产生火花。',
          '打开排气扇、开灯、开燃气灶等操作都可能引发爆炸。',
          '正确做法是立即关闭燃气阀门，轻轻打开门窗通风，然后到室外安全地带拨打求助电话。'
        ]
      },
      {
        id: 'judge-1',
        type: 'judge',
        question: '高压锅排气阀被食物残渣堵塞，还能继续使用',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=clogged%20pressure%20cooker%20valve&image_size=square',
        correctAnswer: 'false',
        answer: '错误',
        analysis: [
          '排气阀是高压锅的安全关键部件，负责释放多余压力。',
          '堵塞会导致锅内压力持续升高，可能引发爆炸事故。',
          '使用前必须检查排气阀是否畅通，发现堵塞应立即清理或更换。'
        ]
      },
      {
        id: 'judge-2',
        type: 'judge',
        question: '高压锅煮完食物，立刻就能开盖',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=opening%20pressure%20cooker%20immediately&image_size=square',
        correctAnswer: 'false',
        answer: '错误',
        analysis: [
          '高压锅煮完食物后，锅内仍有较高压力和温度。',
          '立即开盖会导致锅内高温高压的蒸汽和食物瞬间喷出，造成严重烫伤。',
          '必须等待压力自然释放或手动缓慢泄压后才能开盖。'
        ]
      },
      {
        id: 'judge-3',
        type: 'judge',
        question: '冰箱可以空载运行',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=empty%20refrigerator%20running&image_size=square',
        correctAnswer: 'true',
        answer: '正确',
        analysis: [
          '冰箱空载运行不会损坏设备，反而有助于清洁和除霜。',
          '但空载运行时耗电量与正常使用相差不大，因此长期空置不太经济。',
          '如果长期不使用，建议拔掉电源并保持门打开以防止异味。'
        ]
      },
      {
        id: 'judge-4',
        type: 'judge',
        question: '微波炉可以空载运行',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=empty%20microwave%20running&image_size=square',
        correctAnswer: 'false',
        answer: '错误',
        analysis: [
          '微波炉空载运行时，微波能量没有被食物吸收，会在炉腔内来回反射。',
          '这会导致磁控管过热，长期空载可能损坏微波炉。',
          '使用微波炉时必须放入食物或专用的微波吸收材料。'
        ]
      },
      {
        id: 'judge-5',
        type: 'judge',
        question: '微波炉可以加热含酒精的饮品',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=heating%20alcoholic%20drink%20in%20microwave&image_size=square',
        correctAnswer: 'false',
        answer: '错误',
        analysis: [
          '酒精的沸点较低，在微波炉中加热时会迅速汽化。',
          '酒精蒸气与空气混合可能形成爆炸性混合物，存在安全隐患。',
          '此外，酒精加热后可能燃烧，造成火灾风险。'
        ]
      },
      {
        id: 'judge-6',
        type: 'judge',
        question: '肥皂水可以检测燃气口是否漏气',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=soap%20water%20testing%20gas%20leak&image_size=square',
        correctAnswer: 'true',
        answer: '正确',
        analysis: [
          '将肥皂水涂抹在燃气管道接口处，如果有气泡产生说明存在漏气。',
          '这是一种简单有效的家庭检测方法，无需专业设备。',
          '检测时应保持通风，发现漏气后立即关闭阀门并到室外拨打求助电话。'
        ]
      },
      {
        id: 'judge-7',
        type: 'judge',
        question: '处理肉类生食和熟食可以用同一块砧板和同一把刀',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cutting%20board%20for%20raw%20and%20cooked%20meat&image_size=square',
        correctAnswer: 'false',
        answer: '错误',
        analysis: [
          '肉类生食可能含有细菌如沙门氏菌、大肠杆菌等。',
          '使用同一块砧板和刀处理熟食会造成交叉污染，增加食物中毒风险。',
          '应使用专用的砧板和刀具分别处理生食和熟食，并在使用后彻底清洗消毒。'
        ]
      },
      {
        id: 'choice-9',
        type: 'choice',
        question: '哪种取暖方式可能导致火灾？',
        options: [
          { id: 'A', text: '使用合格合规的电热毯', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=electric%20blanket%20safe%20use&image_size=square' },
          { id: 'B', text: '电热炉旁边无易燃物', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=electric%20heater%20no%20flammables&image_size=square' },
          { id: 'C', text: '使用带安全断电感应的取暖设备', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=safety%20electric%20heater&image_size=square' },
          { id: 'D', text: '在取暖器上烘烤衣物', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=drying%20clothes%20on%20heater&image_size=square' }
        ],
        correctAnswer: 'D',
        answer: '在取暖器上烘烤衣物',
        analysis: [
          '取暖器表面温度较高，直接烘烤衣物容易引燃布料，导致火灾。',
          '衣物覆盖在取暖器上还会影响散热，使设备过热引发故障。',
          '正确做法是将衣物放在通风处自然晾干，远离热源。'
        ]
      },
      {
        id: 'choice-10',
        type: 'choice',
        question: '电动车应该在哪里充电？',
        options: [
          { id: 'A', text: '家里的客厅', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=charging%20ebike%20in%20living%20room&image_size=square' },
          { id: 'B', text: '小区充电桩', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=community%20ebike%20charging%20station&image_size=square' },
          { id: 'C', text: '楼道里', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=charging%20ebike%20in%20corridor&image_size=square' },
          { id: 'D', text: '办公室里', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=charging%20ebike%20in%20office&image_size=square' }
        ],
        correctAnswer: 'B',
        answer: '小区充电桩',
        analysis: [
          '小区充电桩是专门为电动车设计的充电设施，具备过载保护、短路保护等安全功能。',
          '在家中、楼道或办公室充电缺乏安全保障，容易引发火灾，堵塞逃生通道。',
          '电动车充电时应保持通风，远离易燃物，不要过夜充电。'
        ]
      },
      {
        id: 'choice-11',
        type: 'choice',
        question: '哪种状态的锂电池不能再用？',
        options: [
          { id: 'A', text: '表面有细微划痕', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=scratched%20lithium%20battery&image_size=square' },
          { id: 'B', text: '电池鼓包/漏液/有异味', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=swollen%20leaking%20battery&image_size=square' },
          { id: 'C', text: '使用了半年', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=used%20battery%20six%20months&image_size=square' },
          { id: 'D', text: '充电速度过慢', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=slow%20charging%20battery&image_size=square' }
        ],
        correctAnswer: 'B',
        answer: '电池鼓包/漏液/有异味',
        analysis: [
          '电池鼓包说明内部化学物质已经变质，漏液和异味更是危险信号。',
          '继续使用鼓包、漏液的电池可能引发爆炸或火灾。',
          '发现电池异常应立即停止使用，交由专业机构回收处理。'
        ]
      },
      {
        id: 'choice-12',
        type: 'choice',
        question: '插座出现以下哪种情况需要立即检修？',
        options: [
          { id: 'A', text: '表面有灰尘', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=dusty%20electrical%20outlet&image_size=square' },
          { id: 'B', text: '插座发烫/有焦糊味', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=hot%20smoking%20outlet&image_size=square' },
          { id: 'C', text: '使用超过半年', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=old%20electrical%20outlet&image_size=square' },
          { id: 'D', text: '被沙发挡住', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=outlet%20blocked%20by%20sofa&image_size=square' }
        ],
        correctAnswer: 'B',
        answer: '插座发烫/有焦糊味',
        analysis: [
          '插座发烫和焦糊味是电路过载或短路的征兆，随时可能引发火灾。',
          '应立即拔掉插头，切断电源，联系电工检修或更换插座。',
          '平时使用插座时要注意不要超负荷，避免同时插过多大功率电器。'
        ]
      },
      {
        id: 'choice-13',
        type: 'choice',
        question: '三眼插座的地线有什么作用？',
        options: [
          { id: 'A', text: '装饰品没什么作用', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=ground%20wire%20useless&image_size=square' },
          { id: 'B', text: '让电器运转更快', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=faster%20appliance&image_size=square' },
          { id: 'C', text: '漏电时保护人不被电击', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=ground%20wire%20safety%20protection&image_size=square' },
          { id: 'D', text: '能省电', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=energy%20saving%20ground&image_size=square' }
        ],
        correctAnswer: 'C',
        answer: '漏电时保护人不被电击',
        analysis: [
          '地线是重要的安全保护线，当电器外壳漏电时，电流会通过地线导入大地。',
          '这样可以避免人体接触带电外壳时发生触电事故。',
          '大功率电器如冰箱、洗衣机、空调等必须使用三眼插座并正确接地。'
        ]
      },
      {
        id: 'choice-14',
        type: 'choice',
        question: '在家有人触电，急救第一步应该做什么？',
        options: [
          { id: 'A', text: '用手拉开触电者', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=pulling%20electrocuted%20person%20by%20hand&image_size=square' },
          { id: 'B', text: '用木棍等干燥绝缘物将电线挑开', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=using%20wooden%20stick%20to%20move%20wire&image_size=square' },
          { id: 'C', text: '往触电者身上泼水"断电"', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=pouring%20water%20on%20electrocuted%20person&image_size=square' },
          { id: 'D', text: '跑出屋外呼救等人来帮忙', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=running%20outside%20for%20help&image_size=square' }
        ],
        correctAnswer: 'B',
        answer: '用木棍等干燥绝缘物将电线挑开',
        analysis: [
          '用手直接接触触电者会使施救者也触电，泼水会导电扩大危险。',
          '正确做法是立即切断电源，或用木棍、竹竿等干燥绝缘物将电线挑开。',
          '脱离电源后立即检查呼吸心跳，必要时进行心肺复苏并拨打急救电话。'
        ]
      },
      {
        id: 'choice-15',
        type: 'choice',
        question: '使用电熨斗、电吹风等发热电器时，正确的做法是？',
        options: [
          { id: 'A', text: '开着去接电话一会再回来用', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=leaving%20iron%20on%20to%20answer%20phone&image_size=square' },
          { id: 'B', text: '没有断电放在纸上', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=iron%20on%20paper%20unplugged&image_size=square' },
          { id: 'C', text: '插在浴室里用', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=using%20hairdryer%20in%20bathroom&image_size=square' },
          { id: 'D', text: '人不离开，用完立刻断电', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=safety%20use%20electric%20iron&image_size=square' }
        ],
        correctAnswer: 'D',
        answer: '人不离开，用完立刻断电',
        analysis: [
          '发热电器无人看管容易因过热引发火灾，特别是电熨斗温度很高。',
          '浴室湿度大容易触电，将发热电器放在可燃物上也很危险。',
          '使用时人必须在场，用完后拔掉电源插头，确认冷却后再收起来。'
        ]
      },
      {
        id: 'choice-16',
        type: 'choice',
        question: '84消毒液不能和什么一起用？',
        options: [
          { id: 'A', text: '清水', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=84%20disinfectant%20with%20water&image_size=square' },
          { id: 'B', text: '洁厕灵', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=84%20disinfectant%20with%20toilet%20cleaner&image_size=square' },
          { id: 'C', text: '洗衣粉', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=84%20disinfectant%20with%20detergent&image_size=square' },
          { id: 'D', text: '花生油', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=84%20disinfectant%20with%20peanut%20oil&image_size=square' }
        ],
        correctAnswer: 'B',
        answer: '洁厕灵',
        analysis: [
          '84消毒液的主要成分是次氯酸钠，与洁厕灵混合会产生有毒的氯气。',
          '氯气会刺激呼吸道和眼睛，严重时可导致中毒甚至死亡。',
          '使用消毒产品时要仔细阅读说明书，不要随意混合不同的清洁剂。'
        ]
      },
      {
        id: 'choice-17',
        type: 'choice',
        question: '保温杯里能装什么？',
        options: [
          { id: 'A', text: '热水', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=thermos%20cup%20with%20hot%20water&image_size=square' },
          { id: 'B', text: '可乐', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=thermos%20cup%20with%20cola&image_size=square' },
          { id: 'C', text: '果汁', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=thermos%20cup%20with%20juice&image_size=square' },
          { id: 'D', text: '浓茶', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=thermos%20cup%20with%20strong%20tea&image_size=square' }
        ],
        correctAnswer: 'A',
        answer: '热水',
        analysis: [
          '保温杯的设计目的是保持水温，装热水是最安全的选择。',
          '可乐等碳酸饮料会产生气体，可能导致杯内压力升高。',
          '果汁和浓茶中含有酸性物质，长期盛放可能腐蚀保温杯内壁，影响健康。'
        ]
      },
      {
        id: 'choice-18',
        type: 'choice',
        question: '可以使用带有以下哪个标记的塑料制品加热食物？',
        options: [
          { id: 'A', text: 'HDPE', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=HDPE%20plastic%20container&image_size=square' },
          { id: 'B', text: 'PP', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=PP%20microwave%20safe%20container&image_size=square' },
          { id: 'C', text: 'PS', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=PS%20plastic%20container&image_size=square' },
          { id: 'D', text: 'PETE', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=PETE%20plastic%20bottle&image_size=square' }
        ],
        correctAnswer: 'B',
        answer: 'PP',
        analysis: [
          'PP（聚丙烯）耐热温度高达100-120°C，是唯一可以安全用于微波炉加热的塑料。',
          'HDPE、PS、PETE等塑料不耐高温，加热时可能释放有害物质。',
          '使用塑料制品前要查看底部的回收标志，选择标有数字5（PP）的容器。'
        ]
      },
      {
        id: 'choice-19',
        type: 'choice',
        question: '带有下面哪种不锈钢标记的餐具是安全的？',
        options: [
          { id: 'A', text: '201', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=201%20stainless%20steel%20utensils&image_size=square' },
          { id: 'B', text: '304', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=304%20stainless%20steel%20utensils&image_size=square' },
          { id: 'C', text: '430', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=430%20stainless%20steel%20utensils&image_size=square' },
          { id: 'D', text: '410', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=410%20stainless%20steel%20utensils&image_size=square' }
        ],
        correctAnswer: 'B',
        answer: '304',
        analysis: [
          '304不锈钢含有较高的铬和镍，耐腐蚀性强，是食品级不锈钢的首选。',
          '201不锈钢含镍量低，容易生锈，不适合接触食物。',
          '430和410属于铁素体不锈钢，耐腐蚀性不如304，也不推荐作为餐具使用。'
        ]
      },
      {
        id: 'judge-8',
        type: 'judge',
        question: '燃气泄漏时应该立刻开灯查看哪里漏气',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=turning%20on%20light%20with%20gas%20leak&image_size=square',
        correctAnswer: 'false',
        answer: '错误',
        analysis: [
          '燃气泄漏时室内可能形成爆炸性混合气体，开灯会产生电火花。',
          '电火花可能引爆混合气体，造成严重的爆炸事故。',
          '正确做法是立即关闭阀门，开窗通风，到室外安全地带拨打求助电话。'
        ]
      },
      {
        id: 'judge-9',
        type: 'judge',
        question: '家里插座不够用，多装四五个插线板，增加插座数量',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=multiple%20power%20strips%20daisy%20chained&image_size=square',
        correctAnswer: 'false',
        answer: '错误',
        analysis: [
          '多个插线板串联使用会导致电路过载，容易引发火灾。',
          '每个插线板都有额定功率限制，串联使用会超过安全负荷。',
          '插座不够用时应请电工增加墙插，而不是依赖插线板串联。'
        ]
      },
      {
        id: 'judge-10',
        type: 'judge',
        question: '触电急救时可以直接用手拉开触电者',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=pulling%20electrocuted%20person%20by%20hand&image_size=square',
        correctAnswer: 'false',
        answer: '错误',
        analysis: [
          '人体是良好的导体，直接用手接触触电者会使电流通过施救者身体。',
          '这会导致施救者也触电，造成更大的危险。',
          '正确做法是先切断电源，或用干燥的绝缘物将电线挑开。'
        ]
      },
      {
        id: 'judge-11',
        type: 'judge',
        question: '电动车及电池可以推进室内充电',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=charging%20ebike%20indoor&image_size=square',
        correctAnswer: 'false',
        answer: '错误',
        analysis: [
          '电动车电池在充电过程中可能过热甚至起火，室内充电风险极大。',
          '近年来因电动车室内充电引发的火灾事故频发，造成严重伤亡。',
          '应使用小区专用充电桩充电，远离居民楼和易燃物。'
        ]
      },
      {
        id: 'judge-12',
        type: 'judge',
        question: '消防通道和楼道不应堆放杂物',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=clear%20fire%20escape%20route&image_size=square',
        correctAnswer: 'true',
        answer: '正确',
        analysis: [
          '消防通道和楼道是紧急疏散和消防救援的生命通道，必须保持畅通。',
          '堆放杂物会阻碍逃生和救援，还可能成为火灾蔓延的媒介。',
          '保持通道畅通是每个居民的责任，也是消防安全的基本要求。'
        ]
      },
      {
        id: 'judge-13',
        type: 'judge',
        question: '油锅起火，立刻倒水灭火',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=pouring%20water%20on%20oil%20fire&image_size=square',
        correctAnswer: 'false',
        answer: '错误',
        analysis: [
          '水比油重，倒入油锅会沉到锅底，瞬间汽化引发热油飞溅。',
          '这会扩大火势并造成严重烫伤。',
          '正确做法是立即盖上锅盖隔绝空气，或使用灭火器灭火。'
        ]
      },
      {
        id: 'judge-14',
        type: 'judge',
        question: '衣物漂白剂可以和醋一起用',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=bleach%20with%20vinegar%20dangerous&image_size=square',
        correctAnswer: 'false',
        answer: '错误',
        analysis: [
          '漂白剂与醋混合会产生有毒的氯气，刺激呼吸道和眼睛。',
          '长期接触氯气可能导致慢性中毒，严重时危及生命。',
          '不同的清洁剂不要随意混合使用，使用前要仔细阅读说明书。'
        ]
      },
      {
        id: 'judge-15',
        type: 'judge',
        question: '可以用不耐高温的玻璃杯装热水',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=pouring%20hot%20water%20into%20thin%20glass&image_size=square',
        correctAnswer: 'false',
        answer: '错误',
        analysis: [
          '普通玻璃杯尤其是薄壁的，突然倒入热水会因热胀冷缩而炸裂。',
          '破裂的玻璃碎片可能划伤皮肤，热水还可能造成烫伤。',
          '应使用耐高温的玻璃器皿或预热后再倒入热水。'
        ]
      },
      {
        id: 'judge-16',
        type: 'judge',
        question: '用不锈钢罐子腌制酸菜',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=pickled%20vegetables%20in%20stainless%20steel&image_size=square',
        correctAnswer: 'false',
        answer: '错误',
        analysis: [
          '酸菜发酵过程中会产生大量酸性物质，会腐蚀不锈钢。',
          '被腐蚀的不锈钢可能释放重金属，污染食物，危害健康。',
          '腌制酸菜应使用陶瓷、玻璃或食品级塑料容器。'
        ]
      },
      {
        id: 'judge-17',
        type: 'judge',
        question: '用不锈钢罐子装醋',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=vinegar%20in%20stainless%20steel%20container&image_size=square',
        correctAnswer: 'false',
        answer: '错误',
        analysis: [
          '醋是酸性物质，长期接触不锈钢会发生化学反应，腐蚀容器。',
          '腐蚀产物可能混入食物中，影响健康。',
          '装醋应使用玻璃瓶或陶瓷瓶等耐腐蚀的容器。'
        ]
      }
    ]
  },
  {
    id: 'travel',
    title: '出行安全',
    questions: [
      {
        id: 'travel-choice-1',
        type: 'choice',
        question: '暂时不想让电梯门关闭的做法正确的是？',
        options: [
          { id: 'A', text: '用手挡在门中间', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=hand%20stopping%20elevator%20door&image_size=square' },
          { id: 'B', text: '用杂物卡住门', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=jamming%20elevator%20door%20with%20object&image_size=square' },
          { id: 'C', text: '把棍子横着放在门中间', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=stick%20across%20elevator%20door&image_size=square' },
          { id: 'D', text: '按住电梯开门键', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=pressing%20elevator%20open%20button&image_size=square' }
        ],
        correctAnswer: 'D',
        answer: '按住电梯开门键',
        analysis: [
          '用手挡门可能被门夹伤，用杂物或棍子卡住门会损坏电梯设备。',
          '按住开门键是电梯设计的正常操作，安全可靠。',
          '电梯门有感应装置，但主动按住开门键是最安全的方式。'
        ]
      },
      {
        id: 'travel-choice-2',
        type: 'choice',
        question: '电气设施起火时，应该用什么灭火？',
        options: [
          { id: 'A', text: '水', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=water%20fire%20extinguisher%20electrical%20fire&image_size=square' },
          { id: 'B', text: '干粉灭火器', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=dry%20powder%20fire%20extinguisher&image_size=square' },
          { id: 'C', text: '泡沫灭火器', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=foam%20fire%20extinguisher&image_size=square' },
          { id: 'D', text: '二氧化碳灭火器', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=co2%20fire%20extinguisher%20electrical&image_size=square' }
        ],
        correctAnswer: 'D',
        answer: '二氧化碳灭火器',
        analysis: [
          '电气火灾严禁用水和泡沫灭火器，会导电引发触电危险。',
          '二氧化碳灭火器不导电，能有效扑灭电气火灾且不留痕迹。',
          '干粉灭火器也可使用，但会造成设备污染，二氧化碳是最佳选择。'
        ]
      },
      {
        id: 'travel-choice-3',
        type: 'choice',
        question: '选出正确的消防逃生通道标志',
        options: [
          { id: 'A', text: '红色圆圈带斜杠', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fire%20no%20entry%20sign%20red%20circle%20slash&image_size=square' },
          { id: 'B', text: '绿色奔跑小人', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=green%20emergency%20exit%20sign%20running%20man&image_size=square' },
          { id: 'C', text: '黄色三角形警告', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=yellow%20warning%20triangle%20sign&image_size=square' },
          { id: 'D', text: '蓝色方形指示', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=blue%20information%20square%20sign&image_size=square' }
        ],
        correctAnswer: 'B',
        answer: '绿色奔跑小人',
        analysis: [
          '消防逃生通道标志采用绿色背景配白色奔跑小人图案。',
          '这是国际通用的安全出口标志，便于在紧急情况下识别。',
          '遇到火灾时应沿着绿色逃生标志指示的方向疏散。'
        ]
      },
      {
        id: 'travel-choice-4',
        type: 'choice',
        question: '选出正确使用灭火器的步骤',
        options: [
          { id: 'A', text: '提→拔→握→压', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fire%20extinguisher%20use%20steps%20correct&image_size=square' },
          { id: 'B', text: '拔→提→握→压', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fire%20extinguisher%20use%20steps%20wrong&image_size=square' },
          { id: 'C', text: '握→提→拔→压', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fire%20extinguisher%20use%20steps%20confused&image_size=square' },
          { id: 'D', text: '压→拔→提→握', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fire%20extinguisher%20use%20steps%20incorrect&image_size=square' }
        ],
        correctAnswer: 'A',
        answer: '提→拔→握→压',
        analysis: [
          '正确步骤是：提起灭火器，拔掉保险销，握住喷管，压下压把。',
          '使用时要站在上风口，对准火焰根部喷射。',
          '记住口诀"提、拔、握、压"能在紧急情况下快速操作。'
        ]
      },
      {
        id: 'travel-choice-5',
        type: 'choice',
        question: '以下哪种行为在电缆井盖附近是安全的？',
        options: [
          { id: 'A', text: '用力踩踏井盖', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=stepping%20on%20manhole%20cover%20forcefully&image_size=square' },
          { id: 'B', text: '绕行避开井盖', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=walking%20around%20manhole%20cover&image_size=square' },
          { id: 'C', text: '在井盖上跳跃', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=jumping%20on%20manhole%20cover&image_size=square' },
          { id: 'D', text: '撬开井盖查看', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=prying%20open%20manhole%20cover&image_size=square' }
        ],
        correctAnswer: 'B',
        answer: '绕行避开井盖',
        analysis: [
          '电缆井盖可能松动或损坏，踩踏、跳跃存在坠落风险。',
          '撬开井盖会破坏设施，还可能导致他人坠落。',
          '最安全的做法是绕行避开，发现损坏的井盖应及时报告。'
        ]
      },
      {
        id: 'travel-choice-6',
        type: 'choice',
        question: '发现路边的高压电线断落在地上，应该怎么办？',
        options: [
          { id: 'A', text: '走近查看情况', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=approaching%20downed%20power%20line&image_size=square' },
          { id: 'B', text: '用木棍挑开电线', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=using%20stick%20to%20move%20power%20line&image_size=square' },
          { id: 'C', text: '双脚并拢跳离现场', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=jumping%20away%20from%20downed%20power%20line&image_size=square' },
          { id: 'D', text: '驾车快速通过', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=driving%20over%20downed%20power%20line&image_size=square' }
        ],
        correctAnswer: 'C',
        answer: '双脚并拢跳离现场',
        analysis: [
          '高压电线落地后会形成跨步电压，单脚站立或行走都会触电。',
          '必须双脚并拢跳离危险区域，保持身体不接触地面。',
          '离开后立即拨打电力抢修电话，切勿靠近或触碰电线。'
        ]
      },
      {
        id: 'travel-choice-7',
        type: 'choice',
        question: '在公园里遇到雷雨天气，应该去哪里避雨？',
        options: [
          { id: 'A', text: '大树下', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=sheltering%20under%20tree%20thunderstorm&image_size=square' },
          { id: 'B', text: '凉亭内', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=sheltering%20in%20pavilion%20thunderstorm&image_size=square' },
          { id: 'C', text: '低洼处蹲下', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=crouching%20in%20low%20area%20thunderstorm&image_size=square' },
          { id: 'D', text: '高处平台', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=on%20high%20platform%20thunderstorm&image_size=square' }
        ],
        correctAnswer: 'C',
        answer: '低洼处蹲下',
        analysis: [
          '大树和高处是雷击的重点目标，非常危险。',
          '凉亭如果没有防雷设施，也可能被雷击。',
          '正确做法是远离高大物体，在低洼处蹲下，减少触电风险。'
        ]
      },
      {
        id: 'travel-choice-8',
        type: 'choice',
        question: '高铁上的小桌板可以放什么？',
        options: [
          { id: 'A', text: '一杯水', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=glass%20of%20water%20on%20train%20tablet&image_size=square' },
          { id: 'B', text: '行李箱', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=luggage%20on%20train%20tablet&image_size=square' },
          { id: 'C', text: '大型背包', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=large%20backpack%20on%20train%20tablet&image_size=square' },
          { id: 'D', text: '儿童', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=child%20on%20train%20tablet&image_size=square' }
        ],
        correctAnswer: 'A',
        answer: '一杯水',
        analysis: [
          '小桌板设计仅用于放置轻便物品，如水杯、书本等。',
          '放置重物会损坏桌板，还可能在刹车时滑落伤人。',
          '严禁放置儿童或让儿童坐在桌板上，非常危险。'
        ]
      },
      {
        id: 'travel-choice-9',
        type: 'choice',
        question: '在高铁站台上候车时，人应该站在哪里？',
        options: [
          { id: 'A', text: '站台边缘', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=standing%20at%20platform%20edge%20train&image_size=square' },
          { id: 'B', text: '安全线内侧', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=standing%20behind%20safety%20line%20platform&image_size=square' },
          { id: 'C', text: '轨道旁', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=standing%20near%20train%20tracks&image_size=square' },
          { id: 'D', text: '屏蔽门前', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=standing%20directly%20in%20front%20platform%20screen&image_size=square' }
        ],
        correctAnswer: 'B',
        answer: '安全线内侧',
        analysis: [
          '高铁进站时会产生强大的气流，站在边缘可能被卷入轨道。',
          '安全线是根据列车速度和气流影响设置的安全距离。',
          '候车时必须站在安全线内侧，听从工作人员指引。'
        ]
      },
      {
        id: 'travel-choice-10',
        type: 'choice',
        question: '以下哪种情况应该使用消防楼梯？',
        options: [
          { id: 'A', text: '日常上下楼', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=using%20fire%20stairwell%20daily&image_size=square' },
          { id: 'B', text: '电梯故障', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=elevator%20broken%20use%20stairwell&image_size=square' },
          { id: 'C', text: '发生火灾', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=using%20fire%20stairwell%20during%20fire&image_size=square' },
          { id: 'D', text: '搬运重物', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=carrying%20heavy%20items%20fire%20stairwell&image_size=square' }
        ],
        correctAnswer: 'C',
        answer: '发生火灾',
        analysis: [
          '消防楼梯是火灾时的逃生通道，平时不应占用。',
          '火灾发生时电梯可能断电或故障，必须使用消防楼梯。',
          '日常使用应走普通楼梯或电梯，保持消防通道畅通。'
        ]
      },
      {
        id: 'travel-choice-11',
        type: 'choice',
        question: '飞机上的救生衣什么时候可以充气？',
        options: [
          { id: 'A', text: '登机后立即充气', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=inflating%20life%20jacket%20on%20plane%20immediately&image_size=square' },
          { id: 'B', text: '飞机下降时充气', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=inflating%20life%20jacket%20plane%20descending&image_size=square' },
          { id: 'C', text: '离开飞机后在水面充气', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=inflating%20life%20jacket%20in%20water%20after%20evacuation&image_size=square' },
          { id: 'D', text: '起飞前充气', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=inflating%20life%20jacket%20before%20takeoff&image_size=square' }
        ],
        correctAnswer: 'C',
        answer: '离开飞机后在水面充气',
        analysis: [
          '在机舱内充气会阻碍撤离，甚至可能被卡在座位上。',
          '正确做法是穿好救生衣，离开飞机后在水面上拉动充气绳。',
          '听从机组人员指示，不要提前充气。'
        ]
      },
      {
        id: 'travel-choice-12',
        type: 'choice',
        question: '乘坐小汽车下车时，最安全的开门方式是？',
        options: [
          { id: 'A', text: '用靠近车门的手开门', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=opening%20car%20door%20with%20near%20hand&image_size=square' },
          { id: 'B', text: '用远离车门的手开门', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=opening%20car%20door%20with%20far%20hand&image_size=square' },
          { id: 'C', text: '不看后方直接开门', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=opening%20car%20door%20without%20looking%20back&image_size=square' },
          { id: 'D', text: '快速用力开门', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=opening%20car%20door%20quickly%20forcefully&image_size=square' }
        ],
        correctAnswer: 'B',
        answer: '用远离车门的手开门',
        analysis: [
          '用远离车门的手开门会自然转动身体，便于观察后方交通。',
          '这就是"荷式开门法"，能有效防止开门杀事故。',
          '开门前一定要观察后方，确保安全后再缓慢开门。'
        ]
      },
      {
        id: 'travel-choice-13',
        type: 'choice',
        question: '以下哪种鞋子穿自动扶梯最容易被卡住？',
        options: [
          { id: 'A', text: '运动鞋', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=sneakers%20on%20escalator&image_size=square' },
          { id: 'B', text: '凉鞋', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=sandals%20on%20escalator&image_size=square' },
          { id: 'C', text: '高跟鞋', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=high%20heels%20on%20escalator&image_size=square' },
          { id: 'D', text: '棉鞋', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cotton%20shoes%20on%20escalator&image_size=square' }
        ],
        correctAnswer: 'C',
        answer: '高跟鞋',
        analysis: [
          '高跟鞋的鞋跟细小，容易卡入扶梯的缝隙中。',
          '一旦卡住可能导致摔倒或脚部受伤。',
          '乘坐扶梯时最好穿平底鞋，穿高跟鞋要格外小心。'
        ]
      },
      {
        id: 'travel-choice-14',
        type: 'choice',
        question: '不幸被困在电梯里了，应该怎么做？',
        options: [
          { id: 'A', text: '强行扒开电梯门', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=trying%20to%20force%20open%20elevator%20door&image_size=square' },
          { id: 'B', text: '按紧急呼叫按钮', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=pressing%20elevator%20emergency%20button&image_size=square' },
          { id: 'C', text: '从电梯顶部爬出', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=climbing%20out%20elevator%20top&image_size=square' },
          { id: 'D', text: '大声呼救无人理会就放弃', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=giving%20up%20after%20shouting%20for%20help&image_size=square' }
        ],
        correctAnswer: 'B',
        answer: '按紧急呼叫按钮',
        analysis: [
          '强行扒门或爬出顶部非常危险，可能导致坠落。',
          '电梯内都装有紧急呼叫按钮，按下去会接通监控中心。',
          '保持冷静，耐心等待救援，不要尝试任何危险行为。'
        ]
      },
      {
        id: 'travel-choice-15',
        type: 'choice',
        question: '高铁车厢内的紧急制动阀（红色手柄）在什么情况下才能使用？',
        options: [
          { id: 'A', text: '任何情况都可以用', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=using%20emergency%20brake%20arbitrarily&image_size=square' },
          { id: 'B', text: '看到有人吵架时', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=using%20emergency%20brake%20during%20argument&image_size=square' },
          { id: 'C', text: '发生火灾或危及人身安全时', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=using%20emergency%20brake%20fire%20safety&image_size=square' },
          { id: 'D', text: '想提前下车时', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=using%20emergency%20brake%20to%20get%20off%20early&image_size=square' }
        ],
        correctAnswer: 'C',
        answer: '发生火灾或危及人身安全时',
        analysis: [
          '紧急制动阀只能在危及人身安全的紧急情况下使用。',
          '随意使用会导致列车紧急制动，造成人员受伤和列车晚点。',
          '滥用紧急制动阀是违法行为，会被依法处罚。'
        ]
      },
      {
        id: 'travel-choice-16',
        type: 'choice',
        question: '夜间独自乘坐网约车，最安全的座位是哪个？',
        options: [
          { id: 'A', text: '副驾驶', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=ride%20hailing%20front%20passenger%20seat&image_size=square' },
          { id: 'B', text: '后排左侧', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=ride%20hailing%20back%20left%20seat&image_size=square' },
          { id: 'C', text: '后排右侧', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=ride%20hailing%20back%20right%20seat&image_size=square' },
          { id: 'D', text: '后排中间', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=ride%20hailing%20back%20middle%20seat&image_size=square' }
        ],
        correctAnswer: 'B',
        answer: '后排左侧',
        analysis: [
          '后排左侧离司机最远，相对更安全。',
          '上车后应立即分享行程给亲友，开启行程分享功能。',
          '保持手机畅通，随时准备联系紧急联系人。'
        ]
      },
      {
        id: 'travel-choice-17',
        type: 'choice',
        question: '乘坐地铁时，车门即将关闭应该怎么办？',
        options: [
          { id: 'A', text: '赶紧冲进去', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=rushing%20into%20closing%20subway%20door&image_size=square' },
          { id: 'B', text: '用手挡住门', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=hand%20stopping%20closing%20subway%20door&image_size=square' },
          { id: 'C', text: '等待下一班车', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=waiting%20for%20next%20subway%20train&image_size=square' },
          { id: 'D', text: '强行扒开门', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=forcing%20open%20subway%20door&image_size=square' }
        ],
        correctAnswer: 'C',
        answer: '等待下一班车',
        analysis: [
          '冲门、挡门、扒门都非常危险，可能导致被门夹伤或坠落轨道。',
          '地铁列车间隔很短，等待下一班是最安全的选择。',
          '遵守乘车秩序，排队候车，先下后上。'
        ]
      },
      {
        id: 'travel-judge-1',
        type: 'judge',
        question: '施工现场外面的临时围栏，靠着休息一下没关系',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=construction%20site%20temporary%20fence&image_size=square',
        correctAnswer: 'false',
        answer: '错误',
        analysis: [
          '临时围栏只是警示作用，结构不稳定，倚靠可能导致倒塌。',
          '施工区域可能有高空坠物或其他安全隐患。',
          '应远离施工区域，不要在围栏附近停留。'
        ]
      },
      {
        id: 'travel-judge-2',
        type: 'judge',
        question: '发现有人掉进电缆井里，应该立刻跳下去救人',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=person%20falling%20into%20manhole&image_size=square',
        correctAnswer: 'false',
        answer: '错误',
        analysis: [
          '电缆井内可能有高压电或有毒气体，盲目跳下去会危及自身安全。',
          '正确做法是立即拨打急救电话，并设置警示标志。',
          '在专业救援人员到达前，不要冒险施救。'
        ]
      },
      {
        id: 'travel-judge-3',
        type: 'judge',
        question: '桥上的"石"护栏有点松动了，靠着应该没问题',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=loose%20bridge%20stone%20railing&image_size=square',
        correctAnswer: 'false',
        answer: '错误',
        analysis: [
          '松动的护栏可能随时脱落，倚靠存在坠落风险。',
          '桥梁护栏是保障安全的重要设施，损坏后应及时报告。',
          '不要在损坏的护栏附近停留或倚靠。'
        ]
      },
      {
        id: 'travel-judge-4',
        type: 'judge',
        question: '看到街上的配电箱可以打开看看里面是什么',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=street%20electric%20distribution%20box&image_size=square',
        correctAnswer: 'false',
        answer: '错误',
        analysis: [
          '配电箱内有高压电，私自打开非常危险，可能触电。',
          '电气设备应由专业人员操作，非专业人员严禁触碰。',
          '发现配电箱异常应及时拨打电力公司电话。'
        ]
      },
      {
        id: 'travel-judge-5',
        type: 'judge',
        question: '在草坪上坐下来休息之前，应该先检查一下周围环境',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=checking%20grass%20area%20before%20sitting&image_size=square',
        correctAnswer: 'true',
        answer: '正确',
        analysis: [
          '草坪上可能有异物、蚊虫或有毒植物，检查环境很有必要。',
          '特别是带孩子的家长，更要注意安全。',
          '选择干净、安全的地方休息，避免意外发生。'
        ]
      },
      {
        id: 'travel-judge-6',
        type: 'judge',
        question: '景观水池的边缘石比较宽，可以在上面走一走',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=walking%20on%20pond%20edge%20stones&image_size=square',
        correctAnswer: 'false',
        answer: '错误',
        analysis: [
          '水池边缘石可能湿滑，行走容易打滑掉入水中。',
          '尤其是儿童，好奇心强，更容易发生意外。',
          '应远离水池边缘，不要在上面行走或玩耍。'
        ]
      },
      {
        id: 'travel-judge-7',
        type: 'judge',
        question: '楼道里可以给电动车充电',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=charging%20ebike%20in%20corridor&image_size=square',
        correctAnswer: 'false',
        answer: '错误',
        analysis: [
          '楼道是消防通道，充电会堵塞逃生路线。',
          '电动车充电时可能起火，在楼道内充电会威胁整栋楼的安全。',
          '应使用专用充电桩充电，严禁在楼道内充电。'
        ]
      },
      {
        id: 'travel-judge-8',
        type: 'judge',
        question: '长途飞行时，应该定时活动下肢，预防血栓',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=exercising%20legs%20on%20long%20flight&image_size=square',
        correctAnswer: 'true',
        answer: '正确',
        analysis: [
          '长时间坐着会导致下肢血液循环不畅，增加血栓风险。',
          '每隔1-2小时起身活动，做一些拉伸运动。',
          '多喝水也有助于促进血液循环。'
        ]
      },
      {
        id: 'travel-judge-9',
        type: 'judge',
        question: '飞机上的紧急出口手柄可以随便碰',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=airplane%20emergency%20exit%20handle&image_size=square',
        correctAnswer: 'false',
        answer: '错误',
        analysis: [
          '紧急出口手柄只能在紧急情况下由机组人员操作。',
          '误碰会导致应急滑梯释放，造成严重安全事故。',
          '随意触碰紧急设备是违法行为，会被依法处罚。'
        ]
      },
      {
        id: 'travel-judge-10',
        type: 'judge',
        question: '乘坐公交车时可以把头伸出去感受风吹',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=head%20out%20of%20bus%20window&image_size=square',
        correctAnswer: 'false',
        answer: '错误',
        analysis: [
          '把头伸出车窗非常危险，可能被路边物体撞击。',
          '车辆转弯或会车时，头部可能被其他车辆碰撞。',
          '乘车时应坐稳扶好，身体任何部位都不要伸出窗外。'
        ]
      },
      {
        id: 'travel-judge-11',
        type: 'judge',
        question: '高铁列车上充电宝充完电后，可以留在座位上不用管',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=power%20bank%20left%20on%20train%20seat&image_size=square',
        correctAnswer: 'false',
        answer: '错误',
        analysis: [
          '充电宝属于个人物品，遗留在座位上会造成财产损失。',
          '无人看管的充电宝可能引发安全隐患。',
          '下车时应仔细检查，带走所有个人物品。'
        ]
      },
      {
        id: 'travel-judge-12',
        type: 'judge',
        question: '穿长裙/拖地长裤坐自动扶梯时，应该提一下裙摆防止被卷入',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=holding%20long%20skirt%20on%20escalator&image_size=square',
        correctAnswer: 'true',
        answer: '正确',
        analysis: [
          '长裙或拖地裤很容易被扶梯的缝隙夹住。',
          '乘坐时应提起裙摆，避免衣物卷入。',
          '这是保护自己安全的重要习惯。'
        ]
      },
      {
        id: 'travel-judge-13',
        type: 'judge',
        question: '高铁很安全，所以小朋友可以在高铁车厢通道上奔跑打闹',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=children%20running%20on%20train%20corridor&image_size=square',
        correctAnswer: 'false',
        answer: '错误',
        analysis: [
          '列车行驶中会有晃动，奔跑打闹容易摔倒受伤。',
          '车厢通道是通行区域，奔跑会影响他人通行。',
          '家长应看管好孩子，在座位上安静乘车。'
        ]
      },
      {
        id: 'travel-judge-14',
        type: 'judge',
        question: '坐地铁时可以倚靠在屏蔽门上候车',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=leaning%20on%20subway%20platform%20screen%20door&image_size=square',
        correctAnswer: 'false',
        answer: '错误',
        analysis: [
          '屏蔽门会在列车到站时自动打开，倚靠可能导致坠落轨道。',
          '屏蔽门是安全设施，不是休息设施。',
          '候车时应站在安全线内侧，不要倚靠屏蔽门。'
        ]
      },
      {
        id: 'travel-judge-15',
        type: 'judge',
        question: '带婴儿车坐地铁时，应该走无障碍电梯而不是自动扶梯',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=baby%20stroller%20on%20elevator%20not%20escalator&image_size=square',
        correctAnswer: 'true',
        answer: '正确',
        analysis: [
          '婴儿车在自动扶梯上很不稳定，容易翻倒。',
          '无障碍电梯更安全，能保护婴儿和家长的安全。',
          '地铁都配备无障碍设施，应充分利用。'
        ]
      },
      {
        id: 'travel-judge-16',
        type: 'judge',
        question: '电梯门有感应装置，所以可以用手去挡正在关闭的门',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=hand%20stopping%20closing%20elevator%20door&image_size=square',
        correctAnswer: 'false',
        answer: '错误',
        analysis: [
          '感应装置可能失灵，用手挡门有被夹伤的风险。',
          '正确做法是按住开门键或等待下一次开门。',
          '不要依赖感应装置，主动操作更安全。'
        ]
      },
      {
        id: 'travel-judge-17',
        type: 'judge',
        question: '高铁进站时，可以站在站台边缘看看列车开过来的样子',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=standing%20at%20platform%20edge%20train%20arriving&image_size=square',
        correctAnswer: 'false',
        answer: '错误',
        analysis: [
          '高铁进站速度快，会产生强大气流，站在边缘很危险。',
          '气流可能将人卷入轨道，造成严重伤亡。',
          '必须站在安全线内侧，听从工作人员指引。'
        ]
      },
      {
        id: 'travel-judge-18',
        type: 'judge',
        question: '在高铁站台上用自拍杆拍照是安全的，只要注意别掉下去就行',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=selfie%20stick%20on%20train%20platform&image_size=square',
        correctAnswer: 'false',
        answer: '错误',
        analysis: [
          '自拍杆可能伸出安全线，被列车撞击。',
          '过度专注拍照会忽略周围环境，增加意外风险。',
          '站台上应专注候车，不要使用自拍杆拍照。'
        ]
      },
      {
        id: 'travel-judge-19',
        type: 'judge',
        question: '下雨天在高铁站台等车可以打伞',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=holding%20umbrella%20on%20train%20platform%20rainy&image_size=square',
        correctAnswer: 'false',
        answer: '错误',
        analysis: [
          '雨伞是金属杆，在站台打伞有遭雷击的风险。',
          '列车进站时的气流可能吹翻雨伞，造成危险。',
          '站台有雨棚可以避雨，不需要打伞。'
        ]
      }
    ]
  },
  {
    id: 'food',
    title: '食品安全',
    questions: [
      {
        id: 'food-choice-1',
        type: 'choice',
        question: '下面哪种状态的土豆不能吃？',
        options: [
          { id: 'A', text: '发芽的土豆', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=germinated%20potato%20sprouts&image_size=square' },
          { id: 'B', text: '表皮光滑的土豆', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=smooth%20potato%20skin&image_size=square' },
          { id: 'C', text: '带泥土的土豆', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=potato%20with%20soil&image_size=square' },
          { id: 'D', text: '大小不一的土豆', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=potatoes%20different%20sizes&image_size=square' }
        ],
        correctAnswer: 'A',
        answer: '发芽的土豆',
        analysis: [
          '发芽的土豆会产生一种叫做龙葵素的毒素，对人体有害。',
          '龙葵素会刺激肠胃，引起恶心、呕吐、腹泻等症状。',
          '发芽严重或表皮变绿的土豆应丢弃，不要食用。'
        ]
      },
      {
        id: 'food-choice-2',
        type: 'choice',
        question: '下面哪种状态的甘蔗不能吃？',
        options: [
          { id: 'A', text: '表皮光滑的甘蔗', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fresh%20sugarcane%20smooth&image_size=square' },
          { id: 'B', text: '内部发红的甘蔗', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=red%20inside%20sugarcane&image_size=square' },
          { id: 'C', text: '节段均匀的甘蔗', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=sugarcane%20even%20segments&image_size=square' },
          { id: 'D', text: '水分充足的甘蔗', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=juicy%20sugarcane&image_size=square' }
        ],
        correctAnswer: 'B',
        answer: '内部发红的甘蔗',
        analysis: [
          '甘蔗内部发红是霉变的表现，会产生一种叫做节菱孢霉菌的毒素。',
          '食用发红的甘蔗会引起中毒，严重时可能危及生命。',
          '购买甘蔗时要选择新鲜、无霉变的，发现发红应立即丢弃。'
        ]
      },
      {
        id: 'food-choice-3',
        type: 'choice',
        question: '下面哪种状态的牛肉不能吃？',
        options: [
          { id: 'A', text: '颜色鲜红的牛肉', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fresh%20red%20beef&image_size=square' },
          { id: 'B', text: '有弹性的牛肉', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=elastic%20beef%20texture&image_size=square' },
          { id: 'C', text: '有异味的牛肉', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=spoiled%20beef%20smell&image_size=square' },
          { id: 'D', text: '脂肪分布均匀的牛肉', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=marbled%20beef&image_size=square' }
        ],
        correctAnswer: 'C',
        answer: '有异味的牛肉',
        analysis: [
          '有异味的牛肉通常已经变质，可能滋生大量细菌。',
          '食用变质牛肉会引起食物中毒，导致腹泻、呕吐等症状。',
          '新鲜牛肉应具有正常的肉香味，如有酸味、腐臭味应丢弃。'
        ]
      },
      {
        id: 'food-choice-4',
        type: 'choice',
        question: '下面哪些海鲜死了不能吃？',
        options: [
          { id: 'A', text: '贝类', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=shellfish%20dead&image_size=square' },
          { id: 'B', text: '鱼类', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=dead%20fish&image_size=square' },
          { id: 'C', text: '虾类', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=dead%20shrimp&image_size=square' },
          { id: 'D', text: '蟹类', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=dead%20crab&image_size=square' }
        ],
        correctAnswer: 'D',
        answer: '蟹类',
        analysis: [
          '螃蟹死后体内会迅速产生大量细菌，分解蟹肉产生毒素。',
          '即使煮熟，毒素也难以破坏，食用后容易引起中毒。',
          '买蟹时要选择活蟹，死蟹应丢弃不要食用。'
        ]
      },
      {
        id: 'food-choice-5',
        type: 'choice',
        question: '下面哪个状态的椰子水能喝？',
        options: [
          { id: 'A', text: '外壳发霉的椰子', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=moldy%20coconut%20shell&image_size=square' },
          { id: 'B', text: '椰汁浑浊有异味', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cloudy%20coconut%20water&image_size=square' },
          { id: 'C', text: '外壳完整新鲜的椰子', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fresh%20whole%20coconut&image_size=square' },
          { id: 'D', text: '存放时间过长的椰子', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=old%20coconut&image_size=square' }
        ],
        correctAnswer: 'C',
        answer: '外壳完整新鲜的椰子',
        analysis: [
          '新鲜椰子的椰汁清澈透明，口感清甜，富含电解质。',
          '外壳发霉或椰汁浑浊有异味说明已经变质，可能滋生细菌。',
          '饮用变质椰子水可能引起肠胃不适，应选择新鲜椰子。'
        ]
      },
      {
        id: 'food-choice-6',
        type: 'choice',
        question: '下面哪种状态的罐头不能吃？',
        options: [
          { id: 'A', text: '罐体完好的罐头', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=good%20condition%20canned%20food&image_size=square' },
          { id: 'B', text: '罐盖凸起的罐头', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=bulging%20can%20lid&image_size=square' },
          { id: 'C', text: '保质期内的罐头', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=expired%20canned%20food&image_size=square' },
          { id: 'D', text: '标签完整的罐头', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=canned%20food%20intact%20label&image_size=square' }
        ],
        correctAnswer: 'B',
        answer: '罐盖凸起的罐头',
        analysis: [
          '罐盖凸起说明罐内细菌大量繁殖，产生气体导致膨胀。',
          '这种罐头可能已经变质，食用有很大风险。',
          '发现罐头膨胀、变形或有异味，应立即丢弃。'
        ]
      },
      {
        id: 'food-choice-7',
        type: 'choice',
        question: '下面哪种食物能吃？',
        options: [
          { id: 'A', text: '烤焦的肉', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=burnt%20meat&image_size=square' },
          { id: 'B', text: '烧糊的菜', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=charred%20vegetables&image_size=square' },
          { id: 'C', text: '炸糊的丸子', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=overfried%20meatballs&image_size=square' },
          { id: 'D', text: '煮老的西兰花', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=overcooked%20broccoli&image_size=square' }
        ],
        correctAnswer: 'D',
        answer: '煮老的西兰花',
        analysis: [
          '烤焦的肉和烧糊的菜可能产生致癌物质如苯并芘。',
          '炸糊的丸子同样存在致癌风险，不建议食用。',
          '煮老的西兰花虽然营养有所流失，但不产生有害物质，仍可食用。'
        ]
      },
      {
        id: 'food-choice-8',
        type: 'choice',
        question: '下面哪种蔬菜食用前需要焯水？',
        options: [
          { id: 'A', text: '胡萝卜', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=carrot%20raw&image_size=square' },
          { id: 'B', text: '菠菜', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=spinach%20blanching&image_size=square' },
          { id: 'C', text: '西红柿', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=tomato%20raw&image_size=square' },
          { id: 'D', text: '生菜', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=lettuce%20raw&image_size=square' }
        ],
        correctAnswer: 'B',
        answer: '菠菜',
        analysis: [
          '菠菜含有较多的草酸，直接食用会影响钙的吸收。',
          '焯水可以去除大部分草酸，同时也能杀菌消毒。',
          '焯水时间不宜过长，1-2分钟即可，以免营养流失过多。'
        ]
      },
      {
        id: 'food-choice-9',
        type: 'choice',
        question: '下面食物不可以一起吃的是？',
        options: [
          { id: 'A', text: '鸡蛋+豆浆', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=egg%20and%20soy%20milk&image_size=square' },
          { id: 'B', text: '牛奶+果汁', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=milk%20and%20juice&image_size=square' },
          { id: 'C', text: '红薯+香蕉', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=sweet%20potato%20and%20banana&image_size=square' },
          { id: 'D', text: '酒+头孢类药物', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=alcohol%20and%20cefixime%20medication&image_size=square' }
        ],
        correctAnswer: 'D',
        answer: '酒+头孢类药物',
        analysis: [
          '酒精和头孢类药物同时服用会引起双硫仑样反应。',
          '症状包括头晕、恶心、心跳加快，严重时可能危及生命。',
          '服用头孢类药物期间及停药后7天内严禁饮酒。'
        ]
      },
      {
        id: 'food-choice-10',
        type: 'choice',
        question: '下面食物不可以一起吃的是？',
        options: [
          { id: 'A', text: '咖啡+饺子', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=coffee%20and%20dumplings&image_size=square' },
          { id: 'B', text: '豆腐+鱼', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=tofu%20and%20fish&image_size=square' },
          { id: 'C', text: '海鲜+啤酒', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=seafood%20and%20beer&image_size=square' },
          { id: 'D', text: '柠檬汁+葱花', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=lemon%20juice%20and%20scallions&image_size=square' }
        ],
        correctAnswer: 'C',
        answer: '海鲜+啤酒',
        analysis: [
          '海鲜和啤酒都含有较高的嘌呤，一起食用会导致尿酸升高。',
          '长期如此可能诱发痛风，尤其是痛风患者更应避免。',
          '吃海鲜时最好搭配清淡的饮品，如茶水或白开水。'
        ]
      },
      {
        id: 'food-choice-11',
        type: 'choice',
        question: '食用下面哪种食物搭配可能引起痛风？',
        options: [
          { id: 'A', text: '海鲜+啤酒', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=seafood%20beer%20gout&image_size=square' },
          { id: 'B', text: '浓茶+点心', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=strong%20tea%20snack&image_size=square' },
          { id: 'C', text: '牛肉+芹菜', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=beef%20celery&image_size=square' },
          { id: 'D', text: '西红柿+鸡蛋', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=tomato%20egg&image_size=square' }
        ],
        correctAnswer: 'A',
        answer: '海鲜+啤酒',
        analysis: [
          '海鲜和啤酒都是高嘌呤食物，同时摄入会导致血尿酸急剧升高。',
          '尿酸盐结晶沉积在关节处会引发痛风性关节炎。',
          '痛风患者应严格限制高嘌呤食物和酒精的摄入。'
        ]
      },
      {
        id: 'food-choice-12',
        type: 'choice',
        question: '下面哪种长时间泡发的食物不宜再食用？',
        options: [
          { id: 'A', text: '木耳', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=soaked%20wood%20ear%20mushroom&image_size=square' },
          { id: 'B', text: '花胶', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=soaked%20fish%20maw&image_size=square' },
          { id: 'C', text: '糯米', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=soaked%20glutinous%20rice&image_size=square' },
          { id: 'D', text: '海带', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=soaked%20kelp&image_size=square' }
        ],
        correctAnswer: 'A',
        answer: '木耳',
        analysis: [
          '干木耳长时间泡发（超过24小时）容易滋生椰毒假单胞菌，产生米酵菌酸毒素。',
          '这种毒素毒性极强，食用后可能导致严重中毒，甚至死亡。',
          '泡发木耳时间不宜超过4小时，且要放在冰箱冷藏。'
        ]
      },
      {
        id: 'food-choice-13',
        type: 'choice',
        question: '空腹不适宜大量食用下面哪种食物？',
        options: [
          { id: 'A', text: '米饭', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=rice%20empty%20stomach&image_size=square' },
          { id: 'B', text: '荔枝', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=lychee%20empty%20stomach&image_size=square' },
          { id: 'C', text: '红烧肉', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=pork%20belly%20empty%20stomach&image_size=square' },
          { id: 'D', text: '水', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=water%20empty%20stomach&image_size=square' }
        ],
        correctAnswer: 'B',
        answer: '荔枝',
        analysis: [
          '荔枝含糖量很高，空腹大量食用会刺激胃黏膜，引起胃痛、胃胀。',
          '还可能导致血糖突然升高，出现头晕、乏力等症状。',
          '建议饭后适量食用，一次不宜超过5颗。'
        ]
      },
      {
        id: 'food-choice-14',
        type: 'choice',
        question: '下面哪种蔬菜不可以生吃？',
        options: [
          { id: 'A', text: '西红柿', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=raw%20tomato&image_size=square' },
          { id: 'B', text: '蘑菇', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=raw%20mushroom&image_size=square' },
          { id: 'C', text: '黄瓜', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=raw%20cucumber&image_size=square' },
          { id: 'D', text: '胡萝卜', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=raw%20carrot&image_size=square' }
        ],
        correctAnswer: 'B',
        answer: '蘑菇',
        analysis: [
          '蘑菇生吃不易消化，部分蘑菇还含有天然毒素需要高温破坏。',
          '即使是可食用的蘑菇，生吃也可能引起肠胃不适。',
          '所有蘑菇都应彻底煮熟后食用，确保安全。'
        ]
      },
      {
        id: 'food-choice-15',
        type: 'choice',
        question: '下面哪种饮品不能喝？',
        options: [
          { id: 'A', text: '刚挤的"新鲜"牛奶', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=raw%20unpasteurized%20milk&image_size=square' },
          { id: 'B', text: '鲜榨的橙汁', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fresh%20orange%20juice&image_size=square' },
          { id: 'C', text: '已煮沸了的豆浆', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=boiled%20soy%20milk&image_size=square' },
          { id: 'D', text: '冷水泡的茶', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cold%20brew%20tea&image_size=square' }
        ],
        correctAnswer: 'A',
        answer: '刚挤的"新鲜"牛奶',
        analysis: [
          '未经巴氏消毒的生牛奶可能含有细菌如大肠杆菌、沙门氏菌等。',
          '饮用生牛奶存在感染风险，可能导致食物中毒。',
          '市面上销售的牛奶都经过了严格的消毒处理，可以放心饮用。'
        ]
      },
      {
        id: 'food-judge-1',
        type: 'judge',
        question: '新鲜黄花菜煮熟就能吃',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fresh%20daylily%20flower%20cooked&image_size=square',
        correctAnswer: 'false',
        answer: '错误',
        analysis: [
          '新鲜黄花菜含有秋水仙碱，这是一种有毒物质。',
          '单纯煮熟并不能完全破坏秋水仙碱，需要先焯水。',
          '正确做法是将新鲜黄花菜焯水后再烹饪，或直接购买干制黄花菜。'
        ]
      },
      {
        id: 'food-judge-2',
        type: 'judge',
        question: '豆角（四季豆、扁豆等）彻底炒煮熟透才能吃',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cooked%20green%20beans&image_size=square',
        correctAnswer: 'true',
        answer: '正确',
        analysis: [
          '豆角含有皂角素和植物血细胞凝集素等天然毒素。',
          '这些毒素在高温下会被破坏，未煮熟的豆角食用后会引起中毒。',
          '烹饪时一定要确保豆角完全变色、变软，无生涩感。'
        ]
      },
      {
        id: 'food-judge-3',
        type: 'judge',
        question: '泡发的木耳隔夜能吃',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=overnight%20soaked%20wood%20ear&image_size=square',
        correctAnswer: 'false',
        answer: '错误',
        analysis: [
          '泡发时间过长的木耳容易滋生细菌和产生毒素。',
          '特别是室温下隔夜泡发的木耳，风险更高。',
          '建议现泡现吃，泡发时间不超过4小时，如需隔夜应冷藏。'
        ]
      },
      {
        id: 'food-judge-4',
        type: 'judge',
        question: '干燥保存的米面中出现虫子还能吃',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=insects%20in%20rice%20flour&image_size=square',
        correctAnswer: 'true',
        answer: '正确',
        analysis: [
          '米面中的米虫本身没有毒性，主要是影响心理感受和品质。',
          '如果虫子数量不多，经过筛除清洗后可以食用。',
          '但如果出现发霉、异味，则说明已经变质，不能食用。'
        ]
      },
      {
        id: 'food-judge-5',
        type: 'judge',
        question: '发霉的大米、花生，把表面的霉菌洗掉晒干还能继续吃',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=moldy%20rice%20peanuts&image_size=square',
        correctAnswer: 'false',
        answer: '错误',
        analysis: [
          '霉菌会产生霉菌毒素，这些毒素会渗透到食物内部。',
          '简单清洗无法去除毒素，食用后可能损害肝脏等器官。',
          '发霉的食物应全部丢弃，不要冒险食用。'
        ]
      },
      {
        id: 'food-judge-6',
        type: 'judge',
        question: '在河里钓到河豚可以拿回家，自己加工处理并食用',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=pufferfish%20fishing%20river&image_size=square',
        correctAnswer: 'false',
        answer: '错误',
        analysis: [
          '河豚含有剧毒的河豚毒素，0.5毫克即可致人死亡。',
          '河豚毒素非常稳定，普通烹饪无法破坏。',
          '只有经过专业培训的厨师才能安全处理河豚，私自处理食用极其危险。'
        ]
      },
      {
        id: 'food-judge-7',
        type: 'judge',
        question: '家庭油炸一锅油可以反复使用十多次',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=reused%20frying%20oil&image_size=square',
        correctAnswer: 'false',
        answer: '错误',
        analysis: [
          '反复使用的食用油会产生有害物质如醛类、酮类等。',
          '这些物质有致癌风险，还会产生油烟污染环境。',
          '建议油炸用油不超过3次，且每次使用后要过滤残渣。'
        ]
      },
      {
        id: 'food-judge-8',
        type: 'judge',
        question: '夏天适合吃大量的冰镇西瓜',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=iced%20watermelon%20summer&image_size=square',
        correctAnswer: 'false',
        answer: '错误',
        analysis: [
          '大量食用冰镇西瓜会刺激肠胃，引起胃痉挛、腹泻。',
          '尤其是肠胃功能较弱的人，更应适量食用。',
          '建议从冰箱取出后放置一段时间再吃，每次食用量不宜过多。'
        ]
      },
      {
        id: 'food-judge-9',
        type: 'judge',
        question: '长期生食肉类有风险',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=raw%20meat%20eating&image_size=square',
        correctAnswer: 'true',
        answer: '正确',
        analysis: [
          '生肉可能含有寄生虫如弓形虫、绦虫等。',
          '还可能携带细菌如沙门氏菌、大肠杆菌等。',
          '长期生食肉类会增加感染疾病的风险，建议彻底煮熟后食用。'
        ]
      },
      {
        id: 'food-judge-10',
        type: 'judge',
        question: '生食木薯有风险',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=raw%20cassava&image_size=square',
        correctAnswer: 'true',
        answer: '正确',
        analysis: [
          '木薯含有氰化物，生食会引起中毒。',
          '氰化物是剧毒物质，摄入少量即可致命。',
          '木薯必须经过去皮、浸泡、煮熟等处理后才能食用。'
        ]
      },
      {
        id: 'food-judge-11',
        type: 'judge',
        question: '烧烤好吃，可以天天吃烧烤',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=daily%20barbecue%20eating&image_size=square',
        correctAnswer: 'false',
        answer: '错误',
        analysis: [
          '烧烤过程会产生致癌物质如多环芳烃、杂环胺等。',
          '长期大量食用会增加患癌风险。',
          '建议少吃烧烤，或选择电烤、气烤等方式，减少明火烧烤。'
        ]
      },
      {
        id: 'food-judge-12',
        type: 'judge',
        question: '海鲜刺身好吃，可以天天吃刺身',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=daily%20sashimi%20eating&image_size=square',
        correctAnswer: 'false',
        answer: '错误',
        analysis: [
          '生海鲜可能含有寄生虫如异尖线虫等。',
          '还可能携带细菌和病毒，存在食品安全风险。',
          '建议不要天天吃刺身，选择正规渠道购买，且注意适量食用。'
        ]
      },
      {
        id: 'food-judge-13',
        type: 'judge',
        question: '用"银器"、"大蒜"可以给食物试毒',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=silver%20garlic%20poison%20testing&image_size=square',
        correctAnswer: 'false',
        answer: '错误',
        analysis: [
          '银器只能检测含硫的毒物，对大多数毒物无效。',
          '大蒜并没有试毒的科学依据。',
          '这些方法不可靠，不能作为食品安全检测手段。'
        ]
      },
      {
        id: 'food-judge-14',
        type: 'judge',
        question: '豆角不能生吃',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=raw%20green%20beans%20dangerous&image_size=square',
        correctAnswer: 'true',
        answer: '正确',
        analysis: [
          '生豆角含有皂角素和植物血细胞凝集素，食用后会引起中毒。',
          '症状包括恶心、呕吐、腹痛、腹泻等。',
          '一定要彻底煮熟后再食用，确保安全。'
        ]
      },
      {
        id: 'food-judge-15',
        type: 'judge',
        question: '新鲜竹笋可以直接吃',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=raw%20bamboo%20shoots&image_size=square',
        correctAnswer: 'false',
        answer: '错误',
        analysis: [
          '新鲜竹笋含有氰化物，生食会引起中毒。',
          '必须经过焯水或腌制处理，去除有毒物质后才能食用。',
          '食用前一定要彻底煮熟煮透。'
        ]
      },
      {
        id: 'food-judge-16',
        type: 'judge',
        question: '新鲜豆子打的生豆浆可以直接饮用',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=raw%20soy%20milk&image_size=square',
        correctAnswer: 'false',
        answer: '错误',
        analysis: [
          '生豆浆含有胰蛋白酶抑制剂和皂素，饮用后会引起肠胃不适。',
          '这些物质在煮沸过程中会被破坏。',
          '自制豆浆一定要彻底煮沸，确保安全后再饮用。'
        ]
      },
      {
        id: 'food-judge-17',
        type: 'judge',
        question: '切开的水果应该尽快使用，不宜长时间放置',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cut%20fruit%20long%20time&image_size=square',
        correctAnswer: 'true',
        answer: '正确',
        analysis: [
          '切开的水果暴露在空气中，容易滋生细菌。',
          '同时维生素等营养成分也会流失。',
          '建议切开后2小时内食用完，如需存放应密封冷藏。'
        ]
      }
    ]
  },
  {
    id: 'animal',
    title: '动植物接触',
    questions: [
      {
        id: 'animal-choice-1',
        type: 'choice',
        question: '下面哪张图片中是蓝环章鱼？',
        options: [
          { id: 'A', text: '蓝环章鱼', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=blue%20ringed%20octopus%20blue%20rings&image_size=square' },
          { id: 'B', text: '普通章鱼', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=common%20octopus%20brown&image_size=square' },
          { id: 'C', text: '乌贼', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cuttlefish%20sepia&image_size=square' },
          { id: 'D', text: '鱿鱼', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=squid%20calamari&image_size=square' }
        ],
        correctAnswer: 'A',
        answer: '蓝环章鱼',
        analysis: [
          '蓝环章鱼身上有鲜艳的蓝色环状花纹，是剧毒生物。',
          '它的毒液含有河豚毒素，能在几分钟内致人死亡。',
          '遇到蓝环章鱼应立即远离，切勿触摸。'
        ]
      },
      {
        id: 'animal-choice-2',
        type: 'choice',
        question: '下面哪张图片中是马蜂？',
        options: [
          { id: 'A', text: '蜜蜂', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=honey%20bee%20yellow%20black&image_size=square' },
          { id: 'B', text: '马蜂', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=wasp%20hornet%20large&image_size=square' },
          { id: 'C', text: '苍蝇', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fly%20insect&image_size=square' },
          { id: 'D', text: '蝴蝶', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=butterfly%20colorful&image_size=square' }
        ],
        correctAnswer: 'B',
        answer: '马蜂',
        analysis: [
          '马蜂体型较大，身体呈黑黄色，攻击性强。',
          '马蜂蜇人会引起剧烈疼痛，过敏体质者可能危及生命。',
          '发现马蜂窝应联系专业人员处理，切勿自行捅马蜂窝。'
        ]
      },
      {
        id: 'animal-choice-3',
        type: 'choice',
        question: '下面哪张图片中是隐翅虫？',
        options: [
          { id: 'A', text: '蚂蚁', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=ant%20insect&image_size=square' },
          { id: 'B', text: '蚊子', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=mosquito%20insect&image_size=square' },
          { id: 'C', text: '隐翅虫', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=rove%20beetle%20wingless%20insect&image_size=square' },
          { id: 'D', text: '蟑螂', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cockroach%20insect&image_size=square' }
        ],
        correctAnswer: 'C',
        answer: '隐翅虫',
        analysis: [
          '隐翅虫身体细长，翅膀隐藏在鞘翅下。',
          '它的体液含有强酸性毒素，接触皮肤会引起严重灼伤。',
          '遇到隐翅虫切勿拍打，应轻轻吹走或用纸巾轻轻拨走。'
        ]
      },
      {
        id: 'animal-choice-4',
        type: 'choice',
        question: '下面哪张图片中是箱水母？',
        options: [
          { id: 'A', text: '普通水母', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=common%20jellyfish%20translucent&image_size=square' },
          { id: 'B', text: '僧帽水母', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=man%20o%20war%20jellyfish&image_size=square' },
          { id: 'C', text: '桃花水母', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=peach%20blossom%20jellyfish&image_size=square' },
          { id: 'D', text: '箱水母', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=box%20jellyfish%20cube%20shape&image_size=square' }
        ],
        correctAnswer: 'D',
        answer: '箱水母',
        analysis: [
          '箱水母又称海黄蜂，是世界上最毒的动物之一。',
          '它的触须上布满毒刺细胞，毒液能在几分钟内致人死亡。',
          '在热带海域游泳时要注意防范，避免接触。'
        ]
      },
      {
        id: 'animal-choice-5',
        type: 'choice',
        question: '下图哪种是有害动物？',
        options: [
          { id: 'A', text: '臭虫', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=bed%20bug%20insect&image_size=square' },
          { id: 'B', text: '蜻蜓', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=dragonfly%20insect&image_size=square' },
          { id: 'C', text: '马蜂', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=wasp%20insect&image_size=square' },
          { id: 'D', text: '蚂蚁', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=ant%20insect&image_size=square' }
        ],
        correctAnswer: 'A',
        answer: '臭虫',
        analysis: [
          '臭虫会吸食人血，导致皮肤瘙痒、红肿。',
          '臭虫难以根除，会严重影响睡眠和生活质量。',
          '发现臭虫应及时采取专业措施进行防治。'
        ]
      },
      {
        id: 'animal-choice-6',
        type: 'choice',
        question: '被水母蜇伤后，以下哪种做法是正确的？',
        options: [
          { id: 'A', text: '用大量淡水冲洗', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fresh%20water%20wash%20jellyfish%20sting&image_size=square' },
          { id: 'B', text: '用白醋冲洗', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=vinegar%20wash%20jellyfish%20sting&image_size=square' },
          { id: 'C', text: '用热水冲洗', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=hot%20water%20wash%20jellyfish%20sting&image_size=square' },
          { id: 'D', text: '用毛巾使劲擦拭', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=towel%20rub%20jellyfish%20sting&image_size=square' }
        ],
        correctAnswer: 'B',
        answer: '用白醋冲洗',
        analysis: [
          '白醋可以使水母的刺细胞失去活性，减轻疼痛。',
          '淡水会加速毒素释放，热水会加重组织损伤。',
          '用毛巾擦拭会让刺细胞深入皮肤，加重伤害。'
        ]
      },
      {
        id: 'animal-choice-7',
        type: 'choice',
        question: '发现隐翅虫停在皮肤上，正确的做法是？',
        options: [
          { id: 'A', text: '用手拍死', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=hand%20squash%20insect&image_size=square' },
          { id: 'B', text: '用纸巾轻轻拨走', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=tissue%20remove%20insect&image_size=square' },
          { id: 'C', text: '用手抓起来扔掉', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=hand%20pick%20insect&image_size=square' },
          { id: 'D', text: '用巴掌打', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=slap%20insect&image_size=square' }
        ],
        correctAnswer: 'B',
        answer: '用纸巾轻轻拨走',
        analysis: [
          '隐翅虫体液含有强酸性毒素，拍打会导致毒素接触皮肤。',
          '用纸巾轻轻拨走可以避免毒素接触皮肤。',
          '如果不小心接触到毒素，应立即用肥皂水冲洗。'
        ]
      },
      {
        id: 'animal-choice-8',
        type: 'choice',
        question: '夹竹桃的哪个部分是有毒的？',
        options: [
          { id: 'A', text: '只有花朵', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=oleander%20flowers%20only&image_size=square' },
          { id: 'B', text: '只有叶子', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=oleander%20leaves%20only&image_size=square' },
          { id: 'C', text: '全株包括根茎叶花', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=oleander%20plant%20all%20parts&image_size=square' },
          { id: 'D', text: '只有果实', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=oleander%20fruit%20only&image_size=square' }
        ],
        correctAnswer: 'C',
        answer: '全株包括根茎叶花',
        analysis: [
          '夹竹桃全株有毒，含有强心苷等多种毒素。',
          '误食任何部分都可能引起中毒，甚至危及生命。',
          '不要在夹竹桃树下吃东西，也不要采摘其花朵或叶子。'
        ]
      },
      {
        id: 'animal-choice-9',
        type: 'choice',
        question: '下面哪张图片是滴水观音？',
        options: [
          { id: 'A', text: '芋头', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=taro%20plant&image_size=square' },
          { id: 'B', text: '芭蕉', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=banana%20plant&image_size=square' },
          { id: 'C', text: '绿萝', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=pothos%20plant&image_size=square' },
          { id: 'D', text: '滴水观音', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=alocasia%20drip%20water%20plant&image_size=square' }
        ],
        correctAnswer: 'D',
        answer: '滴水观音',
        analysis: [
          '滴水观音又称海芋，叶子宽大，会分泌水滴。',
          '它的汁液含有草酸钙针晶，接触皮肤会引起剧烈瘙痒。',
          '误食会导致喉咙肿胀、呼吸困难，需特别注意。'
        ]
      },
      {
        id: 'animal-choice-10',
        type: 'choice',
        question: '下图哪种是有毒植物？',
        options: [
          { id: 'A', text: '桂花', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=osmanthus%20flower%20plant&image_size=square' },
          { id: 'B', text: '栀子花', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=gardenia%20flower%20plant&image_size=square' },
          { id: 'C', text: '夹竹桃', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=oleander%20flower%20plant&image_size=square' },
          { id: 'D', text: '茉莉花', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=jasmine%20flower%20plant&image_size=square' }
        ],
        correctAnswer: 'C',
        answer: '夹竹桃',
        analysis: [
          '夹竹桃是著名的有毒植物，全株含有剧毒。',
          '它常被作为观赏植物种植，但接触和误食都有危险。',
          '家中有小孩和宠物的应避免种植夹竹桃。'
        ]
      },
      {
        id: 'animal-choice-11',
        type: 'choice',
        question: '下图哪种是有毒植物？',
        options: [
          { id: 'A', text: '断肠草', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=gelsemium%20elegans%20poisonous%20plant&image_size=square' },
          { id: 'B', text: '金银花', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=honeysuckle%20flower%20plant&image_size=square' },
          { id: 'C', text: '迎春花', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=winter%20jasmine%20flower&image_size=square' },
          { id: 'D', text: '月季', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=rose%20flower%20plant&image_size=square' }
        ],
        correctAnswer: 'A',
        answer: '断肠草',
        analysis: [
          '断肠草又称钩吻，是剧毒植物，误食可致命。',
          '它的花朵与金银花相似，容易混淆导致误食。',
          '野生植物不要随意采摘食用，尤其是不认识的植物。'
        ]
      },
      {
        id: 'animal-choice-12',
        type: 'choice',
        question: '以下哪种是有毒蘑菇？',
        options: [
          { id: 'A', text: '双孢蘑菇', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=button%20mushroom%20edible&image_size=square' },
          { id: 'B', text: '杏鲍菇', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=king%20oyster%20mushroom%20edible&image_size=square' },
          { id: 'C', text: '白毒伞', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=death%20cap%20mushroom%20poisonous&image_size=square' },
          { id: 'D', text: '白灵菇', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=white%20ling%20mushroom%20edible&image_size=square' }
        ],
        correctAnswer: 'C',
        answer: '白毒伞',
        analysis: [
          '白毒伞又称致命鹅膏，是世界上最毒的蘑菇之一。',
          '它的外观与食用蘑菇相似，误食后死亡率很高。',
          '野生蘑菇不要随意采摘食用，不认识的蘑菇一律不吃。'
        ]
      },
      {
        id: 'animal-choice-13',
        type: 'choice',
        question: '以下哪种植物被称为"见血封喉"？',
        options: [
          { id: 'A', text: '夹竹桃', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=oleander%20plant&image_size=square' },
          { id: 'B', text: '箭毒木', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=antiaris%20toxicaria%20poison%20tree&image_size=square' },
          { id: 'C', text: '曼陀罗', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=datura%20plant&image_size=square' },
          { id: 'D', text: '滴水观音', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=alocasia%20plant&image_size=square' }
        ],
        correctAnswer: 'B',
        answer: '箭毒木',
        analysis: [
          '箭毒木又称见血封喉，是世界上最毒的树木之一。',
          '它的树汁含有剧毒，接触伤口会迅速致人死亡。',
          '主要分布在热带地区，遇到时应保持距离。'
        ]
      },
      {
        id: 'animal-choice-14',
        type: 'choice',
        question: '含羞草长期接触会造成什么影响？',
        options: [
          { id: 'A', text: '没有任何影响', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=mimosa%20plant%20safe&image_size=square' },
          { id: 'B', text: '可能导致眉毛和头发脱落', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=hair%20loss%20from%20plant&image_size=square' },
          { id: 'C', text: '皮肤变白', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=skin%20whitening&image_size=square' },
          { id: 'D', text: '指甲变色', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=nail%20discoloration&image_size=square' }
        ],
        correctAnswer: 'B',
        answer: '可能导致眉毛和头发脱落',
        analysis: [
          '含羞草含有含羞草碱，长期接触会对人体造成伤害。',
          '这种物质会影响毛发的生长，导致脱发、眉毛脱落等。',
          '虽然含羞草很有趣，但不宜长期接触，尤其不要放在卧室。'
        ]
      },
      {
        id: 'animal-judge-1',
        type: 'judge',
        question: '被马蜂蜇伤后涂牙膏可以解毒止痛',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=toothpaste%20on%20wasp%20sting&image_size=square',
        correctAnswer: 'false',
        answer: '错误',
        analysis: [
          '牙膏没有解毒作用，反而可能感染伤口。',
          '正确做法是先用肥皂水冲洗，然后冷敷。',
          '如果出现过敏反应或蜇伤部位较多，应立即就医。'
        ]
      },
      {
        id: 'animal-judge-2',
        type: 'judge',
        question: '蜱虫叮咬后只要拔掉就不用再管了',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=tick%20removal&image_size=square',
        correctAnswer: 'false',
        answer: '错误',
        analysis: [
          '蜱虫可能传播多种疾病，如莱姆病、森林脑炎等。',
          '拔蜱虫时要确保完整拔出，不要留下头部。',
          '拔出后要消毒伤口，并观察是否出现发热、皮疹等症状。'
        ]
      },
      {
        id: 'animal-judge-3',
        type: 'judge',
        question: '被水母蜇伤后可以用淡水冲洗伤口',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fresh%20water%20jellyfish%20sting&image_size=square',
        correctAnswer: 'false',
        answer: '错误',
        analysis: [
          '淡水会使水母的刺细胞破裂，释放更多毒素。',
          '正确做法是用海水冲洗，或用白醋浸泡。',
          '严重蜇伤应立即就医，尤其是箱水母蜇伤。'
        ]
      },
      {
        id: 'animal-judge-4',
        type: 'judge',
        question: '被蜂类蜇伤后出现呼吸困难应立即拨打120',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=bee%20sting%20emergency%20call&image_size=square',
        correctAnswer: 'true',
        answer: '正确',
        analysis: [
          '呼吸困难是严重过敏反应的迹象，可能危及生命。',
          '这是过敏性休克的前兆，需要立即急救。',
          '有过敏史的人应随身携带抗过敏药物。'
        ]
      },
      {
        id: 'animal-judge-5',
        type: 'judge',
        question: '被海胆刺伤后可以用胶带粘贴的方式去除皮肤表面的细小刺毛',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=sea%20urchin%20spine%20removal&image_size=square',
        correctAnswer: 'true',
        answer: '正确',
        analysis: [
          '海胆刺细小且容易断裂在皮肤内，肉眼难以看清。',
          '用胶带粘贴可以粘出大部分细小刺毛。',
          '之后用温水浸泡，帮助剩余刺毛排出。'
        ]
      },
      {
        id: 'animal-judge-6',
        type: 'judge',
        question: '夹竹桃只误食才会有危险，用手摸摸没事',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=oleander%20touch&image_size=square',
        correctAnswer: 'false',
        answer: '错误',
        analysis: [
          '夹竹桃的汁液接触皮肤也会引起瘙痒、红肿。',
          '尤其是手上有伤口时，接触汁液可能导致中毒。',
          '修剪夹竹桃时应戴手套，避免直接接触。'
        ]
      },
      {
        id: 'animal-judge-7',
        type: 'judge',
        question: '滴水观音长得像芋头，可以当芋头吃',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=alocasia%20vs%20taro&image_size=square',
        correctAnswer: 'false',
        answer: '错误',
        analysis: [
          '滴水观音和芋头虽然外形相似，但滴水观音是有毒植物。',
          '误食滴水观音会引起喉咙肿胀、恶心呕吐，甚至窒息。',
          '不要将野生植物当作食物，除非确认无毒。'
        ]
      },
      {
        id: 'animal-judge-8',
        type: 'judge',
        question: '龟背竹的汁液接触皮肤后需要用大量清水冲洗',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=monstera%20sap%20skin&image_size=square',
        correctAnswer: 'true',
        answer: '正确',
        analysis: [
          '龟背竹的汁液含有草酸钙针晶，接触皮肤会引起刺痛和瘙痒。',
          '立即用大量清水冲洗可以减轻不适。',
          '修剪时应戴手套，避免直接接触汁液。'
        ]
      },
      {
        id: 'animal-judge-9',
        type: 'judge',
        question: '夜来香放在卧室里有利于睡眠',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=night%20blooming%20jasmine%20bedroom&image_size=square',
        correctAnswer: 'false',
        answer: '错误',
        analysis: [
          '夜来香在夜间会释放大量香气，对人体健康不利。',
          '浓郁的香气可能引起头晕、恶心、失眠等症状。',
          '尤其是高血压和心脏病患者，更应避免放在卧室。'
        ]
      },
      {
        id: 'animal-judge-10',
        type: 'judge',
        question: '有虫子咬过或有小动物吃过的蘑菇说明没有毒',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=insect%20eaten%20mushroom&image_size=square',
        correctAnswer: 'false',
        answer: '错误',
        analysis: [
          '许多对昆虫无害的蘑菇对人类却是剧毒的。',
          '昆虫和人类的生理结构不同，耐受的毒素也不同。',
          '不要以虫子是否吃过作为判断蘑菇是否有毒的标准。'
        ]
      }
    ]
  },
  {
    id: 'nature',
    title: '自然安全',
    questions: [
      {
        id: 'nature-choice-1',
        type: 'choice',
        question: '地震快要来的时候，井水会出什么怪毛病？',
        options: [
          { id: 'A', text: '起火', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=water%20fire%20earthquake&image_size=square' },
          { id: 'B', text: '沸腾', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=boiling%20well%20water&image_size=square' },
          { id: 'C', text: '变红', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=red%20well%20water&image_size=square' },
          { id: 'D', text: '泥石化', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=muddy%20well%20water&image_size=square' }
        ],
        correctAnswer: 'D',
        answer: '泥石化',
        analysis: [
          '地震前地下水位会变化，井水可能变浑浊、冒泡、翻花。',
          '这是因为地壳运动导致地下岩层发生变化。',
          '如果发现井水突然异常，要提高警惕。'
        ]
      },
      {
        id: 'nature-choice-2',
        type: 'choice',
        question: '下面哪个不是地震之后引发的连锁灾难？',
        options: [
          { id: 'A', text: '起火', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fire%20after%20earthquake&image_size=square' },
          { id: 'B', text: '海啸', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=tsunami%20after%20earthquake&image_size=square' },
          { id: 'C', text: '彩虹', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=rainbow%20natural&image_size=square' },
          { id: 'D', text: '泥石流', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=mudslide%20after%20earthquake&image_size=square' }
        ],
        correctAnswer: 'C',
        answer: '彩虹',
        analysis: [
          '地震可能引发火灾、海啸、泥石流等次生灾害。',
          '彩虹是自然气象现象，与地震无关。',
          '地震后要警惕各种次生灾害的发生。'
        ]
      },
      {
        id: 'nature-choice-3',
        type: 'choice',
        question: '海啸来了，最靠谱的信号是哪个？',
        options: [
          { id: 'A', text: '天空变黑', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=dark%20sky%20tsunami&image_size=square' },
          { id: 'B', text: '海水突然退潮', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=ocean%20receding%20tsunami&image_size=square' },
          { id: 'C', text: '风变大', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=strong%20wind%20tsunami&image_size=square' },
          { id: 'D', text: '打雷', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=thunder%20tsunami&image_size=square' }
        ],
        correctAnswer: 'B',
        answer: '海水突然退潮',
        analysis: [
          '海啸来临前，海水会异常退潮，露出大片海底。',
          '这是最可靠的海啸预警信号，看到后应立即撤离。',
          '退潮后很快会有巨浪袭来，不要贪恋海滩上的鱼虾。'
        ]
      },
      {
        id: 'nature-choice-4',
        type: 'choice',
        question: '海啸过去之后，下面哪种做法是对的？',
        options: [
          { id: 'A', text: '马上返回海边', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=return%20beach%20tsunami&image_size=square' },
          { id: 'B', text: '待在高处等待通知', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=stay%20high%20ground%20tsunami&image_size=square' },
          { id: 'C', text: '去海边捡东西', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=collect%20debris%20beach&image_size=square' },
          { id: 'D', text: '下海游泳', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=swim%20ocean%20tsunami&image_size=square' }
        ],
        correctAnswer: 'B',
        answer: '待在高处等待通知',
        analysis: [
          '海啸可能会有多次波浪，第一波过后可能还有更大的浪。',
          '只有接到官方安全通知后，才能返回海边。',
          '不要冒险返回，确保安全第一。'
        ]
      },
      {
        id: 'nature-choice-5',
        type: 'choice',
        question: '山要滑坡了，下面哪个现象说明有问题？',
        options: [
          { id: 'A', text: '树木长得更绿', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=green%20trees%20landslide&image_size=square' },
          { id: 'B', text: '地面出现裂缝', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=ground%20cracks%20landslide&image_size=square' },
          { id: 'C', text: '鸟儿飞来', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=birds%20flying%20landslide&image_size=square' },
          { id: 'D', text: '天气变晴', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=sunny%20weather%20landslide&image_size=square' }
        ],
        correctAnswer: 'B',
        answer: '地面出现裂缝',
        analysis: [
          '地面裂缝是山体滑坡的重要前兆。',
          '其他前兆还包括岩石崩塌、泉水浑浊等。',
          '发现异常应立即撤离，不要停留观察。'
        ]
      },
      {
        id: 'nature-choice-6',
        type: 'choice',
        question: '山要滑坡了，下面哪个现象说明有问题？',
        options: [
          { id: 'A', text: '花草盛开', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=flowers%20blooming%20landslide&image_size=square' },
          { id: 'B', text: '树木歪斜', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=tilted%20trees%20landslide&image_size=square' },
          { id: 'C', text: '蝴蝶飞舞', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=butterflies%20landslide&image_size=square' },
          { id: 'D', text: '阳光明媚', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=sunshine%20landslide&image_size=square' }
        ],
        correctAnswer: 'B',
        answer: '树木歪斜',
        analysis: [
          '树木歪斜是山体滑坡的明显迹象，说明地面已经移动。',
          '这时候必须立即撤离，不能抱有侥幸心理。',
          '住在山区的人要时刻关注山体变化。'
        ]
      },
      {
        id: 'nature-choice-7',
        type: 'choice',
        question: '山体开始滑下来了，应该往哪边跑？',
        options: [
          { id: 'A', text: '顺着滑坡方向跑', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=run%20with%20landslide&image_size=square' },
          { id: 'B', text: '往山上跑', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=run%20uphill%20landslide&image_size=square' },
          { id: 'C', text: '往两边跑', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=run%20sideways%20landslide&image_size=square' },
          { id: 'D', text: '原地不动', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=stay%20landslide&image_size=square' }
        ],
        correctAnswer: 'C',
        answer: '往两边跑',
        analysis: [
          '山体滑坡时，往滑坡方向跑会被追上，往山上跑可能来不及。',
          '正确做法是向滑坡体两侧跑，避开滑坡的冲击范围。',
          '跑到安全地带后，要远离滑坡区域，防止次生灾害。'
        ]
      },
      {
        id: 'nature-choice-8',
        type: 'choice',
        question: '去雪山玩，下面哪个是必须带的安全装备？',
        options: [
          { id: 'A', text: '防晒霜', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=sunscreen%20snow%20mountain&image_size=square' },
          { id: 'B', text: '墨镜', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=sunglasses%20snow%20mountain&image_size=square' },
          { id: 'C', text: '头盔', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=helmet%20snow%20mountain&image_size=square' },
          { id: 'D', text: '对讲机', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=walkie%20talkie%20snow%20mountain&image_size=square' }
        ],
        correctAnswer: 'A',
        answer: '防晒霜',
        analysis: [
          '雪山上紫外线极强，阳光反射会造成严重晒伤。',
          '防晒霜是必备的防护用品，SPF50+以上为宜。',
          '同时也要注意保暖和防止高原反应。'
        ]
      },
      {
        id: 'nature-choice-9',
        type: 'choice',
        question: '关于手机上收到的地震预警，下面哪个说法是对的？',
        options: [
          { id: 'A', text: '不用管，继续睡觉', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=ignore%20earthquake%20alert&image_size=square' },
          { id: 'B', text: '立即采取避险措施', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=earthquake%20shelter%20action&image_size=square' },
          { id: 'C', text: '出门看看情况', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=check%20outside%20earthquake&image_size=square' },
          { id: 'D', text: '发朋友圈', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=post%20social%20media%20earthquake&image_size=square' }
        ],
        correctAnswer: 'B',
        answer: '立即采取避险措施',
        analysis: [
          '地震预警是宝贵的逃生时间，要立即行动。',
          '室内应躲在桌子下等坚固物体旁，室外应远离建筑物。',
          '不要浪费预警时间做无关的事情。'
        ]
      },
      {
        id: 'nature-choice-10',
        type: 'choice',
        question: '地震的时候你正在开车，该怎么办？',
        options: [
          { id: 'A', text: '加速开快点', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fast%20driving%20earthquake&image_size=square' },
          { id: 'B', text: '找安全地方停车', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=park%20safe%20earthquake&image_size=square' },
          { id: 'C', text: '继续开', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=continue%20driving%20earthquake&image_size=square' },
          { id: 'D', text: '鸣笛提醒', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=honk%20horn%20earthquake&image_size=square' }
        ],
        correctAnswer: 'B',
        answer: '找安全地方停车',
        analysis: [
          '地震时开车非常危险，应尽快靠边停车。',
          '远离桥梁、隧道、建筑物等危险区域。',
          '停车后留在车内，地震结束后再小心驾驶。'
        ]
      },
      {
        id: 'nature-choice-11',
        type: 'choice',
        question: '台风预警有四个等级，最严重的是哪个？',
        options: [
          { id: 'A', text: '蓝色', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=blue%20typhoon%20warning&image_size=square' },
          { id: 'B', text: '黄色', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=yellow%20typhoon%20warning&image_size=square' },
          { id: 'C', text: '橙色', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=orange%20typhoon%20warning&image_size=square' },
          { id: 'D', text: '红色', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=red%20typhoon%20warning&image_size=square' }
        ],
        correctAnswer: 'D',
        answer: '红色',
        analysis: [
          '台风预警从低到高依次是蓝色、黄色、橙色、红色。',
          '红色预警表示台风即将或已经登陆，风力极大。',
          '红色预警时应停止一切户外活动，待在安全地方。'
        ]
      },
      {
        id: 'nature-choice-12',
        type: 'choice',
        question: '暴雨预警，最严重的是哪个？',
        options: [
          { id: 'A', text: '蓝色', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=blue%20rain%20warning&image_size=square' },
          { id: 'B', text: '黄色', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=yellow%20rain%20warning&image_size=square' },
          { id: 'C', text: '橙色', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=orange%20rain%20warning&image_size=square' },
          { id: 'D', text: '红色', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=red%20rain%20warning&image_size=square' }
        ],
        correctAnswer: 'D',
        answer: '红色',
        analysis: [
          '暴雨预警等级从低到高是蓝色、黄色、橙色、红色。',
          '红色预警表示降雨量非常大，可能引发洪水。',
          '红色预警时应避免外出，做好防洪准备。'
        ]
      },
      {
        id: 'nature-choice-13',
        type: 'choice',
        question: '台风天气，突然风雨停了，下面哪个做法是安全的？',
        options: [
          { id: 'A', text: '马上出门', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=go%20out%20typhoon&image_size=square' },
          { id: 'B', text: '继续待在屋里', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=stay%20home%20typhoon&image_size=square' },
          { id: 'C', text: '去阳台收衣服', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=collect%20clothes%20typhoon&image_size=square' },
          { id: 'D', text: '开窗通风', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=open%20window%20typhoon&image_size=square' }
        ],
        correctAnswer: 'B',
        answer: '继续待在屋里',
        analysis: [
          '台风眼经过时会出现短暂的平静，但这只是暂时的。',
          '之后会有更猛烈的风雨来袭，切勿外出。',
          '应继续待在安全的室内，等待台风完全过去。'
        ]
      },
      {
        id: 'nature-choice-14',
        type: 'choice',
        question: '台风天气，突然风雨停了，下面哪个做法是安全的？',
        options: [
          { id: 'A', text: '出门散步', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=walk%20out%20typhoon&image_size=square' },
          { id: 'B', text: '检查房屋', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=check%20house%20typhoon&image_size=square' },
          { id: 'C', text: '留在室内', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=stay%20inside%20typhoon&image_size=square' },
          { id: 'D', text: '晾晒衣物', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=dry%20clothes%20typhoon&image_size=square' }
        ],
        correctAnswer: 'C',
        answer: '留在室内',
        analysis: [
          '台风眼带来的平静是暴风雨来临前的假象。',
          '此时外出非常危险，可能被突然袭来的强风伤害。',
          '应继续留在安全室内，直到收到解除预警的通知。'
        ]
      },
      {
        id: 'nature-choice-15',
        type: 'choice',
        question: '洪水来了，下面哪个逃生方法是对的？',
        options: [
          { id: 'A', text: '往高处跑', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=run%20higher%20flood&image_size=square' },
          { id: 'B', text: '往低处跑', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=run%20lower%20flood&image_size=square' },
          { id: 'C', text: '待在地下室', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=stay%20basement%20flood&image_size=square' },
          { id: 'D', text: '躲进车里', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=stay%20car%20flood&image_size=square' }
        ],
        correctAnswer: 'A',
        answer: '往高处跑',
        analysis: [
          '洪水来临时，往高处跑是最安全的选择。',
          '可以爬到屋顶、大树或高地等待救援。',
          '不要试图开车穿越洪水，车辆很容易被冲走。'
        ]
      },
      {
        id: 'nature-choice-16',
        type: 'choice',
        question: '洪水退了以后，下面哪个做法是对的？',
        options: [
          { id: 'A', text: '马上回家', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=return%20home%20flood&image_size=square' },
          { id: 'B', text: '检查房屋安全后再进', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=check%20house%20flood&image_size=square' },
          { id: 'C', text: '喝自来水', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=drink%20tap%20water%20flood&image_size=square' },
          { id: 'D', text: '吃洪水浸泡过的食物', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=eat%20flood%20food&image_size=square' }
        ],
        correctAnswer: 'B',
        answer: '检查房屋安全后再进',
        analysis: [
          '洪水退去后，房屋可能存在结构安全隐患。',
          '要先检查房屋是否稳固，有无漏电风险。',
          '同时要注意饮用水安全，洪水可能污染水源。'
        ]
      },
      {
        id: 'nature-choice-17',
        type: 'choice',
        question: '遇到洪水被困住了，可以打哪些电话求救？',
        options: [
          { id: 'A', text: '110', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=police%20call%20110&image_size=square' },
          { id: 'B', text: '119', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fire%20call%20119&image_size=square' },
          { id: 'C', text: '120', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=ambulance%20call%20120&image_size=square' },
          { id: 'D', text: '以上都可以', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=emergency%20calls&image_size=square' }
        ],
        correctAnswer: 'D',
        answer: '以上都可以',
        analysis: [
          '洪水被困时，110、119、120都可以拨打求救。',
          '要清楚说明自己的位置，保持电话畅通。',
          '同时可以尝试发出求救信号，如挥动衣物、敲击金属等。'
        ]
      },
      {
        id: 'nature-choice-18',
        type: 'choice',
        question: '下面哪个情况说明洪水可能要来了？',
        options: [
          { id: 'A', text: '天气晴朗', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=sunny%20weather%20flood&image_size=square' },
          { id: 'B', text: '河水突然上涨', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=rising%20river%20flood&image_size=square' },
          { id: 'C', text: '鸟儿唱歌', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=birds%20singing%20flood&image_size=square' },
          { id: 'D', text: '月亮很圆', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=full%20moon%20flood&image_size=square' }
        ],
        correctAnswer: 'B',
        answer: '河水突然上涨',
        analysis: [
          '河水异常上涨是洪水来临的直接信号。',
          '其他迹象还包括暴雨持续、水位预警等。',
          '发现异常应立即做好撤离准备。'
        ]
      },
      {
        id: 'nature-choice-19',
        type: 'choice',
        question: '龙卷风与台风最大的区别是什么？',
        options: [
          { id: 'A', text: '颜色不同', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=tornado%20typhoon%20color&image_size=square' },
          { id: 'B', text: '规模不同', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=tornado%20typhoon%20size&image_size=square' },
          { id: 'C', text: '风力不同', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=tornado%20typhoon%20wind&image_size=square' },
          { id: 'D', text: '形状不同', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=tornado%20typhoon%20shape&image_size=square' }
        ],
        correctAnswer: 'B',
        answer: '规模不同',
        analysis: [
          '龙卷风是局部小范围的强风，直径通常几十米到几百米。',
          '台风是大范围的风暴，直径可达几百公里。',
          '两者的形成机制和影响范围都有很大差异。'
        ]
      },
      {
        id: 'nature-judge-1',
        type: 'judge',
        question: '地震前鸡鸭不进窝、老鼠大白天乱跑，可能是要地震了',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=animals%20earthquake%20precursor&image_size=square',
        correctAnswer: 'true',
        answer: '正确',
        analysis: [
          '许多动物对地震前的微小振动和磁场变化非常敏感。',
          '动物异常行为是地震前兆的重要观察指标。',
          '但这不是绝对的，需要结合其他因素综合判断。'
        ]
      },
      {
        id: 'nature-judge-2',
        type: 'judge',
        question: '地震了应该马上打开窗户跳楼',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=jump%20window%20earthquake&image_size=square',
        correctAnswer: 'false',
        answer: '错误',
        analysis: [
          '地震时跳楼非常危险，死亡率极高。',
          '正确做法是躲在坚固的桌子下或墙角，保护头部。',
          '等地震停止后，再有序撤离到安全地带。'
        ]
      },
      {
        id: 'nature-judge-3',
        type: 'judge',
        question: '地震的时候坐电梯下楼是最快的逃生办法',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=elevator%20earthquake%20escape&image_size=square',
        correctAnswer: 'false',
        answer: '错误',
        analysis: [
          '地震时电梯可能会故障，被困在里面非常危险。',
          '应该走楼梯下楼，注意避开掉落的物体。',
          '如果正在电梯里，应立即按下所有楼层按钮，等待救援。'
        ]
      },
      {
        id: 'nature-judge-4',
        type: 'judge',
        question: '大地震之后可能还会再震，所以别急着回已经被震坏的房子里',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=aftershock%20earthquake&image_size=square',
        correctAnswer: 'true',
        answer: '正确',
        analysis: [
          '大地震后会有多次余震，余震也可能造成伤害。',
          '被震坏的房子结构不稳定，随时可能倒塌。',
          '要等专业人员检查确认安全后，才能进入。'
        ]
      },
      {
        id: 'nature-judge-5',
        type: 'judge',
        question: '海啸在深海里浪头很高，到了岸边反而变小了',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=tsunami%20wave%20deep%20shallow&image_size=square',
        correctAnswer: 'false',
        answer: '错误',
        analysis: [
          '海啸在深海时浪头不高，但传播速度极快。',
          '到了浅水区，海水变浅，浪头会急剧升高。',
          '岸边的海啸威力巨大，可以摧毁沿海建筑。'
        ]
      },
      {
        id: 'nature-judge-6',
        type: 'judge',
        question: '海啸就一个大浪，第一浪过去就没事了，可以回去了',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=tsunami%20single%20wave&image_size=square',
        correctAnswer: 'false',
        answer: '错误',
        analysis: [
          '海啸通常由多个波浪组成，称为"波列"。',
          '第一浪过后，可能还有更大的浪接踵而来。',
          '必须等待官方发布安全通知后，才能返回。'
        ]
      },
      {
        id: 'nature-judge-7',
        type: 'judge',
        question: '山脚的泉水突然没水了或者突然变得特别大，说明山体可能有问题',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=spring%20water%20landslide&image_size=square',
        correctAnswer: 'true',
        answer: '正确',
        analysis: [
          '泉水异常变化是山体滑坡的前兆之一。',
          '这表明地下水位和岩层发生了变化。',
          '住在山区的人要密切关注泉水的变化。'
        ]
      },
      {
        id: 'nature-judge-8',
        type: 'judge',
        question: '山脚下来了倾盆大雨水了或者突然变得特别大，说明山体可能有问题',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=heavy%20rain%20landslide&image_size=square',
        correctAnswer: 'true',
        answer: '正确',
        analysis: [
          '暴雨会使山体土壤饱和，增加滑坡风险。',
          '持续降雨或突发暴雨后，要特别警惕滑坡。',
          '发现异常应及时撤离，不要心存侥幸。'
        ]
      },
      {
        id: 'nature-judge-9',
        type: 'judge',
        question: '一天之内新下的雪超过30厘米，发生雪崩的可能性就很大了',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=avalanche%20snowfall&image_size=square',
        correctAnswer: 'true',
        answer: '正确',
        analysis: [
          '大量新雪堆积会增加雪层的重量和不稳定性。',
          '超过30厘米的新雪是雪崩的高风险信号。',
          '在山区活动时要关注天气预报，避免高风险时段。'
        ]
      },
      {
        id: 'nature-judge-10',
        type: 'judge',
        question: '台风只有夏天才有，冬天不会有台风',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=typhoon%20season&image_size=square',
        correctAnswer: 'false',
        answer: '错误',
        analysis: [
          '台风主要发生在夏季和秋季，但冬春季节也可能出现。',
          '虽然冬季台风相对较少，但仍需保持警惕。',
          '全年都要关注台风预警信息。'
        ]
      },
      {
        id: 'nature-judge-11',
        type: 'judge',
        question: '发布了台风预警之后，住在海边的人要听当地政府安排，让撤就撤',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=evacuate%20typhoon&image_size=square',
        correctAnswer: 'true',
        answer: '正确',
        analysis: [
          '政府的疏散指令是基于专业判断做出的，必须遵守。',
          '不遵守疏散指令可能会面临生命危险。',
          '撤离时要携带必要物品，听从指挥有序撤离。'
        ]
      },
      {
        id: 'nature-judge-12',
        type: 'judge',
        question: '发布了台风预警之后，住在海边的人要听当地政府安排，让撤就撤',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=typhoon%20evacuation%20order&image_size=square',
        correctAnswer: 'true',
        answer: '正确',
        analysis: [
          '台风预警是官方发布的重要安全信息，必须重视。',
          '海边居民要提前做好准备，接到撤离通知后立即行动。',
          '不要抱有侥幸心理，确保生命安全。'
        ]
      },
      {
        id: 'nature-judge-13',
        type: 'judge',
        question: '台风"眼"过来了，风雨停了，可以出去走走',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=typhoon%20eye%20calm&image_size=square',
        correctAnswer: 'false',
        answer: '错误',
        analysis: [
          '台风眼是台风中心的平静区域，但只是暂时的。',
          '台风眼过后，会有更猛烈的风雨来袭。',
          '此时外出非常危险，应继续待在安全室内。'
        ]
      },
      {
        id: 'nature-judge-14',
        type: 'judge',
        question: '发洪水的时候，家里的自来水龙头接的水可以直接用来做饭',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=drinking%20water%20flood&image_size=square',
        correctAnswer: 'false',
        answer: '错误',
        analysis: [
          '洪水可能污染水源，自来水中可能含有细菌、病毒等。',
          '饮用污染水会引起肠道疾病，危害健康。',
          '应使用瓶装水或经过消毒处理的水。'
        ]
      },
      {
        id: 'nature-judge-15',
        type: 'judge',
        question: '洪水退了以后，家里要好好消毒一遍',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=disinfect%20flood%20home&image_size=square',
        correctAnswer: 'true',
        answer: '正确',
        analysis: [
          '洪水会带来大量细菌和污染物，必须彻底消毒。',
          '消毒范围包括地面、墙壁、家具和生活用品。',
          '可以使用含氯消毒剂进行消毒。'
        ]
      },
      {
        id: 'nature-judge-16',
        type: 'judge',
        question: '龙卷风一般会跟着冰雹、打雷、下暴雨一起来',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=tornado%20hail%20thunderstorm&image_size=square',
        correctAnswer: 'true',
        answer: '正确',
        analysis: [
          '龙卷风通常伴随强对流天气出现。',
          '这些天气现象都是由强烈的气流不稳定造成的。',
          '遇到这些天气要立即寻找安全庇护所。'
        ]
      },
      {
        id: 'nature-judge-17',
        type: 'judge',
        question: '城市涨水的时候，地下车库和地下室是最先被淹的',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=flooded%20garage%20basement&image_size=square',
        correctAnswer: 'true',
        answer: '正确',
        analysis: [
          '地下空间地势最低，洪水会首先涌入。',
          '暴雨天气应避免将车辆停在地下车库。',
          '住在地下室的居民要提前做好防洪准备。'
        ]
      },
      {
        id: 'nature-judge-18',
        type: 'judge',
        question: '打雷的时候躲在车里是安全的',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=lightning%20safe%20car&image_size=square',
        correctAnswer: 'true',
        answer: '正确',
        analysis: [
          '汽车是金属外壳，可以形成法拉第笼，保护车内人员。',
          '但要关闭车窗，不要触摸车内金属部件。',
          '不要在树下或高处躲避雷击。'
        ]
      },
      {
        id: 'nature-judge-19',
        type: 'judge',
        question: '大雾天开车，应该打开远光灯这样看得更远',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fog%20driving%20headlights&image_size=square',
        correctAnswer: 'false',
        answer: '错误',
        analysis: [
          '大雾天开远光灯会产生眩光，反而影响视线。',
          '应该打开近光灯和雾灯，保持安全车距。',
          '能见度极低时，应减速慢行或停车等待。'
        ]
      }
    ]
  }
];

export const getQuizByCategory = (categoryId: string): QuizCategory | undefined => {
  return quizCategories.find(cat => cat.id === categoryId);
};