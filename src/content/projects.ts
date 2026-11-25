/**
 * Product portfolio content.
 * Each product has its own identity colour, description and focus areas.
 * Product images live in /public/images/projects.
 */

export type ProjectSlug = "pavlo" | "nodly" | "melyo" | "sivra";

export type Project = {
  slug: ProjectSlug;
  index: string;
  name: string;
  category: string;
  /** One-line positioning used on cards */
  summary: string;
  /** Longer description used on the project page */
  overview: string[];
  focus: { title: string; body: string }[];
  tags: string[];
  role: string;
  status: string;
  /** CSS colour variable for the product identity */
  color: string;
  /** Product image in /public, with its pixel size, or null for a placeholder */
  screenshot: { src: string; width: number; height: number } | null;
  /** Optional live URL for the product */
  link: string | null;
};

export const projects: Project[] = [
  {
    slug: "pavlo",
    index: "01",
    name: "Pavlo",
    category: "Payment Orchestration & Financial Infrastructure",
    summary:
      "A payment orchestration product focused on simplifying and connecting digital payment workflows.",
    overview: [
      "Pavlo is a payment orchestration product built to simplify how digital payment workflows are connected and managed.",
      "Instead of treating every payment integration as a separate project, Pavlo brings payment flows into one coordinated layer, so the logic of how a payment moves is clear, structured, and easier to evolve.",
    ],
    focus: [
      {
        title: "Payment infrastructure",
        body: "A foundational layer for handling payments in a consistent, structured way across products.",
      },
      {
        title: "Payment workflows",
        body: "Clear, defined flows that describe how a payment moves from initiation to completion.",
      },
      {
        title: "Integrations",
        body: "A unified approach to connecting with payment services, so integrations stay manageable as they grow.",
      },
      {
        title: "Transaction management",
        body: "Visibility into transactions and their states, making it easier to follow and manage each payment.",
      },
    ],
    tags: ["Payments", "Orchestration", "APIs", "Integrations", "Transactions"],
    role: "Founder · Product · Engineering",
    status: "Built",
    color: "var(--pavlo)",
    screenshot: { src: "/images/projects/pavlo.webp", width: 743, height: 526 },
    link: null,
  },
  {
    slug: "nodly",
    index: "02",
    name: "Nodly",
    category: "Webhook Delivery & Monitoring Infrastructure",
    summary:
      "A webhook infrastructure product designed for reliable event delivery, monitoring, and management.",
    overview: [
      "Nodly is webhook infrastructure designed around one idea: events should arrive where they are supposed to, and you should be able to see when they do not.",
      "It gives teams a dedicated layer for sending, tracking, and managing webhook events, turning a part of the stack that is often invisible into something observable and dependable.",
    ],
    focus: [
      {
        title: "Webhook delivery",
        body: "A dedicated delivery layer for sending events to the endpoints that depend on them.",
      },
      {
        title: "Event management",
        body: "Structured handling of events, so each one can be found, inspected, and acted on.",
      },
      {
        title: "Monitoring",
        body: "Visibility into delivery attempts and outcomes, so failures are noticed rather than discovered later.",
      },
      {
        title: "Integration reliability",
        body: "Built to make the connections between systems more predictable and easier to trust.",
      },
    ],
    tags: ["Webhooks", "Event Delivery", "Monitoring", "APIs", "Reliability"],
    role: "Founder · Product · Engineering",
    status: "Built",
    color: "var(--nodly)",
    screenshot: { src: "/images/projects/nodly.webp", width: 734, height: 531 },
    link: null,
  },
  {
    slug: "melyo",
    index: "03",
    name: "Melyo",
    category: "Financial Reconciliation & Automation",
    summary:
      "A financial technology product focused on simplifying transaction matching, reconciliation, and financial operations.",
    overview: [
      "Melyo is a financial technology product that brings structure to reconciliation, the work of making sure records on both sides of a transaction agree.",
      "It focuses on matching transactions, surfacing what does not line up, and automating the repetitive steps of financial operations so teams can spend their attention where it matters.",
    ],
    focus: [
      {
        title: "Transaction matching",
        body: "Pairing records across sources so that each transaction can be accounted for.",
      },
      {
        title: "Reconciliation",
        body: "A clear process for identifying what agrees, what does not, and what needs review.",
      },
      {
        title: "Financial workflows",
        body: "Structured operational flows that reflect how finance work actually gets done.",
      },
      {
        title: "Automation",
        body: "Reducing manual, repetitive steps so financial operations are faster and more consistent.",
      },
    ],
    tags: ["Reconciliation", "Matching", "Automation", "Ledgers", "Finance Ops"],
    role: "Founder · Product · Engineering",
    status: "Built",
    color: "var(--melyo)",
    screenshot: { src: "/images/projects/melyo.webp", width: 742, height: 440 },
    link: null,
  },
  {
    slug: "sivra",
    index: "04",
    name: "Sivra",
    category: "Fraud Detection & Digital Trust",
    summary:
      "A digital trust product focused on scam detection, information verification, and helping businesses make more informed decisions.",
    overview: [
      "Sivra is a digital trust product built to help people and businesses make more informed decisions in environments where not everything is what it appears to be.",
      "It focuses on detecting signs of scams, verifying information, and presenting risk in a way that is clear enough to act on.",
    ],
    focus: [
      {
        title: "Digital trust",
        body: "Helping businesses establish confidence in the information and parties they deal with.",
      },
      {
        title: "Fraud detection",
        body: "Identifying signals that suggest a scam or fraudulent activity.",
      },
      {
        title: "Information verification",
        body: "Checking information so decisions are based on what can be confirmed.",
      },
      {
        title: "Risk awareness",
        body: "Presenting risk clearly, so the people making decisions understand what they are looking at.",
      },
    ],
    tags: ["Fraud Detection", "Verification", "Risk", "Trust & Safety"],
    role: "Founder · Product · Engineering",
    status: "Built",
    color: "var(--sivra)",
    screenshot: { src: "/images/projects/sivra.webp", width: 734, height: 433 },
    link: null,
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProjects(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  return {
    prev: projects[(i - 1 + projects.length) % projects.length],
    next: projects[(i + 1) % projects.length],
  };
}
