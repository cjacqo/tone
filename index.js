// const { Tone } = require("tone/build/esm/core/Tone")

// ------ VARIABLES ------ //
// -- Audio Context
let context

// -- Page Elements
const pianoParent = document.querySelector('.piano.parent')
const pianoContainer = document.createElement('div')
pianoContainer.classList.add('piano', 'container')
const buttonsParent = document.querySelector('.buttons.parent')
const buttonContainer = document.createElement('div')
buttonContainer.classList.add('buttons', 'container')

// -- Tone Elements
// synths
let loopBeat
let bassSynth, snare, cymbalSynth, polySynth, synth
let counter

// Array of note objects
const notesArr = [
    {
        value: 'A',
        note: 'C',
        dataKey: 'KeyA'
    },
    {
        value: 'W',
        note: 'C#',
        dataKey: 'KeyW'
    },
    {
        value: 'S',
        note: 'D',
        dataKey: 'KeyS'
    },
    {
        value: 'E',
        note: 'D#',
        dataKey: 'KeyE'
    },
    {
        value: 'D',
        note: 'E',
        dataKey: 'KeyD'
    },
    {
        value: 'F',
        note: 'F',
        dataKey: 'KeyF'
    },
    {
        value: 'T',
        note: 'F#',
        dataKey: 'KeyT'
    },
    {
        value: 'G',
        note: 'G',
        dataKey: 'KeyG'
    },
    {
        value: 'Y',
        note: 'G#',
        dataKey: 'KeyY'
    },
    {
        value: 'H',
        note: 'A',
        dataKey: 'KeyH'
    },
    {
        value: 'U',
        note: 'A#',
        dataKey: 'KeyU'
    },
    {
        value: 'J',
        note: 'B',
        dataKey: 'KeyJ'
    },
    {
        value: 'K',
        note: 'C',
        dataKey: 'KeyK'
    },
    {
        value: 'O',
        note: 'C#',
        dataKey: 'KeyO'
    },
    {
        value: 'L',
        note: 'D',
        dataKey: 'KeyL'
    }
]

// Array of wave types for oscillator
const oscTypeArr = [ 'sine' ]

function init() {
    try {
        window.AudioContext = window.AudioContext || window.webkitAudioContext
        context = new AudioContext()
        context.resume()
    } catch (err) {
        alert('Web Audio API is not supported in this browser')
    }
}

// ------ WINDOW ------ //
// -- Event Listeners
// handle keyboard clicks to play/release notes
window.addEventListener('keydown', playNote)
window.addEventListener('keyup', releaseNote)

window.onload = function() {
    init()
    // initialize synths
    synth = new Tone.Synth()
    bassSynth = new Tone.MonoSynth().toMaster()
    // define synth settings
    synth.oscillator.type = 'sine'
    // connect synths to audio nodes(?)
    synth.toMaster()
}


// ------ CREATE ELEMENTS TO APPEND ------ //
// -- Piano Keys
// create list of key objects (HTML with click listener)
let keys = notesArr.map(el => {
    const { note, dataKey } = el
    let key = document.createElement('div')
    key.setAttribute("data-key", `${dataKey}`)
    key.setAttribute("data-note", `${note}`)
    
    if (note.includes("#")) {
        key.classList.add('key', 'black')
    } else {
        key.classList.add('key', 'white')
    }

    key.addEventListener('mousedown', () => {
        playNote(note)
    })

    // append key to pianoContainer
    pianoContainer.appendChild(key)
    return key
})
// -- OSC Wave Type Buttons
let waveBtns = oscTypeArr.map(el => {
    const wave = el

    // get the wave svg
    let innerContent = getWaveImage(wave)

    // create element, attach listener and append to parent container
    let btn = document.createElement('button')
    btn.setAttribute('value', wave)
    btn.appendChild(innerContent)

    btn.addEventListener('click', () => {
        setOscillatorType(wave)
    })

    buttonContainer.appendChild(btn)
    return btn
})

// Function play a piano note on a keyboard press
function playNote(e) {
    let note

    if (e.type === 'keydown') {
        [key] = notesArr.filter(key => key.dataKey === e.code)
        note = key.note
    } else {
        note = e
    }

    Tone.context.resume().then(() => {
        synth.triggerAttack(`${note}3`, Tone.now)
    })
}

// Function to release a note on a keyboard release
function releaseNote(e) {
    Tone.context.resume().then(() => {
        synth.triggerRelease()
    })
}

// Function pick synth oscillator
function setOscillatorType(e) {
    synth.oscillator.type = e
}

// Append piano to the DOM
pianoParent.appendChild(pianoContainer)
buttonsParent.appendChild(buttonContainer)