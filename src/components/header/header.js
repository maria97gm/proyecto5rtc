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
  logo.addEventListener('click', () => {
    window.location.href = '/'
  })
}
