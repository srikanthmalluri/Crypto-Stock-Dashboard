// utils/api.ts
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchStockData = createAsyncThunk('stock/fetchData', async (code: string) => {
  const list = await axios.get(`http://localhost:8000/api/v1/stocks?code=${code}`);
  return list.data;
});
