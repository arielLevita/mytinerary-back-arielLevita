import { Schema, model, Types } from "mongoose";

const collection = 'users';

const schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    photo: { type: String, required: true },
    nationality: { type: String },
    google: { type: Boolean, default: false},
    online: { type: Boolean, default: false },
    verified: { type: Boolean, default: true },
    verified_code: { type: String },
    // role: { type: String },
    //? itineraries: {type: Types.ObjectId, ref: 'itineraries'},
}, {
    timestamps: true
})

const User = model(collection, schema)

export default User;