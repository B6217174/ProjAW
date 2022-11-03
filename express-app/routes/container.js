const expressFunction = require('express');
const mongoose = require('mongoose');
const router = expressFunction.Router();
var Schema = require("mongoose").Schema;

const containerSchema = Schema({
    container_id: String,
    name: String,
    price: Number,
    detail: String,
    image: String
}, {
    collection: 'container'
});

let Container
try {
    Container = mongoose.model('container')
} catch (error){
    Container = mongoose.model('container', containerSchema);
}

// function add
const addContainer = (Data) => {
    return new Promise ((resolve,reject) => {
        var new_product = new Container(
            Data
        );
        new_product.save((err,data) => {
            if(err){
                reject(new Error('Cannot insert Container to DB!'));
            }else{
                resolve({message: 'Container added successfully'});
            }
        });
    });
}

// function get
const getContainers = () => {
    return new Promise ((resolve, reject) => {
        Container.find({}, (err, data) => {
            if(err) {
                reject(new Error('Cannot get Container!'));
            }else{
                if(data){
                    resolve(data)
                }else {
                    reject(new Error('Cannot get Container!'));
                }
            }
        })
    });
}

 // .post
router.route('/add')
    .post(async(req,res) => {
        console.log('add');

        addContainer(req.body)
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
        getContainers()
            .then(result => {
                console.log(result);
                res.status(200).json(result);
            })
            .catch(err => {
                console.log(err);
            })
})

module.exports = router