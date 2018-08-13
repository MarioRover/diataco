//////////////Mobile Navigation/////////////////// 
let mobileIcon = $('#nav-icon');
let mobileNav = $('.mobile-nav');
$(document).ready(function () {
  $(mobileIcon).click(() => {
    if(!$(mobileIcon).hasClass('open')) {
      $(mobileIcon).addClass('open');
      $(mobileNav).addClass('open');
      $('.homeSlider').css('margin-top', 0);
    } else {
      $(mobileIcon).removeClass('open');
      $(mobileNav).removeClass('open');
      $('.homeSlider').css('margin-top', '-7em');
    }
  });
});
///////////////////////////////////////////////