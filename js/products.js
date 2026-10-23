/* ==========================================================================
   Листва — products.js
   Данные каталога. Массив, чтобы сайт работал при открытии файлов с диска.
   ========================================================================== */

/* Категории размера */
const CATEGORY_LABELS = {
  large: 'Крупные',
  medium: 'Средние',
  small: 'Мелкие',
  succulent: 'Суккуленты',
};

/* Освещение */
const LIGHT_LABELS = {
  shade: 'Тень',
  diffuse: 'Рассеянный свет',
  sun: 'Солнце',
};

/* Сложность ухода */
const CARE_LABELS = {
  easy: 'Лёгкий',
  medium: 'Средний',
};

const PRODUCTS = [  {
    id: 'monstera',
    name: 'Монстера деликатесная',
    price: 1890,
    category: 'large',
    light: 'diffuse',
    care: 'medium',
    popularity: 98,
    images: ['img/plants/monstera-1.webp', 'img/plants/monstera-2.webp', 'img/plants/monstera-3.webp', 'img/plants/monstera-4.webp'],
    short: 'Рассеянный свет, средний уход',
    description:
      'Крупные резные листья и неприхотливый характер. Подойдёт для гостиной и офиса.',
    careText:
      'Держите в рассеянном свете, на расстоянии от окна. Поливайте, когда верхние 3–4 см грунта высохли, примерно раз в 7–10 дней. Раз в месяц опрыскивайте листья и протирайте их влажной тканью.',
    delivery:
      'Доставим в керамическом горшке с дренажным слоем. По Москве — 1–2 дня, по России — 3–7 дней. Бесплатная доставка при заказе от 3 000 ₽.',
    sizes: [
      { label: '12 см', price: 0 },
      { label: '17 см', price: 600 },
      { label: '21 см', price: 1200 },
    ],
  },  {
    id: 'zamioculcas',
    name: 'Замиокулькас',
    price: 1290,
    category: 'medium',
    light: 'shade',
    care: 'easy',
    popularity: 92,
    images: ['img/plants/zamioculcas-1.webp', 'img/plants/zamioculcas-2.webp', 'img/plants/zamioculcas-3.webp', 'img/plants/zamioculcas-4.webp'],
    short: 'Тень, лёгкий уход',
    description: 'Глянцевые ветки с плотными листьями. Прощает забывчивых хозяев.',
    careText:
      'Идеальное место — полутень. Поливайте редко, когда грунт полностью просох, примерно раз в 2–3 недели. Не любит перелив, зато легко переносит сухой воздух.',
    delivery:
      'Отправляем в горшке с влажным грунтом и упаковкой корневой системы. Доставка 1–2 дня по городу, 3–7 дней по России.',
    sizes: [
      { label: '12 см', price: 0 },
      { label: '15 см', price: 400 },
      { label: '18 см', price: 800 },
    ],
  },  {
    id: 'sansevieria',
    name: 'Сансевиерия',
    price: 790,
    category: 'small',
    light: 'shade',
    care: 'easy',
    popularity: 88,
    images: ['img/plants/sansevieria-1.webp', 'img/plants/sansevieria-2.webp', 'img/plants/sansevieria-3.webp', 'img/plants/sansevieria-4.webp'],
    short: 'Любой свет, лёгкий уход',
    description: 'Резные листья с рисунком, который держится годами.',
    careText:
      'Растёт и в тени, и на солнце. Полив — раз в 2–3 недели, зимой реже. Достаточно сухого воздуха и умеренного света.',
    delivery:
      'Компактный формат — доставим в коробке с защитой стеблей. Срок доставки 1–2 дня по городу, 3–7 дней по России.',
    sizes: [
      { label: '9 см', price: 0 },
      { label: '12 см', price: 250 },
      { label: '14 см', price: 500 },
    ],
  },  {
    id: 'ficus-lyrata',
    name: 'Фикус лирата',
    price: 2490,
    category: 'large',
    light: 'sun',
    care: 'medium',
    popularity: 84,
    images: ['img/plants/ficus-lyrata-1.webp', 'img/plants/ficus-lyrata-2.webp', 'img/plants/ficus-lyrata-3.webp', 'img/plants/ficus-lyrata-4.webp'],
    short: 'Яркий свет, средний уход',
    description: 'Крупные листья-скрипки и выразительный силуэт.',
    careText:
      'Нужен яркий свет, но без полуденного солнца. Держите температуру не ниже 18 °C, поливайте при подсыхании верхнего слоя грунта, раз в 1–2 недели подкармливайте.',
    delivery:
      'Крупные растения везём нашным транспортом — так листья не ломаются. Срок 2–4 дня по городу, до 7 дней по России.',
    sizes: [
      { label: '17 см', price: 0 },
      { label: '21 см', price: 600 },
      { label: '25 см', price: 1200 },
    ],
  },  {
    id: 'chlorophytum',
    name: 'Хлорофитум',
    price: 590,
    category: 'small',
    light: 'diffuse',
    care: 'easy',
    popularity: 80,
    images: ['img/plants/chlorophytum-1.webp', 'img/plants/chlorophytum-2.webp', 'img/plants/chlorophytum-3.webp'],
    short: 'Рассеянный свет, лёгкий уход',
    description: 'Длинные полосатые листья и воздушные усики.',
    careText:
      'Любит рассеянный свет и умеренный полив. Поливайте 1–2 раза в неделю, подкармливайте в период роста с весны до осени.',
    delivery:
      'Лёгкое растение — доставим в почтовой коробке с защитой листьев. Доставка 1–3 дня по России.',
    sizes: [
      { label: '9 см', price: 0 },
      { label: '12 см', price: 200 },
      { label: '14 см', price: 400 },
    ],
  },  {
    id: 'aloe',
    name: 'Алоэ вера',
    price: 690,
    category: 'succulent',
    light: 'sun',
    care: 'easy',
    popularity: 78,
    images: ['img/plants/aloe-1.webp', 'img/plants/aloe-2.webp', 'img/plants/aloe-3.webp'],
    short: 'Яркое солнце, лёгкий уход',
    description: 'Суккулент с мясистыми листьями и целебным соком.',
    careText:
      'Ставьте на самое светлое место, поливайте раз в 2–3 недели и не допускайте застоя воды в горшке. Зимой можно перенести в прохладную комнату.',
    delivery:
      'Суккуленты не боятся перевозки, отправляем в сухом грунте. Доставка 1–3 дня по городу, 3–7 дней по России.',
    sizes: [
      { label: '8 см', price: 0 },
      { label: '10 см', price: 150 },
      { label: '12 см', price: 300 },
    ],
  },  {
    id: 'philodendron',
    name: 'Филодендрон',
    price: 1590,
    category: 'medium',
    light: 'diffuse',
    care: 'easy',
    popularity: 76,
    images: ['img/plants/philodendron-1.webp', 'img/plants/philodendron-2.webp', 'img/plants/philodendron-3.webp', 'img/plants/philodendron-4.webp'],
    short: 'Рассеянный свет, лёгкий уход',
    description: 'Пышная зелень, которая обвивает опору.',
    careText:
      'Рассеянный свет, температура от 18 °C. Поливайте, когда высохнет верхний слой грунта. Поддерживайте влажность воздуха опрыскиванием.',
    delivery:
      'Надёжно упакуем горшок и ветви. Доставка 1–2 дня по городу, 3–7 дней по России.',
    sizes: [
      { label: '12 см', price: 0 },
      { label: '15 см', price: 400 },
      { label: '18 см', price: 800 },
    ],
  },  {
    id: 'spathiphyllum',
    name: 'Спатифиллум',
    price: 1190,
    category: 'medium',
    light: 'shade',
    care: 'easy',
    popularity: 74,
    images: ['img/plants/spathiphyllum-1.webp'],
    short: 'Тень, лёгкий уход',
    description: 'Белые «паруса» цветов и блестящая зелень.',
    careText:
      'Спатифиллум цветёт в полутени. Держите грунт слегка влажным, поливайте 2–3 раза в неделю и подкармливайте каждые две недели в тёплый сезон.',
    delivery:
      'Цветущие растения отправляем в день заказа. Доставка 1–2 дня по городу, 3–6 дней по России.',
    sizes: [
      { label: '12 см', price: 0 },
      { label: '15 см', price: 350 },
      { label: '17 см', price: 700 },
    ],
  },  {
    id: 'echeveria',
    name: 'Эхеверия',
    price: 850,
    category: 'succulent',
    light: 'sun',
    care: 'easy',
    popularity: 70,
    images: ['img/plants/echeveria-1.webp', 'img/plants/echeveria-2.webp', 'img/plants/echeveria-3.webp', 'img/plants/echeveria-4.webp'],
    short: 'Яркое солнце, лёгкий уход',
    description: 'Розетки с пастельными листьями и восковым налётом.',
    careText:
      'Нужно максимум света. Поливайте редко, не заливая розетку, и убирайте воду из поддона. Подкормка — раз в месяц в тёплое время.',
    delivery:
      'Отправляем в сухом грунте с защитой соцветий. Доставка 1–3 дня по городу, 3–7 дней по России.',
    sizes: [
      { label: '8 см', price: 0 },
      { label: '10 см', price: 200 },
      { label: '12 см', price: 400 },
    ],
  },  {
    id: 'euphorbia',
    name: 'Молочай трёхреберный',
    price: 1390,
    category: 'succulent',
    light: 'sun',
    care: 'medium',
    popularity: 62,
    images: ['img/plants/euphorbia-1.webp', 'img/plants/euphorbia-2.webp', 'img/plants/euphorbia-3.webp', 'img/plants/euphorbia-4.webp'],
    short: 'Яркое солнце, средний уход',
    description: 'Колючий кактусовидный суккулент с яркими листьями.',
    careText:
      'Светлое место, полив раз в 2–3 недели с полной просушкой. Млечный сок раздражает кожу — надевайте перчатки при пересадке.',
    delivery:
      'Надёжно упаковываем колючие растения. Доставка 1–3 дня по городу, 3–7 дней по России.',
    sizes: [
      { label: '10 см', price: 0 },
      { label: '13 см', price: 350 },
      { label: '15 см', price: 700 },
    ],
  },  {
    id: 'calathea',
    name: 'Калатея',
    price: 2190,
    category: 'large',
    light: 'diffuse',
    care: 'medium',
    popularity: 64,
    images: ['img/plants/calathea-1.webp', 'img/plants/calathea-2.webp', 'img/plants/calathea-3.webp'],
    short: 'Рассеянный свет, средний уход',
    description: 'Круглые листья с рисунком и требовательностью к влаге.',
    careText:
      'Держите при рассеянном свете и высокой влажности, опрыскивайте ежедневно. Вода должна быть мягкой, без жёсткости.',
    delivery:
      'Чувствительное растение — доставляем в день заказа в упаковке с защитой листьев. Срок 2–4 дня.',
    sizes: [
      { label: '15 см', price: 0 },
      { label: '19 см', price: 550 },
      { label: '23 см', price: 1100 },
    ],
  },  {
    id: 'crassula',
    name: 'Крассула овальная',
    price: 950,
    category: 'succulent',
    light: 'sun',
    care: 'easy',
    popularity: 60,
    images: ['img/plants/crassula-1.webp', 'img/plants/crassula-2.webp'],
    short: 'Яркое солнце, лёгкий уход',
    description: 'Денежное дерево с мясистыми монетками-листьями.',
    careText:
      'Максимум солнца и минимум воды. Поливайте раз в 2–3 недели, зимой — раз в месяц. Подкормка в сезон роста.',
    delivery:
      'Отправляем в сухом грунте. Доставка 1–3 дня по городу, 3–7 дней по России.',
    sizes: [
      { label: '9 см', price: 0 },
      { label: '12 см', price: 250 },
      { label: '14 см', price: 500 },
    ],
  },  {
    id: 'kalanchoe',
    name: 'Шпороцветник',
    price: 1190,
    category: 'small',
    light: 'sun',
    care: 'easy',
    popularity: 58,
    images: ['img/plants/kalanchoe-1.webp', 'img/plants/kalanchoe-2.webp', 'img/plants/kalanchoe-3.webp', 'img/plants/kalanchoe-4.webp'],
    short: 'Яркое солнце, лёгкий уход',
    description: 'Яркие соцветия и мясистая зелень с характерным запахом.',
    careText:
      'Светлое место, полив по мере просыхания грунта. После цветения подкормку прекращают, отцветшие кисти удаляют.',
    delivery:
      'Цветущие растения отправляем в день заказа. Доставка 1–3 дня по городу, 3–7 дней по России.',
    sizes: [
      { label: '9 см', price: 0 },
      { label: '12 см', price: 300 },
      { label: '15 см', price: 600 },
    ],
  },  {
    id: 'azalea',
    name: 'Азалия',
    price: 1690,
    category: 'medium',
    light: 'diffuse',
    care: 'medium',
    popularity: 56,
    images: ['img/plants/azalea-1.webp', 'img/plants/azalea-2.webp', 'img/plants/azalea-3.webp'],
    short: 'Рассеянный свет, средний уход',
    description: 'Пышное цветение средикомнатных сортов.',
    careText:
      'Рассеянный свет, прохлада (18–20 °C) и постоянно влажный кислый грунт. Не пересыхайте — азалия не простит сухого воздуха.',
    delivery:
      'Цветущие растения отправляем в день заказа с защитной упаковкой. Срок 1–3 дня.',
    sizes: [
      { label: '12 см', price: 0 },
      { label: '15 см', price: 400 },
      { label: '17 см', price: 800 },
    ],
  },  {
    id: 'schefflera',
    name: 'Шеффлера',
    price: 1490,
    category: 'large',
    light: 'diffuse',
    care: 'easy',
    popularity: 54,
    images: ['img/plants/schefflera-1.webp'],
    short: 'Рассеянный свет, лёгкий уход',
    description: 'Зонтичные листья и быстрый рост.',
    careText:
      'Хорошо переносит полутень. Поливайте 1–2 раза в неделю, подкармливайте весной и летом, при необходимости подрезайте крону.',
    delivery:
      'Упаковываем в коробку с фиксацией кроны. Доставка 2–4 дня по городу, до 7 дней по России.',
    sizes: [
      { label: '14 см', price: 0 },
      { label: '17 см', price: 450 },
      { label: '21 см', price: 900 },
    ],
  },
];

/* --- Вспомогательные функции ----------------------------------------------- */

function getProduct(id) {
  return PRODUCTS.find((product) => product.id === id) || null;
}

function formatPrice(value) {
  return `${Number(value).toLocaleString('ru-RU')} ₽`;
}

function productPrice(product, sizeIndex) {
  const size = product.sizes[sizeIndex] || product.sizes[0];
  return product.price + size.price;
}

function productMeta(product) {
  return `${LIGHT_LABELS[product.light]}, ${CARE_LABELS[product.care].toLowerCase()} уход`;
}

/* Разметка карточки товара — используется на главной, в каталоге и в блоке похожих */

/* У каждого фото три размера: основной, для карточки каталога и миниатюра */
function cardImage(path) {
  return path.replace('img/plants/', 'img/plants/card/');
}

function thumbImage(path) {
  return path.replace('img/plants/', 'img/plants/thumbs/');
}

function productCardMarkup(product, heading, eager) {
  const tag = heading || 'h3';
  const priority = eager
    ? 'loading="eager" fetchpriority="high"'
    : 'loading="lazy"';
  const small = thumbImage(product.images[0]);
  const medium = cardImage(product.images[0]);
  return `
    <article class="product-card">
      <div class="product-card__media">
        <img class="product-card__image" src="${medium}" srcset="${small} 200w, ${medium} 420w" sizes="(max-width: 479px) 45vw, (max-width: 1023px) 30vw, 22vw" alt="${product.name}" width="420" height="525" ${priority} decoding="async">
      </div>
      <div class="product-card__body">
        <${tag} class="product-card__title">
          <a class="product-card__link" href="product.html?id=${product.id}">${product.name}</a>
        </${tag}>
        <p class="product-card__meta">${productMeta(product)}</p>
        <div class="product-card__foot">
          <span class="product-card__price">${formatPrice(product.price)}</span>
          <button class="btn btn--primary btn--small product-card__buy" type="button" data-add-to-cart="${product.id}" data-size-index="0">В корзину</button>
        </div>
      </div>
    </article>`;
}
