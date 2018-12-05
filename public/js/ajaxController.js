
import {Fetch2} from './ajaxFetch';

$('.contactPage').submit((e) => {
  e.preventDefault();
  let fullName = $('input[name = "fullName"]');
  let email = $('input[name = "email"]');
  let subject = $('input[name = "subject"]');
  let recaptcha = $('input[name = "recaptcha"]');
  let description = $('textarea[name = "description"]');

  const body = {
    fullName    : fullName.val(),
    email       : email.val(),
    subject     : subject.val(),
    description : description.val(),
    recaptcha   : recaptcha.val(),
  };
  Fetch2('/contact', 'POST', body);
});

$('.adminLogin').submit((e) => {
  e.preventDefault();
  let email = $('input[name = "email"]');
  let password = $('input[name = "password"]');
  let recaptcha = $('input[name = "recaptcha"]');
  let remember = false;
  if ($('input[name = "remember"]').is(':checked')) {
    remember = true;
  }
  const body = {
    email: email.val(),
    password: password.val(),
    recaptcha : recaptcha.val(),
    remember
  };
  Fetch2('/admin/login', 'POST', body);
});







