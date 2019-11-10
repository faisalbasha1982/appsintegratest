var mongoose = require('mongoose');
var config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {

    try{
        await mongoose.connect(db,{useNewUrlParser: true, useCreateIndex:true, useUnifiedTopology: true, useFindAndModify: false });

    }catch(error){
        console.error(error.message);
        process.exit(1);
    }

};

module.exports = connectDB;
