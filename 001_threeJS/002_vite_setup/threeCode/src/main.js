// import * as THREE from "three";

// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(
//    75,
//    window.innerWidth / window.innerHeight,
//    0.1,
//    100
// );

// camera.position.z = 5;

// const geometry = new THREE.BoxGeometry(2, 2, 2);
// const material = new THREE.MeshBasicMaterial({
//    color: "cyan",
//    wireframe: true,
// });
// const mesh = new THREE.Mesh(geometry, material);

// scene.add(mesh);

// const canvas = document.querySelector("canvas");
// const renderer = new THREE.WebGLRenderer({ canvas });
// renderer.setSize(window.innerWidth, window.innerHeight);

// function animate() {
//    window.requestAnimationFrame(animate);
//    mesh.rotation.y += 0.01;

//    renderer.render(scene, camera);
// }

// animate();

//NOTE: Rotation and Grouping in Three.js

import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
   75,
   window.innerWidth / window.innerHeight,
   0.1,
   100
);

// camera.position.y = 5;
camera.position.z = 5;

// const cubegeo = new THREE.TorusKnotGeometry(0.5, 0.1, 5, 5);
// const cubemat = new THREE.MeshBasicMaterial({
//    color: "green",
//    wireframe: true,
// });
// const cube = new THREE.Mesh(cubegeo, cubemat);

const geometry = new THREE.BufferGeometry();

// create a simple square shape. We duplicate the top left and bottom right
// vertices because each vertex needs to appear once per triangle.
const vertices = new Float32Array(3000);

for (let i = 0; i <= 1000 * 3; i++) {
   vertices[i] = (Math.random() - 0.5) * 7;
}

geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
const material = new THREE.MeshBasicMaterial({
   color: "green",
   wireframe: true,
});
const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

const canvas = document.querySelector("canvas");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

renderer.render(scene, camera);
let clock = new THREE.Clock();
function animate() {
   window.requestAnimationFrame(animate);

   // cube.rotation.x = clock.getElapsedTime() * 12;
   // cube.rotation.y = clock.getElapsedTime() * 12;
   // cube.rotation.z = clock.getElapsedTime();
   // mesh.rotation.x += 0.01;
   mesh.rotation.y += 0.01;
   // mesh.rotation.z += 0.01;
   controls.update();
   camera.position.z += -0.001;
   renderer.render(scene, camera);
}

animate();
