// ===== Typing Animation =====
const text = "AI-Driven Business Analytics & Automation Consultant";
let index = 0;

function type() {
    if (index < text.length) {
        document.getElementById("typing").innerHTML += text.charAt(index);
        index++;
        setTimeout(type, 40);
    }
}

window.onload = function() {
    type();
};


// ===== Particles Background =====
particlesJS("particles-js", {
  particles: {
    number: { value: 90 },
    color: { value: "#00f5ff" },
    shape: { type: "circle" },
    opacity: { value: 0.6 },
    size: { value: 3 },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#00f5ff",
      opacity: 0.4,
      width: 1
    },
    move: {
      enable: true,
      speed: 2,
      direction: "none",
      out_mode: "bounce"
    }
  }
});
// Hide Loader After 2 Seconds
setTimeout(() => {
    const loader = document.getElementById("loader");
    loader.style.opacity = "0";
    loader.style.pointerEvents = "none";

    setTimeout(() => {
        loader.style.display = "none";
    }, 500);

}, 2000);

// Scroll Reveal
const reveals = document.querySelectorAll(".reveal");

window.addEventListener("scroll", () => {
    reveals.forEach((element) => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop < windowHeight - 100) {
            element.classList.add("active");
        }
    });
});
// Navbar Shrink on Scroll
window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    }
});

let messageCount = 0;
const messageLimit = 5;

const toggle = document.getElementById("chat-toggle");
const chatbot = document.getElementById("chatbot");
const closeBtn = document.getElementById("close-chat");
const input = document.getElementById("chat-input");
const body = document.getElementById("chat-body");

toggle.onclick = () => {
    chatbot.style.display = "flex";
};

closeBtn.onclick = () => {
    chatbot.style.display = "none";
};

document.addEventListener("DOMContentLoaded", function() {

    let messageCount = 0;
    const messageLimit = 5;

    const toggle = document.getElementById("chat-toggle");
    const chatbot = document.getElementById("chatbot");
    const closeBtn = document.getElementById("close-chat");
    const input = document.getElementById("chat-input");
    const body = document.getElementById("chat-body");

    if (!toggle) return;

    toggle.onclick = () => {
        chatbot.style.display = "flex";
    };

    closeBtn.onclick = () => {
        chatbot.style.display = "none";
    };

    input.addEventListener("keypress", function(e) {
        if (e.key === "Enter") {
            const userMessage = input.value.trim();
            if (!userMessage) return;

            body.innerHTML += `<p><strong>You:</strong> ${userMessage}</p>`;
            input.value = "";

            if (messageCount >= messageLimit) {
                body.innerHTML += `
                <p><strong>AI:</strong> I've reached my response limit 😊<br>
                For deeper problem-solving, contact <strong>Sangeet Shaw</strong> directly.</p>`;
                return;
            }

            messageCount++;

            let response = "Sangeet would be happy to discuss this further.";

            const msg = userMessage.toLowerCase();

            if (msg.includes("project")) {
                response = "He built FIFO automation & GST billing systems for MSMEs.";
            } else if (msg.includes("experience")) {
                response = "AI Transformation Intern at Tata iQ and Deloitte Analytics simulation.";
            } else if (msg.includes("skill")) {
                response = "Business Analytics, Automation, Financial Modeling, AI strategy.";
            }

            body.innerHTML += `<p><strong>AI:</strong> ${response}</p>`;
            body.scrollTop = body.scrollHeight;
        }
    });

});
