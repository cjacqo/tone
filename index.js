let loopBeat
let bassSynth, snare, cymbalSynth, polySynth
let counter

bassSynth = new Tone.MonoSynth().toMaster()

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

// Add event listener to listen for keyboard clicks
window.addEventListener('keydown', (e) => {
    console.log(e)
    playNote(e.code)
})

// Query the piano parent
const pianoParent = document.querySelector('.parent')

// Create a parent element for the keys
const pianoContainer = document.createElement('div')
pianoContainer.classList.add('piano', 'container')

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
function playNote(n) {
    let [key] = notesArr.filter(key => key.dataKey === n)
    bassSynth.triggerAttackRelease(`${key.note}3`, '8n', 1)
}

// Append piano to the DOM
pianoParent.appendChild(pianoContainer)