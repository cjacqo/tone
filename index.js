// const synth = new Tone.Synth()
// synth.triggerAttackRelease("C4", "8n");

// const oscillator = new Tone.Oscillator().toMaster()

// import * as Tone from './node_modules/tone/build/Tone.js'

// console.log(Tone)

// // create a synth and connect it to the main ouput (your speakers)
// const synth = new Tone.Synth().toDestination()
// console.log(synth)

// const now = Tone.now()

// // trigger the attack immediately
// synth.triggerAttack("C4", now)

// // wait one second before triggering the release
// synth.triggerRelease(now + 1)

let loopBeat

function setup() {
    loopBeat = new Tone.Loop(song, '4n' )
    Tone.Transport.start()
    loopBeat.start(0)
}

function song(time) {
    console.log(time)
}

// attach a click listener to a play button
document.querySelector('button')?.addEventListener('click', () => {
    setup()
})