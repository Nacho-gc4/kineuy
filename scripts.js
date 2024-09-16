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
});