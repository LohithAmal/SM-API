const {Schema,model} = require("mongoose");

const userSchema = new Schema({
  username: {
    type:String,
    unique:true,
    required: 'Your username is mandatory requirement',
    trim:true,
  },
  email:{
    type: String,
    unique: true,
    required: 'Enter a valid Email address',
    match:[/^[a-zA-z0-9]+@([a-zA-z0-9]+\.)+[a-zA-z0-9]{2,3}$/, 'Enter a valid Email address'],
  },
  thoughts:[
    {
      type:Schema.Types.ObjectId,
      ref: "Thought",
    },
  ],
  friends:[
    {
      type:Schema.Types.ObjectId,
      ref: "User",
    }
  ],
},
{
  toJson:{
    virtuals:true,
    getters:true,
  },
  id:false,
});

userSchema.virtual("friendCount").get(function(){
  return this.friends.length;
});

const User = model("User", userSchema);


module.exports = User;