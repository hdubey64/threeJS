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

const controls = new OrbitControls(camera, renderer.domElement);
const mouse = {
   x: 0,
   y: 0,
};

window.addEventListener("mousemove", function (e) {
   mouse.x = e.clientX / window.innerWidth;
   mouse.y = e.clientY / window.innerHeight;
   // console.log(e.clientX / window.innerWidth, e.clientY / window.innerHeight);
});

function animate() {
   window.requestAnimationFrame(animate);
   controls.update();
   mesh.lookAt(new THREE.Vector3(mouse.x - 0.5, -mouse.y + 0.5, 1));
   renderer.render(scene, camera);
}

animate();
