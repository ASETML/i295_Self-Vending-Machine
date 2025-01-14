/**
 * Vous devez constuire un tableau contenant le carré de chaque entier présent dans le tableau 'numbers'
 */

let numbers = [1, 2, 3, 4, 5];

// Solution utilisant le paradigme procédurale
let squaredNumbers = [];

for (let num of numbers) {
  squaredNumbers.push(num * num);
}

// Solution utilisant le paradigme fonctionnel

squaredNumbers = numbers.map((num) => {
  return num * num;
});

console.log(squaredNumbers); // [1, 4, 9, 16, 25]
