import { TypedUseSelectorHook, useSelector as useReduxSelector } from 'react-redux';
import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { State } from './types';

type DeleteState = {
  id: string;
};

const initialState: State = {
  transactions: {},
  tasks: []
};

export const { actions, reducer } = createSlice({
  name: 'store',
  initialState,
  reducers: {
    set(state, action: PayloadAction<Partial<State>>) {
      return { ...state, ...action.payload };
    },
    addTransactions(state, action: PayloadAction<Partial<State>>) {
      state.transactions = {
        ...state.transactions,
        ...action.payload.transactions
      };
    },
    deleteTransaction(state, action: PayloadAction<DeleteState>) {
      delete state.transactions[action.payload.id];
    }
  }
});

const store = configureStore({
  reducer,
  devTools: true
});

export default store;

export { useDispatch } from 'react-redux';

export const useSelector: TypedUseSelectorHook<State> = useReduxSelector;
