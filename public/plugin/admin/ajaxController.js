$('.contactPageSetting').submit((e) => {
  e.preventDefault();
  let address = $('.contactPageSetting input[name = "address"]');
  let email = $('.contactPageSetting input[name = "email"]');
  let telephone = $('.contactPageSetting input[name = "telephone"]');
  let photo = $('.contactPageSetting input[name = "photo"]');
  let photoVal = $('.contactPageSetting input[name = "photo"]');

  let formData = new FormData();
  formData.append('address', address.val());
  formData.append('email', email.val());
  formData.append('telephone', telephone.val());
  formData.append('photo', photo[0].files[0]);
  formData.append('photoVal', photoVal.val());

  Fetch('/admin/site-setting/pages/contact', 'PUT', formData);
});

/////////Messsages////////////
let messages = $('.deleteMessage');
let formData = new FormData();
$.each(messages, function (indexInArray, message) {
    $(message).click(function (e) {
      e.preventDefault();
      let messageId = $(message).attr('value');
      let body = {
        message : messageId
      };
      Fetch2('/admin/messages', 'DELETE', body);
    });
});
///////////Home////////////
$('.HomeSliderSetting').submit((e) => {
  e.preventDefault();
  let homeSlideritem1 = $('.HomeSliderSetting input[name = "homeSlideritem1"]');
  let homeSlidericonItem1 = $('.HomeSliderSetting input[name = "homeSlidericonItem1"]');
  let homeSlideritem2 = $('.HomeSliderSetting input[name = "homeSlideritem2"]');
  let homeSlidericonItem2 = $('.HomeSliderSetting input[name = "homeSlidericonItem2"]');
  let homeSlideritem3 = $('.HomeSliderSetting input[name = "homeSlideritem3"]');
  let homeSlidericonItem3 = $('.HomeSliderSetting input[name = "homeSlidericonItem3"]');
  let photo = $('.HomeSliderSetting input[name = "photo"]');
  let photoVal = $('.HomeSliderSetting input[name = "photo"]');

  let formData = new FormData();
  formData.append('homeSlideritem1', homeSlideritem1.val());
  formData.append('homeSlidericonItem1', homeSlidericonItem1.val());
  formData.append('homeSlideritem2', homeSlideritem2.val());
  formData.append('homeSlidericonItem2', homeSlidericonItem2.val());
  formData.append('homeSlideritem3', homeSlideritem3.val());
  formData.append('homeSlidericonItem3', homeSlidericonItem3.val());
  formData.append('photo', photo[0].files[0]);
  formData.append('photoVal', photoVal.val());

  Fetch('/admin/site-setting/pages/home/homeSlider', 'PUT', formData);
});
$('.AboutUsPageSetting').submit((e) => {
  e.preventDefault();
  let aboutUsheader = $('.AboutUsPageSetting input[name = "aboutUsheader"]');
  let aboutUsheaderDesc = $('.AboutUsPageSetting textarea[name = "aboutUsheaderDesc"]');
  let photo = $('.AboutUsPageSetting input[name = "photo"]');
  let photoVal = $('.AboutUsPageSetting input[name = "photo"]');

  let formData = new FormData();
  formData.append('aboutUsheader', aboutUsheader.val());
  formData.append('aboutUsheaderDesc', aboutUsheaderDesc.val());
  formData.append('photo', photo[0].files[0]);
  formData.append('photoVal', photoVal.val());

  Fetch('/admin/site-setting/pages/home/aboutUs', 'PUT', formData);
});
$('.AbilitySetting').submit((e) => {
  e.preventDefault();
  let abilityitem1 = $('input[name = "abilityitem1"]');
  let abilityDescitem1 = $('.AbilitySetting input[name = "abilityDescitem1"]');
  let abilityitem2 = $('.AbilitySetting input[name = "abilityitem2"]');
  let abilityDescitem2 = $('.AbilitySetting input[name = "abilityDescitem2"]');
  let abilityitem3 = $('.AbilitySetting input[name = "abilityitem3"]');
  let abilityDescitem3 = $('.AbilitySetting input[name = "abilityDescitem3"]');
  let abilityitem4 = $('.AbilitySetting input[name = "abilityitem4"]');
  let abilityDescitem4 = $('.AbilitySetting input[name = "abilityDescitem4"]');
  let abilityitem5 = $('.AbilitySetting input[name = "abilityitem5"]');
  let abilityDescitem5 = $('.AbilitySetting input[name = "abilityDescitem5"]');
  let abilityitem6 = $('.AbilitySetting input[name = "abilityitem6"]');
  let abilityDescitem6 = $('.AbilitySetting input[name = "abilityDescitem6"]');

  const body = {
    abilityitem1: abilityitem1.val(),
    abilityDescitem1: abilityDescitem1.val(),
    abilityitem2: abilityitem2.val(),
    abilityDescitem2: abilityDescitem2.val(),
    abilityitem3: abilityitem3.val(),
    abilityDescitem3: abilityDescitem3.val(),
    abilityitem4: abilityitem4.val(),
    abilityDescitem4: abilityDescitem4.val(),
    abilityitem5: abilityitem5.val(),
    abilityDescitem5: abilityDescitem5.val(),
    abilityitem6: abilityitem6.val(),
    abilityDescitem6: abilityDescitem6.val()
  }

  Fetch2('/admin/site-setting/pages/home/ability', 'PUT', body);
});
$('.ParallaxSetting').submit((e) => {
  e.preventDefault();
  let headerParallax = $('.ParallaxSetting input[name = "headerParallax"]');
  let descParallax = $('.ParallaxSetting input[name = "descParallax"]');
  let photo = $('.ParallaxSetting input[name = "photo"]');
  let photoVal = $('.ParallaxSetting input[name = "photo"]');

  let formData = new FormData();
  formData.append('headerParallax', headerParallax.val());
  formData.append('descParallax', descParallax.val());
  formData.append('photo', photo[0].files[0]);
  formData.append('photoVal', photoVal.val());

  Fetch('/admin/site-setting/pages/home/parallax', 'PUT', formData);
});
/////////Profile////////////
$('.ProfileEdit').submit((e) => {
  e.preventDefault();
  let name = $('input[name = "name"]');
  let family = $('input[name = "family"]');
  let photo = $('input[name = "photo"]');
  let photoVal = $('input[name = "photo"]');
  let newPass = $('input[name = "newPass"]');
  let replayNewPass = $('input[name = "replayNewPass"]');

  let formData = new FormData();
  formData.append('name', name.val());
  formData.append('family', family.val());
  formData.append('photo', photo[0].files[0]);
  formData.append('photoVal', photoVal.val());
  formData.append('newPass', newPass.val());
  formData.append('replayNewPass', replayNewPass.val());

  Fetch('/admin/profile/edit', 'PUT', formData);
});
///////////Blog Category//////////////
$('.CategoryBlogCreate').submit((e) => {
  e.preventDefault();
  let name = $('input[name = "name"]');
  let slug = $('input[name = "slug"]');
  let desc = $('input[name = "desc"]');
  let photo = $('input[name = "photo"]');
  let photoVal = $('input[name = "photo"]');

  let formData = new FormData();
  formData.append('name', name.val());
  formData.append('slug', slug.val());
  formData.append('desc', desc.val());
  formData.append('photo', photo[0].files[0]);
  formData.append('photoVal', photoVal.val());

  Fetch('/admin/blogs/categories/add', 'POST', formData);
});

$('.UpdateCategory').submit((e) => {
  e.preventDefault();
  let name = $('input[name = "name"]');
  let slug = $('input[name = "slug"]');
  let desc = $('input[name = "desc"]');
  let photo = $('input[name = "photo"]');
  let photoVal = $('input[name = "photo"]');

  let formData = new FormData();
  formData.append('name', name.val());
  formData.append('slug', slug.val());
  formData.append('desc', desc.val());
  formData.append('photo', photo[0].files[0]);
  formData.append('photoVal', photoVal.val());

  let pathName = window.location.pathname.split('/');
  let catSlug = pathName[pathName.length-1];    
  Fetch(`/admin/blogs/categories/${catSlug}/update`, 'PUT', formData);
});

$('.CreateBlog').submit((e) => {
  e.preventDefault();
  let title = $('input[name = "title"]');
  let slug = $('input[name = "slug"]');
  let summery = $('textarea[name="summery"]');
  let tags = $('input[name="tags"]');
  let photo = $('input[name = "photo"]');
  let photoVal = $('input[name = "photo"]');
  let data = CKEDITOR.instances.editor1.getData();

  let formData = new FormData();
  formData.append('title', title.val());
  formData.append('slug', slug.val());
  formData.append('summery', summery.val());
  formData.append('description', data);
  formData.append('tags', tags.val());
  formData.append('photo', photo[0].files[0]);
  formData.append('photoVal', photoVal.val());

  let pathName = window.location.pathname.split('/');
  let catSlug = pathName[pathName.length - 3];
  Fetch(`/admin/blogs/categories/${catSlug}/blog/add`, 'POST', formData);
});


let blogs = $('.deleteBlog');
$.each(blogs, function (indexInArray, blog) {
  $(blog).click(function (e) {
    e.preventDefault();
    let blogId = $(blog).attr('value');
    let body = {
      blog: blogId
    };
    let pathName = window.location.pathname.split('/');
    let catSlug = pathName[pathName.length - 3];
    Fetch2(`/admin/blogs/categories/${catSlug}/blog/delete`, 'DELETE', body);
  });
});

$('.UpdateBlog').submit((e) => {
  e.preventDefault();
  let title = $('input[name = "title"]');
  let slug = $('input[name = "slug"]');
  let summery = $('textarea[name="summery"]');
  let tags = $('input[name="tags"]');
  let photo = $('input[name = "photo"]');
  let photoVal = $('input[name = "photo"]');
  let data = CKEDITOR.instances.editor1.getData();

  let formData = new FormData();
  formData.append('title', title.val());
  formData.append('slug', slug.val());
  formData.append('summery', summery.val());
  formData.append('description', data);
  formData.append('tags', tags.val());
  formData.append('photo', photo[0].files[0]);
  formData.append('photoVal', photoVal.val());
  

  let pathName = window.location.pathname.split('/');
  let catSlug = pathName[pathName.length - 2];
  let blogSlug = pathName[pathName.length - 1];
  Fetch(`/admin/blogs/categories/${catSlug}/${blogSlug}`, 'PUT', formData);

});
///////////About Page///////////////
$('.AboutHeader').submit((e) => {
  e.preventDefault();
  let title = $('.AboutHeader input[name = "title"]');
  let photo = $('.AboutHeader input[name = "photo"]');
  let photoVal = $('.AboutHeader input[name = "photo"]');

  let formData = new FormData();
  formData.append('title', title.val());
  formData.append('photo', photo[0].files[0]);
  formData.append('photoVal', photoVal.val());

  Fetch('/admin/site-setting/pages/about/header', 'PUT', formData);
});

$('.AboutDesc1').submit((e) => {
  e.preventDefault();
  let data = CKEDITOR.instances.desc1.getData();
  const body = {desc : data}
  Fetch2('/admin/site-setting/pages/about/description', 'PUT', body);
});

$('.AboutArticles').submit((e) => {
  e.preventDefault();
  let item1 = $('.AboutArticles input[name = "item1"]');
  let Descitem1 = $('.AboutArticles input[name = "Descitem1"]');

  let item2 = $('.AboutArticles input[name = "item2"]');
  let Descitem2 = $('.AboutArticles input[name = "Descitem2"]');

  let item3 = $('.AboutArticles input[name = "item3"]');
  let Descitem3 = $('.AboutArticles input[name = "Descitem3"]');

  let item4 = $('.AboutArticles input[name = "item4"]');
  let Descitem4 = $('.AboutArticles input[name = "Descitem4"]');

  let item5 = $('.AboutArticles input[name = "item5"]');
  let Descitem5 = $('.AboutArticles input[name = "Descitem5"]');

  let item6 = $('.AboutArticles input[name = "item6"]');
  let Descitem6 = $('.AboutArticles input[name = "Descitem6"]');
  
  const body = {
    item1 : item1.val(),Descitem1 : Descitem1.val(),
    item2 : item2.val(),Descitem2 : Descitem2.val(),
    item3 : item3.val(),Descitem3 : Descitem3.val(),
    item4 : item4.val(),Descitem4 : Descitem4.val(),
    item5 : item5.val(),Descitem5 : Descitem5.val(),
    item6 : item6.val(),Descitem6 : Descitem6.val()
  }
  
  Fetch2('/admin/site-setting/pages/about/articles', 'PUT', body);
});

$('.AboutParallax').submit((e) => {
  e.preventDefault();
  let photo = $('.AboutParallax input[name = "photo"]');
  let photoVal = $('.AboutParallax input[name = "photo"]');

  let formData = new FormData();
  formData.append('photo', photo[0].files[0]);
  formData.append('photoVal', photoVal.val());

  Fetch('/admin/site-setting/pages/about/parallax', 'PUT', formData);
});

///////////SEO Page///////////////
$('.SEOHeader').submit((e) => {
  e.preventDefault();
  let title = $('.SEOHeader input[name = "title"]');
  let photo = $('.SEOHeader input[name = "photo"]');
  let photoVal = $('.SEOHeader input[name = "photo"]');

  let formData = new FormData();
  formData.append('title', title.val());
  formData.append('photo', photo[0].files[0]);
  formData.append('photoVal', photoVal.val());

  Fetch('/admin/site-setting/pages/seo/header', 'PUT', formData);
});
$('.SEODesc').submit((e) => {
  e.preventDefault();
  let data = CKEDITOR.instances.desc.getData();
  const body = {desc : data}
  Fetch2('/admin/site-setting/pages/seo/description', 'PUT', body);
});
$('.SEOArticles').submit((e) => {
  e.preventDefault();
  let item1 = $('.SEOArticles input[name = "item1"]');
  let Descitem1 = $('.SEOArticles input[name = "Descitem1"]');

  let item2 = $('.SEOArticles input[name = "item2"]');
  let Descitem2 = $('.SEOArticles input[name = "Descitem2"]');

  let item3 = $('.SEOArticles input[name = "item3"]');
  let Descitem3 = $('.SEOArticles input[name = "Descitem3"]');

  let item4 = $('.SEOArticles input[name = "item4"]');
  let Descitem4 = $('.SEOArticles input[name = "Descitem4"]');

  let item5 = $('.SEOArticles input[name = "item5"]');
  let Descitem5 = $('.SEOArticles input[name = "Descitem5"]');

  let item6 = $('.SEOArticles input[name = "item6"]');
  let Descitem6 = $('.SEOArticles input[name = "Descitem6"]');

  const body = {
    item1: item1.val(),
    Descitem1: Descitem1.val(),
    item2: item2.val(),
    Descitem2: Descitem2.val(),
    item3: item3.val(),
    Descitem3: Descitem3.val(),
    item4: item4.val(),
    Descitem4: Descitem4.val(),
    item5: item5.val(),
    Descitem5: Descitem5.val(),
    item6: item6.val(),
    Descitem6: Descitem6.val()
  }

  Fetch2('/admin/site-setting/pages/seo/articles', 'PUT', body);
});
$('.SEOParallax').submit((e) => {
  e.preventDefault();
  let photo = $('.SEOParallax input[name = "photo"]');
  let photoVal = $('.SEOParallax input[name = "photo"]');

  let formData = new FormData();
  formData.append('photo', photo[0].files[0]);
  formData.append('photoVal', photoVal.val());

  Fetch('/admin/site-setting/pages/seo/parallax', 'PUT', formData);
});
/////////////Users///////////////
$(".NewUser").submit(e => {
  e.preventDefault();
  let name = $('.NewUser input[name = "name"]');
  let job = $('.NewUser input[name = "job"]');
  let telegram = $('.NewUser input[name = "telegram"]');
  let whatsapp = $('.NewUser input[name = "whatsapp"]');
  let website = $('.NewUser input[name = "website"]');
  let email = $('.NewUser input[name = "email"]');
  let instagram = $('.NewUser input[name = "instagram"]');
  let facebook = $('.NewUser input[name = "facebook"]');
  let photo = $('.NewUser input[name = "photo"]');
  let photoVal = $('.NewUser input[name = "photo"]');

  let formData = new FormData();
  formData.append("name", name.val());
  formData.append("job", job.val());
  formData.append("telegram", telegram.val());
  formData.append("whatsapp", whatsapp.val());
  formData.append("website", website.val());
  formData.append("email", email.val());
  formData.append("instagram", instagram.val());
  formData.append("facebook", facebook.val());

  formData.append("photo", photo[0].files[0]);
  formData.append("photoVal", photoVal.val());

  Fetch("/admin/users/add", "POST", formData);
});

let boxChecks = $('.user-box input.box-check');
let userIds = [];
$.each(boxChecks, function (indexInArray, box) {
  $(box).click(function (e) {
    if ($(box).is(':checked')) {
      userIds.push(box.value);
    } else {
      userIds.pop(box.value);
    }
  });
});


$(".RemoveUser").click(function (e) {
  e.preventDefault();
  iziToast.question({
    timeout: 20000,
    close: false,
    overlay: true,
    displayMode: 'once',
    id: 'question',
    zindex: 999,
    title: 'اخطار',
    rtl: true,
    message: 'آیا از حذف کاربر مورد نظر مطمئن هستید ؟',
    position: 'center',
    buttons: [
      ['<button><b>بله</b></button>', function (instance, toast) {
        instance.hide({
          transitionOut: 'fadeOut'
        }, toast, 'button');
        Fetch2("/admin/users/delete", "DELETE", userIds);

      }, true],
      ['<button>خیر</button>', function (instance, toast) {
        instance.hide({
          transitionOut: 'fadeOut'
        }, toast, 'button');
      }],
    ]
  });
});

$(".RemoveFolder").click(function (e) {
  e.preventDefault();
  iziToast.question({
    timeout: 20000,
    close: false,
    overlay: true,
    displayMode: 'once',
    id: 'question',
    zindex: 999,
    title: 'اخطار',
    rtl: true,
    message: 'آیا از حذف دسته بندی مورد نظر مطمئن هستید ؟',
    position: 'center',
    buttons: [
      ['<button><b>بله</b></button>', function (instance, toast) {
        instance.hide({
          transitionOut: 'fadeOut'
        }, toast, 'button');
        Fetch2("/admin/blogs/categories", "DELETE", userIds);

      }, true],
      ['<button>خیر</button>', function (instance, toast) {
        instance.hide({
          transitionOut: 'fadeOut'
        }, toast, 'button');
      }],
    ]
  });
});


$(".UserBackground").submit(e => {
  e.preventDefault();
  let photo = $('.UserBackground input[name = "photo"]');
  let photoVal = $('.UserBackground input[name = "photo"]');

  let formData = new FormData();

  formData.append("photo", photo[0].files[0]);
  formData.append("photoVal", photoVal.val());

  let pathName = window.location.pathname.split('/');
  let catSlug = pathName[pathName.length - 1];
  Fetch(`/admin/users/${catSlug}/background`, "PUT", formData);
});

$(".UpdateUser").submit(e => {
  e.preventDefault();
  let name = $('.UpdateUser input[name = "name"]');
  let job = $('.UpdateUser input[name = "job"]');
  let telegram = $('.UpdateUser input[name = "telegram"]');
  let whatsapp = $('.UpdateUser input[name = "whatsapp"]');
  let website = $('.UpdateUser input[name = "website"]');
  let email = $('.UpdateUser input[name = "email"]');
  let instagram = $('.UpdateUser input[name = "instagram"]');
  let facebook = $('.UpdateUser input[name = "facebook"]');
  let photo = $('.UpdateUser input[name = "photo"]');
  let photoVal = $('.UpdateUser input[name = "photo"]');

  let formData = new FormData();
  formData.append("name", name.val());
  formData.append("job", job.val());
  formData.append("telegram", telegram.val());
  formData.append("whatsapp", whatsapp.val());
  formData.append("website", website.val());
  formData.append("email", email.val());
  formData.append("instagram", instagram.val());
  formData.append("facebook", facebook.val());

  formData.append("photo", photo[0].files[0]);
  formData.append("photoVal", photoVal.val());

  let pathName = window.location.pathname.split('/');
  let catSlug = pathName[pathName.length - 1];
  Fetch(`/admin/users/${catSlug}/update`, "PUT", formData);
});

/////////////Website/////////////////
$(".websites").submit(e => {
  e.preventDefault();
  let name = $('.websites input[name = "name"]');
  let link = $('.websites input[name = "link"]');
  let slug = $('.websites input[name = "slug"]');
  let data = CKEDITOR.instances.editor1.getData();

  let logo = $('.websites input[name = "logo"]');
  let logoVal = $('.websites input[name = "logo"]');
  let previewImage = $('.websites input[name = "previewImage"]');
  let previewImageVal = $('.websites input[name = "previewImage"]');
  let imagesVal = $('.gallery-box .box-wrap .box').length;

  let formData = new FormData();
  formData.append("name", name.val());
  formData.append("link", link.val());
  formData.append("slug", slug.val());
  formData.append("desc", data);
  formData.append("logo", logo[0].files[0]);
  formData.append("logoVal", logoVal.val());
  formData.append("previewImage", previewImage[0].files[0]);
  formData.append("previewImageVal", previewImageVal.val());
  formData.append("imagesVal", imagesVal);
  $.each(boxsData, function (indexInArray, boxData) {
    formData.append(`images`, boxData);
  });
  
  Fetch(`/admin/websites/add`, "POST", formData);
});
let websites = $('.deleteWebsite');
$.each(websites, function (indexInArray, website) {
  $(website).click(function (e) {
    e.preventDefault();
    let websiteId = $(website).attr('value');
    let body = {
      website: websiteId
    };
    iziToast.question({
      timeout: 20000,
      close: false,
      overlay: true,
      displayMode: 'once',
      id: 'question',
      zindex: 999,
      title: 'اخطار',
      rtl: true,
      message: 'آیا از حذف وب سایت مورد نظر مطمئن هستید ؟',
      position: 'center',
      buttons: [
        ['<button><b>بله</b></button>', function (instance, toast) {
          instance.hide({
            transitionOut: 'fadeOut'
          }, toast, 'button');
          Fetch2('/admin/websites', 'DELETE', body);
        }, true],
        ['<button>خیر</button>', function (instance, toast) {
          instance.hide({
            transitionOut: 'fadeOut'
          }, toast, 'button');
        }],
      ]
    });
    
  });
});

$(".UpdateWebsites").submit(e => {
  e.preventDefault();
  let name = $('.UpdateWebsites input[name = "name"]');
  let link = $('.UpdateWebsites input[name = "link"]');
  let slug = $('.UpdateWebsites input[name = "slug"]');
  let data = CKEDITOR.instances.editor1.getData();

  let logo = $('.UpdateWebsites input[name = "logo"]');
  let logoVal = $('.UpdateWebsites input[name = "logo"]');
  let previewImage = $('.UpdateWebsites input[name = "previewImage"]');
  let previewImageVal = $('.UpdateWebsites input[name = "previewImage"]');
  let imagesVal = $('.gallery-box .box-wrap .box').length;

  let formData = new FormData();
  formData.append("name", name.val());
  formData.append("link", link.val());
  formData.append("slug", slug.val());
  formData.append("desc", data);
  formData.append("logo", logo[0].files[0]);
  formData.append("logoVal", logoVal.val());
  formData.append("previewImage", previewImage[0].files[0]);
  formData.append("previewImageVal", previewImageVal.val());
  formData.append("imagesVal", imagesVal);
  $.each(boxsData, function (indexInArray, boxData) {
    formData.append(`images`, boxData);
  });

  let pathName = window.location.pathname.split('/');
  let catSlug = pathName[pathName.length - 1];
  Fetch(`/admin/websites/${catSlug}`, "PUT", formData);
});
///////////Application////////////////
$(".applications").submit(e => {
  e.preventDefault();
  let name = $('.applications input[name = "name"]');
  let link = $('.applications input[name = "link"]');
  let slug = $('.applications input[name = "slug"]');

  let appstore = $('.applications input[name = "appstore"]');
  let sibapp = $('.applications input[name = "sibapp"]');
  let googleplay = $('.applications input[name = "googleplay"]');
  let cafebazar = $('.applications input[name = "cafebazar"]');

  let data = CKEDITOR.instances.editor1.getData();
  let logo = $('.applications input[name = "logo"]');
  let logoVal = $('.applications input[name = "logo"]');
  let previewImage = $('.applications input[name = "previewImage"]');
  let previewImageVal = $('.applications input[name = "previewImage"]');
  let imagesVal = $('.gallery-box .box-wrap .box').length;

  let formData = new FormData();
  formData.append("name", name.val());
  formData.append("link", link.val());
  formData.append("slug", slug.val());

  formData.append("appstore", appstore.val());
  formData.append("sibapp", sibapp.val());
  formData.append("googleplay", googleplay.val());
  formData.append("cafebazar", cafebazar.val());

  formData.append("desc", data);
  formData.append("logo", logo[0].files[0]);
  formData.append("logoVal", logoVal.val());
  formData.append("previewImage", previewImage[0].files[0]);
  formData.append("previewImageVal", previewImageVal.val());
  formData.append("imagesVal", imagesVal);
  $.each(boxsData, function (indexInArray, boxData) {
    formData.append(`images`, boxData);
  });

  Fetch(`/admin/applications/add`, "POST", formData);
});
let applications = $('.deleteApplication');
$.each(applications, function (indexInArray, application) {
  $(application).click(function (e) {
    e.preventDefault();
    let applicationId = $(application).attr('value');
    let body = {
      application: applicationId
    };
    iziToast.question({
      timeout: 20000,
      close: false,
      overlay: true,
      displayMode: 'once',
      id: 'question',
      zindex: 999,
      title: 'اخطار',
      rtl: true,
      message: 'آیا از حذف اپلیکیشن مورد نظر مطمئن هستید ؟',
      position: 'center',
      buttons: [
        ['<button><b>بله</b></button>', function (instance, toast) {
          instance.hide({
            transitionOut: 'fadeOut'
          }, toast, 'button');
          Fetch2('/admin/applications', 'DELETE', body);
        }, true],
        ['<button>خیر</button>', function (instance, toast) {
          instance.hide({
            transitionOut: 'fadeOut'
          }, toast, 'button');
        }],
      ]
    });

  });
});
$(".UpdateApplications").submit(e => {
  e.preventDefault();
  let name = $('.UpdateApplications input[name = "name"]');
  let link = $('.UpdateApplications input[name = "link"]');
  let slug = $('.UpdateApplications input[name = "slug"]');
  let appstore = $('.UpdateApplications input[name = "appstore"]');
  let sibapp = $('.UpdateApplications input[name = "sibapp"]');
  let googleplay = $('.UpdateApplications input[name = "googleplay"]');
  let cafebazar = $('.UpdateApplications input[name = "cafebazar"]');
  let data = CKEDITOR.instances.editor1.getData();
  let logo = $('.UpdateApplications input[name = "logo"]');
  let logoVal = $('.UpdateApplications input[name = "logo"]');
  let previewImage = $('.UpdateApplications input[name = "previewImage"]');
  let previewImageVal = $('.UpdateApplications input[name = "previewImage"]');
  let imagesVal = $('.gallery-box .box-wrap .box').length;

  let formData = new FormData();
  formData.append("name", name.val());
  formData.append("link", link.val());
  formData.append("slug", slug.val());
  formData.append("desc", data);
  formData.append("appstore", appstore.val());
  formData.append("sibapp", sibapp.val());
  formData.append("googleplay", googleplay.val());
  formData.append("cafebazar", cafebazar.val());
  formData.append("logo", logo[0].files[0]);
  formData.append("logoVal", logoVal.val());
  formData.append("previewImage", previewImage[0].files[0]);
  formData.append("previewImageVal", previewImageVal.val());
  formData.append("imagesVal", imagesVal);
  $.each(boxsData, function (indexInArray, boxData) {
    formData.append(`images`, boxData);
  });

  let pathName = window.location.pathname.split('/');
  let catSlug = pathName[pathName.length - 1];
  Fetch(`/admin/applications/${catSlug}`, "PUT", formData);
});

$(".SiteInfo").submit(e => {
  e.preventDefault();
  let method = $('.SiteInfo input[name = "method"]');
  let nameEn = $('.SiteInfo input[name = "nameEn"]');
  let nameFa = $('.SiteInfo input[name = "nameFa"]');
  let telegram = $('.SiteInfo input[name = "telegram"]');
  let whatsapp = $('.SiteInfo input[name = "whatsapp"]');
  let instagram = $('.SiteInfo input[name = "instagram"]');
  let facebook = $('.SiteInfo input[name = "facebook"]');
  let linkedin = $('.SiteInfo input[name = "linkedin"]');
  let version = $('.SiteInfo input[name = "version"]');
  let logo = $('.SiteInfo input[name = "logo"]');
  let logoVal = $('.SiteInfo input[name = "logo"]');
  let debug = false;
  if ($('.SiteInfo input[name = "debug"]').is(':checked')) {
    debug = true;
  }

  let formData = new FormData();
  formData.append("nameEn", nameEn.val());
  formData.append("nameFa", nameFa.val());
  formData.append("telegram", telegram.val());
  formData.append("whatsapp", whatsapp.val());
  formData.append("instagram", instagram.val());
  formData.append("facebook", facebook.val());
  formData.append("linkedin", linkedin.val());
  formData.append("version", version.val());
  formData.append("logo", logo[0].files[0]);
  formData.append("logoVal", logoVal.val());
  formData.append("debug", debug);

  Fetch(`/admin/site-info`, `${method.val()}`, formData);
});

$(".WebsitePage").submit(e => {
  e.preventDefault();
  let method = $('.WebsitePage input[name = "method"]');
  let title = $('.WebsitePage input[name = "title"]');
  let background = $('.WebsitePage input[name = "photo"]');
  let backgroundVal = $('.WebsitePage input[name = "photo"]');
  let data = CKEDITOR.instances.desc1.getData();
  
  let formData = new FormData();
  formData.append("title", title.val());
  formData.append("desc", data);
  formData.append("background", background[0].files[0]);
  formData.append("backgroundVal", backgroundVal.val());

  Fetch(`/admin/site-setting/pages/websites`, `${method.val()}`, formData);
});

$(".AppPage").submit(e => {
  e.preventDefault();
  let method = $('.AppPage input[name = "method"]');
  let title = $('.AppPage input[name = "title"]');
  let background = $('.AppPage input[name = "photo"]');
  let backgroundVal = $('.AppPage input[name = "photo"]');
  let data = CKEDITOR.instances.desc1.getData();

  let formData = new FormData();
  formData.append("title", title.val());
  formData.append("desc", data);
  formData.append("background", background[0].files[0]);
  formData.append("backgroundVal", backgroundVal.val());

  Fetch(`/admin/site-setting/pages/applications`, `${method.val()}`, formData);
});