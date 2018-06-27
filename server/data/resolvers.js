import mongoose from 'mongoose';
import { Friends, Users } from './dbConnectors';
import { rejects } from 'assert';


const friendDatabase = {};
const userDatabases = {};

//resolver map

export const resolvers = { 
    Query: {
        getOneFriend: (root, { id }) => {
            return new Promise((resolve, reject) => {
                Friends.findById(id, (err, friend) => {
                    if (err) reject(err)
                    else resolve(friend)
                } )
            })
        },
        getFriends: () => {
            return Friends.find();
        },
        getOneUser: (root, email) => {
            return new Promise((resolve, reject) => {
                Users.findOne(email, (err, user) => {
                    if (err) reject(err)
                    else resolve(user)
                })
            })
        },
        getUsers: () => {
            return Users.find();
        },
    },
    Mutation: {
        createFriend: (root, {input}) => {
            const newFriend = new Friends({
                firstName: input.firstName,
                lastName: input.lastName,
                gender: input.gender,
                age: input.age,
                language: input.language,
                contacts: input.contacts,
            });

            newFriend.id = newFriend._id;

            return new Promise((resolve, object) => {
                newFriend.save((err) => {
                    if (err) rejects(err)
                    else resolve(newFriend)
                })
            })
        },  
        updateFriend: (root, { input }) => {
            return new Promise((resolve, object) => {
                Friends.findOneAndUpdate({ _id: input.id}, input, {new: true}, (err, friend)=> {
                    if (err) rejects(err)
                    else resolve(friend)
                })
            })
        },
        deleteFriend: (root, { id }) => {
            return new Promise((resolve, object) => {
                Friends.remove({ _id: id }, (err) => {
                    if (err) rejects(err)
                    else resolve('Successfully deleted friend')
                })
            })
        },
        createUser: (root, {input}) => {
            const newUser = new Users({
                email: input.email,
                password: input.password,
                firstName: input.firstName,
                lastName: input.lastName,
                lastConnection: input.lastConnection,
            });

            newUser.id = newUser._id;

            return new Promise((resolve, object) => {
                newUser.save((err) => {
                    if (err) rejects(err)
                    else resolve(newUser)
                })
            })
        },  
        updateUser: (root, { input }) => {
            return new Promise((resolve, object) => {
                Users.findOneAndUpdate({ email: input.email}, input, {new: true}, (err, user)=> {
                    if (err) rejects(err)
                    else resolve(user)
                })
            })
        },
        deleteUser: (root, { email }) => {
            return new Promise((resolve, object) => {
                Users.remove({ email: email }, (err) => {
                    if (err) rejects(err)
                    else resolve('Successfully deleted user')
                })
            })
        },
    },
};