import { useEffect, useState } from 'react'
import './App.css'
import { Link } from 'react-router-dom';
import { deleteDecks } from './api/deleteDeck';
import { TDeck, getDecks } from './api/getDecks';
import { createDecks } from './api/createDecks';

function App() {
  const [decks, setDecks] = useState<TDeck[]>([]);
  const [title, setTitle] = useState('');

  async function handleCreateDeck(e: React.FormEvent) {
    e.preventDefault();
    const deck = await createDecks(title)
    setDecks([...decks, deck])
    setTitle('')
  }

  async function handleDeleteDeck(deckId: string) {
    await deleteDecks(deckId)
    setDecks(decks.filter((deck) => deck._id !== deckId))
  }

  useEffect(() => {
    async function fetchDecks() {
      const newDecks = await getDecks();
      setDecks(newDecks);
    }
    fetchDecks();
  }, [])

  return (
    <div className="App">
      <ul className="decks">
        {
          decks.map((deck) => (
            <li key={deck._id}>
              <button onClick={() => handleDeleteDeck(deck._id)}>x</button>
              <Link to={`decks/${deck._id}`}>
                {deck.title}</Link>
            </li>
          ))
        }
      </ul>
      <form onSubmit={handleCreateDeck}>
        <label htmlFor="deck-title">Deck Title</label>
        <input id="deck-title"
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setTitle(e.target.value)
          }}
        />
        <button>Create Deck</button>
      </form>
    </div>
  )
}

export default App
