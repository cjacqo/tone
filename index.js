let loopBeat
let bassSynth
let polySynth

function setup() {
    // Initialize the bassSynth, and polySynth
    bassSynth = new Tone.MembraneSynth().toMaster()
    polySynth = new Tone.PolySynth().toMaster()
    polySynth.set({ detune: -1200 })
    
    loopBeat = new Tone.Loop(song, '4n' )

    // Set bpm
    Tone.Transport.bpm.value = 140

    Tone.Transport.start()
    loopBeat.start(0)
}

// ??? to fix a sample playback issue with the web and sound,
//     do the following to the song function
function song(time) {
    bassSynth.triggerAttackRelease('C4', '8n', time)
    polySynth.triggerAttackRelease(['C4', 'E4', 'A4'], 1)
    console.log(time)
}

function stop() {
    bassSynth.dispose()
    polySynth.dispose()
}

// attach a click listener to a play button
document.querySelector('#start')?.addEventListener('click', () => {
    setup()
})

document.querySelector('#end')?.addEventListener('click', () => {
    stop()
})