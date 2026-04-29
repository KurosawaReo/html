
//新しいタブで開く.
const openNewTab = (url) => {
  window.open(url, "_blank", "noopener,noreferrer");
};

/* =============================== 
  ▼ ページ移動 ▼
  カードをクリックで開く。
================================ */
document.getElementById("activity-card-real").onclick = () => {
  openNewTab("pages/activity/real.html");
};
document.getElementById("activity-card-net").onclick = () => {
  openNewTab("pages/activity/net.html");
};

document.getElementById("works-card-01").onclick = () => {
  openNewTab("pages/works/reflect_line.html");
};
document.getElementById("works-card-02").onclick = () => {
  openNewTab("pages/works/gun_action.html");
};
document.getElementById("works-card-03").onclick = () => {
  openNewTab("pages/works/krlib.html");
};
document.getElementById("works-card-04").onclick = () => {
  openNewTab("pages/works/tetris.html");
};
document.getElementById("works-card-05").onclick = () => {
  openNewTab("pages/works/pac_muscle.html");
};
document.getElementById("works-card-06").onclick = () => {
  openNewTab("pages/works/5host.html");
};
document.getElementById("works-card-07").onclick = () => {
  openNewTab("pages/works/trans_water.html");
};
document.getElementById("works-card-08").onclick = () => {
  openNewTab("pages/works/ai_goal.html");
};