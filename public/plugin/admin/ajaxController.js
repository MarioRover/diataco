$('.contactPageSetting').submit((e) => {
  e.preventDefault();
  let address = $('input[name = "address"]');
  let iconAddress = $('input[name = "iconAddress"]');
  let email = $('input[name = "email"]');
  let iconEmail = $('input[name = "iconEmail"]');
  let telephone = $('input[name = "telephone"]');
  let iconTelephone = $('input[name = "iconTelephone"]');
  let photo = $('input[name = "photo"]');
  let photoVal = $('input[name = "photo"]');

  let formData = new FormData();
  formData.append('address', address.val());
  formData.append('iconAddress', iconAddress.val());
  formData.append('email', email.val());
  formData.append('iconEmail', iconEmail.val());
  formData.append('telephone', telephone.val());
  formData.append('iconTelephone', iconTelephone.val());
  formData.append('photo', photo[0].files[0]);
  formData.append('photoVal', photoVal.val());

   //Fetch('/admin/site-setting/pages/contact','POST',formData);
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

$('.AboutUsPageSetting').submit((e) => {
  e.preventDefault();
  let aboutUsheader = $('input[name = "aboutUsheader"]');
  let aboutUsheaderDesc = $('textarea[name = "aboutUsheaderDesc"]');
  let aboutUsphoto = $('input[name = "aboutUsphoto"]');
  let aboutUsphotoVal = $('input[name = "aboutUsphoto"]');

  let formData = new FormData();
  formData.append('aboutUsheader', aboutUsheader.val());
  formData.append('aboutUsheaderDesc', aboutUsheaderDesc.val());
  formData.append('aboutUsphoto', aboutUsphoto[0].files[0]);
  formData.append('aboutUsphotoVal', aboutUsphotoVal.val());

  Fetch('/admin/site-setting/pages/home/about', 'PUT', formData);
});

$('.ParallaxSetting').submit((e) => {
  e.preventDefault();
  let headerParallax = $('input[name = "headerParallax"]');
  let descParallax = $('input[name = "descParallax"]');
  let parallaxphoto = $('input[name = "parallaxphoto"]');
  let parallaxphotoVal = $('input[name = "parallaxphoto"]');

  let formData = new FormData();
  formData.append('headerParallax', headerParallax.val());
  formData.append('descParallax', descParallax.val());
  formData.append('parallaxphoto', parallaxphoto[0].files[0]);
  formData.append('parallaxphotoVal', parallaxphotoVal.val());

  Fetch('/admin/site-setting/pages/home/parallax', 'PUT', formData);
});

$('.HomeSliderSetting').submit((e) => {
  e.preventDefault();
  let homeSlideritem1 = $('input[name = "homeSlideritem1"]');
  let homeSlidericonItem1 = $('input[name = "homeSlidericonItem1"]');
  let homeSlideritem2 = $('input[name = "homeSlideritem2"]');
  let homeSlidericonItem2 = $('input[name = "homeSlidericonItem2"]');
  let homeSlideritem3 = $('input[name = "homeSlideritem3"]');
  let homeSlidericonItem3 = $('input[name = "homeSlidericonItem3"]');
  let homeSliderphoto = $('input[name = "homeSliderPhoto"]');
  let homeSliderphotoVal = $('input[name = "homeSliderPhoto"]');

  let formData = new FormData();
  formData.append('homeSlideritem1', homeSlideritem1.val());
  formData.append('homeSlidericonItem1', homeSlidericonItem1.val());
  formData.append('homeSlideritem2', homeSlideritem2.val());
  formData.append('homeSlidericonItem2', homeSlidericonItem2.val());
  formData.append('homeSlideritem3', homeSlideritem3.val());
  formData.append('homeSlidericonItem3', homeSlidericonItem3.val());
  formData.append('homeSliderphoto', homeSliderphoto[0].files[0]);
  formData.append('homeSliderphotoVal', homeSliderphotoVal.val());

  Fetch('/admin/site-setting/pages/home/homeslider', 'PUT', formData);
});

$('.AbilitySetting').submit((e) => {
  e.preventDefault();
  let abilityitem1 = $('input[name = "abilityitem1"]');
  let abilityIconitem1 = $('input[name = "abilityIconitem1"]');
  let abilityDescitem1 = $('input[name = "abilityDescitem1"]');
  let abilityitem2 = $('input[name = "abilityitem2"]');
  let abilityIconitem2 = $('input[name = "abilityIconitem2"]');
  let abilityDescitem2 = $('input[name = "abilityDescitem2"]');
  let abilityitem3 = $('input[name = "abilityitem3"]');
  let abilityIconitem3 = $('input[name = "abilityIconitem3"]');
  let abilityDescitem3 = $('input[name = "abilityDescitem3"]');
  let abilityitem4 = $('input[name = "abilityitem4"]');
  let abilityIconitem4 = $('input[name = "abilityIconitem4"]');
  let abilityDescitem4 = $('input[name = "abilityDescitem4"]');
  let abilityitem5 = $('input[name = "abilityitem5"]');
  let abilityIconitem5 = $('input[name = "abilityIconitem5"]');
  let abilityDescitem5 = $('input[name = "abilityDescitem5"]');
  let abilityitem6 = $('input[name = "abilityitem6"]');
  let abilityIconitem6 = $('input[name = "abilityIconitem6"]');
  let abilityDescitem6 = $('input[name = "abilityDescitem6"]');

  const body = {
    abilityitem1: abilityitem1.val(),
    abilityIconitem1: abilityIconitem1.val(),
    abilityDescitem1: abilityDescitem1.val(),
    abilityitem2: abilityitem2.val(),
    abilityIconitem2: abilityIconitem2.val(),
    abilityDescitem2: abilityDescitem2.val(),
    abilityitem3: abilityitem3.val(),
    abilityIconitem3: abilityIconitem3.val(),
    abilityDescitem3: abilityDescitem3.val(),
    abilityitem4: abilityitem4.val(),
    abilityIconitem4: abilityIconitem4.val(),
    abilityDescitem4: abilityDescitem4.val(),
    abilityitem5: abilityitem5.val(),
    abilityIconitem5: abilityIconitem5.val(),
    abilityDescitem5: abilityDescitem5.val(),
    abilityitem6: abilityitem6.val(),
    abilityIconitem6: abilityIconitem6.val(),
    abilityDescitem6: abilityDescitem6.val()
  }

  Fetch2('/admin/site-setting/pages/home/ability', 'PUT', body);
});

/////////Profile////////////
$('.ProfileEdit').submit((e) => {
  e.preventDefault();
  let name = $('input[name = "name"]');
  let family = $('input[name = "family"]');
  let photo = $('input[name = "photo"]');
  let photoVal = $('input[name = "photo"]');

  let formData = new FormData();
  formData.append('name', name.val());
  formData.append('family', family.val());
  formData.append('photo', photo[0].files[0]);
  formData.append('photoVal', photoVal.val());

  Fetch('/admin/profile/edit', 'PUT', formData);
});
///////////Blog Category//////////////
$('.CategoryBlogCreate').submit((e) => {
  e.preventDefault();
  let name = $('input[name = "name"]');
  let slug = $('input[name = "slug"]');
  let photo = $('input[name = "photo"]');
  let photoVal = $('input[name = "photo"]');

  let formData = new FormData();
  formData.append('name', name.val());
  formData.append('slug', slug.val());
  formData.append('photo', photo[0].files[0]);
  formData.append('photoVal', photoVal.val());

  Fetch('/admin/blogs/categories/add', 'POST', formData);
});

$('.UpdateCategory').submit((e) => {
  e.preventDefault();
  let name = $('input[name = "name"]');
  let slug = $('input[name = "slug"]');
  let photo = $('input[name = "photo"]');
  let photoVal = $('input[name = "photo"]');

  let formData = new FormData();
  formData.append('name', name.val());
  formData.append('slug', slug.val());
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
  let description = $('textarea[name="description"]');
  let tags = $('input[name="tags"]');
  let photo = $('input[name = "photo"]');
  let photoVal = $('input[name = "photo"]');

  let formData = new FormData();
  formData.append('title', title.val());
  formData.append('slug', slug.val());
  formData.append('summery', summery.val());
  formData.append('description', description.val());
  formData.append('tags', tags.val());
  formData.append('photo', photo[0].files[0]);
  formData.append('photoVal', photoVal.val());
  console.log(tags)

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
  let description = $('textarea[name="description"]');
  let tags = $('input[name="tags"]');
  let photo = $('input[name = "photo"]');
  let photoVal = $('input[name = "photo"]');

  let formData = new FormData();
  formData.append('title', title.val());
  formData.append('slug', slug.val());
  formData.append('summery', summery.val());
  formData.append('description', description.val());
  formData.append('tags', tags.val());
  formData.append('photo', photo[0].files[0]);
  formData.append('photoVal', photoVal.val());
  

  let pathName = window.location.pathname.split('/');
  let catSlug = pathName[pathName.length - 2];
  let blogSlug = pathName[pathName.length - 1];
  Fetch(`/admin/blogs/categories/${catSlug}/${blogSlug}`, 'PUT', formData);

});