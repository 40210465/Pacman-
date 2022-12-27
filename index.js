import * as THREE from './libs/three.module.js'
import * as orbitControls from './libs/OrbitControls.js'

// global variables
let canvas, scene, camera, renderer;

// CREATE SCENE
 scene = new THREE.Scene();

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,        
}

// Resize the canvas
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


// PACMAN BODY
const bodyGeometry = new THREE.CylinderGeometry(0.5, 0.5, 0.5, 32);
const bodyMaterial = new THREE.MeshBasicMaterial({ color: 0xffd700 });
const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
scene.add(body)

// PACMAN EYES
// LEFT EYE
const eyeGeometry = new THREE.SphereGeometry(0.2, 32, 32);
const eyeMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
leftEye.position.set(-0.15, 0.15, 0.25);
scene.add(leftEye)

const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
rightEye.position.set(0.15, 0.15, 0.25);
scene.add(rightEye)


// MOUTH
const mouthGeometry = new THREE.RingGeometry(0.55, 0.45, 32);
const mouthMaterial = new THREE.MeshBasicMaterial({color: 0x000000});
const mouth = new THREE.Mesh(mouthGeometry, mouthMaterial);
mouth.rotation.x = Math.PI / 2;
scene.add(mouth);

let angle = 0;

function updatePacman() {
    // Update the angle of Pac-Man
    angle += 0.01;
  
    // Update the position of Pac-Man's eyes to follow the mouse
    leftEye.position.x = -0.15 + Math.sin(angle) * 0.1;
    leftEye.position.y = 0.15 + Math.cos(angle) * 0.1;
    rightEye.position.x = 0.15 + Math.sin(angle) * 0.1;
    rightEye.position.y = 0.15 + Math.cos(angle) * 0.1;
  
    // Animate the mouth of Pac-Man
    mouth.scale.y = Math.sin(angle) + 1.5;
  }
  

// Call the updatePacman function on each frame
function animate() {
    requestAnimationFrame(animate);
    updatePacman();
  }
  animate();


loop();