import { configureStore, ThunkAction, Action, combineReducers, createStore } from '@reduxjs/toolkit';
import myOrderSlice from "./orderSlice";

const rootReducer = combineReducers({
  newOrder2: myOrderSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
});

export default store;

// typescript type for the combined state
export type State = ReturnType<typeof rootReducer>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;