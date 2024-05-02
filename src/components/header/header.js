import './header.css'
import { games } from '../../../utils/arrayGames/games'
import { initMemoryGame } from '../memorygame/memorygame'
import { initAhorcado } from '../ahorcado/ahorcado'
import { initPpyt } from '../ppyt/ppyt'

export const createHeader = () => {
  const divGame = document.querySelector('#game')
  divGame.innerHTML = ''
  const myHeader = document.querySelector('header')
  const logo = document.createElement('img')
  logo.src = '/assets/favicon.png'
  myHeader.appendChild(logo)
  document.body.appendChild(myHeader)
  createNav()
}
let clickButton
const createNav = () => {
  const myHeader = document.querySelector('header')

  for (const game of games) {
    const elementHeader = document.createElement('a')
    elementHeader.textContent = game.name

    if (game.name === 'Memory Game') {
      clickButton = initMemoryGame
    } else if (game.name === 'Piedra, Papel o Tijera') {
      clickButton = initPpyt
    } else if (game.name === 'Ahorcado') {
      clickButton = initAhorcado
    }

    elementHeader.addEventListener('click', clickButton)
    myHeader.appendChild(elementHeader)
  }
}
