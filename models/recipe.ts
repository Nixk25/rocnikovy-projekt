import mongoose, { models, Schema } from "mongoose";

const recipeSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    categories: {
      type: [String],
      required: true,
    },
    ingredients: {
      type: [String],
      required: true,
    },
    author: {
      type: String,
      ref: "User",
      required: true,
    },
    time: {
      type: Number,
      required: true,
    },
    procedure: {
      type: [String],
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Recipe = models.Recipe || mongoose.model("Recipe", recipeSchema);

export default Recipe;
