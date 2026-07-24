const LINK_LABELS = {
  notion: "Notion",
  github: "GitHub",
  vercel: "Deploy",
  googleDoc: "Google Doc",
  googleSheet: "Sheet",
  canva: "Canva",
  lemonSqueezy: "Lemon Squeezy",
  local: "Open in hub",
};

function lang() {
  return window.HubI18n && HubI18n.getLang() === "ko" ? "ko" : "en";
}

function t(obj) {
  if (!obj) return "";
  const l = lang();
  return obj[l] || obj.en || "";
}

function isHttpUrl(s) {
  return typeof s === "string" && /^https?:\/\//i.test(s);
}

function renderGlobal(data) {
  const box = document.getElementById("global-links");
  if (!box) return;
  const entries = [
    ["Notion home", data.notion?.pmHomePage || data.notion?.workspaceHome],
    ["Map DB", data.notion?.mapDatabase],
    ["Milestones", data.notion?.milestonesDatabase],
    ["Content Sheet", data.google?.contentQueueSheet],
    ["Canva folder", data.canva?.brandFolder],
    ["GitHub repo", data.github?.repo],
    ["Workflow doc", "https://github.com/wensonjabi-p/paul-intro/blob/main/docs/ops-paul-workflow.md"],
  ];
  box.innerHTML = "";
  entries.forEach(([label, url]) => {
    const a = document.createElement("a");
    a.textContent = label;
    if (isHttpUrl(url)) {
      a.href = url;
      a.target = "_blank";
      a.rel = "noopener";
    } else {
      a.classList.add("missing");
      a.href = "#";
      a.title = "Add URL in hub/config/ops-links.json";
    }
    box.appendChild(a);
  });
}

function renderMilestones(data) {
  const root = document.getElementById("milestones");
  if (!root) return;
  root.innerHTML = "";
  (data.milestones || []).forEach((m) => {
    const el = document.createElement("article");
    el.className = "milestone-card";
    const target = m.targetDate ? ` · ${m.targetDate}` : "";
    el.innerHTML = `
      <h3>${t(m.title)}</h3>
      <p class="milestone-meta">Phase ${m.phase} · ${m.status}${target}</p>
      <p class="item-goal">${m.successMetric || ""}</p>
    `;
    root.appendChild(el);
  });
}

function renderItems(data) {
  const root = document.getElementById("items");
  if (!root) return;
  root.innerHTML = "";
  const sorted = [...(data.items || [])].sort((a, b) => a.phase - b.phase || a.id.localeCompare(b.id));
  sorted.forEach((item) => {
    const card = document.createElement("article");
    card.className = "item-card";
    card.dataset.phase = String(item.phase);
    card.dataset.status = item.status;

    const links = item.links || {};
    const linkHtml = Object.keys(LINK_LABELS)
      .map((key) => {
        const url = links[key];
        const label = LINK_LABELS[key];
        if (isHttpUrl(url)) {
          return `<a class="link-btn" href="${url}" target="_blank" rel="noopener">${label}</a>`;
        }
        if (key === "local" && url) {
          const href = url.startsWith("http") ? url : new URL(url, window.location.href).href;
          return `<a class="link-btn" href="${href}">${label}</a>`;
        }
        return `<span class="link-btn disabled">${label}</span>`;
      })
      .join("");

    const ok = item.paulOk ? `<span class="paul-ok yes">Paul OK</span>` : `<span class="paul-ok">Awaiting OK</span>`;

    card.innerHTML = `
      <header>
        <h3>${t(item.title)}</h3>
        <div class="item-badges">
          <span class="badge">Phase ${item.phase}</span>
          <span class="badge">${item.area}</span>
          <span class="badge status-${item.status}">${item.status}</span>
          ${ok}
        </div>
      </header>
      <p class="item-goal"><strong>Goal:</strong> ${item.goal || "—"}</p>
      <div class="progress-row">
        <div class="progress-bar"><div class="progress-fill" style="width:${Math.min(100, item.progress || 0)}%"></div></div>
        <span class="progress-pct">${item.progress ?? 0}%</span>
      </div>
      <div class="link-row">${linkHtml}</div>
    `;
    root.appendChild(card);
  });
}

async function init() {
  const res = await fetch("../config/ops-links.json");
  const data = await res.json();
  renderGlobal(data);
  renderMilestones(data);
  renderItems(data);
}

document.addEventListener("DOMContentLoaded", init);
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("lang-btn")) setTimeout(init, 0);
});
