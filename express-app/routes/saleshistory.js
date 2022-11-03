const expressFunction = require('express');
const mongoose = require('mongoose');
const router = expressFunction.Router();
var Schema = require("mongoose").Schema;

const saleshistorySchema = Schema({
    saleshistory_id: String,
    name: String,
    price: Number,
    detail: String,
    image: String
}, {
    collection: 'saleshistory'
});

let SalesHistory
try {
    SalesHistory = mongoose.model('saleshistory')
} catch (error){
    SalesHistory = mongoose.model('saleshistory', saleshistorySchema);
}


// function add
const addSalesHistory = (Data) => {
    return new Promise ((resolve,reject) => {
        var new_product = new SalesHistory(
            Data
        );
        new_product.save((err,data) => {
            if(err){
                reject(new Error('Cannot insert SalesHistory to DB!'));
            }else{
                resolve({message: 'SalesHistory added successfully'});
            }
        });
    });
}
// function get
const getSalesHistorys = () => {
    return new Promise ((resolve, reject) => {
        SalesHistory.find({}, (err, data) => {
            if(err) {
                reject(new Error('Cannot get SalesHistory!'));
            }else{
                if(data){
                    resolve(data)
                }else {
                    reject(new Error('Cannot get SalesHistory!'));
                }
            }
        })
    });
}

// .post
router.route('/add')
    .post(async(req,res) => {
        console.log('add');

        addSalesHistory(req.body)
            .then(result => {
                console.log(result);
                res.status(200).json(result);
            })
            .catch(err => {
                console.log(err);
            })
});
// .get
router.route('/get')
    .get(async(req,res) => {
        console.log('get');
        getSalesHistorys()
            .then(result => {
                console.log(result);
                res.status(200).json(result);
            })
            .catch(err => {
                console.log(err);
            })
})

module.exports = router