// Socket.IO connects to current origin
const socket = io();

const input = document.getElementById("m");
const sendBtn = document.getElementById("send-btn");
const attachBtn = document.getElementById("attach");
const copyBtn = document.getElementById("copy-link");
const themeBtn = document.getElementById("theme-toggle");
const moreBtn = document.getElementById("more");
const messages = document.getElementById("messages");
const typing = document.getElementById("typing");
const status = document.getElementById("status");

// Utilities
const nowTime = () => {
  const d = new Date();
  const hh = d.getHours().toString().padStart(2, "0");
  const mm = d.getMinutes().toString().padStart(2, "0");
  return `${hh}:${mm}`;
};

function createMessage(text, mine = false) {
  const li = document.createElement("li");
  li.className = `message ${mine ? "me" : "you"}`;

  const meta = document.createElement("div");
  meta.className = "meta";

  if (!mine) {
    const avatar = document.createElement("div");
    avatar.className = "avatar";
    meta.appendChild(avatar);
  } else {
    const who = document.createElement("span");
    who.textContent = "Kamu";
    meta.appendChild(who);
  }

  const time = document.createElement("span");
  time.className = "time";
  time.textContent = nowTime();
  meta.appendChild(time);

  const body = document.createElement("div");
  body.textContent = text;

  li.appendChild(meta);
  li.appendChild(body);
  messages.appendChild(li);
  messages.scrollTop = messages.scrollHeight;
}

// Typing indicator demo
let typingTimeout;
function showTyping(show = true) {
  typing.classList.toggle("hidden", !show);
  if (show) {
    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => typing.classList.add("hidden"), 1800);
  }
}

// Ripple interaction
function addRipple(el) {
  el.addEventListener("pointerdown", (e) => {
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--rx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--ry", `${e.clientY - rect.top}px`);
    el.classList.add("rippling");
  });
  el.addEventListener("pointerup", () => el.classList.remove("rippling"));
  el.addEventListener("pointerleave", () => el.classList.remove("rippling"));
}
document.querySelectorAll("[data-ripple]").forEach(addRipple);

// Send message
function sendMessage() {
  const text = input.value.trim();
  if (!text) return;
  socket.emit("chat message", text);
  createMessage(text, true);
  input.value = "";
}
sendBtn.addEventListener("click", sendMessage);
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendMessage();
});

// Fake attach
attachBtn.addEventListener("click", () => {
  showTyping(true);
  createMessage("Fitur lampiran segera hadir ✨", false);
});

// Copy link (tries to copy current origin)
copyBtn.addEventListener("click", async () => {
  const url = location.origin;
  try {
    await navigator.clipboard.writeText(url);
    status.textContent = "Link disalin!";
    status.className = "ok";
    setTimeout(() => { status.textContent = "Ready"; status.className = "ok"; }, 1200);
  } catch {
    alert(url);
  }
});

// Theme toggle (simple class flip using prefers-color-scheme)
themeBtn.addEventListener("click", () => {
  // Quick visual nudge
  document.body.animate([{ filter: "brightness(1)" }, { filter: "brightness(1.1)" }, { filter: "brightness(1)" }], {
    duration: 350, easing: "ease-out"
  });
});

// More button
moreBtn.addEventListener("click", () => {
  createMessage("Menu: QR share, rooms, reactions, pin, clear chat.", false);
});

// Socket events
socket.on("connect", () => {
  status.textContent = "Connected";
  status.className = "ok";
  createMessage("Terhubung ✅", false);
});

socket.on("disconnect", () => {
  status.textContent = "Disconnected";
  status.className = "bad";
  createMessage("Koneksi terputus ❌", false);
});

socket.on("chat message", (msg) => {
  showTyping(false);
  createMessage(msg, false);
});

// Simulate “other user typing” when you start typing
let notifyTypingCooldown = false;
input.addEventListener("input", () => {
  if (notifyTypingCooldown) return;
  notifyTypingCooldown = true;
  socket.emit("typing", { t: Date.now() });
  setTimeout(() => (notifyTypingCooldown = false), 1000);
});

// Optional: handle typing event from server (broadcast logic server-side)
socket.on("typing", () => showTyping(true));
