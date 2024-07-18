// store/stockSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Stock {
  _id: string;
  code: string;
  rate: number;
  createdat: string;
}

interface StockState {
  symbol: string;
  data: Stock[];
}

const initialState: StockState = {
  symbol: 'SOL',
  data: [],
};

// Define and export the fetchStockData thunk
export const fetchStockData = createAsyncThunk('stock/fetchData', async (code: string) => {
  const response = await axios.get(`http://localhost:8000/api/v1/stocks?code=${code}`);
  console.log('status of api', response);
  return response.data;
});

const stockSlice = createSlice({
  name: 'stock',
  initialState,
  reducers: {
    setSymbol: (state, action: PayloadAction<string>) => {
      state.symbol = action.payload;
    },
    setData: (state, action: PayloadAction<Stock[]>) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchStockData.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export const { setSymbol, setData } = stockSlice.actions;
export default stockSlice.reducer;
