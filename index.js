import * as THREE from './libs/three.module.js'
import * as orbitControls from './libs/OrbitControls.js'

// global variables
let canvas, scene, camera, renderer;

// CREATE SCENE
 scene = new THREE.Scene();

// Resize the canvas
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,        
}

window.onresize = () =>{
    // to update the sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    // to update the camera
    camera.updateProjectionMatrix();
    camera.aspect = sizes.width / sizes.height;
    renderer.setSize(sizes.width, sizes.height);
    // console.log(sizes.width, sizes.height);
}

// arrow function loop
const loop = () => {
    renderer.render(scene, camera);
    window.requestAnimationFrame(loop);
}

// CREATE SHPERE => PACMAN
let radius = 4;
let width = 64;
let height = 64;
const geometryPacman = new THREE.SphereGeometry(radius, width, height);
const materialPacman = new THREE.MeshStandardMaterial( {color: '#ffff00'} )
const spherePacman = new THREE.Mesh(geometryPacman, materialPacman);
scene.add(spherePacman);


// ADD LIGHTS TO SCENE
let color = 0xFFFFFF;
let intensity = 1;
let distance = 100;

const light = new THREE.PointLight(color, intensity, distance);
// position of the lights

light.position.set(0, 0, 20);
scene.add(light);

// ADD THE CAMERA
let FOV = 45; //field of view of the camera
let near = 0.1;
let far = 100;
 camera = new THREE.PerspectiveCamera(FOV, sizes.width / sizes.height, near, far);
// set position for the camera
camera.position.z = 20; 
scene.add(camera);

// RENDER THE SCENE
 canvas = document.querySelector('#canvas');
 renderer = new THREE.WebGLRenderer({canvas});

//TO CONTROL THE CAMERA WITH ORBIT_CONTROLS
const controls = new orbitControls.OrbitControls(camera, canvas);

// SET THE SIZE FOR THE CANVAS
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);  


loop();