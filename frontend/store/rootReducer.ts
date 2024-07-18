// store/rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import stockReducer from './stockSlice';

const rootReducer = combineReducers({
  stock: stockReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
