import mongoose, { Document, Schema } from 'mongoose';

export interface IGrade extends Document {
  studentId: mongoose.Types.ObjectId;
  classId: mongoose.Types.ObjectId;
  grade?: number; // Nota, opcional se for apenas falta
  absence: boolean; // Se foi falta
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

const GradeSchema: Schema = new Schema(
  {
    studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
    classId: { type: Schema.Types.ObjectId, ref: 'Class', required: true },
    grade: { type: Number, min: 0, max: 10 }, // Nota de 0 a 10
    absence: { type: Boolean, default: false },
    date: { type: Date, required: true },
  },
  { timestamps: true }
);

// Ensure unique grade per student per class per date
GradeSchema.index({ studentId: 1, classId: 1, date: 1 }, { unique: true });

export default mongoose.models.Grade || mongoose.model<IGrade>('Grade', GradeSchema);
