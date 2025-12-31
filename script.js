// AOS
AOS.init({ duration: 800, easing: 'ease', once: true });

// Mobile menu
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
burger.addEventListener('click', () => {
  const open = navLinks.style.display === 'flex';
  navLinks.style.display = open ? 'none' : 'flex';
  if (!open) {
    navLinks.style.flexDirection = 'column';
    navLinks.style.gap = '0.25rem';
    navLinks.style.position = 'absolute';
    navLinks.style.right = '0.75rem';
    navLinks.style.top = 'calc(var(--nav-h) - 6px)';
    navLinks.style.background = 'rgba(14,20,34,.95)';
    navLinks.style.border = '1px solid #1b2740';
    navLinks.style.padding = '.5rem';
    navLinks.style.borderRadius = '12px';
  }
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(a.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // collapse menu on mobile
    if (window.innerWidth < 960) navLinks.style.display = 'none';
  });
});

// Year
document.getElementById('yy').textContent = new Date().getFullYear();

// Reveal on scroll (unique stagger)
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('on');
      entry.target.style.transitionDelay = (i * 0.06) + 's';
      io.unobserve(entry.target);
    }
  });
}, { threshold: .14 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Subtle parallax on hero cards
const tiltEls = document.querySelectorAll('.tilt');
window.addEventListener('mousemove', (e) => {
  tiltEls.forEach(el => {
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2; const cy = r.top + r.height / 2;
    const dx = (e.clientX - cx) / r.width; const dy = (e.clientY - cy) / r.height;
    el.style.transform = `rotateX(${(-dy * 6).toFixed(2)}deg) rotateY(${(dx * 6).toFixed(2)}deg)`;
  });
});

// Skills (icons + labels)
const skills = [
  { i: 'devicon-python-plain', t: 'Python' },
  { i: 'devicon-c-plain', t: 'C' },
  { i: 'devicon-cplusplus-plain', t: 'C++' },
  { i: 'devicon-java-plain', t: 'Java' },
  { i: 'devicon-javascript-plain', t: 'JavaScript' },
  { i: 'devicon-typescript-plain', t: 'TypeScript' },
  { i: 'devicon-postgresql-plain', t: 'SQL / PostgreSQL' },
  { i: 'devicon-react-original', t: 'React / React Native' },
  { i: 'devicon-nextjs-original', t: 'Next.js' },
  { i: 'devicon-nodejs-plain', t: 'Node.js / Express' },
  { i: 'devicon-prisma-original', t: 'Prisma' },
  { i: 'devicon-tailwindcss-plain', t: 'TailwindCSS' },
  { i: 'fa-solid fa-chart-line', t: 'Power BI / Tableau / Excel' },
  { i: 'devicon-shopify-plain', t: 'Shopify' },
  { i: 'fa-brands fa-stripe', t: 'Stripe Terminal API' },
  { i: 'fa-solid fa-microchip', t: 'Arduino, UART, Timers/Interrupts' },
  { i: 'fa-solid fa-tower-broadcast', t: '433 MHz ASK/OOK · RadioHead' },
  { i: 'devicon-git-plain', t: 'Git / GitHub' },
  { i: 'devicon-html5-plain', t: 'HTML5' },
  { i: 'devicon-css3-plain', t: 'CSS3' }
];

const grid = document.getElementById('skillsGrid');
skills.forEach(s => {
  const div = document.createElement('div');
  div.className = 'skill';
  div.innerHTML = `<i class="${s.i}"></i><span>${s.t}</span>`;
  grid.appendChild(div);
});
