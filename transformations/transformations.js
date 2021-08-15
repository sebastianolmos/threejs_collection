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
    const aspect = 1;  // the canvas default
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

    // Create solid cubes
    const cubeGeometry = new THREE.BoxGeometry(0.6, 0.6, 0.6);
    const cubeMaterial1 = new THREE.MeshPhongMaterial({color: 0x4422ff});  // greenish blue
    const cube1 = new THREE.Mesh(cubeGeometry, cubeMaterial1);
    const cubeMaterial2 = new THREE.MeshPhongMaterial({color: 0xff6600});  // greenish blue
    const cube2 = new THREE.Mesh(cubeGeometry, cubeMaterial2);
    const cubeMaterial3 = new THREE.MeshPhongMaterial({color: 0x44ff00});  // greenish blue
    const cube3 = new THREE.Mesh(cubeGeometry, cubeMaterial3);
    const cubeMaterial4 = new THREE.MeshPhongMaterial({color: 0x0066ff});  // greenish blue
    const cube4 = new THREE.Mesh(cubeGeometry, cubeMaterial4);
    // Add to their scene
    scene.add(cube1);
    scene.add(cube2);
    scene.add(cube3);
    scene.add(cube4);

    // Create wireframe cubes
    const cubeWireframe = new THREE.WireframeGeometry( cubeGeometry );
    const cubeLine1 = new THREE.LineSegments( cubeWireframe );
    cubeLine1.material.depthTest = false;
    cubeLine1.material.opacity = 1.0;
    cubeLine1.material.transparent = true;
    cubeLine1.material.color = new THREE.Color( 0x4422ff );
    const cubeLine2 = new THREE.LineSegments( cubeWireframe );
    cubeLine2.material.depthTest = false;
    cubeLine2.material.opacity = 1.0;
    cubeLine2.material.transparent = true;
    cubeLine2.material.color = new THREE.Color( 0xff6600 );
    const cubeLine3 = new THREE.LineSegments( cubeWireframe );
    cubeLine3.material.depthTest = false;
    cubeLine3.material.opacity = 1.0;
    cubeLine3.material.transparent = true;
    cubeLine3.material.color = new THREE.Color( 0x44ff00 );
    const cubeLine4 = new THREE.LineSegments( cubeWireframe );
    cubeLine4.material.depthTest = false;
    cubeLine4.material.opacity = 1.0;
    cubeLine4.material.transparent = true;
    cubeLine4.material.color = new THREE.Color( 0x0066ff );
    // Set positions
    lineScene.add(cubeLine1) ;
    lineScene.add(cubeLine2) ;
    lineScene.add(cubeLine3) ;
    lineScene.add(cubeLine4) ;

    // Render function
    function render(time) {
        time *= 0.001;  // convert time to seconds

        // Transformation 1
        cube1.position.x = -0.7;
        cube1.position.y = 0.7;
        cube1.rotation.x = time;
        cube1.rotation.y = time;
        cubeLine1.position.x = -0.7;
        cubeLine1.position.y = 0.7;
        cubeLine1.rotation.x = time;
        cubeLine1.rotation.y = time;

        // Transformation 2
        cube2.position.x = 0.7;
        cube2.position.y = 0.7;
        cube2.scale.x = 0.4 * Math.sin(time) +1.0;
        cube2.scale.y = 0.4 * Math.sin(time) +1.0;
        cube2.scale.z = 0.4 * Math.sin(time) +1.0;

        cubeLine2.position.x = 0.7;
        cubeLine2.position.y = 0.7;
        cubeLine2.scale.x = 0.4 * Math.sin(time) +1.0;
        cubeLine2.scale.y = 0.4 * Math.sin(time) +1.0;
        cubeLine2.scale.z = 0.4 * Math.sin(time) +1.0;

        // Transformation 3
        cube3.position.x = 0.7;
        cube3.position.y = -0.7;
        cube3.translate(0.25*Math.sin(time), new THREE.Vector3(1, 1, 0.00));

        cubeLine3.position.x = 0.7;
        cubeLine3.position.y = -0.7;
        cubeLine3.translate(0.25*Math.sin(time), new THREE.Vector3(1, 1, 0.00));

        // Transformation 4
        cube4.position.x = -0.7;
        cube4.position.y = -0.7;
        cube4.scale.x = 0.4 * Math.cos(time) +1.0;
        cube4.scale.y = 0.4 * Math.sin(time) +1.0;
        cube4.scale.z = 0.4 * Math.cos(time) +1.0;

        cubeLine4.position.x = -0.7;
        cubeLine4.position.y = -0.7;
        cubeLine4.scale.x = 0.4 * Math.cos(time) +1.0;
        cubeLine4.scale.y = 0.4 * Math.sin(time) +1.0;
        cubeLine4.scale.z = 0.4 * Math.cos(time) +1.0;

        drawInMode();

        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);

    // Helper function to draw in the correct mode
    function drawInMode(){
        if (triangleMode){
            // Draw the Shape with Triangle mode
            renderer.render(scene, camera);
        }
        else {
            // Draw the Shape with Line mode
            renderer.render(lineScene, camera);
        }
    }
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