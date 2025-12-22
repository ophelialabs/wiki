// Initialize navbar functionality
function initNavbar() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const sidebar = document.getElementById('sidebar');

    if (!hamburger || !navLinks) {
        console.warn('Navbar elements not found.');
        return;
    }

    // Toggle mobile menu and sidebar
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        if (sidebar) {
            sidebar.classList.toggle('active');
        }
    });

    // Dropdown functionality for mobile
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        toggle.addEventListener('click', function(e) {
            // On mobile, toggle the dropdown
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            }
        });
    });

    // Close menu when a link is clicked
    const navItems = navLinks.querySelectorAll('a');
    navItems.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            if (sidebar) {
                sidebar.classList.remove('active');
            }
            dropdowns.forEach(d => d.classList.remove('active'));
        });
    });

    // Sidebar dropdown functionality
    const sidebarDropdowns = document.querySelectorAll('.sidebar .dropdown-item');
    sidebarDropdowns.forEach(item => {
        const toggle = item.querySelector('.sidebar-toggle');
        if (toggle) {
            toggle.addEventListener('click', function(e) {
                e.preventDefault();
                item.classList.toggle('active');
            });
        }
    });

    // Close menu when clicking sidebar links
    const sidebarLinks = document.querySelectorAll('.sidebar a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                if (sidebar) {
                    sidebar.classList.remove('active');
                }
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.navbar') && !event.target.closest('.sidebar')) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            if (sidebar) {
                sidebar.classList.remove('active');
            }
            dropdowns.forEach(d => d.classList.remove('active'));
            sidebarDropdowns.forEach(d => d.classList.remove('active'));
        }
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            if (sidebar) {
                sidebar.classList.remove('active');
            }
            dropdowns.forEach(d => d.classList.remove('active'));
            sidebarDropdowns.forEach(d => d.classList.remove('active'));
        }
    });
}

// Initialize sidebar functionality
function initSidebar() {
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('hamburger');
    const sidebarClose = document.getElementById('sidebarClose');
    const dropdownItems = document.querySelectorAll('.sidebar .dropdown-item');

    if (!sidebar) {
        console.warn('Sidebar not found.');
        return;
    }

    // Toggle sidebar on mobile (hamburger click)
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
    }

    // Close sidebar button
    if (sidebarClose) {
        sidebarClose.addEventListener('click', function() {
            sidebarClose.classList.toggle('active');
            sidebar.classList.toggle('active');
        });
    }

    // Sidebar dropdown functionality
    dropdownItems.forEach(item => {
        const toggle = item.querySelector('.sidebar-toggle');
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            item.classList.toggle('active');
        });
    });

    // Close sidebar when clicking a link on mobile
    const sidebarLinks = sidebar.querySelectorAll('a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('active');
                if (sidebarClose) {
                    sidebarClose.classList.remove('active');
                }
            }
        });
    });

    // Close sidebar when window is resized to desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            sidebar.classList.remove('active');
            if (sidebarClose) {
                sidebarClose.classList.remove('active');
            }
        }
    });
}
