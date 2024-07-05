// Set up the scene, camera, renderer, and controls
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
camera.position.z = 40;
camera.position.y = 40;

// Add OrbitControls for mouse interaction
const controls = new THREE.OrbitControls(camera, renderer.domElement);

// Add a directional light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(10, 20, 10);
scene.add(light);

// Load the house model
const objLoader = new THREE.OBJLoader();
objLoader.load('./House.obj', function (object) {
    object.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
            child.material = new THREE.MeshStandardMaterial({ color: 0x808080 }); // Assign color or texture
        }
    });
    object.scale.set(2, 2, 2);
    object.position.set(0, 0, 0);
    scene.add(object);
});

// Load the tree model
objLoader.load('./Tree.obj', function (object) {
    object.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
            child.material = new THREE.MeshStandardMaterial({ color: 0x00ff00 }); // Assign color or texture
        }
    });
    object.scale.set(0.025, 0.025, 0.025);
    object.rotation.x = -Math.PI / 2;
    object.position.set(10, 0, 10);
    scene.add(object);

    // Define the swaying animation for the tree using GSAP
    gsap.to(object.rotation, {
        duration: 2,
        x: -1.5,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut'
    });
});

objLoader.load('./Tree.obj', function (object) {
    object.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
            child.material = new THREE.MeshStandardMaterial({ color: 0x00ff00 }); // Assign color or texture
        }
    });
    object.scale.set(0.025, 0.025, 0.025);
    object.rotation.x = -Math.PI / 2;
    object.position.set(10, 0, -10);
    scene.add(object);

    // Define the swaying animation for the tree using GSAP
    gsap.to(object.rotation, {
        duration: 2,
        x: -1.5,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut'
    });
});

objLoader.load('./Tree.obj', function (object) {
    object.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
            child.material = new THREE.MeshStandardMaterial({ color: 0x00ff00 }); // Assign color or texture
        }
    });
    object.scale.set(0.025, 0.025, 0.025);
    object.rotation.x = -Math.PI / 2;
    object.position.set(-15, 0, 10);
    scene.add(object);

    // Define the swaying animation for the tree using GSAP
    gsap.to(object.rotation, {
        duration: 2,
        x: -1.5,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut'
    });
});

objLoader.load('./Tree.obj', function (object) {
    object.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
            child.material = new THREE.MeshStandardMaterial({ color: 0x00ff00 }); // Assign color or texture
        }
    });
    object.scale.set(0.025, 0.025, 0.025);
    object.rotation.x = -Math.PI / 2;
    object.position.set(-15, 0, -10);
    scene.add(object);

    // Define the swaying animation for the tree using GSAP
    gsap.to(object.rotation, {
        duration: 2,
        x: -1.5,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut'
    });
});

// Render loop
function animate() {
    requestAnimationFrame(animate);
    controls.update(); // Update controls
    renderer.render(scene, camera);
}
animate();