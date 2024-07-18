// pages/index.tsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { fetchStockData, setSymbol } from '../store/stockSlice';
import './styles.css'
const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { symbol, data } = useSelector((state: RootState) => state.stock);

  useEffect(() => {
    dispatch(fetchStockData(symbol));
  }, [dispatch, symbol]);

  const handleChangeSymbol = (newSymbol: string) => {
    dispatch(setSymbol(newSymbol));
    dispatch(fetchStockData(newSymbol));
  };

  return (
    <div>
      <h1>Crypto Stock Dashboard</h1>
      <div className="modal">
      <div className="modal-content">
        <h2>Pick a Crypto</h2>
        <button onClick={() => handleChangeSymbol('SOL')}>SOL</button>
        <button onClick={() => handleChangeSymbol('BTC')}>BTC</button>
        <button onClick={() => handleChangeSymbol('ETH')}>ETH</button>
        <button onClick={() => handleChangeSymbol('ETC')}>ETC</button>
        <button onClick={() => handleChangeSymbol('DOGE')}>DOGE</button>
        
      </div>
    </div>
      <table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Price</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry) => (
            <tr key={entry._id}>
              <td>{entry.code}</td>
              <td>${entry.rate}</td>
              <td>{new Date(entry.createdat).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
