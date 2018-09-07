$('.owl-carousel').owlCarousel({
  rtl: true,
  margin: 0,
  nav: true,
  responsive: {
    0: {
      items: 1
    },
    600: {
      items: 2
    },
    800: {
      items: 3
    },
    1000: {
      items: 3
    }
  }
})
//////////
$('.product-wrap .owl-carousel').owlCarousel({
  loop: true,
  margin: 10,
  responsiveClass: true,
  responsive: {
    0: {
      items: 1,
      nav: true
    },
    600: {
      items: 3,
      nav: false
    },
    1000: {
      items: 5,
      nav: true,
      loop: false
    }
  }
})