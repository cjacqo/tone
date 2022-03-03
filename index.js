let loopBeat
let bassSynth

function setup() {
    // Initialize the bassSynth
    bassSynth = new Tone.MembraneSynth().toMaster()
    
    loopBeat = new Tone.Loop(song, '4n' )

    // Set bpm
    Tone.Transport.bpm.value = 140

    Tone.Transport.start()
    loopBeat.start(0)
}

// ??? to fix a sample playback issue with the web and sound,
//     do the following to the song function
function song(time) {
    bassSynth.triggerAttackRelease('c3', '8n', time)
    console.log(time)
}

function stop() {
    bassSynth.dispose()
}

// attach a click listener to a play button
document.querySelector('#start')?.addEventListener('click', () => {
    setup()
})

document.querySelector('#end')?.addEventListener('click', () => {
    stop()
})