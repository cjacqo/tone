// const { Tone } = require("tone/build/esm/core/Tone")

// ------ VARIABLES ------ //
// -- Audio Context
let context

// -- Keyboard and Notes
let octave

// -- Page Elements
const sequencerParent = document.querySelector('.sequencer.parent')
const pianoParent = document.querySelector('.piano.parent')
const pianoContainer = document.createElement('div')
pianoContainer.classList.add('piano', 'container')
const buttonsParent = document.querySelector('.buttons.parent')
const buttonContainer = document.createElement('div')
buttonContainer.classList.add('buttons', 'container', 'flex', 'col')

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
        dataKey: 'KeyA',
        adjustOctave: 0
    },
    {
        value: 'W',
        note: 'C#',
        dataKey: 'KeyW',
        adjustOctave: 0
    },
    {
        value: 'S',
        note: 'D',
        dataKey: 'KeyS',
        adjustOctave: 0
    },
    {
        value: 'E',
        note: 'D#',
        dataKey: 'KeyE',
        adjustOctave: 0
    },
    {
        value: 'D',
        note: 'E',
        dataKey: 'KeyD',
        adjustOctave: 0
    },
    {
        value: 'F',
        note: 'F',
        dataKey: 'KeyF',
        adjustOctave: 0
    },
    {
        value: 'T',
        note: 'F#',
        dataKey: 'KeyT',
        adjustOctave: 0
    },
    {
        value: 'G',
        note: 'G',
        dataKey: 'KeyG',
        adjustOctave: 0
    },
    {
        value: 'Y',
        note: 'G#',
        dataKey: 'KeyY',
        adjustOctave: 0
    },
    {
        value: 'H',
        note: 'A',
        dataKey: 'KeyH',
        adjustOctave: 0
    },
    {
        value: 'U',
        note: 'A#',
        dataKey: 'KeyU',
        adjustOctave: 0
    },
    {
        value: 'J',
        note: 'B',
        dataKey: 'KeyJ',
        adjustOctave: 0
    },
    {
        value: 'K',
        note: 'C',
        dataKey: 'KeyK',
        adjustOctave: 1
    },
    {
        value: 'O',
        note: 'C#',
        dataKey: 'KeyO',
        adjustOctave: 1
    },
    {
        value: 'L',
        note: 'D',
        dataKey: 'KeyL',
        adjustOctave: 1
    }
]

// Array of wave types for oscillator
const oscTypeArr = [ 'sine', 'sawtooth', 'triangle', 'square' ]

function init() {
    try {
        window.AudioContext = window.AudioContext || window.webkitAudioContext
        context = new AudioContext()
        context.resume()
    } catch (err) {
        alert('Web Audio API is not supported in this browser')
    }

    // set initial octave of keyboard
    octave = 3
}

// ------ WINDOW ------ //
// -- Event Listeners
// handle keyboard clicks to play/release notes
window.addEventListener('keydown', (e) => {
    if (e.code === 'KeyX') {
        if (octave < 7) {
            octave = octave + 1
        }
        return
    } else if (e.code === 'KeyZ') {
        if (octave !== 0) {
            octave = octave - 1
        }
        return
    } else {
        playNote(e)
    }
})
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
    let baseOctave = octave

    if (e.type === 'keydown') {
        [key] = notesArr.filter(key => key.dataKey === e.code)
        note = key.note
        console.log(key)
        baseOctave = baseOctave + key.adjustOctave
    } else {
        note = e
    }

    Tone.context.resume().then(() => {
        synth.triggerAttack(`${note}${baseOctave}`, Tone.context.currentTime)
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

// Practice making knobs
let knobs = new Knobs()
knobs.newKnob("knob", oscTypeArr, 0)
let knobsArr = knobs.allKnobs

console.log(knobsArr[0])

// Sequencer
let sequencer = new Sequencer()
console.log(sequencer)

// Append piano to the DOM
sequencerParent.appendChild(sequencer.element)
pianoParent.appendChild(pianoContainer)
buttonsParent.appendChild(buttonContainer)