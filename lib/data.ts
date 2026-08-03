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
  { label: "LinkedIn", href: "https://www.linkedin.com/in/taslimabdulkadir/" },
  // x.com rather than the twitter.com the old site also linked: both resolve
  // to the same handle, and this one matches the label.
  { label: "Twitter / X", href: "https://x.com/therealbiodun_" },
  { label: "Medium", href: "https://medium.com/@taslim.designx" },
  { label: "Instagram", href: "https://www.instagram.com/therealbiodun_" },
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
  | {
      kind: "figure";
      src?: string;
      /** Short label for what the screen is. */
      caption?: string;
      /** What this screen changes about the product, in a line or two. */
      impact?: string;
    }
  /** A before/after pair. Both frames sit side by side with the description
   *  underneath them, so the comparison reads before the explanation does. */
  | {
      kind: "compare";
      heading?: string;
      intro?: string[];
      items: {
        /** What screen is being compared. */
        label: string;
        beforeSrc?: string;
        afterSrc?: string;
        /** Sits under the pair: what changed and why it mattered. */
        caption: string;
      }[];
    };

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
  /** Omit while a project is still waiting on its shots; the card falls back
   *  to the same empty frame the case study figures use. */
  image?: string;
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
    slug: "plantinerary",
    title: "Plantinerary",
    category: "Travel Planning",
    tag: "Mobile · Client Project",
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
        { label: "Type", value: "Client project" },
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
          kind: "figure",
          src: "/images/work/plantinerary.jpg",
          caption:
            "Home: discovery up top, but the itinerary is already on the screen underneath it.",
          impact:
            "The argument the whole product rests on. Browsing and planning share one surface, because the moment you send someone elsewhere to save a thing is the moment the intention gets lost.",
        },
        {
          kind: "prose",
          heading: "Moving fast without guessing",
          body: [
            "Four weeks is not enough time for a full research programme, so I used AI deliberately and with limits.",
            "It was good for pressure testing my assumptions and generating traveller scenarios I had not considered: the solo traveller with a rigid flight time, the group trip with three conflicting appetites. It helped me summarise patterns across reviews, forum threads, and app store complaints.",
            "It was not good for telling me what real people do. Everything it produced was a hypothesis, not a finding. I treated it as a way to reach better questions faster, then checked those questions against real traveller conversations and my own reading of existing products.",
            "That distinction kept the project honest, and it is the same way I would use these tools on a team with a proper research budget.",
          ],
        },
        {
          kind: "grid",
          heading: "Three patterns worth designing for",
          columns: 3,
          items: [
            {
              title: "Saving is easy. Sequencing is impossible.",
              desc: "Every product makes it one tap to save a place. Almost none help you decide whether it goes Wednesday morning or Friday afternoon, or whether it is even reachable from the last thing you saved.",
            },
            {
              title: "People think in days, not lists.",
              desc: "Travellers narrate plans chronologically: morning the market, lunch nearby, free until dinner. Yet most tools store plans as flat lists of bookmarks. The mental model and the data model do not match.",
            },
            {
              title: "Suggestions get ignored at the wrong moment.",
              desc: "Recommendations during browsing feel like advertising. The same recommendation shown while someone stares at an empty Thursday feels like help. Timing changed everything.",
            },
          ],
          outro: [
            "Travellers do not struggle to find options. They struggle to organise and choose between them.",
          ],
        },
        {
          kind: "prose",
          heading: "The brief, and the argument with it",
          body: [
            "The ask that came in was the one this category always produces: better discovery, richer recommendations, more inspiration. That is what travel products sell, and it is what users say they want when you ask them directly.",
            "It is also the opposite of what the research pointed at. Every product in this space is already excellent at showing you more. Building another one would have been answering a question nobody was stuck on.",
            "Making that case meant arguing against the most fundable version of the product. Discovery features demo well and their value is easy to describe in a meeting. Sequencing is invisible until you watch someone fail at it.",
          ],
        },
        {
          kind: "grid",
          heading: "Three verbs",
          intro: [
            "So I built around a sequence rather than a feature list:",
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
            "Most planning tools do the first two and quietly stop. The third is where a plan either earns its keep or falls apart, so I treated it as a first class part of the product rather than an afterthought.",
          ],
        },
        {
          kind: "figure",
          caption:
            "Trip planner: the timeline with loose time bands, drag to reorder, and the ideas tray for undecided plans.",
          impact:
            "Where the product does the thing the category avoids. Structure enough to be a real plan, loose enough that a traveller will not abandon it the first time reality drifts.",
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
                "Recommendation engines are designed to fill space. More cards, more scroll, more engagement. That is exactly the overload people are trying to escape.",
              decision:
                "Suggestions appear in context and in small numbers. An empty afternoon prompts two or three options that fit the gap, the neighbourhood, and the length of the trip. Not a feed. Not a carousel. A dismissed suggestion stays dismissed.",
              note: {
                label: "The tradeoff",
                body: "Fewer suggestions means fewer chances to delight someone with an unexpected find, and it is the decision a client would most likely have overruled. Engagement metrics reward the feed. I accepted the cost: a product that surfaces three relevant things is more useful than one that surfaces thirty and asks you to sort them, and trust is easier to lose than to build.",
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
          kind: "figure",
          caption:
            "Activity breakdown: one day, readable at a glance, with travel time between stops made visible.",
          impact:
            "The screen that has to survive contact with the actual trip. If this one fails at 9am in an unfamiliar city, none of the planning mattered.",
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
            "The initial recommendation surface was a card feed on the home screen. It failed against my own principle within a day of building it. It looked like a shopping page, it competed with the user's own plan for attention, and it pushed the actual itinerary below the fold. Pulling recommendations out of the home screen and into the empty slots of the timeline was the single biggest improvement in the project.",
            "The first itinerary builder also required a time for every activity. It felt rigorous and it was quietly hostile. Anything a traveller was unsure about had nowhere to live, so it lived outside the product, which defeated the point. The ideas tray came out of that failure.",
            "Both corrections came from the same mistake: I had designed for the plan being finished, when the interesting state is the plan being half-formed.",
          ],
        },
        {
          kind: "figure",
          caption:
            "AI recommendations in context: suggestions appearing inside an empty afternoon rather than in a feed competing for attention.",
          impact:
            "The fix for the home screen feed. Same recommendations, same engine, different moment, and it stops reading as advertising and starts reading as help.",
        },
        {
          kind: "list",
          heading: "What I would test next",
          intro: [
            "I am not going to claim numbers I did not measure. What I would want to know once it is in front of real trips:",
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
    slug: "ibank",
    title: "GTBank i-Bank",
    category: "Internet Banking",
    tag: "Web · Client Project",
    year: "2025",
    description:
      "A redesign of the i-Bank internet banking portal, rebuilding the dashboard and transactional workflows around what customers were actually trying to finish.",
    image: "/images/work/ibank.jpg",
    subtitle: "Internet banking rebuilt around task completion",
    tags: ["Product Design", "Fintech"],
    caseStudy: {
      title: "GTBank i-Bank",
      tagline:
        "Redesigning an internet banking portal without breaking the things a bank cannot break.",
      overview:
        "i-Bank worked. Customers could do everything the bank offered, provided they already knew where it was. The redesign rebuilt the dashboard and transactional workflows around task completion, inside constraints that are not negotiable in retail banking.",
      meta: [
        { label: "Role", value: "Product Designer" },
        { label: "Client", value: "Guaranty Trust Bank" },
        { label: "Platform", value: "Web · Internet Banking" },
        { label: "Deliverables", value: "Research, UX, UI, Testing" },
      ],
      blocks: [
        {
          kind: "prose",
          heading: "A portal that worked, for people who already knew it",
          body: [
            "Internet banking portals age in a particular way. Features get added, each one reasonable on its own, each one earning a place in the navigation. Nothing is ever removed, because everything is used by somebody.",
            "What you end up with is a product that can do everything and helps with nothing. Customers who had used i-Bank for years moved through it fine. Everyone else was navigating a filing cabinet.",
            "The redesign started from a question the feature list could not answer: what is a customer actually here to finish, and how much is standing between them and finishing it?",
          ],
        },
        {
          kind: "prose",
          heading: "Finding out where it actually broke",
          body: [
            "I ran usability testing, surveys, and one-on-one interviews rather than relying on the support tickets already in hand. Tickets tell you what made someone angry enough to call. They are silent about the customer who gave up quietly, and that was the group the redesign existed for.",
            "Watching sessions changed what I thought the problem was. People were not confused by individual screens. They were losing the thread between them: starting a transfer, being sent somewhere to confirm something, and arriving back without a clear sense of whether the thing had happened.",
            "Task completion was the metric that mattered, and the failures were in the joins rather than the parts.",
          ],
        },
        {
          kind: "compare",
          heading: "What changed on screen",
          intro: [
            "Three comparisons carry most of the redesign. In each case the old screen is not badly made; it is organised around what the bank offers rather than what the customer came to do.",
          ],
          items: [
            {
              label: "Dashboard",
              beforeSrc: "/images/work/ibank-dashboard-old.png",
              afterSrc: "/images/work/ibank-dashboard-new.png",
              caption:
                "The old dashboard led with everything the portal could do, weighting each option equally. The redesign leads with account position and the handful of actions that make up most sessions, and moves the rest behind a clear second level. The change is not visual density but hierarchy: the first screen now answers where do I stand and what can I do next, instead of listing the estate.",
            },
            {
              label: "Transfer flow",
              beforeSrc: "/images/work/ibank-transfer-old.png",
              afterSrc: "/images/work/ibank-transfer-new.png",
              caption:
                "The original flow was correct and unaccompanied, sending customers through authentication and confirmation steps without telling them where they were in the sequence. The redesign keeps every one of those steps, since none are optional, and adds the state customers were missing: what stage this is, what happens next, and an unambiguous confirmation at the end. Nothing was removed from the process. What changed is that it now narrates itself.",
            },
            {
              label: "Transaction history",
              beforeSrc: "/images/work/ibank-history-old.png",
              afterSrc: "/images/work/ibank-history-new.png",
              caption:
                "History was a dense table that answered what happened to my account but not did my payment go through, which is the question people actually arrive with. The redesign separates recent activity from full history, gives each entry a clear status rather than leaving it implied by its presence in a list, and makes the filters usable without knowing the date range in advance.",
            },
          ],
        },
        {
          kind: "prose",
          heading: "What was asked for, and what it needed",
          body: [
            "The brief was a redesign of the dashboard and transactional workflows. Read narrowly, that is a visual refresh and some reorganised navigation, and it would have shipped.",
            "The research pointed somewhere less convenient. If customers were losing the thread between steps, then reskinning the steps would leave the problem exactly where it was. What the portal needed was feedback and orientation, which are not layout problems.",
            "So I argued for two things beyond the brief, and one of them ran straight into constraints that outrank design.",
          ],
        },
        {
          kind: "decisions",
          heading: "The additions, and what pushed back",
          intro: [
            "In retail banking, the pushback is not a matter of taste. Security and compliance set the boundary, and the design works inside it.",
          ],
          items: [
            {
              title: "Transaction status the brief did not mention",
              problem:
                "The brief covered the dashboard and the workflows that move money. It said nothing about what a customer sees afterwards, which is where most of the uncertainty in the sessions actually sat.",
              decision:
                "I pushed for status to be explicit on every transaction rather than inferred from its presence in a list, and for recent activity to be separated from full history.",
              note: {
                label: "Why I pushed for it",
                body: "A customer who is not sure whether a transfer completed does the same thing every time: they try again, or they call. Both are expensive, and neither shows up as a failed task in the workflow the redesign was scoped around. Fixing the flow without fixing what follows it would have moved the confusion rather than removing it.",
              },
            },
            {
              title: "More visible feedback through authentication",
              problem:
                "Multi-factor authentication is where customers most often lost their place, and where they were least sure whether their money had moved.",
              decision:
                "I designed clearer state and progress through the authentication and confirmation sequence, so customers always knew what stage they were at.",
              note: {
                label: "The constraint",
                body: "This is where design stops being the deciding voice. Multi-factor authentication and real-time transaction monitoring are not steps that can be streamlined for elegance, and how much a screen may reveal about a transaction's state is a compliance question before it is a UX one. Working with engineering and compliance, the answer was not fewer steps but better narration of the steps that must exist. That constraint improved the work: it forced the fix to be clarity rather than removal, which is the more durable version anyway.",
              },
            },
            {
              title: "Holding the brand inside the redesign",
              problem:
                "A redesign is the easiest moment to quietly drift away from an established identity, and this one is among the most recognisable in Nigerian banking.",
              decision:
                "I kept the bank's identity consistent across every touchpoint the redesign covered, treating it as a fixed input rather than something to modernise.",
              note: {
                label: "The tradeoff",
                body: "Some interface decisions would have been easier with a freer palette. But customers read that identity as a signal they are in the right place, on the correct site, which in banking is a security cue as much as a brand one. Consistency was worth more than the visual latitude I gave up.",
              },
            },
          ],
        },
        {
          kind: "grid",
          heading: "The three constraints everything sat inside",
          intro: [
            "Every decision in this project had to satisfy all three at once. Anything that failed one of them was not a design option, however well it tested:",
          ],
          columns: 3,
          items: [
            {
              title: "Security",
              desc: "Multi-factor authentication and real-time transaction monitoring are load-bearing. The design accommodates them; it does not negotiate with them.",
            },
            {
              title: "Regulatory compliance",
              desc: "What can be shown, when, and to whom is set outside the design process. Working with compliance early is cheaper than redesigning around a rejection late.",
            },
            {
              title: "Brand integrity",
              desc: "A recognisable identity held consistently across digital touchpoints, because in banking, looking correct is part of being trusted.",
            },
          ],
        },
        {
          kind: "list",
          heading: "What I would measure",
          intro: [
            "The redesign is aimed at outcomes I would want held to numbers rather than asserted:",
          ],
          items: [
            "Task completion rate on transfers, the metric the whole redesign is pointed at",
            "Drop-off inside the authentication sequence, where sessions were being lost",
            "Repeat attempts on the same transfer, the clearest signal that status is not landing",
            "Support contact volume on how do I, which should fall if orientation improved",
          ],
        },
        {
          kind: "quote",
          heading: "Reflection",
          body: [
            "Redesigning a bank is mostly an exercise in what you are not allowed to change.",
            "The steps that frustrated customers were, in almost every case, the steps protecting them. The work was not removing friction but making necessary friction legible, so a customer waiting on a security check understands they are being protected rather than obstructed.",
            "That constraint made the design better. Given a free hand I would have tried to shorten the flow, and shipped something faster and less trustworthy.",
          ],
        },
      ],
    },
  },
  {
    slug: "flowz",
    title: "Flowz",
    category: "Process Automation",
    tag: "SaaS · Client Project",
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
          heading: "Bringing clarity to broken workflows",
          body: [
            "As businesses scale, their workflows often become harder to manage. What once felt simple starts to break down. Tasks get lost across tools, approvals take longer than expected, and teams struggle to stay aligned.",
            "Productivity drops, not because people are not working hard, but because the system itself is inefficient. That was the reality I kept hearing from operations managers, team leads, and business owners.",
            "They were not just dealing with inefficiency. They were operating without visibility.",
          ],
        },
        {
          kind: "figure",
          src: "/images/work/flowz.webp",
          caption:
            "The dashboard that became the product's front door: running processes, approvals waiting on you, and execution monitoring in one view.",
          impact:
            "The brief asked for a workflow tool. This screen is the argument that what they actually needed was a status answer, available before anyone has to go looking for it.",
        },
        {
          kind: "list",
          heading: "The brief, and what was missing from it",
          intro: [
            "The request that came to me was specific: build a platform to digitise our workflows. Teams were spread across a chat tool for communication, a tracker for tasks, and spreadsheets for reporting.",
            "That fragmentation was creating real cost:",
          ],
          items: [
            "Delays in approvals and execution",
            "No real-time visibility into progress",
            "Poor collaboration across teams",
            "Limited ability to measure performance",
          ],
          outro: [
            "Digitising those workflows would have solved the first problem and none of the others. A faster version of a process nobody can see is still a process nobody can see.",
            "So I treated the brief as the starting position rather than the specification, and went looking for what the fragmentation was actually costing.",
          ],
        },
        {
          kind: "grid",
          heading: "Three people, three different questions",
          intro: [
            "Research surfaced three groups, and they were not asking the platform for the same thing:",
          ],
          columns: 3,
          items: [
            {
              title: "Operations managers",
              desc: "Focused on efficiency and finding bottlenecks. They wanted to know where work was stuck, not what everyone was doing.",
            },
            {
              title: "Team leads",
              desc: "Responsible for assigning work and tracking progress. They needed to move things forward without chasing people for updates.",
            },
            {
              title: "Business owners",
              desc: "Interested in performance and return. They wanted a number they could trust without asking someone to prepare it.",
            },
          ],
          outro: [
            "Different goals, one shared need: a clear view of how work moves through the organisation. That became the thing I designed toward, and it is broader than the brief I was handed.",
          ],
        },
        {
          kind: "prose",
          heading: "What they asked for, and what they needed",
          body: [
            "The stated requirement was a workflow builder with task assignment and status tracking. Reasonable, and it would have shipped.",
            "But watching how teams worked made a different problem obvious. The bottleneck was rarely creating the workflow. It was everything around it: the approval sitting in someone's inbox, the update that lived in a chat thread nobody searched, the report assembled by hand every Friday.",
            "A builder alone would have digitised the easy part and left the expensive part untouched. So I proposed three things that were not in the brief, and had to make the case for each.",
          ],
        },
        {
          kind: "decisions",
          heading: "The three additions, and the pushback on each",
          intro: [
            "None of these were requested. Two of them were initially resisted, and one of those resistances turned out to be right.",
          ],
          items: [
            {
              title: "Automation, when the ask was assignment",
              problem:
                "The brief covered assigning tasks to people. It did not cover the reminders, approvals, and status updates that were eating the day between those tasks.",
              decision:
                "I pushed for automation as a first-class part of the product rather than a later phase, so repetitive actions could move without a person pushing them.",
              note: {
                label: "The pushback",
                body: "The concern was scope and trust: automation is harder to build, harder to explain, and users who do not understand it will not switch it on. That second half was correct, and it changed the design. Instead of a rules engine, automation shipped as a small set of named, pre-built templates. Framing it as a few recognisable actions rather than a configuration surface is what made teams willing to try it.",
              },
            },
            {
              title: "Collaboration inside the task, not beside it",
              problem:
                "Nobody asked for comments or mentions. The assumption was that teams would keep talking in the chat tool they already had.",
              decision:
                "I embedded comments, mentions, and notifications directly into the task, so the conversation lives with the work it is about.",
              note: {
                label: "Why I pushed for it",
                body: "Every handoff failure I found in research traced back to context living somewhere other than the work. Keeping the chat tool would have kept the failure. This was the addition that met the least resistance once the research was on the table, because everyone had a story about a decision they could not find later.",
              },
            },
            {
              title: "An analytics view nobody requested",
              problem:
                "Reporting was described as a later phase. Business owners were expected to keep asking someone to pull numbers.",
              decision:
                "I designed the dashboard into the first release: throughput, progress, and bottlenecks surfaced in real time.",
              note: {
                label: "The tradeoff",
                body: "This one cost me elsewhere. Building it meant deferring depth in the workflow builder, and I argued that a shallower builder with visibility beats a richer builder without it. Visibility was the actual complaint underneath the brief. The builder was just the thing they knew how to ask for.",
              },
            },
          ],
        },
        {
          kind: "prose",
          heading: "Where the first version was wrong",
          body: [
            "The first build was too much product. Every capability was visible from the first screen, on the theory that showing the range would demonstrate the value.",
            "It did the opposite. Early testers described it as overwhelming, and the reaction was strongest among exactly the non-technical users the platform was supposed to bring in. People who could not tell which of nine things to do first did none of them.",
            "That was the most useful failure in the project. The fix was not fewer features but a slower reveal: guided onboarding, contextual tips at the moment a feature becomes relevant, and simplified default flows. Complexity stays available; it just stops being the first thing you meet.",
          ],
        },
        {
          kind: "figure",
          caption:
            "Guided onboarding: a first-run walkthrough with tips that appear where a feature is used.",
          impact:
            "The direct answer to that early testing. It holds complexity back until someone has a reason to care about it, which is what let non-technical teams get past the first session.",
        },
        {
          kind: "features",
          heading: "What shipped",
          intro: [
            "Four areas carried the product, two of them from the original brief and two argued into it:",
          ],
          items: [
            {
              title: "Workflow builder",
              desc: "A drag-and-drop canvas for mapping a process step by step, with tasks, deadlines, and dependencies laid out as blocks rather than configured in a form.",
              result: "Reduced workflow setup time by 45%",
            },
            {
              title: "Task automation",
              desc: "Reminders, approvals, and status updates handled by pre-built templates, so the routine parts move without anyone pushing them.",
              result: "Reduced manual effort by 60%",
            },
            {
              title: "Real-time collaboration",
              desc: "Comments, mentions, and notifications living inside the task, so context stays attached to the work instead of scattering into chat.",
              result: "Increased task completion rates by 30%",
            },
            {
              title: "Analytics dashboard",
              desc: "Performance, progress, and bottlenecks surfaced as they happen, rather than assembled on request.",
              result: "Decision-making became 50% faster",
            },
          ],
        },
        {
          kind: "figure",
          caption:
            "Workflow builder: processes mapped step by step, with tasks, deadlines, and dependencies laid out as blocks.",
          impact:
            "Turns the most intimidating part of the product into something you can see and rearrange. This is what let non-technical users build their own workflows instead of filing a request and waiting.",
        },
        {
          kind: "figure",
          caption:
            "Automation setup: rules for reminders, approvals, and status updates, started from pre-built templates.",
          impact:
            "The shape this took because of the pushback. Presenting automation as a handful of named actions rather than a configuration screen is what made teams willing to try it at all.",
        },
        {
          kind: "figure",
          caption:
            "Task detail: comments, mentions, and notifications living inside the task itself.",
          impact:
            "Keeps the conversation attached to the work. Removing the trip out to a separate chat tool closed the gap where context kept going missing between handoffs.",
        },
        {
          kind: "grid",
          heading: "What the decisions came down to",
          intro: ["Three calls did most of the work:"],
          columns: 3,
          items: [
            {
              title: "Visual, not technical",
              desc: "Users interacted far better with drag-and-drop structure than with configuration. The same capability, framed as something you arrange rather than something you set up.",
            },
            {
              title: "Conversation tied to tasks",
              desc: "Keeping communication attached to the work cut context switching and made decisions findable after the fact.",
            },
            {
              title: "Automation through templates",
              desc: "Pre-built workflows made automation approachable for people who would never have opened a rules editor.",
            },
          ],
        },
        {
          kind: "impact",
          heading: "The impact",
          intro: ["After launch, the platform delivered measurable improvement:"],
          metrics: [
            { value: "60%", label: "reduction in task completion time" },
            { value: "45%", label: "improvement in workflow transparency" },
            { value: "30%", label: "increase in team productivity" },
          ],
          body: [
            "One logistics company used Flowz to automate report generation and saved over 20 hours every week, letting their team focus on strategic growth instead of repetitive tasks.",
            "Worth noting that two of the three numbers above come from the parts nobody asked for.",
          ],
        },
        {
          kind: "quote",
          heading: "Reflection",
          body: [
            "Good design is not about adding more features. It is about removing friction.",
            "The harder lesson was about the brief. A client describes the problem in the vocabulary of the solution they already imagined, and taking that literally produces something correct and useless. The job was to hear digitise our workflows and understand it as we cannot see our own work.",
            "The pushback was part of that, not an obstacle to it. The objection to automation was right about users, and the product is better for having lost that argument.",
          ],
        },
      ],
    },
  },
  {
    slug: "gopal",
    title: "GoPal",
    category: "Digital Banking",
    tag: "Mobile · Client Project",
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
            "Go Pal is an online banking experience designed to make everyday transactions effortless while helping people build better saving habits.",
            "Banking has gone mobile-first, but saving has not come with it. It still sits off to the side as a separate, effort-heavy task you are supposed to remember to do.",
            "The goal was simple to state and hard to build: make saving feel as easy as spending.",
          ],
        },
        {
          kind: "figure",
          src: "/images/work/gopal.webp",
          caption:
            "Home: balance, quick access to the four things people actually do, and recent activity.",
          impact:
            "Everything above the fold is spending. That was the honest starting point, and the whole design problem was getting saving into this screen without shouting.",
        },
        {
          kind: "prose",
          heading: "The brief, and how I tested it",
          body: [
            "The requirement I was given was a mobile banking app: balances, transfers, bill payments, card management. A digital bank, competently executed.",
            "I took that as the floor rather than the specification, and put three rounds of testing between the brief and the build. Each round was aimed at finding what I had got wrong rather than confirming what I had got right, because a requirement list tells you what to build and nothing about whether it will work.",
            "Everything below that reads as a correction came from those rounds, not from hindsight.",
          ],
        },
        {
          kind: "figure",
          src: "/images/work/research-flowchart.png",
          caption:
            "The research flow: listen, dig deeper, make sense of it, then move to ideas.",
          impact:
            "Structuring it this way is what stopped the interviews turning into feature requests. The rule was to keep asking why until people described a behaviour rather than a button.",
        },
        {
          kind: "list",
          heading: "What people asked for",
          intro: [
            "I interviewed 12 participants across different ages and money habits. Asked directly what they wanted, they gave me a feature list:",
          ],
          items: [
            "Faster payments, usually meaning QR scanning",
            "Everything in one place, usually meaning bill payments",
            "Better tracking, usually meaning clearer transaction history",
            "Virtual cards for safer online payments",
          ],
          outro: [
            "A reasonable roadmap. It is also, almost entirely, a list of ways to spend money more comfortably.",
          ],
        },
        {
          kind: "quote",
          heading: "The gap",
          body: [
            "People asked me to make spending smoother. What they described, when they stopped listing features, was regret about not saving.",
            "Nobody requested an autosave system. Several described the same failure: money arrives, money leaves, nothing is left at the end of the month, and the intention to save was real the whole time.",
          ],
        },
        {
          kind: "prose",
          heading: "What they wanted against what they needed",
          body: [
            "Taken literally, the research pointed at a competent payments app. Faster transfers, cleaner history, a virtual card. I could have built exactly that and every participant would have said it was what they asked for.",
            "But a smoother way to spend money does not help someone who cannot hold on to any. The requests were about friction; the actual problem was behaviour. Those need different products.",
            "So I kept everything on the list and added the thing nobody named: saving built into the flow of ordinary banking, rather than parked in a section you have to decide to visit.",
          ],
        },
        {
          kind: "list",
          heading: "What that meant in practice",
          intro: ["The core experience had to support:"],
          items: [
            "Instant balance visibility, so financial awareness is passive",
            "Real-time notifications for anything that matters",
            "Fast, seamless transfers between people",
            "Simple card management, including reporting a card lost or stolen",
          ],
          outro: [
            "And underneath all of it, the part I added: the product had to nudge people toward saving without forcing a behaviour change or making them feel managed.",
          ],
        },
        {
          kind: "features",
          heading: "Three directions",
          intro: [
            "Rather than treating saving as a feature, I designed it as a natural extension of spending and account management.",
          ],
          items: [
            {
              title: "Making saving effortless",
              desc: "Saving shouldn't require planning; it should happen in the background. One-tap transfers from the main account, flexible plans for different goals, and an autosave system that runs daily, weekly, or monthly.",
              result:
                "Habits build passively, without constant decision-making",
            },
            {
              title: "Enabling seamless payments",
              desc: "Online transactions should feel fast, secure, and reliable. A virtual debit card, simplified card management, and clear transaction visibility.",
              result: "Confidence and speed on digital payments",
            },
            {
              title: "Personalising the experience",
              desc: "Different people face different financial pressures. Flexible flows that adapt to saving behaviour, simplified navigation for core tasks, and deliberate handling of edge cases like a missed autosave or a low balance.",
              result: "A more inclusive, adaptable banking experience",
            },
          ],
        },
        {
          kind: "figure",
          src: "/images/work/gopal-home-savings.png",
          caption:
            "Home and savings side by side: total saved, autosave, and goals with real progress against them.",
          impact:
            "The addition nobody requested. Putting named goals against visible progress is what turned saving from an abstract intention into something with a number attached.",
        },
        {
          kind: "prose",
          heading: "Where testing pushed back",
          body: [
            "The first savings flow asked people to set up a plan before they could save anything: name the goal, set the target, choose the frequency. Thorough, and it read as homework. Testers who said they wanted to save did not finish setting up the thing that would let them.",
            "The correction was Quick Save. One tap, no plan, no commitment, money moved. Plans stayed for people who wanted structure, but they stopped being the toll gate in front of the behaviour I was trying to encourage.",
            "The second correction was tone. An early version nudged harder, closer to a reminder that you had not saved this week. It tested badly in a way that was easy to miss: nobody said they disliked it, they just stopped opening that part of the app. Encouragement that reads as judgement gets avoided, not argued with.",
          ],
        },
        {
          kind: "figure",
          src: "/images/work/gopal-savings-flow.png",
          caption:
            "The savings screen after the rework: Quick Save first, plans below it, goals with visible progress.",
          impact:
            "Quick Save sitting above Add New Saving Plan is the whole lesson from testing. The low-commitment action comes first, and the structured one waits for people who want it.",
        },
        {
          kind: "figure",
          src: "/images/work/gopal-process-steps.png",
          caption:
            "The six stages the project ran through, from research to final usability testing.",
          impact:
            "Three iteration cycles fit inside stages four to six. That repetition is where Quick Save and the softer tone came from.",
        },
        {
          kind: "figure",
          src: "/images/work/gopal-cards.png",
          caption:
            "Virtual card: details hidden by default, revealed deliberately, with manage and block one tap away.",
          impact:
            "Hiding the numbers until asked was a small call that changed how safe the screen feels in public. Block Card sits at the top level because the moment you need it, you are already panicking.",
        },
        {
          kind: "list",
          heading: "What I took from it",
          intro: [
            "This project pushed me to think beyond features and design for behaviour:",
          ],
          items: [
            "Saving is behavioural, not functional. The interface is a habit-forming tool, not a form.",
            "People describe solutions when asked what they want. The job is hearing the problem underneath.",
            "Small UX decisions carry real financial consequence, so edge cases are not polish here.",
            "Iteration is not refinement. It is how you find out your good idea has a toll gate in front of it.",
          ],
        },
        {
          kind: "quote",
          heading: "Final thoughts",
          body: [
            "The feature nobody asked for became the reason the product exists.",
            "Staying close to what people said, while paying attention to what they actually did, is what separated a competent payments app from something that might change an outcome. Nobody hands you that distinction in a requirements document. You have to go and find it, then make the case for it.",
          ],
        },
      ],
    },
  },
  {
    slug: "cropgate",
    title: "CropGate",
    category: "Agritech",
    tag: "Web · Client Project",
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
    tag: "Web · Client Project",
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
