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

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
   75,
   window.innerWidth / window.innerHeight,
   0.1,
   100
);

camera.position.z = 5;

const cubegeo = new THREE.BoxGeometry(1.5, 1.5, 1.5);
const cubemat = new THREE.MeshBasicMaterial({
   color: "red",
   //  wireframe: true,
});
const cube = new THREE.Mesh(cubegeo, cubemat);
// cube.position.x = -1;

const spheregeo = new THREE.SphereGeometry(1, 10, 10);
const spheremat = new THREE.MeshBasicMaterial({
   color: "green",
   //  wireframe: true,
});
const sphere = new THREE.Mesh(spheregeo, spheremat);

// sphere.position.x = 1;

const group = new THREE.Group();
group.add(cube);
group.add(sphere);

// group.position.x = 0;

scene.add(group);

const canvas = document.querySelector("canvas");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);
function animate() {
   window.requestAnimationFrame(animate);
   group.rotation.x += 0.01;
   group.rotation.y += 0.03;
   group.rotation.z += 0.03;
   //  cube.rotation.x += 0.01;
   //  cube.rotation.z += 0.03;
   //  cube.rotation.y += 0.03;
   //  group.position.x += 0.1;
   //  group.position.y += 0.1;
   //  group.position.z += 0.1;

   renderer.render(scene, camera);
}

animate();
