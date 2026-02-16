// destructuring
const obj = { a: 1, b: 2, c: 3 };
console.log(obj.a);
console.log(obj.b);
console.log(obj.c);


function destructuring(a, b) {
    console.log(a, b);
}

destructuring(obj.a, obj.b);

function destructuring2({ a, b }) {
    console.log(a, b);
}

destructuring2(obj);

// map
const myFruit = ["banana", "apple", "orange"];
const myFruit2 = myFruit.map((fruit) => fruit + " (" + fruit.length + " letters)");
console.log(myFruit2);

// spread
const allItems1 = [myFruit, myFruit2];
console.log(allItems1);
const allItems2 = [...myFruit, ...myFruit2];
console.log(allItems2);

// combine
const obj1 = {a: 1, ...myFruit2}
console.log(obj1);



