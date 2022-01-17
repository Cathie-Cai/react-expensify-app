










// timestamp






store.subscribe(()=>{
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log(visibleExpenses);
});

const expenseOne = store.dispatch(addExpense({description:'rent', amount:100, createdAt: 1000}));
const expenseTwo = store.dispatch(addExpense({description:'coffee', amount:300, createdAt: -1000 }));

// store.dispatch(removeExpense({ id: expenseOne.expense.id}));

// store.dispatch(editExpense(expenseTwo.expense.id, {amount: 500}));

// store.dispatch(setTextFilter('rent'));
// store.dispatch(setTextFilter());

// store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

store.dispatch(setStartDate(0));
// store.dispatch(setStartDate());

store.dispatch(setEndDate(1250));
// store.dispatch(setEndDate());

const demoState = {
    expenses: [{
        id: 'abcde',
        description: 'Jan rent',
        note: 'This was the final payment.',
        amount: 54500,
        createdAt: 0
    }],
    fiters: {
        text: 'rent',
        sortBy: 'amount', //date or amount
        startDate: undefined,
        endDate: undefined
    }
};

