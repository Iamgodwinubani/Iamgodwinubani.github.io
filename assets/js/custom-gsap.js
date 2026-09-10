/***************************************************
==================== JS INDEX ======================
****************************************************

01. Button Hover Js
02. Hover Reveal Js

Scroll and entrance animations were removed deliberately:
AOS fade-ups, char-by-char SplitText reveals, image clip
reveals, the pinned portfolio heading and GSAP ScrollSmoother.
The blocks that drove them are gone, along with the libraries
they needed (aos, scroll-smoother, split-text, scroll-trigger,
scroll-to-plugin, chroma). What remains is hover-only and
runs on gsap core plus jQuery.

****************************************************/

(function ($) {
  "use strict";

  ////////////////////////////////////////////////////
  // 01. Button Hover Js
  // 04. Button Hover Js
  $(".tw-hover-btn").on("mouseenter", function (e) {
    var x = e.pageX - $(this).offset().left;
    var y = e.pageY - $(this).offset().top;
    $(this).find(".tw-hover-btn-circle-dot").css({
      top: y,
      left: x,
    });
  });
  $(".tw-hover-btn").on("mouseout", function (e) {
    var x = e.pageX - $(this).offset().left;
    var y = e.pageY - $(this).offset().top;
    $(this).find(".tw-hover-btn-circle-dot").css({
      top: y,
      left: x,
    });
  });
  $(".tw-hover-btn").on("mouseenter", function (e) {
    var x = e.pageX - $(this).offset().left;
    var y = e.pageY - $(this).offset().top;
    $(this).find(".tw-btn-circle-dot").css({
      top: y,
      left: x,
    });
  });
  $(".tw-hover-btn").on("mouseout", function (e) {
    var x = e.pageX - $(this).offset().left;
    var y = e.pageY - $(this).offset().top;
    $(this).find(".tw-btn-circle-dot").css({
      top: y,
      left: x,
    });
  });
  var hoverBtns = gsap.utils.toArray(".tw-hover-btn-wrapper");
  const hoverBtnItem = gsap.utils.toArray(".tw-hover-btn-item");
  hoverBtns.forEach((btn, i) => {
    $(btn).mousemove(function (e) {
      callParallax(e);
    });
    function callParallax(e) {
      parallaxIt(e, hoverBtnItem[i], 60);
    }
    function parallaxIt(e, target, movement) {
      var $this = $(btn);
      var relX = e.pageX - $this.offset().left;
      var relY = e.pageY - $this.offset().top;
      gsap.to(target, 1, {
        x: ((relX - $this.width() / 2) / $this.width()) * movement,
        y: ((relY - $this.height() / 2) / $this.height()) * movement,
        ease: Power2.easeOut,
      });
    }
    $(btn).mouseleave(function (e) {
      gsap.to(hoverBtnItem[i], 1, {
        x: 0,
        y: 0,
        ease: Power2.easeOut,
      });
    });
  });

  ////////////////////////////////////////////////////
  // 02. Hover Reveal Js
  // 09. Hover Reveal
  const hoverItem = document.querySelectorAll(".hover__reveal-item");
  function moveImage(e, hoverItem, index) {
    const item = hoverItem.getBoundingClientRect();
    const x = e.clientX - item.x;
    const y = e.clientY - item.y;
    if (hoverItem.children[index]) {
      hoverItem.children[index].style.transform = `translate(${x}px, ${y}px)`;
    }
  }
  hoverItem.forEach((item, i) => {
    item.addEventListener("mousemove", (e) => {
      setInterval(moveImage(e, item, 1), 50);
    });
  });
})(jQuery);
