import './pages/card.html';

let wrapperAsideWidth = document.querySelector('.sticky-block');
let fonWrapperAsideWidth = wrapperAsideWidth.clientWidth;
let marginContainer = getComputedStyle(document.querySelector('.container')).marginRight;
wrapperAsideWidth.style.width = (fonWrapperAsideWidth + parseInt(marginContainer)) + 'px';
