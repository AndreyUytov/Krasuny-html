import './pages/card.html';

let wrapperAsideWidth = document.querySelector('.aside-order-block__wrapper');
let fonWrapperAsideWidth = wrapperAsideWidth.clientWidth;
let marginContainer = getComputedStyle(document.querySelector('.page-main-card__wrapper')).marginRight;
wrapperAsideWidth.style.width = (fonWrapperAsideWidth + parseInt(marginContainer)) + 'px';
