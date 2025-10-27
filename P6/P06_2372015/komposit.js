// Nama: Ariel
// NRP: 2372015

function createIdentity() {
    let identity = [
        1, 0, 0,
        0, 1, 0,
        0, 0, 1
    ];
    return identity;
}

function multiplyMatriks(m1, m2) {
    let hasil = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
    ];

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            for (let k = 0; k < 3; k++) {
                hasil[i][k] += m1[i][j] * m2[j][k];
            }
        }
    }

    return hasil;
}

function createTranslation(tx, ty) {
    let translasi = [
        [1, 0, tx],
        [0, 1, ty],
        [0, 0, 1]
    ];
    return translasi;
}

function createScale(sx, sy) {
    let skala = [
        [sx, 0, 0],
        [0, sy, 0],
        [0, 0, 1]
    ]
    return skala;
}

function createRotation(theta) {
    let rotasi = [
        [Math.cos(theta), -Math.sin(theta), 0],
        [Math.sin(theta), Math.cos(theta), 0],
        [0, 0, 1]
    ]
    return rotasi;
}

function rotation_fp(xc, yc, theta) {
    let m1 = createTranslation(-xc, -yc);
    let m2 = createRotation(theta);
    let m3 = createTranslation(xc, yc);

    let hasil = multiplyMatriks(m3, m2);
    hasil = multiplyMatriks(hasil, m1);

    return hasil;
}

function scale_fp(xc, yc, sx, sy) {
    let m1 = createTranslation(-xc, -yc);
    let m2 = createScale(sx, sy);
    let m3 = createTranslation(xc, yc);

    let hasil = multiplyMatriks(m3, m2);
    hasil = multiplyMatriks(hasil, m1);

    return hasil;
}

function transform_titik(titik_lama, m) {
    let x_baru = m[0][0] * titik_lama.x + m[0][1] * titik_lama.y + m[0][2] * 1;
    let y_baru = m[1][0] * titik_lama.x + m[1][1] * titik_lama.y + m[1][2] * 1;

    return { x: x_baru, y: y_baru };
}

function transform_array(array_titik, m) {
    let hasil = [];
    for (let i = 0; i < array_titik.length; i++) {
        let titik_baru = transform_titik(array_titik[i], m);
        hasil.push(titik_baru);
    }

    return hasil;
}

function createRegularPolygon(n, radius) {
    let pts = [];
    for (let i = 0; i < n; i++) {
        let angle = (2 * Math.PI * i) / n;
        pts.push({
            x: radius * Math.cos(angle),
            y: radius * Math.sin(angle)
        });
    }
    return pts;
}