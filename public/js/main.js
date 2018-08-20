//////////////Mobile Navigation/////////////////// 
let mobileIcon = $('#nav-icon');
let mobileNav = $('.mobile-nav');
let headerSite = $('.header-site');
$(document).ready(function () {
  $(mobileIcon).click(() => {
    if(!$(mobileIcon).hasClass('open')) {
      $(mobileIcon).addClass('open');
      $(mobileNav).addClass('open');
      // $('.homeSlider').css('margin-top', 0);
      $(headerSite).css('background-color', '#000');
    } else {
      $(mobileIcon).removeClass('open');
      $(mobileNav).removeClass('open');
      // $('.homeSlider').css('margin-top', '-7em');
      $(headerSite).css('background-color', '#bfd5e3');
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



