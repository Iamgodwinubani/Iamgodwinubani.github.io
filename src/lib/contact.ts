/** Shared contact-form validation used by both the form and the API route. */

export type ContactInput = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export type ContactErrors = Partial<Record<keyof ContactInput, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContact(input: ContactInput): ContactErrors {
  const errors: ContactErrors = {};
  const name = input.name.trim();
  const email = input.email.trim();
  const subject = input.subject.trim();
  const message = input.message.trim();

  if (!name) errors.name = "Please enter your name.";
  else if (name.length > 100) errors.name = "Name is too long.";

  if (!email) errors.email = "Please enter your email address.";
  else if (!EMAIL_RE.test(email) || email.length > 200) errors.email = "Please enter a valid email address.";

  if (!subject) errors.subject = "Please add a subject.";
  else if (subject.length > 150) errors.subject = "Subject is too long.";

  if (!message) errors.message = "Please write a message.";
  else if (message.length < 10) errors.message = "A little more detail would help (at least 10 characters).";
  else if (message.length > 5000) errors.message = "Message is too long (5,000 characters max).";

  return errors;
}

export function buildMailto(to: string, input: ContactInput) {
  const body = `${input.message.trim()}\n\n—\n${input.name.trim()}\n${input.email.trim()}`;
  return `mailto:${to}?subject=${encodeURIComponent(input.subject.trim())}&body=${encodeURIComponent(body)}`;
}
