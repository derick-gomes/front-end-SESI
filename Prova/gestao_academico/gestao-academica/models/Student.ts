import mongoose, { Document, Schema } from 'mongoose';

export interface IStudent extends Document {
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const StudentSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export default mongoose.models.Student || mongoose.model<IStudent>('Student', StudentSchema);
