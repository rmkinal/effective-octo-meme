const chatForm = document.getElementById("chatForm");
const chatMessages = document.getElementById("chatMessages");
const messageInput = document.getElementById("messageInput");
const quickPromptButton = document.getElementById("quickPrompt");

const expertTips = [
  "For cove lighting, aim for 150-200 lumens/ft and use a 24V strip to reduce voltage drop.",
  "Need tunable white? Choose 2700K-5000K with a dual-channel dimmer.",
  "For under-cabinet task lighting, 3000K at 200+ lumens/ft is a safe starting point.",
  "Add a diffuser to reduce hotspots if the LED diodes are visible.",
  "Use aluminum channels to manage heat and extend LED lifespan."
];

const detailPrompts = [
  "What is the length of the LED run and its location?",
  "Do you need dimming or smart control compatibility?",
  "What color temperature or ambiance are you aiming for?"
];

const responses = [
  "Based on your goals, I recommend a high-CRI strip with a 24V driver for longer runs. Add a 20% power buffer.",
  "For even illumination, pair the strip with an aluminum channel and a frosted lens diffuser.",
  "Consider a 90+ CRI, 3000K strip if you want warm yet clean light in living spaces.",
  "Use a 12V strip only for short runs under 5 meters; otherwise 24V minimizes voltage drop.",
  "If you need smart control, look for PWM-compatible dimmers or Zigbee controllers."
];

function createMessageCard(role, title, body, extras = []) {
  const article = document.createElement("article");
  article.className = `message message--${role}`;

  const heading = document.createElement("h2");
  heading.textContent = title;
  article.appendChild(heading);

  const paragraph = document.createElement("p");
  paragraph.textContent = body;
  article.appendChild(paragraph);

  if (extras.length) {
    const list = document.createElement("ul");
    extras.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      list.appendChild(li);
    });
    article.appendChild(list);
  }

  return article;
}

function appendMessage(messageNode) {
  chatMessages.appendChild(messageNode);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function handleUserMessage(message) {
  appendMessage(createMessageCard("user", "You", message));

  const tip = expertTips[Math.floor(Math.random() * expertTips.length)];
  const response = responses[Math.floor(Math.random() * responses.length)];
  const followUps = detailPrompts.sort(() => 0.5 - Math.random()).slice(0, 2);

  appendMessage(
    createMessageCard(
      "assistant",
      "LuxGuide",
      `${response} ${tip}`,
      ["Quick follow-up:", ...followUps]
    )
  );
}

chatForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const message = messageInput.value.trim();
  if (!message) {
    return;
  }
  handleUserMessage(message);
  messageInput.value = "";
});

quickPromptButton.addEventListener("click", () => {
  messageInput.value =
    "I want LED lighting recommendations for a living room with a cozy vibe. The room is 14x18 ft.";
  messageInput.focus();
});
