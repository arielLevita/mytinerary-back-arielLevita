import { Schema, model, Types } from "mongoose";

const collection = 'cities';

const schema = new Schema({
    name: { type: String, required: true},
    coverURL: { type: String, required: true},
    country: { type: String, required: true},
    itineraries: {type: Types.ObjectId, ref: 'itineraries'}
}, {
    timestamps: true
})

const City = model(collection, schema)

export default City;