document.addEventListener("DOMContentLoaded", () => {
    const scene = new WebGLRenderingContext();
    const camera = new WebGLRenderingContext.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new WebGLRenderingContext.WebGLRenderer({ antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const controls = new WebGLRenderingContext.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    const light = new WebGLRenderingContext.DirectionalLight(0xffffff, 1);
    light.position.set(0, 1, 1).normalize();
    scene.add(light);

    camera.position.set(0, 1, 5);
    
    const loader = new WebGLRenderingContext.GLTFLoader();

    // Load tree model
    loader.load('./test_tree.glb', (gltf) => {
        const tree = gltf.scene;
        tree.position.set(0, 0, 0);
        scene.add(tree);

        // Load protection system model
        loader.load('./test_protection_system.glb', (gltf) => {
            const protectionSystem = gltf.scene;
            protectionSystem.position.set(2, 0, 0);
            scene.add(protectionSystem);

            // Load house model
            loader.load('./test_house.glb', (gltf) => {
                const house = gltf.scene;
                house.position.set(5, 0, 0);
                scene.add(house);

                // Start animation
                animate();
            });
        });
    });

    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }
});

document.addEventListener("DOMContentLoaded", () => {
    // Initialize scene, camera, renderer, controls, and light as before
    
    const loader = new WebGLRenderingContext.GLTFLoader();

    // Load models
    loader.load('./test_tree.glb', (gltf) => {
        const tree = gltf.scene;
        tree.position.set(0, 0, 0);
        scene.add(tree);

        loader.load('./test_protection_system.glb', (gltf) => {
            const protectionSystem = gltf.scene;
            protectionSystem.position.set(2, 0, 0);
            scene.add(protectionSystem);

            loader.load('./test_house.glb', (gltf) => {
                const house = gltf.scene;
                house.position.set(5, 0, 0);
                scene.add(house);

                // Start animation
                animate();

                // GSAP animation
                gsap.to(protectionSystem.position, {
                    x: 0,
                    z: 2,
                    duration: 5,
                    repeat: -1,
                    yoyo: true,
                    ease: "power1.inOut"
                });
            });
        });
    });

    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }
});