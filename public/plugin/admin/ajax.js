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

   //çFetch('/admin/site-setting/pages/contact','POST',formData);
  Fetch('/admin/site-setting/pages/contact', 'PUT', formData);
});


const Fetch = (url,method,body) => {
  fetch(url, {method,body})
  .then(res => {
    return res.json();
  }).then(res => {
    let messages = res.data;
    if (typeof messages !== 'undefined') {
      messages.map(message => {
        izitoast(res.status, message);
      });
    }
  }).catch(err => {
    console.log(err);
  })
}