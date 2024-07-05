import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { gsap } from 'gsap';

// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
camera.position.z = 10;

// Add a directional light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(10, 20, 10);
scene.add(light);

// Load the house model
const loader = new GLTFLoader();
loader.load('path/to/house_model.gltf', function (gltf) {
    const house = gltf.scene;
    house.scale.set(0.5, 0.5, 0.5);
    house.position.set(0, 0, -5);
    scene.add(house);
});

// Load the tree model
loader.load('path/to/tree_model.gltf', function (gltf) {
    const tree = gltf.scene;
    tree.scale.set(0.5, 0.5, 0.5);
    tree.position.set(-2, 0, -5);
    scene.add(tree);

    // Define the swaying animation for the tree using GSAP
    gsap.to(tree.rotation, {
        duration: 2,
        x: 0.05,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut'
    });
});

// Render loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();