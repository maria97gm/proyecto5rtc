// landing.js
import './landing.css'
import { games } from '../../../utils/arrayGames/games'
import { initMemoryGame } from '../memorygame/memorygame'
import { initPpyt } from '../ppyt/ppyt'
import { initAhorcado } from '../ahorcado/ahorcado'

export const createButtonsGames = () => {
  const divGame = document.querySelector('#game')
  const myH1 = document.createElement('h1')
  myH1.textContent = "Play hard, work hard. Let's do it!"
  divGame.appendChild(myH1)

  for (const game of games) {
    const button = document.createElement('button')
    button.textContent = game.name

    let clickButton
    if (game.name === 'Memory Game') {
      clickButton = initMemoryGame
    } else if (game.name === 'Piedra, Papel o Tijera') {
      clickButton = initPpyt
    } else {
      clickButton = initAhorcado
    }

    button.addEventListener('click', () => {
      clickButton()
    })
    divGame.appendChild(button)
  }
}
