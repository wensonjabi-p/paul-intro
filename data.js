/* =========================================================================
   Paul Bhang — Thought Constellation : DATA (single source of truth)
   -------------------------------------------------------------------------
   이 파일 하나만 고치면 사이트가 자랍니다. HTML/엔진은 건드릴 필요 없음.

   node.type:
     'core'        — 직접적인 나 (스킬/역할)
     'place'       — 나를 바꾼 장소 (지리적 기억)
     'associative' — 유사어·관심어 (사람들이 끌릴 인접 개념)
     'wildcard'    — 엉뚱해 보이지만 이야기를 숨긴 단어

   node.status:
     'told'  — Paul이 실제 이야기를 들려줘서 채워진 것
     'seed'  — 이력서 사실 기반으로 Claude가 초안 잡은 것
     'ask'   — 아직 Paul에게 물어보는 중 (진짜 이야기가 비어 있음)

   node.story  — 1인칭 스토리텔링 (이력서 나열 금지)
   node.links  — 성좌에서 이어질 관련 노드 id들
   ========================================================================= */

const DATA = {
  profile: {
    name: 'Paul Bhang',
    hangul: '방상훈',
    tagline: '15 years · 5 continents · 4 languages',
    places: 'HANGZHOU · SEOUL',
    hero1: '단어를 고르면,',
    hero2: '내가 보입니다.',
    heroSub: '머릿속을 떠다니는 단어들입니다. <b>두세 개를 골라 연결해 보세요</b> — 그 조합이 지나온 실제 이야기와 최근의 생각이 나타납니다. 어떤 단어는 나와 멀어 보여도, 클릭하면 이야기가 있습니다.',
    faces: 'LINGUIST · TRADER · MAKER · EDUCATOR · STORYTELLER · EXPLORER',
    email: 'bikeryhz@hotmail.com',
    location: 'Hangzhou, China · Yongin, Korea',
  },

  nodes: [
    /* ---------------- CORE : 직접적인 나 ---------------- */
    { id: 'interp', label: '통역·번역', type: 'core', status: 'seed',
      story: '말과 말 사이에 서는 일을 오래 했다. 한국어와 영어, 때로는 중국어 사이에서. 통역은 단어를 옮기는 게 아니라 두 사람이 서로를 믿게 만드는 일이라는 걸, 협상 테이블에서 배웠다.',
      links: ['multiling', 'bridge', 'vienna', 'shanghai'] },
    { id: 'multiling', label: '다국어', type: 'core', status: 'seed',
      story: '한국어는 모국어, 영어는 몸에 밴 언어, 중국어와 일본어는 살면서 주운 언어다. 네 개의 언어는 네 개의 인격에 가깝다. 언어를 바꾸면 생각의 결도 바뀐다.',
      links: ['interp', 'teaching', 'boundary'] },
    { id: 'sales', label: 'B2B 영업', type: 'core', status: 'seed',
      story: '소금부터 목재, 매장 집기, 자동차 부품까지 팔았다. 파는 물건은 계속 바뀌었지만 본질은 늘 같았다 — 상대가 무엇을 진짜로 원하는지 알아내는 일.',
      links: ['salt', 'timber', 'shanghai', 'trade'] },
    { id: 'pm', label: '프로젝트 관리', type: 'core', status: 'seed',
      story: '베이징현대 프로젝트를 관리할 때 깨달았다. 기술 문제의 절반은 사실 문화 문제였다는 걸. 중재할 수 있는 사람이 프로젝트를 살린다.',
      links: ['shanghai', 'interp', 'boundary'] },
    { id: 'subtitle', label: '영상·자막', type: 'core', status: 'seed',
      story: '6년간 한국어와 영어 사이의 자막을 만들었다. 번역은 언어의 문제가 아니라 타이밍과 리듬, 그리고 화면에 담기지 않는 함축의 문제였다. 한 줄에 담을 수 있는 건 생각보다 적다.',
      links: ['subline', 'interp', 'hangzhou'] },
    { id: 'bike', label: '자전거', type: 'core', status: 'seed',
      story: '서른둘에 도쿄의 자전거 학교에 들어갔다. 남들이 경력을 쌓을 나이에 나는 바퀴를 조립하는 법을 배웠다. 머리로만 살던 사람이 처음으로 손끝으로 세상을 이해하기 시작한 시기.',
      links: ['tokyo', 'hands', 'chain'] },
    { id: 'logi', label: '물류', type: 'core', status: 'seed',
      story: '항공·해상 화물을 다루며 100개가 넘는 파트너사와 일했다. 물류는 신뢰가 곧 인프라인 세계다. 한 번의 실수가 지구 반대편의 누군가를 멈춰 세운다.',
      links: ['vienna', 'trade', 'survival'] },
    { id: 'teaching', label: '언어 교육', type: 'core', status: 'seed',
      story: '지금은 항저우사범대에서 한국어를 가르친다. 언어를 가르친다는 건 문법이 아니라 문화로 들어가는 문을 열어주는 일이다. 소프트파워는 교실에서 시작된다.',
      links: ['multiling', 'hangzhou', 'bridge'] },

    /* ---------------- PLACE : 나를 바꾼 장소 ---------------- */
    { id: 'pakistan', label: '파키스탄', type: 'place', era: '1997–1998', status: 'told',
      story: '아버지가 해군 장교로 파키스탄에 파견되면서, 열네 살의 나는 이슬라마바드에서 살게 됐다. 처음 마주한 충격은 이슬람이라는 종교가 사람들의 삶을 통째로 빚어내는 방식이었다. 가치관이 송두리째 흔들릴 만큼 거대한 변화 앞에서도 사람은 결국 그 안에서 적응한다는 것 — 그리고 그 적응 속에서 피어난 수많은 생각이 삶의 방식 자체를 바꿔놓는다는 것을, 그 나이에 처음 몸으로 알았다.',
      links: ['stranger', 'boundary', 'adapt', 'islam'] },
    { id: 'png', label: '파푸아뉴기니', type: 'place', era: '2009–2010', status: 'told',
      story: '포트모르즈비에서 마주한 삶은 파키스탄보다 더 극단적이었다. 일터 곁에서 죽음은 멀지 않았고, 말라리아는 너무 흔했다. 그곳에서 내가 상식이라 믿어온 것들이 실은 내가 자란 한 세계의 규칙일 뿐이었다는 걸 처음 알았다. 편안했던 적 없는 이 땅이, 내 상식의 경계를 다시 그렸다.',
      links: ['timber', 'survival', 'stranger', 'commonsense'] },
    { id: 'vienna', label: '비엔나', type: 'place', era: '2005–2007', status: 'seed',
      story: '스물몇 살에 비엔나 공항의 지사를 혼자 세웠다. 낯선 도시에서 회사 하나를 처음부터 만드는 일. 유럽의 한복판에서 나는 이방인이었고, 그게 오히려 무기가 됐다.',
      links: ['logi', 'stranger', 'boundary'] },
    { id: 'tokyo', label: '도쿄', type: 'place', era: '2014–2016', status: 'seed',
      story: '경력을 잠시 접고 자전거 디자인을 배우러 도쿄로 갔다. 학생으로 돌아간다는 것, 손으로 만드는 법을 배운다는 것. 인생에서 가장 이상하고 가장 옳았던 방향 전환.',
      links: ['bike', 'hands', 'drift'] },
    { id: 'shanghai', label: '상하이', type: 'place', era: '2010–2013', status: 'seed',
      story: '매장 집기를 유럽에 수출하다가, 자동차 안전부품 회사의 프로그램 매니저가 됐다. 한국과 중국 비즈니스 문화 사이의 통역자 — 그게 내 진짜 직함이었다.',
      links: ['sales', 'pm', 'interp'] },
    { id: 'hangzhou', label: '항저우', era: '2017–현재', type: 'place', status: 'seed',
      story: '게스트하우스를 열고, 자막을 만들고, 지금은 대학에서 가르친다. 오래 떠돌던 사람이 처음으로 한곳에 뿌리를 내린 도시. 아직 쓰이는 중인 챕터.',
      links: ['teaching', 'subtitle', 'guesthouse'] },
    { id: 'jinhae', label: '진해', type: 'place', era: '2003–2005', status: 'seed',
      story: '해군사관학교에서 영어 조교로 복무했다. 미 해군 교관 옆에서 사관생도를 가르치고, 군 행사에서 통역했다. 언어가 기술이 아니라 책임이라는 걸 처음 배운 곳.',
      links: ['interp', 'teaching'] },

    /* ---------------- ASSOCIATIVE : 유사어·관심어 ---------------- */
    { id: 'nomad', label: '노마드', type: 'associative', status: 'seed',
      story: '한 도시에 오래 머문 적이 없다. 서울, 비엔나, 포트모르즈비, 상하이, 도쿄, 항저우. 떠도는 건 도망이 아니라 수집이었다 — 매번 다른 방식의 삶을 주워 담았다.',
      links: ['drift', 'stranger', 'survival'] },
    { id: 'boundary', label: '경계인', type: 'associative', status: 'seed',
      story: '어디서든 완전한 안이 아니었고 완전한 밖도 아니었다. 한국인이면서 중국에서 가르치고, 세일즈맨이면서 정비공이었다. 경계에 선 사람만 볼 수 있는 것들이 있다.',
      links: ['stranger', 'bridge', 'nomad'] },
    { id: 'stranger', label: '이방인', type: 'associative', status: 'seed',
      story: '낯선 사람으로 사는 데 익숙하다. 이방인은 아무것도 당연하게 여기지 않기 때문에 더 많이 본다. 불편함은 오래전에 나의 기본값이 됐다.',
      links: ['boundary', 'nomad', 'pakistan'] },
    { id: 'hands', label: '손끝', type: 'associative', status: 'seed',
      story: '머리로만 살던 사람이 자전거를 만지며 손끝으로 생각하기 시작했다. 물리적으로 무언가를 고칠 줄 아는 사람은 세상을 다르게 신뢰한다.',
      links: ['bike', 'chain', 'tokyo'] },
    { id: 'survival', label: '생존', type: 'associative', status: 'seed',
      story: '인프라가 없는 곳, 규칙이 다른 곳에서 사업을 굴려봤다. 살아남는다는 건 계획대로 되는 게 아니라, 계획이 무너진 뒤에도 계속 움직이는 능력이었다.',
      links: ['png', 'nomad', 'trade'] },
    { id: 'bridge', label: '다리', type: 'associative', status: 'seed',
      story: '평생 두 세계 사이에 다리를 놓는 일을 했다. 언어와 언어, 문화와 문화, 사는 쪽과 파는 쪽. 다리는 양쪽 어디에도 온전히 속하지 않아야 제 역할을 한다.',
      links: ['interp', 'boundary', 'teaching'] },
    { id: 'drift', label: '표류', type: 'associative', status: 'seed',
      story: '직선으로 산 적이 없다. 물류에서 창업으로, 목재에서 자전거로, 궤도는 늘 휘어졌다. 표류처럼 보였지만 지나고 보니 하나의 지도였다.',
      links: ['nomad', 'tokyo', 'drift'] },
    { id: 'adapt', label: '적응', type: 'associative', status: 'told',
      story: '가치관이 흔들릴 만큼 거대한 변화 앞에서도 사람은 그 안에서 적응한다. 열네 살의 파키스탄에서 배운 것. 적응은 굴복이 아니라, 낡은 세계가 무너진 자리에서 새로운 생각이 피어나는 과정이었다.',
      links: ['pakistan', 'boundary', 'survival'] },
    { id: 'commonsense', label: '상식', type: 'associative', status: 'told',
      story: '내가 상식이라 부르던 것들은 대개 내가 자란 한 세계의 규칙일 뿐이었다. 파푸아뉴기니가 그 경계를 무너뜨린 뒤로, 나는 어떤 것도 당연하게 여기지 않는 사람이 됐다.',
      links: ['png', 'stranger', 'survival'] },
    { id: 'islam', label: '이슬람', type: 'associative', status: 'ask',
      story: '이슬라마바드에서 처음 마주한, 종교가 한 사회의 삶을 통째로 빚어내는 방식. 열네 살의 눈에 그것은 가장 낯설고 강렬한 첫 장면이었다. — 이 이야기는 Paul과 더 깊이 나눌 예정이다.',
      links: ['pakistan', 'stranger', 'boundary'] },

    /* ---------------- WILDCARD : 엉뚱하지만 이야기가 있는 ---------------- */
    { id: 'salt', label: '소금', type: 'wildcard', status: 'seed',
      story: '히말라야 암염을 파키스탄에서 수입해 팔았다. RS Business, 내가 처음 세운 회사. 소금 한 자루에서 무역의 전체 사이클 — 공급, 물류, 시장 — 을 통째로 배웠다.',
      links: ['trade', 'pakistan', 'sales'] },
    { id: 'timber', label: '목재', type: 'wildcard', status: 'seed',
      story: '파푸아뉴기니의 제재소에서 목재를 다뤘다. 나무를 베고, 켜고, 팔았다. 자연에서 바로 나온 원자재를 다루는 일은 도시의 비즈니스와 완전히 다른 감각을 요구했다.',
      links: ['png', 'sales', 'survival'] },
    { id: 'noni', label: '노니', type: 'wildcard', status: 'seed',
      story: 'PNG에서 투자할 아이템을 찾아 헤맬 때 목록에 있던 것 중 하나. 노니, 커피, 흑단, 고철, 심지어 태권도까지. 무엇이든 사업이 될 수 있는 곳에서 나는 가능성의 냄새를 맡는 법을 익혔다.',
      links: ['png', 'coffee', 'trade'] },
    { id: 'coffee', label: '커피', type: 'wildcard', status: 'seed',
      story: 'PNG의 고원지대는 세계적인 커피 산지다. 투자 조사 목록에 커피가 있었다. 결국 하진 않았지만, 그때 배운 시장 읽는 눈은 남았다.',
      links: ['noni', 'png'] },
    { id: 'ebony', label: '흑단', type: 'wildcard', status: 'seed',
      story: '검고 단단한 나무, 흑단. PNG에서 이걸 투자 아이템으로 검토했다. 희귀한 것에는 늘 이야기와 위험이 함께 붙어 있었다.',
      links: ['noni', 'timber', 'png'] },
    { id: 'taekwondo', label: '태권도', type: 'wildcard', status: 'seed',
      story: '믿기 어렵겠지만, PNG 투자 조사 목록에 태권도가 있었다. 한국의 것을 남태평양에 심는 상상. 결국 다른 형태로 — 언어와 문화를 가르치는 일로 — 이뤄진 셈이다.',
      links: ['png', 'teaching', 'bridge'] },
    { id: 'scrap', label: '고철', type: 'wildcard', status: 'seed',
      story: '고철도 사업 아이템이었다. 남들이 쓰레기라 부르는 것에서 가치를 보는 일. 버려진 것에서 다시 쓸모를 찾는 눈은, 사람에게도 똑같이 쓰인다.',
      links: ['png', 'survival', 'trade'] },
    { id: 'subline', label: '자막 한 줄', type: 'wildcard', status: 'seed',
      story: '자막 한 줄에 담을 수 있는 글자 수는 정해져 있다. 그 제약 안에서 원문의 뜻과 감정을 모두 살려야 했다. 제약은 창의의 반대말이 아니라 그 조건이었다.',
      links: ['subtitle', 'interp'] },
    { id: 'chain', label: '체인', type: 'wildcard', status: 'seed',
      story: '자전거 체인은 기름과 먼지로 더러워지는 부품이지만, 그게 없으면 아무 데도 못 간다. 눈에 안 띄지만 모든 걸 움직이게 하는 것들 — 나는 늘 그런 것에 끌렸다.',
      links: ['bike', 'hands'] },
    { id: 'trade', label: '무역', type: 'wildcard', status: 'seed',
      story: '평생 무언가를 국경 너머로 옮겼다. 소금, 주스 원액, 목재, 매장 집기. 무역은 물건이 아니라 신뢰를 국경 너머로 옮기는 일이었다.',
      links: ['salt', 'sales', 'logi', 'boundary'] },
    { id: 'guesthouse', label: '게스트하우스', type: 'wildcard', status: 'seed',
      story: '항저우에서 게스트하우스를 열었다. 이벤트, 마케팅, 자전거 정비까지 혼자 다 했다. 멀티태스킹처럼 보였지만 사실은 비즈니스 전체를 한 몸으로 이해하는 훈련이었다.',
      links: ['hangzhou', 'hands', 'survival'] },
  ],

  /* 시간이 흐르는 생각들 — 특정 노드에 걸려 있음 */
  thoughts: [
    { id: 'th1', text: '15년간 5개 대륙에서 일하며 배운 것: 언어와 문화는 기술 스펙만큼 중요하다. 계약의 절반은 신뢰와 이해에서 나온다.',
      tags: ['multiling', 'boundary', 'bridge'], daysAgo: 0 },
    { id: 'th2', text: '자전거를 만지며 느낀 것 — 손으로 고칠 줄 아는 사람은 세상을 다르게 신뢰한다. 물리적 이해가 사고의 바닥을 만든다.',
      tags: ['bike', 'hands'], daysAgo: 1 },
    { id: 'th3', text: '소금과 주스 원액을 동시에 팔던 시절: 작은 사업이라도 전체 사이클을 이해하면, 어떤 산업이든 다시 읽을 수 있게 된다.',
      tags: ['salt', 'trade', 'sales'], daysAgo: 2 },
    { id: 'th4', text: '이방인으로 사는 데 익숙해지면, 아무것도 당연하지 않아서 더 많이 보게 된다. 불편함이 오래전에 기본값이 됐다.',
      tags: ['stranger', 'boundary', 'nomad'], daysAgo: 3 },
    { id: 'th5', text: '표류처럼 보였던 궤도가 지나고 보니 하나의 지도였다. 직선이 아니어도 방향은 있었다.',
      tags: ['drift', 'nomad'], daysAgo: 4 },
    { id: 'th6', text: '가장 낯선 곳에서 생각이 가장 크게 바뀌었다. 파키스탄과 파푸아뉴기니 — 편안했던 적 없는 곳들이 나를 만들었다.',
      tags: ['pakistan', 'png', 'stranger'], daysAgo: 5 },
    { id: 'th7', text: '파키스탄에서는 거대한 변화 속에서도 사람이 적응한다는 걸 배웠고, 파푸아뉴기니에서는 내 상식이 얼마나 좁은 세계의 규칙이었는지를 배웠다. 낯섦은 늘 스승이었다.',
      tags: ['adapt', 'commonsense', 'pakistan', 'png'], daysAgo: 0 },
  ],

  /* 넛지 루프 — Claude가 아직 Paul에게 묻고 싶은 것들.
     대화하며 하나씩 채우고, 채워지면 여기서 지운다. */
  openQuestions: [
    { node: 'islam', q: '이슬람이 사람들의 삶을 빚어내던 그 방식 — 열네 살의 눈에 구체적으로 어떤 장면이 남아 있나요?' },
    { node: 'png', q: '파푸아뉴기니가 당신의 상식을 다시 그렸다고 했죠. 그 시절의 하루하루는 어떤 모습이었나요?' },
    { node: 'vienna', q: '혼자 비엔나 지사를 세울 때 가장 무서웠던 순간은 언제였나요?' },
    { node: 'tokyo', q: '서른둘에 다시 학생이 되기로 결심한 그 순간엔 무슨 생각을 했나요?' },
  ],
};

if (typeof window !== 'undefined') window.DATA = DATA;
