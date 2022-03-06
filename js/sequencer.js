class Sequencer {
    constructor() {
        this.cols = 17
        this.rows = 8
        this.cells = []
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
            cell.classList.add('cell')
            cell.innerText = (i + 1)

            // --- check if cell is NOT the first one in the row
            if (i % this.cols !== 0) {
                

                let cellObj = new Cell(cell)

                this.cells.push(cellObj)

            }
            container.appendChild(cell).className = 'sequencer-item'
        }

        this.cells.map(el => {
            el.element.addEventListener('click', () => {
                el.element.classList.toggle('active')
            })
        })

        console.log(this.cells)

        return container
    }
}

class Cell {
    constructor(element) {
        this.element = element

    }
}