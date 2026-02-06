document.addEventListener("DOMContentLoaded", function() {

    
    let slideIndex = 1;
    const slides = document.getElementsByClassName("centershow");
    
    
    if (slides.length > 0) {
        showSlides(slideIndex);

        
        let autoSlide = setInterval(() => {
            plusSlides(1);
        }, 3000);

        
        window.plusSlides = function(n) {
            clearInterval(autoSlide); 
            showSlides(slideIndex += n);
            
            autoSlide = setInterval(() => plusSlides(1), 3000);
        }

        function showSlides(n) {
            let i;
            if (n > slides.length) {slideIndex = 1}
            if (n < 1) {slideIndex = slides.length}
            
            
            for (i = 0; i < slides.length; i++) {
                slides[i].classList.remove("active");
                slides[i].style.display = "none"; 
            }
            slides[slideIndex-1].classList.add("active");
            slides[slideIndex-1].style.display = "flex";
        }
    }

   
    const mainImage = document.querySelector('.main-image img');
    const thumbnails = document.querySelectorAll('.thumb-img');

    if (mainImage && thumbnails.length > 0) {
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', function() {
                
                thumbnails.forEach(t => t.classList.remove('active'));
                
                this.classList.add('active');
                
                
                const newSrc = this.querySelector('img').src;
                mainImage.style.opacity = '0'; 
                setTimeout(() => {
                    mainImage.src = newSrc;
                }, 200);
            });
        });
    }


    const qtyValue = document.querySelector('.qty-value');
    const decreaseBtn = document.querySelector('.qty-btn:first-child'); 
    const increaseBtn = document.querySelector('.qty-btn:last-child');  

    if (qtyValue && decreaseBtn && increaseBtn) {
        decreaseBtn.addEventListener('click', () => {
            let val = parseInt(qtyValue.innerText);
            if (val > 1) qtyValue.innerText = val - 1;
        });

        increaseBtn.addEventListener('click', () => {
            let val = parseInt(qtyValue.innerText);
            qtyValue.innerText = val + 1;
        });
    }


    const sizeBtns = document.querySelectorAll('.size-tag, .size-btn'); 
    if (sizeBtns.length > 0) {
        sizeBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                
                const siblings = this.parentElement.querySelectorAll('.size-tag, .size-btn');
                siblings.forEach(s => s.classList.remove('active'));
            
                this.classList.add('active');
            });
        });
    }

    
    const colorOptions = document.querySelectorAll('.color-option, .color-circle');
    if (colorOptions.length > 0) {
        colorOptions.forEach(color => {
            color.addEventListener('click', function() {
                
                const siblings = this.parentElement.querySelectorAll('.color-option, .color-circle');
                siblings.forEach(c => {
                    c.classList.remove('active');
                    
                    let icon = c.querySelector('i');
                    if(icon) icon.style.display = 'none';
                });

                
                this.classList.add('active');
                let icon = this.querySelector('i');
                if(icon) icon.style.display = 'block';
            });
        });
    }

ل
    const filterBtn = document.querySelector('.filter-toggle-btn'); 
    const sidebar = document.querySelector('.sidebar');
    
    if (filterBtn && sidebar) {
        filterBtn.addEventListener('click', () => {
            sidebar.classList.toggle('open'); 
        });
    }
});

document.addEventListener("DOMContentLoaded", function() {
    
        function updateCartTotal() {
            let subtotal = 0;
            const cartItems = document.querySelectorAll('.cart-item');
            
            cartItems.forEach(item => {
                const priceText = item.querySelector('.product-price').innerText.replace('$', '');
                const price = parseFloat(priceText);
                const quantity = parseInt(item.querySelector('.qty-num').innerText);
                subtotal += price * quantity;
            });

            // حساب القيم
            const discountPercent = 0.20; 
            const discountAmount = subtotal * discountPercent;
            const deliveryFee = 15;
            const total = subtotal - discountAmount + deliveryFee;

            
            document.getElementById('subtotal').innerText = '$' + subtotal.toFixed(0);
            document.getElementById('discount').innerText = '-$' + discountAmount.toFixed(0);
            document.getElementById('total').innerText = '$' + total.toFixed(0);
        }

        
        document.querySelectorAll('.qty-btn-c').forEach(btn => {
            btn.addEventListener('click', function() {
                const isPlus = this.classList.contains('plus');
                const qtySpan = this.parentElement.querySelector('.qty-num');
                let currentQty = parseInt(qtySpan.innerText);

                if (isPlus) {
                    qtySpan.innerText = currentQty + 1;
                } else {
                    if (currentQty > 1) {
                        qtySpan.innerText = currentQty - 1;
                    }
                }
                updateCartTotal(); 
            });
        });

        
        document.querySelectorAll('.delete-icon').forEach(icon => {
            icon.addEventListener('click', function() {
                const item = this.closest('.cart-item');
                item.remove();
                updateCartTotal(); 
            });
        });
        
        
        updateCartTotal();
    });