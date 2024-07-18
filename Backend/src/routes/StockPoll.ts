import axios from 'axios';
import { Stock } from '../models/Stock';
import logger from '../logger';
const api_key = process.env.API_KEY || "e1bf7e94-5292-451b-9ae1-69d8db8d0dbb";
const api_url = process.env.API_URL || "https://api.livecoinwatch.com/coins/list";
const polling = async () => {

    try {
        const response = await axios.post(api_url, {
            currency: "USD",
            sort: "rank",
            order: "ascending",
            offset: 0,
            limit: 50,
            meta: false,
        }, {
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': api_key, 
            },
        });
        logger.info("Response fetched succesfully" + JSON.stringify(response.data))
        const list = ['SOL', 'BTC', 'ETH', 'ETC', 'DOGE']
        const map: { [key: string]: number } = {};
        response.data.forEach((ele: any) => {
            if (list.includes(ele.code)) {
                map[ele.code] = ele.rate;
            }
        })
        storeData(map);
    } catch (err) {
        logger.error("Something went wrong while polling", err)
    }

}
const storeData = async (map: any) => {
    for (const [code, rate] of Object.entries(map)) {
        const stock = new Stock({ code, rate, createdat: new Date() });
        let status = await stock.save();
        // console.log('status', status);
        logger.info("Saved into MongoDb succesfully: " + JSON.stringify(status))
    }

}
export default  polling ;
