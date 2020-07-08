import Note from './models/note';
import User from './models/user';

import shortid from 'shortid';
import { createWriteStream, createReadStream, mkdir } from 'fs';

import File from './models/fileModel';
const bcrypt = require('bcryptjs')
    // const jwt = require('jsonwebtoken')
    // const { APP_SECRET, getUserId } = require('utils')

const storeUpload = async({ stream, filename, mimetype }) => {
    const id = shortid.generate();
    const path = `images/${id}-${filename}`;

    return new Promise((resolve, reject) =>
        stream
        .pipe(createWriteStream(path))
        .on('finish', () => resolve({ id, path, filename, mimetype }))
        .on('error', reject)
    );
};

const processUpload = async(upload) => {
    const { createReadStream, filename, mimetype } = await upload;
    const stream = createReadStream();
    const file = await storeUpload({ stream, filename, mimetype });
    return file;
};

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
        },
        files: async() => {
            return await File.find();
        },
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

        async updateProfile(root, { email, input }) {
            return await User.findOneAndUpdate({ email: email }, input, { new: true });
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
        },
        uploadFile: async(_, { file }) => {
            mkdir('images', { recursive: true }, (err) => {
                if (err) throw err;
            });

            const upload = await processUpload(file);
            await File.create(upload);
            return upload;
        }
    }
};