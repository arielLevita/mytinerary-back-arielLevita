import { Schema, model, Types } from "mongoose";

const collection = 'comments';

const schema = new Schema({
    text: { type: String, required: true},
    itinerary: {type: Types.ObjectId, ref: 'itineraries'},
    user: { type: Types.ObjectId, ref: 'users' },
}, {
    timestamps: true
})

const Comment = model(collection, schema)

export default Comment;