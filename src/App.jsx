import { useState } from 'react'
import './App.css'
import confetti from 'canvas-confetti'
import { Square } from './components/Square'
import { TURNS} from './constanst'
import { checkWinner, checkedEndGame } from './board'
import { Winner } from './components/Winner'

function App() {
  const [ board, setBoard ] = useState(Array(9).fill(null))
  const [ turn, setTurn ] = useState(TURNS.X)
  // null => no hay winner false empate 
  const [winner, setWinner] = useState(null)

  const resetGame = () =>{
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  const updateBoard = (index) => {
    // no se escribe la posicion si teien algo
    if (board[index] || winner) return
    const newBoard = [...board]
    newBoard[index] = turn
    // se actualiza el tablero 
    setBoard(newBoard)
    // cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    // buscar el new ganador
    setTurn(newTurn)
    const newWinner = checkWinner(newBoard)
    if(newWinner){
      confetti()
      setWinner(newWinner)
    }else if (checkedEndGame(newBoard)){
      setWinner(false)
    }
  }

  return (
    <main className='board'>
      <h1>🔱 🇮🇳  ➡ </h1>
      <button onClick={resetGame}>Reset</button>
      <section className='game'>
        {
          board.map((square, index) => {
            return(
              <Square 
                key={index}
                index={index}
                updateBoard={updateBoard}
                >
                  {square}
              </Square>
            )
          })
        }
      </section>
      <section className='turn'>
        <Square isSelected={turn === TURNS.X} >
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>
      <section>
        <Winner resetGame={resetGame} winner={winner}/>
      </section>
    </main>
  )
}
export default App
