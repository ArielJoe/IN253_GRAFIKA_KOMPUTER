import * as THREE from 'three';

const scene = new THREE.Scene();
const cam = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

cam.position.z = 5;
const batu = new THREE.TextureLoader().load('./assets/img/boulder/badlands-boulders_ao.png');
const normal = new THREE.TextureLoader().load('./assets/img/boulder/badlands-boulders_normal-dx.png');
const roughnessMap = new THREE.TextureLoader().load('./assets/img/boulder/badlands-boulders_roughness.png');

const one = new THREE.TextureLoader().load('./assets/dices/dice-six-faces-one.png');
const two = new THREE.TextureLoader().load('./assets/dices/dice-six-faces-two.png');
const three = new THREE.TextureLoader().load('./assets/dices/dice-six-faces-three.png');
const four = new THREE.TextureLoader().load('./assets/dices/dice-six-faces-four.png');
const five = new THREE.TextureLoader().load('./assets/dices/dice-six-faces-five.png');
const six = new THREE.TextureLoader().load('./assets/dices/dice-six-faces-six.png');

const mat_array = [
    new THREE.MeshBasicMaterial({ map: one }),
    new THREE.MeshBasicMaterial({ map: two }),
    new THREE.MeshBasicMaterial({ map: three }),
    new THREE.MeshBasicMaterial({ map: four }),
    new THREE.MeshBasicMaterial({ map: five }),
    new THREE.MeshBasicMaterial({ map: six }),
];

// const geometry = new THREE.SphereGeometry(1, 50, 50);
const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshLambertMaterial({ map: batu, normalMap: normal });
const material = new THREE.MeshStandardMaterial({ map: batu, normalMap: normal, roughnessMap: roughnessMap });
const mesh = new THREE.Mesh(geometry, mat_array);
scene.add(mesh);
mesh.position.set(0, 0, 0);

// geometry 2

let light = new THREE.PointLight(0xffffff, 10);
light.position.set(0, 3, 2);
scene.add(light);
let light2 = new THREE.PointLight(0xffffff, 10);
light.position.set(0, -3, 2);
scene.add(light2);

// const geometry2 = new THREE.BoxGeometry(1,1,1);
// const material2 = new THREE.MeshLambertMaterial({color: 0x946038, map: kayu});
// const mesh2 = new THREE.Mesh(geometry2, material2);
// scene.add(mesh2)
// mesh2.position.set(2,0,0);

function draw() {
    mesh.rotation.x += 0.01;
    mesh.rotation.z += 0.01;
    mesh.rotation.y += 0.01;
    // mesh2.rotation.z += 0.01;
    // mesh2.rotation.y += 0.01;
    renderer.render(scene, cam);
    requestAnimationFrame(draw);
}

draw();
