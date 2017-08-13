var faker = require('faker');

const RandomNumber = (min, max) => {
  let randomNumber = Math.floor(Math.random() * max) + min;
  return randomNumber;
}

const mockDB = [
  {index: 0, isEnabled: true, type: 'Red', word: 'balugas'},
  {index: 1, isEnabled: true, type: 'Blue', word: 'balugas'},
  {index: 2, isEnabled: true, type: 'Red', word: 'balugas'},
  {index: 3, isEnabled: true, type: 'Civilian', word: 'balugas'},
  {index: 4, isEnabled: true, type: 'Red', word: 'balugas'},
  {index: 5, isEnabled: true, type: 'Red', word: 'balugas'},
  {index: 6, isEnabled: true, type: 'Blue', word: 'balugas'},
  {index: 7, isEnabled: true, type: 'Red', word: 'balugas'},
  {index: 8, isEnabled: true, type: 'Red', word: 'balugas'},
  {index: 9, isEnabled: true, type: 'Red', word: 'balugas'},
  {index: 10, isEnabled: true, type: 'Blue', word: 'balugas'},
  {index: 11, isEnabled: true, type: 'Blue', word: 'balugas'},
  {index: 12, isEnabled: true, type: 'Red', word: 'balugas'},
  {index: 13, isEnabled: true, type: 'Red', word: 'balugas'},
  {index: 14, isEnabled: true, type: 'Red', word: 'balugas'},
  {index: 15, isEnabled: true, type: 'Red', word: 'balugas'},
  {index: 16, isEnabled: true, type: 'Blue', word: 'balugas'},
  {index: 17, isEnabled: true, type: 'Red', word: 'balugas'},
  {index: 18, isEnabled: true, type: 'Blue', word: 'balugas'},
  {index: 19, isEnabled: true, type: 'Red', word: 'balugas'},
  {index: 20, isEnabled: true, type: 'Red', word: 'balugas'},
  {index: 21, isEnabled: true, type: 'Red', word: 'balugas'},
  {index: 22, isEnabled: true, type: 'Red', word: 'balugas'},
  {index: 23, isEnabled: true, type: 'Red', word: 'balugas'},
  {index: 24, isEnabled: true, type: 'Blue', word: 'balugas'},
];

for(let i = 0; i < mockDB.length; i++) {
  let newWord = faker.random.word();
  mockDB[i] = Object.assign(mockDB[i], { word: newWord });
}

module.exports = mockDB;
