// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("render-container").appendChild(renderer.domElement);
camera.position.set(0, 0, 40);

// Add OrbitControls for mouse interaction
const controls = new THREE.OrbitControls(camera, renderer.domElement);

// Add a directional light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(10, 20, 10);
scene.add(light);

// Wind direction and speed variables
let windDirection = 0;
let windSpeed = 1;

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

    // Define the swaying animation for the tree based on wind direction and speed
    const updateTreeRotation = () => {
        const angle = windDirection * Math.PI / 180; // Convert wind direction to radians
        const sway = (1 * Math.sin(angle + 1)) + 0.01 * windSpeed; // Calculate swaying factor
        console.log((object.rotation.x * 180/Math.PI) + 90);

        // Stop any previous animation
        gsap.killTweensOf(object.rotation);

        // Apply new animation
        gsap.to(object.rotation, {
            duration: 2 / windSpeed, // Adjust duration based on wind speed
            x: (-Math.PI / 2), // Apply swaying to x-axis while keeping tree upright
            yoyo: true,
            repeat: -1,
            ease: 'sine.inOut'
        });
    };

    // Listen for wind speed changes
    document.getElementById('windSpeed').addEventListener('input', function() {
        windSpeed = parseFloat(this.value);
        windDirection = parseFloat(document.getElementById('windDirection').value);
        console.log("Speed", windDirection, windSpeed);
        updateTreeRotation();
    });

    // Listen for wind direction changes
    document.getElementById('windDirection').addEventListener('input', function() {
        windDirection = parseFloat(this.value);
        windSpeed = parseFloat(document.getElementById('windSpeed').value);
        console.log("Direction", windDirection, windSpeed);
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