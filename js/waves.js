function sineWave(origin, svg) {
    let amplitude = 30      // --- helps control height
    let rarity = 2          // --- ??? not sure what it does yet, but higher number stretches the wave
    let freq = 0.25          // --- controls how many waves their are
    let phase = 2

    for (let i = -100; i < 100; i++) {
        let line = document.createElementNS("http://www.w3.org/2000/svg", "line")

        line.setAttribute('x1', (i - 1) * rarity + origin.x)
        line.setAttribute('y1', Math.sin(freq*(i - 1 + phase)) * amplitude + origin.y)

        line.setAttribute('x2', i * rarity + origin.x)
        line.setAttribute('y2', Math.sin(freq*(i + phase)) * amplitude + origin.y)

        line.setAttribute('style', "stroke: black; stroke-width: 1;")
        svg.appendChild(line)
    }

    return svg
}

function sawtoothWave(origin, svg) {
    
}

function getWaveImage(wave) {
    // create page element
    let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    // svg.setAttributeNS(null, "viewBox", "0 " + 15 + " " + 25 + " " + 25);
    svg.setAttributeNS(null, "viewBox", "0 -15 100 100");
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
            break
        case 'triangle':
            break
        case 'square':
            break
        default:
            return
    }

    return svg
}