// import * as THREE from "three";
// import { OrbitControls } from "three/addons/controls/OrbitControls.js";
// import GUI from "lil-gui";

// import { RGBELoader } from "three/addons/loaders/RGBELoader.js";

// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(
//    75,
//    window.innerWidth / window.innerHeight,
//    0.1,
//    100
// );

// camera.position.z = 6;

// const textureLoader = new THREE.TextureLoader();

// const geometry = new THREE.BoxGeometry(1, 2, 3);
// const material = new THREE.MeshBasicMaterial({
//    color: "red",
// });
// const mesh = new THREE.Mesh(geometry, material);
// // mesh.rotation.y = 1;
// // mesh.lookAt(new THREE.Vector3(-1, 1, 1));

// scene.add(mesh);

// const canvas = document.querySelector("canvas");
// const renderer = new THREE.WebGLRenderer({ canvas });
// renderer.setSize(window.innerWidth, window.innerHeight);
// // NOTE: For Device Pixcel Ratio
// renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// const controls = new OrbitControls(camera, renderer.domElement);
// controls.enableDamping = true;

// controls.minAzimuthAngle = -Math.PI / 4; //NOTE: Hundling Leftside min Rotation
// controls.maxAzimuthAngle = Math.PI / 4; //NOTE: Hundling Rightside max Rotation

// controls.minPolarAngle = Math.PI / 4; //NOTE: Hundling Bottom min Rotation
// controls.maxPolarAngle = Math.PI / 1.25; //NOTE: Hundling Upper min Rotation

// controls.minDistance = 3; //NOTE: Hundling min  Zoom out
// controls.maxDistance = 10; //NOTE: Hundling max  Zoom in

// const gui = new GUI();

// const myObject = {
//    myBoolean: true,
//    myFunction: function () {},
//    myString: "lil-gui",
//    myNumber: 1,
// };

// gui.add(myObject, "myBoolean"); // Checkbox
// gui.add(myObject, "myFunction"); // Button
// gui.add(myObject, "myString"); // Text Field
// gui.add(myObject, "myNumber"); // Number Field

// // NOTE: For Responsive
// window.addEventListener("resize", function (e) {
//    camera.aspect = window.innerWidth / window.innerHeight;
//    renderer.setSize(window.innerWidth, window.innerHeight);
//    camera.updateProjectionMatrix();
// });

// function animate() {
//    window.requestAnimationFrame(animate);
//    controls.update();
//    // mesh.lookAt(new THREE.Vector3(mouse.x - 0.5, -mouse.y + 0.5, 1));
//    renderer.render(scene, camera);
// }
// animate();

// Import Three.js and lil-gui
import * as THREE from "three";
import { GUI } from "lil-gui";

// Scene, Camera, Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
   75,
   window.innerWidth / window.innerHeight,
   0.1,
   1000
);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a Cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Position the camera
camera.position.z = 5;

// Add GUI Controls
const gui = new GUI();
const params = {
   width: 1,
   height: 1,
   depth: 1,
   color: 0x00ff00,
   rotationY: 0,
   rotationX: 0,
   rotationZ: 0,
};

// Update Cube Dimensions
gui.add(params, "width", 0.1, 5).onChange((value) => {
   cube.scale.x = value;
});
gui.add(params, "height", 0.1, 5).onChange((value) => {
   cube.scale.y = value;
});
gui.add(params, "depth", 0.1, 5).onChange((value) => {
   cube.scale.z = value;
});
gui.add(params, "rotationY", -Math.PI, Math.PI).onChange((value) => {
   cube.rotation.y = value;
});
gui.add(params, "rotationX", -Math.PI, Math.PI).onChange((value) => {
   cube.rotation.x = value;
});
gui.add(params, "rotationZ", -Math.PI, Math.PI).onChange((value) => {
   cube.rotation.z = value;
});

// Update Cube Color
gui.addColor(params, "color").onChange((value) => {
   cube.material.color.set(value);
});

// Animation Loop
function animate() {
   requestAnimationFrame(animate);
   renderer.render(scene, camera);
}

animate();
