import './memorygame.css'
import { createHeader } from '../header/header'
import { imgMemoryGame } from '../../../utils/arrayMemoryGame/arrayPhotos/img'

let cards = []
let selectedCards = 0
let emparejadas = 0
let bloqueoClick = false

export const initMemoryGame = () => {
  const header = document.querySelector('header')
  header.innerHTML = ''
  createHeader()
  tablero()
}

const flipCard = (cardBack, image) => {
  const carta = cardBack.parentElement
  carta.classList.toggle('flipped')
  cardBack.style.backgroundImage = `url(${image.url})`
  carta.dataset.imageId = image.id
}

const shuffleImages = () => {
  const images = imgMemoryGame.concat(imgMemoryGame)
  for (let i = images.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[images[i], images[j]] = [images[j], images[i]]
  }
  return images
}

const clickHandler = (event, cardBack, image) => {
  if (!bloqueoClick && selectedCards < 2) {
    flipCard(cardBack, image, event)
    selectedCards++
    if (selectedCards === 2) {
      bloqueoClick = true
      setTimeout(() => {
        check()
        bloqueoClick = false
      }, 1000)
    }
  }
}

const check = () => {
  const flippedCards = document.querySelectorAll('.flipped')

  if (flippedCards.length === 2) {
    const id1 = flippedCards[0].dataset.imageId
    const id2 = flippedCards[1].dataset.imageId

    if (id1 !== id2) {
      setTimeout(() => {
        flippedCards.forEach((card) => {
          const cardBack = card.querySelector('.back')
          noFlipCard(cardBack)
        })
      }, 1000)
    } else {
      emparejadas++
      youWin()
    }

    selectedCards = 0
    resetGame()
  }
}

const noFlipCard = (cardBack) => {
  const carta = cardBack.parentElement
  carta.classList.remove('flipped')
  cardBack.style.backgroundImage = ''
}

const resetGame = () => {
  const flippedCards = document.querySelectorAll('.flipped')
  flippedCards.forEach((card) => {
    card.classList.remove('flipped')
  })
}

const tablero = () => {
  const divTablero = document.createElement('div')
  divTablero.classList.add('tablero')

  const shuffledImages = shuffleImages()

  for (const image of shuffledImages) {
    const card = document.createElement('div')
    card.classList.add('card')

    const cardFront = document.createElement('div')
    cardFront.classList.add('front')
    card.appendChild(cardFront)

    const cardBack = document.createElement('div')
    cardBack.classList.add('back')

    card.addEventListener('click', (event) =>
      clickHandler(event, cardBack, image)
    )

    card.appendChild(cardBack)
    divTablero.appendChild(card)
    cards.push(card)
    card.dataset.imageId = image.id
  }

  document.body.appendChild(divTablero)
}

const youWin = () => {
  const divTablero = document.querySelector('.tablero')
  if (emparejadas === 8) {
    setTimeout(() => {
      divTablero.innerHTML = ''
      divTablero.className = 'win'
      const h2 = document.createElement('h2')
      h2.textContent = '¡HAS EMPAREJADO TODAS LAS CARTAS!'

      const button = document.createElement('button')
      button.textContent = 'Volver a empezar'
      button.addEventListener('click', () => {
        divTablero.innerHTML = ''
        tablero()
      })

      divTablero.appendChild(h2)
      divTablero.appendChild(button)
    }, 1000)
  }
}
