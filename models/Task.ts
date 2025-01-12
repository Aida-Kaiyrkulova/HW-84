import mongoose from "mongoose";
import {TaskField} from "../types";

const Schema = mongoose.Schema;


const TaskSchema = new Schema<TaskField>({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    status: {
        type: String,
        enum: ['new', 'in_progress', 'complete'],
        default: 'new'
    }
});

const Task = mongoose.model('Task', TaskSchema);
export default Task;