const themeBtn = document.getElementById('theme-toggle');
const body = document.body;

// Theme Toggle Logik (Hell/Dunkel Modus)
themeBtn.addEventListener('click', () => {
    const isLight = body.getAttribute('data-theme') === 'light';
    body.setAttribute('data-theme', isLight ? 'dark' : 'light');
    themeBtn.innerText = isLight ? 'Light Mode' : 'Dark Mode';
});

// Maus-Glow Effekt
const glow = document.getElementById('mouse-glow');
document.addEventListener('mousemove', (e) => {
    glow.style.background = `radial-gradient(circle at ${e.clientX}px ${e.clientY}px, var(--primary), transparent 50%)`;
});

// Scroll-Animation (Sektionen tauchen auf)
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting) entry.target.classList.add("visible");
    });
}, { threshold: 0.1 });
document.querySelectorAll(".section").forEach(el => observer.observe(el));

// Discord API (Mitglieder & Online-Zahlen abrufen)
fetch("https://discord.com/api/guilds/1477240537693028414/widget.json")
.then(r => r.json())
.then(d => {
    document.getElementById("members").innerText = d.members ? d.members.length : "150+";
    document.getElementById("online").innerText = d.presence_count || "24";
}).catch(() => {
    document.getElementById("members").innerText = "200";
    document.getElementById("online").innerText = "28";
});

// Partikel-Hintergrund (Die fliegenden Punkte)
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
let particles = [];
function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
window.addEventListener("resize", resize); resize();

class Particle {
    constructor() { this.reset(); }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.s = Math.random() * 1.2;
        this.v = Math.random() * 0.1; // Langsame Bewegung
    }
    update() { this.y -= this.v; if(this.y < 0) this.reset(); }
    draw() {
        ctx.fillStyle = body.getAttribute('data-theme') === 'light' ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.03)";
        ctx.beginPath(); ctx.arc(this.x, this.y, this.s, 0, Math.PI*2); ctx.fill();
    }
}
for(let i=0; i<60; i++) particles.push(new Particle());
function anim() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(anim);
}
anim();
