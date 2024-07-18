import express from 'express';
import { Stock } from '../models/Stock';
import logger from '../logger';
const app = express();
const router= express.Router();

router.get("/healthCheck",(req,res)=>{
    res.send("UP");
})
router.get("/stocks",async (req,res)=>{
    try{
    const {code} = req.query;
    console.log('query: ',req.query,code)
    let stocks = await Stock.find({code}).sort({ createdat: -1} )
                    .limit(20)
                    .exec();
        logger.info("stocks api response :"+JSON.stringify(stocks));
        res.status(200).json(stocks);
    }catch(err){
        logger.error("Something went wrong, Request :"+JSON.stringify(req.query))
    }
})
export default router;
