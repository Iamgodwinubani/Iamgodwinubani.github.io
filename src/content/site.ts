/**
 * Central personal-brand content.
 * Edit the values in this file to update details across the whole website.
 */
export const site = {
  name: "Godwin Ubani",
  fullName: "Godwin Ubani Onyemuwa",
  wordmark: "GODWIN UBANI",
  roles: ["Software Engineer", "Founder", "Entrepreneur"],
  title: "Godwin Ubani — Software Engineer, Founder & Entrepreneur",
  description:
    "Godwin Ubani is a Software Engineer, Founder, and Entrepreneur building scalable digital products across fintech, payment infrastructure, business automation, and technology.",
  url: "https://godwinubani.me",
  email: "iamgodwinubani@gmail.com",
  phone: "+86 180 7010 4441",
  phoneHref: "tel:+8618070104441",
  location: "Shenzhen, China",
  timezone: "Asia/Shanghai",
  availability: "Available for select opportunities",
  tagline: "Building things that move ideas forward.",

  /**
   * Portrait photograph.
   * To use your real photo: place it at /public/images/portrait.jpg
   * (portrait orientation, ideally 1200×1500 or larger) and set the value
   * below to "/images/portrait.jpg". Leave as null to show the placeholder.
   */
  portrait: "/images/portrait.jpg" as string | null,
  portraitAlt: "Portrait of Godwin Ubani",
  /** Second photograph, used in the About section. */
  portraitAbout: "/images/portrait-about.jpg" as string | null,
  portraitAboutAlt: "Godwin Ubani testing hardware at a technology store",
} as const;

export const navLinks = [
  { label: "Home", href: "/#top", id: "top" },
  { label: "Work", href: "/#work", id: "work" },
  { label: "About", href: "/#about", id: "about" },
  { label: "Contact", href: "/#contact", id: "contact" },
] as const;
