import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";

// Create scene
const scene = new THREE.Scene();

// Create camera
const camera = new THREE.PerspectiveCamera(
   75,
   window.innerWidth / window.innerHeight,
   0.1,
   1000
);
camera.position.set(0, 1, 7);
camera.lookAt(1, 1, 1);

// Create renderer
const canvas = document.querySelector("canvas");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;
renderer.outputEncoding = THREE.sRGBEncoding;

// Load HDRI environment map
const rgbeLoader = new RGBELoader();
rgbeLoader.load(
   "https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/2k/rogland_sunset_2k.hdr",
   function (texture) {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      // scene.background = texture;
      scene.environment = texture;
   }
);

// 3d Model
const loader = new GLTFLoader();
loader.load(
   // resource URL
   "../public/glock_17.glb",
   // called when the resource is loaded
   function (gltf) {
      scene.add(gltf.scene);
   }
);

// Add orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.minDistance = 2;
controls.maxDistance = 10;

// Handle window resize
window.addEventListener("resize", () => {
   renderer.setSize(window.innerWidth, window.innerHeight);
   camera.aspect = window.innerWidth / window.innerHeight;
   camera.updateProjectionMatrix();
});

// Animation loop
function animate() {
   requestAnimationFrame(animate);
   controls.update();
   renderer.render(scene, camera);
}

animate();
