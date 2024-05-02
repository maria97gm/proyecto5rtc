import './ahorcado.css'
import { createHeader } from '../header/header'
import { words } from '../../../utils/arrayAhorcado/arrayWords/words'
import { ahorcadoImgs } from '../../../utils/arrayAhorcado/arrayImgs/ahorcadoImgs'

let errorCounter = 0

export const initAhorcado = () => {
  const header = document.querySelector('header')
  header.innerHTML = ''
  createHeader()
  start()
}

const start = () => {
  limpiarTablero()

  const divTablero = document.createElement('div')
  const input = document.createElement('input')
  const h2 = document.createElement('h2')
  const h3 = document.createElement('h3')
  h2.textContent = '¿Con qué letra quieres jugar?'
  h3.textContent = 'Pista: La palabra es un deporte'
  input.setAttribute('type', 'text')
  input.setAttribute('maxlength', '1')
  input.setAttribute('placeholder', 'Escribe una letra')

  divTablero.classList.add('ahorcado')
  divTablero.appendChild(h2)
  divTablero.appendChild(h3)
  divTablero.appendChild(input)
  document.body.appendChild(divTablero)

  const divImg = document.createElement('div')
  divImg.classList.add('ahorcadoImg')
  document.body.appendChild(divImg)

  renderHiddenWord()
}

const limpiarTablero = () => {
  const divTablero = document.querySelector('.ahorcado')
  const divImg = document.querySelector('.ahorcadoImg')
  if (divTablero) {
    document.body.removeChild(divTablero)
  }
  if (divImg) {
    document.body.removeChild(divImg)
  }
}

const renderHiddenWord = () => {
  const hiddenWord = words[Math.floor(Math.random() * words.length)]
  const lineas = hiddenWord.replace(/[a-zA-Z]/g, '_ ')
  const divTablero = document.querySelector('.ahorcado')
  const palabraConLineas = document.createElement('p')
  palabraConLineas.textContent = lineas

  divTablero.appendChild(palabraConLineas)
  checkWord(hiddenWord, palabraConLineas)
}

const checkWord = (hiddenWord, writeWord) => {
  let inputWord = document.querySelector('input[type="text"]')

  if (!inputWord) {
    return
  }

  inputWord.addEventListener('input', () => {
    const writtenWord = inputWord.value.trim().toLowerCase()

    if (writtenWord.length === 1 && writtenWord.match(/[a-zA-Z]/)) {
      const indices = []
      for (let i = 0; i < hiddenWord.length; i++) {
        if (hiddenWord[i] === writtenWord) {
          indices.push(i)
        }
      }

      if (indices.length > 0) {
        const palabraActualizada = writeWord.textContent.split(' ')
        for (const index of indices) {
          palabraActualizada[index] = writtenWord
        }

        writeWord.textContent = palabraActualizada.join(' ')
      } else {
        const divTablero = document.querySelector('.ahorcado')

        wrongLetter(writeWord, hiddenWord, divTablero)
      }
      youWin(writeWord)
      setTimeout(() => {
        inputWord.value = ''
      }, 1000)
    }
  })
}

const wrongLetter = (writeWord, hiddenWord, divTablero) => {
  const ahorcadoImg = document.querySelector('.ahorcadoImg')

  if (errorCounter < ahorcadoImgs.length - 1) {
    errorCounter++

    ahorcadoImg.style.backgroundImage = `url(${ahorcadoImgs[errorCounter]})`
  } else {
    showWord(writeWord, hiddenWord, divTablero)
  }
}

const youWin = (writeWord) => {
  if (!writeWord.textContent.includes('_')) {
    const divTablero = document.querySelector('.ahorcado')
    const mensajeVictoria = document.createElement('p')
    mensajeVictoria.textContent = '¡Felicidades, has ganado!'

    const botonReiniciar = document.createElement('button')
    botonReiniciar.textContent = 'Reiniciar juego'
    botonReiniciar.addEventListener('click', start)

    divTablero.appendChild(mensajeVictoria)
    divTablero.appendChild(botonReiniciar)
  }
}

const showWord = (writeWord, hiddenWord, divTablero) => {
  if (writeWord.textContent.includes('_')) {
    const p = document.createElement('p')
    p.textContent = `¡No has acertado la palabra secreta! La palabra es: ${hiddenWord}`

    const button = document.createElement('button')
    button.textContent = 'Reiniciar juego'
    button.addEventListener('click', start)

    divTablero.innerHTML = ''

    divTablero.appendChild(p)
    divTablero.appendChild(button)
  }
}
