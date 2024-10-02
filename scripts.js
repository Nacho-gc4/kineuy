document.addEventListener('DOMContentLoaded', function () {
    const giftCards = document.querySelectorAll('.gift-card');
    const customAmountInput = document.querySelector('.gift-card.custom input');
    const buyNowButton = document.querySelector('.cta-button');

    let selectedAmount = null;

    if (giftCards.length > 0) {
        giftCards.forEach(card => {
            card.addEventListener('click', function () {
                if (!this.classList.contains('custom')) {
                    giftCards.forEach(c => c.classList.remove('selected'));
                    this.classList.add('selected');
                    selectedAmount = this.dataset.amount;
                }
            });
        });
    }

    if (customAmountInput) {
        customAmountInput.addEventListener('input', function () {
            giftCards.forEach(c => c.classList.remove('selected'));
            selectedAmount = this.value;
        });
    }

    if (buyNowButton) {
        buyNowButton.addEventListener('click', function () {
            if (selectedAmount) {
                alert(`Thank you for purchasing a $${selectedAmount} gift certificate!`);
                // Here you would typically redirect to a checkout page or open a modal
            } else {
                alert('Please select a gift amount before proceeding.');
            }
        });
    }

    // Simple testimonial slider
    const testimonials = document.querySelectorAll('.testimonial');
    let currentTestimonial = 0;

    function showNextTestimonial() {
        if (testimonials.length > 0) {
            testimonials[currentTestimonial].style.display = 'none';
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            testimonials[currentTestimonial].style.display = 'block';
        }
    }

    if (testimonials.length > 0) {
        setInterval(showNextTestimonial, 5000); // Change testimonial every 5 seconds
    }

    // Automatic cycling of comments
    const comments = document.querySelectorAll('.comment');
    let currentCommentIndex = 0;

    function showNextComment() {
        if (comments.length > 0) {
            const currentComment = comments[currentCommentIndex];
            const nextCommentIndex = (currentCommentIndex + 1) % comments.length;
            const nextComment = comments[nextCommentIndex];

            currentComment.classList.remove('active');

            setTimeout(() => {
                nextComment.classList.add('active');
                currentCommentIndex = nextCommentIndex;
            }, 500); // This should match the transition duration in CSS
        }
    }

    // Start cycling comments when the page loads
    if (comments.length > 0) {
        // Set the first comment as active initially
        comments[0].classList.add('active');
        // Start the interval after a delay
        setTimeout(() => {
            setInterval(showNextComment, 5000); // Change comment every 5 seconds
        }, 5000); // Wait 5 seconds before starting the rotation
    }

    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxVideo = document.getElementById('lightbox-video');
    const close = document.querySelector('.close');
    const prev = document.querySelector('.prev');
    const next = document.querySelector('.next');
    let currentIndex = 0;

    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentIndex = index;
            updateLightbox();
            lightbox.style.display = 'block';
        });
    });

    close.addEventListener('click', () => {
        lightbox.style.display = 'none';
        lightboxVideo.pause();
    });

    prev.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
        updateLightbox();
    });

    next.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % galleryItems.length;
        updateLightbox();
    });

    function updateLightbox() {
        const item = galleryItems[currentIndex].firstElementChild;
        if (item.tagName === 'IMG') {
            lightboxImg.src = item.src;
            lightboxImg.style.display = 'block';
            lightboxVideo.style.display = 'none';
        } else if (item.tagName === 'VIDEO') {
            lightboxVideo.src = item.querySelector('source').src;
            lightboxVideo.style.display = 'block';
            lightboxImg.style.display = 'none';
        }
    }

    const testimonialData = [
        {
            author: "Milagros F.",
            content: "Excelente profesional, usó buenas técnicas para aliviarme el dolor del gemelo derecho. En cuanto al consultorio es precioso, lindo ambiente y agradable. Lo recomiendo.",
            rating: 5,
            date: "2024-08-18",
        },
        {
            author: "Martina N.",
            content: "Buen profesional Brian, muy buenas sus explicaciones y abordaje, me ayudo a calmar mi dolor.",
            rating: 5,
            date: "2024-07-29",
        },
        {
            author: "Sofia B.",
            content: "Muy profesional, excelente atención. Muy buenos los masajes, alivió mucho el dolor en los hombros y cuello, recomendado.",
            rating: 5,
            date: "2024-05-21",
        },
        
    ];

    // Función para generar estrellas HTML
    function generateStars(rating) {
        return Array(5).fill().map((_, i) => `
            <span class="star ${i < rating ? 'filled' : ''}">★</span>
        `).join('');
    }

    // Función para formatear la fecha
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('es-ES', options);
    }

    // Generar HTML para los testimonios
    const testimonialHTML = testimonialData.map(testimonial => `
        <div class="testimonial-card">
            <div class="testimonial-content">
                <div class="star-rating">${generateStars(testimonial.rating)}</div>
                <p>"${testimonial.content}"</p>
            </div>
            <div class="testimonial-author">
                <div>
                    <p class="author-name">${testimonial.author}</p>
                    <p class="testimonial-date">${formatDate(testimonial.date)}</p>
                </div>
            </div>
        </div>
    `).join('');

    // Insertar los testimonios en el DOM
    document.querySelector('.testimonial-grid').innerHTML = testimonialHTML
});