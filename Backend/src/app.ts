
import express from 'express';
import mongoose from 'mongoose';
import logger from './logger';
import routes from './routes/endpoints';
import cors from 'cors';
import polling from './routes/StockPoll';
const app = express();
const port = process.env.PORT || 8000;
const connectionUri = 'mongodb://127.0.0.1:27017/StockDB';

const corsOptions = {
    origin: 'http://localhost:3000', 
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  };
mongoose.connect(connectionUri)
    .then(() => {
        logger.info("MongoDb connected ")
    })
    .catch((err) => {
        // console.log('Something went wrong ', err);
        logger.error("Something went Wrong", err);
    });
app.use(cors(corsOptions))
app.use(express.json())
// app.use(polling)
app.use("/api/v1",routes)

setInterval(polling, 5000);

app.listen(port, () => logger.info(`server is running on port: ${port}`))

export { app };