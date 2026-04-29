import { portfolioData } from "@/data/portfolioData";

// ─── Helper ───────────────────────────────────────────────────────────────────
const has = (text, ...keywords) =>
  keywords.some((kw) => text.includes(kw));

// ─── Smart Response Engine ────────────────────────────────────────────────────
// No external API needed. Answers directly from portfolioData.
function generateReply(question) {
  const q = question.toLowerCase().trim();

  // ── Greetings ──────────────────────────────────────────────────────────────
  if (has(q, "hello", "hi", "hey", "salam", "assalam", "greet")) {
    return `Hello! 👋 I'm Hassan's AI Portfolio Assistant.\n\nYou can ask me about:\n• His projects\n• Skills & technologies\n• Services he offers\n• Education & background\n• How to contact him`;
  }

  // ── Projects ───────────────────────────────────────────────────────────────
  if (
    has(q, "project", "work", "built", "developed", "portfolio", "app",
        "website", "platform", "show", "list", "all project")
  ) {
    // Single project lookup
    const singleMatch = portfolioData.projects.find((p) =>
      q.includes(p.title.toLowerCase().split("|")[0].trim().toLowerCase()) ||
      q.includes(p.category.toLowerCase())
    );

    if (singleMatch) {
      const p = singleMatch;
      return [
        `📁 **${p.title}**`,
        `Category: ${p.category}`,
        `Status: ${p.status}${p.completedDate ? ` (${p.completedDate})` : ""}`,
        ``,
        `📝 ${p.shortDescription}`,
        ``,
        `🛠 Tech Stack: ${p.techStack.join(", ")}`,
        ``,
        `✨ Key Features:`,
        ...p.highlights.map((h) => `  • ${h}`),
        ``,
        `🔗 Live: ${p.liveUrl}`,
      ].join("\n");
    }

    // All projects list
    const list = portfolioData.projects
      .map(
        (p, i) =>
          `${i + 1}. **${p.title}**\n   Category: ${p.category} | Status: ${p.status}\n   🔗 ${p.liveUrl}`
      )
      .join("\n\n");
    return `Here are all of Hassan's projects:\n\n${list}`;
  }

  // ── Skills ─────────────────────────────────────────────────────────────────
  if (
    has(q, "skill", "technology", "technolog", "tech stack", "language",
        "framework", "tool", "know", "expertise", "proficient", "can use")
  ) {
    const skills = portfolioData.skills;
    const frontend = skills.filter((s) =>
      ["HTML", "CSS", "JavaScript", "TypeScript", "Tailwind CSS", "React.js",
       "Next.js", "Framer Motion", "Responsive Design"].includes(s)
    );
    const backend = skills.filter((s) =>
      ["Node.js", "Express.js", "MongoDB", "MySQL", "REST API Integration"].includes(s)
    );
    const tools = skills.filter((s) => ["Git"].includes(s));

    return [
      `💡 Hassan's Technical Skills:\n`,
      `🎨 Frontend:\n${frontend.map((s) => `  • ${s}`).join("\n")}`,
      ``,
      `⚙️ Backend & Database:\n${backend.map((s) => `  • ${s}`).join("\n")}`,
      ``,
      `🛠 Tools:\n${tools.map((s) => `  • ${s}`).join("\n")}`,
    ].join("\n");
  }

  // ── Services ───────────────────────────────────────────────────────────────
  if (
    has(q, "service", "offer", "provide", "help with", "do for",
        "what can", "what do", "hire")
  ) {
    const list = portfolioData.services
      .map((s) => `${s.id}. **${s.title}**\n   ${s.description}`)
      .join("\n\n");
    return `Here are the services Hassan offers:\n\n${list}`;
  }

  // ── Education ──────────────────────────────────────────────────────────────
  if (
    has(q, "education", "study", "degree", "university", "college",
        "school", "course", "aptech", "qualification", "studied")
  ) {
    const edu = portfolioData.education[0];
    return `🎓 **Education:**\n\n• ${edu.degree}\n• Institution: ${edu.institution}\n• Status: ${edu.status}`;
  }

  // ── Contact ────────────────────────────────────────────────────────────────
  if (
    has(q, "contact", "email", "reach", "github", "linkedin",
        "social", "connect", "touch", "message", "whatsapp")
  ) {
    const o = portfolioData.owner;
    return [
      `📬 How to reach Muhammad Hassan:\n`,
      `• 📧 Email: ${o.email}`,
      `• 💼 LinkedIn: ${o.linkedin}`,
      `• 🐙 GitHub: ${o.github}`,
    ].join("\n");
  }

  // ── About / Bio ────────────────────────────────────────────────────────────
  if (
    has(q, "who", "about", "bio", "background", "introduce",
        "tell me", "hassan", "muhammad", "developer", "experience",
        "available", "location", "pakistan", "years", "stat")
  ) {
    const o = portfolioData.owner;
    const s = o.stats;
    return [
      `👨‍💻 **${o.name}** — ${o.title}`,
      `📍 ${o.location} | ${o.availability}`,
      ``,
      o.bio,
      ``,
      `📊 At a Glance:`,
      `  • ${s.yearsExperience}+ Year of Experience`,
      `  • ${s.projectsDelivered} Projects Delivered`,
      `  • ${s.technicalSkills} Technical Skills`,
      `  • ${s.liveProjects} Live Projects`,
    ].join("\n");
  }

  // ── Availability / Hire ───────────────────────────────────────────────────
  if (has(q, "available", "freelance", "full-time", "fulltime", "job", "work with")) {
    return `✅ Hassan is currently **${portfolioData.owner.availability}**.\n\nYou can reach him at:\n• 📧 ${portfolioData.owner.email}\n• 💼 ${portfolioData.owner.linkedin}`;
  }

  // ── Specific project categories ───────────────────────────────────────────
  if (has(q, "ecommerce", "e-commerce", "shop", "store")) {
    const filtered = portfolioData.projects.filter((p) =>
      p.category.toLowerCase().includes("e-commerce") ||
      p.category.toLowerCase().includes("ecommerce")
    );
    if (filtered.length) {
      return (
        `🛒 E-Commerce Projects:\n\n` +
        filtered
          .map((p) => `• **${p.title}**\n  ${p.shortDescription}\n  🔗 ${p.liveUrl}`)
          .join("\n\n")
      );
    }
  }

  if (has(q, "real estate", "property", "dubai")) {
    const p = portfolioData.projects.find((p) =>
      p.category.toLowerCase().includes("real estate")
    );
    if (p) {
      return `🏠 **${p.title}**\n\n${p.shortDescription}\n\nTech: ${p.techStack.join(", ")}\n🔗 ${p.liveUrl}`;
    }
  }

  if (has(q, "haramain", "hajj", "umrah", "transport", "booking")) {
    const p = portfolioData.projects.find((p) =>
      p.title.toLowerCase().includes("haramain")
    );
    if (p) {
      return `🕌 **${p.title}**\n\n${p.shortDescription}\n\nTech: ${p.techStack.join(", ")}\n🔗 ${p.liveUrl}`;
    }
  }

  if (has(q, "pob", "blindness", "charity", "healthcare", "donation")) {
    const p = portfolioData.projects.find((p) =>
      p.title.toLowerCase().includes("pob")
    );
    if (p) {
      return `🏥 **${p.title}**\n\n${p.shortDescription}\n\nTech: ${p.techStack.join(", ")}\n🔗 ${p.liveUrl}`;
    }
  }

  // ── Tech-specific questions ────────────────────────────────────────────────
  if (has(q, "next.js", "nextjs", "react", "tailwind", "node", "mongodb", "express")) {
    const techQ = q.includes("next") ? "Next.js" :
                  q.includes("react") ? "React.js" :
                  q.includes("tailwind") ? "Tailwind CSS" :
                  q.includes("node") ? "Node.js" :
                  q.includes("mongo") ? "MongoDB" : "Express.js";

    const projectsUsingTech = portfolioData.projects.filter((p) =>
      p.techStack.some((t) => t.toLowerCase().includes(techQ.toLowerCase().split(".")[0]))
    );

    if (projectsUsingTech.length) {
      return (
        `Hassan uses **${techQ}** in ${projectsUsingTech.length} project(s):\n\n` +
        projectsUsingTech
          .map((p) => `• ${p.title} — ${p.category}`)
          .join("\n")
      );
    }
    return `Yes, Hassan works with ${techQ}. It's part of his core tech stack.`;
  }

  // ── Live URLs / Links ──────────────────────────────────────────────────────
  if (has(q, "live", "url", "link", "demo", "deployed", "visit")) {
    const list = portfolioData.projects
      .map((p) => `• ${p.title.split("|")[0].trim()}: ${p.liveUrl}`)
      .join("\n");
    return `🔗 Live project links:\n\n${list}`;
  }

  // ── Fallback ───────────────────────────────────────────────────────────────
  return `Not available\n\n💡 You can ask me about:\n• Projects\n• Skills & Technologies\n• Services\n• Education\n• Contact Information`;
}

// ─── POST Handler ─────────────────────────────────────────────────────────────
export async function POST(request) {
  try {
    const body = await request.json();
    const message = body?.message;

    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return Response.json({ error: "Message is required." }, { status: 400 });
    }

    const reply = generateReply(message.trim());
    return Response.json({ reply });
  } catch (error) {
    console.error("Chat API error:", error);
    return Response.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
