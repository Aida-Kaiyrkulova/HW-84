import mongoose from "mongoose";
import config from "./config";
import User from "./models/User";
import Task from "./models/Task";
import {randomUUID} from "node:crypto";

const run = async () => {
        await mongoose.connect(config.db);
        const db = mongoose.connection;

        try {
            await db.dropCollection('users');
            await db.dropCollection('tasks');
        } catch (e) {
            console.log('Collections were not present, skipping drop ');
        }

        const [AlexUser, MaxUser ] = await User.create({
            username: "Alex",
            password: "12456",
            token: randomUUID(),
        }, {
            username: "Max",
            password: "68955",
            token: randomUUID(),
        });

        await Task.create({
            user: AlexUser._id,
            title: "Read new book",
            description: "Read books related to Culinary",
            status: "new",
        }, {
            user: MaxUser._id,
            title: "Create new song",
            description: "Buy notebook for notes",
            status: "in_progress",
        });

        await db.close();
};

run().catch(console.error);