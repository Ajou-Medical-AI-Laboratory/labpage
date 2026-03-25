const siteTitle = "AJOU MEDICAL AI LABORATORY";

const navItems = [
  { label: "Home", href: "index.html" },
  { label: "Research", href: "research.html" },
  { label: "Project", href: "project.html" },
  { label: "Publications", href: "publications.html" },
  { label: "Team", href: "team.html" },
  { label: "Join Us", href: "joinus.html" },
  { label: "News", href: "news.html" }
];

function getCurrentPage() {
  const path = window.location.pathname.split("/").pop();
  return path === "" ? "index.html" : path;
}

function createHeader() {
  const currentPage = getCurrentPage();

  const header = document.getElementById("site-header");
  if (!header) return;

  const navHtml = navItems.map(item => {
    const isActive =
      item.href === currentPage ||
      (currentPage === "index.html" && item.href === "index.html");

    return `
      <a href="${item.href}" class="${isActive ? "active" : ""}">
        ${item.label}
      </a>
    `;
  }).join("");

  header.innerHTML = `
    <div class="container nav-wrap">
      <a href="index.html" class="site-logo">${siteTitle}</a>
      <nav class="main-nav">
        ${navHtml}
      </nav>
    </div>
  `;
}

function createFooter() {
  const footer = document.getElementById("site-footer");
  if (!footer) return;

  footer.innerHTML = `
    <div class="container footer-wrap">
      <p>© 2026 Ajou Medical AI Laboratory. All rights reserved.</p>
      <p>Email: jsclinic.naver.com</p>
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  createHeader();
  createFooter();
});

const revealElements = document.querySelectorAll(".reveal");

function revealOnScroll() {
  const triggerPoint = window.innerHeight * 0.85;

  revealElements.forEach((element) => {
    const rect = element.getBoundingClientRect();
    const elementTop = rect.top;

    // 화면 안으로 들어오면 나타남
    if (elementTop < triggerPoint) {
      element.classList.add("show");
    }

    // 아직 화면 아래에 있는 요소만 다시 숨김
    if (elementTop > window.innerHeight) {
      element.classList.remove("show");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);
