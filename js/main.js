const getRandomIntegerNumber = (from, to) => {
  if (from < 0) {
    throw new RangeError('Нижняя граница диаппазона не может быть отрицательной.');
  }

  if (from > to) {
    throw new RangeError('Верхняя граница диаппазона не может быть меньше нижней.');
  }

  if (Number.isNaN(+from) || (Number.isNaN(+to))) {
    throw new RangeError('Невозможно представить все параметры функции в виде числа');
  }

  const modifiedFrom = Math.ceil(from);
  const modifiedTo = Math.floor(to);

  return Math.floor(Math.random() * (modifiedTo - modifiedFrom + 1)) + modifiedFrom;
};

const getRandomFloatNumber = (from, to, precision = 5) => {
  if (from < 0) {
    throw new RangeError('Нижняя граница диаппазона не может быть отрицательной.');
  }

  if (from > to) {
    throw new RangeError('Верхняя граница диаппазона не может быть меньше нижней.');
  }

  if (Number.isNaN(+from) || (Number.isNaN(+to))) {
    throw new RangeError('Невозможно представить все параметры функции в виде числа');
  }

  return Number((Math.random() * (to - from) + from).toFixed(precision));
};

getRandomIntegerNumber('55', 60);
getRandomFloatNumber(2.25, 3.75, 2);
