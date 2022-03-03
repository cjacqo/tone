let loopBeat
let bassSynth, snare, cymbalSynth, polySynth
let counter

bassSynth = new Tone.MembraneSynth().toMaster()

// Array of note objects
const notesArr = [
    {
        value: 'A',
        note: 'C',
        dataKey: '65'
    },
    {
        value: 'W',
        note: 'C#',
        dataKey: '87'
    },
    {
        value: 'S',
        note: 'D',
        dataKey: '83'
    },
    {
        value: 'E',
        note: 'D#',
        dataKey: '69'
    },
    {
        value: 'D',
        note: 'E',
        dataKey: '68'
    },
    {
        value: 'F',
        note: 'F',
        dataKey: '70'
    },
    {
        value: 'T',
        note: 'F#',
        dataKey: '84'
    },
    {
        value: 'G',
        note: 'G',
        dataKey: '71'
    },
    {
        value: 'Y',
        note: 'G#',
        dataKey: '89'
    },
    {
        value: 'H',
        note: 'A',
        dataKey: '72'
    },
    {
        value: 'U',
        note: 'A#',
        dataKey: '85'
    },
    {
        value: 'J',
        note: 'B',
        dataKey: '74'
    },
    {
        value: 'K',
        note: 'C',
        dataKey: '75'
    },
    {
        value: 'O',
        note: 'C#',
        dataKey: '79'
    },
    {
        value: 'L',
        note: 'D',
        dataKey: '76'
    }
]

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

// Function play a piano note
function playNote(note) {
    bassSynth.triggerAttackRelease(`${note}3`, '8n')
}

// Append piano to the DOM
pianoParent.appendChild(pianoContainer)