function sineWave(origin, svg) {
    let amplitude = 20      // --- helps control height
    let rarity = 2          // --- ??? not sure what it does yet, but higher number stretches the wave
    let freq = 0.25          // --- controls how many waves their are
    let phase = 2

    for (let i = -100; i < 100; i++) {
        let line = document.createElementNS("http://www.w3.org/2000/svg", "line")

        line.setAttribute('x1', (i - 1) * rarity + origin.x)
        line.setAttribute('y1', (Math.sin(freq*(i - 1 + phase)) * amplitude + origin.y) * 2)

        line.setAttribute('x2', i * rarity + origin.x)
        line.setAttribute('y2', (Math.sin(freq*(i + phase)) * amplitude + origin.y) * 2)

        line.setAttribute('style', "stroke: black; stroke-width: 5;")
        svg.appendChild(line)
    }

    return svg
}

function drawWave(svg, dimensions) {
    dimensions.map(d => {
        const { x1, y1, x2, y2 } = d
        let line = document.createElementNS("http://www.w3.org/2000/svg", "line")

        line.setAttribute('x1', x1)
        line.setAttribute('y1', y1)

        line.setAttribute('x2', x2)
        line.setAttribute('y2', y2)
        line.setAttribute('style', "stroke: black; stroke-width: 5;")

        svg.appendChild(line)
    })

    return svg
}

function getWaveImage(wave) {
    // create page element
    let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svg.setAttributeNS(null, "viewBox", "0 0 100 110");
    svg.setAttributeNS(null, "width", 25)
    svg.setAttributeNS(null, "height", 25)

    // set origin of axes
    let origin = {
        x: 25,
        y: 25
    }

    let dimensions = [
        // Sawtooth
        [
            {
                x1: 0,
                y1: 110,
                x2: 100,
                y2: 0
            },
            {
                x1: 100,
                y1: 0,
                x2: 100,
                y2: 110
            }
        ],
        // Triangle
        [
            {
                x1: 0,
                y1: 110,
                x2: 50,
                y2: 0
            },
            {
                x1: 50,
                y1: 0,
                x2: 100,
                y2: 110
            }
        ],
        // Square
        [
            {
                x1: 0,
                y1: 110,
                x2: 0,
                y2: 0
            },
            {
                x1: 0,
                y1: 0,
                x2: 50,
                y2: 0
            },
            {
                x1: 50,
                y1: 0,
                x2: 50,
                y2: 110
            },
            {
                x1: 50,
                y1: 110,
                x2: 100,
                y2: 110
            },
            {
                x1: 100,
                y1: 110,
                x2: 100,
                y2: 0
            }
        ]
    ]

    switch(wave) {
        case 'sine':
            sineWave(origin, svg)
            break
        case 'sawtooth':
            drawWave(svg, dimensions[0])
            break
        case 'triangle':
            drawWave(svg, dimensions[1])
            break
        case 'square':
            drawWave(svg, dimensions[2])
            break
        default:
            return
    }

    return svg
}