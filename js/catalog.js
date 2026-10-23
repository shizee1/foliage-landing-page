/* ==========================================================================
   Листва — catalog.js
   Фильтры, сортировка, поиск и синхронизация состояния с адресной строкой
   ========================================================================== */

const CATALOG_PAGE_SIZE = 6;

document.addEventListener('DOMContentLoaded', function () {
  const grid = document.querySelector('[data-catalog-grid]');
  if (!grid) return;

  const countNode = document.querySelector('[data-catalog-count]');
  const sortSelect = document.querySelector('[data-sort]');
  const searchInput = document.querySelector('[data-search]');
  const moreButton = document.querySelector('[data-catalog-more]');
  const toggleButton = document.querySelector('[data-filters-toggle]');
  const closeButton = document.querySelector('[data-filters-close]');
  const resetButton = document.querySelector('[data-filters-reset]');
  const priceMin = document.querySelector('[data-price-min]');
  const priceMax = document.querySelector('[data-price-max]');
  const filters = document.querySelector('[data-filters]');

  const state = {
    category: [],
    light: [],
    care: [],
    min: null,
    max: null,
    sort: 'popular',
    q: '',
    shown: CATALOG_PAGE_SIZE,
  };

  /* --- Состояние из адресной строки ---------------------------------------- */

  function readUrl() {
    const params = new URLSearchParams(window.location.search);

    state.category = (params.get('category') || '').split(',').filter((value) => CATEGORY_LABELS[value]);
    state.light = (params.get('light') || '').split(',').filter((value) => LIGHT_LABELS[value]);
    state.care = (params.get('care') || '').split(',').filter((value) => CARE_LABELS[value]);
    state.min = params.get('min') ? Number(params.get('min')) : null;
    state.max = params.get('max') ? Number(params.get('max')) : null;
    state.sort = params.get('sort') || 'popular';
    state.q = params.get('q') || '';
  }

  function writeUrl() {
    const params = new URLSearchParams();

    if (state.category.length) params.set('category', state.category.join(','));
    if (state.light.length) params.set('light', state.light.join(','));
    if (state.care.length) params.set('care', state.care.join(','));
    if (state.min !== null && !Number.isNaN(state.min)) params.set('min', String(state.min));
    if (state.max !== null && !Number.isNaN(state.max)) params.set('max', String(state.max));
    if (state.sort !== 'popular') params.set('sort', state.sort);
    if (state.q) params.set('q', state.q);

    const query = params.toString();
    const url = query ? `${window.location.pathname}?${query}` : window.location.pathname;
    window.history.replaceState(null, '', url);
  }

  /* --- Фильтрация и сортировка ---------------------------------------------- */

  function getFiltered() {
    let list = PRODUCTS.filter(function (product) {
      if (state.category.length && !state.category.includes(product.category)) return false;
      if (state.light.length && !state.light.includes(product.light)) return false;
      if (state.care.length && !state.care.includes(product.care)) return false;
      if (state.min !== null && product.price < state.min) return false;
      if (state.max !== null && product.price > state.max) return false;
      if (state.q) {
        const query = state.q.toLowerCase();
        const haystack = `${product.name} ${CATEGORY_LABELS[product.category]} ${LIGHT_LABELS[product.light]}`.toLowerCase();
        if (!haystack.includes(query)) return false;
      }
      return true;
    });

    if (state.sort === 'price-asc') {
      list = list.sort((a, b) => a.price - b.price);
    } else if (state.sort === 'price-desc') {
      list = list.sort((a, b) => b.price - a.price);
    } else {
      list = list.sort((a, b) => b.popularity - a.popularity);
    }

    return list;
  }

  /* --- Отрисовка ------------------------------------------------------------ */

  function render() {
    const list = getFiltered();

    if (countNode) {
      countNode.textContent = `Найдено: ${list.length}`;
    }

    if (list.length === 0) {
      grid.innerHTML = `
        <div class="catalog__empty">
          <p class="catalog__empty-title">Ничего не нашлось</p>
          <p class="catalog__empty-text">Попробуйте смягчить условия или сбросить фильтры.</p>
          <button class="btn btn--ghost" type="button" data-filters-reset-inline>Сбросить фильтры</button>
        </div>`;
      if (moreButton) moreButton.hidden = true;
      return;
    }

    const visible = list.slice(0, state.shown);
    grid.innerHTML = visible
      .map((product, index) => productCardMarkup(product, 'h2', index < 3))
      .join('');

    if (moreButton) {
      moreButton.hidden = visible.length >= list.length;
      moreButton.textContent = 'Показать ещё';
    }
  }

  /* --- Синхронизация контролов ---------------------------------------------- */

  function syncControls() {
    document.querySelectorAll('[data-filter]').forEach(function (input) {
      const values = state[input.name] || [];
      input.checked = values.includes(input.value);
    });

    if (sortSelect) sortSelect.value = state.sort;
    if (searchInput) searchInput.value = state.q;
    if (priceMin) priceMin.value = state.min === null ? '' : state.min;
    if (priceMax) priceMax.value = state.max === null ? '' : state.max;
  }

  function apply(resetShown) {
    if (resetShown !== false) state.shown = CATALOG_PAGE_SIZE;
    writeUrl();
    render();
  }

  /* --- События --------------------------------------------------------------- */

  document.addEventListener('change', function (event) {
    const input = event.target.closest('[data-filter]');
    if (!input) return;

    const values = state[input.name];
    const index = values.indexOf(input.value);

    if (input.checked && index === -1) values.push(input.value);
    if (!input.checked && index !== -1) values.splice(index, 1);

    apply();
  });

  if (sortSelect) {
    sortSelect.addEventListener('change', function () {
      state.sort = sortSelect.value;
      apply();
    });
  }

  if (searchInput) {
    let timer = null;
    searchInput.addEventListener('input', function () {
      window.clearTimeout(timer);
      timer = window.setTimeout(function () {
        state.q = searchInput.value.trim();
        apply();
      }, 250);
    });
  }

  function readPrice() {
    const min = priceMin && priceMin.value !== '' ? Number(priceMin.value) : null;
    const max = priceMax && priceMax.value !== '' ? Number(priceMax.value) : null;
    state.min = Number.isNaN(min) ? null : min;
    state.max = Number.isNaN(max) ? null : max;
  }

  if (priceMin) priceMin.addEventListener('input', function () { readPrice(); apply(); });
  if (priceMax) priceMax.addEventListener('input', function () { readPrice(); apply(); });

  function resetFilters() {
    state.category = [];
    state.light = [];
    state.care = [];
    state.min = null;
    state.max = null;
    state.q = '';
    state.sort = 'popular';
    state.shown = CATALOG_PAGE_SIZE;

    syncControls();
    apply();
  }

  document.addEventListener('click', function (event) {
    if (event.target.closest('[data-filters-reset]') || event.target.closest('[data-filters-reset-inline]')) {
      event.preventDefault();
      resetFilters();
      if (filters) filters.classList.remove('is-open');
      if (toggleButton) toggleButton.setAttribute('aria-expanded', 'false');
    }

    if (event.target.closest('[data-catalog-more]')) {
      state.shown += CATALOG_PAGE_SIZE;
      render();
    }
  });

  /* --- Мобильная панель фильтров ------------------------------------------------ */

  function setFiltersOpen(isOpen) {
    if (!filters) return;
    filters.classList.toggle('is-open', isOpen);
    if (toggleButton) toggleButton.setAttribute('aria-expanded', String(isOpen));
  }

  if (toggleButton) {
    toggleButton.addEventListener('click', function () {
      setFiltersOpen(!filters.classList.contains('is-open'));
    });
  }

  if (closeButton) {
    closeButton.addEventListener('click', function () {
      setFiltersOpen(false);
      if (toggleButton) toggleButton.focus();
    });
  }

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && filters && filters.classList.contains('is-open')) {
      setFiltersOpen(false);
      if (toggleButton) toggleButton.focus();
    }
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth >= 1024) setFiltersOpen(false);
  });

  /* --- Старт --------------------------------------------------------------------- */

  readUrl();
  syncControls();
  render();

  if (window.location.hash === '#search' && searchInput) {
    searchInput.focus();
  }
});
