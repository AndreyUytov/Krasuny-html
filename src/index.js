import './pages/index.html';
import './styles/index.scss';

let bar = document.getElementById('bar');
let test = document.querySelector('.test');

test.addEventListener('change', (evt) => {

    bar.style.width = (evt.currentTarget.value * 100) + '%';
})

let bar1 = document.getElementById('bar1');

let test1 = document.querySelector('.test1');

test1.addEventListener('change', (evt) => {

    bar1.style.width = (evt.currentTarget.value * 100) + '%';
})