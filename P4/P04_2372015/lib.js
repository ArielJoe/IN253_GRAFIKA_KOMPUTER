function titik(imageData, x, y, r, g, b) {
    let index;
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

function bunga(imageData, xc, yc, radius, n, r, g, b) {
    for (let theta = 0; theta < 2 * Math.PI; theta += 0.001) {
        x = xc + radius * Math.cos(theta * n) * Math.cos(theta);
        y = yc + radius * Math.cos(theta * n) * Math.sin(theta);
        titik(imageData, x, y, r, g, b);
    }
}

function floodFillStack(imageData, x0, y0, toFlood, color) {

    let stackTumpukan = [];
    stackTumpukan.push({ x: x0, y: y0 });
    while (stackTumpukan.length > 0) {
        let titik_sekarang = stackTumpukan.pop();
        let index_sekarang = 4 * (titik_sekarang.x + (titik_sekarang.y * cnv.width));
        let r1 = imageData.data[index_sekarang];
        let g1 = imageData.data[index_sekarang + 1];
        let b1 = imageData.data[index_sekarang + 2];
        if (r1 == toFlood.r && g1 == toFlood.g && b1 == toFlood.b) {
            imageData.data[index_sekarang] = color.r;
            imageData.data[index_sekarang + 1] = color.g;
            imageData.data[index_sekarang + 2] = color.b;
            imageData.data[index_sekarang + 3] = 255;

            stackTumpukan.push({ x: titik_sekarang.x + 1, y: titik_sekarang.y });
            stackTumpukan.push({ x: titik_sekarang.x - 1, y: titik_sekarang.y });
            stackTumpukan.push({ x: titik_sekarang.x, y: titik_sekarang.y + 1 });
            stackTumpukan.push({ x: titik_sekarang.x, y: titik_sekarang.y - 1 });
        }
    }
}

function polar(imageData, xc, yc, rad, r, g, b) {
    for (let theta = 0; theta < Math.PI * 2; theta += 0.01) {
        let x = xc + rad * Math.cos(theta);
        let y = yc + rad * Math.sin(theta);

        titik(imageData, x, y, r, g, b);
    }
}

function polygon(imageData, point_array, r, g, b) {
    for (let i = 0; i < point_array.length - 1; i++) {
        let x1 = point_array[i].x
        let y1 = point_array[i].y
        let x2 = point_array[i + 1].x
        let y2 = point_array[i + 1].y

        garis(imageData, x1, y1, x2, y2, r, g, b);
    }

    let xAkhir = point_array[point_array.length - 1].x
    let yAkhir = point_array[point_array.length - 1].y
    let xAwal = point_array[0].x
    let yAwal = point_array[0].y

    garis(imageData, xAkhir, yAkhir, xAwal, yAwal, r, g, b);
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
