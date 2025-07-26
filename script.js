  // Mobile Menu Toggle
        const navbarToggler = document.querySelector('.navbar-toggler');
        const navbarCollapse = document.querySelector('.navbar-collapse');

        navbarToggler.addEventListener('click', function() {
            navbarCollapse.classList.toggle('active');
        });

        // Carousel Functionality
        const carousel = document.querySelector('.carousel');
        const carouselItems = document.querySelectorAll('.carousel-item');
        const carouselIndicators = document.querySelectorAll('.carousel-indicators button');
        const prevButton = document.querySelector('.carousel-control-prev');
        const nextButton = document.querySelector('.carousel-control-next');

        let currentSlide = 0;
        const totalSlides = carouselItems.length;

        // Initialize carousel
        function showSlide(index) {
            // Hide all slides
            carouselItems.forEach(item => {
                item.classList.remove('active');
            });
            
            // Deactivate all indicators
            carouselIndicators.forEach(indicator => {
                indicator.classList.remove('active');
            });
            
            // Show the current slide and activate its indicator
            carouselItems[index].classList.add('active');
            carouselIndicators[index].classList.add('active');
        }

        // Next slide
        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            showSlide(currentSlide);
        }

        // Previous slide
        function prevSlide() {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            showSlide(currentSlide);
        }

        // Event listeners for carousel controls
        prevButton.addEventListener('click', prevSlide);
        nextButton.addEventListener('click', nextSlide);

        // Event listeners for carousel indicators
        carouselIndicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                currentSlide = index;
                showSlide(currentSlide);
            });
        });

        // Auto-advance carousel
        let carouselInterval = setInterval(nextSlide, 5000);

        // Pause carousel on hover
        carousel.addEventListener('mouseenter', () => {
            clearInterval(carouselInterval);
        });

        // Resume carousel on mouse leave
        carousel.addEventListener('mouseleave', () => {
            carouselInterval = setInterval(nextSlide, 5000);
        });

        // Cart Functionality
        document.addEventListener('DOMContentLoaded', function() {
            // Initialize cart from localStorage
            let cart = JSON.parse(localStorage.getItem('techgharCart')) || [];
            
            // Update cart count
            updateCartCount();
            
            // Add to Cart button click event
            const addToCartButtons = document.querySelectorAll('.add-to-cart');
            addToCartButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const productId = parseInt(this.getAttribute('data-id'));
                    const productName = this.getAttribute('data-name');
                    const productPrice = parseFloat(this.getAttribute('data-price'));
                    const productCategory = this.getAttribute('data-category');
                    const productImage = this.getAttribute('data-image');
                    
                    // Check if product already exists in cart
                    const existingProductIndex = cart.findIndex(item => item.id === productId);
                    
                    if (existingProductIndex !== -1) {
                        // Product exists, increment quantity
                        cart[existingProductIndex].quantity += 1;
                    } else {
                        // Product doesn't exist, add to cart
                        cart.push({
                            id: productId,
                            name: productName,
                            price: productPrice,
                            category: productCategory,
                            image: productImage,
                            quantity: 1
                        });
                    }
                    
                    // Save cart to localStorage
                    localStorage.setItem('techgharCart', JSON.stringify(cart));
                    
                    // Update cart count
                    updateCartCount();
                    
                    // Show toast notification
                    showToast(`${productName} added to cart!`, 'success');
                });
            });
            
            // Function to update cart count
            function updateCartCount() {
                const cartCountElement = document.getElementById('cartCount');
                const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
                
                cartCountElement.textContent = totalItems;
                
                // Hide count if zero
                if (totalItems === 0) {
                    cartCountElement.style.display = 'none';
                } else {
                    cartCountElement.style.display = 'flex';
                }
            }
            
            // Function to show toast notification
            function showToast(message, type = 'info') {
                const toastContainer = document.getElementById('toastContainer');
                const toastId = 'toast-' + Date.now();
                
                const toast = document.createElement('div');
                toast.className = `toast ${type === 'success' ? 'toast-success' : ''}`;
                toast.id = toastId;
                
                toast.innerHTML = `
                    <div class="toast-icon">
                        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
                    </div>
                    <div class="toast-message">${message}</div>
                    <button class="toast-close" onclick="closeToast('${toastId}')">
                        <i class="fas fa-times"></i>
                    </button>
                `;
                
                toastContainer.appendChild(toast);
                
                // Auto close after 3 seconds
                setTimeout(() => {
                    closeToast(toastId);
                }, 3000);
            }
            
            // Make closeToast function global
            window.closeToast = function(toastId) {
                const toast = document.getElementById(toastId);
                if (toast) {
                    toast.style.animation = 'slideOut 0.3s ease-out forwards';
                    setTimeout(() => {
                        toast.remove();
                    }, 300);
                }
            };
        });

        // Initialize the carousel
        showSlide(currentSlide);



