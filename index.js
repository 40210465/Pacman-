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

// ADD LIGHTS TO SCENE WITH FOR NO BASIC MATERIAL (meshBasicMaterial)
// let color = 0xFFFFFF;
// let intensity = 1;
// let distance = 100;

// const light = new THREE.PointLight(color, intensity, distance);

// // position of the lights
// light.position.set(0, 0, 20);
// scene.add(light);

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
let size = 10;
const axesHelper = new THREE.AxesHelper( size );
// scene.add( axesHelper );

// -----------------------------------PACMAN------------------------------------------

// -----------------------------------------------BODY -------------------------------
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

// -------------------------------------------------BRAIN -------------------------------
// BRA = BRAIN
let BRAradius = 7.91;
let BRAwidth = 32;
let BRAheight = 32;
let BRAphiStart = 0;
let BRAphiLength = Math.PI ;
let BRAthetaStart = 0;
let BRAthetaLength = Math.PI;

const brainGeometry = new THREE.SphereGeometry(BRAradius, BRAwidth, BRAheight, BRAphiStart, BRAphiLength, BRAthetaStart, BRAthetaLength)
const brainMaterial = new THREE.MeshBasicMaterial( {color: 0x0000} );
const brain = new THREE.Mesh(brainGeometry, brainMaterial);
brain.position.x = -0;
brain.position.y = 5;
brain.position.z = -5;
scene.add(brain)

// ---------------------------------------MOUTH-------------------------------------------
// M = Mouth
let Mradius = 8;
let Mwidth = 32;
let Mheight = 32;
let MphiStart = 0;
let MphiLength = Math.PI * 2 ;
let MthetaStart = 0;
let MthetaLength = Math.PI / 2 ;

const mouthGeometry = new THREE.SphereGeometry(Mradius, Mwidth, Mheight, MphiStart, MphiLength, MthetaStart, MthetaLength);
const mouthMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const mouth = new THREE.Mesh(mouthGeometry, mouthMaterial);
mouth.position.set(-0, 5, -5);
// to rotate/invert the semi-sphere  to create the ilusion of the mouth of the pacman
mouth.rotation.x = Math.PI / true;
scene.add(mouth);
mouth.rotateX(THREE.Math.degToRad(-5));
//mouth.add(axesHelper)

//----------------------------------------------- EYES SECTION -------------------------
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

// ------------------------------------------ARMS SECTION --------------------------------------------------------------
// -------------------------------------------------LEFT SHOULDER----------------------
// GEOMETRY LEFT ARM
const leftShoulderGeometry = new THREE.BoxGeometry(6, 2.4, 2.8);
const leftShoulderSphereGeometry = new THREE.SphereGeometry(1, 12, 12);

// variales for the parameters for the cylinder of the forearm
// FA - FOREARM
let FAradiusTop = 0.53;
let FAradiusBottom = 0.87;
let FAheight = 12.642;
let FAradialSegments = 44;
let FAheightSegments = 25;
let FAthetaStart = 0;
let FAthetaLength = 6.28;

const leftForeArmGeometry = new THREE.CylinderGeometry(
    FAradiusTop, FAradiusBottom, FAheight, FAradialSegments, FAheightSegments,
    FAthetaStart, FAthetaLength
);

// MATERIAL LEFT ARM
const leftShoulderMaterial = new THREE.MeshBasicMaterial({color: 0xffff00 });
const leftShoulderSphereMaterial = new THREE.MeshBasicMaterial({color: 0xff0000});
const leftForeArmMaterial = new THREE.MeshBasicMaterial({color: 0x8b7704});

// mesh left shoulder
const leftShoulder = new THREE.Mesh(leftShoulderGeometry, leftShoulderMaterial);
leftShoulder.position.set(-7, 7, -5);
scene.add(leftShoulder);

// add pivot inside the shoulder
const leftShoulderPivot = new THREE.Object3D();
leftShoulderPivot.position.set(-1, 0, 0);
leftShoulder.add(leftShoulderPivot);
// leftShoulderPivot.add(axesHelper)

//shpere for the shoulder 
const leftShoulderSphere = new THREE.Mesh(leftShoulderSphereGeometry, leftShoulderSphereMaterial);
scene.add(leftShoulderSphere);
leftShoulderPivot.add(leftShoulderSphere)
// leftShoulderSphere.add(axesHelper)

// add pivot to connect the shpere with the left forearm
const leftForeArmPivot = new THREE.Object3D();
leftForeArmPivot.position.x = 0;
leftForeArmPivot.position.y = 0;
leftForeArmPivot.rotation.x = 0;
leftShoulderSphere.add(leftForeArmPivot);
// leftForeArmPivot.add(axesHelper);

//mesh left forearm
const leftForeArm = new THREE.Mesh(leftForeArmGeometry, leftForeArmMaterial); 
leftForeArm.position.z = 5.35;
leftForeArmPivot.add(leftForeArm);
// to rotate the cylinder form for the left foreArm on x axis
leftForeArm.rotation.x = 1.55;

// ------------------------------------------------------------------------------------
//--------------------------------------- ANIMATION SECTION----------------------------
// velocity of the movement of the arm
let VelocityMovement = 0.01;
// rotation forms
leftShoulder.rotation.x = 1.55;
leftShoulderSphere.rotation.x = 3.17;
// rotation pivots
leftShoulderPivot.rotation.x = 0;
leftShoulderPivot.rotation.x = 1.55;

// to animate the left shoulder
let animateLeftArm = () => {
    if (leftShoulderSphere.rotation.x < 1.55 || leftShoulderSphere.rotation.x > 3.17) {
// to control the rotation
    VelocityMovement = VelocityMovement * -1
    };
    // rotation of the left shoulder on x axis
    leftShoulderSphere.rotation.x += VelocityMovement;
}

let animate = () => {
    requestAnimationFrame(animate)

    animateLeftArm()

    // mouth.rotation.x -= 0.05;

    renderer.render(scene, camera);
}

animate();
loop();