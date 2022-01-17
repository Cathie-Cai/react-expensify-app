// 1. object destructuring



// const person = {
//     name: 'ann',
//     age: 29,
//     location: {
//         city: 'nyc',
//         temp: 92
//     }
// };

// const {name ='anonymous', age} = person;
// console.log(`${name} is ${age}.`);

// const {temp: temperature, city} = person.location;
// console.log(`it's ${temperature} in ${city}.`)

// const book = {
//     title: 'ego is the enemy',
//     author: 'Ryan Holiday',
//     publisher: {
//         name: 'Penguin'

//     }
// };

// const {name : publisherName="self-published"} = book.publisher;
// console.log(publisherName); 


// 2. array destructuring

// const address = ['1299 S Juniper Street', 'New York', 'NY', '10014'];


// const [street, city, state, zip] = address;
// console.log(`You are in ${city} ${state}`);

const item = ['Coffee(hot)', '$2', '$2.5', '$2.75'];

const [itemName, , price] = item;
console.log(`A medium ${itemName} costs ${price}`);