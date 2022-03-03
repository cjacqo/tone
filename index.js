let loopBeat
let bassSynth, snare, cymbalSynth, polySynth
let counter

function setup() {
    counter = 0
    
    // Initialize the bassSynth, and polySynth
    bassSynth = new Tone.MembraneSynth().toMaster()
    cymbalSynth = new Tone.MetalSynth().toMaster()
    snare       = new Tone.MembraneSynth().toMaster()
    polySynth = new Tone.PolySynth().toMaster()
    polySynth.set({ detune: -1200 })
    
    loopBeat = new Tone.Loop(song, '16n' )
    // Set bpm
    // Tone.Transport.bpm.value = 140

    Tone.Transport.start()
    loopBeat.start(0)
}

// ??? to fix a sample playback issue with the web and sound,
//     do the following to the song function
function song(time) {
    if (counter % 4 === 0) {
        bassSynth.triggerAttackRelease("F#3", '8n', time, 1)
    }

    // --- simple hat
    // if (counter % 2 === 0) {
    //     cymbalSynth.triggerAttackRelease('32n', time, 0.3)
    // }

    // --- cool hat
    if (counter % 4 !== 1) {
        if (counter === 3 || counter === 12) {
            // -- slight open cymbal 
            cymbalSynth.envelope.decay = 0.5
        } else {
            // -- shortest cymbal 
            cymbalSynth.envelope.decay = 0.01
        }
        // -- default cymbal 
        cymbalSynth.triggerAttackRelease('32n', time, 0.3)
    }

    counter = (counter + 1) % 16
}

function stop() {
    Tone.Transport.pause()
}

// attach a click listener to a play button
document.querySelector('#start')?.addEventListener('click', () => {
    setup()
})

// attach a click listener to a play button
document.querySelector('#stop')?.addEventListener('click', () => {
    stop()
})