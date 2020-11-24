import galleryList from './gallery-items.js';
//console.log(galleryList)

const galleryContainer = document.querySelector('.js-gallery');
const modal = document.querySelector('.js-lightbox');
const modalImg = document.querySelector('.lightbox__image');
const closeBtnModal = document.querySelector(
  'button[data-action="close-lightbox"]',
);
const closeModalOverlay = document.querySelector('.lightbox__overlay');

const galleryItem = createGalleryItem(galleryList);

galleryContainer.insertAdjacentHTML('beforeend', galleryItem);

galleryContainer.addEventListener('click', onContainerGalleryClick);
closeBtnModal.addEventListener('click', closeModal);
closeModalOverlay.addEventListener('click', closeModal);

//функция создания и рендер разметки по массиву данных и предоставленному шаблону
function createGalleryItem(galleryList) {
  return galleryList
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item">
  <a class="gallery_link" href="${original}">
  <img class="gallery__image" src="${preview}" alt="${description}" data-source="${original}">
  </a>
  </li>`;
    })
    .join('');
}

//функция открытия модального окна по клику на элементе галереи
function onContainerGalleryClick(evt) {
  evt.preventDefault();

  if (!evt.target.classList.contains('gallery__image')) {
    return;
  }

  window.addEventListener('keydown', onPressEsc);
  modal.classList.add('is-open');
  modalImg.src = evt.target.dataset.source;
}

//функция закрытия модалки с изображением нажатием на кнопку button[data-action="close-lightbox"]
//закрытие модального окна по клику на div.lightbox__overlay
function closeModal(evt) {
  window.removeEventListener('keydown', onPressEsc);

  modal.classList.remove('is-open');
  modalImg.src = '';
}

// Закрытие модального окна по нажатию клавиши ESC
function onPressEsc(evt) {
  if (evt.code === 'Escape') {
    closeModal();
  }
}
