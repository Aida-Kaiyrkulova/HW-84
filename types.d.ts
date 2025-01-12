export interface UserField {
    username: string;
    password: string;
    token: string;
}

export interface TaskField {
    user: typeof mongoose.Schema.Types.ObjectId;
    title: string;
    description?: string;
    status: string;
}