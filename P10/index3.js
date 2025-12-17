import * as THREE from 'three';
import { cameraFar } from 'three/tsl';

// Membuat scene (semacam canvasnya)
const scene = new THREE.Scene();
// window.innerWidth / window.innerHeight itu jadinya aspect ratio kayak 16:9
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
const renderer = new THREE.WebGLRenderer();

// Mengatur ukuran renderer sesuai ukuran jendela browser
renderer.setSize(window.innerWidth, window.innerHeight);

// Menambahkan renderer ke dalam body HTML
document.body.appendChild(renderer.domElement);

camera.position.z = 10;

const kayu_texture = new THREE.TextureLoader().load('./img_2/kayu.jpg');


const A_texture = new THREE.TextureLoader().load('./img/A.png');
const B_texture = new THREE.TextureLoader().load('./img/B.png');
const C_texture = new THREE.TextureLoader().load('./img/C.jpg');
const D_texture = new THREE.TextureLoader().load('./img/D.png');

const A = new THREE.MeshBasicMaterial({ map: A_texture });

const mat_array = [
    new THREE.MeshBasicMaterial({ map: A_texture }),
    new THREE.MeshBasicMaterial({ map: B_texture }),
    new THREE.MeshBasicMaterial({ map: C_texture }),
    new THREE.MeshBasicMaterial({ map: D_texture }),
];

const geometry = new THREE.BoxGeometry(1, 1, 1);
// color: 0x00ff00 -> Untuk warna
// wireframe: true -> Untuk menampilkan garis-garisnya saja
// map: kayu_texture -> Untuk menambahkan tekstur (Perlu THREE.TextureLoader().load() terlebih dahulu)
const material = new THREE.MeshBasicMaterial({ map: kayu_texture });
const mesh = new THREE.Mesh(geometry, mat_array);
mesh.position.set(-2, 0, 0);

const geometry2 = new THREE.BufferGeometry();
// kumpulan titik titik (vertices) dari kubus
const vertices = new Float32Array([
    // 1, 1, 1,
    // -1, -1, 1,
    // 1, -1, 1,

    // 1, 1, 1,
    // -1, 1, 1,
    // -1, -1, 1,

    // 1, 1, -1,
    // -1, -1, -1,
    // 1, -1, -1,

    // 1, 1, -1,
    // -1, 1, -1,
    // -1, -1, -1,

    1, 1, 1, // titik 0 kanan atas depan
    -1, -1, 1, // titik 1 kiri bawah depan
    1, -1, 1, // titik 2 kanan bawah depan
    -1, 1, 1, // titik 3 kiri atas depan

    // 1, 1, -1, // titik 4 kanan atas belakang
    // -1, -1, -1, // titik 5 kiri bawah belakang
    // 1, -1, -1, // titik 6 kanan bawah belakang
    // -1, 1, -1, // titik 7 kiri atas belakang
])

const indices = [
    0, 1, 2,
    0, 3, 1,
    // 4, 5, 6,
    // 4, 7, 5,
    // 3, 7, 5,
    // 3, 5, 1,
    // 0, 2, 6,
    // 0, 6, 4,
    // 0, 4, 7,
    // 7, 3, 0,
    // 1, 5, 6,
    // 6, 2, 1,

];
const colors = new Float32Array([
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    // 0, 1, 0,
    // 0, 0, 1,
    // 1, 1, 0,
    // 1, 0, 1,
    // 0, 1, 1,
    // 1, 1, 1,
    // 0, 0, 0,
])

const uvs = new Float32Array([
    1, 1,
    0, 0,
    1, 0,
    0, 1,
]);

geometry2.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
geometry2.setAttribute('color', new THREE.BufferAttribute(colors, 3));
geometry2.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
geometry2.setIndex(indices)
const mate = new THREE.MeshBasicMaterial({ vertexColors: true, side: THREE.DoubleSide });
const mesh_2 = new THREE.Mesh(geometry2, A);
scene.add(mesh_2);

// Titik Tengah
const geometry_3 = new THREE.BoxGeometry(0.1, 0.1, 0.1);
const material_3 = new THREE.MeshLambertMaterial({ map: kayu_texture });
const mesh_3 = new THREE.Mesh(geometry_3, material_3);
mesh_3.position.set(0, 0, 0);
scene.add(mesh_3);




scene.add(mesh);

function draw() {
    mesh.rotation.y += 0.03;
    mesh.rotation.x += 0.03;
    // mesh_2.rotation.y += 0.03;
    // mesh_2.rotation.x += 0.03;
    renderer.render(scene, camera);
    requestAnimationFrame(draw);
}

draw();