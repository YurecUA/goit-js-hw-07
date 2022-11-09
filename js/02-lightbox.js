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

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
