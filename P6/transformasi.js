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

function translasi(titik_lama, jarak_pindah) {
    let x_baru = titik_lama.x + jarak_pindah.x
    let y_baru = titik_lama.y + jarak_pindah.y

    return { x: x_baru, y: y_baru }
}

function skala(titik_lama, S) {
    let x_baru = titik_lama.x * S.x
    let y_baru = titik_lama.y * S.y

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

function skalaFP(titik_lama, titik_baru, S) {
    let p1 = translasi(titik_lama, { x: -titik_baru.x, y: -titik_baru.y })
    let p2 = skala(p1, S)
    let p3 = translasi(p2, titik_baru)

    return p3
}

function translasi_array(titik_lama, T) {
    let array_hasil = []
    for (let i = 0; i < titik_lama.length; i++) {
        let temp = translasi(titik_lama[i], T)
        array_hasil.push(temp)
    }
    return array_hasil
}