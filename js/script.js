// ========== LANGUAGE SWITCHER ==========

const langButtons = document.querySelectorAll('.lang-btn');
const elementsWithTranslations = document.querySelectorAll('[data-en][data-ru]');

let currentLang = localStorage.getItem('language') || 'en';
setLanguage(currentLang);

langButtons.forEach(button => {
    button.addEventListener('click', function() {
        currentLang = this.dataset.lang;
        setLanguage(currentLang);
        localStorage.setItem('language', currentLang);
        
        langButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
    });
});

function setLanguage(lang) {

elementsWithTranslations.forEach(el => {

const text = el.dataset[lang];

if(text){

el.innerHTML=text;

}

});

updateCVLanguage(lang);

}
// ========== DARK MODE ========== 

const themeBtn = document.getElementById('themeBtn');
const isDarkMode = localStorage.getItem('darkMode') === 'true';

if (isDarkMode) {
    document.body.classList.add('dark-mode');
    themeBtn.textContent = '◗';
}

themeBtn.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDark);
    themeBtn.textContent = isDark ? '◖' : '◗';
});

// ========== SMOOTH SCROLL ========== 

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// ========== SCROLL ANIMATIONS ==========

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.project-item, .activity-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

const infoBtn = document.getElementById('infoBtn');
const infoPanel = document.getElementById('infoPanel');

infoBtn.addEventListener('click', () => {

    infoPanel.classList.toggle('active');

});

infoPanel.addEventListener('click', (e) => {

    if (e.target === infoPanel) {

        infoPanel.classList.remove('active');

    }

});
const copyEmail = document.getElementById("copyEmail");
const copyMessage = document.getElementById("copyMessage");

function setupCopyEmail(buttonId, messageId) {

    const button = document.getElementById(buttonId);
    const message = document.getElementById(messageId);

    if (!button) return;

    button.addEventListener("click", () => {

        navigator.clipboard.writeText("rakhshonamakhkamova@gmail.com");

        if (message) {
            message.style.opacity = "1";

            setTimeout(() => {
                message.style.opacity = "0";
            }, 1500);
        }

    });

}

setupCopyEmail("copyEmail", "copyMessage");
setupCopyEmail("footerCopyEmail", "footerCopyMessage");

document.querySelectorAll("img").forEach(img => {

    img.addEventListener("contextmenu", function(e){

        e.preventDefault();

    });

});



document.querySelectorAll("img").forEach(img => {

    img.setAttribute("draggable","false");

});

document.addEventListener("copy",function(e){

    if(window.getSelection().anchorNode &&
       window.getSelection().anchorNode.parentElement.tagName==="IMG"){

        e.preventDefault();

    }

});
// ========== DRAG TO SCROLL GALLERY ==========

const galleryWrapper = document.querySelector('.gallery-wrapper');

if (galleryWrapper) {
    let isDown = false;
    let startX;
    let scrollLeft;

    galleryWrapper.addEventListener('mousedown', (e) => {
        isDown = true;
        galleryWrapper.classList.add('dragging');
        startX = e.pageX - galleryWrapper.offsetLeft;
        scrollLeft = galleryWrapper.scrollLeft;
    });

    galleryWrapper.addEventListener('mouseleave', () => {
        isDown = false;
        galleryWrapper.classList.remove('dragging');
    });

    galleryWrapper.addEventListener('mouseup', () => {
        isDown = false;
        galleryWrapper.classList.remove('dragging');
    });

    galleryWrapper.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        
        const x = e.pageX - galleryWrapper.offsetLeft;
        const walk = (x - startX) * 1.5;  /* множитель скорости */
        galleryWrapper.scrollLeft = scrollLeft - walk;
    });
}

/* ===========================
   PROJECT FILTER
=========================== */

const filters = document.querySelectorAll(".filter-link");
const cards = document.querySelectorAll(".project-card");

filters.forEach(filter => {

    filter.addEventListener("click", function(e){

        e.preventDefault();

        filters.forEach(link => link.classList.remove("active"));

        this.classList.add("active");

        const category = this.dataset.filter;

        cards.forEach(card => {

            if(category === "all"){

                card.style.display = "flex";

            }

            else if(card.dataset.category.includes(category)){

                card.style.display = "flex";

            }

            else{

                card.style.display = "none";

            }

        });

    });

});

/* ===========================
   CV LANGUAGE
=========================== */

function updateCVLanguage(lang){

    const image = document.getElementById("cvImage");
    const button = document.getElementById("downloadCV");

    if(!image || !button) return;

    if(lang === "ru"){

        image.src="../images/images/cv/ru.jpg";

        button.href="../images/images/cv/ru.pdf";

        button.innerHTML="Скачать резюме";

    }

    else{

        image.src="../images/images/cv/en.jpg";

        button.href="../images/images/cv/en.pdf";

        button.innerHTML="Download CV";

    }

}


