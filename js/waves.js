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

function sawtoothWave(svg) {
    let line = document.createElementNS("http://www.w3.org/2000/svg", "line")
    let line2 = document.createElementNS("http://www.w3.org/2000/svg", "line")
    let lines = []

    // --- first line: diagonal line
    line.setAttribute('x1', 0)
    line.setAttribute('y1', 110)

    line.setAttribute('x2', 75)
    line.setAttribute('y2', 0)
    line.setAttribute('style', "stroke: black; stroke-width: 5;")

    // --- second line: straight down
    line2.setAttribute('x1', 75)
    line2.setAttribute('y1', 0)

    line2.setAttribute('x2', 75)
    line2.setAttribute('y2', 110)
    line2.setAttribute('style', "stroke: black; stroke-width: 5;")

    lines.push(line)
    lines.push(line2)
    
    lines.forEach(l => {
        svg.appendChild(l)
    })
    return svg
}

function triangleWave(svg) {
    let line = document.createElementNS("http://www.w3.org/2000/svg", "line")
    let line2 = document.createElementNS("http://www.w3.org/2000/svg", "line")
    let lines = []

    // --- first line: diagonal line
    line.setAttribute('x1', 0)
    line.setAttribute('y1', 110)

    line.setAttribute('x2', 50)
    line.setAttribute('y2', 0)
    line.setAttribute('style', "stroke: black; stroke-width: 5;")

    // --- second line: straight down
    line2.setAttribute('x1', 50)
    line2.setAttribute('y1', 0)

    line2.setAttribute('x2', 100)
    line2.setAttribute('y2', 110)
    line2.setAttribute('style', "stroke: black; stroke-width: 5;")

    lines.push(line)
    lines.push(line2)
    
    lines.forEach(l => {
        svg.appendChild(l)
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

    switch(wave) {
        case 'sine':
            sineWave(origin, svg)
            break
        case 'sawtooth':
            sawtoothWave(svg)
            break
        case 'triangle':
            triangleWave(svg)
            break
        case 'square':
            break
        default:
            return
    }

    return svg
}