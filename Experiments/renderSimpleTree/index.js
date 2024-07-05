// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("render-container").appendChild(renderer.domElement);
camera.position.set(40, 40, 40);

// Add OrbitControls for mouse interaction
const controls = new THREE.OrbitControls(camera, renderer.domElement);

// Add a directional light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(10, 20, 10);
scene.add(light);

// Wind direction variable
let windDirection = 0;

// Load the tree model
const objLoader = new THREE.OBJLoader();
objLoader.load('./models/Tree.obj', function (object) {
    object.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
            child.material = new THREE.MeshStandardMaterial({ color: 0x00ff00 }); // Assign color or texture
        }
    });
    object.scale.set(0.025, 0.025, 0.025);
    object.rotation.x = -Math.PI / 2; // Rotate to make the tree stand upright
    object.position.set(0, 0, 0);
    scene.add(object);

    // Define the swaying animation for the tree based on wind direction
    const updateTreeRotation = () => {
        const angle = windDirection * Math.PI / 180; // Convert wind direction to radians
        object.rotation.x = -Math.PI / 2 + 0.1 * Math.sin(angle); // Adjust x rotation based on wind direction
    };

    // Listen for wind direction changes
    document.getElementById('windDirection').addEventListener('input', function() {
        windDirection = parseFloat(this.value);
        updateTreeRotation();
    });

    // Initial update
    updateTreeRotation();
});

// Render loop
function animate() {
    requestAnimationFrame(animate);
    controls.update(); // Update controls
    renderer.render(scene, camera);
}
animate();