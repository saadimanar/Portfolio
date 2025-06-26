// lib/database/models/prompt.model.ts

import mongoose, { Schema, Document, Model } from "mongoose";

export interface PromptDocument extends Document {
  _id: string; // e.g., "system-bio"
  type: string; // e.g., "system"
  name: string; // e.g., "manar-bio"
  content: string; // full prompt content
}

const PromptSchema: Schema<PromptDocument> = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // optional, adds createdAt/updatedAt fields
    collection: "prompts", // ensure consistent collection name
  }
);

export const Prompt: Model<PromptDocument> =
  mongoose.models.Prompt ||
  mongoose.model<PromptDocument>("Prompt", PromptSchema);
