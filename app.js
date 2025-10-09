const routes = {
  home: {
    title: "Home",
    file: "home.html"
  },
  dashboard: {
    title: "Dashboard",
    file: "dashboard.html"
  },
  "cloud-projects": {
    title: "Cloud Projects",
    file: "cloud-projects.html"
  },
  enterprise: {
    title: "Enterprise",
    file: "enterprise.html"
  },
  "ai-automation": {
    title: "AI & Automation",
    file: "ai-automation.html"
  },
  security: {
    title: "Security",
    file: "security.html"
  },
  documentation: {
    title: "Documentation",
    file: "documentation.html"
  }
};

function setActive(route) {
  document.querySelectorAll('.nav-menu a, .navbar-links a').forEach(a => {
    a.classList.toggle('active', a.dataset.route === route);
  });
}

function setupNavMenuListeners() {
  document.querySelectorAll('.nav-menu a, .navbar-links a').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      renderContent(a.dataset.route);
    });
  });
}

function renderContent(route) {
  const main = document.getElementById('main-content');
  fetch(routes[route].file)
    .then(response => response.text())
    .then(html => {
      main.innerHTML = html;
      setActive(route);
    });
}

function loadNavMenu() {
  fetch('nav-menu.html')
    .then(response => response.text())
    .then(html => {
      document.getElementById('nav-menu-placeholder').innerHTML = html;
      setupNavMenuListeners();
    });
}

function loadFooter() {
  fetch('footer.html')
    .then(response => response.text())
    .then(html => {
      document.getElementById('footer-placeholder').innerHTML = html;
    });
}

document.addEventListener('DOMContentLoaded', () => {
  fetch('nav.html')
    .then(response => response.text())
    .then(html => {
      document.getElementById('nav-placeholder').innerHTML = html;
      setupNavMenuListeners();
    });
  loadNavMenu();
  renderContent('home');
  loadFooter();
});

document.addEventListener('DOMContentLoaded', function() {
  // Hide all dropdown menus initially
  document.querySelectorAll('.dropdown-menu').forEach(function(menu) {
    menu.style.display = 'none';
  });

  // Add click event to dropdown toggles
  document.querySelectorAll('.dropdown-toggle').forEach(function(toggle) {
    toggle.addEventListener('click', function(e) {
      e.preventDefault();
      var parent = toggle.parentElement;
      var menu = parent.querySelector('.dropdown-menu');
      var isOpen = menu.style.display === 'block';

      // Close all dropdowns
      document.querySelectorAll('.dropdown-menu').forEach(function(m) {
        m.style.display = 'none';
      });

      // Toggle current dropdown
      menu.style.display = isOpen ? 'none' : 'block';
    });
  });

  // Optional: close dropdown if clicking outside nav-menu
  document.addEventListener('click', function(e) {
    var navMenu = document.querySelector('.nav-menu');
    if (!navMenu.contains(e.target)) {
      document.querySelectorAll('.dropdown-menu').forEach(function(menu) {
        menu.style.display = 'none';
      });
    }
  });
});