import mongoose from "mongoose";

const surveyResponseSchema = new mongoose.Schema(
  {
    respondentType: {
      type: String,
      enum: ["parent", "kid", "teacher"],
      required: true,
    },
    name: {
      type: String,
      default: null,
      trim: true,
    },
    email: {
      type: String,
      default: null,
      trim: true,
      lowercase: true,
    },
    interestLevel: {
      type: Number,
      required: true,
      min: 1,
      max: 10,
    },
    wouldUse: {
      type: Boolean,
      required: true,
    },
    biggestConcern: {
      type: String,
      default: null,
      trim: true,
    },
    wantedFeature: {
      type: String,
      default: null,
      trim: true,
    },
    whatWouldCreate: {
      type: String,
      default: null,
      trim: true,
    },
    openFeedback: {
      type: String,
      default: null,
      trim: true,
    },
    featureSuggestion: {
      type: String,
      default: null,
      trim: true,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    collection: "survey_responses",
  },
);

export const SurveyResponse = mongoose.model("SurveyResponse", surveyResponseSchema);
