import mongoose, { Document, Schema } from 'mongoose';

export interface ICourse extends Document {
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const CourseSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Course || mongoose.model<ICourse>('Course', CourseSchema);
