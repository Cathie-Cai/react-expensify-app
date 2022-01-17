import { createStore } from "redux";

// action generators - functions that return action obj

const incrementCount = ({incrementBy = 1} = {}) => ({
    type: 'INCREMENT',
    incrementBy
  });

const decrementCount = ({decrementBy = 1} = {}) => ({
    type: 'DECREMENT',
    decrementBy
});

const resetCount = () => ({
    type: 'RESET'    
});

const setCount = ({count}) => ({
    type: 'SET',
    count
});

// reducers
// 1. reducers are pure functions
// 2. never change state or action

const countReducer = (state = {count: 0}, action) => {
    switch (action.type) {
        case 'INCREMENT':            
            return {
                count: state.count + action.incrementBy
            };
        case 'DECREMENT':
            const decrementBy = typeof action.decrementBy ==='number' ? action.decrementBy : 1;
            return {
                count: state.count - decrementBy
            };
        case 'RESET':
            return {
                count: 0
            };  
        case 'SET':
            return {
                count: action.count
            };                
        default:
            return state;
    }
    
}

const store = createStore(countReducer);

const unsubscribe = store.subscribe(()=>{
    console.log(store.getState()); 
});


store.dispatch(incrementCount({incrementBy:5}));
store.dispatch(incrementCount());

store.dispatch(decrementCount({decrementBy:10}));
store.dispatch(decrementCount());



store.dispatch(resetCount());

store.dispatch(setCount({count: 99}));

 