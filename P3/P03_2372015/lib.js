function titik(imageData, x, y, r, g, b) {
    var index;
    index = 4 * (Math.ceil(x) + (Math.ceil(y) * cnv.width));
    imageData.data[index] = r;
    imageData.data[index + 1] = g;
    imageData.data[index + 2] = b;
    imageData.data[index + 3] = 255;
}

function garis(imageData, x1, y1, x2, y2, r, g, b) {
    var dx, dy;
    dx = x2 - x1;
    dy = y2 - y1;

    if (Math.abs(dx) > Math.abs(dy)) {
        if (x1 > x2) {
            var y = y1;
            for (var x = x1; x > x2; x--) {
                y += dy / Math.abs(dx);
                titik(imageData, x, y, r, g, b);
            }
        } else {
            var y = y1;
            for (var x = x1; x < x2; x++) {
                y += dy / Math.abs(dx);
                titik(imageData, x, y, r, g, b);
            }
        }
    } else {
        if (y1 > y2) {
            var x = x1;
            for (var y = y1; y > y2; y--) {
                x += dx / Math.abs(dy);
                titik(imageData, x, y, r, g, b);
            }
        } else {
            var x = x1;
            for (var y = y1; y < y2; y++) {
                x += dx / Math.abs(dy);
                titik(imageData, x, y, r, g, b);
            }
        }
    }
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function obat_nyamuk(imageData, xc, yc, r, g, b) {
    for (let theta = 0; theta < Math.PI * 9.5; theta += 0.01) {
        let rad = 4 * theta;
        let x = xc + rad * Math.cos(theta);
        let y = yc + rad * Math.sin(theta);
        titik(imageData, x, y, r, g, b);
    }
}

function bunga(imageData, xc, yc, rad, n, r, g, b) {
    for (let theta = 0; theta < Math.PI * 2; theta += 0.01) {
        let x = xc + rad * Math.cos(n * theta) * Math.cos(theta);
        let y = yc + rad * Math.cos(n * theta) * Math.sin(theta);
        titik(imageData, x, y, r, g, b);
    }
}

function mistletoe(imageData, xc, yc, rad, r, g, b) {
    let phi = 0

    for (let theta = 0; theta < Math.PI * 2; theta += 1 / rad) {
        let x = xc + (rad * Math.cos(2 * theta) + 10 * Math.sin(phi)) * Math.cos(theta)
        let y = yc + (rad * Math.cos(2 * theta) + 10 * Math.sin(phi)) * Math.sin(theta)

        titik(imageData, x, y, r, g, b);
        phi += 30 / rad;
    }
}

function polar(imageData, xc, yc, rad, r, g, b) {
    for (let theta = 0; theta < Math.PI * 2; theta += 0.01) {
        let x = xc + rad * Math.cos(theta);
        let y = yc + rad * Math.sin(theta);

        titik(imageData, x, y, r, g, b);
    }
}
