import mongoose from 'mongoose';

// Mongo connection

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/fajuu');

const friendSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    gender: {
        type: String
    },
    language: {
        type: String
    },
    age: {
        type: Number
    },
    email: {
        type: String
    },
    contacts: {
        type: Array
    },
});

const userSchema = new mongoose.Schema({
    email: {
        type: String
    },
    password: {
        type: String
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    lastConnection: {
        type: String
    },
})

const Friends = mongoose.model('friends', friendSchema);
const Users = mongoose.model('users', userSchema);

export { Friends, Users }