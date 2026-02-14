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

document.addEventListener("DOMContentLoaded", function() {

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

    input.addEventListener("keypress", function(e) {

        if (e.key === "Enter") {

            const userText = input.value.trim();
            if (!userText) return;

            body.innerHTML += `<p><strong>You:</strong> ${userText}</p>`;
            input.value = "";

            if (messageCount >= messageLimit) {
                body.innerHTML += `<p><strong>AI:</strong> I've reached my free response limit 😊 For deeper consulting and advanced solutions, please contact Sangeet Shaw directly.</p>`;
                body.scrollTop = body.scrollHeight;
                return;
            }

            simulateThinking(() => {
                const reply = generateSmartReply(userText.toLowerCase());
                body.innerHTML += `<p><strong>AI:</strong> ${reply}</p>`;
                body.scrollTop = body.scrollHeight;
                messageCount++;
            });
        }
    });

    function simulateThinking(callback) {
        body.innerHTML += `<p><strong>AI:</strong> typing...</p>`;
        body.scrollTop = body.scrollHeight;

        setTimeout(() => {
            const typing = body.querySelector("p:last-child");
            if (typing) typing.remove();
            callback();
        }, 700);
    }

    function generateSmartReply(message) {

        if (message.includes("business")) {
            return "Improving business performance usually involves automation, structured financial tracking, and data-driven decision systems.";
        }

        if (message.includes("ai") || message.includes("automation")) {
            return "AI helps optimize decision-making, reduce manual errors, and improve operational efficiency when integrated strategically.";
        }

        if (message.includes("finance") || message.includes("investment")) {
            return "Financial improvement requires risk analysis, cash flow clarity, and disciplined capital allocation.";
        }

        if (message.includes("career") || message.includes("mba")) {
            return "Strategic career growth requires skill depth, analytical thinking, and consistent execution.";
        }

        if (message.includes("help") || message.includes("problem")) {
            return "Start by defining the problem clearly, identifying constraints, and applying structured data-based analysis.";
        }

        if (message.includes("technology") || message.includes("software")) {
            return "Technology should simplify operations, increase visibility, and create measurable efficiency gains.";
        }

        if (message.includes("marketing")) {
            return "Effective marketing combines positioning clarity, data insights, and consistent brand communication.";
        }

        if (message.includes("productivity")) {
            return "Productivity improves when systems replace manual repetition and metrics guide decisions.";
        }

        return "That’s an interesting question. A structured, data-driven approach is usually the best starting point.";
    }

});
