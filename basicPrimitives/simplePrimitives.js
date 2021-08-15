import * as THREE from '../resources/threejs/three.module.js';

// global variables
let triangleMode = true;

function main() {
    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({canvas});

    // Connect inputs
    document.addEventListener('keydown', onKeyDown, false);
    document.addEventListener('keyup', onKeyUp, false);
    // Connect Button
    document.getElementById('drawMode').onclick = toggleDrawMode;

    // Create the Camera
    const fov = 60;
    const aspect = 2;  // the canvas default
    const near = 0.1;
    const far = 5;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 2.5;

    // Create Scenes for both draw mode
    const scene = new THREE.Scene();
    const lineScene = new THREE.Scene();

    // Create Directional Light
    {
        const color = 0xFFFFFF;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        const ambient = new THREE.AmbientLight(color, 0.2);
        light.position.set(0, 0, 3);
        scene.add(light);
        scene.add(ambient);
    }

    // Create solid cube and sphere
    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    const cubeMaterial = new THREE.MeshPhongMaterial({color: 0x4422ff});  // greenish blue
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    const sphereGeometry = new THREE.SphereGeometry(0.7, 16, 16, 0,
        Math.PI * 2.00, 0, Math.PI)
    const sphereMaterial = new THREE.MeshPhongMaterial({color: 0xff6600});
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    // Set positions
    cube.position.x = -1.2;
    sphere.position.x = 1.2;
    // Add to their scene
    scene.add(cube);
    scene.add(sphere);

    // Create wireframe cube and sphere
    const cubeWireframe = new THREE.WireframeGeometry( cubeGeometry );
    const cubeLine = new THREE.LineSegments( cubeWireframe );
    cubeLine.material.depthTest = false;
    cubeLine.material.opacity = 1.0;
    cubeLine.material.transparent = true;
    cubeLine.material.color = new THREE.Color( 0x4422ff );
    const sphereWireframe = new THREE.WireframeGeometry( sphereGeometry );
    const sphereLine = new THREE.LineSegments( sphereWireframe );
    sphereLine.material.depthTest = false;
    sphereLine.material.opacity = 1.0;
    sphereLine.material.transparent = true;
    sphereLine.material.color = new THREE.Color( 0xff6600 );
    // Set positions
    lineScene.add(cubeLine) ;
    lineScene.add( sphereLine );
    // Add to their scene
    cubeLine.position.x = -1.2;
    sphereLine.position.x = 1.2;

    // Render function
    function render(time) {
        time *= 0.001;  // convert time to seconds

        if (triangleMode){
            // Draw the Shape with Triangle mode
            renderer.render(scene, camera);
        }
        else {
            // Draw the Shape with Line mode
            renderer.render(lineScene, camera);
        }

        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}

// Inputs
function onKeyDown(event)
{
    if (event.key === ' ')
    {
        triangleMode = false;
    }
}

function onKeyUp(event)
{
    if (event.key === ' ')
    {
        triangleMode = true;
    }
}

function toggleDrawMode()
{
    triangleMode = !triangleMode;
}

main();
