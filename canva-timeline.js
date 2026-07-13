/* =========================================================================
   Paul Intro — Canva Timeline Integration
   경력·여행 데이터를 Canva 인포그래픽으로 자동 변환
   ========================================================================= */

/**
 * data.js의 place/experience 노드를 연도순으로 추출
 * @returns {Array} 시간순 경력 배열
 */
function getTimelineEvents() {
  if (!window.DATA || !window.DATA.nodes) return [];

  // place 타입의 노드들만 추출 (경력·여행)
  const events = window.DATA.nodes
    .filter(node => node.type === 'place' && node.era)
    .map(node => {
      const [startYear, endYear] = parseEra(node.era);
      return {
        id: node.id,
        label: node.label,
        era: node.era,
        startYear,
        endYear: endYear || new Date().getFullYear(),
        story: node.story,
        status: node.status
      };
    })
    .sort((a, b) => a.startYear - b.startYear);

  return events;
}

/**
 * era 문자열 파싱 (예: "2005–2007", "2017–현재", "1996 무렵")
 * @param {String} era
 * @returns {Array} [startYear, endYear]
 */
function parseEra(era) {
  const currentYear = new Date().getFullYear();

  // "2005–2007" 형식
  const rangeMatch = era.match(/(\d{4})[\s–-]+([\d현재무렵]+)/);
  if (rangeMatch) {
    const start = parseInt(rangeMatch[1]);
    const end = rangeMatch[2] === '현재' ? currentYear : parseInt(rangeMatch[2]) || start;
    return [start, end];
  }

  // "1996" 또는 "1996 무렵" 형식
  const singleMatch = era.match(/(\d{4})/);
  if (singleMatch) {
    const year = parseInt(singleMatch[1]);
    return [year, year];
  }

  return [currentYear, currentYear];
}

/**
 * 경력 정보를 Canva Autofill 데이터로 변환
 * @param {Object} event 경력 이벤트
 * @returns {Object} Canva Autofill 용 JSON
 */
function eventToCanvaData(event) {
  const durationYears = event.endYear - event.startYear;
  const duration = durationYears === 0 ? '단기' : `${durationYears}년`;

  return {
    title: event.label,           // 장소·회사명
    subtitle: event.era,          // 기간 (예: 2005–2007)
    period: `${event.startYear}-${event.endYear}`,
    duration: duration,
    description: event.story.substring(0, 200),  // 첫 200자
    fullStory: event.story,
    year: `${event.startYear}`
  };
}

/**
 * 테스트 Canva 템플릿 URL (사용자가 직접 만든 템플릿으로 대체)
 */
const CANVA_TIMELINE_TEMPLATE_ID = 'DAG6P0bUsmA'; // 테스트용 (사용자가 수정)

/**
 * Autofill URL 생성
 * @param {Object} event
 * @returns {String} Canva Autofill URL
 */
function generateTimelineCanvaUrl(event) {
  const data = eventToCanvaData(event);
  const encodedData = encodeURIComponent(JSON.stringify(data));

  return `https://www.canva.com/design/${CANVA_TIMELINE_TEMPLATE_ID}?data=${encodedData}`;
}

/**
 * 전체 타임라인을 Canva로 생성
 * 각 경력을 개별 카드로 열기
 */
function generateFullTimeline() {
  const events = getTimelineEvents();

  if (events.length === 0) {
    alert('경력 정보를 찾을 수 없습니다.');
    return;
  }

  // 첫 번째 이벤트를 기본으로 Canva 오픈
  const firstEvent = events[0];
  const url = generateTimelineCanvaUrl(firstEvent);

  console.log('📊 타임라인 생성:', {
    이벤트개수: events.length,
    첫번째: firstEvent.label,
    url: url
  });

  // Canva 오픈
  window.open(url, '_blank');
}

/**
 * 특정 경력을 선택해서 Canva 카드 생성
 * @param {String} eventId
 */
function generateEventCanva(eventId) {
  const events = getTimelineEvents();
  const event = events.find(e => e.id === eventId);

  if (!event) {
    alert('이 이벤트를 찾을 수 없습니다.');
    return;
  }

  const url = generateTimelineCanvaUrl(event);
  window.open(url, '_blank');
}

/**
 * HTML에서 사용할 타임라인 레이아웃 생성
 * @returns {String} HTML
 */
function renderTimelineUI() {
  const events = getTimelineEvents();

  let html = `
    <div class="canva-timeline-container" style="margin: 40px 0;">
      <div class="timeline-header" style="text-align: center; margin-bottom: 30px;">
        <h2 style="font-size: 24px; margin-bottom: 10px;">📊 경력 타임라인</h2>
        <p style="color: #8a879c; font-size: 14px;">클릭하면 Canva로 시각화됩니다</p>
        <button onclick="generateFullTimeline()" style="
          margin-top: 15px;
          padding: 12px 24px;
          background: #d4a24e;
          color: #050419;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          font-size: 14px;
        ">🎨 전체 타임라인 생성</button>
      </div>

      <div class="timeline" style="position: relative; padding: 20px 0;">
  `;

  events.forEach((event, idx) => {
    const isEven = idx % 2 === 0;
    const alignment = isEven ? 'left' : 'right';

    html += `
      <div class="timeline-item" style="
        margin-bottom: 30px;
        display: flex;
        justify-content: ${isEven ? 'flex-start' : 'flex-end'};
      ">
        <div class="timeline-card" style="
          background: rgba(212, 162, 78, 0.08);
          border-left: 3px solid #d4a24e;
          padding: 20px;
          max-width: 400px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
        " onmouseover="this.style.background='rgba(212, 162, 78, 0.15)'"
          onmouseout="this.style.background='rgba(212, 162, 78, 0.08)'"
          onclick="generateEventCanva('${event.id}')">
          <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 10px;">
            <div>
              <div style="font-size: 18px; font-weight: 600; color: #e8c37a;">${event.label}</div>
              <div style="font-size: 12px; color: #8a879c; margin-top: 4px;">${event.era}</div>
            </div>
            <div style="background: #d4a24e; color: #050419; padding: 4px 12px; border-radius: 4px; font-size: 12px; font-weight: 600;">
              ${event.startYear === event.endYear ? '단기' : `${event.endYear - event.startYear}년`}
            </div>
          </div>
          <p style="font-size: 13px; color: #edebe6; line-height: 1.6; margin-bottom: 12px;">
            ${event.story.substring(0, 150)}...
          </p>
          <div style="font-size: 12px; color: #d4a24e; font-weight: 500;">
            → Canva로 보기
          </div>
        </div>
      </div>
    `;
  });

  html += `
      </div>

      <div class="timeline-stats" style="
        margin-top: 40px;
        padding: 20px;
        background: rgba(212, 162, 78, 0.05);
        border-radius: 8px;
        text-align: center;
      ">
        <div style="font-size: 13px; color: #8a879c;">
          총 <strong style="color: #d4a24e; font-size: 16px;">${events.length}</strong>개 경력·여행지
          <br>
          <span style="font-size: 12px;">
            ${events[0].startYear} – ${events[events.length - 1].endYear}
            (${events[events.length - 1].endYear - events[0].startYear}년)
          </span>
        </div>
      </div>
    </div>
  `;

  return html;
}

// 페이지 로드 시 자동 초기화 (index.html에서 호출)
document.addEventListener('DOMContentLoaded', () => {
  console.log('✅ Canva Timeline 준비됨');
});
