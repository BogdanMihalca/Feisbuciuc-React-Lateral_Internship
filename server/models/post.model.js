const { Schema } = require("mongoose");

module.exports = (mongoose) => {
  var postSchema = mongoose.Schema(
    {
      description: String,
      post_image: {
        url: String,
        public_id: String,
      },
      author: {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    },
    { timestamps: true }
  );

  postSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Post = mongoose.model("post", postSchema);

  return Post;
};
