import './ppyt.css'
import { createHeader } from '../header/header'
import { imgPpyt } from '../../../utils/arrayPpyt/arrayPpyt'

let playerScore = 0
let computerScore = 0

const initScoreFromLocalStorage = () => {
  playerScore = parseInt(localStorage.getItem('playerScore')) || playerScore
  computerScore =
    parseInt(localStorage.getItem('computerScore')) || computerScore
}

export const initPpyt = () => {
  initScoreFromLocalStorage()

  const header = document.querySelector('header')
  header.innerHTML = ''
  createHeader()
  tablero()
}

const tablero = () => {
  const divTablero = document.createElement('div')
  const divPpyt = document.createElement('div')
  const divVS = document.createElement('div')
  const divScore = document.createElement('div')

  divPpyt.classList.add('jugador')
  divVS.classList.add('vs-container')
  divScore.classList.add('score-container')

  const divEleccionJugador = document.createElement('div')
  const divEleccionMaquina = document.createElement('div')
  const divPlayerScore = document.createElement('div')
  const divComputerScore = document.createElement('div')

  divEleccionJugador.classList.add('eleccionJugador')
  divEleccionMaquina.classList.add('eleccionMaquina')
  divPlayerScore.classList.add('player-score')
  divComputerScore.classList.add('computer-score')

  const vsText = document.createElement('h2')
  vsText.textContent = 'VS'
  vsText.classList.add('vs-text')

  divVS.appendChild(divEleccionJugador)
  divVS.appendChild(vsText)
  divVS.appendChild(divEleccionMaquina)

  divScore.appendChild(divPlayerScore)
  divScore.appendChild(divComputerScore)

  for (const img of imgPpyt) {
    const imgPpyt = document.createElement('img')
    imgPpyt.src = img.url
    divPpyt.appendChild(imgPpyt)
    imgPpyt.classList.add(img.name)
    imgPpyt.addEventListener('click', (event) => {
      playerVSPC(event)
    })
  }

  divTablero.appendChild(divPpyt)
  divTablero.appendChild(divVS)
  divTablero.appendChild(divScore)
  document.body.appendChild(divTablero)
}

const updateScore = () => {
  const playerScoreElement = document.querySelector('.player-score')
  const computerScoreElement = document.querySelector('.computer-score')

  playerScoreElement.textContent = `Jugador: ${playerScore}`
  computerScoreElement.textContent = `Ordenador: ${computerScore}`

  localStorage.setItem('playerScore', playerScore.toString())
  localStorage.setItem('computerScore', computerScore.toString())
}

const compareChoices = (playerChoice, computerChoice) => {
  const divScore = document.querySelector('.score-container')
  divScore.querySelectorAll('p').forEach((p) => p.remove())

  const info = document.createElement('p')
  if (playerChoice === computerChoice) {
    info.textContent = 'Empate'
  } else if (
    (playerChoice === 'piedra' && computerChoice === 'tijera') ||
    (playerChoice === 'papel' && computerChoice === 'piedra') ||
    (playerChoice === 'tijera' && computerChoice === 'papel')
  ) {
    info.textContent = '+1 para el jugador'
    playerScore++
  } else {
    info.textContent = '+1 para el ordenador'
    computerScore++
  }
  divScore.appendChild(info)
  updateScore()
}

const playerVSPC = (event) => {
  const playerChoice = event.target.classList[0]

  const selectedImage = imgPpyt.find((img) => img.name === playerChoice)
  const imgElementPlayer = document.createElement('img')
  imgElementPlayer.src = selectedImage.url
  const eleccionJugador = document.querySelector('.eleccionJugador')
  eleccionJugador.innerHTML = ''
  eleccionJugador.appendChild(imgElementPlayer)

  setTimeout(() => {
    const numPC = Math.floor(Math.random() * imgPpyt.length)
    const eleccionPC = imgPpyt[numPC]
    const imgElementPC = document.createElement('img')
    imgElementPC.src = eleccionPC.url
    const eleccionMaquina = document.querySelector('.eleccionMaquina')
    eleccionMaquina.innerHTML = ''
    eleccionMaquina.appendChild(imgElementPC)

    const computerChoice = eleccionPC.name
    compareChoices(playerChoice, computerChoice)
  }, 1000)
}
