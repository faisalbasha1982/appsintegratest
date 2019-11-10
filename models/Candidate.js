var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const candiateSchema = new Schema({

    firstname: {
        type: String,
        required: true, 
    },
    lastname: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    availability: {
        type: String,
        required: true
    }

});

var Candidate = mongoose.model('Candidate',candiateSchema);

module.exports = Candidate;