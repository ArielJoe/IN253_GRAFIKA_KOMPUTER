// Nama: Ariel
// NRP: 2372015

function gambar_titik(imageData, x, y, r, g, b) {
    var index;
    index = 4 * (Math.ceil(x) + (Math.ceil(y) * cnv.width));
    imageData.data[index] = r;
    imageData.data[index + 1] = g;
    imageData.data[index + 2] = b;
    imageData.data[index + 3] = 255;
}

function dda_line(imageData, x1, y1, x2, y2, r, g, b) {
    var dx, dy;
    dx = x2 - x1;
    dy = y2 - y1;

    if (Math.abs(dx) > Math.abs(dy)) {
        if (x1 > x2) {
            var y = y1;
            for (var x = x1; x > x2; x--) {
                y += dy / Math.abs(dx);
                gambar_titik(imageData, x, y, r, g, b);
            }
        } else {
            var y = y1;
            for (var x = x1; x < x2; x++) {
                y += dy / Math.abs(dx);
                gambar_titik(imageData, x, y, r, g, b);
            }
        }
    } else {
        if (y1 > y2) {
            var x = x1;
            for (var y = y1; y > y2; y--) {
                x += dx / Math.abs(dy);
                gambar_titik(imageData, x, y, r, g, b);
            }
        } else {
            var x = x1;
            for (var y = y1; y < y2; y++) {
                x += dx / Math.abs(dy);
                gambar_titik(imageData, x, y, r, g, b);
            }
        }
    }
}

function translasi(titik_lama, jarak_pindah) {
    let x_baru = titik_lama.x + jarak_pindah.x
    let y_baru = titik_lama.y + jarak_pindah.y
    return { x: x_baru, y: y_baru }
}

function rotasi(titik_lama, sudut) {
    let x_baru = titik_lama.x * Math.cos(sudut) - titik_lama.y * Math.sin(sudut)
    let y_baru = titik_lama.x * Math.sin(sudut) + titik_lama.y * Math.cos(sudut)
    return { x: x_baru, y: y_baru }
}

function rotasiFP(titik_lama, titik_putar, sudut) {
    let p1 = translasi(titik_lama, { x: -titik_putar.x, y: -titik_putar.y })
    let p2 = rotasi(p1, sudut)
    let p3 = translasi(p2, titik_putar)
    return p3
}

function polar_circle2(imageData, xc, yc, radius, r, g, b) {
    for (let theta = 0; theta < 2 * Math.PI; theta += 0.01) {
        let x = xc + radius * Math.cos(theta);
        let y = yc + radius * Math.sin(theta);
        gambar_titik(imageData, x, y, r, g, b);
    }
}

function floodFillStack(imageData, x, y, r, g, b) {
    let stack = [];
    stack.push({ x: Math.floor(x), y: Math.floor(y) });

    let targetColor = getPixelColor(imageData, Math.floor(x), Math.floor(y));
    let fillColor = { r: r, g: g, b: b };

    if (targetColor.r === fillColor.r && targetColor.g === fillColor.g && targetColor.b === fillColor.b) {
        return;
    }

    while (stack.length > 0) {
        let point = stack.pop();
        let px = point.x;
        let py = point.y;

        if (px < 0 || px >= cnv.width || py < 0 || py >= cnv.height) continue;

        let currentColor = getPixelColor(imageData, px, py);

        if (currentColor.r === targetColor.r && currentColor.g === targetColor.g && currentColor.b === targetColor.b) {
            gambar_titik(imageData, px, py, r, g, b);

            stack.push({ x: px + 1, y: py });
            stack.push({ x: px - 1, y: py });
            stack.push({ x: px, y: py + 1 });
            stack.push({ x: px, y: py - 1 });
        }
    }
}

function getPixelColor(imageData, x, y) {
    let index = 4 * (x + y * cnv.width);
    return {
        r: imageData.data[index],
        g: imageData.data[index + 1],
        b: imageData.data[index + 2]
    };
}

function translate_point(from, to) {
    let dx = to.x - from.x;
    let dy = to.y - from.y;
    let distance = Math.sqrt(dx * dx + dy * dy);

    if (distance === 0) return { x: 0, y: 0 };

    let speed = 2;
    return {
        x: (dx / distance) * speed,
        y: (dy / distance) * speed
    };
}