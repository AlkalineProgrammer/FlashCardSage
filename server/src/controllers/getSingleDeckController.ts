import { Request, Response } from "express";
import Deck from "../models/Deck";

export async function getSingleDeckController(req: Request, res: Response) {
    const { deckId } = req.params;
    const decks = await Deck.findById(deckId);
    res.json(decks)
}