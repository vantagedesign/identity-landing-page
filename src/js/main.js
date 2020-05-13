/* -------------------------------------------------------------------------
* IDENTITY LANDING PAGE | @version 1.0.2 | @author Vantage Design | @license https://github.com/vantagedesign/identity-landing-page/blob/master/LICENSE.md
* JavaScript.
* ------------------------------------------------------------------------ */

$(document).ready(function(){

  // Initialize icons
  feather.replace()

  /* Initialize navbar style on scroll */
  scrollCheck($(window).scrollTop());

  $(window).scroll(function() {    
      var scroll = $(window).scrollTop();
      scrollCheck(scroll);
  });

  function scrollCheck(scroll){
    if (scroll >= 100) {
        $(".navbar-scrollstyle").addClass("scrolled");
    } else {
        $(".navbar-scrollstyle").removeClass("scrolled");
    }
  }

  /* If navbar is transparent unless scrolled, make it opaque when collapsing */
  $('.navbar-collapse').on('show.bs.collapse', function () {
    $(this).parents('.navbar').addClass("show");
  })
  $('.navbar-collapse').on('hide.bs.collapse', function () {
    $(this).parents('.navbar').removeClass("show");
  })

  // Enable smooth scrolling
  $('a[href*="#"]')
  .not('[href="#"]')
  .not('[href="#0"]')
  .not("[data-toggle='tab']")
  .not("[data-toggle='collapse']")
  .click(function(event) {
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
      ) {
      var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
    if (target.length) {
      event.preventDefault();
      $('html, body').animate({
        scrollTop: target.offset().top
      }, 1000, function() {
        var $target = $(target);
        $target.focus();
        if ($target.is(":focus")) {
          return false;
        } else {
          $target.attr('tabindex','-1');
          $target.focus();
        };
      });
    }
  }});

  // Viewport height fix
  var vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', "".concat(vh, "px"));
  window.addEventListener('resize', function () {
    var vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', "".concat(vh, "px"));
  });

  var typedoptions = {
    stringsElement: '#typed-strings',
    typeSpeed: 60,
    backSpeed: 20,
    backDelay: 3000,
    startDelay: 0,
    loop: true
  };

  if ($('#typed').length)  {
    var typed = new Typed('#typed', typedoptions);
  }


});