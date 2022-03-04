// const { Tone } = require("tone/build/esm/core/Tone")


// ------ VARIABLES ------ //
// -- Tone
const TONE = new Tone()
// -- Audio Context
let context

// -- Page Elements
const pianoParent = document.querySelector('.parent')
const pianoContainer = document.createElement('div')
pianoContainer.classList.add('piano', 'container')

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

// ------ WINDOW ------ //
// -- Event Listeners
// handle keyboard clicks to play/release notes
window.addEventListener('keydown', playNote)
window.addEventListener('keyup', releaseNote)

function init() {
    try {
        window.AudioContext = window.AudioContext || window.webkitAudioContext
        context = new AudioContext()

        // initialize synths
        synth = new Tone.Synth()
        bassSynth = new Tone.MonoSynth().toMaster()
        // define synth settings
        synth.oscillator.type = 'sine'
        // connect synths to audio nodes(?)
        synth.toMaster()
        context.resume()
    } catch (err) {
        alert('Web Audio API is not supported in this browser')
    }
}

// resume context on window reload
// if (location.reload()) {
//     console.log("Reloaded")
// }

init()

// Create list of key objects (HTML with click listener)
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
        synth.triggerAttack(`${note}3`, '+0')
    })
}

// Function to release a note on a keyboard release
function releaseNote(e) {
    Tone.context.resume().then(() => {
        synth.triggerRelease()
    })
}

// Append piano to the DOM
pianoParent.appendChild(pianoContainer)