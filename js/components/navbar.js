const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const enquiryBtn = document.querySelector('.nav-enquiry-btn');
const nav = document.querySelector('nav');

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Enhanced scroll behavior for navbar
let lastScrollTop = 0;
const scrollThreshold = 100;
let scrollTimer = null;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (Math.abs(lastScrollTop - scrollTop) <= scrollThreshold) return;
    
    if (scrollTimer !== null) {
        clearTimeout(scrollTimer);
    }
    
    if (scrollTop > lastScrollTop) {
        nav.style.transform = 'translateY(-100%)';
    } else {
        nav.style.transform = 'translateY(0)';
        nav.style.opacity = '1';
    }
    
    lastScrollTop = scrollTop;
    
    scrollTimer = setTimeout(() => {
        if (scrollTop < 100) {
            nav.style.transform = 'translateY(0)';
            nav.style.opacity = '1';
        }
    }, 150);
});

// Enhanced button interactions and form initialization
if (enquiryBtn) {
    enquiryBtn.addEventListener('mouseenter', () => {
        enquiryBtn.style.transform = 'perspective(1000px) translateY(-2px) rotateX(5deg)';
    });

    enquiryBtn.addEventListener('mouseleave', () => {
        enquiryBtn.style.transform = 'perspective(1000px) translateY(0) rotateX(0)';
    });

    enquiryBtn.addEventListener('click', (e) => {
        const rect = enquiryBtn.getBoundingClientRect();
        
        enquiryBtn.style.transform = 'perspective(1000px) scale(0.95)';
        
        setTimeout(() => {
            enquiryBtn.style.transform = 'perspective(1000px) translateY(-2px) rotateX(5deg)';
        }, 200);

        // Attempt to find and initialize the form
        const formContainer = document.getElementById('contact-form-container');
        if (formContainer) {
            formContainer.style.display = 'block';
            if (typeof initializeForm === 'function' && !formContainer.dataset.initialized) {
                initializeForm();
                formContainer.dataset.initialized = 'true';
                console.log('Form initialized on enquiry button click');
            }
        } else {
            console.error('Contact form container not found');

            // Fallback: Inject form HTML if not present
            const fallbackFormHTML = `
                <div id="contact-form-container" style="display: none;">
                    <div class="form-container">
                        <div class="form-box">
                            <span class="close-btn">×</span>
                            <h2>Connect With Us</h2>
                            <p>Feel free to reach out to us for any additional information. Take a moment to fill out the form and we will promptly contact you.</p>
                            <form id="contact-form" action="https://api.web3forms.com/submit" method="POST">
                                <input type="hidden" name="access_key" value="984d2e76-789d-4165-bc38-c15b09e47f53">
                                <div class="form-row">
                                    <div class="form-group half">
                                        <label for="first-name">First Name <span class="required-asterisk">*</span></label>
                                        <input type="text" id="first-name" name="first_name" placeholder="First Name" required>
                                        <span class="error-message" id="first-name-error"></span>
                                    </div>
                                    <div class="form-group half">
                                        <label for="last-name">Last Name</label>
                                        <input type="text" id="last-name" name="last_name" placeholder="Last Name">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="email">Email <span class="required-asterisk">*</span></label>
                                    <input type="email" id="email" name="email" placeholder="xyz@gmail.com" required>
                                    <span class="error-message" id="email-error"></span>
                                </div>
                                <div class="form-group">
                                    <label for="phone">Phone Number <span class="required-asterisk">*</span></label>
                                    <input type="tel" id="phone" name="phone" class="phone-input" value="+91" placeholder="xxxxxxxxxx" required>
                                    <span class="error-message" id="phone-error"></span>
                                </div>
                                <div class="form-group">
                                    <label for="message">Describe about your project <span class="required-asterisk">*</span></label>
                                    <textarea id="message" name="message" placeholder="Leave us a message..." rows="4"></textarea>
                                    <span class="error-message" id="message-error"></span>
                                </div>
                                <div class="form-group">
                                    <label>Services Needed <span class="required-asterisk">*</span></label>
                                    <div class="checkbox-group">
                                        <label><input type="radio" name="services" value="architecture"> Architecture</label>
                                        <label><input type="radio" name="services" value="interior"> Interior</label>
                                    </div>
                                    <span class="error-message" id="services-error"></span>
                                </div>
                                <div class="form-row dropdown-row">
                                    <div class="form-group half">
                                        <label for="plot-input" id="plot-label">Type of Project <span class="required-asterisk">*</span></label>
                                        <input type="text" id="plot-input" name="plot" placeholder="Select any" required>
                                        <div id="plot-suggestions" class="suggestions">
                                            <ul>
                                                <li data-value="Residential">Residential</li>
                                                <li data-value="Commercial">Commercial</li>
                                                <li data-value="Hospitality">Hospitality</li>
                                                <li data-value="Institutional">Institutional</li>
                                                <li data-value="Industrial">Industrial</li>
                                            </ul>
                                        </div>
                                        <div id="plot-suggestions-interior" class="suggestions" style="display: none;">
                                            <ul>
                                                <li data-value="Villa">Villa</li>
                                                <li data-value="Apartment">Apartment</li>
                                            </ul>
                                        </div>
                                        <span class="error-message" id="plot-error"></span>
                                    </div>
                                    <div class="form-group half">
                                        <label for="date-input" id="date-label">When's it starting? <span class="required-asterisk">*</span></label>
                                        <input type="text" id="date-input" name="date" placeholder="Select any" required>
                                        <div id="date-suggestions" class="suggestions">
                                            <ul>
                                                <li data-value="immediately">Immediately</li>
                                                <li data-value="in-3-months">In 3 Months</li>
                                                <li data-value="in-6-months">In 6 Months</li>
                                                <li data-value="more-than-6-months">More than 6 Months</li>
                                            </ul>
                                        </div>
                                        <span class="error-message" id="date-error"></span>
                                    </div>
                                </div>
                                <div class="form-row dropdown-row">
                                    <div class="form-group half">
                                        <label for="build-site-input" id="build-site-label">Where's the build site? <span class="required-asterisk">*</span></label>
                                        <input type="text" id="build-site-input" name="build_site" placeholder="Type a district..." required>
                                        <div id="suggestions" class="suggestions">
                                            <!-- Options will be populated dynamically via JavaScript -->
                                        </div>
                                        <span class="error-message" id="build-site-error"></span>
                                    </div>
                                    <div class="form-group half">
                                        <label for="budget-input" id="budget-label">Choose a budget? <span class="required-asterisk">*</span></label>
                                        <input type="text" id="budget-input" name="budget" placeholder="Select any" required>
                                        <div id="budget-suggestions" class="suggestions">
                                            <ul>
                                                <li data-value="budget1">20L - 40L</li>
                                                <li data-value="budget2">40L - 60L</li>
                                                <li data-value="budget3">60L - 1Cr</li>
                                                <li data-value="budget4">1Cr - 2Cr</li>
                                                <li data-value="budget5">2Cr - 3Cr</li>
                                                <li data-value="budget6">Above 3Cr</li>
                                            </ul>
                                        </div>
                                        <div id="budget-suggestions-interior" class="suggestions" style="display: none;">
                                            <ul>
                                                <li data-value="1bhk">1BHK</li>
                                                <li data-value="2bhk">2BHK</li>
                                                <li data-value="3bhk">3BHK</li>
                                                <li data-value="4bhk">4BHK</li>
                                                <li data-value="5bhk">5BHK</li>
                                            </ul>
                                        </div>
                                        <span class="error-message" id="budget-error"></span>
                                    </div>
                                </div>
                                <button type="submit">Submit</button>
                            </form>
                            <p id="status" class="status"></p>
                        </div>
                    </div>
                    <div id="popup" class="popup">
                        <div class="popup-content">
                            <span class="popup-close">×</span>
                            <p id="popup-message"></p>
                        </div>
                    </div>
                </div>
            `;
            document.body.insertAdjacentHTML('beforeend', fallbackFormHTML);
            const newFormContainer = document.getElementById('contact-form-container');
            if (newFormContainer) {
                newFormContainer.style.display = 'block';
                if (typeof initializeForm === 'function' && !newFormContainer.dataset.initialized) {
                    initializeForm();
                    newFormContainer.dataset.initialized = 'true';
                    console.log('Form initialized from fallback HTML');
                }
            } else {
                console.error('Failed to inject fallback form');
                alert('Unable to load the enquiry form. Please try again later or contact support.');
            }
        }

        // Close function
        function closeForm() {
            const formContainer = document.getElementById('contact-form-container');
            if (formContainer) {
                formContainer.style.display = 'none';
                const overlay = document.querySelector('#form-overlay');
                if (overlay) {
                    overlay.remove(); // Immediately remove overlay
                    console.log('Overlay removed on close');
                }
                document.body.classList.remove('form-open');
                console.log('Form closed on ' + window.location.pathname);
            }
        }

        // Close on close button click
        const closeBtn = document.querySelector('.close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                closeForm();
                console.log('Close button clicked on ' + window.location.pathname);
            });
            console.log('Close button event listener added on ' + window.location.pathname);
        }

        // Close on overlay click with propagation prevention
        let overlay = document.querySelector('#form-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'form-overlay';
            overlay.style.position = 'fixed';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.width = '100%';
            overlay.style.height = '100%';
            overlay.style.background = 'rgba(0, 0, 0, 0.5)';
            overlay.style.zIndex = '999';
            overlay.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                closeForm();
                console.log('Overlay clicked on ' + window.location.pathname);
            }, { capture: true }); // Use capture phase to ensure event is caught
            document.body.appendChild(overlay);
            console.log('Overlay created and listener added on ' + window.location.pathname);
        } else {
            overlay.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                closeForm();
                console.log('Overlay clicked on existing overlay on ' + window.location.pathname);
            }, { capture: true }); // Use capture phase
            console.log('Overlay click event listener added to existing overlay on ' + window.location.pathname);
        }
    });
}