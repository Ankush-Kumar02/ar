document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    // Form submissions
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            if (form.id === 'admissionForm') {
                const formData = new FormData(form);
                const data = { timestamp: new Date().toISOString() };
                formData.forEach((value, key) => data[key] = value);
                
                let apps = JSON.parse(localStorage.getItem('admissionApplications') || '[]');
                apps.push(data);
                localStorage.setItem('admissionApplications', JSON.stringify(apps));
                
                document.getElementById('formContainer').style.display = 'none';
                document.getElementById('formSuccess').style.display = 'block';
            } else if (form.id === 'loginForm') {
                const username = document.getElementById('username').value;
                const password = document.getElementById('password').value;
                if (username === 'parent' && password === 'demo123') {
                    localStorage.setItem('parentLoggedIn', 'true');
                    document.getElementById('loginContainer').style.display = 'none';
                    document.getElementById('dashboardContainer').style.display = 'block';
                } else {
                    alert('Invalid credentials! Demo: parent / demo123');
                }
            } else if (form.id === 'contactForm') {
                // Handle contact form
                const contactData = {
                    name: document.getElementById('contactName').value,
                    email: document.getElementById('contactEmail').value,
                    phone: document.getElementById('contactPhone').value,
                    message: document.getElementById('contactMessage').value,
                    timestamp: new Date().toISOString()
                };
                
                let messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
                messages.push(contactData);
                localStorage.setItem('contactMessages', JSON.stringify(messages));
                
                alert('Thank you! Your message has been sent successfully. We will contact you soon.');
                form.reset();
            } else {
                alert('Thank you! Your message has been sent.');
                form.reset();
            }
        });
    });

    // Logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('parentLoggedIn');
            const loginContainer = document.getElementById('loginContainer');
            const dashboardContainer = document.getElementById('dashboardContainer');
            if (loginContainer) loginContainer.style.display = 'block';
            if (dashboardContainer) dashboardContainer.style.display = 'none';
        });
    }

    // Check existing login
    const isLoggedIn = localStorage.getItem('parentLoggedIn');
    if (isLoggedIn === 'true' && document.getElementById('loginContainer')) {
        document.getElementById('loginContainer').style.display = 'none';
        document.getElementById('dashboardContainer').style.display = 'block';
    }

    // Load admin applications
    if (document.getElementById('applicationsList')) {
        loadAdminApplications();
    }

    function loadAdminApplications() {
        const noApps = document.getElementById('noApplications');
        const tableContainer = document.getElementById('applicationsTableContainer');
        let apps = JSON.parse(localStorage.getItem('admissionApplications') || '[]');
        
        if (apps.length === 0) {
            noApps.style.display = 'block';
            tableContainer.style.display = 'none';
            return;
        }
        
        noApps.style.display = 'none';
        tableContainer.style.display = 'block';
        
        let tableHTML = `
            <div style="overflow-x: auto;">
                <table style="width:100%;border-collapse:collapse;">
                    <thead>
                        <tr style="background: #0f4c75;color:white;">
                            <th style="padding:15px;text-align:left;">Date</th>
                            <th style="padding:15px;text-align:left;">Student Name</th>
                            <th style="padding:15px;text-align:left;">Class</th>
                            <th style="padding:15px;text-align:left;">Father's Name</th>
                            <th style="padding:15px;text-align:left;">Phone</th>
                            <th style="padding:15px;text-align:left;">Email</th>
                        </tr>
                    </thead>
                    <tbody>
        `;
        
        apps.forEach(app => {
            const date = new Date(app.timestamp).toLocaleDateString('en-IN');
            tableHTML += `
                <tr style="border-bottom:1px solid #eee;">
                    <td style="padding:12px;">${date}</td>
                    <td style="padding:12px;">${app.studentName || 'N/A'}</td>
                    <td style="padding:12px;">${app.classApplying || 'N/A'}</td>
                    <td style="padding:12px;">${app.fatherName || 'N/A'}</td>
                    <td style="padding:12px;">${app.phone || 'N/A'}</td>
                    <td style="padding:12px;">${app.email || 'N/A'}</td>
                </tr>
            `;
        });
        
        tableHTML += `</tbody></table></div>`;
        tableContainer.innerHTML = tableHTML;
    }

    // Clear admin applications
    document.getElementById('clearApplications')?.addEventListener('click', () => {
        if (confirm('Clear all applications?')) {
            localStorage.removeItem('admissionApplications');
            loadAdminApplications();
        }
    });

    // Sticky nav effect
    const nav = document.querySelector('.main-nav');
    if (nav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                nav.style.padding = '8px 0';
            } else {
                nav.style.padding = '15px 0';
            }
        });
    }

    // Counter animation for stats
    const counters = document.querySelectorAll('.counter');
    const speed = 200;
    
    const animateCounters = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const inc = target / speed;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(animateCounters, 10);
            } else {
                if (target === 98) counter.innerText = '98%';
                else if (target === 2500) counter.innerText = '2500+';
                else if (target === 150) counter.innerText = '150+';
                else if (target === 30) counter.innerText = '30+';
                else counter.innerText = target;
            }
        });
    };

    // Intersection observer for counter animation
    const statsSection = document.querySelector('.about-stats');
    if (statsSection) {
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                animateCounters();
                observer.unobserve(statsSection);
            }
        }, { threshold: 0.3 });
        observer.observe(statsSection);
    }
});
