const expressFunction = require('express');
const mongoose = require('mongoose');
const router = expressFunction.Router();
var Schema = require("mongoose").Schema;

const setSchema = Schema({
    set_id: String,
    name: String,
    price: Number,
    detail: String,
    image: String
}, {
    collection: 'set'
});

let Set
try {
    Set = mongoose.model('set')
} catch (error){
    Set = mongoose.model('set', setSchema);
}

// function add
const addSet = (Data) => {
    return new Promise ((resolve,reject) => {
        var new_product = new Set(
            Data
        );
        new_product.save((err,data) => {
            if(err){
                reject(new Error('Cannot insert Set to DB!'));
            }else{
                resolve({message: 'Set added successfully'});
            }
        });
    });
}

// function get
const getSets = () => {
    return new Promise ((resolve, reject) => {
        Set.find({}, (err, data) => {
            if(err) {
                reject(new Error('Cannot get Set!'));
            }else{
                if(data){
                    resolve(data)
                }else {
                    reject(new Error('Cannot get Set!'));
                }
            }
        })
    });
}

// .post
router.route('/add')
    .post(async(req,res) => {
        console.log('add');

        addSet(req.body)
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
        getSets()
            .then(result => {
                console.log(result);
                res.status(200).json(result);
            })
            .catch(err => {
                console.log(err);
            })
})

module.exports = router