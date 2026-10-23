/* ==========================================================================
   Листва — cart.js
   Корзина: состояние в localStorage, отрисовка панели, добавление и удаление
   ========================================================================== */

const Cart = (function () {
  const STORAGE_KEY = 'listva-cart-v1';
  const FREE_DELIVERY_FROM = 3000;

  let items = load();
  let lastFocused = null;

  /* --- Хранилище --------------------------------------------------------- */

  function load() {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      return [];
    }
  }

  function save() {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      /* приватный режим браузера — работаем без сохранения */
    }
  }

  /* --- Изменение состояния ------------------------------------------------ */

  function itemKey(id, sizeLabel) {
    return `${id}|${sizeLabel}`;
  }

  function add(id, sizeIndex) {
    const product = getProduct(id);
    if (!product) return false;

    const size = product.sizes[sizeIndex] || product.sizes[0];
    const key = itemKey(product.id, size.label);
    const existing = items.find((item) => item.key === key);

    if (existing) {
      existing.qty += 1;
    } else {
      items.push({
        key: key,
        id: product.id,
        name: product.name,
        size: size.label,
        sizePrice: size.price,
        price: product.price,
        image: product.images[0],
        qty: 1,
      });
    }

    save();
    render();
    return true;
  }

  function setQty(key, qty) {
    const item = items.find((entry) => entry.key === key);
    if (!item) return;

    if (qty <= 0) {
      remove(key);
      return;
    }

    item.qty = Math.min(qty, 99);
    save();
    render();
  }

  function remove(key) {
    items = items.filter((entry) => entry.key !== key);
    save();
    render();
  }

  function clear() {
    items = [];
    save();
    render();
  }

  /* --- Производные значения ------------------------------------------------ */

  function count() {
    return items.reduce((sum, item) => sum + item.qty, 0);
  }

  function total() {
    return items.reduce((sum, item) => sum + (item.price + item.sizePrice) * item.qty, 0);
  }

  function itemTotal(item) {
    return (item.price + item.sizePrice) * item.qty;
  }

  /* --- Отрисовка ------------------------------------------------------------ */

  function render() {
    const list = document.querySelector('[data-cart-list]');
    const totalNode = document.querySelector('[data-cart-total]');
    const hintNode = document.querySelector('[data-cart-hint]');
    const successNode = document.querySelector('[data-cart-success]');
    const badges = document.querySelectorAll('[data-cart-count]');

    badges.forEach((badge) => {
      const value = count();
      badge.textContent = String(value);
      badge.classList.toggle('badge--empty', value === 0);
    });

    if (successNode) {
      successNode.hidden = true;
      successNode.textContent = '';
    }

    if (totalNode) {
      totalNode.textContent = formatPrice(total());
    }

    if (hintNode) {
      const sum = total();
      if (items.length > 0 && sum < FREE_DELIVERY_FROM) {
        hintNode.textContent = `До бесплатной доставки осталось ${formatPrice(FREE_DELIVERY_FROM - sum)}`;
        hintNode.hidden = false;
      } else {
        hintNode.hidden = true;
        hintNode.textContent = '';
      }
    }

    if (!list) return;

    if (items.length === 0) {
      list.innerHTML = `
        <div class="cart__empty">
          <p class="cart__empty-title">В корзине пока пусто</p>
          <p class="cart__empty-text">Загляните в каталог — там есть растения на любой свет.</p>
          <a class="cart__empty-link" href="catalog.html">Перейти в каталог</a>
        </div>`;
      return;
    }

    list.innerHTML = items
      .map((item) => {
        const image = item.image
          ? `<img class="cart__image" src="${thumbImage(item.image)}" alt="${item.name}" width="200" height="250" loading="lazy" decoding="async">`
          : '';

        return `
        <article class="cart__item">
          <a class="cart__media" href="product.html?id=${item.id}">${image}</a>
          <div class="cart__info">
            <a class="cart__name" href="product.html?id=${item.id}">${item.name}</a>
            <p class="cart__size">Размер горшка: ${item.size}</p>
            <div class="cart__controls">
              <div class="stepper">
                <button class="stepper__btn" type="button" data-cart-dec="${item.key}" aria-label="Уменьшить количество">−</button>
                <span class="stepper__value">${item.qty}</span>
                <button class="stepper__btn" type="button" data-cart-inc="${item.key}" aria-label="Увеличить количество">+</button>
              </div>
              <button class="cart__remove" type="button" data-cart-remove="${item.key}">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/></svg>
                Удалить
              </button>
            </div>
          </div>
          <p class="cart__price">${formatPrice(itemTotal(item))}</p>
        </article>`;
      })
      .join('');
  }

  /* --- Панель ---------------------------------------------------------------- */

  function panel() {
    return document.querySelector('[data-cart-panel]');
  }

  function overlay() {
    return document.querySelector('[data-cart-overlay]');
  }

  function open() {
    const node = panel();
    const shade = overlay();
    if (!node) return;

    lastFocused = document.activeElement;
    node.classList.add('is-open');
    node.removeAttribute('aria-hidden');
    node.removeAttribute('inert');
    document.body.classList.add('is-locked');

    if (shade) {
      shade.classList.add('is-visible');
      shade.removeAttribute('hidden');
    }

    const trigger = document.querySelector('[data-cart-open]');
    if (trigger) trigger.setAttribute('aria-expanded', 'true');

    const close = node.querySelector('[data-cart-close]');
    if (close) close.focus();
  }

  function close() {
    const node = panel();
    const shade = overlay();
    if (!node) return;

    node.classList.remove('is-open');
    node.setAttribute('aria-hidden', 'true');
    node.setAttribute('inert', '');
    document.body.classList.remove('is-locked');

    if (shade) {
      shade.classList.remove('is-visible');
      window.setTimeout(() => shade.setAttribute('hidden', ''), 250);
    }

    const trigger = document.querySelector('[data-cart-open]');
    if (trigger) trigger.setAttribute('aria-expanded', 'false');

    if (lastFocused && typeof lastFocused.focus === 'function') {
      lastFocused.focus();
    }
  }

  function isOpen() {
    const node = panel();
    return Boolean(node && node.classList.contains('is-open'));
  }

  function checkout() {
    if (items.length === 0) return;

    const sum = total();

    items = [];
    save();
    render();

    const success = document.querySelector('[data-cart-success]');
    if (success) {
      success.textContent = `Спасибо! Заказ на ${formatPrice(sum)} оформлен — мы свяжемся с вами для подтверждения.`;
      success.hidden = false;
    }
  }

  /* --- События ---------------------------------------------------------------- */

  function bind() {
    document.addEventListener('click', (event) => {
      const openBtn = event.target.closest('[data-cart-open]');
      if (openBtn) {
        event.preventDefault();
        open();
        return;
      }

      if (event.target.closest('[data-cart-close]')) {
        event.preventDefault();
        close();
        return;
      }

      const inc = event.target.closest('[data-cart-inc]');
      if (inc) {
        const item = items.find((entry) => entry.key === inc.dataset.cartInc);
        if (item) setQty(item.key, item.qty + 1);
        return;
      }

      const dec = event.target.closest('[data-cart-dec]');
      if (dec) {
        const item = items.find((entry) => entry.key === dec.dataset.cartDec);
        if (item) setQty(item.key, item.qty - 1);
        return;
      }

      const del = event.target.closest('[data-cart-remove]');
      if (del) {
        remove(del.dataset.cartRemove);
        return;
      }

      const addBtn = event.target.closest('[data-add-to-cart]');
      if (addBtn) {
        event.preventDefault();
        const id = addBtn.dataset.addToCart;
        const sizeIndex = Number(addBtn.dataset.sizeIndex || 0);
        const qty = Number(addBtn.dataset.qty || 1);
        for (let i = 0; i < qty; i += 1) {
          add(id, sizeIndex);
        }
        open();
        return;
      }

      if (event.target.closest('[data-cart-checkout]')) {
        event.preventDefault();
        checkout();
      }
    });

    const shade = overlay();
    if (shade) {
      shade.addEventListener('click', close);
    }

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        if (isOpen()) {
          event.preventDefault();
          close();
        }
      }
    });
  }

  return {
    add: add,
    setQty: setQty,
    remove: remove,
    clear: clear,
    count: count,
    total: total,
    render: render,
    open: open,
    close: close,
    bind: bind,
  };
})();

/* const не попадает в window, поэтому выставляем модуль явно */
window.Cart = Cart;
