import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const piramida_1 = new THREE.BufferGeometry();
const piramida_2 = new THREE.BufferGeometry();
const piramida_3 = new THREE.BufferGeometry();

const vertices_1 = new Float32Array([
    0, 0.2, 0,    // puncak
    -1, -1, 1,  // depan kiri
    1, -1, 1,   // depan kanan
    1, -1, -1,  // belakang kanan
    -1, -1, -1  // belakang kiri
]);
const vertices_2 = new Float32Array([
    0, 0.1, 0,    // puncak
    -2, -2, 2,  // depan kiri
    2, -2, 2,   // depan kanan
    2, -2, -2,  // belakang kanan
    -2, -2, -2  // belakang kiri
]);
const vertices_3 = new Float32Array([
    0, 0, 0,    // puncak
    -3, -3, 3,  // depan kiri
    3, -3, 3,   // depan kanan
    3, -3, -3,  // belakang kanan
    -3, -3, -3  // belakang kiri
]);

const indices_1 = [
    0, 1, 2,  // sisi depan
    0, 2, 3,  // sisi kanan
    0, 3, 4,  // sisi belakang
    0, 4, 1,  // sisi kiri
];
const indices_2 = [
    0, 1, 2,  // sisi depan
    0, 2, 3,  // sisi kanan
    0, 3, 4,  // sisi belakang
    0, 4, 1,  // sisi kiri
]
const indices_3 = [
    0, 1, 2,  // sisi depan
    0, 2, 3,  // sisi kanan
    0, 3, 4,  // sisi belakang
    0, 4, 1,  // sisi kiri
]

piramida_1.setAttribute('position', new THREE.BufferAttribute(vertices_1, 3));
piramida_2.setAttribute('position', new THREE.BufferAttribute(vertices_2, 3));
piramida_3.setAttribute('position', new THREE.BufferAttribute(vertices_3, 3));
const buffer_material1 = new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.DoubleSide });
const buffer_material2 = new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide });
const buffer_material3 = new THREE.MeshBasicMaterial({ color: 0x0000ff, side: THREE.DoubleSide });
piramida_1.setIndex(indices_1);
piramida_2.setIndex(indices_2);
piramida_3.setIndex(indices_3);
const buffer_mesh1 = new THREE.Mesh(piramida_1, buffer_material1);
const buffer_mesh2 = new THREE.Mesh(piramida_2, buffer_material2);
const buffer_mesh3 = new THREE.Mesh(piramida_3, buffer_material3);

scene.add(buffer_mesh1);
scene.add(buffer_mesh2);
scene.add(buffer_mesh3);

camera.position.y = -2;
camera.position.z = 7;
renderer.render(scene, camera);

function animate() {
    requestAnimationFrame(animate);
    buffer_mesh1.rotation.y += 0.01;
    buffer_mesh2.rotation.y += 0.01;
    buffer_mesh3.rotation.y += 0.01;
    renderer.render(scene, camera);
}
animate();
