(function () {
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.querySelector('.nav-links');
  var links = document.querySelectorAll('.nav-links a');

  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var isOpen = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    links.forEach(function (link) {
      link.addEventListener('click', function () {
        menu.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal').forEach(function (element) {
      observer.observe(element);
    });
  } else {
    document.querySelectorAll('.reveal').forEach(function (element) {
      element.classList.add('is-visible');
    });
  }

  var contactForm = document.querySelector('[data-contact-form]');
  if (contactForm) {
    var formStatus = contactForm.querySelector('[data-form-status]');
    if (formStatus) {
      formStatus.innerHTML = '<i class="fa fa-info-circle" aria-hidden="true"></i> Your message will be sent securely to Faisal.';
    }
    var submitButton = contactForm.querySelector('button[type="submit"]');
    if (submitButton) {
      submitButton.innerHTML = 'Send message <i class="fa fa-arrow-right" aria-hidden="true"></i>';
    }

    contactForm.addEventListener('submit', function (event) {
      event.preventDefault();
      var recipient = 'faisalmabood6@gmail.com';
      var name = contactForm.elements.name.value.trim();
      var email = contactForm.elements.email.value.trim();
      var message = contactForm.elements.message.value.trim();
      var submitButton = contactForm.querySelector('button[type="submit"]');
      var status = contactForm.querySelector('[data-form-status]');
      submitButton.disabled = true;
      submitButton.innerHTML = 'Sending...';

      fetch('https://formsubmit.co/ajax/' + recipient, {
        body: JSON.stringify({
          name: name,
          email: email,
          message: message,
          _subject: 'Portfolio contact from ' + name,
          _replyto: email,
          _template: 'table',
          _captcha: 'true'
        }),
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        method: 'POST'
      }).then(function (response) {
        if (!response.ok) {
          throw new Error('Form submission failed');
        }
        return response.json();
      }).then(function () {
        contactForm.reset();
        status.innerHTML = '<i class="fa fa-check" aria-hidden="true"></i> Message sent. Thank you for reaching out.';
        submitButton.disabled = false;
        submitButton.innerHTML = 'Send message <i class="fa fa-arrow-right" aria-hidden="true"></i>';
      }).catch(function () {
        status.innerHTML = '<i class="fa fa-warning" aria-hidden="true"></i> The form could not send. Please use the Email link above.';
        submitButton.disabled = false;
        submitButton.innerHTML = 'Send message <i class="fa fa-arrow-right" aria-hidden="true"></i>';
      });
    });
  }
}());
