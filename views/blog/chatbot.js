let eventsData = [];

// Load events from events.json
fetch('articles.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to load events.json');
    }
    return response.json();
  })
  .then(data => {
    eventsData = data;
  })
  .catch(error => {
    console.error('Error loading events:', error);
  });

function toggleChatbox() {
  const chatbox = document.getElementById("chatbox");
  chatbox.style.display = chatbox.style.display === "none" || chatbox.style.display === "" ? "flex" : "none";
}

function sendMessage() {
  const input = document.getElementById("userInput");
  const msg = input.value.trim();
  if (msg !== "") {
    const messages = document.getElementById("chatbox-messages");

    const userMsg = document.createElement("p");
    userMsg.classList.add("user");
    userMsg.innerHTML = `<strong>You:</strong> ${msg}`;
    messages.appendChild(userMsg);

    input.value = "";

    // Simulate bot response
    setTimeout(() => {
      const botMsg = document.createElement("p");
      botMsg.classList.add("bot");
      botMsg.innerHTML = `<strong>Bot:</strong> ${getBotResponse(msg)}`;
      messages.appendChild(botMsg);
      messages.scrollTop = messages.scrollHeight;
    }, 500);

    messages.scrollTop = messages.scrollHeight;
  }
}

function getBotResponse(input) {
  input = input.toLowerCase();
    const greetings = [" hi ", "hello", "hey", "good morning", "good afternoon", "good evening"];
  if (greetings.some(greet => input.includes(greet))) {
    return "Hello! 👋 How can I assist you today?";
  }

  // Check for date-related queries
  const datePattern = /(?:in|on)\s+(january|february|march|april|may|june|july|august|september|october|november|december)\s*(\d{4})?/i;
  const dateMatch = input.match(datePattern);
  if (dateMatch) {
    const month = dateMatch[1];
    const year = dateMatch[2] || "2025";
    const monthIndex = new Date(`${month} 1, ${year}`).getMonth() + 1;
    const monthStr = monthIndex < 10 ? `0${monthIndex}` : `${monthIndex}`;
    const filteredEvents = eventsData.filter(event => event.date.startsWith(`${year}-${monthStr}`));
    if (filteredEvents.length > 0) {
      return `Here are the events happening in ${month} ${year}:<br>` + filteredEvents.map(event => `- ${event.title} on ${event.date} in ${event.location}`).join("<br>");
    } else {
      return `No events found for ${month} ${year}.`;
    }
  }

  // Check for tag-related queries
  const tagPattern = /(?:related to|tagged with)\s+["']?([\w\s]+)["']?/i;
  const tagMatch = input.match(tagPattern);
  if (tagMatch) {
    const tag = tagMatch[1].toLowerCase();
    const filteredEvents = eventsData.filter(event => event.tags.some(t => t.toLowerCase() === tag));
    if (filteredEvents.length > 0) {
      return `Events related to "${tag}":<br>` + filteredEvents.map(event => `- ${event.title} on ${event.date} in ${event.location}`).join("<br>");
    } else {
      return `No events found related to "${tag}".`;
    }
  }

  // Check for specific event inquiries
  for (let event of eventsData) {
    if (input.includes(event.title.toLowerCase())) {
      return `${event.title} is scheduled for ${event.date} in ${event.location}. Tags: ${event.tags.join(", ")}.`;
    }
  }

  // Check for adding events
  if (input.includes("add an event") || input.includes("submit an event")) {
    return `To add a new event, please click on the "Add Event" button located at the top right corner of the homepage and fill in the required details.`;
  }

  // General inquiries
  if (input.includes("website") || input.includes("site")) {
    return `This website allows users to browse and add events. Each event includes details such as title, date, location, and relevant tags.`;
  }

  return `I'm sorry, I didn't understand your question. Could you please rephrase?`;
}
