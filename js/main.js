(function () {
   'use strict';

   // if (window.innerWidth >= 768) {
   //     const msnry = new Masonry(".stories__items", {
   //         itemSelector: ".stories-item",
   //         columnWidth: ".stories-item--width",
   //         gutter: ".stories-item--gap",
   //         horizontalOrder: true,
   //         percentPosition: true,
   //     });
   // }

   const forms = () => {
      const $forms = document.querySelectorAll(".js-mail-form");

      $forms.forEach($form => {
         const $submit = $form.querySelector(".js-submit");

         $submit.addEventListener("click", e => {
            e.preventDefault();

            $form.dataset.errors = 0;

            const $phone = $form.querySelector('input[name="phone"]');
            const $name = $form.querySelector('input[name="name"]');
            const $email = $form.querySelector('input[name="email"]');

            if ($phone) {
               if ($phone.value.length == 0) {
                  $phone.classList.add("is-error");
                  $form.dataset.errors++;
               } else {
                  $phone.classList.remove("is-error");
               }
            }
            if ($name) {
               if ($name.value.length == 0) {
                  $name.classList.add("is-error");
                  $form.dataset.errors++;
               } else {
                  $name.classList.remove("is-error");
               }
            }
            // if ($email) {
            //     if ($email.value.length == 0) {
            //         $email.classList.add("is-error");
            //         $form.dataset.errors++;
            //     } else {
            //         $email.classList.remove("is-error");
            //     }
            // }

            if ($form.dataset.errors > 0) {
               $form.querySelector(".js-warning").style.display = "block";
               return;
            } else {
               $form.querySelector(".js-warning").style.display = "none";
            }

            const formData = new FormData($form);

            fetch("../mailer.php", {
               method: "POST",
               body: formData
            }).then(function (serverPromise) {
               return serverPromise.json();
            }).then(function (data) {
               if (data.error) {
                  alert(data.error);
                  return false;
               }
               alert("Сообщение отправлено");
            });
         });
      });
   };

   const survey = () => {
      let step = 1;
      let steps_total;
      let i = 1;
      let is_last = false;

      const $box = document.getElementById("survey");
      if (!$box) return;

      const $steps = $box.querySelector(".js-survey-steps");
      const $progress = $box.querySelector(".js-survey-progress");

      steps_total = $steps.querySelectorAll(".js-survey-step").length;

      const $prev = $box.querySelector(".js-survey-prev");
      const $next = $box.querySelector(".js-survey-next");

      function showResult(step) {
         document.getElementById("popup-test").style.backgroundImage = "url(./images/test-bg-4.jpg)";

         if (getStepAnswer(1) == "2" || getStepAnswer(2) == "4" || getStepAnswer(6) == "1") {
            showPopup("popup-survey-result-1");
         } else {
            showPopup("popup-survey-result-2");
         }

         setTimeout(() => {
            hidePopup("popup-test");
         }, 1000);
      }

      const getStepAnswer = step => {
         return $box.querySelector('.js-survey-step[data-step="' + step + '"]').querySelector('input[type="radio"]:checked').value;
      };

      function showStep(step) {
         const $form = $box.querySelector('.js-survey-step[data-step="' + step + '"]');
         if (!$form) return;

         if (step <= 2) {
            document.getElementById("popup-test").style.backgroundImage = "url(./images/test-bg-1.jpg)";
         } else if (step <= 4) {
            document.getElementById("popup-test").style.backgroundImage = "url(./images/test-bg-2.jpg)";
         } else if (step <= 6) {
            document.getElementById("popup-test").style.backgroundImage = "url(./images/test-bg-3.jpg)";
         }

         is_last = step == steps_total;

         $steps.querySelectorAll(".js-survey-step").forEach(element => {
            element.classList.remove("is-active");
            element.style.opacity = 0;
         });
         $form.classList.add("is-active");
         setTimeout(() => {
            $form.style.opacity = 1;
         }, 0);

         i = 1;
         $progress.querySelectorAll(".survey__progress-step").forEach(element => {
            if (i <= step) {
               element.classList.add("is-active");
            } else {
               element.classList.remove("is-active");
            }
            i++;
         });
      }

      i = 1;
      $steps.querySelectorAll(".js-survey-step").forEach(element => {
         element.querySelectorAll("input").forEach(radio => {
            radio.addEventListener("change", function () {
               $next.disabled = false;
            });
         });

         const div = document.createElement("div");
         div.classList.add("survey__progress-step");
         if (i == 1) {
            div.classList.add("is-active");
         }
         $progress.appendChild(div);

         i++;
      });

      $prev.addEventListener("click", function (e) {
         step--;
         showStep(step);
         $next.disabled = false;
         if (step == 1) {
            $prev.style.display = "none";
         }
         $prev.innerHTML = "Шаг " + (step - 1);
         $next.innerHTML = "Шаг " + (step + 1);
      });
      $next.addEventListener("click", function (e) {
         $prev.style.display = "block";
         $next.disabled = true;
         if (!is_last) {
            step++;
            showStep(step);
         } else {
            showResult(step);
            $box.querySelectorAll('input[type="radio"]').forEach(radio => {
               radio.checked = false;
            });
            step = 1;
            is_last = false;
            $prev.style.display = "none";
            setTimeout(() => {
               showStep(step);
            }, 1000);
         }
         $prev.innerHTML = "Шаг " + (step - 1);
         if (!is_last) {
            $next.innerHTML = "Шаг " + (step + 1);
         } else {
            $next.innerHTML = "Отправить";
         }
      });
   };

   const accordion = () => {
      document.querySelectorAll(".js-accordion .accordion__header").forEach(el => {
         el.addEventListener("click", function () {
            const self = el.closest(".accordion__item").classList.contains("is-active");
            const $btn = el.querySelector(".button-arrow");

            if (self) return;

            document.querySelectorAll(".accordion__item").forEach(el => {
               const $btn = el.querySelector(".button-arrow");
               el.classList.remove("is-active");
               $btn.classList.add("button-arrow--down");
               $btn.classList.remove("button-arrow--up");
               $btn.classList.remove("button-arrow--filled");
            });

            $btn.classList.toggle("button-arrow--down");
            $btn.classList.toggle("button-arrow--up");
            $btn.classList.toggle("button-arrow--filled");

            el.closest(".accordion__item").classList.toggle("is-active");
         });
      });
   };

   const videos = () => {
      document.querySelectorAll(".video").forEach(el => {
         el.addEventListener("click", function (e) {
            e.preventDefault();
            if (this.classList.contains("is-active") == false) {
               this.classList.add("is-active");
               this.querySelector("video").play();
               this.querySelector("video").addEventListener("ended", () => {
                  el.classList.remove("is-active");
               });
               this.querySelector("video").addEventListener("pause", function () {
                  if (this.readyState == 4) // trigger only on pause, not on seeked
                     el.classList.remove("is-active");
               });
            }
         });
      });
   };

   const audioStop = () => {
      document.querySelectorAll("audio").forEach(audio => {
         audio.pause();
      });
   };

   const audio = () => {
      const calculateTime = secs => {
         const minutes = Math.floor(secs / 60);
         const seconds = Math.floor(secs % 60);
         const returnedSeconds = seconds == 0 ? "00" : seconds < 10 ? `0${seconds}` : `${seconds}`;
         const returnedMinutes = minutes == 0 ? "00" : minutes < 10 ? `0${minutes}` : `${minutes}`;
         return `${returnedMinutes}:${returnedSeconds}`;
      };

      document.querySelectorAll(".audio").forEach(el => {
         if (el.dataset.init == true) return;

         const $audio = el.querySelector("audio");
         if (!$audio) return;

         const $progress = el.querySelector(".audio__duration");

         $audio.addEventListener("loadedmetadata", () => {
            $progress.textContent = el.dataset.detailedDuration !== undefined ? "00:00 / " + calculateTime($audio.duration) : calculateTime($audio.duration);
         });
         $audio.addEventListener("timeupdate", () => {
            $progress.textContent = el.dataset.detailedDuration !== undefined ? calculateTime(Math.floor($audio.currentTime)) + " / " + calculateTime($audio.duration) : calculateTime($audio.duration - Math.floor($audio.currentTime));
         });

         el.querySelector(".audio__play .button-audio").addEventListener("click", () => {
            el.querySelector(".audio__play").classList.remove("is-active");
            el.querySelector(".audio__pause").classList.add("is-active");
            $audio.play();
         });

         el.querySelector(".audio__pause .button-audio").addEventListener("click", () => {
            el.querySelector(".audio__play").classList.add("is-active");
            el.querySelector(".audio__pause").classList.remove("is-active");
            $audio.pause();
         });

         el.dataset.init = true;
      });
   };

   function hidePopup(id) {
      let popup = document.getElementById(id) ? document.getElementById(id) : this.closest(".popup");

      if (popup.dataset.processing && popup.dataset.processing == true) return;
      popup.dataset.processing = true;

      if (popup.classList.contains("is-shown")) {
         popup.addEventListener("transitionend", e => {
            popup.style.display = "none";
            popup.dataset.processing = false;
         }, {
            once: true
         });
         popup.classList.remove("is-shown");
         document.body.classList.remove("no-scroll");

         if (id == "popup-teacher") {
            audioStop();
         }
      }
   }

   function showPopup(id, dataset) {
      let popup = document.getElementById(id);

      if (id != "popup-nav") hidePopup("popup-nav");
      if (id != "popup-signup-options") hidePopup("popup-signup-options");
      if (id != "popup-survey-result-1") hidePopup("popup-survey-result-1");
      if (id != "popup-survey-result-2") hidePopup("popup-survey-result-2");
      if (id != "popup-lesson") hidePopup("popup-lesson");
      if (id != "popup-teacher") hidePopup("popup-teacher");

      if (id == "popup-teacher") {
         audio();
      }

      if (id == "popup-test") {
         preload_image("./images/test-bg-1.jpg");
         preload_image("./images/test-bg-2.jpg");
         preload_image("./images/test-bg-3.jpg");
         preload_image("./images/test-bg-4.jpg");
      }

      if (dataset && dataset.subject !== undefined) {
         document.getElementById("popup-signup-form").querySelector('input[name="subject"]').value = dataset.subject;
         document.getElementById("popup-signup-form-second").querySelector('input[name="subject"]').value = dataset.subject;
      }

      if (popup.dataset.processing && popup.dataset.processing == true) return;
      popup.dataset.processing = true;

      if (popup.classList.contains("is-shown") == false) {
         if (dataset && dataset.file !== undefined) {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", dataset.file, true);
            xhr.onreadystatechange = function () {
               if (this.readyState !== 4) return;
               if (this.status !== 200) return;
               popup.querySelector(".popup-window").innerHTML = this.responseText;

               if (id == "popup-teacher") {
                  audio();
               }
            };
            xhr.send();
         }

         popup.style.display = "flex";
         setTimeout(function () {
            popup.classList.add("is-shown");
            document.body.classList.add("no-scroll");
            popup.dataset.processing = false;
         }, 1);
      }
   }

   function preload_image(im_url) {
      let img = new Image();
      img.src = im_url;
   }

   function recalcPrices($container) {
      const tab = $container.querySelector(".js-tabs-button.is-active");
      const prices = JSON.parse(tab.dataset.prices)["prices"];

      let i = 0;

      $container.querySelectorAll(".prices-item__price-number").forEach(el => {
         el.querySelector("span").textContent = prices[i];
         i++;
      });
   }

   const tabsInit = () => {
      const tabs = document.querySelectorAll(".js-tabs");

      if (!tabs) return;

      tabs.forEach(el => {
         const tabButtons = el.querySelectorAll(".js-tabs-button"),
            contents = el.querySelectorAll(".js-tabs-content");

         if (!tabButtons) return;
         if (!contents) return;

         tabButtons.forEach(tab => {
            tab.addEventListener("click", e => {
               const id = e.target.dataset.id;

               if (id) {
                  tabButtons.forEach(btn => {
                     btn.classList.remove("is-active");
                  });
                  e.target.classList.add("is-active");

                  contents.forEach(content => {
                     content.classList.remove("is-active");
                  });

                  if (!document.getElementById(id)) return;

                  const element = document.getElementById(id);
                  element.classList.add("is-active");
               }

               if (e.target.dataset.prices) {
                  tabButtons.forEach(btn => {
                     btn.classList.remove("is-active");
                  });
                  e.target.classList.add("is-active");
                  recalcPrices(el);
               }
            });
         });
      });
   };

   document.addEventListener("DOMContentLoaded", () => {
      accordion();
      survey();
      forms();
      videos();
      audio();
      tabsInit();

      IMask(document.querySelector(".js-mask-phone"), {
         mask: "+{7} (000) 000-00-00"
      });

      document.querySelectorAll(".popup").forEach(el => {
         el.addEventListener("click", function (e) {
            if (e.target == el) {
               hidePopup(e.target.id);
            }
         });
      });
      document.body.addEventListener("click", function (e) {
         const $close = e.target.closest(".js-popup-hide");
         if ($close) {
            e.preventDefault();
            hidePopup.call($close);
         }

         const $show = e.target.closest(".js-popup-show");
         if ($show) {
            e.preventDefault();
            showPopup($show.dataset.target, $show.dataset);
         }
      });

      if (window.innerWidth >= 1280) {
         const swiperClients = new Swiper(".swiper-teachers", {
            slidesPerView: 4,
            spaceBetween: 40,
            // loop: true,
            navigation: {
               nextEl: ".swiper-teachers-next",
               prevEl: ".swiper-teachers-prev"
            }
         });
      }

      if (document.querySelector(".js-swiper-speak")) {
         const $swiperSpeakPages = document.querySelector(".js-swiper-speak-pagination");
         let realIndex;
         let slidesqty = document.querySelector(".js-swiper-speak").querySelectorAll(".swiper-slide").length;
         for (let index = 0; index < slidesqty; index++) {
            const div = document.createElement("div");
            div.classList.add("speak__card__slider-page");
            div.classList.add("js-swiper-speak-page");
            $swiperSpeakPages.appendChild(div);
         }
         const swiperClients = new Swiper(".js-swiper-speak", {
            autoplay: {
               delay: 2500,
               disableOnInteraction: false
            },
            on: {
               autoplayTimeLeft(s, time, progress) {
                  progress = Math.round((1 - progress) * 100);
                  $swiperSpeakPages.style.setProperty("--progress", progress + "%");
               },
               init: function (s) { },
               slideChange: function (s) {
                  if (s.realIndex != realIndex) {
                     $swiperSpeakPages.querySelectorAll(".js-swiper-speak-page").forEach(el => {
                        el.classList.remove("is-active");
                     });
                     $swiperSpeakPages.querySelectorAll(".js-swiper-speak-page")[s.realIndex].classList.add("is-active");

                     realIndex = s.realIndex;
                  }
               }
            },
            slidesPerView: "auto",
            spaceBetween: 20,
            loop: true
         });
      }
   });


}());


//# sourceMappingURL=main.js.map
