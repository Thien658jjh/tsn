let mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    vocabModel = new Schema({
        vocabWord: {
            type: String,
            default: ""
        },
        vocabMeaning: {
            type: String,
            default: ""
        },
        phonemic: {
            type: String,
            default: ""
        }
    })
module.exports = mongoose.model('vocabModel', vocabModel)