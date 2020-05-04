import './pages/login-favorite.html'

// Для загрузки аватара на фон label

const avatarForm = document.querySelector('.avatar__form');
const avatarInput = avatarForm.querySelector('.avatar__input');
const avatarLabel = avatarForm.querySelector('.avatar__label');

avatarInput.addEventListener('change', () => {
    let file = avatarInput.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener('load', () => {
        avatarLabel.style.backgroundImage = "url(" + reader.result + ")";
    })
});