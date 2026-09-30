/* =========================================
   PLATFORMVERSE PRESENTATION
========================================= */

const navButtons =
    document.querySelectorAll(".nav-btn");

const pages =
    document.querySelectorAll(".page");

const overlay =
    document.getElementById("transitionOverlay");

const transitionTitle =
    document.getElementById("transitionTitle");

const menuBtn =
    document.getElementById("menuBtn");

const navigation =
    document.getElementById("navigation");


/* =========================================
   PAGE TITLES
========================================= */

const pageTitles = {

    home: "Home",

    mobile: "Mobile Platforms",

    enterprise: "Enterprise Platforms",

    comparison: "Platform Comparison",

    summary: "Presentation Summary"

};


/* =========================================
   CHANGE PAGE
========================================= */

function changePage(pageName) {

    if (!document.getElementById(pageName)) {
        return;
    }


    /* SHOW POPUP */

    transitionTitle.textContent =
        pageTitles[pageName] || "Loading...";

    overlay.classList.add("show");


    /* CLOSE MOBILE MENU */

    navigation.classList.remove("open");


    /* WAIT FOR ANIMATION */

    setTimeout(() => {

        /* Hide all pages */

        pages.forEach(page => {

            page.classList.remove("active");

        });


        /* Show selected page */

        const selectedPage =
            document.getElementById(pageName);

        selectedPage.classList.add("active");


        /* Update navigation */

        navButtons.forEach(button => {

            button.classList.remove("active");

            if (
                button.dataset.page === pageName
            ) {

                button.classList.add("active");

            }

        });


        /* Scroll to top */

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });


        /* Hide popup */

        setTimeout(() => {

            overlay.classList.remove("show");

        }, 300);

    }, 450);

}


/* =========================================
   NAVIGATION BUTTONS
========================================= */

navButtons.forEach(button => {

    button.addEventListener("click", () => {

        const page =
            button.dataset.page;

        changePage(page);

    });

});


/* =========================================
   OTHER BUTTONS
========================================= */

document.querySelectorAll("[data-go]")
    .forEach(button => {

        button.addEventListener("click", () => {

            const page =
                button.dataset.go;

            changePage(page);

        });

    });


/* =========================================
   MOBILE MENU
========================================= */

menuBtn.addEventListener("click", () => {

    navigation.classList.toggle("open");

});


/* =========================================
   CLOSE MENU WHEN CLICKING OUTSIDE
========================================= */

document.addEventListener("click", event => {

    const clickedInsideMenu =
        navigation.contains(event.target);

    const clickedMenuButton =
        menuBtn.contains(event.target);

    if (
        !clickedInsideMenu &&
        !clickedMenuButton
    ) {

        navigation.classList.remove("open");

    }

});


/* =========================================
   KEYBOARD NAVIGATION
========================================= */

document.addEventListener("keydown", event => {

    const activePage =
        document.querySelector(".page.active");

    const currentIndex =
        Array.from(pages).indexOf(activePage);


    /* RIGHT ARROW */

    if (event.key === "ArrowRight") {

        const nextIndex =
            Math.min(
                currentIndex + 1,
                pages.length - 1
            );

        changePage(
            pages[nextIndex].id
        );

    }


    /* LEFT ARROW */

    if (event.key === "ArrowLeft") {

        const previousIndex =
            Math.max(
                currentIndex - 1,
                0
            );

        changePage(
            pages[previousIndex].id
        );

    }

});


/* =========================================
   SWIPE SUPPORT FOR MOBILE
========================================= */

let touchStartX = 0;

let touchEndX = 0;


document.addEventListener(
    "touchstart",
    event => {

        touchStartX =
            event.changedTouches[0].screenX;

    },
    { passive: true }
);


document.addEventListener(
    "touchend",
    event => {

        touchEndX =
            event.changedTouches[0].screenX;

        handleSwipe();

    },
    { passive: true }
);


function handleSwipe() {

    const difference =
        touchStartX - touchEndX;


    /* Ignore tiny movements */

    if (Math.abs(difference) < 70) {
        return;
    }


    const activePage =
        document.querySelector(".page.active");

    const currentIndex =
        Array.from(pages).indexOf(activePage);


    /* Swipe left */

    if (difference > 0) {

        const nextIndex =
            Math.min(
                currentIndex + 1,
                pages.length - 1
            );

        changePage(
            pages[nextIndex].id
        );

    }


    /* Swipe right */

    else {

        const previousIndex =
            Math.max(
                currentIndex - 1,
                0
            );

        changePage(
            pages[previousIndex].id
        );

    }

}


/* =========================================
   CARD ANIMATION
========================================= */

const cards =
    document.querySelectorAll(".platform-card");


const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";

                    entry.target.style.transform =
                        "translateY(0)";

                }

            });

        },
        {
            threshold: .15
        }
    );


cards.forEach(card => {

    card.style.opacity = "0";

    card.style.transform =
        "translateY(25px)";

    card.style.transition =
        "opacity .6s ease, transform .6s ease";

    observer.observe(card);

});
