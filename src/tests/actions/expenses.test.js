import { startAddExpense, addExpense, editExpense, removeExpense } from "../../actions/expenses";
import expenses from '../fixtures/expenses';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { database } from '../../firebase/firebase';
import { getDatabase, ref, set, onValue, update, remove, off, push, onChildRemoved, onChildChanged, onChildAdded, get, child } from "firebase/database";

const createMockStore = configureMockStore([thunk]);

test('should set up remove expense action object', () => {
    const action = removeExpense({id:'123abc'});
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    });
});

test('should set up edit expense action object',()=>{
    const action = editExpense('123abc', { note: 'new note value' });
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '123abc',
        updates: {
            note: "new note value"
        }
    });

});


test('should set up add expense action object', ()=>{    
    const action = addExpense(expenses[2]);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[2]
    });
});

test('should add expense to database and store', (done) => {
    const store = createMockStore({});
    const expenseData = {
        description: 'Mouse',
        amount: 3000,
        note: "this one is better",
        createdAt: 1000
    }
    store.dispatch(startAddExpense(expenseData)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        });
        get(child(ref(database), `expenses/${actions[0].expense.id}`)).then((snapshot) => {
            expect(snapshot.val()).toEqual(expenseData);
            done();
        });
       
    })
});

test('should add expense with defaults to database and store', () => {
    const store = createMockStore({});
    const expenseData = {
        description: '',
        amount: 0,
        note: "",
        createdAt: 0
    }
    store.dispatch(startAddExpense({})).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        });
        get(child(ref(database), `expenses/${actions[0].expense.id}`)).then((snapshot) => {
            expect(snapshot.val()).toEqual(expenseData);
            done();
        });
       
    })
});
// test('should set up add expense action object', ()=>{
//     const action = addExpense();
//     expect(action).toEqual({
//         type: 'ADD_EXPENSE',
//         expense: {
//             id: expect.any(String),
//             description: '',
//             note: '',
//             amount: 0,
//             createdAt: 0
//         }
//     });
// });