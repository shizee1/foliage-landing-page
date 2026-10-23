/* ==========================================================================
   Листва — product.js
   Страница товара: данные по ?id=, галерея, размер горшка, вкладки, похожие
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {
  const page = document.querySelector('[data-product-page]');
  const notFound = document.querySelector('[data-product-notfound]');
  if (!page) return;

  const params = new URLSearchParams(window.location.search);
  const product = getProduct(params.get('id'));

  if (!product) {
    page.hidden = true;
    if (notFound) notFound.hidden = false;
    document.title = 'Растение не найдено — Листва';
    return;
  }

  const state = {
    sizeIndex: 0,
    qty: 1,
    image: 0,
  };

  /* --- Разметка -------------------------------------------------------------- */

  const titleNode = document.querySelector('[data-product-title]');
  const priceNode = document.querySelector('[data-product-price]');
  const shortNode = document.querySelector('[data-product-short]');
  const tagsNode = document.querySelector('[data-product-tags]');
  const sizesNode = document.querySelector('[data-product-sizes]');
  const thumbsNode = document.querySelector('[data-gallery-thumbs]');
  const mainImage = document.querySelector('[data-gallery-main]');
  const qtyNode = document.querySelector('[data-qty]');
  const addButton = document.querySelector('[data-product-add]');
  const breadcrumb = document.querySelector('[data-product-breadcrumb]');
  const relatedGrid = document.querySelector('[data-related-grid]');

  document.title = `${product.name} — Листва`;

  if (breadcrumb) breadcrumb.textContent = product.name;
  if (titleNode) titleNode.textContent = product.name;
  if (shortNode) shortNode.textContent = product.description;

  if (tagsNode) {
    tagsNode.innerHTML = `
      <span class="chip chip--static">${LIGHT_LABELS[product.light]}</span>
      <span class="chip chip--static">${CARE_LABELS[product.care]} уход</span>`;
  }

  /* --- Цена и размеры ---------------------------------------------------------- */

  function currentPrice() {
    return productPrice(product, state.sizeIndex);
  }

  function renderPrice() {
    if (priceNode) priceNode.textContent = formatPrice(currentPrice());
  }

  function renderSizes() {
    if (!sizesNode) return;

    sizesNode.innerHTML = product.sizes
      .map(function (size, index) {
        const label = size.price ? `${size.label}, +${formatPrice(size.price)}` : size.label;
        return `<button class="size-switch__item" type="button" data-size="${index}" aria-pressed="${index === state.sizeIndex}">${label}</button>`;
      })
      .join('');
  }

  if (sizesNode) {
    sizesNode.addEventListener('click', function (event) {
      const button = event.target.closest('[data-size]');
      if (!button) return;

      state.sizeIndex = Number(button.dataset.size);
      renderSizes();
      renderPrice();
      updateAddButton();
    });
  }

  /* --- Галерея ------------------------------------------------------------------ */

  function renderThumbs() {
    if (!thumbsNode) return;

    thumbsNode.innerHTML = product.images
      .map(function (image, index) {
        return `
        <button class="gallery__thumb" type="button" data-image="${index}" aria-current="${index === state.image}">
          <img class="gallery__thumb-image" src="${thumbImage(image)}" alt="${product.name} — фото ${index + 1}" width="200" height="250" loading="lazy" decoding="async">
        </button>`;
      })
      .join('');
  }

  function renderMainImage() {
    if (!mainImage) return;
    const large = product.images[state.image];
    const medium = cardImage(large);
    mainImage.src = medium;
    mainImage.srcset = `${thumbImage(large)} 200w, ${medium} 420w, ${large} 720w`;
    mainImage.sizes = '(max-width: 1023px) 92vw, 48vw';
    mainImage.alt = `${product.name} — фото ${state.image + 1}`;
  }

  if (thumbsNode) {
    thumbsNode.addEventListener('click', function (event) {
      const button = event.target.closest('[data-image]');
      if (!button) return;

      state.image = Number(button.dataset.image);
      renderMainImage();
      renderThumbs();
    });
  }

  /* --- Количество --------------------------------------------------------------- */

  function updateQty() {
    if (qtyNode) qtyNode.textContent = String(state.qty);
    updateAddButton();
  }

  function updateAddButton() {
    if (!addButton) return;
    addButton.dataset.addToCart = product.id;
    addButton.dataset.sizeIndex = String(state.sizeIndex);
    addButton.dataset.qty = String(state.qty);
  }

  const decButton = document.querySelector('[data-qty-dec]');
  const incButton = document.querySelector('[data-qty-inc]');

  if (decButton) {
    decButton.addEventListener('click', function () {
      state.qty = Math.max(1, state.qty - 1);
      updateQty();
    });
  }

  if (incButton) {
    incButton.addEventListener('click', function () {
      state.qty = Math.min(99, state.qty + 1);
      updateQty();
    });
  }

  /* --- Вкладки -------------------------------------------------------------------- */

  const tabs = Array.prototype.slice.call(document.querySelectorAll('[data-tab]'));
  const panels = Array.prototype.slice.call(document.querySelectorAll('[data-tab-panel]'));

  function activateTab(name, focus) {
    tabs.forEach(function (tab) {
      const isActive = tab.dataset.tab === name;
      tab.setAttribute('aria-selected', String(isActive));
      tab.tabIndex = isActive ? 0 : -1;
      if (isActive && focus) tab.focus();
    });

    panels.forEach(function (panel) {
      panel.hidden = panel.dataset.tabPanel !== name;
    });
  }

  tabs.forEach(function (tab, index) {
    tab.addEventListener('click', function () {
      activateTab(tab.dataset.tab, false);
    });

    tab.addEventListener('keydown', function (event) {
      if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;

      event.preventDefault();
      const direction = event.key === 'ArrowRight' ? 1 : -1;
      const next = tabs[(index + direction + tabs.length) % tabs.length];
      activateTab(next.dataset.tab, true);
    });
  });

  const panelContent = {
    desc: product.description,
    care: product.careText,
    delivery: product.delivery,
  };

  panels.forEach(function (panel) {
    const text = panelContent[panel.dataset.tabPanel];
    if (text) {
      panel.innerHTML = `<p class="product__text">${text}</p>`;
    }
  });

  /* --- Похожие растения ------------------------------------------------------------- */

  if (relatedGrid) {
    const related = PRODUCTS.filter(function (item) {
      return item.id !== product.id && item.category === product.category;
    })
      .concat(PRODUCTS.filter((item) => item.id !== product.id && item.category !== product.category))
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, 4);

    relatedGrid.innerHTML = related.map((item) => productCardMarkup(item, 'h3')).join('');
  }

  /* --- Старт --------------------------------------------------------------------------- */

  renderSizes();
  renderPrice();
  renderThumbs();
  renderMainImage();
  updateQty();
});
