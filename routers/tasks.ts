import express from "express";
import Task from "../models/Task";
import auth, {RequestWithUser} from "../middleware/auth";


const tasksRouter = express.Router();

tasksRouter.post('/', auth, async (req, res, next) => {
    const token = req.headers.authorization;
    let expressReq =  req as RequestWithUser;
    const user = expressReq.user;

    if (!token) {
        res.status(401).send({ error: "Unauthorized: Token is required." });
        return;
    }

    if (!user) {
        res.status(400).send({ error: "user ID is required." });
        return;
    }

    try {
        const task = new Task({
            user: user._id,
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
        });
        await task.save();
        res.send(task);
    } catch (error) {
        next(error);
    }
});

tasksRouter.get('/', auth, async (req, res, next) => {
    let expressReq =  req as RequestWithUser;
    const user = expressReq.user;

    try {
        const tasks = await Task.find({ user });
        res.send(tasks);
    } catch (error) {
        next(error);
    }
});

tasksRouter.put('/:id', auth, async (req, res) => {
    let expressReq =  req as RequestWithUser;
    const user = expressReq.user;

    try {
        const task = await Task.findOne({ _id: req.params.id, user});

        if (!task) {
            res.status(403).send({ error: 'Access denied' });
            return;
        }

        task.title = req.body.title || task.title;
        task.description = req.body.description || task.description;
        task.status = req.body.status || task.status;

        await task.save();
        res.send(task);
    } catch (error) {
        res.status(400).send({ error: 'UserID is not correct'});
    }
});

tasksRouter.delete('/:id', auth, async (req, res) => {
    let expressReq =  req as RequestWithUser;
    const user = expressReq.user;

    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, user});

        if (!task) {
            res.status(403).send({ error: 'Access denied' });
            return;
        }

        res.send({ message: 'Task deleted' });
    } catch (error) {
        res.status(400).send({ error: 'UserID is not correct' });
    }
});

export default tasksRouter;
