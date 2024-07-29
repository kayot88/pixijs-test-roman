
export const randomShapeIndex = (max: number): number => Math.floor(Math.random() * max);

export const randomColor = () => {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const getRandomArbitrary = (min, max) => {
  return Math.random() * (max - min) + min;
};

