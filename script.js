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

async function loadHomeNews() {
  const newsContainer = document.getElementById("home-news-list");
  if (!newsContainer) return;

  try {
    const response = await fetch("news.html");
    if (!response.ok) {
      throw new Error(`Failed to load news: ${response.status}`);
    }

    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const newsItems = Array.from(doc.querySelectorAll(".news-list-item")).slice(0, 3);

    if (newsItems.length === 0) {
      newsContainer.innerHTML = `
        <div class="news-item">
          <div class="news-check">✓</div>
          <div>No news items found.</div>
        </div>
      `;
      return;
    }

    newsContainer.innerHTML = newsItems.map((item) => {
      const date = item.querySelector(".news-date")?.textContent?.trim() ?? "";
      const anchor = item.querySelector(".news-text a");
      const text = anchor?.textContent?.trim() ?? item.querySelector(".news-text")?.textContent?.trim() ?? "";
      const href = anchor?.getAttribute("href") ?? "news.html";

      return `
        <div class="news-item">
          <div class="news-check">✓</div>
          <div class="news-item-content">
            <div class="news-item-date">${date}</div>
            <a class="news-item-link" href="${href}" ${href === "news.html" ? "" : 'target="_blank" rel="noopener noreferrer"'}>
              ${text}
            </a>
          </div>
        </div>
      `;
    }).join("");
  } catch (error) {
    newsContainer.innerHTML = `
      <div class="news-item">
        <div class="news-check">✓</div>
        <div class="news-item-content">
          <div class="news-item-date">Notice</div>
          <a class="news-item-link" href="news.html">View the latest updates on the News page</a>
        </div>
      </div>
    `;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  createHeader();
  createFooter();
  loadHomeNews();
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
