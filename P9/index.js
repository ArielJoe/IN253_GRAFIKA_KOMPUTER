import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
const mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh);

// camera.position.x = 5;
// camera.position.y = 2;
// camera.position.z = 10;
// renderer.render(scene, camera);

const bufferGeometry = new THREE.BufferGeometry();
const vertices = new Float32Array([
    // titik unik kubus
    1, 1, 1,   // 0 depan kanan atas
    -1, -1, 1,  // 1 depan kiri bawah
    1, -1, 1,   // 2 depan kanan bawah
    -1, 1, 1,   // 3 depan kiri atas

    1, 1, -1,  // 4 belakang kanan atas
    -1, -1, -1, // 5 belakang kiri bawah
    1, -1, -1,  // 6 belakang kanan bawah
    -1, 1, -1   // 7 belakang kiri atas
]);

const indices = [
    0, 1, 2, 0, 3, 1,   // depan
    4, 6, 5, 4, 5, 7,   // belakang
    4, 0, 2, 4, 2, 6,   // kanan
    7, 5, 1, 7, 1, 3,   // kiri
    4, 7, 3, 4, 3, 0,   // atas
    1, 5, 6, 1, 6, 2    // bawah
]

const colors = new Float32Array([
    1, 0, 0,  // merah
    0, 1, 0,  // hijau
    0, 0, 1,  // biru
    1, 1, 0,  // kuning
])
bufferGeometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
const bufferMaterial = new THREE.MeshBasicMaterial({ vertexColors: true, side: THREE.DoubleSide });

bufferGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
bufferGeometry.setIndex(indices);

const bufferMesh = new THREE.Mesh(bufferGeometry, bufferMaterial);
scene.add(bufferMesh);

camera.position.z = 7;
renderer.render(scene, camera);

function animate() {
    requestAnimationFrame(animate);
    // bufferMesh.rotation.x += 0.01;
    bufferMesh.rotation.y += 0.01;
    renderer.render(scene, camera);
}

animate();