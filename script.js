// Explore button reveal
const exploreBtn = document.getElementById('explore-btn');
const menuButtons = document.getElementById('menu-buttons');
exploreBtn.addEventListener('click', () => {
    if (menuButtons.classList.contains('hidden')) {
        menuButtons.classList.remove('hidden');
        setTimeout(() => menuButtons.classList.add('show'), 10);
    } else {
        menuButtons.classList.remove('show');
        setTimeout(() => menuButtons.classList.add('hidden'), 800);
    }
});

// Smooth scrolling for menu buttons
document.querySelectorAll('.menu-btn').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth' });
    });
});

// Floating nodes canvas animation
const canvas = document.getElementById('background-canvas');
const ctx = canvas.getContext('2d');
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

const clusters = [];
const clusterCount = 18;
for (let i = 0; i < clusterCount; i++) {
    const nodesCount = Math.random() > 0.5 ? 2 : 3;
    const clusterCenter = { x: Math.random() * width, y: Math.random() * height };
    const cluster = [];
    for (let j = 0; j < nodesCount; j++) {
        cluster.push({ x: clusterCenter.x + (Math.random()-0.5)*450, y: clusterCenter.y + (Math.random()-0.5)*450, vx: (Math.random()-0.5)*0.3, vy: (Math.random()-0.5)*0.3 });
    }
    clusters.push(cluster);
}

function animateClusters() {
    ctx.clearRect(0,0,width,height);
    ctx.strokeStyle = 'rgba(0,255,231,0.3)';
    ctx.fillStyle = '#00ffe7';
    clusters.forEach(cluster => {
        cluster.forEach(node => {
            ctx.beginPath();
            ctx.arc(node.x,node.y,3,0,Math.PI*2);
            ctx.fill();
            node.x += node.vx; node.y += node.vy;
            if(node.x<0||node.x>width) node.vx*=-1;
            if(node.y<0||node.y>height) node.vy*=-1;
        });
        ctx.beginPath();
        cluster.forEach((node,idx)=>{ if(idx===0) ctx.moveTo(node.x,node.y); else ctx.lineTo(node.x,node.y); });
        if(cluster.length===3) ctx.closePath();
        ctx.stroke();
    });
    requestAnimationFrame(animateClusters);
}
animateClusters();
window.addEventListener('resize',()=>{ width = canvas.width = window.innerWidth; height = canvas.height = window.innerHeight; });

// About cards reveal on scroll
const aboutCards = document.querySelectorAll('.about-card');
function revealCards() {
    const triggerBottom = window.innerHeight*0.85;
    aboutCards.forEach(card=>{
        const cardTop = card.getBoundingClientRect().top;
        if(cardTop<triggerBottom){
            card.style.opacity='1';
            card.style.transform='translateY(0)';
        }
    });
}
window.addEventListener('scroll', revealCards);
revealCards();
