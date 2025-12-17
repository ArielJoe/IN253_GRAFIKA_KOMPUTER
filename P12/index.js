import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import ui_overlay from './ui_overlay';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.z = 8;

const orbitControls = new OrbitControls(camera, renderer.domElement);

orbitControls.target.set(0, 0, 0);
orbitControls.enableDamping = true;
orbitControls.dampingFactor = 0.05;

let light = new THREE.PointLight(0xffffff, 10);
let light2 = new THREE.PointLight(0xffffff, 10);
light.position.set(0, 3, 2);
light2.position.set(0, -3, 2);
scene.add(light);
scene.add(light2);

const texture = new THREE.TextureLoader();
const batu_texture = texture.load('./assets/img/boulder/badlands-boulders_albedo.png');
const normal_texture = new THREE.TextureLoader().load('./assets/img/boulder/badlands-boulders_normal-dx.png');
const roughness_texture = new THREE.TextureLoader().load('./assets/img/boulder/badlands-boulders_roughness.png');
const aoMap_texture = new THREE.TextureLoader().load('./assets/img/boulder/badlands-boulders_ao.png');
const metalness_texture = new THREE.TextureLoader().load('./assets/img/boulder/badlands-boulders_metalness.png');

const geometry = new THREE.SphereGeometry(1, 32, 16);
const material = new THREE.MeshStandardMaterial({ map: batu_texture, normalMap: normal_texture, roughnessMap: roughness_texture, aoMap: aoMap_texture, metalnessMap: metalness_texture });
const sphere = new THREE.Mesh(geometry, material);

sphere.position.set(0, 0, 0);
sphere.matrixAutoUpdate = false;
scene.add(sphere);

const plane = new THREE.PlaneGeometry(8, 8, 10, 10);
const plane_material = new THREE.MeshBasicMaterial({ color: 0xffffff });
const mesh_plane = new THREE.Mesh(plane, plane_material);
mesh_plane.rotation.x = -Math.PI / 2;
mesh_plane.position.set(0, -2, 0);
scene.add(mesh_plane);

const gui = new ui_overlay();

function draw() {
    // sphere.rotation.y += 0.01;
    // sphere.rotation.x += 0.01;
    let rMatrix = new THREE.Matrix4().makeRotationY(gui.param.y);
    let tMatrix = new THREE.Matrix4().makeTranslation(gui.param.x, 0, gui.param.z);
    let result = new THREE.Matrix4().multiplyMatrices(tMatrix, rMatrix);
    sphere.matrix.fromArray(result.toArray());
    orbitControls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(draw);
}

draw();
