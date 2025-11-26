import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const prisma = new THREE.BufferGeometry();

const vertices = new Float32Array([
    // 1
    0, 0, 0, -1, -1, 0, 1, -1, 0,
    // 2
    0, 0, 3, -1, -1, 3, 1, -1, 3,
    // 3
    0, 0, 0, -1, -1, 0, -1, -1, 3,
    // 4
    0, 0, 0, -1, -1, 3, 0, 0, 3,
    // 5
    1, -1, 0, 1, -1, 3, -1, -1, 3,
    // 6
    1, -1, 0, -1, -1, 3, -1, -1, 0,
]);

const face_colors = [
    [1, 0, 0], // merah
    [0, 1, 0], // hijau
    [0, 0, 1], // biru
    [1, 1, 0], // kuning
    [1, 0, 1], // magenta
    [0, 1, 1], // cyan
];

const colors = [];

for (let i = 0; i < face_colors.length; i++) {
    const c = face_colors[i];
    colors.push(c[0], c[1], c[2]);
    colors.push(c[0], c[1], c[2]);
    colors.push(c[0], c[1], c[2]);
}

const color_array = new Float32Array(colors);

prisma.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
prisma.setAttribute('color', new THREE.BufferAttribute(color_array, 3));

const material = new THREE.MeshBasicMaterial({ vertexColors: true, side: THREE.DoubleSide });
const mesh = new THREE.Mesh(prisma, material);
scene.add(mesh);

camera.position.z = 7;

function animate() {
    requestAnimationFrame(animate);
    mesh.rotation.y += 0.01;
    renderer.render(scene, camera);
}
animate();
