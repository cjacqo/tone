class Sequencer {
    constructor() {
        this.cols = 17
        this.rows = 8
        this.element = this.makeRows()
    }

    makeRows() {
        // create elements
        // --- parent grid element
        const container = document.createElement('div')
        // --- add class names
        container.classList.add('sequencer', 'container')
        // --- add properties for variable settings in CSS
        container.style.setProperty('--grid-rows', this.rows)
        container.style.setProperty('--grid-cols', this.cols)

        // loop over num of rows to create cells
        for (let i = 0; i < (this.cols * this.rows); i++) {
            let cell = document.createElement('div')
            cell.innerText = (i + 1)
            container.appendChild(cell).className = 'sequencer-item'
        }

        return container
    }
}