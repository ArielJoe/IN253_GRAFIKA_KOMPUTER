// Ariel - 2372015

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.set(0, 0, 5);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

const textureLoader = new THREE.TextureLoader();

const albedoMap = textureLoader.load('./boulder/badlands-boulders_albedo.png');
const aoMap = textureLoader.load('./boulder/badlands-boulders_ao.png');
const heightMap = textureLoader.load('./boulder/badlands-boulders_height.png');
const metallicMap = textureLoader.load('./boulder/badlands-boulders_metallic.png');
const normalMap = textureLoader.load('./boulder/badlands-boulders_normal-dx.png');
const roughnessMap = textureLoader.load('./boulder/badlands-boulders_roughness.png');

const geometry = new THREE.TorusGeometry(1.5, 0.6, 64, 100);

const material = new THREE.MeshStandardMaterial({
    map: albedoMap,
    aoMap: aoMap,
    aoMapIntensity: 1,
    displacementMap: heightMap,
    displacementScale: 0.1,
    metalnessMap: metallicMap,
    metalness: 0.5,
    normalMap: normalMap,
    normalScale: new THREE.Vector2(1, 1),
    roughnessMap: roughnessMap,
    roughness: 1
});

geometry.setAttribute('uv2', geometry.attributes.uv);


const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1);
directionalLight1.position.set(5, 5, 5);
scene.add(directionalLight1);

const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight2.position.set(-5, 3, -5);
scene.add(directionalLight2);

const pointLight = new THREE.PointLight(0xffffff, 0.5);
pointLight.position.set(0, 5, 0);
scene.add(pointLight);

function animate() {
    requestAnimationFrame(animate);

    torus.rotation.x += 0.002;
    torus.rotation.y += 0.003;

    controls.update();
    renderer.render(scene, camera);
}

animate();
