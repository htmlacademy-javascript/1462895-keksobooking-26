const getRandomIntegerNumber = (from = 1, to = 10) => {
  from = from < 0 ? 0 : from;

  if (from > to) {
    return 0;
  }

  return Math.floor(Math.random() * (to - from + 1)) + from;
};

getRandomIntegerNumber();

