class Knobs {
    constructor() {
        this.knobs = []
    }

    // Create a new knob
    newKnob(type, values) {
        let k = new Knob(type, values)
        this.knobs.push(k)
    }

    get allKnobs() {
        return this.knobs
    }

    knobAtIndex(index) {
        return this.knobs[index]
    }

    get numberOfKnobs() {
        return this.knobs.length
    }

}

class Knob {
    constructor(type, values, valueIndex) {
        this.type       = type
        this.values     = values
        this.value      
        this.element    = this.createElement()
    }

    turn() {
        console.log(this.type, " turn")
    }

    setValue() {
        return this.values[this.valueIndex]
    }

    createElement() {
        // create HTML elements
        // --- knob containers
        let container = document.createElement('div')
        let knob = document.createElement('div')
        // --- button containers
        let buttonContainer = document.createElement('div')
        // --- value to click
        this.values.map(el => {
            const wave = el

            // get the wave svg
            let innerContent = getWaveImage(wave)
        
            // create element, attach listener and append to parent container
            let btn = document.createElement('button')
            btn.setAttribute('value', wave)
            btn.appendChild(innerContent)
        
            btn.addEventListener('click', () => {
                this.setValue(wave)
            })
        
            buttonContainer.appendChild(btn)
            return btn
        })
        // --- add class names
        container.classList.add('control', 'container')
        knob.classList.add('knob')
        buttonContainer.classList.add('buttons', 'container')

        // complete the creation
        // --- append the buttons to the container
        container.appendChild(buttonContainer)
        // --- append the knob to the container
        container.appendChild(knob)
        // --- set the element value of this knob
        return container
    }

    setValue(e) {
        this.value = e
    }

    // changeValue() {
    //     if (this.value < this.values.length) {
    //         this.value = this.value + 1
    //     } else if (this.value )
    // }
}