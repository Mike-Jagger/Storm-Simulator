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
const objLoader = new THREE.OBJLoader();
objLoader.load('./models/House.obj', function (object) {
    object.scale.set(0.5, 0.5, 0.5);
    object.position.set(0, 0, -5);
    scene.add(object);
});

// Load the tree model
objLoader.load('./models/Tree.obj', function (object) {
    object.scale.set(0.5, 0.5, 0.5);
    object.position.set(-2, 0, -5);
    scene.add(object);

    // Define the swaying animation for the tree using GSAP
    gsap.to(object.rotation, {
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