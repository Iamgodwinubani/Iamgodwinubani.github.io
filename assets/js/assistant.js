const form = document.querySelector("[data-assistant-form]");
const messages = document.querySelector("[data-assistant-messages]");
const status = document.querySelector("[data-assistant-status]");

if (form && messages) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const input = form.elements.question;
    const question = input.value.trim();
    if (!question) return;

    addMessage(question, "user");
    input.value = "";
    input.disabled = true;
    form.querySelector("button").disabled = true;
    status.textContent = "Thinking...";

    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "The assistant is unavailable.");
      addMessage(data.answer, "bot");
      status.textContent = "";
    } catch (error) {
      addMessage(error.message || "The assistant is unavailable right now.", "bot");
      status.textContent = "Try again in a moment.";
    } finally {
      input.disabled = false;
      form.querySelector("button").disabled = false;
      input.focus();
    }
  });
}

function addMessage(text, role) {
  const message = document.createElement("div");
  message.className = `assistant-message assistant-message-${role}`;
  message.textContent = text;
  messages.append(message);
  messages.scrollTop = messages.scrollHeight;
}
