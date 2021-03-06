import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue, update, remove, off, push, onChildRemoved, onChildChanged, onChildAdded } from "firebase/database"; 


const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER,
  appId: process.env.FIREBASE_APPID,
  measurementId: process.env.FIREBASE_MEASUREMENTID
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getDatabase();






// Get a reference to the database service: 
//docs for read, write, update, delete from database: https://firebase.google.com/docs/database/web/read-and-write
//docs how to create multiple datasets: https://firebase.google.com/docs/database/usage/sharding 
// examples to watch for firebase 9 https://www.youtube.com/watch?v=BOITPwChVP4&ab_channel=TACV-TheAmazingCode-Verse



//firebase doesnt accept arrays for storing list based data - if you do it firebase will try to convert it to an object type structure. Hence should be stored as an object not an array
// const notes = [{
//   id: '12',
//   title: 'first note',
//   body: 'This is my note'
// },{
//   id: '761ase',
//   title: 'Another note',
//   body: 'This is my note'
// }];

// //this is how yoy should store list based data. The keys are the unqiue ids and its value is the item you would put in an array
// const firebaseNotes = {
//   notes:{
//     qwfrerg: {
//       title: 'first note',
//       body: 'This is my note'
//     },
//     wegrwethrth: {
//       title: 'Another note',
//       body: 'This is my note'
//     }
//   }
// };

// const db = getDatabase();
// set(ref(db, 'notes'), notes)
// .then(()=>{
//   console.log('Data is saved!');
// })
// .catch((e)=>{
//   console.log('This failed!!:', e);
// });

//write into dataset:
// use set() 
// function writeUserData(userId, name, email, age, isSingle, city, country) {
//   const db = getDatabase();
//   set(ref(db, 'users/' + userId), {
//     username: name,
//     email,
//     age,
//     isSingle,
//     location: {
//       city,
//       country
//     }
//   }).then(()=>{
//     console.log('Data is saved!');
//   }).catch((e)=>{
//     console.log('This failed!!:', e);
//   });
// };

// writeUserData('23542354234', 'Ilan', 'ilanlieberman@hotmail.com', 28, true, 'Hong Kong', 'Hong Hong SAR'); // this is how you write data to firebase
// writeUserData('23542354235', 'bob', 'bobjs@hotmail.com', 27, false, 'New York', 'USA');

//To read from data set:
// use onValue()
// const db = getDatabase();
// const userId = 23542354235;
// const reference = ref(db, 'users/' + userId);
// onValue(reference, (snapshot) => {
//   const data = snapshot.val();
//   console.log(data);
// });

// off(reference); turns off subscrition to the reference


//this would show/watch the datset if any of it is changed
// onValue(ref(db, 'expenses'), (snapshot) => {
//   const expenses = [];
  
//   snapshot.forEach((childSnapshot)=>{
//     expenses.push({
//       id: childSnapshot.key,
//       ...childSnapshot.val()
//     });
//   });
//   console.log(expenses);
// });

///this will fire everytime a child is removed 
// onChildRemoved(ref(db, 'expenses'), (snapshot)=>{
//   console.log(snapshot.key, snapshot.val()) // get the deleted key value pair
// });

// ///this will fire everytime a child had changed
// onChildChanged(ref(db, 'expenses'), (snapshot)=>{
//   console.log(snapshot.key, snapshot.val()) // get the deleted key value pair
// });

// //this will fire everytime a new child is added
// onChildAdded(ref(db, 'expenses'), (snapshot)=>{
//   console.log(snapshot.key, snapshot.val()) // get the deleted key value pair
// });


//to edit from a data set
// use update()

// const updates ={
//   isSingle: false,
//   age: null,
//   job: 'Software Developer',
//   'location/city': 'Chicago' // to update a nested attributes in this ex city need '' for attrubute location city attribute is in location attribute of the dataset
// };

// update(reference, updates).then((update)=>{
//   console.log('Update successful!: ', update)
// }).catch((e)=>{
//     console.log('Update unsuccessful!: ', e)
// }); // takes in the ref first then the object that needs updating 
//also you can add new attribute to the data set like 'job' from the ex or you can delete an existing attribute by setting the field to null like 'age: null'
//use this for set it would make the update the new dataset name , age etc would disappear



//to delete:
// remove(reference);

//to delete a key value pair from the dataset: ex removing isSingle property
// remove(ref(db,'users/' + userId +'/isSingle')
//   ).then(()=>{
//     console.log('Data was removed')
//   }).catch((e)=>{
//     console.log('Error in removing data: ', e)
//   });

//Another way to delete data is to use set() in set(ref, null) - the null will delete the data from whatever reference you give it
// set(ref(db,'users/' + userId +'/isSingle'), null
//   ).then(()=>{
//     console.log('Data was removed')
//   }).catch((e)=>{
//     console.log('Error in removing data: ', e)
//   });


// using push() - push can add a new entry to the data set giving it a new unique key for each entry you push.
// const db = getDatabase();
// const notes = {
//   title: 'random note',
//   body: 'This is my note'
// }
// push(ref(database, 'notes'), notes); 

// push(ref(db, 'expenses'), {ud
//   description: 'Rent',
//   note: '',
//   amount: 109500,
//   createdAt:254242365373468
// }); 