const STORAGE_KEY = "professional-cv-builder:v2";
const LEGACY_STORAGE_KEY = "professional-cv-builder:v1";

const sampleData = {
  profile: {
    name: "Md. Rakibul Hasan",
    role: "Senior Full-Stack Mobile Engineer",
    email: "roxyhasan76@gmail.com",
    phone: "01315861003",
    location: "Dhaka, Bangladesh",
    portfolio: "https://rakibul-hr.vercel.app/",
    linkedin: "https://www.linkedin.com/in/rakibul001/",
    github: "https://github.com/Rakibul66",
    summary:
      "Forward-thinking Senior Mobile and Full-Stack Engineer specializing in intelligent, AI-driven digital products. Experienced in high-performance native and cross-platform applications using Flutter, Jetpack Compose, and SwiftUI, with scalable backend and web ecosystems including Firebase, Next.js, TypeScript, Vue.js, and Supabase.",
  },
  experience: [
    {
      title: "Flutter Developer",
      company: "Bponi",
      dates: "02/2025 - Present",
      description:
        "Building and maintaining production mobile products for business operations, payments, and digital commerce.",
    },
    {
      title: "Flutter Developer",
      company: "Devsnest LLC",
      dates: "10/2023 - 01/2025",
      description:
        "Managed Shopify app builder features, mobile delivery workflows, release support, and cross-platform product improvements.",
    },
    {
      title: "Android Developer",
      company: "Artificial Soft",
      dates: "03/2022 - 07/2023",
      description:
        "Delivered Android applications for a Bangladesh-based IT solutions company, with focus on reliability and production readiness.",
    },
  ],
  projects: [
    {
      name: "AYNA ePay",
      dates: "03/2026 - Present",
      link: "https://play.google.com/store/apps/details?id=com.ayna.epay",
      description: "Android payment product with production Play Store delivery.",
    },
    {
      name: "EDUAYNA HR",
      dates: "01/2026 - Present",
      link: "https://play.google.com/store/apps/details?id=com.eduayna.hr",
      description: "HR mobile application for operational employee workflows.",
    },
    {
      name: "Bponi Suite",
      dates: "01/2026 - Present",
      link: "https://apps.apple.com/us/app/bponi-suite/id6754082422",
      description: "iOS business suite application shipped to the App Store.",
    },
    {
      name: "Navidium Returns",
      dates: "08/2024 - 09/2024",
      link: "https://apps.apple.com/in/app/navidium-reverse-logistics/id6733242943",
      description: "Reverse logistics mobile app delivered for App Store release.",
    },
    {
      name: "Mo App Builder",
      dates: "03/2024 - Present",
      link: "https://apps.apple.com/in/app/mo-app-preview/id6504216980",
      description: "Preview companion app for a mobile app builder platform.",
    },
    {
      name: "Attendance Tracker",
      dates: "11/2022 - 02/2023",
      link: "",
      description:
        "Employee attendance tracker with live location tracking and multiple geofence workflows.",
    },
  ],
  skills: [
    "Flutter",
    "Android App Development",
    "Kotlin",
    "Android SDK",
    "Jetpack Compose",
    "SwiftUI",
    "Firebase",
    "Supabase",
    "Next.js",
    "TypeScript",
    "Payment Gateway",
    "iOS Deployment",
    "Git",
    "SaaS App",
  ],
  education: [
    {
      title: "B.Sc in Computer Science and Engineering",
      organization: "Varendra University",
      dates: "12/2017 - 01/2020",
      description: "Rajshahi",
    },
    {
      title: "Higher School Certificate, Science",
      organization: "Joypurhat Govt. College",
      dates: "01/2013 - 01/2015",
      description: "Joypurhat",
    },
  ],
  achievements: [
    {
      title: "Level 2 Author",
      organization: "Codecanyon",
      dates: "",
      description: "Recognized marketplace author achievement.",
    },
    {
      title: "Project Showcase 2020",
      organization: "Varendra University",
      dates: "12/2020",
      description: "3rd position in project showcase.",
    },
    {
      title: "Java Basic Certificate",
      organization: "HackerRank",
      dates: "",
      description:
        "Covered Java classes, data structures, inheritance, and exception handling.",
    },
    {
      title: "Mobile App Marketing and Growth Hacking",
      organization: "Udemy",
      dates: "10/2021",
      description: "Completed app marketing and growth certificate program.",
    },
  ],
  extra: ["English - 60/100", "Bangla - 60/100", "Travelling", "Cycling", "Books", "Technology"],
};

const emptyItems = {
  experience: { title: "", company: "", dates: "", description: "" },
  projects: { name: "", dates: "", link: "", description: "" },
  skills: "",
  education: { title: "", organization: "", dates: "", description: "" },
  achievements: { title: "", organization: "", dates: "", description: "" },
  extra: "",
};

const form = document.querySelector("#cvForm");
const preview = document.querySelector("#resumePreview");
const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".tab-panel");
let state = structuredClone(sampleData);
let saveTimer;

function structuredCloneFallback(value) {
  return JSON.parse(JSON.stringify(value));
}

function clone(value) {
  return typeof structuredClone === "function" ? structuredClone(value) : structuredCloneFallback(value);
}

function normalizeData(data) {
  if (data?.profile) {
    const base = clone(sampleData);
    return {
      ...base,
      profile: { ...base.profile, ...data.profile },
      experience: Array.isArray(data.experience) ? data.experience : base.experience,
      projects: Array.isArray(data.projects) ? data.projects : base.projects,
      skills: Array.isArray(data.skills) ? data.skills : base.skills,
      education: Array.isArray(data.education) ? data.education : base.education,
      achievements: Array.isArray(data.achievements) ? data.achievements : base.achievements,
      extra: Array.isArray(data.extra) ? data.extra : base.extra,
    };
  }

  if (!data || typeof data !== "object") return clone(sampleData);

  return {
    ...clone(sampleData),
    profile: {
      ...sampleData.profile,
      name: data.name || sampleData.profile.name,
      role: data.role || sampleData.profile.role,
      email: data.email || sampleData.profile.email,
      phone: data.phone || sampleData.profile.phone,
      location: data.location || sampleData.profile.location,
      portfolio: data.portfolio || sampleData.profile.portfolio,
      linkedin: data.linkedin || sampleData.profile.linkedin,
      github: data.github || sampleData.profile.github,
      summary: data.summary || sampleData.profile.summary,
    },
    experience: parseLegacyRows(data.experience, ["title", "company", "dates", "description"]),
    projects: parseLegacyRows(data.projects, ["name", "dates", "link", "description"]),
    skills: splitValues(data.skills, ","),
    education: parseLegacyRows(data.education, ["title", "organization", "dates", "description"]),
    achievements: splitValues(data.achievements, "\n").map((title) => ({
      title,
      organization: "",
      dates: "",
      description: "",
    })),
    extra: splitValues(data.extra, "\n"),
  };
}

function parseLegacyRows(value = "", keys) {
  return splitValues(value, "\n").map((line) => {
    const parts = line.split("|").map((part) => part.trim());
    return Object.fromEntries(keys.map((key, index) => [key, parts[index] || ""]));
  });
}

function splitValues(value = "", separator) {
  return value
    .split(separator)
    .map((item) => item.trim())
    .filter(Boolean);
}

function getStoredData() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY);
    return normalizeData(JSON.parse(stored));
  } catch {
    return clone(sampleData);
  }
}

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function createLink(value = "") {
  const raw = value.trim();
  const safe = escapeHtml(raw);
  if (!raw) return "";
  return raw.startsWith("http") ? `<a href="${safe}">${safe.replace(/^https?:\/\//, "")}</a>` : safe;
}

function setProfileForm() {
  Object.entries(state.profile).forEach(([key, value]) => {
    const field = form.elements[key];
    if (field) field.value = value;
  });
}

function updateProfileFromForm() {
  Object.keys(state.profile).forEach((key) => {
    const field = form.elements[key];
    if (field) state.profile[key] = field.value;
  });
}

function field(label, section, index, key, value, options = {}) {
  if (options.multiline) {
    return `
      <label>
        ${label}
        <textarea data-section="${section}" data-index="${index}" data-field="${key}" rows="${options.rows || 3}">${escapeHtml(value)}</textarea>
      </label>
    `;
  }

  return `
    <label>
      ${label}
      <input data-section="${section}" data-index="${index}" data-field="${key}" value="${escapeHtml(value)}" />
    </label>
  `;
}

function renderBlockList(section) {
  const list = document.querySelector(`[data-list="${section}"]`);
  if (!list) return;

  if (section === "skills" || section === "extra") {
    list.innerHTML = state[section]
      .map(
        (item, index) => `
          <div class="item-block compact-item">
            ${field(section === "skills" ? "Skill" : "Item", section, index, "value", item)}
            <button class="remove-button" data-remove="${section}" data-index="${index}" type="button" aria-label="Remove item">Remove</button>
          </div>
        `,
      )
      .join("");
    return;
  }

  list.innerHTML = state[section].map((item, index) => renderObjectBlock(section, item, index)).join("");
}

function renderObjectBlock(section, item, index) {
  const config = {
    experience: {
      title: "Role",
      fields: [
        ["Job title", "title"],
        ["Company", "company"],
        ["Dates", "dates"],
        ["Impact statement", "description", { multiline: true, rows: 3 }],
      ],
    },
    projects: {
      title: "Project",
      fields: [
        ["Project name", "name"],
        ["Dates", "dates"],
        ["Link", "link"],
        ["Result or scope", "description", { multiline: true, rows: 3 }],
      ],
    },
    education: {
      title: "Education",
      fields: [
        ["Degree or certificate", "title"],
        ["Institution", "organization"],
        ["Dates", "dates"],
        ["Location or note", "description"],
      ],
    },
    achievements: {
      title: "Achievement",
      fields: [
        ["Title", "title"],
        ["Organization", "organization"],
        ["Date", "dates"],
        ["Details", "description", { multiline: true, rows: 2 }],
      ],
    },
  }[section];

  return `
    <div class="item-block">
      <div class="item-block-header">
        <strong>${config.title} ${index + 1}</strong>
        <button class="remove-button" data-remove="${section}" data-index="${index}" type="button">Remove</button>
      </div>
      <div class="grid-two">
        ${config.fields
          .map(([label, key, options]) => field(label, section, index, key, item[key] || "", options))
          .join("")}
      </div>
    </div>
  `;
}

function renderEditorBlocks() {
  ["experience", "projects", "skills", "education", "achievements", "extra"].forEach(renderBlockList);
}

function saveDraft() {
  updateProfileFromForm();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function scheduleUpdate() {
  updateProfileFromForm();
  renderPreview();
  clearTimeout(saveTimer);
  saveTimer = setTimeout(saveDraft, 300);
}

function renderEntries(items, titleKey = "title", orgKey = "organization") {
  return items
    .filter((item) => item[titleKey] || item[orgKey] || item.dates || item.description)
    .map((item) => {
      const meta = [item[orgKey], item.dates].filter(Boolean).join(" • ");
      return `
        <div class="entry">
          <h4>${escapeHtml(item[titleKey] || "")}</h4>
          ${meta ? `<p class="entry-meta">${escapeHtml(meta)}</p>` : ""}
          ${item.description ? `<p>${escapeHtml(item.description)}</p>` : ""}
        </div>
      `;
    })
    .join("");
}

function renderProjects(items) {
  return items
    .filter((item) => item.name || item.dates || item.description || item.link)
    .map((item) => {
      const meta = [item.dates, item.link ? createLink(item.link) : ""].filter(Boolean).join(" • ");
      return `
        <div class="entry">
          <h4>${escapeHtml(item.name || "")}</h4>
          ${meta ? `<p class="entry-meta">${meta}</p>` : ""}
          ${item.description ? `<p>${escapeHtml(item.description)}</p>` : ""}
        </div>
      `;
    })
    .join("");
}

function renderList(items) {
  const listItems = items
    .filter(Boolean)
    .map((item) => `<li>${escapeHtml(item)}</li>`)
    .join("");
  return `<ul class="compact-list">${listItems}</ul>`;
}

function renderAchievementList(items) {
  const listItems = items
    .filter((item) => item.title || item.organization || item.description)
    .map((item) => {
      const meta = [item.organization, item.dates].filter(Boolean).join(" • ");
      const detail = [item.title, meta, item.description].filter(Boolean).join(" - ");
      return `<li>${escapeHtml(detail)}</li>`;
    })
    .join("");
  return `<ul class="compact-list">${listItems}</ul>`;
}

function renderSkills(items) {
  return items
    .filter(Boolean)
    .map((skill) => `<span>${escapeHtml(skill)}</span>`)
    .join("");
}

function renderPreview() {
  const data = state.profile;
  preview.innerHTML = `
    <header class="resume-header">
      <div>
        <h2 class="resume-name">${escapeHtml(data.name)}</h2>
        <p class="resume-role">${escapeHtml(data.role)}</p>
      </div>
      <ul class="contact-list">
        <li>${escapeHtml(data.email)}</li>
        <li>${escapeHtml(data.phone)}</li>
        <li>${escapeHtml(data.location)}</li>
        <li>${createLink(data.portfolio)}</li>
        <li>${createLink(data.linkedin)}</li>
        <li>${createLink(data.github)}</li>
      </ul>
    </header>
    <div class="resume-body">
      <div>
        <section class="resume-section">
          <h3>Profile</h3>
          <p class="summary">${escapeHtml(data.summary)}</p>
        </section>
        <section class="resume-section">
          <h3>Experience</h3>
          ${renderEntries(state.experience, "title", "company")}
        </section>
        <section class="resume-section">
          <h3>Selected Projects</h3>
          ${renderProjects(state.projects)}
        </section>
      </div>
      <aside class="side-column">
        <section class="resume-section">
          <h3>Core Skills</h3>
          <div class="skill-cloud">${renderSkills(state.skills)}</div>
        </section>
        <section class="resume-section">
          <h3>Education</h3>
          ${renderEntries(state.education)}
        </section>
        <section class="resume-section">
          <h3>Achievements</h3>
          ${renderAchievementList(state.achievements)}
        </section>
        <section class="resume-section">
          <h3>Languages and Interests</h3>
          ${renderList(state.extra)}
        </section>
      </aside>
    </div>
  `;
}

form.addEventListener("input", (event) => {
  const target = event.target;
  const { section, index, field: fieldName } = target.dataset;

  if (section) {
    const itemIndex = Number(index);
    if (section === "skills" || section === "extra") {
      state[section][itemIndex] = target.value;
    } else {
      state[section][itemIndex][fieldName] = target.value;
    }
  }

  scheduleUpdate();
});

form.addEventListener("click", (event) => {
  const addSection = event.target.closest("[data-add]")?.dataset.add;
  const removeButton = event.target.closest("[data-remove]");

  if (addSection) {
    state[addSection].push(clone(emptyItems[addSection]));
    renderBlockList(addSection);
    scheduleUpdate();
  }

  if (removeButton) {
    const section = removeButton.dataset.remove;
    const index = Number(removeButton.dataset.index);
    state[section].splice(index, 1);
    renderBlockList(section);
    scheduleUpdate();
  }
});

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.tab;
    tabs.forEach((item) => item.classList.toggle("active", item === tab));
    panels.forEach((panel) => panel.classList.toggle("active", panel.dataset.panel === target));
  });
});

document.querySelector("#saveDraft").addEventListener("click", saveDraft);
document.querySelector("#resetDraft").addEventListener("click", () => {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(LEGACY_STORAGE_KEY);
  state = clone(sampleData);
  setProfileForm();
  renderEditorBlocks();
  renderPreview();
  saveDraft();
});
document.querySelector("#printCv").addEventListener("click", () => {
  document.title = "";
  window.print();
});

window.addEventListener("beforeprint", () => {
  document.title = "";
});

state = getStoredData();
setProfileForm();
renderEditorBlocks();
renderPreview();
