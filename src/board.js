import { WINNER_COMBOS } from "./constanst"

export  const checkWinner = (boardToCheck) => {
  // revision de combinaciones ganadoras de x u o 
  for (const combo of WINNER_COMBOS){
    const [a, b, c] = combo
    if(
      boardToCheck[a] && 
      boardToCheck[a] === boardToCheck[b] &&
      boardToCheck[a] === boardToCheck[c]
    ){
      return boardToCheck[a]
    }
  }
  return null
}
export const checkedEndGame = (newBoard) => {
  return newBoard.every((square) => square !== null)
}