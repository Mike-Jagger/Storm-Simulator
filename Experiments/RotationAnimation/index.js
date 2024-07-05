// Set up the scene, camera, renderer, and controls
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("render-container").appendChild(renderer.domElement);
camera.position.set(40, 40, 40); // Adjust camera position for better viewing

// Add OrbitControls for mouse interaction
const controls = new THREE.OrbitControls(camera, renderer.domElement);

// Add a directional light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(10, 20, 10);
scene.add(light);

// Variables for wind speed and direction
let windSpeed = 1;
let windDirection = 0;

// Load the house model
const objLoader = new THREE.OBJLoader();
objLoader.load('./models/House.obj', function (object) {
    object.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
            child.material = new THREE.MeshStandardMaterial({ color: 0x808080 }); // Assign color or texture
        }
    });
    object.scale.set(2, 2, 2);
    object.position.set(0, 0, 0);
    scene.add(object);
});

// Function to add a tree at a specific position
function addTree(position) {
    objLoader.load('./models/Tree.obj', function (object) {
        object.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
                child.material = new THREE.MeshStandardMaterial({ color: 0x00ff00 }); // Assign color or texture
            }
        });
        object.scale.set(0.025, 0.025, 0.025);
        object.rotation.x = -Math.PI / 2;
        object.position.set(position.x, position.y, position.z);
        scene.add(object);

        // Define the swaying animation for the tree using GSAP
        gsap.to(object.rotation, {
            duration: 2 / windSpeed, // Adjust duration based on wind speed
            x: 0.005 * windSpeed, // Adjust tilt based on wind speed
            y: 0.01 * windSpeed * Math.sin(windDirection * Math.PI / 180), // Adjust swaying amplitude based on wind direction
            z: 0.01 * windSpeed * Math.cos(windDirection * Math.PI / 180), // Adjust swaying amplitude based on wind direction
            yoyo: true,
            repeat: -1,
            ease: 'sine.inOut'
        });
    });
}

// Add multiple trees at different positions
const treePositions = [
    { x: 10, y: 0, z: 10 },
    { x: 10, y: 0, z: -10 },
    { x: -15, y: 0, z: 10 },
    { x: -15, y: 0, z: -10 }
];

treePositions.forEach(position => addTree(position));

// Update wind speed and direction based on slider values
document.getElementById('windSpeed').addEventListener('input', function() {
    windSpeed = parseFloat(this.value);
    updateTreeAnimations();
});

document.getElementById('windDirection').addEventListener('input', function() {
    windDirection = parseFloat(this.value);
    updateTreeAnimations();
});

// Function to update tree animations based on wind speed and direction
function updateTreeAnimations() {
    scene.traverse(function(object) {
        if (object instanceof THREE.Group) {
            gsap.to(object.rotation, {
                duration: 2 / windSpeed, // Adjust duration based on wind speed
                x: 0.005 * windSpeed, // Adjust tilt based on wind speed
                y: 0.01 * windSpeed * Math.sin(windDirection * Math.PI / 180), // Adjust swaying amplitude based on wind direction
                z: 0.01 * windSpeed * Math.cos(windDirection * Math.PI / 180), // Adjust swaying amplitude based on wind direction
                yoyo: true,
                repeat: -1,
                ease: 'sine.inOut'
            });
        }
    });
}

// Render loop
function animate() {
    requestAnimationFrame(animate);
    controls.update(); // Update controls
    renderer.render(scene, camera);
}
animate();