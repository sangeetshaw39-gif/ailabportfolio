// ===== Typing Animation =====
const text = "AI & Business Analytics Consultant | Data → Decisions → Automation";
let index = 0;

function type() {
    if (index < text.length) {
        document.getElementById("typing").innerHTML = 
    text.substring(0, index) + "<span class='cursor'>|</span>";
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

document.addEventListener("DOMContentLoaded", function () {

    // =============================
    // 🔧 CORE ENGINE STATE
    // =============================

    let messageCount = 0;
    const messageLimit = 20;

    let memory = [];
    let analytics = {};
    let currentMode = "neutral"; // neutral | recruiter | business

    const toggle = document.getElementById("chat-toggle");
    const chatbot = document.getElementById("chatbot");
    const closeBtn = document.getElementById("close-chat");
    const input = document.getElementById("chat-input");
    const body = document.getElementById("chat-body");

    toggle.onclick = () => chatbot.style.display = "flex";
    closeBtn.onclick = () => chatbot.style.display = "none";

    // =============================
    // 🧠 INTENT DATABASE (Train Here)
    // =============================

    const intents = {
       recruiter: { weight: 4, words: ["hire","recruit","resume","cv","candidate","job","profile","internship","placement"] },
        business: { weight: 3, words: ["grow","scale","profit","expand","increase","improve","strategy"] },
        ai: { weight: 3, words: ["ai","automation","machine learning","digital","predictive"] },
        finance: { weight: 2, words: ["finance","cash flow","investment","risk","capital"] },
        about: { weight: 4, words: ["who is","about him","about sangeet","tell me about"] },
        skills: { weight: 2, words: ["skills","expertise","strength","capability"] },
        projects: { weight: 2, words: ["project","portfolio","work","built"] },
        experience: { weight: 2, words: ["experience","internship","worked"] },
        mba: { weight: 1, words: ["mba","cat","future","plan"] },
        greeting: { weight: 1, words: ["hello","hi","hey"] }
    };

    // =============================
    // 📚 KNOWLEDGE BASE (Modular)
    // =============================

    const knowledge = {

        profile:
            "Sangeet Shaw is an AI-driven Business Analytics consultant specializing in automation systems, financial modeling, and MSME digital transformation.",

        recruiterValue:
            "He combines structured analytical thinking, real automation systems, and financial intelligence frameworks — making him highly suited for analytics-driven roles.",

        businessFramework:
            "Business growth requires structured KPIs, automation of repetitive workflows, financial clarity, performance dashboards, and scalable operational systems.",

        aiFramework:
            "AI implementation begins by identifying inefficiencies, structuring clean data, and deploying automation or predictive decision systems.",

        financeFramework:
            "Financial optimization requires risk modeling, capital allocation clarity, and data-backed forecasting frameworks.",

        skills:
            "Core skills include Business Analytics, Financial Modeling, Credit Risk Analysis, Google Sheets Automation, Apps Script development, Tableau dashboards, and AI strategy.",

        projects:
            "Major projects include a FIFO Inventory Intelligence System and a GST Billing Automation Engine that reduced manual errors and improved reporting visibility.",

        experience:
            "Experience includes AI Transformation Internship at Tata iQ (Forge) and Deloitte Australia Data Analytics Simulation.",

        mba:
            "Preparing for CAT 2026 aiming for MBA in Business Analytics with focus on Strategy, AI integration, and digital transformation."
    };

    // =============================
    // 🎯 MODE DETECTION
    // =============================

    function detectMode(intent) {
        if (intent === "recruiter") currentMode = "recruiter";
        else if (intent === "business") currentMode = "business";
        else currentMode = "neutral";
    }

    // =============================
    // 🧮 WEIGHTED MULTI-INTENT CLASSIFIER
    // =============================

    function classify(message) {

        let scores = {};

        for (let key in intents) {
            scores[key] = 0;

            intents[key].words.forEach(word => {
                if (message.includes(word)) {
                    scores[key] += intents[key].weight;
                }
            });
        }

        let sorted = Object.entries(scores)
            .sort((a, b) => b[1] - a[1]);

        return {
            primary: sorted[0][1] > 0 ? sorted[0][0] : "unknown",
            confidence: sorted[0][1]
        };
    }

    // =============================
    // 🧠 CONTEXT ENGINE
    // =============================

    function applyContext(intent) {
        if (intent === "unknown" && memory.length > 0) {
            return memory[memory.length - 1].intent;
        }
        return intent;
    }

    // =============================
    // 🏗️ DYNAMIC ANSWER BUILDER
    // =============================

    function buildResponse(intent) {

        let tone = "";

        if (currentMode === "recruiter")
            tone = "From a recruiter perspective: ";

        if (currentMode === "business")
            tone = "From a business strategy standpoint: ";

        switch (intent) {

            case "about":
                return tone + knowledge.profile;

            case "recruiter":
                return tone + knowledge.recruiterValue;

            case "business":
                return tone + knowledge.businessFramework;

            case "ai":
                return tone + knowledge.aiFramework;

            case "finance":
                return tone + knowledge.financeFramework;

            case "skills":
                return tone + knowledge.skills;

            case "projects":
                return tone + knowledge.projects;

            case "experience":
                return tone + knowledge.experience;

            case "mba":
                return tone + knowledge.mba;

            case "greeting":
                return "Hello 👋 I am Sangeet Shaw’s Strategic AI Assistant. How can I assist you today?";

            default:
    return `
That requires deeper strategic discussion.

You can contact Sangeet Shaw directly:
📧 Email: sangeetshaw39@gmail.com
📞 Phone: +91 62894 77287
🔗 LinkedIn: linkedin.com/in/sangeet-shaw-753148348
`;

        }
    }

    // =============================
    // 📊 ANALYTICS TRACKING
    // =============================

    function track(intent) {
        analytics[intent] = (analytics[intent] || 0) + 1;
    }

    // =============================
    // 💬 CHAT PROCESSOR
    // =============================

    input.addEventListener("keypress", function (e) {

        if (e.key === "Enter") {

            const userText = input.value.trim().toLowerCase();
            if (!userText) return;

            body.innerHTML += `<p><strong>You:</strong> ${userText}</p>`;
            input.value = "";

            if (messageCount >= messageLimit) {
                body.innerHTML += `<p><strong>AI:</strong> Free interaction limit reached.

For advanced consulting and personalized solutions:

📧 sangeetshaw39@gmail.com
📞 +91 62894 77287
📸 Instagram: instagram.com/sangeetshaw_i
</p>`;
                body.scrollTop = body.scrollHeight;
                return;
            }

            let result = classify(userText);
            let finalIntent = applyContext(result.primary);

            detectMode(finalIntent);

            let reply = buildResponse(finalIntent);

            memory.push({
                question: userText,
                intent: finalIntent
            });

            track(finalIntent);

            body.innerHTML += `<p><strong>AI:</strong> ${reply}</p>`;
            body.innerHTML += `<p style="font-size:11px;opacity:0.4;">Confidence Score: ${result.confidence}</p>`;

            body.scrollTop = body.scrollHeight;

            messageCount++;
        }
    });

    // =============================
    // 🔄 SESSION RESET
    // =============================

    const resetBtn = document.createElement("button");
    resetBtn.innerText = "Reset";
    resetBtn.style.fontSize = "11px";
    resetBtn.style.marginLeft = "10px";
    document.getElementById("chat-header").appendChild(resetBtn);

    resetBtn.onclick = function () {
        memory = [];
        analytics = {};
        messageCount = 0;
        currentMode = "neutral";
        body.innerHTML = `<p><strong>AI:</strong> Session reset. How can I assist you?</p>`;
    };

});
const scrollBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
        scrollBtn.style.display = "block";
    } else {
        scrollBtn.style.display = "none";
    }
});

scrollBtn.onclick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
};
