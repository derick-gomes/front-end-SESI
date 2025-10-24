import mongoose, { Document, Schema } from 'mongoose';

export interface IClass extends Document {
  name: string;
  courseId: mongoose.Types.ObjectId;
  teacherId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ClassSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    teacherId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Class || mongoose.model<IClass>('Class', ClassSchema);
