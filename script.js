// Optional enhancement loaded from the CDN.
if (window.AOS) window.AOS.init({ duration: 700, easing: 'ease-out', once: true });

// Mobile menu
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
burger.addEventListener('click', () => {
  const open = burger.getAttribute('aria-expanded') === 'true';
  burger.setAttribute('aria-expanded', String(!open));
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
    if (window.innerWidth < 960) {
      navLinks.style.display = 'none';
      burger.setAttribute('aria-expanded', 'false');
    }
  });
});

// Year
document.getElementById('yy').textContent = new Date().getFullYear();

// Section reveals
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

// Reveal story cards without requiring an animation library.
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('[data-reveal]').forEach(el => revealObserver.observe(el));

// The U+ timeline fills as each chapter reaches the center of the viewport.
const timelineSteps = [...document.querySelectorAll('.timeline-step')];
const timelineProgress = document.querySelector('.timeline-progress');
const timelineObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const index = timelineSteps.indexOf(entry.target);
    timelineSteps.forEach((step, stepIndex) => step.classList.toggle('is-active', stepIndex <= index));
    if (timelineProgress) {
      const progress = timelineSteps.length === 1 ? 100 : 12 + (index / (timelineSteps.length - 1)) * 88;
      timelineProgress.style.height = `${progress}%`;
    }
  });
}, { threshold: 0.55, rootMargin: '-8% 0px -28% 0px' });
timelineSteps.forEach(step => timelineObserver.observe(step));

// CAN-FD test bench demo
document.querySelectorAll('[data-can-demo]').forEach(demo => {
  const state = demo.querySelector('[data-can-state]');
  const actuatorText = demo.querySelector('[data-can-actuator-text]');
  const log = demo.querySelector('[data-can-log]');

  const render = mode => {
    demo.classList.toggle('is-fault', mode === 'fault');

    if (mode === 'fault') {
      state.textContent = 'Fail-safe active';
      actuatorText.textContent = 'Fan output: SAFE OFF';
      log.innerHTML = '<span>0x181  TEMP 24.5  CRC OK</span><span>0x244  RPM TIMEOUT</span><span>0x310  FAIL-SAFE  ACTIVE</span>';
      return;
    }

    if (mode === 'run') {
      state.textContent = 'Streaming';
      actuatorText.textContent = 'Fan output: 46%';
      log.innerHTML = '<span>0x181  TEMP 24.4  CRC OK</span><span>0x244  RPM 1310  CRC OK</span><span>0x310  FAN 46%  ACK</span>';
      return;
    }

    state.textContent = 'Normal';
    actuatorText.textContent = 'Fan output: 42%';
    log.innerHTML = '<span>0x181  TEMP 24.2  CRC OK</span><span>0x244  RPM 1240  CRC OK</span><span>0x310  FAN 42%  ACK</span>';
  };

  demo.querySelectorAll('[data-can-action]').forEach(button => {
    button.addEventListener('click', () => render(button.dataset.canAction));
  });
});

// RF asset finder demo
document.querySelectorAll('[data-rf-demo]').forEach(demo => {
  const tags = [...demo.querySelectorAll('[data-rf-tag]')];
  const summary = demo.querySelector('[data-rf-summary]');

  const resetTags = () => {
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
        resetTags();
        tags[1].classList.add('is-missing');
        tags[1].querySelector('span').textContent = 'Timeout exceeded';
        summary.textContent = '1 alert';
        return;
      }

      if (action === 'scan') {
        resetTags();
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

      resetTags();
    });
  });
});

// Tap-to-donate demo. This is a visual simulation only.
document.querySelectorAll('[data-payment-demo]').forEach(demo => {
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

  demo.querySelector('[data-payment-tap]').addEventListener('click', () => {
    if (!selectedAmount) {
      setScreen('Select amount', 'Choose a sample donation first');
      return;
    }

    setScreen('Reading card...', 'Simulated terminal flow');
    window.setTimeout(() => setScreen('Approved', `$${selectedAmount}.00 demo payment`, true), 650);
  });
});

// Split workout demo
document.querySelectorAll('[data-split-demo]').forEach(demo => {
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

  demo.querySelector('[data-log-set]').addEventListener('click', () => {
    message.textContent = `${weight} kg × 5 saved to the sample session.`;
  });
});

// Small personal detail beside the Split project
document.querySelectorAll('[data-split-easter-egg]').forEach(button => {
  const wrapper = button.closest('.split-easter-wrap');
  const secret = wrapper?.querySelector('[data-split-secret]');
  if (!secret) return;

  button.addEventListener('click', () => {
    const isRevealed = wrapper.classList.toggle('is-revealed');
    button.setAttribute('aria-expanded', String(isRevealed));
    secret.setAttribute('aria-hidden', String(!isRevealed));
  });
});

// Shopify order analyzer demo
const sampleOrders = {
  1048: { package: 'Mailer M2', steps: 'Wrap books · Add bookmark · Print label' },
  1052: { package: 'Gift Box G1', steps: 'Add insert · Add greeting card · Seal box' },
  1061: { package: 'Carton B3', steps: 'Stack books · Add corner pads · Print label' }
};

document.querySelectorAll('[data-order-demo]').forEach(demo => {
  const select = demo.querySelector('[data-order-select]');
  const output = demo.querySelector('[data-order-output]');

  demo.querySelector('[data-order-run]').addEventListener('click', () => {
    const order = sampleOrders[select.value];
    output.innerHTML = `<small>PACKING INSTRUCTION</small><strong>${order.package}</strong><span>${order.steps}</span>`;
  });
});
