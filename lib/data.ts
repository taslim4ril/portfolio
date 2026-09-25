// Central content for the portfolio. Edit here to update the whole site.

export const site = {
  name: "Taslim Abdulkadir",
  role: "Product & UI/UX Designer",
  location: "Lagos, Nigeria",
  available: true,
  email: "taslimabdulkadir01@gmail.com",
  whatsapp: "https://wa.me/2340000000000", // TODO: replace 0000000000 with your number
  /** This site's own source. Linked from the footer as a proof point, so it
   *  has to stay public. */
  repo: "https://github.com/taslim4ril/portfolio",
  headline: "Bridging the gap between technology and human interaction",
  subhead:
    "Product designer with 5+ years across SaaS, fintech, and agritech. I take complex problems to clear, human interfaces, and then I build them, because a running version settles arguments that a mockup only starts.",
  philosophy:
    "Most products don't fail because of bad ideas. They fail because things get complicated too early. I design ethical, user-centered products that stay simple from concept to launch.",
} as const;

/** Cycled through by the hero headline. Rendered uppercase by the h1; the
    last word lands on the gradient line, everything before it on the line
    above, so each entry needs at least two words. */
export const roles = [
  "product designer",
  "UX/UI designer",
  "design engineer",
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

/** Order matters twice over: the hero rail shows the first three, and What I
    Do numbers all four in sequence. Design Engineering sits third so it lands
    on the hero and on card /03. */
export const services = [
  {
    title: "Product Design",
    description:
      "End-to-end design from research and flows to polished, shippable interfaces.",
  },
  {
    title: "Design Systems",
    description:
      "Reusable components and tokens that keep teams shipping fast and consistent.",
  },
  {
    title: "Design Engineering",
    description:
      "I ship what I design. React and Tailwind, running on real data.",
  },
  {
    title: "UI Design",
    description:
      "Interfaces and design systems that feel effortless, accessible, and on-brand.",
  },
];

// ===== Case study content model =====
// A case study is an ordered list of blocks so every project follows the same
// structure. Add a `caseStudy` to a project and its /work/[slug] page fills in.
export type CaseMetric = {
  value: string;
  label: string;
  /** What the figure is measured against. Without it a multiple is a mood. */
  baseline?: string;
};
export type CaseNamed = {
  title: string;
  desc: string;
  /** Optional mark for the item, shown in a fixed circular frame so a set of
   *  logos with different shapes and padding still line up. */
  logo?: string;
};

/** A design call, with the reasoning kept attached to it. The closing note is
 *  labelled per item because what follows a decision is sometimes the cost of
 *  it and sometimes the reason for it, and those should not read the same. */
export type CaseDecision = {
  title: string;
  problem: string;
  decision: string;
  note?: { label: string; body: string };
};

export type CaseRating = { rating: "yes" | "partly" | "no"; note?: string };

type CaseBlockContent =
  | {
      kind: "prose";
      heading?: string;
      body: string[];
      /** Sends the reader somewhere that carries the argument further, e.g.
       *  a system artifact too large to sit inside the case study. */
      link?: { label: string; href: string };
    }
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
  | {
      kind: "impact";
      heading?: string;
      intro?: string[];
      /** Where the numbers came from. One of four, and never omitted: an
       *  untagged figure reads as invented, a tagged one reads as work.
       *  "Measured live" | "Client reported" | "Prototype testing (n=X)"
       *  | "Projected" */
      source: string;
      metrics: CaseMetric[];
      /** Optional third line under a metric, for the baseline it is measured
       *  against. A multiple means nothing without the thing it multiplies. */
      body?: string[];
    }
  | { kind: "quote"; heading?: string; body: string[] }
  /** A real table, for comparisons a diagram would only decorate. A cell is
   *  plain text or a rating, which renders as a labelled dot so the grid can
   *  be scanned down a column before any sentence is read. */
  | {
      kind: "table";
      heading?: string;
      intro?: string[];
      columns: string[];
      rows: {
        cells: (string | CaseRating)[];
        /** Mark shown beside the first cell, same frame as the grid logos. */
        logo?: string;
        /** Tints the row. Used for the thing being compared against the rest. */
        highlight?: boolean;
      }[];
      /** Numbered separately from figures: "Table 1." */
      table?: number;
      caption?: string;
      outro?: string[];
    }
  | {
      kind: "figure";
      src?: string;
      /** Short label for what the screen is. */
      caption?: string;
      /** What this screen changes about the product, in a line or two. */
      impact?: string;
      /** Numbered so the body copy can point at a specific figure. Numbering
       *  runs across screenshots and diagrams together, in page order. */
      figure?: number;
      /** Portrait version of a diagram, served below the lg breakpoint. A
       *  wide drawing scaled to a phone shrinks its text past reading. */
      mobileSrc?: string;
      /** Drop the framed card. Diagrams are drawn on the page surface with
       *  their own padding, so the frame would double up. */
      plain?: boolean;
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

/** Any block can carry an `anchor`, which renders as the element's id. One
 *  block per case study is anchored `final-design`, which is what the skip
 *  link under the cover image jumps to. Intersected rather than repeated on
 *  each member: `kind` still narrows, and a new block kind gets it for free. */
export type CaseBlock = CaseBlockContent & {
  anchor?: string;
  /** Numbered section label above the heading, e.g. "04 · RESEARCH". */
  kicker?: string;
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
  /** Short label above the title on the work card. Two or three words. */
  subtitle: string;
  /** The proof line under the title on the work card. Wrap the part that
   *  should carry the accent colour in [square brackets], including whatever
   *  unit belongs to it: [7-tool], [3 core journeys], [20 hours]. Marking it
   *  here rather than pattern matching in the component is what lets a span
   *  be a bare percentage in one metric and three words in the next.
   *
   *  Flowz carries the numbers from its own impact section. The others are
   *  claimed at the client's direction rather than sourced from anything in
   *  the case study, so if a reader asks where they came from, there needs
   *  to be an answer ready. A project with no case study gets no metric. */
  metric?: string;
  /** Pills shown at the top-left of the work card. */
  tags: string[];
  accent?: boolean;
  /** Full case study. When present, /work/[slug] renders the story. */
  caseStudy?: CaseStudy;
};

export const projects: Project[] = [
  {
    slug: "flowz",
    title: "Flowz",
    category: "Process Automation",
    tag: "SaaS · Client Project",
    year: "2024",
    description:
      "A process-automation platform that turns repetitive, multi-step workflows into simple guided journeys anyone on the team can run.",
    image: "/images/work/flowz.webp",
    subtitle: "Process automation platform",
    metric:
      "[Client reported after rollout:] [60%] less time per task and [20 hours] a week back for one logistics team",
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
        { label: "Project type", value: "Client engagement" },
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
          /* Straight-on rather than the angled shot the card uses: at this
             size the dashboard has to be readable, not just recognisable. */
          src: "/images/work/flowz-mockup.webp",
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
          kind: "prose",
          anchor: "final-design",
          heading: "The product, screen by screen",
          body: [
            "Four bullet points is a tidy way to summarise a platform and a useless way to understand one. So here is the actual thing, in roughly the order a new operations lead meets it.",
            "Watch what each screen refuses to make you leave it for. That restraint is the whole design.",
          ],
        },
        {
          kind: "figure",
          src: "/images/work/flowz-builder.webp",
          caption:
            "The builder: one Start node on an open canvas, with the step picker showing what a process is made of. Send Request, Receive Message and Publish Message up top, Decisions and Evaluate under Logic.",
          impact:
            "Every item in that list is a technical primitive wearing an ordinary name. Send Request is an HTTP call. Evaluate runs Python or TypeScript against your data. Naming them for what they accomplish rather than what they are is most of the reason a team lead opens this screen a second time. Note what sits in the top right too: Save, Invite, Deploy. A process is something you ship, and you are never building it alone.",
        },
        {
          kind: "figure",
          src: "/images/work/flowz-task-setup.webp",
          caption:
            "Setting up a step. Name, description, who it goes to, and the form it carries. Typing a single letter filters the form list down to Leave Request, HR Survey, New Hire, Finance Survey.",
          impact:
            "The field worth pausing on is Delegate, sitting directly under Assignee. Someone thought about the Tuesday the assignee is on leave, which is exactly the case that breaks a paper process and the reason work quietly reverts to email. Attaching an existing form rather than authoring a new one is the same instinct: most steps are not new, they are a thing your company already does, written down.",
        },
        {
          kind: "prose",
          heading: "Who signs it off, and who gets to look",
          body: [
            "Permissions are the least glamorous screen in any operations tool and the first thing that stops adoption dead. If getting a colleague access means filing a ticket with IT, the process leaves the platform and reappears in a group chat.",
          ],
        },
        {
          kind: "figure",
          src: "/images/work/flowz-collaborators.webp",
          caption:
            "Creating a new flow: approvers named at the top, a category, a save as template toggle, and collaborators invited by email with a permission level attached.",
          impact:
            "Approval and access get decided while the process is being built, not requested afterwards. The permission dropdown next to the invite field is small and does a lot of work: inviting someone and deciding what they can do with it is one action, so nobody ends up over-permissioned because narrowing it later was too much effort. Save process as template is how the second department starts in a minute instead of a morning.",
        },
        {
          kind: "prose",
          heading: "The screen nobody asks for until the first failure",
          body: [
            "Status tracking was in the brief. Watching an automated run fail was not. Automation gets sold on the days it works, and every demo shows a process completing.",
            "But an automated process that fails silently is worse than a manual one, because at least a manual one has a person waiting on it who will eventually ask. The first time a run dies at 2am, the only questions anyone has are which run, whose, and how far did it get.",
          ],
        },
        {
          kind: "figure",
          src: "/images/work/flowz-monitor.webp",
          caption:
            "Monitor: one run of one process, marked Failed, showing the path it actually took and the 23 activities underneath it on a timeline.",
          impact:
            "The Failed badge sits above the things you need the moment you see it. A copyable instance ID, start and end time, duration, and the name of whoever kicked it off. The activity list shows which steps passed before it stopped, so you land on the broken one instead of reading the whole process again. This screen answers all three questions without a support ticket, and it is the one operations teams ended up living in.",
        },
        {
          kind: "prose",
          heading: "Numbers that point at something",
          body: [
            "This was the addition I argued hardest for, which made it the one I could least afford to get wrong. The default failure mode of a dashboard is a wall of numbers that leaves a manager feeling informed without telling them to do anything.",
            "So I held it to a single test. Can you look at this for ten seconds and know what needs your attention today?",
          ],
        },
        {
          kind: "figure",
          src: "/images/work/flowz-dashboard.webp",
          caption:
            "Dashboard: running, completed, running with errors, average completion time, published, awaiting approval. The approvals queue sits to the right of the tiles.",
          impact:
            "Running Processes with Errors is a tile, at the same size and weight as the numbers that flatter you. Most dashboards put failure three clicks in. And the approvals queue turns the page from a report into a to do list, because the most common reason a workflow stalls is not a bug, it is a person who has not clicked yes yet.",
        },
        {
          kind: "figure",
          src: "/images/work/flowz-analytics.webp",
          caption:
            "Execution over the year, with a red failure line drawn across the same axis as the volume bars, plus a live activity feed and the total process inventory.",
          impact:
            "The legend names real automations rather than abstract categories, so the chart reads as your own work rather than someone else's telemetry. Putting failures on the same axis as volume is the part that makes it diagnostic instead of decorative: a spike in March means nothing on its own, but a spike with the red line climbing under it is a process that broke as soon as it got busy.",
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
          intro: [
            "These came from the teams using it after rollout, not from my own measurement. I am reporting what they told me.",
          ],
          source: "Client reported, after rollout",
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
    slug: "caldeck",
    title: "CalDeck AI",
    category: "Calendar AI",
    tag: "Mobile · Self-directed",
    year: "2026",
    description:
      "A full calendar app with an AI assistant built into it. The case study follows the assistant through one job, moving a meeting, and every place that job breaks.",
    image: "/images/work/caldeck.webp",
    subtitle: "Calendar AI assistant",
    metric:
      "[Self-directed concept.] [6 apps] reviewed, one meeting move designed start to finish, and the [4 ways it breaks]",
    tags: ["Product Design", "AI"],
    caseStudy: {
      title: "CalDeck AI",
      tagline:
        "An assistant that reads everything and decides nothing. It suggests. You send.",
      overview:
        "A full calendar app with an AI assistant built in. The assistant does the slow part of scheduling: checking calendars, spotting clashes, ranking times and writing the message. Then it stops so you make the call.",
      meta: [
        { label: "Role", value: "Sole Product Designer" },
        { label: "Project type", value: "Self-directed concept" },
        { label: "Scope", value: "Full calendar app, AI layer in depth" },
        { label: "Tools", value: "Claude Design, ChatGPT, Claude" },
      ],
      blocks: [
        {
          kind: "prose",
          kicker: "01 · Overview",
          heading: "What CalDeck AI is",
          body: [
            "CalDeck AI is a calendar app for people whose week is mostly meetings. It does everything you would expect a calendar to do: day, week and month views, events, invites, reminders, search, and sync across accounts.",
            "What sets it apart is the AI assistant built into it. You tell it what you need in your own words: “Move my 11 o'clock to this afternoon”, “Find an hour this week when all four of us are free”, or “Keep my mornings clear for deep work”. It then does the slow part: checking everyone's calendar, spotting clashes, ranking the times that work and writing the message. Then it stops, and you make the call.",
            "This study follows the assistant through its hardest job, moving a meeting that involves other people, and through the four ways that job goes wrong: the meeting starts in twelve minutes, someone says no, someone is at another company, or the whole weekly series has to move.",
            "It is a personal project. I designed it alone, with no client, and checked the core flows with 8 people in a lightweight prototype evaluation before calling it done.",
          ],
        },
        {
          kind: "figure",
          src: "/images/diagrams/caldeck-scope.svg",
          mobileSrc: "/images/diagrams/caldeck-scope-mobile.svg",
          figure: 1,
          plain: true,
          caption: "The whole product, and the slice this study argues about.",
        },
        {
          kind: "prose",
          kicker: "02 · Identifying the problem",
          heading: "A twenty-minute job that should take twenty seconds",
          body: [
            "Moving one meeting is not hard. It is just slow. You open the calendar, work out who else is in the room, pick a time, find it clashes with something of your own, pick again, then write a note explaining yourself. Twenty minutes later the meeting has moved and you have lost your morning.",
            "Every big app has tried to fix this. The assistants understand what you ask for, the calendars can see everyone's free time, and it still takes twenty minutes. That question is why I spent the first week using other apps instead of drawing screens.",
          ],
        },
        {
          kind: "list",
          kicker: "03 · Defining the problem",
          heading: "One question, five rules",
          intro: [
            "The whole design comes back to one question, which I kept written at the top of the file: how can the assistant take the hard part of rescheduling off someone without taking away control of a change that reaches four other people?",
            "Both halves matter. An assistant that acts alone demos beautifully and loses you the first time it moves the wrong meeting. One that asks permission for everything is safe and quietly useless. Five rules kept me in the space between.",
          ],
          items: [
            "The calendar is the product. The assistant is a layer on top of it, and never becomes a place you have to get out of.",
            "The assistant can read anything but decide nothing. It ranks, drafts and chases replies. It cannot send.",
            "Every suggestion shows its reason, on the same line as the suggestion.",
            "Every path ends at the same review screen, including the ones that go wrong.",
            "Missing information is a real screen, not an error. If the app cannot see a calendar, it says so instead of guessing.",
          ],
        },
        {
          kind: "list",
          kicker: "03 · Defining the problem",
          heading: "The stories I designed against",
          intro: [
            "These came from the app reviews and from my own assumptions about how busy people use a calendar, which I expanded and pushed against with ChatGPT and Claude. Each is small enough to build and specific enough to fail.",
          ],
          items: [
            "As the organiser, I want to move one meeting without opening four calendars, so I can do it between other meetings rather than after them.",
            "As the organiser, I want to see why a time was suggested, so I can overrule it without second-guessing myself.",
            "As the organiser, I want to know what a change costs other people before I send it, not after.",
            "As the maker, I want my deep-work hours treated as real commitments, so I decide once instead of defending them every week.",
            "As anyone, I want to know when the app cannot see something, so I can tell a confident answer from a guess.",
          ],
        },
        {
          kind: "prose",
          kicker: "04 · Research",
          heading: "Using AI to attack my own thinking",
          body: [
            "I used ChatGPT and Claude the way you would use a sharp colleague with no stake in the outcome: to widen the problem, find cases I had missed, and argue against calls I had already made. Most of the value was in what I threw away.",
            "The pattern in the rejects became the rule the product runs on. Almost everything I dropped was too autonomous: auto-accept the best slot, auto-decline the clash, quietly notify everyone. Each was defensible alone, and each moved a decision away from the person who would have to apologise for it. Where checking is cheap, the assistant can act and show its work. Where an action reaches other people, the value is in the preparation, not the execution.",
          ],
        },
        {
          kind: "table",
          kicker: "05 · Research",
          heading: "Competitive analysis",
          intro: [
            "I used each of these for the same job: move a weekly meeting with four people, one at another company. For each I wrote down the exact moment it handed the work back to me.",
          ],
          columns: [
            "App",
            "Understands what you type",
            "Sees everyone's free time",
            "Explains its pick",
            "Admits what it cannot see",
            "Where it handed the work back",
          ],
          rows: [
            {
              logo: "/images/logos/chatgpt.webp",
              cells: [
                "ChatGPT",
                { rating: "yes" },
                { rating: "no" },
                { rating: "partly", note: "In text" },
                { rating: "no" },
                "Its answer is text. It can say a slot is free but cannot show you the gap.",
              ],
            },
            {
              logo: "/images/logos/gemini.webp",
              cells: [
                "Google Gemini",
                { rating: "yes" },
                { rating: "partly", note: "Your calendar" },
                { rating: "no" },
                { rating: "no" },
                "Books a time without saying why. Fixing it means starting again in the calendar.",
              ],
            },
            {
              logo: "/images/logos/apple-calendar.webp",
              cells: [
                "Apple Calendar",
                { rating: "no" },
                { rating: "partly", note: "Your calendar" },
                { rating: "no" },
                { rating: "no" },
                "Beautiful craft, which I borrowed. It shows a clash and leaves you to solve it.",
              ],
            },
            {
              logo: "/images/logos/microsoft-teams.webp",
              cells: [
                "Microsoft Teams",
                { rating: "partly", note: "Needs Copilot" },
                { rating: "yes" },
                { rating: "yes" },
                { rating: "no" },
                "The reasons are there, but in a grid you scroll on a phone rather than read.",
              ],
            },
            {
              logo: "/images/logos/google-calendar.webp",
              cells: [
                "Google Calendar",
                { rating: "no" },
                { rating: "partly", note: "Inside one company" },
                { rating: "no" },
                { rating: "no" },
                "A time based on a guess looks exactly like one based on full information.",
              ],
            },
            {
              logo: "/images/logos/calendly.webp",
              cells: [
                "Calendly",
                { rating: "no" },
                { rating: "partly", note: "Your free time" },
                { rating: "no" },
                { rating: "no" },
                "Great for a new meeting. No help moving one four people already accepted.",
              ],
            },
            {
              highlight: true,
              cells: [
                "CalDeck AI, the aim",
                { rating: "yes" },
                { rating: "partly", note: "Says so when it cannot" },
                { rating: "yes" },
                { rating: "yes" },
                "It does not. It stops at the review screen, and sending is yours.",
              ],
            },
          ],
          table: 1,
          caption: "My own reading after using each app for the same job. CalDeck AI's row is what it was designed to do, not a test result.",
          outro: [
            "The split is clean. The assistants understand what you say but cannot see your day. The calendars see your day but cannot understand what you say. Nothing does both at the moment you decide, which is why the job still ends with a person doing the maths.",
            "Two columns mattered more than the rest. Almost nothing explains itself while you are choosing, and not one of the six admits when it cannot see someone's calendar. You get a blank column, or a confident answer built on nothing. Both became things CalDeck AI had to do.",
            "The caveat: this tells you what exists, not what people need. That gap is what the prototype evaluation at the end of this study was for.",
          ],
        },
        {
          kind: "prose",
          kicker: "06 · Strategy",
          heading: "The user journey",
          body: [
            "Before drawing screens I mapped what has to happen: read the request, work out which meeting, check four calendars against the focus hours, rank what is left, show the cost of the choice, and stop for a decision. Treating it as one journey rather than a set of screens is what exposed the branches early, before anything was styled.",
          ],
        },
        {
          kind: "figure",
          src: "/images/diagrams/caldeck-journey.svg",
          mobileSrc: "/images/diagrams/caldeck-journey-mobile.svg",
          figure: 2,
          plain: true,
          caption: "Six stages, three lanes. Stage 5 is the one that cannot be skipped.",
        },
        {
          kind: "prose",
          kicker: "07 · Strategy",
          heading: "How the screens hold together",
          body: [
            "A calendar with an assistant bolted on fails if the two are designed as separate products that share a logo. The rule is that the calendar is home and everything returns to it. Two doors lead in, both paths meet at the same options and the same review, and whatever happens you land back on the day you started from.",
            "Focus Time is the one screen that is read rather than visited. The meeting flow consults it as a rule and never sends you there mid-errand, which is what keeps a settings screen from interrupting a job.",
            "Inside each screen the same three questions get answered in the same order: what am I looking at, what has the assistant done, and what do I have to decide. The work carries the most weight, the assistant sits underneath it, and the decision is the clearest thing on screen even though it uses the fewest words.",
          ],
        },
        {
          kind: "figure",
          src: "/images/diagrams/caldeck-screenflow.svg",
          mobileSrc: "/images/diagrams/caldeck-screenflow-mobile.svg",
          figure: 3,
          plain: true,
          caption:
            "Two ways in, one path through, one way back, and one screen that is only ever read.",
        },
        {
          kind: "prose",
          kicker: "08 · Strategy",
          heading: "Two ways in",
          body: [
            "A floating button on the calendar opens a sheet: one job, about the day you are already looking at, calendar still visible behind it. A switch at the top opens Assistant as a full screen. That is a place you go, for bigger questions across calendar, email and tasks. Building one thing and calling it both was tempting, but a quick job should never cost you your view of the day, and a long conversation should not be squeezed into a sheet.",
            "Both doors also accept a typed sentence, which is the one thing ChatGPT does better than any calendar. The reply says out loud how it read you (afternoon means after 1 PM, has to be there means required) and makes each reading tappable, so a wrong guess gets fixed on the spot.",
          ],
        },
        {
          kind: "figure",
          src: "/images/work/caldeck-two-doors.webp",
          figure: 4,
          caption:
            "The two ways in. Assistant as a full screen on the left, your day on the right with the assistant one tap away.",
          impact:
            "An empty chat box is the fastest way to lose a busy person, so the assistant opens on a read of the day and the two threads you left unfinished. On the right, Focus Time uses the same stripes the calendar already uses for unconfirmed time, and Product Sync at 11:00 sits right against that block, so the clash is on screen before you ask anything.",
        },
        {
          kind: "decisions",
          kicker: "09 · Strategy",
          heading: "Four big decisions",
          intro: [
            "Each had a cheaper option I can still argue for. Writing the argument against my own choice is the only way I know to tell a real decision from a habit.",
          ],
          items: [
            {
              title: "A chat, not a step-by-step form",
              problem:
                "Moving a meeting has fixed steps in a fixed order. That is the textbook case for a form, which would have been quicker to build.",
              decision:
                "A conversation over the calendar instead. Each choice becomes a message, each answer a card, nothing gets replaced. You end up with a record of every decision the assistant made for you, and the calendar stays behind the sheet so swiping down to quit costs nothing.",
              note: {
                label: "The cost",
                body: "A conversation scrolls. Someone doing this for the fortieth time wants three taps, not the history.",
              },
            },
            {
              title: "One best option, never two",
              problem:
                "The ranking is a judgement made without full information. Badging one slot claims more confidence than the data supports.",
              decision:
                "One badge, and every slot shows why it was picked. Two competing recommendations are not a recommendation. They hand the comparison back to the person who asked you to do it. The reason is what makes the badge arguable rather than obeyed.",
              note: {
                label: "The cost",
                body: "When the badge is wrong it is wrong loudly, and it teaches people to trust it without checking.",
              },
            },
            {
              title: "The assistant stops before sending",
              problem:
                "The demo everyone wants is you say move my sync and it is done. Every step between is friction a competitor will remove.",
              decision:
                "Nothing goes out without you pressing send. Every path ends at a review screen with the old time crossed out next to the new one and a message you can edit. Undo stays live while replies are outstanding.",
              note: {
                label: "Why",
                body: "A bad suggestion costs one tap. A bad send costs four apologies.",
              },
            },
            {
              title: "Draw what you cannot see",
              problem:
                "None of the six apps do this, which usually means it is not worth doing. It also means admitting the app is blind at the moment you want an answer.",
              decision:
                "The person at another company gets a striped column reading no access, in the language the calendar already uses for unconfirmed time. The recommendation becomes a poll instead of a booking, with times held tentative so your own calendar does not fill up while you wait.",
              note: {
                label: "The cost",
                body: "A confident wrong answer demos better than an honest I do not know. I think it loses the user the second time it happens.",
              },
            },
          ],
        },
        {
          kind: "prose",
          anchor: "final-design",
          kicker: "10 · Design",
          heading: "Moving a meeting",
          body: [
            "It opens by asking which meeting should move, and is honest about its limits straight away: you run two of today's three, so the third can only be a request written to the other company. Then three ranked times, each with its reason. Ignore the ranking and it does not just warn you. It draws the clash on a strip of the real afternoon, names who would be double-booked, and offers to move her meeting too.",
            "Pick your own time instead and the free-time bar stays live underneath it, striped column included. If the slot lands inside your focus hours it says what that costs, thirty minutes off Monday's deep work, then lets you do it anyway. The repeat question does the same, stating that it moves 11 future events and 3 have clashes before you choose rather than after.",
          ],
        },
        {
          kind: "figure",
          src: "/images/work/caldeck-start-pick.webp",
          figure: 5,
          caption: "Where the job starts, and which meeting moves.",
          impact:
            "The assistant opens on a read of the day instead of an empty box, with Reschedule Meeting already flagged as one conflict today. The next screen offers only the meetings that are easiest to move, and is honest that the Vendor call belongs to Northwind, so it can only draft the ask.",
        },
        {
          kind: "figure",
          src: "/images/work/caldeck-rank-clash.webp",
          figure: 6,
          caption: "The three times that work, and what happens when you ignore the ranking.",
          impact:
            "All 4 free and nearest to the usual weekly slot are the reasons Teams buries in a grid. Here they sit on the same line as the time, so they survive a phone. The second screen is what none of the six apps do: it draws the clash on the real afternoon and turns the fix into one more button.",
        },
        {
          kind: "prose",
          kicker: "11 · Design",
          heading: "Where the AI stops",
          body: [
            "Every path ends in the same place, including the ones that go wrong: a review screen showing the old time crossed out next to the new one, who is free, and a message written for you that you can edit.",
            "This one screen is the whole argument. The assistant has read four calendars, ranked three times, caught a double booking, checked a focus window and written the explanation. It still has not done the one thing you cannot take back. Undo stays available while replies are outstanding, because the moment you learn a change was wrong is usually the moment someone answers.",
          ],
        },
        {
          kind: "figure",
          src: "/images/work/caldeck-review-send.webp",
          figure: 7,
          caption:
            "Check it before anything moves, then the sent screen with Undo still available and one reply outstanding.",
          impact:
            "The old time is crossed out rather than deleted, so the change is legible as a change. The confirmation does not pretend the job is done: one person is outside the company and has not replied.",
        },
        {
          kind: "quote",
          heading: "The rule",
          body: [
            "It reads everything and decides nothing.",
            "An assistant that can send is a colleague you did not hire and cannot correct. One that stops at the review screen is a very fast first draft. It is more useful, even though it demos worse.",
          ],
        },
        {
          kind: "prose",
          kicker: "12 · Design",
          heading: "When things go wrong",
          body: [
            "This is the part the research pointed at, and the part I most wanted to design. Moving a meeting is easy while everyone is free and it is next week. It is worth building for the few times a year when it is neither.",
            "Each of the four below changes the shape of the screen, not just the wording. All four still end at the same review step.",
          ],
        },
        {
          kind: "table",
          columns: ["What goes wrong", "How the screen changes", "What the assistant does"],
          rows: [
            {
              cells: [
                "It starts in 12 minutes",
                "Three blunt options replace the list, and the default drops to a short delay. Nobody is looking at their calendar, they are looking at the door.",
                "Escalates to push and chat, and says the cost out loud: three people are already walking to a room.",
              ],
            },
            {
              cells: [
                "Someone says no",
                "Nothing changes unless that person was required.",
                "Only interrupts you when the no actually matters. Otherwise it updates the count.",
              ],
            },
            {
              cells: [
                "Someone is at another company",
                "Their column is striped and labelled no access, the same look the calendar uses for unconfirmed time.",
                "Offers a poll instead of a booking, and holds the times as tentative so your calendar does not fill up while you wait.",
              ],
            },
            {
              cells: [
                "The whole series moves",
                "Every affected week gets its own row.",
                "Says it moves 11 future events and 3 have clashes before you choose. An untouched week keeps its old time rather than being double-booked.",
              ],
            },
          ],
          table: 2,
          caption: "The four cases the normal path never reaches.",
        },
        {
          kind: "prose",
          kicker: "13 · Design",
          heading: "Focus Time",
          body: [
            "The second job exists because of the first. The meeting flow keeps warning about focus hours, and a warning only means something if the thing it points at is real. So the switch is a rule the scheduling logic enforces, not a hint the assistant interprets. Off means the event is never offered as movable.",
            "An empty settings screen that asks you to describe your own working pattern puts the work on the person least able to describe it. So it arrives with a suggestion already made from what the app has seen, worded as something you accept in one tap. Once set, the screen doubles as a quiet report on whether it is working: hours held this week, invites turned away, and stripes over the time you have already given up.",
          ],
        },
        {
          kind: "figure",
          src: "/images/work/caldeck-focus.webp",
          figure: 8,
          caption:
            "Empty, set up, and editing one day. Your hours read as a week, because that is the shape they have.",
          impact:
            "Five expandable time rows would have been the obvious build. A five-column week is read in a second, and it lets the stripes carry a second meaning: this is what you have already given away.",
        },
        {
          kind: "prose",
          kicker: "14 · Testing",
          heading: "What I measured",
          body: [
            "I ran a lightweight prototype evaluation with 8 participants focused on the core workflows: AI-assisted tasks, staying within the workspace, and calendar/focus-time setup. The results helped validate whether the main interaction patterns were understandable before development.",
          ],
        },
        {
          kind: "table",
          columns: ["What I measured", "Result", "What it told me"],
          rows: [
            {
              cells: [
                "Top AI suggestion accepted",
                "5/8 · 62.5%",
                "Most participants found the first suggestion useful enough to accept with little or no editing.",
              ],
            },
            {
              cells: [
                "Completed task without leaving the workspace",
                "6/8 · 75%",
                "The workspace successfully kept participants inside the product for the core tasks tested.",
              ],
            },
            {
              cells: [
                "AI-generated sends undone within 1 hour",
                "0/8 · 0%",
                "No participant immediately reversed an AI-assisted send during the test, suggesting the review step provided enough confidence.",
              ],
            },
            {
              cells: [
                "Focus Time setup completed",
                "4/8 · 50%",
                "Half of participants completed the setup without help. The remaining participants needed clarification around the scheduling logic.",
              ],
            },
            {
              cells: [
                "Tasks completed with AI assistance",
                "3/8 · 37.5%",
                "AI assistance was useful for specific tasks, but participants still preferred manual control for higher-impact actions.",
              ],
            },
            {
              cells: [
                "Average task completion time",
                "2m 41s → 1m 58s",
                "The revised flow reduced completion time by approximately 27% compared with the initial flow.",
              ],
            },
          ],
          table: 3,
          caption: "Prototype testing (n=8). With eight people, read these as signals rather than rates.",
        },
        {
          kind: "list",
          kicker: "15 · Reflection",
          heading: "What I learned",
          items: [
            "The interesting part of an AI feature is not what it can do. It is where you make it stop.",
            "Six apps can all be good and still leave the same gap, because each solved the half of the problem its own platform handed it.",
            "Things that go wrong are not small variations on the normal path. Inside fifteen minutes the flow changes shape, and designing that shape is the real work.",
            "What you cannot see is worth drawing. Hiding missing information behind a confident answer is how assistants lose people for good.",
          ],
        },
        {
          kind: "quote",
          heading: "Last thought",
          body: [
            "You judge an assistant by what it refuses to do for you.",
            "Five of eight took the top suggestion. High enough that the ranking earns its badge, low enough that people were still reading before they accepted. That ratio is the whole product's report card.",
          ],
        },
      ],
    },
  },
  {
    slug: "plantinerary",
    title: "Plantinerary",
    category: "Travel Planning",
    tag: "Mobile · Self-directed",
    year: "2023",
    description:
      "A travel planner that turns scattered saves into a real day-by-day schedule, with AI suggestions that narrow the field instead of widening it.",
    image: "/images/work/plantinerary.webp",
    subtitle: "Travel planner",
    metric:
      "[Self-directed concept.] Time to a finished day-by-day plan cut [45%] in prototype testing, against the participant's own multi-tool process",
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
        { label: "Tools", value: "Figma, ChatGPT, Claude" },
        { label: "Project type", value: "Self-directed concept" },
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
          /* A different shot of the same screen than the card thumbnail uses,
             so the case study doesn't open by repeating the image the reader
             just clicked. */
          src: "/images/work/plantinerary-home.webp",
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
          kind: "prose",
          heading: "What I had instead of a research budget",
          body: [
            "I should be straight about the constraint, because it shaped the work. There was no participant panel, no recruitment, no incentive budget, and four weeks. This problem deserves a diary study. Trip planning happens over weeks, in gaps, across a phone and a laptop and a group chat, and the only honest way to see it is to watch it happen over time. I could not do that.",
            "So I did the two things that were available. I mined what travellers had already written down without being asked: app store reviews, Reddit and forum threads, the comments under itinerary blog posts. Unprompted complaints are not a substitute for interviews, but they have one quality interviews often lack, which is that nobody was being polite.",
            "And I ran a structured teardown of the products people already use. Competitive analysis has a bad reputation because it usually means a slide of logos and a feature checklist. Treated as a method, with a specific question you are trying to answer, it earns its place. My question was narrow: at what exact moment does each of these products hand the work back to the user?",
          ],
        },
        {
          kind: "grid",
          heading: "Three products, three different places it breaks",
          columns: 3,
          items: [
            {
              title: "Airbnb",
              logo: "/images/logos/airbnb.webp",
              desc: "The best executed save in the category. Wishlists are quick, beautiful, shareable, and still a list you never convert. If the strongest version of saving still leaves you with an unplanned trip, saving was never the bottleneck. It also set the bar for the explore screen: photography leads, chrome gets out of the way.",
            },
            {
              title: "Wanderlog",
              logo: "/images/logos/wanderlog.webp",
              desc: "The one product that genuinely does sequencing. Day by day plans, a map beside them, reservations pulled in from your inbox. It is also unmistakably a tool, and it asks you to arrive already decided. The value is real but it sits behind a setup cost, which is fine for the person who plans spreadsheets for fun and fatal for everyone else.",
            },
            {
              title: "TripAdvisor",
              logo: "/images/logos/tripadvisor.webp",
              desc: "The opposite failure. Enormous data, rankings, and reviews, with all the synthesis left to you. More information raises your confidence in a single choice and lowers it about the trip as a whole, because nothing on the screen knows what else you already picked.",
            },
          ],
          outro: [
            "Lined up like that, the gap stopped being the one I assumed. It is not that nobody plans days. Wanderlog plans days extremely well. It is that the products which help you decide never hand you a day, and the product that gives you a day expects you to show up already decided.",
            "Nobody owns the handoff. That is a smaller, less impressive sounding opportunity than inventing a new way to plan a trip, and it is the one that was actually open.",
            "The caveat I kept in front of me: competitive analysis tells you what exists, not what people need. It is very good at showing you the shape of a gap and very bad at telling you whether anyone wants it filled. Everything it produced went into the pile marked hypothesis, next to the AI output.",
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
          heading: "Who, why, how, and a biro",
          body: [
            "Underneath all of that, the research was really three questions asked over and over, of every pattern I found and every feature anyone proposed. They are not sophisticated questions. They are just uncomfortable to answer honestly.",
            "Who. Not a persona with a stock photo and an age range, but a specific person in a specific bind. The solo traveller with a flight time they cannot move. The group of four with three different appetites and one weekend between them. Every time the answer came back as travellers, it meant I had not looked closely enough yet.",
            "Why. Why would this person open Plantinerary instead of the browser tabs that are already working well enough? Well enough is the real competitor in this category, and it is a far tougher one than Airbnb, because it costs nothing and nobody has to be convinced to keep it.",
            "How. Not how the feature would work, but how the thing actually gets done on a Tuesday, on a phone, with somebody talking at you. Most of the failures I found in other products were features that answered why beautifully and were never asked how.",
            "And then paper. Every screen in this case study started as biro in a lined notebook, and stayed there longer than was comfortable, because paper is the cheapest possible place to be wrong.",
          ],
        },
        {
          kind: "figure",
          src: "/images/work/plantinerary-sketch.webp",
          caption:
            "A page of the ideation: the list screen at the top, an on click arrow across to Details page, and the details page worked out underneath.",
          impact:
            "What makes sketching useful is everything a drawing refuses to answer. There is no type scale here, no colour, no spacing, so the only things left to argue about are what the screen is for and the order in which it says it. Notice that the flow is annotated before the layout is: on click, then details page, then a note at the foot that the call to action has to be prominent. That note outlived every iteration. The hero image, the column of thumbnails, the row of stars, the one filled button at the bottom. The explore screens that shipped are this drawing with better photography, which is the point of doing it in ink first. If the idea does not hold up as a bad drawing, it is not going to be rescued by a good render.",
        },
        {
          kind: "prose",
          heading: "The brief I set myself, and the argument with it",
          body: [
            "The brief I started with was the one this category always produces: better discovery, richer recommendations, more inspiration. That is what travel products sell, and it is what users say they want when you ask them directly.",
            "It is also the opposite of what the research pointed at. Every product in this space is already excellent at showing you more. Building another one would have been answering a question nobody was stuck on.",
            "Making that case meant arguing against the most fundable version of the product. Discovery features demo well and their value is easy to describe in a meeting. Sequencing is invisible until you watch someone fail at it.",
          ],
        },
        {
          kind: "decisions",
          heading: "Where I got pushed back on it",
          intro: [
            "No client to overrule me on this one, so the pushback came from the people I put it in front of: testers, and two designers I trust to be blunt. Three objections came back hard. One of them I lost, and it improved the product.",
          ],
          items: [
            {
              title: "“Discovery is the product”",
              problem:
                "I was arguing that the planner was the centre of gravity. The response was that nobody downloads a travel app to look at a schedule. They download it because they want to go somewhere, and the first screen has to sell that.",
              decision:
                "I stopped treating this as an either or. The explore surface stayed rich, full bleed, and genuinely seductive. What changed is where it leads. Every destination screen ends in a single action that creates a trip, so desire has somewhere to go the moment it appears.",
              note: {
                label: "This one I lost, and it was right",
                body: "My first structure buried exploration a level down, because I had decided discovery was the overserved part of the category. That was true of the market and false of the person holding the phone. Wanting to go somewhere comes before planning to go somewhere, and a product that opens on an empty itinerary is asking for commitment it has not earned yet. The explore screens exist because I was talked out of my own structure.",
              },
            },
            {
              title: "“Can you not just look at what Airbnb does?”",
              problem:
                "With no research budget and no client, the reasonable suggestion was to skip the study and copy the leaders. They have spent more on this than I ever will, so their patterns must be right.",
              decision:
                "I did look, closely, and used it. But I framed the teardown as a search for where each product stops helping rather than a list of patterns to lift, and I said plainly which conclusions were evidence and which were guesses.",
              note: {
                label: "Why the distinction mattered",
                body: "Copying the leaders in this category would have produced a fourth excellent discovery app. Every pattern worth stealing was built to solve a problem those companies actually have, which is inventory and booking volume, not the problem a traveller has on a Tuesday with an unplanned Thursday. Borrowing the craft while rejecting the priorities was the whole point of doing the analysis properly.",
              },
            },
            {
              title: "“Nobody talks to a travel app”",
              problem:
                "The assistant was the least popular thing I proposed. The objection was fair: voice and chat interfaces in consumer apps have a long history of being demoed once and never opened again.",
              decision:
                "I made it summoned rather than surfaced. Clara has no feed, no proactive prompts, and no badge. It sits behind one input and does nothing until you ask, which means it costs a user nothing if they never touch it.",
              note: {
                label: "The unresolved risk",
                body: "I cannot prove this one. An assistant nobody opens is dead weight in the interface, and the honest position is that this is the feature most likely to be wrong. What I would watch is not how many people try it, which will be high out of novelty, but how many come back to it in week two, and whether the ones who do plan faster than the ones who do not.",
              },
            },
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
          anchor: "final-design",
          src: "/images/work/plantinerary-itinerary.webp",
          caption:
            "The itinerary. Trips split into ongoing and completed on the left; one trip opened into day chips and an hour ruler on the right.",
          impact:
            "This is the screen the whole argument was about. Reservations are counted, the days are chips you tab between rather than a scroll you get lost in, and every entry carries its time and its place, so the distance between the hotel and the skate park is on the screen at planning time instead of being discovered in a taxi. Two details do most of the work: the green line marking where you currently are in the day, and the amber flag against the one entry that has a problem. A plan that can tell you something is wrong is a plan you keep opening.",
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
          kind: "prose",
          heading: "Explore: swipe, tap, and the trip exists",
          body: [
            "The explore surface is the half of the product I was talked into, and it ended up carrying more weight than the half I argued for. Its job is narrow. Show one place at a time, well enough that someone wants to go, and put the thing that turns wanting into planning directly under it.",
            "So it is one destination per screen, full bleed, photograph first. A name, a rating, how far away it is, and a short description that tells you what kind of trip this would be rather than reciting facts. Nothing competes for the eye, because a grid of eight destinations is a comparison task and comparison is where people stall.",
            "Navigation is two gestures and nothing else. Swipe up for the next place. Tap to plan this one. There is no filter bar, no sort, no map toggle, no bottom tabs fighting for room. Back sits top left, the heart top right, and when you reach the end of the set the prompt changes to Back to top so you are never scrolling into nothing. Someone can go through twenty destinations with a thumb, at a bus stop, without reading a single control label.",
            "The tap is the important part. Plan new trip does not open a form. It creates the trip and drops you into the itinerary with the destination and dates already filled, which is the seam every other product in the category leaves open. In most apps the gap between deciding and planning is a save, a menu, and a blank screen. Here it is one button, and the plan is already started before enthusiasm has a chance to wear off.",
          ],
        },
        {
          kind: "figure",
          src: "/images/work/plantinerary-explore.webp",
          caption:
            "Explore: one destination to a screen, with Swipe Up to see Next at the foot of each and Plan new trip sitting directly under the description.",
          impact:
            "The competitive teardown is visible here. The photography-led card is a lesson from Airbnb, the single-destination focus is a correction of the endless-possibility feed, and the description is written to help you decide rather than to rank anything. Third screen shows the end of the set: the same prompt becomes Back to top, so the pattern stays consistent and the loop closes.",
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
          kind: "prose",
          heading: "Clara, the part that came last",
          body: [
            "Contextual suggestions solved the empty afternoon. They did not solve the sentence people actually say out loud, which is some version of: I have four days in Lisbon in October, I hate early mornings, sort it out.",
            "That request has too many variables for a suggestion slot and too few for a form. It is a conversation, so I designed one. Clara is a travel assistant that sits behind a single input and does the planning work you would otherwise do by opening six tabs.",
            "What it is for, concretely. Building a first draft itinerary from a sentence, so the blank trip you just created has something in it to react to, which is a far easier task than authoring from nothing. Filling a specific gap on request, in the language you would actually use, like something indoors on Thursday afternoon because it will be raining. Reworking a day when reality moves, which is the moment plans usually die: a delayed flight should not mean rebuilding an itinerary by hand. And answering the questions that sit around a trip rather than inside it, the visa rule, the opening hours, whether that neighbourhood is walkable at night.",
            "The design rules were the same ones the rest of the product runs on, just harder to hold. Clara never speaks first. There is no badge, no proactive tip, no card in the timeline suggesting you ask it something. It writes into the itinerary rather than replying with a paragraph you then have to transcribe, because an assistant that produces text you have to re-enter has moved the work rather than done it. And every change it makes is a proposal you accept, not an edit that has already happened, which keeps the principle intact: the plan stays yours.",
            "The input carries three affordances, and each one is a different mode of asking. The plus attaches context, a booking confirmation or a screenshot of a recommendation somebody sent you, so Clara can read it into the plan instead of you retyping it. The microphone is for the moment you are actually travelling and typing is not realistic. And the greeting uses your name and asks a question rather than announcing a feature, because the fastest way to make an empty input intimidating is to leave someone guessing what it accepts.",
          ],
        },
        {
          kind: "figure",
          src: "/images/work/plantinerary-clara.webp",
          caption:
            "Clara: one orb, one question, and a single input with attach, dictate, and voice mode. Nothing else on the screen.",
          impact:
            "The restraint is the design. An assistant this capable is under enormous pressure to advertise itself with suggestion chips, example prompts, and a scrolling list of things it can do, all of which turn a calm surface into a menu. Hi John, where are we going today does the same job in seven words: it tells you the thing accepts plain language, and it puts the first move back with you.",
        },
        {
          kind: "impact",
          heading: "The impact",
          intro: [
            "A self-directed concept, so there is no launch behind these. They come from moderated sessions with each traveller planning a real trip twice: once the way they normally would, once in Plantinerary.",
          ],
          source: "Prototype testing",
          metrics: [
            {
              value: "45%",
              label: "faster to a finished day-by-day plan",
              baseline: "Against the participant's own current multi-tool process",
            },
            {
              value: "4 in 5",
              label: "planned activities still standing on the day",
              baseline: "Self-reported at the end of the trip, not observed",
            },
            {
              value: "7 to 1",
              label: "planning tools collapsed into one surface",
              baseline: "Counted from what participants had open before the session",
            },
          ],
          body: [
            "The middle number is the one that matters. Time to a plan measures the product. Plan survival measures whether the plan was any good, and that is what the entire timeline argument rests on. A tool that gets you to a schedule faster and then watches it fall apart by Tuesday has not helped anybody.",
          ],
        },
        {
          kind: "list",
          heading: "What I keep watching",
          intro: [
            "Two questions the testing could not settle, and both need a real trip rather than a session:",
          ],
          items: [
            "Suggestion dismissal rate. A high rate would mean the context model is wrong, not that people dislike suggestions.",
            "The ideas tray. Does it stay a useful staging area, or quietly become the same graveyard as every other save list?",
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
    image: "/images/work/ibank.webp",
    subtitle: "Bank redesign",
    metric:
      "[Prototype testing:] transaction completion time down [40%] across [3 core journeys], measured against the live portal. Build in progress",
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
        { label: "Project type", value: "Client engagement" },
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
              beforeSrc: "/images/work/ibank-dashboard-old.webp",
              afterSrc: "/images/work/ibank-dashboard-new.webp",
              caption:
                "Before, eight accounts sat in a paged carousel showing three at a time, with balances masked by default, so the first thing a customer saw was a row of hidden numbers they had to page through. Nothing next to the money did anything; every action lived in the left nav. Below that, Payments for Trade took the lower half of the screen, a section most retail customers never touch. After, one account is chosen from a dropdown and its balance is the largest thing on the page, with the four actions that make up most sessions sitting directly beside it. The promo moved out of the right rail into a Don't miss band underneath. The smallest change matters most: the old empty state read No Record - No frequent records, which sounds like you have no transactions, where the new one reads You are yet to select a tab, which correctly says the screen is waiting on you.",
            },
            {
              label: "Transfer flow",
              beforeSrc: "/images/work/ibank-transfer-old.webp",
              afterSrc: "/images/work/ibank-transfer-new.webp",
              caption:
                "Before, the screen was titled Other Banks, so the customer had already committed to a destination type before arriving. It then asked for the rail (Instant or NEFT), then Saved or New, and defaulted to New: a blank account number field as the first thing you meet. You had to know the digits before you could begin. The right rail carried an empty Frequent Transfers panel and a video about updating your account details, and the bottom two thirds of the page were empty. After, it is one Account transfer screen with no upfront choice of rail or bank. It opens on people you have paid before, listed alphabetically with their bank and account number visible, and a search that accepts a name or phone number as readily as an account number. View Transfer Success Rates is the addition I would defend hardest: interbank transfers in Nigeria fail often enough that knowing which banks are currently settling is worth more than any layout change on this screen.",
            },
            {
              label: "Transaction history",
              beforeSrc: "/images/work/ibank-history-old.webp",
              afterSrc: "/images/work/ibank-history-new.webp",
              caption:
                "Before, four inputs stood between the customer and any result: account, start date, end date typed as DD/MM/YYYY, plus Amount and Remarks filters that most people do not need on a first look. Results arrived as dense rows carrying full reference strings, and a third of the width went to an account officer card and a help centre advert. After, the period is a row of preset chips (current week, last week, current month, last month), so the common case is one tap and the date fields only matter if you choose Custom period. The balance sits behind a mask on a screen people often open in public. Generate stays disabled until the selection is valid, and the empty state says what it is waiting for rather than leaving a blank panel.",
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
                body: "This is where design stops being the deciding voice. Multi-factor authentication and real-time transaction monitoring are not steps that can be streamlined for elegance, and how much a screen may reveal about a transaction's state is a compliance question before it is a UX one. Working with engineering and compliance, in sessions I set up before the first flow was drawn rather than after, the answer was not fewer steps but better narration of the steps that must exist. That constraint improved the work: it forced the fix to be clarity rather than removal, which is the more durable version anyway.",
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
          kind: "prose",
          heading: "What I got wrong",
          body: [
            "The dashboard replaced an eight-account carousel with a single selector and one large balance. I treated that as settled early and built the rest of the redesign on top of it.",
            "It tested badly with customers holding multiple accounts. That is a smaller group than the retail majority, and it is also the group that opens the portal most. Collapsing eight accounts into a selector meant they could no longer tell at a glance which account a payment had landed in. They had to go looking. I had optimised for the median session and made the heaviest sessions worse.",
            "The real mistake was upstream of the screen. I had a segment split sitting in the research and I did not use it to structure the first round of testing, so I found the problem two weeks later than I needed to, and after three other screens had already been built against the assumption.",
            "I would still defend the selector. Eight masked balances in a paged carousel was not serving anyone. What I would not defend is how thin the evidence was when I locked it, or how long I let it stand unexamined because the rest of the layout depended on it.",
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
          kind: "prose",
          heading: "The status system underneath it",
          body: [
            "Everything above turns on a customer knowing what state their money is in. That is not one component with three variants. It is twelve states, most of which are invisible on a happy path and all of which somebody eventually hits.",
            "It was too large to sit inside the case study without swallowing it, so it lives as its own artifact: every state with its copy, what moves between them, and the places where what the system knows and what the customer may be told come apart.",
          ],
          link: {
            label: "View the full state map",
            href: "/system/transaction-status",
          },
        },
        {
          kind: "prose",
          anchor: "final-design",
          heading: "Final designs",
          body: [
            "The comparisons above are sized to be read against each other. Here the finished screens sit at full width, where the detail is actually legible.",
          ],
        },
        {
          kind: "figure",
          src: "/images/work/ibank-dashboard-new.webp",
          caption:
            "Dashboard: account selector, balance with a hide toggle, and the four most-used actions beside it.",
          impact:
            "The eye toggle sits on the balance rather than in settings, because internet banking gets opened in offices and shared spaces. Hiding your own balance should cost one tap, not a trip through preferences.",
        },
        {
          kind: "figure",
          src: "/images/work/ibank-transfer-new.webp",
          caption:
            "Transfer: search across name, phone, or account number, with saved beneficiaries grouped alphabetically.",
          impact:
            "Each avatar carries a small bank badge, so the destination institution is visible before selection rather than confirmed a screen later. Sending to the right person at the wrong bank is a common and expensive mistake.",
        },
        {
          kind: "figure",
          src: "/images/work/ibank-history-new.webp",
          caption:
            "Transaction history: period presets with a custom range, and a statement that generates only once the selection is valid.",
          impact:
            "Generate stays disabled until the range is complete, so the failure is prevented rather than reported. The empty state names what it is waiting for, which is the difference between a screen that looks broken and one that looks ready.",
        },
        {
          kind: "impact",
          heading: "What it is projected to do, and how I know",
          intro: [
            "The build is in progress, so these are not live numbers and I am not going to present them as if they were.",
            "They come from moderated task testing on the new prototype, run against the same three journeys on the current portal. Three things were measured: time on task, repeat attempts, and how often a participant had to ask how to proceed.",
          ],
          source: "Prototype testing",
          metrics: [
            {
              value: "40%",
              label: "faster to complete a transaction",
              baseline: "Median time on task, new prototype against the live portal",
            },
            {
              value: "31%",
              label: "fewer repeat attempts on the same transfer",
              baseline:
                "Participants who re-ran a transfer they had already completed successfully",
            },
            {
              value: "26%",
              label: "fewer how do I moments",
              baseline:
                "Times a participant stopped and asked the moderator what to do next. Not support tickets: the product has not shipped, so there are none yet.",
            },
          ],
          body: [
            "The first is the headline and the second is the one I would defend hardest. A repeat attempt is somebody who could not tell whether their money had moved, and every one of them was about to become a support call, a duplicate transfer, or both.",
            "The live numbers will be different from these, probably worse, because a prototype is a friendlier environment than a Tuesday morning on mobile data. I would rather publish the method than a rounder number.",
          ],
        },
        {
          kind: "list",
          heading: "What I took from it",
          intro: [
            "A redesign inside a regulated product teaches you different lessons than a greenfield one:",
          ],
          items: [
            "The steps you cannot remove are the ones most worth designing. Narration beats deletion.",
            "A customer who cannot tell whether a transfer completed will try it again. Status is not a detail, it is the product.",
            "Brand consistency in banking is a security cue. Modernising the palette would have cost more trust than it bought.",
            "A decision that everything else gets built on top of should be the most tested, not the least. Mine was the least, because it felt obvious.",
          ],
        },
        {
          kind: "quote",
          heading: "Reflection",
          body: [
            "Redesigning a banking solution is mostly an exercise in what you are not allowed to change.",
            "The steps that frustrated customers were, in almost every case, the steps protecting them. The work was not removing friction but making necessary friction legible, so a customer waiting on a security check understands they are being protected rather than obstructed.",
            "That constraint made the design better. Given a free hand I would have tried to shorten the flow, and shipped something faster and less trustworthy.",
          ],
        },
      ],
    },
  },
  {
    slug: "gopal",
    title: "GoPal",
    category: "Digital Banking",
    tag: "Mobile · Self-directed",
    year: "2024",
    description:
      "An online banking experience designed to make everyday transactions effortless while helping users build better saving habits.",
    image: "/images/work/gopal.webp",
    subtitle: "Digital banking app",
    metric:
      "[Prototype testing:] saving actions per user [nearly doubled] against the round-one flow, with transfer questions down [30%]",
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
        { label: "Project type", value: "Client engagement" },
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
          anchor: "final-design",
          src: "/images/work/gopal-home-savings.webp",
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
          src: "/images/work/gopal-savings-flow.webp",
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
          src: "/images/work/gopal-cards.webp",
          caption:
            "Virtual card: details hidden by default, revealed deliberately, with manage and block one tap away.",
          impact:
            "Hiding the numbers until asked was a small call that changed how safe the screen feels in public. Block Card sits at the top level because the moment you need it, you are already panicking.",
        },
        {
          kind: "impact",
          heading: "The impact",
          intro: [
            "Measured across the three test rounds, comparing the redesigned saving flow against the round-one prototype rather than against anything shipped.",
          ],
          source: "Prototype testing",
          metrics: [
            {
              value: "1.9x",
              label: "saving actions per user",
              baseline:
                "Against the plan-first flow from round one, not against a shipped product",
            },
            {
              value: "30%",
              label: "fewer support requests on transfers",
              baseline: "Moderator questions during the transfer task, across rounds",
            },
            {
              value: "3 in 4",
              label: "participants set up a plan unprompted",
              baseline: "Without the moderator asking them to",
            },
          ],
          body: [
            "The third number is the one that justified the feature nobody asked for. Nearly doubling saving actions could just mean the button got easier to find. Participants setting up a savings plan without being told to means the behaviour was the thing they wanted all along, and the original product had simply never given them anywhere to put it.",
          ],
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
    subtitle: "Agritech marketplace",
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
    image: "/images/work/valco.webp",
    subtitle: "Trust-fund investing",
    tags: ["Fintech", "UI Design"],
  },
];

export const posts = [
  {
    title: "AI as a designer's tool, not a replacement",
    date: "July 2024",
    href: "https://medium.com/",
    image: "/images/articles/ai-tool.webp",
    excerpt:
      "How I fold AI into my process to move faster without losing the craft and judgment that make design matter.",
  },
  {
    title: "UI/UX design guidance for Nigerian youth",
    date: "March 2022",
    href: "https://medium.com/",
    image: "/images/articles/uiux-youth.webp",
    excerpt:
      "A practical starting point for young designers in Nigeria breaking into product design from scratch.",
  },
];

// ===== /about page =====

export const about = {
  tagline:
    "Product designer who ships. I take complex ideas to clear interfaces, then build them, so the argument is settled by a running version rather than a mockup.",
  facts: [
    { value: "5+ years", label: "Experience" },
    { value: "Lagos, Nigeria", label: "Location" },
    { value: "Available", label: "Freelance" },
  ],
  bio: [
    "I'm Taslim Abdulkadir, a UI/UX designer with five years of experience helping businesses turn complex ideas into engaging, user-centered designs. My mission is to create ethical, impactful solutions that streamline the journey from concept to launch, empowering businesses to reach their goals without the usual roadblocks.",
    "Most products don't fail because of bad ideas, they fail because things get complicated too early. I focus on slowing down, understanding the real problem, and designing solutions that make sense to the people using them, not just the people building them.",
  ],
  /** The work that never shows up in a file, and the part reviewers are
   *  actually scanning for. Kept as its own section so it does not get
   *  buried inside the bio. */
  influence: {
    heading: "The part that isn't the file",
    body: [
      "Most of my work has happened in teams too small to have a design function, which means the job was never only the file.",
      "I have run research sessions with engineers in the room, because a failure someone watched is worth more than a failure they read about in a deck. I have mentored junior designers through their first end-to-end projects, which mostly meant resisting the urge to fix their work and asking what they were optimising for instead. I have built component libraries that other people shipped on for months without needing to ask me anything, which I have come to think is the actual test of a design system.",
      "The i-Bank work is the clearest case. The compliance constraints that ended up shaping the entire redesign were not handed to me in the brief. I went and got them in week one, because the alternative was discovering them in week six with three flows already built. Pulling the right people into the room early is not a design skill exactly. It is usually the thing that decides whether the design survives contact with the organisation.",
    ],
  },
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
