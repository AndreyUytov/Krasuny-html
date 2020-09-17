const showSearchFormSnap = document.querySelector('.header-left-block__search-snap')
const searchForm = document.querySelector('.header-left-block__search-form')
const catalogBtn = document.querySelector('.header-left-block__catalog-snap')
const searchFormInput = document.querySelector('.search-form__input')
const closeSearchFormSnap = document.querySelector('.search-form__close-snap')


showSearchFormSnap.addEventListener('click', () => {
  searchForm.classList.remove('visually-hidden')
  searchForm.style.animation = 'search-form-animation 0.3s ease-in-out'
  searchFormInput.focus()
  catalogBtn.style.display = 'none'
  showSearchFormSnap.style.display = 'none'
})

closeSearchFormSnap.addEventListener('click', () => {
  searchForm.classList.add('visually-hidden')
  searchForm.style.animation = 'none'
  catalogBtn.style.display = 'block'
  showSearchFormSnap.style.display = 'block'
})