import mongoose, { isObjectIdOrHexString } from "mongoose";

const memberSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,requied:true,unique:true
  },
  pw: {
    type: String,
  },
    
},{versionKey:false});

memberSchema.virtual("userId").get(function () {
  return this._id.toHexString();
});


export default mongoose.model("member", memberSchema);
