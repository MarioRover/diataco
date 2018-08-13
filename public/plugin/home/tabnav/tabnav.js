let tabNavs = document.querySelectorAll('.tab-nav .tabnav-item .tabnav-link');
let tabContent = document.querySelectorAll('.tabBar .tab-content .tab-content-wrap');

tabNavs.forEach((tabNav , tabsIndex) => {
  tabNav.addEventListener('click' , (e) => {
    e.preventDefault();
    // Remove Active Class From Navs
    tabNavs.forEach((tab) => {
      tab.classList.remove('active');
    });
    tabNav.classList.add('active');
    // Remove Active Class From Content
    tabContent.forEach((content) => {
      content.classList.remove('active');
    });
    tabContent[tabsIndex].classList.add('active');
  });
});
