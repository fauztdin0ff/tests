/*------------------------------Классы анимаций---------------------------*/
window.addEventListener("load", function () {
   const preloader = document.getElementById("preloader");
   if (preloader) {
      preloader.style.display = "none";
   }
   init();
});

function init() {
   function onEntry(entry) {
      entry.forEach(change => {
         if (change.isIntersecting) {
            change.target.classList.add('element-show');
         }
      });
   }
   let options = { threshold: [0.1] };
   let observer = new IntersectionObserver(onEntry, options);
   let elements = document.querySelectorAll('.element-animation');
   for (let elm of elements) {
      observer.observe(elm);
   }
}
/*------------------------------TEST TABS---------------------------*/
document.addEventListener('DOMContentLoaded', function () {
   const swiperTabsContainer = document.querySelector('.swiper-tabs-container');
   const swiperEl = document.querySelector('.swiper');
   const progressBar = document.querySelector('.progress-bar');
   const slideLinks = document.querySelectorAll('.slide-link');

   if (swiperTabsContainer && swiperEl && progressBar && slideLinks.length > 0) {
      var swiperTabs = new Swiper(swiperTabsContainer, {
         loop: false,
         simulateTouch: true,
         grabCursor: false,
         slideToClickedSlide: false,
         watchOverflow: true,
         initialSlide: 0,
         centeredSlides: false,
         freeMode: true,
         slidesPerGroup: 1,
         breakpoints: {
            320: { slidesPerView: 2.5 },
            768: { slidesPerView: 4 },
         },
      });

      const swiperInstance = new Swiper(swiperEl, {
         navigation: { nextEl: '.button-next', prevEl: '.button-prev' },
         loop: false,
         allowTouchMove: false,
         simulateTouch: false,
         touchRatio: 1,
         grabCursor: false,
         slideToClickedSlide: false,
         mousewheel: false,
         autoHeight: true,
         slidesPerView: 1,
         watchOverflow: true,
         slidesPerGroup: 1,
         initialSlide: 0,
         loopedSlides: 0,
         freeMode: false,
         speed: 800,
         parallax: true,
         effect: "creative",
         creativeEffect: {
            prev: { shadow: false, opacity: 0, translate: ["-20%", 0, -1] },
            next: { translate: ["100%", 0, 0] }
         },
      });

      swiperInstance.on('slideChange', function () {
         const totalSlides = this.slides.length;
         const currentSlide = this.activeIndex + 1;
         const progress = (currentSlide / totalSlides) * 100;
         progressBar.style.width = progress + '%';

         updateFraction(this.el, currentSlide, totalSlides);
         this.el.querySelector('.button-finish').style.display = (currentSlide === totalSlides) ? 'block' : 'none';

         updateActiveLink(this.activeIndex);
      });

      const totalSlides = swiperInstance.slides.length;
      progressBar.style.width = (1 / totalSlides) * 100 + '%';
      updateFraction(swiperInstance.el, 1, totalSlides);

      function updateFraction(swiperEl, activeSlideIndex, totalSlides) {
         swiperEl.parentNode.querySelectorAll('.pagination-fraction.bg-red').forEach(fraction => {
            fraction.textContent = activeSlideIndex + '/' + totalSlides;
         });
      }

      slideLinks.forEach(function (link) {
         link.addEventListener('click', function (e) {
            e.preventDefault();
            const slideId = this.getAttribute('data-slide');
            const targetSlide = document.querySelector(`[data-id="${slideId}"]`);
            const slideIndex = Array.from(swiperInstance.slides).indexOf(targetSlide);
            swiperInstance.slideTo(slideIndex);
         });
      });

      function updateActiveLink(activeIndex) {
         slideLinks.forEach(link => {
            link.parentElement.classList.remove('active');
         });
         const activeSlideId = swiperInstance.slides[activeIndex].getAttribute('data-id');
         const activeLink = document.querySelector(`.slide-link[data-slide="${activeSlideId}"]`);
         if (activeLink) {
            activeLink.parentElement.classList.add('active');

            const tabIndex = Array.from(slideLinks).indexOf(activeLink);
            swiperTabs.slideTo(tabIndex);
         }
      }

      updateActiveLink(swiperInstance.activeIndex);
   }
});

/*------------------------------Селекты---------------------------*/
document.addEventListener("DOMContentLoaded", function () {
   var selects = document.querySelectorAll('.test-app-dropdown select');

   selects.forEach(function (select) {
      select.addEventListener('change', function () {
         if (this.value !== 'empty') {
            this.parentNode.classList.add('bg-green');
         } else {
            this.parentNode.classList.remove('bg-green');
         }
      });
   });
});

/*------------------------------Видео---------------------------*/
document.addEventListener("DOMContentLoaded", function () {
   var video = document.getElementById('myVideo');
   var playButton = document.querySelector('.play-button');

   if (video && playButton) {
      playButton.addEventListener('click', function () {
         video.play();
         video.setAttribute('controls', '');
         playButton.style.display = 'none';
      });
   }
});

/*------------------------------Popup test results---------------------------*/
document.addEventListener('DOMContentLoaded', function () {
   var button = document.getElementById('open-popup-test-results');
   var popup = document.getElementById('popup-test-results');
   var body = document.body;

   if (button && popup) {
      button.addEventListener('click', function () {
         popup.classList.add('is-shown');
         body.classList.add('no-scroll');
      });
   }

   var closePopupButton = document.getElementById('close-popup-test-results');
   if (closePopupButton) {
      closePopupButton.addEventListener('click', function () {
         popup.classList.remove('is-shown');
         body.classList.remove('no-scroll');
      });
   }
});