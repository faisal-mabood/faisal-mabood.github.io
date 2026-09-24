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
      formStatus.innerHTML = '<i class="fa fa-info-circle" aria-hidden="true"></i> Submitting opens your email app with the message addressed to Faisal.';
    }

    contactForm.addEventListener('submit', function (event) {
      event.preventDefault();
      var recipient = 'faisalmabood6@gmail.com';
      var name = contactForm.elements.name.value.trim();
      var email = contactForm.elements.email.value.trim();
      var message = contactForm.elements.message.value.trim();
      var subject = encodeURIComponent('Portfolio contact from ' + name);
      var body = encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\n' + message);
      window.location.href = 'mailto:' + recipient + '?subject=' + subject + '&body=' + body;
    });
  }
}());
