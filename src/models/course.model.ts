import { Schema, model } from 'mongoose';

export interface ICourse {
    title: string;
    code: string;
    unit: number;
    grade: string;
    gradePoint: number;
    weightedAverage: number;
    studentId: string;
    session: string;
    semester: string;
    level: string;
    matNumber: string;
    createdAt: Date;
    updatedAt: Date;
}
const courseSchema = new Schema<ICourse>({
    title: { type: String },
    code: { type: String },
    unit: { type: Number },
    grade: { type: String },
    gradePoint: { type: Number },
    weightedAverage: { type: Number, default: 0 },
    studentId: { type: String },
    session: { type: String },
    matNumber: { type: String },
    semester: { type: String },
    level: { type: String },
})

const Course = model<ICourse>('Course', courseSchema);
export default Course 