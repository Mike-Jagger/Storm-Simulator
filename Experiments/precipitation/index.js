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
let windSpeed = 0;
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
        object.rotation.x = -Math.PI / 2; // Rotate to make the tree stand upright
        object.position.set(position.x, position.y, position.z);
        scene.add(object);
    
        // Define the swaying animation for the tree based on wind direction and speed
        const updateTreeRotation = () => {
            let isPositiveX = false;
            if (windDirection >= 0 && windDirection < 90 || windDirection > 270 && windDirection <= 360) {
                isPositiveX = true;
            }
    
            let isPositiveY = false;
            if (windDirection > 0 && windDirection < 180) {
                isPositiveY = true;
            }
    
            let swayX = isPositiveX ? (windSpeed * 0.5) * (Math.PI / 180) : (-windSpeed * 0.5) * (Math.PI / 180);
            let swayY = isPositiveY ? (-windSpeed * 0.5) * (Math.PI / 180) : (windSpeed * 0.5) * (Math.PI / 180);
    
            if (windDirection === 0 || windDirection === 360 || windDirection === 180) {
                swayY = 0;
            }
            if (windDirection === 90 || windDirection === 270) {
                swayX = 0;
            }
    
            swayX = swayX === -0 ? 0 : swayX;
            swayY = swayY === -0 ? 0 : swayY;
    
            // console.log("Angle:", (object.rotation.x * 180/Math.PI) + 90, "swayX:",swayX);
            // console.log("Angle:", (object.rotation.y * 180/Math.PI), "swayY:",swayY);
    
            object.rotation.y = 0;
            object.rotation.x = -Math.PI / 2;
    
            // const angle = windDirection * Math.PI / 180; // Convert wind direction to radians
            // const sway = (1 * Math.sin(angle + 1)) + 0.01 * windSpeed; // Calculate swaying factor
    
            // Stop any previous animation
            gsap.killTweensOf(object.rotation);
    
            // Apply new animation
            gsap.to(object.rotation, {
                duration: 20 / windSpeed, // Adjust duration based on wind speed
                x: (-Math.PI / 2) + swayX, // Apply swaying to x-axis while keeping tree upright
                y: "+=" + swayY,
                yoyo: true,
                repeat: -1,
                ease: 'sine.inOut'
            });
        };
    
        // Listen for wind speed changes
        document.getElementById('windSpeed').addEventListener('input', function() {
            windSpeed = parseFloat(this.value);
            windDirection = parseFloat(document.getElementById('windDirection').value);
            // console.log("Speed", windDirection, windSpeed);
            updateTreeRotation();
        });
    
        // Listen for wind direction changes
        document.getElementById('windDirection').addEventListener('input', function() {
            windDirection = parseFloat(this.value);
            windSpeed = parseFloat(document.getElementById('windSpeed').value);
            // console.log("Direction", windDirection, windSpeed);
            updateTreeRotation();
        });
    
        // Initial update
        updateTreeRotation();
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

// Render loop
function animate() {
    requestAnimationFrame(animate);
    controls.update(); // Update controls
    renderer.render(scene, camera);
}
animate();