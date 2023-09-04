import { Schema, model, Types } from "mongoose";

const collection = 'itineraries';

const schema = new Schema({
    name: { type: String, required: true},
    coverURL: { type: String, required: true},
    duration: { type: String, required: true},
    price: { type: String, required: true},
    city: {type: Types.ObjectId, ref: 'cities'},
    user: {type: Types.ObjectId, ref: 'users'},
    //TODO activities: {type: Types.ObjectId, ref: 'activities'}
}, {
    timestamps: true
})

const Itinerary = model(collection, schema)

export default Itinerary;