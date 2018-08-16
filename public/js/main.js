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
///////////////Tab of Products/////////////////////
let tabNavs = $('.tab-nav .tabnav-item .tabnav-link');
let tabContent = $('.products-tab .tab-content .tab-content-wrap');

$.each(tabNavs , (tabIndex , tabNav) => {
  $(tabNav).click((e) => { 
    e.preventDefault();
    // Remove Active Class From Navs
    $.each(tabNavs , (tabI , tab) => {
      $(tab).removeClass('active');
    });
    $(tabNav).addClass('active');
    // Remove Active Class From Content
    $.each(tabContent , (index ,content) => {
      $(content).removeClass('active');
    });
    $(tabContent[tabIndex]).addClass('active');
  });
})
////////Light Mode///////////
let lightMode = $('.light-mode');
let sunIcon = $('.light-mode .sun');
let moonIcon = $('.light-mode .moon');
let homeSlider = $('.homeSlider');
let aboutUs = $('.aboutUs');
let layer1 = $('.homeSlider .layer-1');
let layer2 = $('.homeSlider .layer-2');

$(sunIcon).css('display', 'block');

$(lightMode).click((e) => { 
  e.preventDefault();
  if(! $(lightMode).hasClass('night')) {
    $(lightMode).removeClass('day');
    $(lightMode).addClass('night');
    $(sunIcon).css('display', 'none');
    $(moonIcon).css('display', 'block');
    $(homeSlider).css('background-color', '#0e1b23');
    $(aboutUs).css('background-color', '#0e1b23');
    $('.homeSlider .layer-1 .day').css('display' , 'none');
    $('.homeSlider .layer-2 .day').css('display', 'none');
    $('.homeSlider .layer-1 .night').css('display', 'block');
    $('.homeSlider .layer-2 .night').css('display', 'block');
  } else {
    $(lightMode).removeClass('night');
    $(lightMode).addClass('day');
    $(sunIcon).css('display', 'block');
    $(moonIcon).css('display', 'none');
    $(homeSlider).css('background-color', '#0e0001');
    $(aboutUs).css('background-color', '#0e0001');
    $('.homeSlider .layer-1 .day').css('display', 'block');
    $('.homeSlider .layer-2 .day').css('display', 'block');
    $('.homeSlider .layer-1 .night').css('display', 'none');
    $('.homeSlider .layer-2 .night').css('display', 'none');
  }
});



