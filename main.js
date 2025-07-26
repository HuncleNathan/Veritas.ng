document.addEventListener('DOMContentLoaded', function() {
   
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


    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const topbarNav = document.querySelector('.topbar-nav');

    if (mobileMenuBtn && topbarNav) {
        mobileMenuBtn.addEventListener('click', () => {
            const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
            topbarNav.classList.toggle('active');
            mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
        });

        // Close menu when a link is clicked
        document.querySelectorAll('.topbar-nav a').forEach(link => {
            link.addEventListener('click', () => {
                topbarNav.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            });
        });
    }

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