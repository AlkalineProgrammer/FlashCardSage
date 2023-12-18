import express from "express";
import { config } from 'dotenv'
config();
import cors from 'cors'
import mongoose from 'mongoose';
import { getDeckController } from "./controllers/getDeckController";
import { createDeckController } from "./controllers/createDeckController";
import { deleteDeckController } from "./controllers/deleteDeckController";
import { createCardForDeckController } from "./controllers/createCardForDeckController";
import { getSingleDeckController } from "./controllers/getSingleDeckController";
import { deleteCardForDeckController } from "./controllers/deleteCardForDeckController";

const PORT = 5000;

const app = express();

app.use(cors())

app.use(express.json());

app.get('/decks', getDeckController);

app.post('/decks', createDeckController);


app.get('/decks/:deckId', getSingleDeckController)

app.delete('/decks/:deckId', deleteDeckController)

app.post('/decks/:deckId/cards', createCardForDeckController);

app.post('/decks/:deckId/cards/:index', deleteCardForDeckController);


mongoose.connect(process.env.MONGO_URL!).then(() => {
    console.log(`Listening to port ${PORT} `)
    app.listen(PORT);
})
