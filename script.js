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

    if (!toggle || !chatbot || !closeBtn || !input || !body) {
        console.log("Chat elements missing");
        return;
    }

    toggle.onclick = () => {
        chatbot.style.display = "flex";
    };

    closeBtn.onclick = () => {
        chatbot.style.display = "none";
    };

    input.addEventListener("keydown", function(e) {

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
        }, 600);
    }

    function generateSmartReply(message) {

        const responses = {

            greeting: [
                "Hello 👋 I'm Sangeet Shaw’s AI assistant. How can I help you today?",
                "Hi there! I can guide you about Sangeet’s projects, skills, and consulting approach.",
                "Welcome! Ask me anything about Sangeet’s AI, analytics, or business automation work."
            ],

            about: [
                "Sangeet Shaw is an AI-driven Business Analytics consultant focused on automation, financial modeling, and MSME digital transformation.",
                "He is a commerce student transitioning into AI & Business Analytics, preparing for CAT 2026.",
                "Sangeet combines finance, strategy, and AI to build structured, data-backed business systems."
            ],

            skills: [
                "His core skills include Business Analytics, Financial Modeling, Credit Risk Analysis, Automation using Google Sheets & Apps Script, and AI Strategy.",
                "He specializes in process automation, structured decision systems, and analytics-driven consulting.",
                "His expertise bridges finance, operations, and AI implementation."
            ],

            projects: [
                "He built a FIFO Inventory Intelligence System that automated stock deduction and improved reporting visibility.",
                "He developed a GST Billing Automation Engine integrating invoice generation, stock lookup, and dashboards.",
                "His projects focus on reducing manual errors and increasing operational efficiency."
            ],

            experience: [
                "He worked as an AI Transformation Consultant Intern at Tata iQ (Forge), analyzing credit delinquency risk.",
                "He completed Deloitte Australia’s Data Analytics Simulation focusing on risk analysis and dashboards.",
                "His experience centers around data-driven financial risk modeling."
            ],

            mba: [
                "He is preparing for CAT 2026 with a focus on Business Analytics, Strategy, and AI in Business.",
                "His long-term goal is to build scalable AI-driven consulting systems.",
                "He aims to combine MBA + CFA for strategic financial leadership."
            ],

            business: [
                "Improving business performance requires automation, financial clarity, and structured data tracking.",
                "Most businesses grow faster when manual processes are replaced with automated dashboards.",
                "The first step is identifying inefficiencies and designing system-based solutions."
            ],

            automation: [
                "Automation reduces human error and improves scalability.",
                "Sangeet builds automation systems using Google Sheets, Apps Script, and structured logic.",
                "Smart automation creates real-time visibility for decision making."
            ],

            finance: [
                "Financial improvement requires risk analysis, cash flow clarity, and disciplined capital allocation.",
                "Structured financial modeling enables better strategic decisions.",
                "Data-backed risk segmentation improves lending and credit decisions."
            ],

            unknown: [
                "That’s an interesting question. Sangeet would be happy to explore this in a deeper discussion.",
                "For advanced or personalized guidance, direct consultation would be best.",
                "This requires deeper strategic analysis. Feel free to contact Sangeet directly."
            ]
        };

        function randomPick(arr) {
            return arr[Math.floor(Math.random() * arr.length)];
        }

        if (message.includes("hello") || message.includes("hi")) {
            return randomPick(responses.greeting);
        }

        if (message.includes("who is") || message.includes("about sangeet")) {
            return randomPick(responses.about);
        }

        if (message.includes("skill")) {
            return randomPick(responses.skills);
        }

        if (message.includes("project")) {
            return randomPick(responses.projects);
        }

        if (message.includes("experience")) {
            return randomPick(responses.experience);
        }

        if (message.includes("mba") || message.includes("cat")) {
            return randomPick(responses.mba);
        }

        if (message.includes("business") || message.includes("improve") || message.includes("grow")) {
            return randomPick(responses.business);
        }

        if (message.includes("automation") || message.includes("automate")) {
            return randomPick(responses.automation);
        }

        if (message.includes("finance") || message.includes("investment")) {
            return randomPick(responses.finance);
        }

        return randomPick(responses.unknown);
    }

});
