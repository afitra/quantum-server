const Model = require('../models/gallery')
class Controller {


    static add(req, res) {
        // console.log('controller============');

        Model.create({
                title: req.body.title,
                url: req.body.url,
                createdAt: new Date()
            })
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                res.status(500).json({
                    messege: err.message
                })
            })
    }


    static delete(req, res) {

    }


    static all(req, res) {
        Model.find({})
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json({
                    messege: err.message
                })
            })
    }



}
module.exports = Controller