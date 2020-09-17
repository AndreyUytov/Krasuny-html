let menuPopap = document.querySelector('.menu-popup')
let catalogSnap = document.querySelector('.header-left-block__catalog-snap')

catalogSnap.addEventListener('click', () => {
    menuPopap.classList.remove('visually-hidden')
    document.addEventListener('click', (evt) => {
      if(evt.currentTarget !== menuPopap) {
        menuPopap.classList.add('visually-hidden')
      }
    })
})

