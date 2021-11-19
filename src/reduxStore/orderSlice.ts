import {createSlice, PayloadAction, createAsyncThunk} from "@reduxjs/toolkit";
import * as Service from './service';
import { AppThunk } from "./store";


const myOrderSlice = createSlice({
    name: 'myneworder',
    initialState: {
       value: 0,
    },
    reducers: {
        increment: state => {
            state.value += 1;
          },
          decrement: state => {
            state.value -= 1;
          },
          incrementByAmount: (state, action) => {
            state.value += action.payload;
          },
    }
});

export const  incrementAsync =   (params: any): AppThunk => async dispatch => {
    
    // const data = await Service.getOrderList(params);
    // console.log('orderlist', data, params);
  
    const result = await fetch('https://api.github.com/users/ruanyf', {
      method: "get",
    }).then((response: Response) => response.json())
    // state.demoData = result;
    console.log(result)   
  };

const { actions, reducer } = myOrderSlice;

export const { increment, decrement, incrementByAmount } = myOrderSlice.actions;

export default reducer;