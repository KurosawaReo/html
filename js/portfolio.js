
// ===== イントロ =====
const intro   = document.getElementById("intro");
const content = document.getElementById("content");

intro.addEventListener("animationend", () => {
  intro.style.display   = "none";  // 完全に非表示
  content.style.display = "block"; // 本編表示
});

// ===== スムーススクロール =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const id = a.getAttribute('href');
        if (id.length > 1) {
            e.preventDefault();
            document.querySelector(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ===== アニメーション =====
document.addEventListener("DOMContentLoaded", () => {
    const fadeElements = document.querySelectorAll(".fade-in, .fade-in-left, .fade-in-right");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    }, 
    {
        threshold: 0.2 // 画面に20%入ったら発火
    });

    fadeElements.forEach(el => observer.observe(el));
});

// ===== カードの軽いチルト効果 =====
const tiltCards = document.querySelectorAll('[data-tilt]');
const clamp = (n, min, max) => Math.min(Math.max(n, min), max);
tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;  // 0..1
        const py = (e.clientY - r.top) / r.height; // 0..1
        const rx = (py - 0.5) * -6; // rotateX
        const ry = (px - 0.5) * 8;  // rotateY
        card.style.transform = `translateY(-3px) rotateX(${clamp(rx,-8,8)}deg) rotateY(${clamp(ry,-10,10)}deg)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// ===== 背景演出 =====
/*
   [アルゴリズム]
   光は全て独自で移動するようになっていて
   距離がある程度近くなった光同士を線で結んでるだけ。
*/

//???
const cvs = document.getElementById('fx');
const ctx = cvs.getContext('2d');
let W, H, dpr;
function resize() {
    dpr = Math.min(2, window.devicePixelRatio || 1);
    W = cvs.width = Math.floor(innerWidth * dpr);
    H = cvs.height = Math.floor(innerHeight * dpr);
    cvs.style.width = innerWidth + 'px';
    cvs.style.height = innerHeight + 'px';
}
resize();
window.addEventListener('resize', resize);

const P = [];     //光データ配列.
const COUNT = 90; //光の数.
for (let i = 0; i < COUNT; i++) {
    P.push({
    x: Math.random() * W,
    y: Math.random() * H,
    vx: (Math.random() - 0.5) * 0.15,
    vy: (Math.random() - 0.5) * 0.15,
    r: Math.random() * 2.2 + 0.6,
    a: Math.random() * Math.PI * 2
    });
}

function tick() {
    ctx.clearRect(0, 0, W, H);

    // 線で接続（近い点同士）
    for (let i = 0; i < P.length; i++) {
        for (let j = i + 1; j < P.length; j++) {
            const dx = P[i].x - P[j].x;
            const dy = P[i].y - P[j].y;
            const d2 = dx*dx + dy*dy;
            if (d2 < 12000) {
            const o = 1 - d2 / 12000;
            ctx.strokeStyle = `rgba(51,231,255,${o * 0.25})`;
            ctx.lineWidth = 1 * dpr;
            ctx.beginPath();
            ctx.moveTo(P[i].x, P[i].y);
            ctx.lineTo(P[j].x, P[j].y);
            ctx.stroke();
            }
        }
    }

    // 粒子本体
    for (const p of P) {
        p.x += p.vx * dpr; p.y += p.vy * dpr; p.a += 0.02;
        if (p.x < 0) p.x += W; if (p.x > W) p.x -= W;
        if (p.y < 0) p.y += H; if (p.y > H) p.y -= H;
        const r = (Math.sin(p.a) * 0.5 + 0.5) * p.r + 0.6;
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 6);
        g.addColorStop(0, 'rgba(123,242,255,0.95)');
        g.addColorStop(1, 'rgba(123,242,255,0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r * 6, 0, Math.PI * 2);
        ctx.fill();
    }

    requestAnimationFrame(tick);
}
tick();

// ===== カーソルの発光（PC） =====
const cursor = document.querySelector('.cursor i');
let mx = 0, my = 0, tx = 0, ty = 0;
let raf = null;
function loop() {
    tx += (mx - tx) * 0.18; ty += (my - ty) * 0.18;
    cursor.style.transform = `translate(${tx}px, ${ty}px)`;
    raf = requestAnimationFrame(loop);
}
window.addEventListener('pointermove', (e) => { mx = e.clientX; my = e.clientY; if (!raf) loop(); });
window.addEventListener('pointerleave', () => { cancelAnimationFrame(raf); raf = null; });

// ===== modal =====
/*
   HTML側でcardとmodalを予め作っておき
   cardがクリックされたら、ここでmodalの表示/非表示を切り替える
*/

const modal02 = document.getElementById('modal-02');
const modal03 = document.getElementById('modal-03');
const modal04 = document.getElementById('modal-04');
const modal05 = document.getElementById('modal-05');

//クリックで開く.
document.getElementById("game-card-02").addEventListener("click", () => {
    modal02.classList.add("open");
});
document.getElementById("game-card-03").addEventListener("click", () => {
    modal03.classList.add("open");
});
document.getElementById("game-card-04").addEventListener("click", () => {
    modal04.classList.add("open");
});
document.getElementById("game-card-05").addEventListener("click", () => {
    modal05.classList.add("open");
});

//クリックで閉じる.
modal02.addEventListener("click", () => {
    modal02.classList.remove("open");
});
modal03.addEventListener("click", () => {
    modal03.classList.remove("open");
});
modal04.addEventListener("click", () => {
    modal04.classList.remove("open");
});
modal05.addEventListener("click", () => {
    modal05.classList.remove("open");
});