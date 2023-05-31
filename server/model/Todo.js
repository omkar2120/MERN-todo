
const { default: mongoose } = require("mongoose");


const todoSchema = new mongoose.Schema(
  {
    content: { type: String },
    userId: { type: mongoose.Types.ObjectId,ref:"user" },
    status:{type:String}
  },
  { timestamps: true }
);

module.exports = mongoose.model("todo", todoSchema);


