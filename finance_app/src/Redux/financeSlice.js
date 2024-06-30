import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  income: [],
  expense: [],
  loading: false,  // Add loading state
};

const financeSlice = createSlice({
  name: "finance",
  initialState,
  reducers: {
    addIncome: (state, action) => {
      state.income.unshift(action.payload);
    },
    setIncomes: (state, action) => {
      state.income = action.payload;
    },
    addExpense: (state, action) => {
      state.expense.unshift(action.payload);
    },
    setExpenses: (state, action) => {
      state.expense = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;  // Add loading action
    },
  },
});

export const { addIncome, setIncomes, addExpense, setExpenses, setLoading } = financeSlice.actions;
export default financeSlice.reducer;
