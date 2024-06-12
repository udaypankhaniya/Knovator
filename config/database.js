const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
try {
    mongoose.connect("mongodb://localhost:27017/Knovator-app")
        .then((db) => {
            console.log('Mongoose connection Established')
            db.connection.on('error', (err) => { console.error(err) })
            db.connection.on('disconnected', () => { console.log('disconnected') })
            db.connection.on('reconnected', () => { console.log('reconnected') })
        })
} catch (error) {
    console.error(error.message)
    console.log('Mongoose connection Failed')
    // process.exit(1)
}

exports.module = mongoose
