import { galleryItems } from './gallery-items.js';
// Change code below this line

// Функция, которая деструктуризирует объект и выдает разметку для вставки изображений
const makeImagesMarkup = function (galleryItems) {
  const { original, preview, description } = galleryItems;
  return `
			<div class="gallery__item">
  			<a class="gallery__link" 
				href="${original}">
    			<img
            loading="lazy"
      			class="gallery__image"
      			src="${preview}"
      			data-source="${original}"
      			alt="${description}"
    			/>
  			</a>
			</div>`;
};

// Определяю куда будет вставлена разметка, функцией прогоняю весь массив объектов
// для создания разметки и заливаю полученный текст в HTML
const galleryListHeaderEl = document.querySelector('.gallery');
const galleryListMarkup = galleryItems.map(makeImagesMarkup).join('');

galleryListHeaderEl.insertAdjacentHTML('beforeend', galleryListMarkup);

galleryListHeaderEl.addEventListener('click', onImageLinkClick);

function onImageLinkClick(event) {
  // Предовращаю открытие ссылки по клику
  event.preventDefault();

  // Получаю аттрибуты с изображения
  const imgFullUrl = event.target.dataset.source;
  const altTextFromUrl = event.target.alt;

  console.log(imgFullUrl);
  console.log(event.target.alt);

  const instance = basicLightbox.create(
    `
    <img src="${imgFullUrl}" alt="${altTextFromUrl}">
`,
    {
      onShow: () => {
        window.addEventListener('keydown', onEscKeyPress);
        // window.addEventListener('keydown', arrowImagesSwitch);
      },
    },
  );

  instance.show();

  function onEscKeyPress(event) {
    if (event.code === 'Escape') {
      window.removeEventListener('keydown', onEscKeyPress);
      instance.close();
    }
  }
}

// Функция для пролистывания изображений при нажатии клавиш право-лево

// function arrowImagesSwitch(event) {
//   const imagesSrcArr = galleryItems.map(image => image.original);
//   const indexOfCurrentImg = imagesSrcArr.indexOf(instance.src)

//   if (event.code === 'ArrowRight') {
//     if (indexOfCurrentImg < imagesSrcArr.length - 1)
//       instance.src = imagesSrcArr[Number(indexOfCurrentImg) + 1];
//   }

//   if (event.code === 'ArrowLeft') {
//     if (indexOfCurrentImg > 0)
//       instance.src = imagesSrcArr[Number(indexOfCurrentImg) - 1];
//   }
// }

console.log(galleryItems);
