// import * as THREE from "three";
// import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(
//    75,
//    window.innerWidth / window.innerHeight,
//    0.1,
//    1000
// );

// // Position the camera
// // camera.position.set(1, 1, 6);
// camera.position.z = 6;

// const canvas = document.querySelector("canvas");
// const renderer = new THREE.WebGLRenderer({ canvas });
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

// //NOTE: Ambient light
// // const ambientLight = new THREE.AmbientLight("white", 1);
// // scene.add(ambientLight);

// // NOTE: Direction light
// // const directionLight = new THREE.DirectionalLight("white", 0.5);
// // directionLight.position.set(2, 2, 0);
// // scene.add(directionLight);

// // NOTE:Point light
// // const pointLight = new THREE.PointLight("0xffffff", 400, 100);
// // // pointLight.position.set(0.7, 1.5, 1.8);
// // pointLight.position.set(3, 2, -3);
// // scene.add(pointLight);

// //NOTE:  Spote light
// const spotLight = new THREE.SpotLight(0xffffff);
// spotLight.position.set(1, 3, 2);
// scene.add(spotLight);

// const helper = new THREE.PointLightHelper(spotLight, 10);
// scene.add(helper);

// // Cube
// const geometry = new THREE.BoxGeometry(1, 2, 3);
// // const material = new THREE.MeshPhysicalMaterial({
// //    color: 0xffd700, //goldColor
// //    metalness: 1,
// //    roughness: 0.2,
// //    reflectivity: 0.9,
// // });
// const material = new THREE.MeshPhysicalMaterial({
//    color: "red",
// });
// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

// // OrbitControls
// const controls = new OrbitControls(camera, renderer.domElement);
// controls.enableDamping = true;
// controls.dampingFactor = 0.05;
// controls.enableZoom = true;

// // Handle window resize
// window.addEventListener("resize", () => {
//    camera.aspect = window.innerWidth / window.innerHeight;
//    camera.updateProjectionMatrix();
//    renderer.setSize(window.innerWidth, window.innerHeight);
// });

// // Animation loop
// function animate() {
//    requestAnimationFrame(animate);

//    // cube.rotation.y += 0.01;
//    // cube.rotation.x += 0.01;
//    // cube.rotation.z += 0.01;
//    // pointLight.rotation.y += 0.1;

//    controls.update(); // Required if damping is enabled
//    renderer.render(scene, camera);
// }

// animate();

// Import Three.js
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// Create the scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(
   75,
   window.innerWidth / window.innerHeight,
   0.1,
   1000
);
camera.position.set(3, 3, 5);
camera.lookAt(0, 0, 0);

// Create the renderer
const canvas = document.querySelector("canvas");
const renderer = new THREE.WebGLRenderer({ canvas });
// const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

// raycaster Setup
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
let previousInteracted = null;
let originalColor = null;

function onPointerMove(event) {
   pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
   pointer.y = -(event.clientX / window.innerWidth) * 2 + 1;

   raycaster.setFromCamera(pointer, camera);
   let intersects = raycaster.intersectObjects([box, sphere]);
   if (intersects.length > 0) {
      if (previousInteracted !== intersects[0].object) {
         if (previousInteracted) {
            previousInteracted.material.color.set(originalColor);
         }
         previousInteracted = intersects[0].object;
         originalColor = previousInteracted.material.color.getHex();
         previousInteracted.material.color.set("#8B5DFF");
      }
   } else {
      if (previousInteracted) {
         previousInteracted.material.color.set(originalColor);
         previousInteracted = null;
      }
   }
}

// Add a box geometry
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const boxMaterial = new THREE.MeshPhysicalMaterial({
   color: 0x3498db, // Blue
   roughness: 0.5,
   metalness: 0.2,
   clearcoat: 0.3,
});
const box = new THREE.Mesh(boxGeometry, boxMaterial);
box.position.set(-1.5, 0.5, 0);
scene.add(box);

// Add a sphere geometry
const sphereGeometry = new THREE.SphereGeometry(0.75, 20, 60);
const sphereMaterial = new THREE.MeshPhysicalMaterial({
   color: 0xe74c3c, // Red
   roughness: 0.4,
   metalness: 0.3,
   // clearcoat: 0.2,
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.set(1.5, 0.75, 0);
scene.add(sphere);

// Add a ground plane
const planeGeometry = new THREE.PlaneGeometry(10, 10);
const planeMaterial = new THREE.MeshStandardMaterial({
   color: 0xffffff,
   roughness: 0.9,
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2;
plane.position.y = 0;
// scene.add(plane);

// Add studio lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 5);
directionalLight.castShadow = true;
scene.add(directionalLight);

const pointLight = new THREE.PointLight(0xffffff, 1, 50);
pointLight.position.set(0, 5, 5);
scene.add(pointLight);

// Handle window resize
window.addEventListener("resize", () => {
   renderer.setSize(window.innerWidth, window.innerHeight);
   camera.aspect = window.innerWidth / window.innerHeight;
   camera.updateProjectionMatrix();
});

// Add orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.minDistance = 2;
controls.maxDistance = 10;

// Render the scene
function animate() {
   requestAnimationFrame(animate);
   renderer.render(scene, camera);
   controls.update();
}
animate();
