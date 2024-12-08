import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RGBELoader } from "three/addons/loaders/RGBELoader.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
   75,
   window.innerWidth / window.innerHeight,
   0.1,
   100
);

camera.position.z = 6;

const textureLoader = new THREE.TextureLoader();

const geometry = new THREE.BoxGeometry(1, 2, 3);
const material = new THREE.MeshBasicMaterial({
   color: "red",
});
const mesh = new THREE.Mesh(geometry, material);
// mesh.rotation.y = 1;
// mesh.lookAt(new THREE.Vector3(-1, 1, 1));

scene.add(mesh);

const canvas = document.querySelector("canvas");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
// NOTE: For Device Pixcel Ratio
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

controls.minAzimuthAngle = -Math.PI / 4; //NOTE: Hundling Leftside min Rotation
controls.maxAzimuthAngle = Math.PI / 4; //NOTE: Hundling Rightside max Rotation

controls.minPolarAngle = Math.PI / 4; //NOTE: Hundling Bottom min Rotation
controls.maxPolarAngle = Math.PI / 1.25; //NOTE: Hundling Upper min Rotation

controls.minDistance = 3; //NOTE: Hundling min  Zoom out
controls.maxDistance = 10; //NOTE: Hundling max  Zoom in

// // NOTE: For Look at
// const mouse = {
//    x: 0,
//    y: 0,
// };

// // NOTE: For Look at Function Update
// window.addEventListener("mousemove", function (e) {
//    mouse.x = e.clientX / window.innerWidth;
//    mouse.y = e.clientY / window.innerHeight;
//    // console.log(e.clientX / window.innerWidth, e.clientY / window.innerHeight);
// });

// NOTE: For Responsive
window.addEventListener("resize", function (e) {
   camera.aspect = window.innerWidth / window.innerHeight;
   renderer.setSize(window.innerWidth, window.innerHeight);
   camera.updateProjectionMatrix();
});

function animate() {
   window.requestAnimationFrame(animate);
   controls.update();
   // mesh.lookAt(new THREE.Vector3(mouse.x - 0.5, -mouse.y + 0.5, 1));
   renderer.render(scene, camera);
}
animate();
