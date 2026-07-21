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
    "Most products don't fail because of bad ideas — they fail because things get complicated too early. I design ethical, user-centered products that stay simple from concept to launch.",
} as const;

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
      // Editable — reasonable defaults derived from the project.
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
            "What once felt simple starts to break down. Tasks get lost across tools, approvals take longer than expected, and teams struggle to stay aligned. Productivity drops — not because people are not working hard, but because the system itself is inefficient.",
            "This was the reality I uncovered while speaking with operations managers, team leads, and business owners.",
            "They were not just dealing with inefficiency. They were operating without visibility.",
          ],
        },
        { kind: "figure", caption: "Flowz — process overview" },
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
              desc: "Workflows needed to feel visual and easy to control. I designed a drag-and-drop experience that lets users map out processes step by step — defining tasks, deadlines, and dependencies in a clear way.",
              result: "Reduced workflow setup time by 45%",
            },
            {
              title: "Task Automation",
              desc: "Manual work was slowing teams down. Flowz introduced automation to handle repetitive actions like reminders, approvals, and updates — reducing the need for constant human intervention.",
              result: "Reduced manual effort by 60%",
            },
            {
              title: "Real-Time Collaboration",
              desc: "Teams were relying too much on external communication tools. By embedding comments, mentions, and notifications directly into tasks, collaboration became part of the workflow itself.",
              result: "Increased task completion rates by 30%",
            },
            {
              title: "Analytics Dashboard",
              desc: "Managers needed more than just data — they needed insight. I designed a dashboard that highlights performance, tracks progress, and surfaces bottlenecks in real time.",
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
            "One logistics company used Flowz to automate report generation and saved over 20 hours every week — letting their team focus on strategic growth instead of repetitive tasks.",
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
    category: "Companion App",
    tag: "Mobile · Personal Project",
    year: "2024",
    description:
      "A personal project exploring how a friendly companion app can make everyday planning feel lighter and more human.",
    image: "/images/work/gopal.webp",
    subtitle: "Companion app for everyday planning",
    tags: ["Mobile", "UI Design"],
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
    slug: "plantinerary",
    title: "Plantinerary",
    category: "Plant Care",
    tag: "Mobile · Case Study",
    year: "2023",
    description:
      "A plant-care planner that schedules watering, light, and feeding so first-time plant parents never lose a leaf.",
    image: "/images/work/plantinerary.jpg",
    subtitle: "Plant-care planner for first-time plant parents",
    tags: ["Mobile", "UX Research"],
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
    excerpt:
      "How I fold AI into my process to move faster without losing the craft and judgment that make design matter.",
  },
  {
    title: "UI/UX design guidance for Nigerian youth",
    date: "March 2022",
    href: "https://medium.com/",
    excerpt:
      "A practical starting point for young designers in Nigeria breaking into product design from scratch.",
  },
];
