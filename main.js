document.addEventListener('DOMContentLoaded', function() {
    // =============================================
    // Mobile Menu Toggle Functionality
    // =============================================
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const topHeader = document.querySelector('.top-header');
    const topbarNav = document.querySelector('.topbar-nav');
    
    if (mobileMenuBtn && topHeader && topbarNav) {
        const menuIcon = mobileMenuBtn.querySelector('i');
        
        // Set initial ARIA attributes
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        mobileMenuBtn.setAttribute('aria-controls', 'topbar-nav');
        topbarNav.setAttribute('aria-label', 'Main navigation');
        
        // Menu toggle function
        function toggleMenu() {
            const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
            
            // Toggle classes and attributes
            topHeader.classList.toggle('menu-open');
            topbarNav.classList.toggle('mobile-visible');
            mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
            
            // Toggle between hamburger and close icons
            if (!isExpanded) {
                menuIcon.classList.remove('bi-list');
                menuIcon.classList.add('bi-x');
                // Focus first menu item when opening
                setTimeout(() => {
                    const firstNavItem = topbarNav.querySelector('a');
                    if (firstNavItem) firstNavItem.focus();
                }, 100);
            } else {
                menuIcon.classList.remove('bi-x');
                menuIcon.classList.add('bi-list');
                // Return focus to menu button when closing
                mobileMenuBtn.focus();
            }
        }
        
        // Menu button click handler
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMenu();
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (topHeader.classList.contains('menu-open') && !topHeader.contains(e.target)) {
                toggleMenu();
            }
        });
        
        // Close menu when clicking on a link (for mobile)
        const navLinks = document.querySelectorAll('.topbar-nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 1024) {
                    toggleMenu();
                }
            });
        });
        
        // Close menu when pressing Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && topHeader.classList.contains('menu-open')) {
                toggleMenu();
            }
        });
    }

    // =============================================
    // Active Tab Highlighting - FIXED VERSION
    // =============================================
    function setActiveTab() {
        // Get current page filename (handles cases where path might be empty)
        const pathParts = window.location.pathname.split('/');
        let currentPage = pathParts[pathParts.length - 1];
        
        // Handle cases where URL might end with a slash
        if (!currentPage || currentPage === '') {
            currentPage = 'index.html';
        }
        
        const navLinks = document.querySelectorAll('.topbar-nav a');
        
        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            const linkPage = linkHref.split('/').pop();
            
            // Reset all links
            link.classList.remove('active');
            
            // Compare the filenames (case insensitive)
            if (linkPage.toLowerCase() === currentPage.toLowerCase()) {
                link.classList.add('active');
            }
            
            // Special case for index.html (matches both "" and "index.html")
            if ((currentPage === '' || currentPage === 'index.html') && 
                (linkPage === 'index.html' || linkHref === './' || linkHref === '/')) {
                link.classList.add('active');
            }
        });
    }

    // Initialize active tab on load
    setActiveTab();
    
    // Update active tab when navigating
    document.querySelectorAll('.topbar-nav a').forEach(link => {
        link.addEventListener('click', function() {
            // Small delay to allow potential page load
            setTimeout(setActiveTab, 50);
        });
    });

    // Update on browser back/forward navigation
    window.addEventListener('popstate', setActiveTab);

    // =============================================
    // Bootstrap Dropdown Initialization
    // =============================================
    var dropdownElements = [].slice.call(document.querySelectorAll('.dropdown-toggle'));
    dropdownElements.map(function (dropdownToggleEl) {
        return new bootstrap.Dropdown(dropdownToggleEl);
    });

    // =============================================
    // Tooltip Initialization (if using Bootstrap tooltips)
    // =============================================
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // =============================================
    // Card Interaction Handlers
    // =============================================
    const dashboardCards = document.querySelectorAll('.card');
    dashboardCards.forEach(card => {
        card.addEventListener('click', () => {
            const cardTitle = card.querySelector('.card-title')?.textContent || 'Untitled';
            console.log('Card clicked:', cardTitle.trim());
        });
    });

    // =============================================
    // Button Interaction Handlers
    // =============================================
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            if (button.getAttribute('type') !== 'submit') {
                e.preventDefault();
            }
            console.log('Button clicked:', button.textContent.trim());
        });
    });

    console.log('SchoolPass ERP Dashboard initialized');
});