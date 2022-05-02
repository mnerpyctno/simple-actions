const form = document.querySelector('.contact-form__form'),
      inputs = form.querySelectorAll('input'),
      textarea = form.querySelector('textarea'),
      submit = form.querySelector('button'),
      modal = document.querySelector('.modal'),
      modalContent = modal.querySelector('.modal__content'),
      modalBack = modal.querySelector('.modal__link');

const data = [];

inputs.forEach(input => {
    input.addEventListener('change', (e) => {
        data.push(e.target.value);
        console.log(data);
    });
});

textarea.addEventListener('change', (e) => {
    data.push(e.target.value);
    console.log(data);
});

form.addEventListener('submit', (e) => {
    let message = document.createElement('p'),
        header = document.createElement('h3');

    e.preventDefault();

    if(data.length !== 3) {
        message.textContent = 'Пожалуйста, заполните все поля.';
        header.textContent = 'Произошла ошибка.';
        modalContent.prepend(header, message);
    } else {
        message.textContent = 'Спасибо за Вашу заявку!';
        header.textContent = 'Мы свяжемся с вами в ближайшее время.';
        modalContent.prepend(header, message);
        submitHandler(data);
    }

    modal.classList.add('show');

    modalBack.addEventListener('click', (e) => {
        e.preventDefault();
        modal.classList.remove('show');
        header.remove();
        message.remove();
    });
});

async function submitHandler(data) {
    const url = '../../mail.php';
    
    try {
      const response = await fetch(url, {
        method: 'POST', // или 'PUT'
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const json = await response.json();
      console.log('Успех:', JSON.stringify(json));
    } catch (error) {
      console.error('Ошибка:', error);
    }
  }