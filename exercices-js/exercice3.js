/**
 * Vous devez faire la somme des entiers présent dans le tableau numbers
 */

let numbers = [1, 2, 3, 4, 5];

// Solution utilisant le paradigme procédurale
// A VOUS DE COMPLETER ICI

/*let sum = 0;

for (let num of numbers) {
  sum += num;
}*/

// Solution utilisant le paradigme fonctionnel
// A VOUS DE COMPLETER ICI

/*let sum = 0;

numbers.forEach((num) => {
  sum += num;
});*/

let sum = 0;

sum = numbers.reduce((accumulator, current) => accumulator + current, 0);

console.log(sum); // 15
