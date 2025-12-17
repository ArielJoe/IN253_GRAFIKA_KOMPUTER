// Ariel - 2372015

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x111111);

const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    1000
);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.z = 5;

const controls = new OrbitControls(camera, renderer.domElement);

let geo = new THREE.IcosahedronGeometry(1, 0);
geo = geo.toNonIndexed();

const positionAttr = geo.attributes.position;
const uvAttr = geo.attributes.uv;
const colors = [];

function createAtlas() {
    const size = 1024;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, size, size);

    const cols = 5;
    const rows = 4;
    const cellW = size / cols;
    const cellH = size / rows;

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'black';
    ctx.font = 'bold 50px Arial';

    for (let i = 0; i < 20; i++) {
        const colIndex = i % cols;
        const rowIndex = Math.floor(i / cols);

        const x = colIndex * cellW + cellW / 2;
        const y = rowIndex * cellH + cellH / 2;

        ctx.fillText(i + 1, x, y);
    }
    return new THREE.CanvasTexture(canvas);
}

const texture = createAtlas();

const faceCount = positionAttr.count / 3;
const cols = 5;
const rows = 4;
const uvRadius = 0.08;

for (let i = 0; i < faceCount; i++) {
    const r = Math.random();
    const g = Math.random();
    const b = Math.random();
    colors.push(r, g, b);
    colors.push(r, g, b);
    colors.push(r, g, b);

    const colIndex = i % cols;
    const rowIndex = rows - 1 - Math.floor(i / cols);

    const uStep = 1 / cols;
    const vStep = 1 / rows;

    const uCenter = (colIndex * uStep) + (uStep / 2);
    const vCenter = (rowIndex * vStep) + (vStep / 2);

    const angleOffset = Math.PI / 2;

    for (let j = 0; j < 3; j++) {
        const angle = angleOffset + (j * (Math.PI * 2) / 3);

        const u = uCenter + Math.cos(angle) * uvRadius;
        const v = vCenter + Math.sin(angle) * uvRadius;

        uvAttr.setXY(i * 3 + j, u, v);
    }
}

geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

const material = new THREE.MeshBasicMaterial({
    map: texture,
    vertexColors: true,
});

const mesh = new THREE.Mesh(geo, material);
scene.add(mesh);

function animate() {
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();
