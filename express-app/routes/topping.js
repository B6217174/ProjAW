const expressFunction = require('express');
const mongoose = require('mongoose');
const router = expressFunction.Router();

var Schema = require("mongoose").Schema;

const toppingSchema = Schema({
    topping_id: String,
    name: String,
    price: Number,
    detail: String,
    image: String
}, {
    collection: 'topping'
});

let Topping
try {
    Topping = mongoose.model('topping')
} catch (error){
    Topping = mongoose.model('topping', toppingSchema);
}

// function add
const addTopping = (Data) => {
    return new Promise ((resolve,reject) => {
        var new_product = new Topping(
            Data
        );
        new_product.save((err,data) => {
            if(err){
                reject(new Error('Cannot insert Topping to DB!'));
            }else{
                resolve({message: 'Topping added successfully'});
            }
        });
    });
}

// function get
const getToppings = () => {
    return new Promise ((resolve, reject) => {
        Topping.find({}, (err, data) => {
            if(err) {
                reject(new Error('Cannot get Topping!'));
            }else{
                if(data){
                    resolve(data)
                }else {
                    reject(new Error('Cannot get Topping!'));
                }
            }
        })
    });
 }

 // .post
router.route('/add')
    .post(async(req,res) => {
        console.log('add');

        addTopping(req.body)
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
        getToppings()
            .then(result => {
                console.log(result);
                res.status(200).json(result);
            })
            .catch(err => {
                console.log(err);
            })
})

module.exports = router