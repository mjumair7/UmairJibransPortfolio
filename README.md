# Mohammed Umair Jibran

Computer Engineering student at York University and Technology Manager at U+ Education. I like projects that cross a boundary: hardware talking to software, raw data becoming a decision, or a messy manual process turning into a small tool somebody can actually use.

**[Open the live portfolio](https://mjumair7.github.io/UmairJibransPortfolio/)** · **[LinkedIn](https://www.linkedin.com/in/mohammed-umair-jibran-87932a2a7/)**

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

The live site includes small interactive explanations instead of pretending every project is a hosted product. The RF demo can mark a tag missing, the payment terminal stays in mock/test mode, and the other demos expose the decision logic behind the project.

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

## AI and automation

I use AI openly for review and iteration. [My disclosure](AI_USE.md) separates generative help from dependency bots, CI, and diagram tooling, and lists the checks I use before accepting a suggestion.

## About this repository

The site is plain HTML, CSS, and JavaScript so the implementation stays inspectable. There is no framework build step. Open `index.html` locally or visit the GitHub Pages link above.

No project is finished forever. The repositories include limitations and next steps because those are part of the engineering story too.
