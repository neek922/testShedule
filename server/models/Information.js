import mongoose from "mongoose";

const InfList = new mongoose.Schema({
    schedule: {type: Object, required: true}
})

export default mongoose.model('InfList', InfList)