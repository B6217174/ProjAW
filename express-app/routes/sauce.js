const expressFunction = require('express');
const mongoose = require('mongoose');
const router = expressFunction.Router();
var Schema = require("mongoose").Schema;

const sauceSchema = Schema({
    sauce_id: String,
    name: String,
    price: Number,
    detail: String,
    image: String
}, {
    collection: 'sauce'
});


let Sauce
try {
    Sauce = mongoose.model('sauce')
} catch (error){
    Sauce = mongoose.model('sauce', sauceSchema);
}

// function add
const addSauce = (Data) => {
    return new Promise ((resolve,reject) => {
        var new_product = new Sauce(
            Data
        );
        new_product.save((err,data) => {
            if(err){
                reject(new Error('Cannot insert Sauce to DB!'));
            }else{
                resolve({message: 'Sauce added successfully'});
            }
        });
    });
}

// function get
const getSauces = () => {
    return new Promise ((resolve, reject) => {
        Sauce.find({}, (err, data) => {
            if(err) {
                reject(new Error('Cannot get Sauce!'));
            }else{
                if(data){
                    resolve(data)
                }else {
                    reject(new Error('Cannot get Sauce!'));
                }
            }
        })
    });
}

// .post
router.route('/add')
    .post(async(req,res) => {
        console.log('add');

        addSauce(req.body)
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
        getSauces()
            .then(result => {
                console.log(result);
                res.status(200).json(result);
            })
            .catch(err => {
                console.log(err);
            })
})

module.exports = router