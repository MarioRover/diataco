
getToken().then(token => {token});
$('.contactPage').submit((e) => {
  e.preventDefault();
  let fullName = $('input[name = "fullName"]');
  let email = $('input[name = "email"]');
  let subject = $('input[name = "subject"]');
  let description = $('textarea[name = "description"]');
  let recaptcha = false;
  if (sessionStorage.getItem('recaptcha') == token) {
    recaptcha = true;
  }
  const body = {
    fullName    : fullName.val(),
    email       : email.val(),
    subject     : subject.val(),
    description : description.val(),
    recaptcha
  };
  Fetch2('/contact', 'POST', body);
});







