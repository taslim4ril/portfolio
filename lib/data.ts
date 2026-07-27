// Central content for the portfolio. Edit here to update the whole site.

export const site = {
  name: "Taslim Abdulkadir",
  role: "Product & UI/UX Designer",
  location: "Lagos, Nigeria",
  available: true,
  email: "taslimabdulkadir01@gmail.com",
  whatsapp: "https://wa.me/2340000000000", // TODO: replace 0000000000 with your number
  headline: "Bridging the gap between technology and human interaction",
  subhead:
    "I'm a product designer with 5+ years of experience turning complex problems into clear, human-centered digital experiences.",
  philosophy:
    "Most products don't fail because of bad ideas. They fail because things get complicated too early. I design ethical, user-centered products that stay simple from concept to launch.",
} as const;

/** Cycled through by the hero headline. Rendered uppercase by the h1; the
    last word lands on the gradient line, everything before it on the line
    above, so each entry needs at least two words. */
export const roles = [
  "product designer",
  "UX/UI designer",
  "no-code developer",
  "AI Product designer",
] as const;

export const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/" },
  { label: "Twitter / X", href: "https://twitter.com/" },
  { label: "Medium", href: "https://medium.com/" },
  { label: "Instagram", href: "https://instagram.com/" },
] as const;

export const stats = [
  { value: "5+", label: "Years designing" },
  { value: "20+", label: "Products shipped" },
  { value: "5", label: "Featured case studies" },
] as const;

export const services = [
  {
    title: "Product Design",
    description:
      "End-to-end design from research and flows to polished, shippable interfaces.",
  },
  {
    title: "UI Design",
    description:
      "Interfaces and design systems that feel effortless, accessible, and on-brand.",
  },
  {
    title: "No-code Development",
    description:
      "Turning designs into working products with Framer, Webflow, and friends.",
  },
  {
    title: "Design Systems",
    description:
      "Reusable components and tokens that keep teams shipping fast and consistent.",
  },
];

// ===== Case study content model =====
// A case study is an ordered list of blocks so every project follows the same
// structure. Add a `caseStudy` to a project and its /work/[slug] page fills in.
export type CaseMetric = { value: string; label: string };
export type CaseNamed = { title: string; desc: string };

/** A design call, with the reasoning kept attached to it. The closing note is
 *  labelled per item because what follows a decision is sometimes the cost of
 *  it and sometimes the reason for it, and those should not read the same. */
export type CaseDecision = {
  title: string;
  problem: string;
  decision: string;
  note?: { label: string; body: string };
};

export type CaseBlock =
  | { kind: "prose"; heading?: string; body: string[] }
  | { kind: "list"; heading?: string; intro?: string[]; items: string[]; outro?: string[] }
  | {
      kind: "grid";
      heading?: string;
      intro?: string[];
      columns?: 2 | 3;
      items: CaseNamed[];
      outro?: string[];
    }
  | {
      kind: "features";
      heading?: string;
      intro?: string[];
      items: (CaseNamed & { result: string })[];
    }
  | {
      kind: "decisions";
      heading?: string;
      intro?: string[];
      items: CaseDecision[];
    }
  | { kind: "impact"; heading?: string; intro?: string[]; metrics: CaseMetric[]; body?: string[] }
  | { kind: "quote"; heading?: string; body: string[] }
  | { kind: "figure"; src?: string; caption?: string };

export type CaseStudy = {
  /** Hero title; falls back to the project title if omitted. */
  title?: string;
  tagline: string;
  overview: string;
  meta: CaseMetric[]; // value = the field's content, label = the field name
  blocks: CaseBlock[];
};

export type Project = {
  slug: string;
  title: string;
  category: string;
  tag: string;
  year: string;
  description: string;
  image: string;
  /** One-line framing shown above the title on the work card. */
  subtitle: string;
  /** Pills shown at the top-left of the work card. */
  tags: string[];
  accent?: boolean;
  /** Full case study — when present, /work/[slug] renders the story. */
  caseStudy?: CaseStudy;
};

export const projects: Project[] = [
  {
    slug: "flowz",
    title: "Flowz",
    category: "Process Automation",
    tag: "SaaS · Case Study",
    year: "2024",
    description:
      "A process-automation platform that turns repetitive, multi-step workflows into simple guided journeys anyone on the team can run.",
    image: "/images/work/flowz.webp",
    subtitle: "Process automation platform for busy teams",
    tags: ["Product Design", "SaaS"],
    accent: true,
    caseStudy: {
      title: "Flowz Process Manager",
      tagline:
        "Designing a smarter way for teams to manage workflows and scale operations.",
      overview:
        "A single platform that brings structure, visibility, and automation to how teams manage and scale their workflows.",
      // Editable: reasonable defaults derived from the project.
      meta: [
        { label: "Role", value: "Product & UI/UX Designer" },
        { label: "Timeline", value: "2024" },
        { label: "Platform", value: "Web · SaaS" },
        { label: "Deliverables", value: "Research, UX, UI, Prototyping" },
      ],
      blocks: [
        {
          kind: "prose",
          heading: "Bringing Clarity to Broken Workflows",
          body: [
            "As businesses scale, their workflows often become harder to manage.",
            "What once felt simple starts to break down. Tasks get lost across tools, approvals take longer than expected, and teams struggle to stay aligned. Productivity drops, not because people are not working hard, but because the system itself is inefficient.",
            "This was the reality I uncovered while speaking with operations managers, team leads, and business owners.",
            "They were not just dealing with inefficiency. They were operating without visibility.",
          ],
        },
        { kind: "figure", caption: "Flowz: process overview" },
        {
          kind: "list",
          heading: "The Opportunity",
          intro: [
            "Most businesses were relying on a mix of tools to manage workflows. Communication happened in one place, tasks in another, and reporting somewhere else entirely.",
            "This fragmentation created:",
          ],
          items: [
            "Delays in approvals and execution",
            "Lack of real-time visibility into progress",
            "Poor collaboration across teams",
            "Limited ability to measure performance",
          ],
          outro: [
            "The opportunity was clear. There was a need for a single platform that could bring structure, visibility, and automation into one seamless experience.",
          ],
        },
        {
          kind: "list",
          heading: "A Mission to Simplify How Work Gets Done",
          intro: [
            "Flowz Process Manager was built around one core idea: make complex business processes simple, visible, and efficient.",
            "The goal was not just to digitize workflows. It was to rethink how teams interact with them. I wanted to create a system where:",
          ],
          items: [
            "Workflows are easy to build and understand",
            "Tasks move forward without constant manual input",
            "Teams stay aligned without relying on external tools",
            "Managers can make decisions based on real-time data",
          ],
        },
        {
          kind: "grid",
          heading: "Understanding the People Behind the System",
          intro: [
            "To design something meaningful, I needed to understand who it was for. Through research, three key user groups emerged:",
          ],
          columns: 3,
          items: [
            {
              title: "Operations Managers",
              desc: "Focused on efficiency and identifying bottlenecks.",
            },
            {
              title: "Team Leads",
              desc: "Responsible for assigning tasks and tracking progress.",
            },
            {
              title: "Business Owners",
              desc: "Interested in performance, insights, and ROI.",
            },
          ],
          outro: [
            "Each group had different goals, but they all needed one thing: a clear view of how work flows across their organization.",
          ],
        },
        {
          kind: "prose",
          heading: "Shaping the Experience",
          body: [
            "I approached the design with a focus on simplicity and clarity. Instead of overwhelming users with features, I focused on creating a system that feels intuitive from the first interaction.",
            "Early wireframes explored how workflows could be visualized, how tasks could be structured, and how users could navigate the platform without friction.",
            "Prototypes were tested with real users, and their feedback guided key refinements across the product.",
          ],
        },
        { kind: "figure", caption: "Wireframes & early explorations" },
        {
          kind: "features",
          heading: "Building the Core Experience",
          intro: ["Flowz came together through four key product areas:"],
          items: [
            {
              title: "Workflow Builder",
              desc: "Workflows needed to feel visual and easy to control. I designed a drag-and-drop experience that lets users map out processes step by step, defining tasks, deadlines, and dependencies in a clear way.",
              result: "Reduced workflow setup time by 45%",
            },
            {
              title: "Task Automation",
              desc: "Manual work was slowing teams down. Flowz introduced automation to handle repetitive actions like reminders, approvals, and updates, reducing the need for constant human intervention.",
              result: "Reduced manual effort by 60%",
            },
            {
              title: "Real-Time Collaboration",
              desc: "Teams were relying too much on external communication tools. By embedding comments, mentions, and notifications directly into tasks, collaboration became part of the workflow itself.",
              result: "Increased task completion rates by 30%",
            },
            {
              title: "Analytics Dashboard",
              desc: "Managers needed more than just data; they needed insight. I designed a dashboard that highlights performance, tracks progress, and surfaces bottlenecks in real time.",
              result: "Decision-making became 50% faster",
            },
          ],
        },
        {
          kind: "grid",
          heading: "Design Decisions That Shaped Flowz",
          intro: ["Some decisions had a significant impact on the final product:"],
          columns: 3,
          items: [
            {
              title: "Visual, not technical",
              desc: "Users interacted better with drag-and-drop structures than with complex configurations.",
            },
            {
              title: "Collaboration within tasks",
              desc: "Keeping communication tied to tasks reduced context switching and improved clarity.",
            },
            {
              title: "Automation via templates",
              desc: "Pre-built workflows made automation approachable for non-technical users.",
            },
          ],
        },
        {
          kind: "grid",
          heading: "Overcoming Key Challenges",
          columns: 2,
          items: [
            {
              title: "Feature complexity vs. usability",
              desc: "Early versions felt overwhelming. I introduced guided onboarding, contextual tips, and simplified flows to make the experience easier to adopt.",
            },
            {
              title: "Adoption of automation",
              desc: "Many users were unfamiliar with automation. I addressed this by designing simple templates and breaking automation down into understandable actions.",
            },
          ],
        },
        {
          kind: "impact",
          heading: "The Impact",
          intro: ["After launch, Flowz delivered measurable improvements:"],
          metrics: [
            { value: "60%", label: "reduction in task completion time" },
            { value: "45%", label: "improvement in workflow transparency" },
            { value: "30%", label: "increase in team productivity" },
          ],
          body: [
            "One logistics company used Flowz to automate report generation and saved over 20 hours every week, letting their team focus on strategic growth instead of repetitive tasks.",
          ],
        },
        {
          kind: "quote",
          heading: "Reflection",
          body: [
            "Good design is not about adding more features. It is about removing friction.",
            "By focusing on clarity, usability, and real user needs, I was able to transform a complex problem into a simple, scalable solution.",
          ],
        },
      ],
    },
  },
  {
    slug: "gopal",
    title: "GoPal",
    category: "Digital Banking",
    tag: "Mobile · Personal Project",
    year: "2024",
    description:
      "An online banking experience designed to make everyday transactions effortless while helping users build better saving habits.",
    image: "/images/work/gopal.webp",
    subtitle: "Simplifying banking and encouraging smarter saving",
    tags: ["Mobile", "Fintech"],
    caseStudy: {
      title: "Designing Go Pal",
      tagline: "Simplifying banking and encouraging smarter saving.",
      overview:
        "An online banking experience designed to make everyday transactions effortless while helping users build better saving habits.",
      meta: [
        { label: "Role", value: "Product & UI/UX Designer" },
        { label: "Timeline", value: "1 month" },
        { label: "Platform", value: "Mobile · Banking App" },
        { label: "Deliverables", value: "Research, UX, UI, Prototyping" },
      ],
      blocks: [
        {
          kind: "prose",
          heading: "Overview",
          body: [
            "Go Pal is an online banking experience designed to make everyday transactions effortless while helping users build better saving habits.",
            "With the rise of digital-first banking, users are shifting toward platforms that are fast, intuitive, and entirely mobile. Go Pal responds to this shift by introducing a seamless money-saving feature that fits naturally into users' financial routines, without adding complexity.",
            "The goal was simple: make saving money feel as easy as spending it.",
          ],
        },
        { kind: "figure", caption: "Go Pal: home & savings overview" },
        {
          kind: "list",
          heading: "The Opportunity",
          intro: [
            "Digital banking has evolved; but saving money still feels like a separate, effort-heavy task.",
            "Through early exploration, a few gaps became clear:",
          ],
          items: [
            "Users could check balances, but lacked real-time clarity and control",
            "Saving required manual effort or external tools",
            "Everyday banking actions (sending money, reporting issues) weren't always frictionless",
          ],
          outro: [
            "This raised a key question: how might we make saving a natural part of everyday banking, instead of an extra step?",
          ],
        },
        {
          kind: "list",
          heading: "My Role & Scope",
          intro: [
            "I led this project as the sole product designer, responsible for:",
          ],
          items: [
            "End-to-end UX design",
            "Research and synthesis",
            "Interaction and visual design",
            "Prototyping and iteration",
          ],
          outro: [
            "Timeline: 1 month, across 3 iterative design cycles based on continuous user feedback.",
          ],
        },
        {
          kind: "grid",
          heading: "Understanding Users",
          intro: [
            "To ground the product in real needs, I conducted interviews with 12 participants across different age groups and financial behaviors.",
          ],
          columns: 3,
          items: [
            {
              title: "Who they are",
              desc: "70% aged 18–45. 30% aged 45+.",
            },
            {
              title: "What they need",
              desc: "Easier ways to save without juggling multiple apps, and virtual cards for safer, smoother online payments.",
            },
            {
              title: "What they told me",
              desc: '"Make payments faster" (QR code scanning) · "Everything in one place" (bill payments) · "Help me track my money" (clearer transaction history).',
            },
          ],
          outro: [
            "Users don't want more features; they want less friction and more control.",
          ],
        },
        {
          kind: "list",
          heading: "Defining the Experience",
          intro: ["Based on research, the core experience needed to support:"],
          items: [
            "Instant balance visibility for better financial awareness",
            "Real-time notifications for key account activity",
            "Fast, seamless transfers between users",
            "Simple card management, including reporting lost or stolen cards",
          ],
          outro: [
            "But more importantly: the product needed to nudge users toward saving, without forcing behavior change.",
          ],
        },
        {
          kind: "prose",
          heading: "Design Approach",
          body: [
            "I focused on embedding saving behaviors directly into everyday interactions.",
            "Instead of treating saving as a separate feature, I designed it as a natural extension of spending and account management. This led to three key design directions.",
          ],
        },
        {
          kind: "features",
          items: [
            {
              title: "Making Saving Effortless",
              desc: "Saving shouldn't require planning; it should happen in the background. I designed one-tap transfers from the main account to savings, flexible saving plans for different goals, and an autosave system (daily, weekly, monthly).",
              result:
                "Users build habits passively, without needing constant decision-making.",
            },
            {
              title: "Enabling Seamless Payments",
              desc: "Online transactions should feel fast, secure, and reliable. I designed a virtual debit card system for online payments, simplified access and management of cards, and clear transaction visibility.",
              result: "Users gain confidence and speed when making digital payments.",
            },
            {
              title: "Personalizing the Experience",
              desc: "Different users face different financial challenges. I designed flexible flows that adapt to saving behaviors, simplified navigation for core tasks, and thoughtful handling of edge cases like missed autosave or low balance.",
              result: "A more inclusive and adaptable banking experience.",
            },
          ],
        },
        {
          kind: "list",
          heading: "Iteration & Refinement",
          intro: [
            "Over three iterative cycles, I continuously tested and refined the experience. Each round focused on:",
          ],
          items: [
            "Reducing friction in key flows",
            "Improving clarity in financial information",
            "Strengthening user trust and confidence",
          ],
          outro: [
            "This iterative approach ensured the final product was not just functional, but intuitive and user-centered.",
          ],
        },
        {
          kind: "list",
          heading: "Key Learnings",
          intro: [
            "This project pushed me to think beyond features and focus on behavior.",
          ],
          items: [
            "Saving is behavioral, not just functional",
            "Small UX decisions can significantly impact financial habits",
            "Designing for edge cases is critical in financial products",
            "Iteration is essential to uncover what users actually need",
          ],
        },
        {
          kind: "list",
          heading: "Outcome",
          intro: [
            "Go Pal transforms saving from a conscious effort into a seamless habit. By integrating saving into everyday banking actions, the product:",
          ],
          items: [
            "Reduces friction in financial management",
            "Encourages consistent saving behavior",
            "Delivers a more intuitive and engaging banking experience",
          ],
        },
        {
          kind: "quote",
          heading: "Final Thoughts",
          body: [
            "Designing Go Pal reinforced the importance of combining usability with behavioral design.",
            "By staying close to user needs, embracing feedback, and iterating quickly, I was able to create a product that feels simple on the surface, but is deeply intentional underneath.",
          ],
        },
        {
          kind: "prose",
          heading: "Final Designs",
          body: [
            "A closer look at the core screens: home and savings overview, the savings flow, and the virtual card experience.",
          ],
        },
        { kind: "figure", caption: "Home / Savings Overview" },
        { kind: "figure", caption: "Savings Flow" },
        { kind: "figure", caption: "Virtual Card Experience" },
      ],
    },
  },
  {
    slug: "plantinerary",
    title: "Plantinerary",
    category: "Travel Planning",
    tag: "Mobile · Case Study",
    year: "2023",
    description:
      "A travel planner that turns scattered saves into a real day-by-day schedule, with AI suggestions that narrow the field instead of widening it.",
    image: "/images/work/plantinerary.jpg",
    subtitle: "Travel planning without seventeen open tabs",
    tags: ["Product Design", "Travel"],
    caseStudy: {
      title: "Plantinerary",
      tagline:
        "A travel planner for people who are tired of having seventeen tabs open.",
      overview:
        "Travel planning is not an information problem. It is a decision problem. Plantinerary gives travellers a structure to hang their ideas on, then uses light AI assistance to narrow the field instead of widening it.",
      meta: [
        { label: "Role", value: "Sole Product Designer" },
        { label: "Timeline", value: "4 - 5 weeks" },
        { label: "Type", value: "Self-directed concept" },
        { label: "Tools", value: "Figma, ChatGPT, Claude" },
      ],
      blocks: [
        {
          kind: "prose",
          heading: "Nobody has a shortage of options",
          body: [
            "Ask someone to plan a five day trip and watch what happens. They open a booking site, three blogs, two Instagram saved folders, a Notes app, a WhatsApp thread with the friend who went last year, and a Google Doc that will be abandoned by day two.",
            "None of those tools are broken. They are just all answering the same question: what could I do? Nobody is answering the harder one.",
          ],
        },
        {
          kind: "quote",
          heading: "How might we",
          body: [
            "How might we make saving an idea and scheduling it the same motion?",
            "The bottleneck is not discovery. It is the distance between “this looks amazing” and “this is what I am actually doing on Tuesday at 2pm.”",
            "That gap is where the fatigue lives. People collect forty possibilities, feel good for an hour, then freeze when it is time to commit. The trip gets planned in the taxi from the airport.",
          ],
        },
        {
          kind: "prose",
          heading: "Moving fast without guessing",
          body: [
            "Four weeks is not enough time for a full research programme, so I used AI deliberately and with limits.",
            "It was good for pressure testing my assumptions, generating traveller scenarios and edge cases I had not considered: the solo traveller with a rigid flight time, the group trip with three conflicting appetites. It also helped me summarise the patterns I was seeing across reviews, forum threads, and app store complaints.",
            "It was not good for telling me what real people actually do. Everything it produced was a hypothesis, not a finding. I treated it as a way to get to better questions faster, then checked those questions against real traveller conversations and my own reading of existing products.",
            "That distinction mattered. It kept the project honest, and it is the same way I would use these tools on a team with a proper research budget.",
          ],
        },
        {
          kind: "grid",
          heading: "Three patterns worth designing for",
          columns: 3,
          items: [
            {
              title: "Saving is easy. Sequencing is impossible.",
              desc: "Every product makes it a one tap job to save a place. Almost none of them help you decide whether it goes on Wednesday morning or Friday afternoon, or whether it is even reachable from the last thing you saved.",
            },
            {
              title: "People think in days, not lists.",
              desc: "Travellers narrate their plans chronologically: morning we do the market, then lunch nearby, then we are free until dinner. Yet most tools store plans as flat lists of bookmarks. The mental model and the data model do not match.",
            },
            {
              title: "Suggestions get ignored at the wrong moment.",
              desc: "Recommendations shown during browsing feel like advertising. The same recommendation shown when someone is staring at an empty Thursday afternoon feels like help. Timing changed everything about how a suggestion landed.",
            },
          ],
          outro: [
            "Travellers do not struggle to find options. They struggle to organise and choose between them.",
          ],
        },
        {
          kind: "grid",
          heading: "Three verbs",
          intro: [
            "I built the product around a sequence rather than a feature list.",
          ],
          columns: 3,
          items: [
            { title: "Discover", desc: "Find places worth going." },
            { title: "Plan", desc: "Turn them into a real schedule." },
            {
              title: "Experience",
              desc: "Follow the plan without re-planning it on the ground.",
            },
          ],
          outro: [
            "Most planning tools do the first two and quietly stop. The third one is where a plan either earns its keep or falls apart, so I treated it as a first class part of the product rather than an afterthought.",
          ],
        },
        {
          kind: "decisions",
          heading: "Four decisions that shaped the product",
          items: [
            {
              title: "The itinerary is a timeline, not a list",
              problem:
                "A list of saved places tells you nothing about whether your day is realistic.",
              decision:
                "Day by day timeline as the primary planning surface, with activities as blocks you drag into place.",
              note: {
                label: "The tradeoff",
                body: "A timeline implies precision, and travellers resist precision. Locking every activity to an exact time makes a plan feel like a work schedule, and people abandon it the moment reality drifts. So the timeline uses loose time bands rather than exact slots, and every trip has an ideas tray for things you want to do but have not committed to a day yet. The structure is there when you want it and out of the way when you do not.",
              },
            },
            {
              title: "A day you can read in one glance",
              problem:
                "Even a well built plan is useless if you have to reconstruct it every morning.",
              decision:
                "Each day reads as a single scannable unit. Activities grouped by time of day, colour coded by type, with travel time between stops made visible rather than assumed.",
              note: {
                label: "Why it matters",
                body: "Travel time is the quiet killer of itineraries. Three great choices that sit an hour apart become one great choice and two regrets. Surfacing that at planning time, not at 11am in a taxi, is the difference between a plan that survives and one that does not.",
              },
            },
            {
              title: "AI that waits its turn",
              problem:
                "Recommendation engines are usually designed to fill space. More cards, more scroll, more engagement. That is exactly the overload people are trying to escape.",
              decision:
                "Suggestions appear in context and in small numbers. An empty afternoon prompts two or three options that fit the gap, the neighbourhood you are already in, and the length of the trip. Not a feed. Not a carousel. A dismissed suggestion stays dismissed.",
              note: {
                label: "The tradeoff",
                body: "Fewer suggestions means fewer chances to delight someone with an unexpected find. I accepted that. A product that surfaces three relevant things is more useful than one that surfaces thirty and asks you to sort them, and trust is easier to lose than to build.",
              },
            },
            {
              title: "Saving and planning are the same gesture",
              problem:
                "In most products, saving something puts it into a graveyard you never revisit.",
              decision:
                "You do not save to a list. You save to a trip, and optionally to a day. The transition from browsing to planning has no seam in it, because that seam is exactly where intent gets lost.",
            },
          ],
        },
        {
          kind: "quote",
          heading: "The principle",
          body: ["AI supports the decision. It does not make it."],
        },
        {
          kind: "prose",
          heading: "Where the first version was wrong",
          body: [
            "The initial recommendation surface was a card feed on the home screen. It tested badly against my own principle within a day of building it. It looked like a shopping page, it competed with the user's own plan for attention, and it pushed the actual itinerary below the fold. Pulling recommendations out of the home screen and into the empty slots of the timeline was the single biggest improvement in the project.",
            "The first itinerary builder also required a time for every activity. It felt rigorous and it was quietly hostile. Anything a traveller was unsure about had nowhere to live, so it lived outside the product, which defeated the point. The ideas tray came out of that failure.",
          ],
        },
        {
          kind: "list",
          heading: "What I would test next",
          intro: [
            "This is a concept project, so I am not going to claim numbers I did not measure. What I would want to know:",
          ],
          items: [
            "Time to a first complete day. How long from creating a trip to having one day someone would actually follow?",
            "Plan survival. What proportion of planned activities are still in the itinerary on the day itself?",
            "Suggestion dismissal rate. A high rate means the context model is wrong, not that people dislike suggestions.",
            "The ideas tray. Does it become a useful staging area, or the same graveyard as every other save list?",
          ],
        },
        {
          kind: "list",
          heading: "What I took from it",
          items: [
            "Too many choices create friction, not value. Curation is a design act.",
            "AI assistance is most useful when it is contextual and quiet. Placement is the feature.",
            "Structure lowers cognitive load, but only if it flexes. Rigid structure gets abandoned.",
            "A plan is only good if it survives contact with the actual trip.",
          ],
        },
        {
          kind: "prose",
          heading: "Final designs",
          body: [
            "A closer look at the core screens: discovery, the itinerary builder, a single day, and suggestions in context.",
          ],
        },
        {
          kind: "figure",
          caption:
            "Home and discovery: browsing that leads somewhere. Every place can be added to a trip in one action.",
        },
        {
          kind: "figure",
          caption:
            "Trip planner and itinerary builder: the timeline with loose time bands, drag to reorder, and the ideas tray for undecided plans.",
        },
        {
          kind: "figure",
          caption:
            "Activity breakdown: one day, readable at a glance, with travel time between stops made visible.",
        },
        {
          kind: "figure",
          caption:
            "AI recommendations in context: suggestions appearing inside an empty afternoon rather than in a feed competing for attention.",
        },
        {
          kind: "quote",
          heading: "Closing thought",
          body: [
            "The interesting tension in Plantinerary was never technical. It was about control.",
            "Travellers want to feel like the trip is theirs, and they also want someone to take some of the weight off. Design the assistance too loudly and it feels like being sold to. Design it too quietly and it may as well not exist.",
            "Getting that balance right is most of the product.",
          ],
        },
      ],
    },
  },
  {
    slug: "cropgate",
    title: "CropGate",
    category: "Agritech",
    tag: "Web · Case Study",
    year: "2023",
    description:
      "Connecting farmers and buyers through a marketplace that keeps produce, pricing, and logistics transparent end to end.",
    image: "/images/work/cropgate.webp",
    subtitle: "Marketplace connecting farmers and buyers",
    tags: ["Product Design", "Web"],
  },
  {
    slug: "valco",
    title: "Valco Trust Fund",
    category: "Fintech",
    tag: "Web · Case Study",
    year: "2023",
    description:
      "Making trust-fund investing approachable with clear onboarding, transparent returns, and confidence-building visuals.",
    image: "/images/work/valco.jpg",
    subtitle: "Trust-fund investing made approachable",
    tags: ["Fintech", "UI Design"],
  },
];

export const posts = [
  {
    title: "AI as a designer's tool, not a replacement",
    date: "July 2024",
    href: "https://medium.com/",
    image: "/images/articles/ai-tool.jpg",
    excerpt:
      "How I fold AI into my process to move faster without losing the craft and judgment that make design matter.",
  },
  {
    title: "UI/UX design guidance for Nigerian youth",
    date: "March 2022",
    href: "https://medium.com/",
    image: "/images/articles/uiux-youth.jpg",
    excerpt:
      "A practical starting point for young designers in Nigeria breaking into product design from scratch.",
  },
];

// ===== /about page =====

export const about = {
  tagline:
    "Product designer, Framer developer, design guru. I help businesses craft digital experiences that connect, inspire, and elevate their work.",
  facts: [
    { value: "5+ years", label: "Experience" },
    { value: "Lagos, Nigeria", label: "Location" },
    { value: "Available", label: "Freelance" },
  ],
  bio: [
    "I'm Taslim Abdulkadir, a UI/UX designer with five years of experience helping businesses turn complex ideas into engaging, user-centered designs. My mission is to create ethical, impactful solutions that streamline the journey from concept to launch, empowering businesses to reach their goals without the usual roadblocks.",
    "Most products don't fail because of bad ideas, they fail because things get complicated too early. I focus on slowing down, understanding the real problem, and designing solutions that make sense to the people using them, not just the people building them.",
  ],
} as const;

export type Role = {
  period: string;
  company: string;
  title: string;
  points: string[];
};

export const experience: Role[] = [
  {
    period: "July 2025 - Present",
    company: "Guaranty Trust Bank",
    title: "Product Designer",
    points: [
      "Redesigned and optimized the GAPS-Lite mobile platform for SME banking, introducing an intuitive user experience and streamlined navigation, enhancing convenience for on-the-go business banking.",
      "Redesigned the i-Bank Internet Banking portal, conducting comprehensive user research, including usability testing, surveys, and one-on-one interviews to refine the dashboard and transactional workflows, aiming to improve user task completion rates.",
      "Crafted a seamless onboarding experience across both GAPS-Lite and i-Bank, aiming to reduce first-session drop-off and increase user activation through interactive guides and contextual tooltips.",
      "Collaborated closely with engineering, compliance, and marketing to align design strategy with the bank's emphasis on security, regulatory compliance, and brand integrity, keeping multi-factor authentication, real-time transaction monitoring, and the iconic orange identity consistent across digital touchpoints.",
    ],
  },
  {
    period: "March 2025 - July 2025",
    company: "AIMA Solutions",
    title: "Product Designer",
    points: [
      "Led and mentored a team of 3 brand and product designers, fostering collaboration, growth, and innovative design solutions.",
      "Designed and optimized the AIMA resume and cover letter builder, lifting tool adoption 12% in the first 2 months.",
      "Ran in-depth user research, including surveys and interviews, to refine key product features and drive a 20% increase in customer satisfaction scores.",
      "Designed a seamless onboarding experience that reduced drop-off and improved activation rates by 18%.",
      "Worked across engineering and marketing to align design strategy with business objectives.",
    ],
  },
  {
    period: "April 2024 - March 2025",
    company: "Revent Technologies",
    title: "UI/UX Designer",
    points: [
      "Led design of a one-of-a-kind workflow process manager, automating key tasks, minimizing manual errors, and improving team collaboration.",
      "Implemented a scalable design system that cut design turnaround time by 30%, keeping platforms consistent and making new features easier to integrate.",
      "Established design standards that raised the overall digital experience across products and built a more user-centered culture.",
      "Introduced process improvements that reduced design-to-development handoff time by 20% and increased design team efficiency by 25%.",
      "Mentored a team of designers, sharing best practices and building a culture of continuous learning.",
    ],
  },
  {
    period: "Feb 2023 - April 2024",
    company: "TradeBuza",
    title: "Lead Product Designer",
    points: [
      "Redesigned the mobile app onboarding experience, reducing drop-off rates by 52%.",
      "Designed a cash advance feature for the CropGate web app that contributed a 17% increase in revenue.",
      "Overhauled the Agro-CropGate web application, driving a 30% revenue boost by improving onboarding for farm aggregators.",
      "Led the Agent mobile app redesign, optimizing communication between farmers, agents, and aggregators and cutting processing time by 23%.",
      "Helped design an offline mode for the agent app, enabling seamless payments to farmers and saving 20% of transaction time.",
      "Contributed to ideation and implementation of new solutions, which together lifted customer acquisition by 15%.",
    ],
  },
  {
    period: "Jan 2021 - Jan 2023",
    company: "Ikons Systems Technologies",
    title: "Product Designer",
    points: [
      "Designed a fluid design system implemented across all projects, reducing design time by 35%.",
      "Contributed to Learnify, a web application focused on skill acquisition in cloud computing, Microsoft Azure, and Excel.",
      "Redesigned the Ikons Academy e-learning platform, improving onboarding and reducing drop-off rates by 30%.",
      "Designed the Ikons Systems website for bootcamps, masterclasses, and events, plus landing pages that raised lead conversion by 33%.",
      "Helped design Islamasaservice, a platform connecting tutors with students.",
    ],
  },
];

export const testimonials = [
  {
    quote:
      "Working with Taslim has been fantastic. His constant availability and willingness to assist make our work so much easier. Having someone like him on our team is a real asset.",
    name: "Chimdi Nwawueze",
    company: "TradeBuza Technologies",
  },
  {
    quote:
      "Taslim is an exceptional product designer, known for his creativity and user-centered approach. He consistently delivers outstanding results and he's very good at transforming ideas into visually appealing and intuitive designs.",
    name: "Kazeem Adegboyega",
    company: "Ikons Systems",
  },
  {
    quote:
      "Collaborating with Taslim is truly exceptional. His unwavering readiness and eagerness to help simplify our tasks considerably. Possessing an individual like him on our crew is a genuine boon.",
    name: "Jibril Abdulkadir",
    company: "Field Intelligence",
  },
];
