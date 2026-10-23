/* ==========================================================================
   Листва — main.js
   Общий интерфейс: шапка, бургер-меню, популярные растения, форма подписки
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {
  initHeader();
  initBurgerMenu();
  renderPopular();
  initSubscribeForm();

  if (typeof Cart !== 'undefined') {
    Cart.bind();
    Cart.render();
  }
});

/* --- Шапка: подчёркивание при прокрутке ------------------------------------- */

function initHeader() {
  const header = document.querySelector('[data-header]');
  if (!header) return;

  const update = function () {
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  };

  update();
  window.addEventListener('scroll', update, { passive: true });
}

/* --- Бургер-меню ---------------------------------------------------------- */

function initBurgerMenu() {
  const burger = document.querySelector('[data-burger]');
  const menu = document.querySelector('[data-mobile-menu]');
  if (!burger || !menu) return;

  const close = function () {
    menu.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Открыть меню');
  };

  burger.addEventListener('click', function () {
    const isOpen = menu.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', String(isOpen));
    burger.setAttribute('aria-label', isOpen ? 'Закрыть меню' : 'Открыть меню');
  });

  menu.addEventListener('click', function (event) {
    if (event.target.closest('a')) close();
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && menu.classList.contains('is-open')) {
      close();
      burger.focus();
    }
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth >= 768) close();
  });
}

/* --- Популярные растения на главной ---------------------------------------- */

function renderPopular() {
  const grid = document.querySelector('[data-popular-grid]');
  if (!grid) return;

  const popular = PRODUCTS.slice().sort(function (a, b) {
    return b.popularity - a.popularity;
  }).slice(0, 4);

  grid.innerHTML = popular.map((product) => productCardMarkup(product, 'h3')).join('');
}

/* --- Форма подписки --------------------------------------------------------- */

function initSubscribeForm() {
  const form = document.querySelector('[data-subscribe]');
  if (!form) return;

  const input = form.querySelector('input[type="email"]');
  const error = form.querySelector('[data-subscribe-error]');
  const success = form.querySelector('[data-subscribe-success]');
  const button = form.querySelector('[data-subscribe-submit]');
  const EMAIL = /^[^\s@]+@[^\s@]+\.[a-zA-Zа-яА-Я]{2,}$/;

  const setError = function (message) {
    error.textContent = message;
    error.hidden = !message;
    success.hidden = true;
    input.setAttribute('aria-invalid', message ? 'true' : 'false');
  };

  const setSuccess = function (message) {
    error.hidden = true;
    error.textContent = '';
    success.textContent = message;
    success.hidden = false;
  };

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const value = input.value.trim();

    if (!value) {
      setError('Введите адрес почты');
      input.focus();
      return;
    }

    if (!EMAIL.test(value)) {
      setError('Проверьте адрес почты — похоже, в нём опечатка');
      input.focus();
      return;
    }

    button.disabled = true;
    button.textContent = 'Отправляем…';

    window.setTimeout(function () {
      button.disabled = false;
      button.textContent = 'Подписаться';
      form.reset();
      setSuccess('Готово! Мы пришлём письмо с советами по уходу.');
    }, 600);
  });

  input.addEventListener('input', function () {
    if (!error.hidden) setError('');
  });
}
