/* =========================================================
   MOBILE & ENTERPRISE PLATFORMS
   PRESENTATION CONTROLLER
========================================================= */


document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const slides =
        Array.from(document.querySelectorAll(".slide"));

    const nextBtn =
        document.getElementById("nextBtn");

    const prevBtn =
        document.getElementById("prevBtn");

    const dotsContainer =
        document.getElementById("dots");

    const currentSlide =
        document.getElementById("currentSlide");

    const totalSlides =
        document.getElementById("totalSlides");

    const progressBar =
        document.getElementById("progressBar");

    const transitionScreen =
        document.getElementById("transitionScreen");

    const transitionNumber =
        document.getElementById("transitionNumber");

    const transitionTitle =
        document.getElementById("transitionTitle");

    const restartBtn =
        document.getElementById("restartBtn");


    /* =====================================================
       VARIABLES
    ===================================================== */

    let currentIndex = 0;

    let isAnimating = false;

    let touchStartX = 0;

    let touchEndX = 0;


    /* =====================================================
       TOTAL SLIDES
    ===================================================== */

    totalSlides.textContent =
        String(slides.length).padStart(2, "0");


    /* =====================================================
       CREATE NAVIGATION DOTS
    ===================================================== */

    slides.forEach((slide, index) => {

        const dot =
            document.createElement("div");

        dot.classList.add("dot");

        if (index === 0) {
            dot.classList.add("active");
        }

        dot.title =
            `${index + 1}. ${slide.dataset.title}`;

        dot.addEventListener("click", () => {

            goToSlide(index);

        });

        dotsContainer.appendChild(dot);

    });


    const dots =
        Array.from(
            document.querySelectorAll(".dot")
        );


    /* =====================================================
       UPDATE UI
    ===================================================== */

    function updateUI() {

        currentSlide.textContent =
            String(currentIndex + 1).padStart(2, "0");


        const progress =
            ((currentIndex + 1) / slides.length) * 100;


        progressBar.style.width =
            `${progress}%`;


        dots.forEach((dot, index) => {

            dot.classList.toggle(
                "active",
                index === currentIndex
            );

        });

    }


    /* =====================================================
       SHOW TRANSITION
    ===================================================== */

    function showTransition(index) {

        transitionNumber.textContent =
            String(index + 1).padStart(2, "0");


        transitionTitle.textContent =
            slides[index].dataset.title.toUpperCase();


        transitionScreen.classList.add("show");


        setTimeout(() => {

            transitionScreen.classList.remove("show");

        }, 600);

    }


    /* =====================================================
       GO TO SLIDE
    ===================================================== */

    function goToSlide(index) {

        if (isAnimating) return;

        if (index < 0) {
            index = slides.length - 1;
        }

        if (index >= slides.length) {
            index = 0;
        }


        if (index === currentIndex) {
            return;
        }


        isAnimating = true;


        showTransition(index);


        slides[currentIndex]
            .classList.remove("active");


        setTimeout(() => {

            currentIndex = index;

            slides[currentIndex]
                .classList.add("active");

            updateUI();


            setTimeout(() => {

                isAnimating = false;

            }, 500);

        }, 250);

    }


    /* =====================================================
       NEXT
    ===================================================== */

    function nextSlide() {

        goToSlide(
            currentIndex + 1
        );

    }


    /* =====================================================
       PREVIOUS
    ===================================================== */

    function previousSlide() {

        goToSlide(
            currentIndex - 1
        );

    }


    /* =====================================================
       BUTTON EVENTS
    ===================================================== */

    nextBtn.addEventListener(
        "click",
        nextSlide
    );


    prevBtn.addEventListener(
        "click",
        previousSlide
    );


    /* =====================================================
       ALL NEXT BUTTONS
    ===================================================== */

    document
        .querySelectorAll(".next-btn")
        .forEach(button => {

            button.addEventListener(
                "click",
                nextSlide
            );

        });


    /* =====================================================
       RESTART
    ===================================================== */

    restartBtn.addEventListener(
        "click",
        () => {

            goToSlide(0);

        }
    );


    /* =====================================================
       KEYBOARD NAVIGATION
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "ArrowRight" ||
                event.key === " " ||
                event.key === "PageDown"
            ) {

                event.preventDefault();

                nextSlide();

            }


            if (
                event.key === "ArrowLeft" ||
                event.key === "PageUp"
            ) {

                event.preventDefault();

                previousSlide();

            }


            if (event.key === "Home") {

                event.preventDefault();

                goToSlide(0);

            }


            if (event.key === "End") {

                event.preventDefault();

                goToSlide(
                    slides.length - 1
                );

            }


            if (event.key === "Escape") {

                // Return to first slide
                goToSlide(0);

            }

        }
    );


    /* =====================================================
       TOUCH / SWIPE
    ===================================================== */

    document.addEventListener(
        "touchstart",
        event => {

            touchStartX =
                event.changedTouches[0].screenX;

        },
        {
            passive: true
        }
    );


    document.addEventListener(
        "touchend",
        event => {

            touchEndX =
                event.changedTouches[0].screenX;

            handleSwipe();

        },
        {
            passive: true
        }
    );


    function handleSwipe() {

        const difference =
            touchStartX - touchEndX;


        const minimumSwipe =
            50;


        if (
            Math.abs(difference)
            < minimumSwipe
        ) {
            return;
        }


        if (difference > 0) {

            nextSlide();

        } else {

            previousSlide();

        }

    }


    /* =====================================================
       MOUSE WHEEL
    ===================================================== */

    let wheelLocked = false;


    document.addEventListener(
        "wheel",
        event => {

            if (wheelLocked) return;

            wheelLocked = true;


            if (event.deltaY > 0) {

                nextSlide();

            } else if (event.deltaY < 0) {

                previousSlide();

            }


            setTimeout(() => {

                wheelLocked = false;

            }, 900);

        },
        {
            passive: true
        }
    );


    /* =====================================================
       PARTICLES
    ===================================================== */

    const particlesContainer =
        document.getElementById("particles");


    const particleCount =
        window.innerWidth < 600
            ? 20
            : 45;


    for (
        let i = 0;
        i < particleCount;
        i++
    ) {

        const particle =
            document.createElement("span");


        particle.classList.add(
            "particle"
        );


        particle.style.left =
            `${Math.random() * 100}%`;


        particle.style.animationDuration =
            `${8 + Math.random() * 15}s`;


        particle.style.animationDelay =
            `${Math.random() * 10}s`;


        particle.style.opacity =
            `${0.1 + Math.random() * 0.4}`;


        particlesContainer.appendChild(
            particle
        );

    }


    /* =====================================================
       CARD MOUSE EFFECT
    ===================================================== */

    const cards =
        document.querySelectorAll(
            ".feature-card, .enterprise-card"
        );


    cards.forEach(card => {

        card.addEventListener(
            "mousemove",
            event => {

                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX - rect.left;


                const y =
                    event.clientY - rect.top;


                const rotateX =
                    ((y / rect.height) - 0.5)
                    * -5;


                const rotateY =
                    ((x / rect.width) - 0.5)
                    * 5;


                card.style.transform =
                    `
                    perspective(800px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    translateY(-6px)
                    `;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform = "";

            }
        );

    });


    /* =====================================================
       INITIALIZE
    ===================================================== */

    updateUI();


    /* =====================================================
       PREVENT CONTEXT MENU
       Optional presentation behavior
    ===================================================== */

    document.addEventListener(
        "contextmenu",
        event => {

            // Keep normal browser behavior disabled
            // for a cleaner presentation experience.
            event.preventDefault();

        }
    );

});