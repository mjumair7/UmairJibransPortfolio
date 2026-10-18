# Mohammed Umair Jibran

Computer Engineering student at York University and Technology Manager at U+ Education. I work where hardware, software, data, and delivery stop being separate problems.

**[Open the portfolio](https://mjumair7.github.io/UmairJibransPortfolio/)** · **[LinkedIn](https://www.linkedin.com/in/mohammed-umair-jibran-87932a2a7/)**

To run the site locally, use `python3 -m http.server 4173` from this directory and open `http://127.0.0.1:4173/`.

```text
sensor / user input
        │
        ▼
 firmware · protocol · API
        │
        ▼
 validation · state · data
        │
        ▼
   something useful
```

## Projects I would start with

| Project | What I was exploring | Repository |
| --- | --- | --- |
| SentriCode | Safe source ingestion, explainable findings, scan history, and CI policy checks | [Open](https://github.com/mjumair7/sentricode-security-workbench) |
| RF Asset Finder | Packet framing, CRC validation, ACKs, retries, and missing-tag timeouts over 433 MHz | [Open](https://github.com/mjumair7/rf-asset-finder) |
| Split | Relational modelling and transactional record updates for workout logging | [Open](https://github.com/mjumair7/SPLIT) |
| Tap-to-Donate | A volunteer-friendly interface with a strict server-side payment boundary | [Open](https://github.com/mjumair7/tap-to-donate-terminal) |
| Packing Rule Engine | Turning order and product data into deterministic packing instructions | [Open](https://github.com/mjumair7/shopify-packing-rule-engine) |

The site has small interaction models for the CAN-FD bench, RF Asset Finder, and packing rules. They explain state and decision logic using sample data; they are not product screenshots or live integrations.

## What I work with

```text
C / C++ / Java / Python / JavaScript / TypeScript
STM32 / Arduino / FreeRTOS / CAN-FD / UART / SPI / I²C / 433 MHz RF
Node.js / Express / FastAPI / PostgreSQL / Prisma / Docker
Git / GitHub Actions / Power BI / Tableau / Excel
```

I am most interested in embedded systems, hardware-software integration, backend systems, and technical operations. I also spend a lot of time on the less visible engineering work: turning vague requests into requirements, documenting failure cases, and making tools understandable to the person who has to use them.

## Current learning queue

- testing firmware against real timing and hardware failures;
- deeper backend integration testing;
- CAN systems and automotive diagnostics;
- making small technical tools easier to operate and maintain.

## About this repository

The site is plain HTML, CSS, and JavaScript so the implementation stays inspectable. There is no framework build step. Open `index.html` locally or serve this directory as described above.

The site is deliberately framework-free: no build step and no animation dependency. It supports reduced motion, keyboard navigation, and touch. Project limits and next steps stay visible because they are part of the engineering story. See [AI_USE.md](AI_USE.md) for an honest note on AI and automation.
