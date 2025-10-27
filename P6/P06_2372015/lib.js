// Nama: Ariel
// NRP: 2372015

function gambar_titik(imageData, x, y, r, g, b) {
    var index;
    index = 4 * (Math.ceil(x) + (Math.ceil(y) * cnv.width));
    imageData.data[index] = r; // R
    imageData.data[index + 1] = g; // G
    imageData.data[index + 2] = b; // B
    imageData.data[index + 3] = 255; // alpha
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

function polygon(imageData, point_array, r, g, b) {
    for (let i = 0; i < point_array.length - 1; i++) {
        let x1 = point_array[i].x
        let y1 = point_array[i].y
        let x2 = point_array[i + 1].x
        let y2 = point_array[i + 1].y

        dda_line(imageData, x1, y1, x2, y2, r, g, b);
    }

    let xAkhir = point_array[point_array.length - 1].x
    let yAkhir = point_array[point_array.length - 1].y
    let xAwal = point_array[0].x
    let yAwal = point_array[0].y

    dda_line(imageData, xAkhir, yAkhir, xAwal, yAwal, r, g, b);
}
