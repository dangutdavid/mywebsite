export type Service = {
  slug: string;
  title: string;
  summary: string;
  audience: string[];
  problems: string[];
  includes: string[];
  excludes: string[];
  deliverables: string[];
  technologies: string[];
};

export type Article = {
  slug: string;
  title: string;
  description: string;
  category: string;
  date: string;
  readingTime: string;
  status: "published" | "draft";
  body: string[];
};

export type CaseStudy = {
  slug: string;
  title: string;
  context: string;
  role: string;
  approach: string;
  technologies: string[];
  result: string;
  lessons: string;
  status: "published" | "needsReview";
};

export type PublicProfile = {
  label: string;
  description: string;
  href: string;
};

export type ResearchHighlight = {
  title: string;
  venue: string;
  description: string;
  href: string;
};

export type EngagementStep = {
  title: string;
  description: string;
};

export const site = {
  name: "SkyDive Technologies and Consultancy Ltd",
  shortName: "SkyDive",
  personName: "Dr Maren David Dangut",
  tagline: "Salesforce, AI and data solutions built for real operating needs.",
  description:
    "SkyDive Technologies and Consultancy helps organisations design, build and improve connected digital services through Salesforce engineering, AI, data, integration and technical leadership.",
  jurisdiction: "England and Wales",
  companyNumber: "15086660",
  location: "Milton Keynes, UK",
  linkedin: "https://uk.linkedin.com/in/marendaviddangut",
  contactEmail: "Use the enquiry form or configure a public company email before launch.",
  nav: [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/work", label: "Work" },
    { href: "/about/maren", label: "About" },
    { href: "/insights", label: "Insights" },
    { href: "/contact", label: "Contact" }
  ]
};

export const services: Service[] = [
  {
    slug: "salesforce-engineering-and-architecture",
    title: "Salesforce engineering and architecture",
    summary:
      "Design, build and improve Salesforce solutions using Apex, Lightning Web Components, Flow, secure data models and sound platform architecture.",
    audience: ["Salesforce programme owners", "Delivery leads", "Teams needing senior engineering support"],
    problems: [
      "Complex Salesforce builds need stronger architecture and maintainable code.",
      "Automation, data model or security decisions are slowing delivery.",
      "A team needs review, recovery support or hands-on senior development."
    ],
    includes: [
      "Solution design and technical discovery",
      "Apex, LWC, Flow and platform automation",
      "Security, sharing, data modelling and governance review",
      "Experience Cloud, Sales Cloud, Service Cloud, CPQ and Data Cloud support"
    ],
    excludes: [
      "Unverified claims about delivery savings",
      "Client-confidential screenshots or source code"
    ],
    deliverables: [
      "Architecture notes and option appraisals",
      "Working Salesforce components and automation",
      "Code review findings and delivery recommendations",
      "Maintainable implementation documentation"
    ],
    technologies: ["Apex", "LWC", "Flow", "SOQL", "Experience Cloud", "CPQ", "Salesforce DX"]
  },
  {
    slug: "ai-and-data-solutions",
    title: "AI and data solutions",
    summary:
      "Turn responsible AI and data capabilities into useful workflows using Agentforce, Einstein AI, Data Cloud/Data 360, machine learning and integration.",
    audience: ["Leaders exploring Salesforce AI", "Data teams", "Research and education organisations"],
    problems: [
      "AI ideas need to become governed, useful workflows.",
      "Data is fragmented across systems and difficult to operationalise.",
      "Teams need practical guidance on prompts, guardrails and integration."
    ],
    includes: [
      "Agentforce topics, actions and guardrail design",
      "Prompt Builder and Einstein AI workflow support",
      "Data Cloud/Data 360 solution shaping",
      "Machine-learning and LLM API integration patterns"
    ],
    excludes: ["Unsupported AI performance claims", "Use of sensitive data without a governance process"],
    deliverables: [
      "AI workflow design",
      "Prototype or implementation plan",
      "Data readiness findings",
      "Responsible AI and integration recommendations"
    ],
    technologies: ["Agentforce", "Einstein AI", "Prompt Builder", "Data 360", "Python", "Apex callouts"]
  },
  {
    slug: "systems-integration",
    title: "Systems integration",
    summary:
      "Connect Salesforce and other platforms through well-designed APIs, events, identity controls and reliable data synchronisation.",
    audience: ["Technology leaders", "Platform owners", "Integration teams"],
    problems: [
      "Business processes span Salesforce, websites, reporting tools and external services.",
      "Existing integrations are brittle, undocumented or hard to monitor.",
      "Data synchronisation needs better security and reliability."
    ],
    includes: [
      "REST, SOAP and GraphQL API design",
      "Platform Events and Change Data Capture patterns",
      "Named Credentials and external service integration",
      "Integration review and documentation"
    ],
    excludes: ["Unapproved access to third-party systems", "Production changes without agreed controls"],
    deliverables: [
      "Integration architecture",
      "API contracts and mapping notes",
      "Salesforce integration components",
      "Operational risks and monitoring recommendations"
    ],
    technologies: ["REST", "SOAP", "GraphQL", "Platform Events", "CDC", "JSON", "XML"]
  },
  {
    slug: "technical-leadership-and-delivery",
    title: "Technical leadership and delivery",
    summary:
      "Strengthen discovery, architecture, engineering quality, DevOps, mentoring and delivery governance for complex programmes.",
    audience: ["Programme sponsors", "Delivery managers", "Consultancy partners"],
    problems: [
      "Delivery needs a senior technical voice across stakeholders and developers.",
      "Backlogs, code quality or release practices need stronger governance.",
      "A team requires mentoring or recovery support."
    ],
    includes: [
      "Technical discovery and backlog shaping",
      "Architecture governance and code review",
      "DevOps and release process improvement",
      "Mentoring, stakeholder translation and delivery assurance"
    ],
    excludes: ["Replacing product ownership", "Guaranteeing outcomes outside agreed delivery controls"],
    deliverables: [
      "Technical roadmap",
      "Delivery risk review",
      "Mentoring sessions and team guidance",
      "Release and quality improvement plan"
    ],
    technologies: ["Agile delivery", "Git", "CI/CD", "Salesforce DX", "Architecture review"]
  },
  {
    slug: "training-and-advisory",
    title: "Training and advisory",
    summary:
      "Build internal capability through tailored workshops, coaching and practical technical guidance.",
    audience: ["Internal Salesforce teams", "Training buyers", "Event organisers"],
    problems: [
      "Teams need confidence with Salesforce development, administration or AI enablement.",
      "Technical concepts need to be explained clearly to mixed audiences.",
      "Organisations want practical coaching instead of generic training material."
    ],
    includes: [
      "Salesforce developer and administrator training",
      "AI enablement and architecture workshops",
      "Team coaching and mentoring",
      "Tailored advisory sessions"
    ],
    excludes: ["Accredited course promises unless separately agreed", "One-size-fits-all training decks"],
    deliverables: [
      "Workshop plan",
      "Practical exercises",
      "Follow-up recommendations",
      "Reusable learning notes"
    ],
    technologies: ["Apex", "Flow", "LWC", "Agentforce", "Architecture practices", "Mentoring"]
  }
];

export const skills = [
  "Sales Cloud",
  "Service Cloud",
  "Experience Cloud",
  "Data Cloud / Data 360",
  "CPQ",
  "Agentforce",
  "Einstein AI",
  "Apex",
  "Lightning Web Components",
  "Flow",
  "REST and GraphQL APIs",
  "Salesforce DX",
  "Python machine learning",
  "DevOps and CI/CD",
  "Cybersecurity-informed architecture",
  "Predictive maintenance research"
];

export const certifications = [
  "Platform Developer II",
  "Agentforce Specialist",
  "Platform Data Architect",
  "Data 360 Consultant",
  "Platform Foundations",
  "Sales Cloud Consultant",
  "Service Cloud Consultant",
  "Business Analyst",
  "CPQ Administrator",
  "Platform Developer I",
  "Platform App Builder",
  "Platform Administrator"
];

export const education = [
  "PhD, Data Science and AI (Aerospace Applications), Cranfield University",
  "MSc, Computer Forensics and Cyber Security, University of Greenwich",
  "BSc (Hons), Computer Science, University of Jos"
];

export const experience = [
  {
    organisation: "International Growth Centre, London School of Economics",
    role: "Senior Salesforce Developer",
    period: "Jul 2024 - Present",
    summary:
      "Salesforce platform development for grant, project, milestone, finance and evidence tracking workflows."
  },
  {
    organisation: "Jaguar Land Rover",
    role: "Salesforce Technical Lead (KTP)",
    period: "Mar 2022 - Apr 2024",
    summary:
      "Salesforce transformation, CPQ, analytics and forecasting work in collaboration with Lancaster University and JLR teams."
  },
  {
    organisation: "DKloud",
    role: "Senior Salesforce Developer (Part-time)",
    period: "Jun 2018 - Present",
    summary:
      "Salesforce platform development, CPQ, integrations, automation and advisory across Sales, Service, Marketing Cloud and Einstein AI."
  },
  {
    organisation: "Oxfordable Careers",
    role: "Technical Developer / Instructor",
    period: "Public team listing",
    summary:
      "Publicly listed as a technical developer and instructor for digital-skills training, including Salesforce-focused capability building."
  },
  {
    organisation: "Metro Safety",
    role: "Salesforce Administrator and Business Analyst",
    period: "Mar 2021 - Jun 2021",
    summary:
      "Requirements, configuration, third-party integrations, automation, documentation and user guidance."
  }
];

export const publicProfiles: PublicProfile[] = [
  {
    label: "LinkedIn profile",
    description:
      "Public profile positioning includes Salesforce platforms where data, AI and workflow operate together, with activity around Salesforce AI, LWC, Apex and external AI services.",
    href: "https://uk.linkedin.com/in/marendaviddangut"
  },
  {
    label: "Salesforce AI copilot walkthrough",
    description:
      "Public LinkedIn activity describes Salesforce AI copilot patterns using LWC, Apex, custom objects for memory and external AI services.",
    href: "https://www.linkedin.com/posts/marendaviddangut_build-an-ai-copilot-in-salesforce-no-activity-7440002179819618306-hTu6"
  },
  {
    label: "Oxfordable Careers team listing",
    description:
      "Public team page lists Maren David Dangut as Technical Developer / Instructor.",
    href: "https://oxfordablecareers.com/about-us/"
  },
  {
    label: "DKLOUD public company profile",
    description:
      "Public LinkedIn company profile lists Maren David Dangut among DKLOUD employees.",
    href: "https://uk.linkedin.com/company/dkloud-consulting"
  }
];

export const researchHighlights: ResearchHighlight[] = [
  {
    title: "An integrated machine learning model for aircraft components rare failure prognostics with log-based dataset",
    venue: "ISA Transactions, 2021",
    description:
      "Peer-reviewed research on aircraft component rare-failure prognostics using machine-learning approaches for predictive maintenance.",
    href: "https://pubmed.ncbi.nlm.nih.gov/32423614/"
  },
  {
    title: "A rare failure detection model for aircraft predictive maintenance using a deep hybrid learning approach",
    venue: "Neural Computing and Applications, 2023",
    description:
      "Research applying deep hybrid learning to rare failure detection in aircraft predictive maintenance contexts.",
    href: "https://link.springer.com/article/10.1007/s00521-022-07167-8"
  },
  {
    title: "Rare Failure Prediction Using an Integrated Auto-encoder and Bidirectional Gated Recurrent Unit Network",
    venue: "IFAC Workshop AMEST, 2020",
    description:
      "Conference research combining auto-encoder and bidirectional recurrent methods for rare failure prediction.",
    href: "https://www.researchgate.net/publication/346285017_Rare_Failure_Prediction_Using_an_Integrated_Auto-encoder_and_Bidirectional_Gated_Recurrent_Unit_Network"
  }
];

export const engagementSteps: EngagementStep[] = [
  {
    title: "Discover the operating need",
    description:
      "Clarify business goals, existing platform context, data constraints, delivery risks and what must be true for the work to be useful."
  },
  {
    title: "Shape the technical route",
    description:
      "Translate findings into architecture options, delivery slices, governance decisions and a practical roadmap."
  },
  {
    title: "Build, review or recover",
    description:
      "Deliver hands-on Salesforce, AI, data and integration work, or provide senior review and recovery support for teams already in motion."
  },
  {
    title: "Document and enable",
    description:
      "Leave maintainable notes, decision records, handover guidance and mentoring so the team can keep improving after the engagement."
  }
];

export const caseStudies: CaseStudy[] = [
  {
    slug: "grant-management-salesforce-platform",
    title: "Grant-management Salesforce platform",
    context:
      "A research and policy environment needed Salesforce support for project, grant, milestone, finance and evidence workflows.",
    role: "Senior Salesforce Developer within the organisation's delivery context.",
    approach:
      "Worked across Apex, Lightning Web Components, Flow, external service integration and Experience Cloud portal delivery.",
    technologies: ["Apex", "LWC", "Flow", "Experience Cloud", "REST APIs"],
    result:
      "Public wording needs owner approval before publishing named outcomes or quantitative results.",
    lessons:
      "Complex public-interest workflows benefit from clear data models, stakeholder communication and maintainable automation.",
    status: "needsReview"
  },
  {
    slug: "automotive-salesforce-transformation",
    title: "Automotive Salesforce transformation and forecasting",
    context:
      "An aftermarket technology programme involved legacy-to-Salesforce transformation and demand-forecasting work.",
    role: "Salesforce Technical Lead (KTP) working within a wider organisational and university partnership.",
    approach:
      "Supported Salesforce configuration, CPQ, analytics, Python forecasting and third-party integration patterns.",
    technologies: ["Salesforce CPQ", "Python", "REST APIs", "Analytics"],
    result:
      "Specific results require permission and evidence review before publication.",
    lessons:
      "Migration work is strongest when platform design, data science and stakeholder governance are handled together.",
    status: "needsReview"
  },
  {
    slug: "salesforce-delivery-and-integrations",
    title: "Salesforce delivery and integrations",
    context:
      "Consultancy delivery across Salesforce clouds required development, automation, quality control and API integrations.",
    role: "Senior Salesforce Developer working with CRM and IT stakeholders.",
    approach:
      "Designed and implemented Apex REST services, custom objects, third-party integrations, automation and testing support.",
    technologies: ["Sales Cloud", "CPQ", "Apex REST", "Flow"],
    result:
      "Public client details and metrics are intentionally withheld until approved.",
    lessons:
      "Reusable patterns, testing and documentation reduce long-term Salesforce maintenance risk.",
    status: "needsReview"
  }
];

export const articles: Article[] = [
  {
    slug: "what-to-check-before-a-salesforce-architecture-review",
    title: "What to check before a Salesforce architecture review",
    description:
      "A practical checklist for teams preparing to review Salesforce architecture, data, automation and release practices.",
    category: "Salesforce engineering",
    date: "2026-07-24",
    readingTime: "4 min read",
    status: "published",
    body: [
      "A useful Salesforce architecture review starts with the operating problem, not with a diagram. Before the review, gather the current data model, automation inventory, integration list, release process and known pain points.",
      "The strongest reviews examine security and sharing, automation order, code quality, governor-limit risk, integration failure modes and the human workflow around support and releases.",
      "For teams under delivery pressure, the output should separate urgent risks from improvements that can be planned into the roadmap."
    ]
  },
  {
    slug: "responsible-ai-in-salesforce-workflows",
    title: "Responsible AI in Salesforce workflows",
    description:
      "How to move from AI ideas to governed workflows with clear data boundaries, prompts, guardrails and review points.",
    category: "AI and data",
    date: "2026-07-24",
    readingTime: "5 min read",
    status: "published",
    body: [
      "Responsible Salesforce AI work begins by deciding which decision is being supported, what data is permitted, and where human review is required.",
      "Agent topics, actions, prompts and guardrails should be designed as part of the operating model rather than treated as a standalone experiment.",
      "A small, measurable workflow with clear privacy controls is usually a better first step than a broad claim that AI will transform every process."
    ]
  },
  {
    slug: "integration-questions-for-salesforce-programme-owners",
    title: "Integration questions for Salesforce programme owners",
    description:
      "Questions that help programme owners assess API design, identity, synchronisation and support risk.",
    category: "Integration",
    date: "2026-07-24",
    readingTime: "4 min read",
    status: "published",
    body: [
      "Integration quality is partly technical and partly operational. A clean API is not enough if ownership, monitoring and recovery paths are unclear.",
      "Programme owners should ask which system owns each data field, how errors are surfaced, what credentials are used, and how the integration behaves during partial outage.",
      "These questions help prevent hidden coupling and give support teams the information they need when business processes span several systems."
    ]
  }
];
