let loopBeat

function setup() {
    loopBeat = new Tone.Loop(song, '4n' )
    Tone.Transport.start()
    loopBeat.start(0)
}

// ??? to fix a sample playback issue with the web and sound,
//     do the following to the song function
function song(time) {
    console.log(time)
}

// attach a click listener to a play button
document.querySelector('button')?.addEventListener('click', () => {
    setup()
})