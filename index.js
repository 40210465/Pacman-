import * as THREE from './libs/three.module.js'
import * as OrbitControls from './libs/OrbitControls.js'

// global variables
let canvas, scene, camera, renderer;

// CREATE SCENE
 scene = new THREE.Scene();

// Object for the size of the window
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,        
}

// Resize the canvas
window.onresize = () =>{
    // to update the sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    // to update the camera projection 
    camera.updateProjectionMatrix();
    camera.aspect = sizes.width / sizes.height;
    renderer.setSize(sizes.width, sizes.height);
    // console.log(sizes.width, sizes.height);
}

// arrow function loop to rezise
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
let FOV = 100; //field of view of the camera
let aspectRatio = sizes.width / sizes.height;
let near = 0.1;
let far = 100;
 camera = new THREE.PerspectiveCamera(FOV, aspectRatio , near, far);
// set position for the camera
camera.position.z = 20; 
scene.add(camera);

// RENDER THE SCENE
 canvas = document.querySelector('#canvas');
 renderer = new THREE.WebGLRenderer({canvas});

//TO CONTROL THE CAMERA WITH ORBIT_CONTROLS
const controls = new OrbitControls.OrbitControls(camera, canvas);

// SET THE SIZE FOR THE CANVAS
let renderWidth = sizes.width;
let renderHeigth = sizes.height;
renderer.setSize(renderWidth, renderHeigth);
renderer.render(scene, camera);  

// AXES HELPER
let size = 45;
const axesHelper = new THREE.AxesHelper( size );
// scene.add( axesHelper );

// BODY
// B = Body
let Bradius = 8;
let Bwidth = 32;
let Bheight = 32;
let BphiStart = 0;
let BphiLength = Math.PI * 2;
let BthetaStart = 0;
let BthetaLength = Math.PI / 2;

const headGeometry = new THREE.SphereGeometry(Bradius, Bwidth, Bheight, BphiStart, BphiLength, BthetaStart, BthetaLength);
const headMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });                 
const head1 = new THREE.Mesh(headGeometry, headMaterial);
head1.position.set(-0, 5, -5)
scene.add(head1);

const headGeometry2 = new THREE.SphereGeometry(Bradius, Bwidth, Bheight, BphiStart, BphiLength, BthetaStart, BthetaLength);
const head2 = new THREE.Mesh(headGeometry2, headMaterial);
head2.position.set(-0, 5, -5)
head2.rotation.x = Math.PI / true;
scene.add(head2);
head1.rotateX(THREE.Math.degToRad(-15));
head2.rotateX(THREE.Math.degToRad(25));

// MOUTH
let Mradius = 8;
let Mwidth = 32;
let Mheight = 32;
let MphiStart = 0;
let MphiLength = Math.PI * 2;
let MthetaStart = 0;
let MthetaLength = Math.PI / 2;

const mouthGeometry = new THREE.SphereGeometry(Mradius, Mwidth, Mheight, MphiStart, MphiLength, MthetaStart, MthetaLength);
const mouthMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const mouth = new THREE.Mesh(mouthGeometry, mouthMaterial);
mouth.position.set(-0, 5, -5);
mouth.rotation.x = Math.PI / true;
scene.add(mouth);
mouth.rotateX(THREE.Math.degToRad(-5));

// EYES
let Eyeradius = 1;
let Eyewidth = 12;
let Eyeheight = 12;

// LEFT EYE
const EyeGeometry = new THREE.SphereGeometry(Eyeradius, Eyewidth, Eyeheight);
const EyeMaterial = new THREE.MeshBasicMaterial({color: 0x0000 });
const leftEye = new THREE.Mesh(EyeGeometry, EyeMaterial);
leftEye.position.set(-2, 9, 1);
scene.add(leftEye)
// leftEye.add(axesHelper)


// RIGHT EYE
const rightEye = new THREE.Mesh(EyeGeometry, EyeMaterial);
rightEye.position.set(2, 9, 1);
scene.add(rightEye)

function animate() {

    requestAnimationFrame(animate)

    mouth.rotation.x -= 0.05;

    renderer.render(scene, camera);
}

animate();
loop();