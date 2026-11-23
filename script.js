const menuButton = document.querySelector('.menu-button');
const navLinks = document.querySelector('.nav-links');

menuButton?.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const form = document.getElementById('booking-form');
const status = document.getElementById('form-status');

form?.addEventListener('submit', event => {
  event.preventEvent?.();
  event.preventDefault();

  const data = new FormData(form);
  const tutor = data.get('tutor');
  const name = data.get('name');
  const phone = data.get('phone');
  const format = data.get('format');
  const message = data.get('message');
  const tutorNumber = tutor?.toString().startsWith('German') ? '+37491479279' : tutor?.toString().startsWith('English') ? '+37491119661' : '';

  const text = `Hello! My name is ${name}. I would like to request a ${format} lesson with ${tutor}. My phone number is ${phone}.${message ? ` Message: ${message}` : ''}`;

  status.textContent = 'Your request is ready — choose a tutor below to send it.';

  if (tutorNumber) {
    const smsLink = document.createElement('a');
    smsLink.href = `sms:${tutorNumber}?body=${encodeURIComponent(text)}`;
    smsLink.textContent = 'Send request by text message';
    smsLink.style.cssText = 'display:block;text-align:center;color:#ff7a3d;font-weight:800;margin-top:8px';
    const previous = status.nextElementSibling;
    if (previous?.matches('.sms-link')) previous.remove();
    smsLink.className = 'sms-link';
    status.insertAdjacentElement('afterend', smsLink);
  } else {
    status.textContent = 'Please choose a tutor, or call us: German 091 479279 · English 091 119661';
  }
});
