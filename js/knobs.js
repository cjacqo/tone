class Knobs {
    constructor() {
        this.knobs = []
    }

    // Create a new knob
    newKnob(type) {
        let k = new Knob(type)
        this.knobs.push(k)
    }

    get allKnobs() {
        return this.knobs
    }

    get numberOfKnobs() {
        return this.knobs.length
    }
}

class Knob {
    constructor(type) {
        this.type = type
    }

    turn() {
        console.log(this.type, " turn")
    }
}