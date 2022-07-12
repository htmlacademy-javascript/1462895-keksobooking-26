const getData = (onSuccess, onError) => {
  fetch('https://26.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      onError('Не удалось загрузить данные <br>Попробуйте перезагрузить страницу');
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch(() => {
      onError('Не удалось загрузить данные <br>Попробуйте перезагрузить страницу');
    });
};

const sendData = (onSuccess, onError, body) => {
  fetch(
    'https://26.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onError('Не удалось отправить форму. Попробуйте ещё раз');
      }
    })
    .catch(() => {
      onError('Не удалось отправить форму. Попробуйте ещё раз');
    });
};

export { getData, sendData };
