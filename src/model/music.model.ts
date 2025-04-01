import { model, Schema, SchemaTypes } from 'mongoose';

const musicSchema = new Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  album: { type: String },
  genre: { type: String },
  duration: { type: Number },
  filePath: { type: String, required: true },
  uploadedBy: { type: SchemaTypes.ObjectId, ref: 'User' },
  uploadDate: { type: Date, default: Date.now },
  coverImage: { type: String },
});

export const MusicModel = model('Music', musicSchema, 'music');
