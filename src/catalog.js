import './pages/catalog.html';
import './select-form.js';

import './menu-popup.js';
import './show-search-form.js'

const MAX_WIDTH_BAR_PRICE = 280
const MIN_DELTA_PRICE = 28

const minPriceInput = document.querySelector('.filter-form__input--min')
const maxPriceInput = document.querySelector('.filter-form__input--max')

const bar = document.querySelector('.price-range__bar')
const minToggle = document.querySelector('.price-range__toggle--min')
const maxToggle = document.querySelector('.price-range__toggle--max')

let maxTooglePosition = 200
let minTooglePosition = 10

const onToogleMouseDown = (evt, setTooglePosition) => {
  const toogle = evt.currentTarget
  const startUserCursorPosition = evt.clientX
  const startToogle = toogle.style.left
  const moveAt = (evt) => {
    setTooglePosition(parseInt(startToogle) + (evt.clientX - startUserCursorPosition) )
  }
  document.addEventListener('mousemove', moveAt)
  document.onmouseup = () => {
    document.removeEventListener('mousemove', moveAt)
    toogle.onmouseup = null
  }
}

const setMinTooglePosition = (value) => {
  minTooglePosition = value
  minToggle.style.left = minTooglePosition + 'px'
  bar.style.left = minTooglePosition + 'px'
  bar.style.width = (maxTooglePosition - minTooglePosition) + 'px'
}

const setMaxTooglePosition = (value) => {
  maxTooglePosition = value
  maxToggle.style.left = maxTooglePosition + 'px'
  bar.style.width = (maxTooglePosition - minTooglePosition) + 'px'
}

const checkMinTooglePosition = (value) => {
  if (value < 0) {
    setMinTooglePosition(0)
  } else if (value > maxTooglePosition - MIN_DELTA_PRICE) {
    setMinTooglePosition(maxTooglePosition - MIN_DELTA_PRICE)
    alert(`Минимальная разница между максимальной и минимальной значениями цены не может быть меньше ${MAX_WIDTH_BAR_PRICE / MIN_DELTA_PRICE}`)
  } else {
    console.log(minTooglePosition)
    setMinTooglePosition(value)
  }
}

const checkMaxTooglePosition = (value) => {
  if (value > MAX_WIDTH_BAR_PRICE) {
    setMaxTooglePosition(MAX_WIDTH_BAR_PRICE)
  } else if (value < minTooglePosition + MIN_DELTA_PRICE) {
    setMaxTooglePosition(minTooglePosition + MIN_DELTA_PRICE)
    alert(`Минимальная разница между максимальной и минимальной значениями цены не может быть меньше ${MAX_WIDTH_BAR_PRICE / MIN_DELTA_PRICE}`)
  } else {
    setMaxTooglePosition(value)
  }
}

minToggle.addEventListener('mousedown', (evt) => {
  onToogleMouseDown(evt, checkMinTooglePosition)
})

maxToggle.addEventListener('mousedown', (evt) => {
  onToogleMouseDown(evt, checkMaxTooglePosition)
})