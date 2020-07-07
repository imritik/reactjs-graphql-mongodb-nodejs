import Note from './models/note';
import User from './models/user';

const bcrypt = require('bcryptjs')
    // const jwt = require('jsonwebtoken')
    // const { APP_SECRET, getUserId } = require('utils')
export const resolvers = {
    Query: {
        async getNote(root, { _id }) {
            return await Note.findById(_id);
        },
        async allNotes() {
            return await Note.find({ email: "rit@gmail.com" });
        },
        async getProfile() {
            // console.log(User.find());
            return await User.findOne({ email: "rit@gmail.com" });
        }
    },
    Mutation: {
        async createNote(root, { input }) {
            return await Note.create(input);
        },
        async updateNote(root, { _id, input }) {
            return await Note.findOneAndUpdate({ _id }, input, { new: true })
        },
        async deleteNote(root, { _id }) {
            return await Note.findOneAndRemove({ _id });
        },


        async signup(parent, args, context, info) {
            // 1
            // const password = await bcrypt.hash(args.password, 10)

            // 2
            const user = await User.create(args)

            // 3
            // const token = jwt.sign({ userId: user.id }, APP_SECRET)

            // 4
            return {
                // token,
                user,
            }
        },

        async login(parent, args, context, info) {
            // 1
            const user = await User.findOne({ email: args.email })
            if (!user) {
                throw new Error('No such user found')
            }

            // 2
            // const valid = await bcrypt.compare(args.password, User.password)
            // if (!valid) {
            //     throw new Error('Invalid password')
            // }

            // const token = jwt.sign({ userId: user.id }, APP_SECRET)

            // 3
            return {
                // token,
                user,
            }
        }
    }
};