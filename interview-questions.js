/* 인터뷰 질문 — 앱(interview.html)이 이 파일을 읽어 렌더링한다.
   Claude가 "인터뷰 업데이트" 때 여기서 답한 질문을 빼고 새 질문을 채운다.
   tier: 'light'(🟢 가볍게) | 'deep'(🔵 더 깊이) | 'fact'(⚪ 사실·맥락)
   node: data.js에서 이 답이 연결될 노드 태그(참고용). */
window.INTERVIEW = {
  updated: '2026-07-13',
  questions: [
    { id: 'q1', tier: 'light', node: 'chain·bike', q: '자전거를 고치거나 만들면서 가장 뿌듯했던 순간이 있다면?' },
    { id: 'q2', tier: 'light', node: 'subline', q: '자막 작업하면서 가장 옮기기 어려웠던 표현이나 장면이 있었나요?' },
    { id: 'q3', tier: 'light', node: 'multiling', q: '네 개 언어 중, 쓸 때 스스로 가장 다른 사람이 되는 것 같은 언어는? 왜?' },
    { id: 'q4', tier: 'light', node: 'nomad', q: '여러 나라를 살아본 중에, 음식이 가장 그리운 곳은?' },
    { id: 'q5', tier: 'deep', node: 'vienna', q: '비엔나에서 혼자 지사를 세우던 시절, 가장 무섭거나 외로웠던 순간은?' },
    { id: 'q6', tier: 'deep', node: 'shanghai', q: '상하이·베이징현대에서 한국과 중국 문화 사이를 중재하며 겪은, 잊지 못할 에피소드 하나.' },
    { id: 'q7', tier: 'deep', node: 'guesthouse', q: '게스트하우스를 열기로 결심한 이유, 그때 꿈꿨던 것은?' },
    { id: 'q8', tier: 'deep', node: 'teaching·hangzhou', q: '지금 항저우에서 학생들을 가르치며 가장 보람을 느끼는 순간은?' },
    { id: 'q9', tier: 'deep', node: 'malaria·commonsense', q: '파푸아뉴기니 생활을 마치고 한국에 돌아와, "내가 달라졌구나"를 처음 느낀 구체적 순간이 있나요?' },
    { id: 'q10', tier: 'fact', node: 'ireland', q: '아일랜드 첫 여행은 어떻게 계획됐나요? (누구와, 왜 하필 아일랜드)' },
    { id: 'q11', tier: 'fact', node: 'trade', q: '무역을 배우던 그 시절, 소금 말고 또 어떤 엉뚱한 아이템들을 찾아다녔나요?' },
    { id: 'q12', tier: 'fact', node: 'hangzhou', q: '지금 항저우에서 보내는 하루는 대체로 어떤 모습인가요?' },
  ],
};
