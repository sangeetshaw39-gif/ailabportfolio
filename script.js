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

    input.addEventListener("keypress", async function(e) {

        if (e.key === "Enter") {

            const userMessage = input.value.trim();
            if (!userMessage) return;

            body.innerHTML += `<p><strong>You:</strong> ${userMessage}</p>`;
            input.value = "";

            try {

                const response = await fetch("/api/chat", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        message: userMessage,
                        count: messageCount
                    })
                });

                const data = await response.json();

                body.innerHTML += `<p><strong>AI:</strong> ${data.reply}</p>`;
                body.scrollTop = body.scrollHeight;

                messageCount++;

            } catch (error) {
                body.innerHTML += `<p><strong>AI:</strong> Something went wrong. Please contact Sangeet directly.</p>`;
            }
        }
    });

});
