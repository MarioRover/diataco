var carousel = $('.carousel');

$(document).ready(function () {
  if ($(window).width() < 1024) {
    startCarousel();
  } else {
    $('.owl-carousel').addClass('off');
  }
});

$(window).resize(function () {
  if ($(window).width() < 1024) {
    startCarousel();
  } else {
    stopCarousel();
  }
});

function startCarousel() {
  carousel.addClass('off');
  $('.owl-carousel').owlCarousel({
    rtl: true,
    margin: 20,
    nav: true,
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 2
      },
      1000: {
        items: 3
      }
    }
  });
}

function stopCarousel() {
  var owl = $('.owl-carousel');
  carousel.removeClass('off');
  owl.trigger('destroy.owl.carousel');
  owl.addClass('off');
}



