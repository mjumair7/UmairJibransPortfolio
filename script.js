const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Mobile navigation
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
burger?.addEventListener('click', () => {
  const open = burger.getAttribute('aria-expanded') === 'true';
  burger.setAttribute('aria-expanded', String(!open));
  navLinks?.classList.toggle('is-open', !open);
});

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', event => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    navLinks?.classList.remove('is-open');
    burger?.setAttribute('aria-expanded', 'false');
  });
});

document.getElementById('yy').textContent = new Date().getFullYear();

// Local clock — a tiny detail that keeps the hero feeling alive.
const clock = document.querySelector('[data-clock]');
const updateClock = () => {
  if (!clock) return;
  clock.textContent = new Intl.DateTimeFormat('en-CA', {
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
  }).format(new Date());
};
updateClock();
window.setInterval(updateClock, 1000);

// Reveal without a third-party animation library.
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('on');
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.12, rootMargin: '0px 0px -7% 0px' });

document.querySelectorAll('.reveal, .reveal-text').forEach(el => revealObserver.observe(el));

// Scroll progress + ticker that reacts to scroll direction.
const progress = document.querySelector('.scroll-progress i');
const ticker = document.querySelector('[data-ticker]');
let lastY = window.scrollY;
let tickerX = 0;
let scrollDirection = 1;

const onScroll = () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = max > 0 ? window.scrollY / max : 0;
  if (progress) progress.style.transform = `scaleX(${ratio})`;
  scrollDirection = window.scrollY >= lastY ? 1 : -1;
  lastY = window.scrollY;
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

const tick = () => {
  if (ticker && !reduceMotion) {
    tickerX -= 0.34 * scrollDirection;
    const half = ticker.scrollWidth / 2;
    if (Math.abs(tickerX) > half) tickerX = 0;
    ticker.style.transform = `translate3d(${tickerX}px,0,0)`;
  }
  requestAnimationFrame(tick);
};
requestAnimationFrame(tick);

// Timeline fills as chapters cross the reading zone.
const timelineSteps = [...document.querySelectorAll('.timeline-step')];
const timelineProgress = document.querySelector('.timeline-progress');
const timelineMeter = document.querySelector('[data-timeline-meter]');
const timelineObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const index = timelineSteps.indexOf(entry.target);
    timelineSteps.forEach((step, i) => step.classList.toggle('is-active', i <= index));
    const pct = timelineSteps.length <= 1 ? 100 : 8 + (index / (timelineSteps.length - 1)) * 92;
    if (timelineProgress) timelineProgress.style.height = `${pct}%`;
    if (timelineMeter) timelineMeter.style.width = `${pct}%`;
  });
}, { threshold: 0.5, rootMargin: '-10% 0px -30% 0px' });
timelineSteps.forEach(step => timelineObserver.observe(step));

// Pointer spotlight and restrained 3D movement. Disabled on touch/reduced-motion.
const finePointer = window.matchMedia('(pointer:fine)').matches;
if (finePointer && !reduceMotion) {
  document.querySelectorAll('[data-spotlight]').forEach(el => {
    el.addEventListener('pointermove', event => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${event.clientX - rect.left}px`);
      el.style.setProperty('--my', `${event.clientY - rect.top}px`);
    });
  });

  document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('pointermove', event => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(1000px) rotateX(${-y * 2.1}deg) rotateY(${x * 2.5}deg) translateY(-2px)`;
    });
    card.addEventListener('pointerleave', () => { card.style.transform = ''; });
  });

  document.querySelectorAll('.magnetic').forEach(el => {
    el.addEventListener('pointermove', event => {
      const rect = el.getBoundingClientRect();
      const x = event.clientX - (rect.left + rect.width / 2);
      const y = event.clientY - (rect.top + rect.height / 2);
      el.style.transform = `translate(${x * 0.07}px, ${y * 0.09}px)`;
    });
    el.addEventListener('pointerleave', () => { el.style.transform = ''; });
  });
}

// Hero system map: clicking a node changes the center label and nudges the trace.
const signalLabel = document.querySelector('[data-signal-label]');
const trace = document.querySelector('[data-trace]');
document.querySelectorAll('[data-signal-node]').forEach(node => {
  node.addEventListener('click', () => {
    document.querySelectorAll('[data-signal-node]').forEach(item => item.classList.remove('is-active'));
    node.classList.add('is-active');
    if (signalLabel) signalLabel.textContent = node.dataset.signalNode.toLowerCase();
    if (trace && !reduceMotion) {
      trace.animate([
        { strokeDashoffset: '0', opacity: 1 },
        { strokeDashoffset: '-40', opacity: .45 },
        { strokeDashoffset: '-80', opacity: 1 }
      ], { duration: 520, easing: 'ease-out' });
    }
  });
});


// Field-notes section: active story + gentle scroll-driven photo movement.
const momentStories = [...document.querySelectorAll('[data-moment]')];
const momentCurrent = document.querySelector('[data-moment-current]');
const momentsMeter = document.querySelector('[data-moments-meter]');
if (momentStories.length) {
  const momentObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const index = momentStories.indexOf(entry.target);
      momentStories.forEach((story, i) => story.classList.toggle('is-current', i === index));
      if (momentCurrent) momentCurrent.textContent = String(index + 1).padStart(2, '0');
      if (momentsMeter) momentsMeter.style.width = `${((index + 1) / momentStories.length) * 100}%`;
    });
  }, { threshold: 0.48, rootMargin: '-15% 0px -28% 0px' });
  momentStories.forEach(story => momentObserver.observe(story));
}

const parallaxFrames = [...document.querySelectorAll('[data-moment-parallax]')];
let momentParallaxQueued = false;
const updateMomentParallax = () => {
  momentParallaxQueued = false;
  if (reduceMotion) return;
  parallaxFrames.forEach(frame => {
    const rect = frame.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > window.innerHeight) return;
    const centerDelta = (rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight;
    const y = Math.max(-18, Math.min(18, centerDelta * -28));
    frame.style.setProperty('--photo-y', `${y}px`);
  });
};
const queueMomentParallax = () => {
  if (momentParallaxQueued) return;
  momentParallaxQueued = true;
  requestAnimationFrame(updateMomentParallax);
};
window.addEventListener('scroll', queueMomentParallax, { passive: true });
window.addEventListener('resize', queueMomentParallax);
queueMomentParallax();

// CAN-FD test bench demo
for (const demo of document.querySelectorAll('[data-can-demo]')) {
  const state = demo.querySelector('[data-can-state]');
  const actuatorText = demo.querySelector('[data-can-actuator-text]');
  const log = demo.querySelector('[data-can-log]');
  const render = mode => {
    demo.classList.toggle('is-fault', mode === 'fault');
    if (mode === 'fault') {
      state.textContent = 'Fail-safe active';
      actuatorText.textContent = 'Fan output: SAFE OFF';
      log.innerHTML = '<span>0x181 TEMP 24.5 CRC OK</span><span>0x244 RPM TIMEOUT</span><span>0x310 FAIL-SAFE ACTIVE</span>';
      return;
    }
    if (mode === 'run') {
      state.textContent = 'Streaming';
      actuatorText.textContent = 'Fan output: 46%';
      log.innerHTML = '<span>0x181 TEMP 24.4 CRC OK</span><span>0x244 RPM 1310 CRC OK</span><span>0x310 FAN 46% ACK</span>';
      return;
    }
    state.textContent = 'Normal';
    actuatorText.textContent = 'Fan output: 42%';
    log.innerHTML = '<span>0x181 TEMP 24.2 CRC OK</span><span>0x244 RPM 1240 CRC OK</span><span>0x310 FAN 42% ACK</span>';
  };
  demo.querySelectorAll('[data-can-action]').forEach(button => button.addEventListener('click', () => render(button.dataset.canAction)));
}

// RF asset finder demo
for (const demo of document.querySelectorAll('[data-rf-demo]')) {
  const tags = [...demo.querySelectorAll('[data-rf-tag]')];
  const summary = demo.querySelector('[data-rf-summary]');
  const reset = () => {
    tags.forEach((tag, index) => {
      tag.classList.remove('is-missing');
      tag.querySelector('span').textContent = `Seen ${(0.2 + index * 0.2).toFixed(1)}s ago`;
    });
    summary.textContent = '3 tags online';
  };
  demo.querySelectorAll('[data-rf-action]').forEach(button => {
    button.addEventListener('click', () => {
      const action = button.dataset.rfAction;
      if (action === 'missing') {
        reset();
        tags[1].classList.add('is-missing');
        tags[1].querySelector('span').textContent = 'Timeout exceeded';
        summary.textContent = '1 alert';
        return;
      }
      if (action === 'scan') {
        reset();
        demo.classList.remove('is-scanning');
        void demo.offsetWidth;
        demo.classList.add('is-scanning');
        summary.textContent = 'Scanning...';
        window.setTimeout(() => {
          summary.textContent = '3 tags online';
          demo.classList.remove('is-scanning');
        }, 850);
        return;
      }
      reset();
    });
  });
}

// Tap-to-donate visual simulation
for (const demo of document.querySelectorAll('[data-payment-demo]')) {
  let selectedAmount = null;
  const screen = demo.querySelector('[data-payment-screen]');
  const amountButtons = [...demo.querySelectorAll('[data-amount]')];
  const setScreen = (title, detail, approved = false) => {
    screen.classList.toggle('is-approved', approved);
    screen.innerHTML = `<small>DEMO TERMINAL</small><strong>${title}</strong><span>${detail}</span>`;
  };
  amountButtons.forEach(button => {
    button.addEventListener('click', () => {
      selectedAmount = Number(button.dataset.amount);
      amountButtons.forEach(item => item.classList.toggle('is-selected', item === button));
      setScreen(`$${selectedAmount}.00`, 'Ready for simulated tap');
    });
  });
  demo.querySelector('[data-payment-tap]')?.addEventListener('click', () => {
    if (!selectedAmount) return setScreen('Select amount', 'Choose a sample donation first');
    setScreen('Reading card...', 'Simulated terminal flow');
    window.setTimeout(() => setScreen('Approved', `$${selectedAmount}.00 demo payment`, true), 650);
  });
}

// Split workout demo
for (const demo of document.querySelectorAll('[data-split-demo]')) {
  let weight = 84;
  const output = demo.querySelector('[data-split-output]');
  const chartValue = demo.querySelector('[data-split-weight]');
  const currentBar = demo.querySelector('.current-bar');
  const message = demo.querySelector('[data-split-message]');
  const updateWeight = () => {
    output.textContent = `${weight} kg × 5`;
    chartValue.textContent = weight;
    currentBar.style.setProperty('--bar', `${Math.min(96, 48 + (weight - 65) * 2)}%`);
    message.textContent = 'Adjust the weight and log a set.';
  };
  demo.querySelectorAll('[data-weight-action]').forEach(button => {
    button.addEventListener('click', () => {
      weight += button.dataset.weightAction === 'up' ? 1 : -1;
      weight = Math.max(20, Math.min(120, weight));
      updateWeight();
    });
  });
  demo.querySelector('[data-log-set]')?.addEventListener('click', () => {
    message.textContent = `${weight} kg × 5 saved to the sample session.`;
  });
}

// Personal detail beside Split
for (const button of document.querySelectorAll('[data-split-easter-egg]')) {
  const wrapper = button.closest('.split-easter-wrap');
  const secret = wrapper?.querySelector('[data-split-secret]');
  if (!secret) continue;
  button.addEventListener('click', () => {
    const open = wrapper.classList.toggle('is-revealed');
    button.setAttribute('aria-expanded', String(open));
    secret.setAttribute('aria-hidden', String(!open));
  });
}

// Shopify order analyzer demo
const sampleOrders = {
  1048: { package: 'Mailer M2', steps: 'Wrap books · Add bookmark · Print label' },
  1052: { package: 'Gift Box G1', steps: 'Add insert · Add greeting card · Seal box' },
  1061: { package: 'Carton B3', steps: 'Stack books · Add corner pads · Print label' }
};
for (const demo of document.querySelectorAll('[data-order-demo]')) {
  const select = demo.querySelector('[data-order-select]');
  const output = demo.querySelector('[data-order-output]');
  demo.querySelector('[data-order-run]')?.addEventListener('click', () => {
    const order = sampleOrders[select.value];
    output.innerHTML = `<small>PACKING INSTRUCTION</small><strong>${order.package}</strong><span>${order.steps}</span>`;
  });
}
