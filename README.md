# `UJ // SYSTEMS, SOFTWARE, PEOPLE`

> **This is not a gallery of finished pixels.**  
> It is a map of the systems I have touched, broken, rebuilt, shipped, led, and learned from.

I’m **Mohammed Umair Jibran** — a Computer Engineering student at York University and Technology Manager at U+ Education.

My work tends to live in the awkward middle where categories stop being useful: embedded hardware talking to software, data turning into decisions, a technical idea becoming something volunteers can actually use, or a messy workflow becoming a repeatable system.

**Live portfolio →** [mjumair7.github.io/UmairJibransPortfolio](https://mjumair7.github.io/UmairJibransPortfolio/)  
**LinkedIn →** [Mohammed Umair Jibran](https://www.linkedin.com/in/mohammed-umair-jibran-87932a2a7/)

---

## `00 // HOW TO READ THIS PORTFOLIO`

Don’t treat it like a résumé with nicer spacing.

Scroll slowly. Click things. Break the demos.

The project interactions are intentionally small recreations of the engineering idea behind each build — not fake screenshots pretending to be the entire product. The CAN-FD demo shows fail-safe behaviour. The RF project lets you simulate a missing tag. The payment terminal is a visual simulation. The workout tracker and order analyzer expose the logic behind the tools.

If something moves, changes state, times out, logs a packet, or reacts to you, there is probably a reason.

---

## `01 // SIGNAL PATH`

```text
physical world
     ↓
sensors / hardware
     ↓
firmware + protocols
     ↓
software + data
     ↓
decisions / workflows
     ↓
people using the thing
```

That path is basically the theme of my work.

I like understanding enough of every layer to figure out **where the actual problem is**, not just where it first becomes visible.

---

## `02 // THINGS WORTH OPENING`

### CAN-FD ECU Diagnostic Test Bench
Two STM32 controllers, FreeRTOS, CAN-FD, and a Python validation station.  
The interesting part is not making two boards communicate — it is proving the system fails safely when communication stops behaving nicely.

### RF Asset Finder
A simple 433 MHz link built around device IDs, CRC checks, acknowledgements, retries, and missed-response handling.  
Small radio. Surprisingly large number of ways for a packet to disappoint you.

### Tap-to-Donate
WisePOS/BBPOS + Stripe + JavaScript for real community events.  
Designed around the question: **can a volunteer pick this up and use it without needing the person who built it standing beside them?**

### Split Workout Tracker
A workout-tracking system built because training data becomes useless fast when logging it is annoying.  
Programs, exercises, sets, progress records, relational data, APIs — and yes, there is a bench-press easter egg.

### Shopify Order Analyzer
A Node.js rule engine that turns order and product data into repeatable packing instructions.  
One of my favourite kinds of software: not flashy, just measurably less annoying than the process it replaced.

---

## `03 // CURRENT OPERATING MODE`

```yaml
role: Technology Manager
organization: U+ Education
degree: B.Eng. Computer Engineering
school: York University
expected_grad: 2028

interests:
  - embedded systems
  - hardware-software integration
  - backend / systems thinking
  - data and technical operations
  - technical leadership
  - building things people actually use

working_style:
  - understand the system
  - make the problem concrete
  - test the ugly cases
  - document what matters
  - ship
```

---

## `04 // NUMBERS WITHOUT THE CORPORATE VOICE`

A few reference points from the work behind the site:

- **200+** volunteers supervised
- **2,700+** volunteer service hours tracked
- **~10,000** Q2 2026 conversions generated through web / ad performance work
- **270+** youth scoped into a drone-training program plan
- **$35.5K** baseline program budget
- **$10K+** fundraising supported through deployed payment technology

Numbers are useful, but the more interesting part is what had to be designed, coordinated, debugged, or communicated to make them happen.

---

## `05 // THE NON-ENGINEERING ENGINEERING`

Some of the hardest technical work has very little code in it.

Turning a vague request into requirements.  
Explaining a blocker without hiding behind jargon.  
Giving someone enough context to own a task.  
Running technology live when there is no useful “restart everything and try again.”  
Knowing when the clever solution is worse than the boring one.

I care about that layer too.

---

## `06 // BUILT WITH`

```text
C / C++ / Python / Java / JavaScript
STM32 / Arduino / FreeRTOS / CAN-FD / UART / SPI / I²C / 433 MHz RF
Node.js / REST APIs / PostgreSQL / MySQL / Prisma
Power BI / Tableau / Excel
Git / GitHub / Jira / Docker
```

The useful skill is not collecting tools.  
It is being able to move between layers without losing the thread.

---

## `07 // NETWORKING MODE`

If you found this README from a QR code, we probably met in person.

The fastest conversation starters:

- embedded systems that have to survive failure
- automotive / CAN systems
- engineering co-ops and technical projects
- weirdly specific workflow problems that should probably be automated
- lifting
- something you are currently building

I am always interested in meeting people who are **making something real**.

---

## `08 // LINKS`

**Portfolio**  
https://mjumair7.github.io/UmairJibransPortfolio/

**LinkedIn**  
https://www.linkedin.com/in/mohammed-umair-jibran-87932a2a7/

---

<sub>`status: online // location: Toronto // bias: build it, test it, then talk about it`</sub>
