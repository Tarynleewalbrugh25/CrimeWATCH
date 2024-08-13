import express from 'express'
import bodyParser from 'body-parser'
import { response } from '../Model/index.js'

const responseRouter = express.Router()

//fetch all items
responseRouter.get('/', (req, res)=>{
    try{
        response.fetchResponse(req, res)
    }catch(e){
        res.json({
            status: res.statusCode,
            msg: 'Failed to retrieve a response'
        })
    } 
})
responseRouter.get('/:id', (req, res) => {
    try {
        response.fetchResponse(req, res); // Call fetchStock function to retrieve a single stock
    } catch (e) {
        console.error("Error fetching response:", e);
        res.status(500).json({
            status: res.statusCode,
            msg: 'Failed to get response'
        });
    }
});
responseRouter.post('/add', bodyParser.json(),(req, res)=>{
    try{
        response.addResponse(req, res)
    }catch(e){
        res.json({
            status: res.statusCode,
            msg: 'Failed to add new response'
        })
    }
})

responseRouter.delete('/response/:id',bodyParser.json(), (req, res) => {
    try {
        response.deleteResponse(req, res);
    } catch (e) {
        console.error('Error deleting response:', e);
        res.status(500).json({
            status: res.statusCode,
            msg: 'Failed to remove response. Please try again later.'
        });
    }
});

responseRouter.patch('/response/:id', bodyParser.json(), (req, res)=>{
    try{
        response.updateresponse(req, res)
    }catch(e){
        res.json({
            status: res.statusCode,
            msg: 'Failed to update response try again later'
        })
    }
})
export{
    responseRouter
}