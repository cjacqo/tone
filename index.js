let loopBeat
let bassSynth
let snare
let polySynth

function setup() {
    // Initialize the bassSynth, and polySynth
    bassSynth = new Tone.MembraneSynth().toMaster()
    snare       = new Tone.MembraneSynth().toMaster()
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
    snare.triggerAttackRelease('C4', '4n', time, 1)
    // --- data type for current bea
    //     BAR:BEATS:SIXTEENTH
    let cb = [...Tone.Transport.position]
    let bar = cb[0]
    let beat = cb[2]
    let sixt = cb[4]

    // --- MAKE BEAT USING THE NEW VALUES ABOVE
    // - kick
    if (parseInt(beat) === 0) {
        bassSynth.triggerAttackRelease('C3', '8n', time)
    }
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