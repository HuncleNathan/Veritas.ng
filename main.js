document.addEventListener('DOMContentLoaded', function() {
    
    // =============================================
    // Active Tab Highlighting - FIXED VERSION
    // =============================================
    function setActiveTab() {
        const pathParts = window.location.pathname.split('/');
        let currentPage = pathParts[pathParts.length - 1];
        
        if (!currentPage || currentPage === '') {
            currentPage = 'index.html';
        }
        
        const navLinks = document.querySelectorAll('.topbar-nav a');
        
        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            const linkPage = linkHref.split('/').pop();
            
            link.classList.remove('active');
            
            if (linkPage.toLowerCase() === currentPage.toLowerCase()) {
                link.classList.add('active');
            }
            
            if ((currentPage === '' || currentPage === 'index.html') && 
                (linkPage === 'index.html' || linkHref === './' || linkHref === '/')) {
                link.classList.add('active');
            }
        });
    }

    setActiveTab();
    
    document.querySelectorAll('.topbar-nav a').forEach(link => {
        link.addEventListener('click', function() {
            setTimeout(setActiveTab, 50);
        });
    });

    window.addEventListener('popstate', setActiveTab);


    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const topbarNav = document.getElementById('mainNavigation'); // Use the ID here!

    if (mobileMenuBtn && topbarNav) {
        mobileMenuBtn.addEventListener('click', () => {
            const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
            topbarNav.classList.toggle('active');
            mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
            
            // Toggle icon (from your previous example, if you want this)
            const icon = mobileMenuBtn.querySelector('i');
            if (topbarNav.classList.contains('active')) {
                icon.classList.remove('bi-list');
                icon.classList.add('bi-x-lg'); // Using bi-x-lg for an 'X' icon from Bootstrap Icons
            } else {
                icon.classList.remove('bi-x-lg');
                icon.classList.add('bi-list');
            }
        });

        // Close menu when a link is clicked
        document.querySelectorAll('.topbar-nav a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 1024) { // Only close if it's a mobile view
                    topbarNav.classList.remove('active');
                    mobileMenuBtn.setAttribute('aria-expanded', 'false');
                    // Reset icon
                    const icon = mobileMenuBtn.querySelector('i');
                    icon.classList.remove('bi-x-lg');
                    icon.classList.add('bi-list');
                }
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