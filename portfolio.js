
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

// ===== my追加分(アニメーション) =====
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

// ===== パーティクル: サイバーなフローティング =====
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

const P = [];
const COUNT = 90;
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

// ===== キーボード: G でグリッド傾斜トグル（遊び） =====
window.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 'g') {
        const grid = document.querySelector('.grid');
        if (grid.style.transform.includes('rotateX(0deg)')) {
            grid.style.transform = 'perspective(600px) rotateX(55deg) translateY(-20%)';
        } else {
            grid.style.transform = 'perspective(1000px) rotateX(0deg)';
        }
    }
});