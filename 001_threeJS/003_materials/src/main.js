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

camera.position.z = 3;
// camera.position.y = 1.5;

const textureLoader = new THREE.TextureLoader();
let tex = textureLoader.load("/8k_earth_daymap.jpg");
tex.colorSpace = THREE.SRGBColorSpace;
let tex2 = textureLoader.load("/8k_earth_daymap.jpg");
tex2.colorSpace = THREE.SRGBColorSpace;
tex.colorSpace = THREE.SRGBColorSpace;

let light = new THREE.DirectionalLight("white", 3);
// light.position.set(1, -0.001, -0.9);
light.position.set(1, 1, 1);
// const helper = new THREE.DirectionalLightHelper(light, 10);
// scene.add(helper);
// scene.add(light);

// let light2 = new THREE.DirectionalLight("white", 1);
// light2.position.set(-1, -1, -1);
// scene.add(light2);
// const helper = new THREE.DirectionalLightHelper(light2, 1);
// scene.add(helper);

const geometry = new THREE.SphereGeometry(1, 250, 250);
const material = new THREE.MeshPhysicalMaterial({
   map: tex,
   // color: "white",
   // wireframe: true,
});
const geometry2 = new THREE.SphereGeometry(1.05, 250, 250);
const material2 = new THREE.MeshPhysicalMaterial({
   alphaMap: tex2,
   // color: "white",
   // wireframe: true,
});
material2.transparent = true;

// material.metalness = 1;
// material.roughness = 0.7;
// material.clearcoat = 0.2;

const mesh = new THREE.Mesh(geometry, material);
const mesh2 = new THREE.Mesh(geometry2, material2);
// mesh.rotation.y = 1;
scene.add(mesh);
scene.add(mesh2);

let hdri = new RGBELoader();
hdri.load(
   // "https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/2k/qwantani_dusk_1_2k.hdr",
   "https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/2k/rogland_sunset_2k.hdr",
   function (hdritexture) {
      hdritexture.mapping = THREE.EquirectangularReflectionMapping;
      scene.environment = hdritexture;
      // scene.background = hdritexture;
   }
);

const canvas = document.querySelector("canvas");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.01;

function animate() {
   window.requestAnimationFrame(animate);
   // mesh.rotation.x += 0.01;
   // mesh.rotation.y += 0.001;
   // mesh.rotation.z += 0.01;
   // light2.position.y += 0.001;
   mesh.rotation.y += 0.001;
   mesh2.rotation.y += 0.002;
   // light.position.z += 0.001;
   // light2.position.z += 0.001;

   controls.update();
   renderer.render(scene, camera);
}

animate();
