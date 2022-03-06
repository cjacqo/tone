class Sequencer {
    constructor() {
        this.cols = 17
        this.rows = 8
        this.cells = []
        this.verticalColumns = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]
        this.element = this.makeRows()
    }

    makeRows() {
        // --- track columns
        let rowNum = 0

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
            // --- create a cell object and add classes
            let cell = document.createElement('div')
            cell.classList.add('cell')
            // --- check if cell is NOT the first one in the row
            //     to push to the cells array with clickable cells
            if (i % this.cols !== 0) {
                // --- initialize a new cell object
                let cellObj = new Cell(cell)
                this.cells.push(cellObj)

                this.makeVerticalColumns(cellObj, i % this.cols, rowNum)
            } else {
                rowNum = rowNum + 1
            }
            // --- append the current cell to the sequencer cells container
            container.appendChild(cell).className = 'sequencer-item'
        }

        // add listener to clickable cells
        // --- map over cells array and add a toggle action on click
        this.cells.map(el => {
            el.element.addEventListener('click', () => {
                el.element.classList.toggle('active')
            })
        })

        return container
    }

    makeVerticalColumns(cell, colNum, rowNum) {
        cell.element.setAttribute('column', `${colNum}`)
        cell.element.setAttribute('row', `${rowNum}`)
        // cell.verticalColumns[i].push(cell)

    }
}

class Cell {
    constructor(element) {
        this.element = element
    }
}