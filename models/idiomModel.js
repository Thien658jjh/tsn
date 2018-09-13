let mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    idiomModel = new Schema({
        idiomSentence: {
            type: String,
            default: "",
        },
        idiomMeaning: String
    })
module.exports = mongoose.model('idiomModel', idiomModel)