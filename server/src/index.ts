import express, { Request, Response } from "express";
import mongoose from 'mongoose';
import Deck from './models/Deck'

const PORT = 5000;

const app = express();

app.use(express.json());

app.post('/decks', async (req: Request, res: Response) => {
    console.log(req.body)
    const newDeck = new Deck({
        title: req.body.title
    });
    const createdDeck = await newDeck.save();
    res.json(createdDeck);
});

mongoose.connect(
    // 'mongodb://flashcardsage:@main-shard-00-00-03xkr.mongodb.net:27017,main-shard-00-01-03xkr.mongodb.net:27017,main-shard-00-02-03xkr.mongodb.net:27017/main?ssl=true&replicaSet=Main-shard-0&authSource=admin&retryWrites=true'
    'mongodb+srv://flashcardsage:7seZeT3tlUBv3pBr@cluster0.6gfrb35.mongodb.net/?retryWrites=true&w=majority'
).then(() => {
    console.log(`Listening to port ${PORT} `)
    app.listen(PORT);
})
