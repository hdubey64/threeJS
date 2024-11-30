// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(
//    75, //fov
//    window.innerWidth / window.innerHeight, //aspect ratio
//    0.1, //near
//    100 //far
// );

// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({
//    color: 0x00ff00,
// });
// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

// camera.position.z = 5;
// const canvas = document.querySelector("canvas");

// const renderer = new THREE.WebGLRenderer({ canvas });
// renderer.setSize(window.innerWidth, window.innerHeight);

// function animate() {
//    window.requestAnimationFrame(animate);

//    cube.rotation.x += 0.01;
//    cube.rotation.y += 0.01;

//    renderer.render(scene, camera);
// }
// // renderer.setAnimationLoop(animate);

// animate();

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
   6,
   window.innerWidth / window.innerHeight,
   0.1,
   20
);

const geometry = new THREE.BoxGeometry(1, 1, 1, 6, 6, 6);
const material = new THREE.MeshBasicMaterial({ color: "red", wireframe: true });
const cube = new THREE.Mesh(geometry, material);

cube.scale.x = 3;
cube.scale.y = 2;
cube.scale.z = 6;
cube.rotation.y = 0.6;

// cube.position.x = 3;
// cube.position.y = 3;
// cube.position.z = -1.5;
camera.position.z = 7;

scene.add(cube);

const canvas = document.querySelector("canvas");
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

function animate() {
   window.requestAnimationFrame(animate);
   // cube.rotation.x += 0.01;
   cube.rotation.y += 0.001;
   // cube.rotation.z += 0.1;
   renderer.render(scene, camera);
}

animate();
