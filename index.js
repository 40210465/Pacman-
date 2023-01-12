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
let far = 500;
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

// -------------------------------------------------LEFT ARM SECTION------------------------------------
// GEOMETRY LEFT ARM
const leftArmGeometry = new THREE.BoxGeometry(6, 2.4, 2.8);
const leftShoulderSphereGeometry = new THREE.SphereGeometry(1, 12, 12);

// variales for the parameters for the cylinder of the forearm
// FA - ------------------------------ LEFT FOREARM GEOMETRY-----------------------
let FAradiusTop = 0.53;
let FAradiusBottom = 0.87;
let FAheight = 6;
let FAradialSegments = 44;
let FAheightSegments = 25;
let FAthetaStart = 0;
let FAthetaLength = 6.28;

const leftForeArmGeometry = new THREE.CylinderGeometry(
    FAradiusTop, FAradiusBottom, FAheight, FAradialSegments, FAheightSegments,
    FAthetaStart, FAthetaLength
);

// ----------------------------------GEOMETRY LEFT HAND--------------
const leftHandGeometry = new THREE.BoxGeometry(2, 1.8, 1);

// -----------------------GEOMETRY LEFT FINGERS HAND-----------------
const leftFinger1HandGeometry = new THREE.BoxGeometry( 0.5, 0.95, 2.35);
const leftFinger2HandGeometry = new THREE.BoxGeometry( 0.5, 0.95, 2.35);
const leftFinger3HandGeometry = new THREE.BoxGeometry( 0.5, 0.95, 2.35);
const leftThumbFingerHandGeometry = new THREE.BoxGeometry( 0.5, 0.95, 2.35);

// ------------------------MATERIAL LEFT ARM------------------------------
const leftArmMaterial = new THREE.MeshBasicMaterial({color: 0xdbc114 });
const leftShoulderSphereMaterial = new THREE.MeshBasicMaterial({color: 0xff0000});

// ---------------------- LEFT FOREARM MATERIAL
const leftForeArmMaterial = new THREE.MeshBasicMaterial({color: 0xaea758});

// ----------------------LEFT HAND MATERIAL-----------------------------
const leftHandMaterial = new THREE.MeshBasicMaterial({color:0xdbc114, wireframe: true});
 
// ----------------------LEFT FINGERS MATERIAL-----------------------------
const leftFinger1HandMaterial = new THREE.MeshBasicMaterial({color: 0xaea758});
const leftFinger2HandMaterial = new THREE.MeshBasicMaterial({color: 0xaea758});
const leftFinger3HandMaterial = new THREE.MeshBasicMaterial({color: 0xaea758});
const leftThumbFingERMaterial = new THREE.MeshBasicMaterial({color: 0xaea758});

// ----------------------LEFT FINGERS CONNECTION GEOMETRY-----------------------------
const leftFinger1ConnectionHandGeometry = new THREE.SphereGeometry( 0.2, 32, 32);
const leftFinger2ConnectionHandGeometry = new THREE.SphereGeometry( 0.2, 32, 32);
const leftFinger3ConnectionHandGeometry = new THREE.SphereGeometry( 0.2, 32, 32);
const leftThumbFingerConnectionHandGeometry = new THREE.SphereGeometry( 0.2, 32, 32);

// ----------------------LEFT FINGERS CONNECTION MATERIAL-----------------------------
const leftFinger1ConnectionHandMaterial = new THREE.MeshBasicMaterial({color: 0xff0000});
const leftFinger2ConnectionHandMaterial = new THREE.MeshBasicMaterial({color: 0xff0000});
const leftFinger3ConnectionHandMaterial = new THREE.MeshBasicMaterial({color: 0xff0000});
const leftThumbFingerConnectionHandMaterial = new THREE.MeshBasicMaterial({color: 0xff0000});

//----------------------------------------- MESH AND PIVOT SECTION---------------------------------
// mesh left Arm
const leftArm = new THREE.Mesh(leftArmGeometry, leftArmMaterial);
leftArm.position.set(-7, 7, -5);
scene.add(leftArm);

// add pivot on the begin of the left arm/shoulder
const leftShoulderPivot = new THREE.Object3D();
leftShoulderPivot.position.set(-1.8, 0, 0);
leftArm.add(leftShoulderPivot);
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

leftShoulderSphere.add(leftForeArmPivot);
leftShoulderSphere.position.x = 0
// leftForeArmPivot.add(axesHelper);

//mesh left forearm
const leftForeArm = new THREE.Mesh(leftForeArmGeometry, leftForeArmMaterial); 
leftForeArm.position.z = 4;
leftForeArmPivot.add(leftForeArm);

//  add pivot to the end of the left forearm
const SecondleftForeArmPivot = new THREE.Object3D();
SecondleftForeArmPivot.position.x = 0;
SecondleftForeArmPivot.position.y = 3.4;
leftForeArm.add(SecondleftForeArmPivot)
// SecondleftForeArmPivot.add(axesHelper);

//mesh left hand
const leftHand = new THREE.Mesh(leftHandGeometry, leftHandMaterial);
leftHand.position.x = 0;
SecondleftForeArmPivot.add(leftHand);

// pivot for the left hand
const leftHandPivot = new THREE.Object3D(); 
leftHandPivot.position.x = 0;
leftHandPivot.position.y = 0;
leftHand.add(leftHandPivot);
// leftHandPivot.add(axesHelper);

// pivot for the first finger left hand connection
const leftFinger1ConnectionPivot = new THREE.Object3D();
leftHand.add(leftFinger1ConnectionPivot);
leftFinger1ConnectionPivot.position.x = 0.8;
leftFinger1ConnectionPivot.position.y = .8;
// leftFinger1ConnectionPivot.add(axesHelper);

// pivot for the second finger left hand connection
const leftFinger2ConnectionPivot = new THREE.Object3D();
leftHand.add(leftFinger2ConnectionPivot);
leftFinger2ConnectionPivot.position.x = -0.1;
leftFinger2ConnectionPivot.position.y = .8;
// leftFinger2ConnectionPivot.add(axesHelper);

// pivot for the third finger left hand connection
const leftFinger3ConnectionPivot = new THREE.Object3D();
leftHand.add(leftFinger3ConnectionPivot);
leftFinger3ConnectionPivot.position.x = -0.8;
leftFinger3ConnectionPivot.position.y = .8;
// leftFinger3ConnectionPivot.add(axesHelper);

// pivot for the thumb finger left hand connection
const leftThumbFingerConnectionPivot = new THREE.Object3D();
leftHand.add(leftThumbFingerConnectionPivot);
leftThumbFingerConnectionPivot.position.x = -0.8;
leftThumbFingerConnectionPivot.position.y = .8;
leftThumbFingerConnectionPivot.add(axesHelper);


const leftFinger1Connection = new THREE.Mesh(leftFinger1ConnectionHandGeometry, leftFinger1ConnectionHandMaterial);
leftFinger1ConnectionPivot.add(leftFinger1Connection);

const leftFinger2Connection = new THREE.Mesh(leftFinger2ConnectionHandGeometry, leftFinger2ConnectionHandMaterial);
leftFinger2ConnectionPivot.add(leftFinger2Connection);

const leftFinger3Connection = new THREE.Mesh(leftFinger3ConnectionHandGeometry, leftFinger3ConnectionHandMaterial);
leftFinger3ConnectionPivot.add(leftFinger3Connection);

// add pivot to connect the shpere to the first finger left hand
const connectFirstLeftFingerPivot = new THREE.Object3D();
leftFinger1Connection.add(connectFirstLeftFingerPivot);

// add pivot to connect the shpere to the second finger left hand
const connectSecondLeftFingerPivot = new THREE.Object3D();
leftFinger2Connection.add(connectSecondLeftFingerPivot);

// add pivot to connect the shpere to the third finger left hand
const connectThirdLeftFingerPivot = new THREE.Object3D();
leftFinger3Connection.add(connectThirdLeftFingerPivot);

// mesh first finger left hand
const firstFingerLeftHand = new THREE.Mesh(leftFinger1HandGeometry, leftFinger1HandMaterial);
connectFirstLeftFingerPivot.add(firstFingerLeftHand);
connectFirstLeftFingerPivot.rotation.x = 30;
connectFirstLeftFingerPivot.position.y = 1;

//// mesh second finger left hand
const secondFingerLeftHand = new THREE.Mesh(leftFinger2HandGeometry, leftFinger2HandMaterial);
connectSecondLeftFingerPivot.add(secondFingerLeftHand);
connectSecondLeftFingerPivot.rotation.x = 30;
connectSecondLeftFingerPivot.position.y = 1;

// mesh third finger left hand
const thirdFingerLeftHand = new THREE.Mesh(leftFinger3HandGeometry, leftFinger3HandMaterial);
connectThirdLeftFingerPivot.add(thirdFingerLeftHand);
connectThirdLeftFingerPivot.rotation.x = 30;
connectThirdLeftFingerPivot.position.y = 1;

// ------------------------------------------------------------------------------------
//--------------------------------------- ANIMATION SECTION----------------------------
// velocity of the movement of the arm and fingers
let velocityMovement = 0.004;
let controlLeftFingers = 0.01;
// rotation forms
leftArm.rotation.x = 1.55;
leftShoulderSphere.rotation.x = 3.17;
leftForeArm.rotation.x = 1.55;
leftFinger1Connection.rotation.x = 3.17;
leftFinger2Connection.rotation.x = 3.17;
leftFinger3Connection.rotation.x = 3.17;
// rotation pivots
leftShoulderPivot.rotation.x = 1.55;
leftForeArmPivot.rotation.x = 70;
leftFinger1ConnectionPivot.rotation.x = 3;
leftFinger2ConnectionPivot.rotation.x = 3;
leftFinger3ConnectionPivot.rotation.x = 3;

// to animate the left shoulder
let animateLeftArm = () => {
    // rotation of the left shoulder on x axis
    leftShoulderSphere.rotation.x += velocityMovement;

    if (leftShoulderSphere.rotation.x < 1.55 || leftShoulderSphere.rotation.x > 3.17) {
// to control the rotation
    velocityMovement = velocityMovement * -1    
}

}

// to animate the fingers of the left hand
let animateFingersLeftHand = () => {
 // rotation of the first finger of left hand on x axis
    leftFinger1Connection.rotation.x += controlLeftFingers;

    if (leftFinger1Connection.rotation.x < 1.55 || leftFinger1Connection.rotation.x > 3.17) {
// to control the rotation
    controlLeftFingers = controlLeftFingers * -1    
}
}
  
let animate = () => {
    requestAnimationFrame(animate)

    // animateLeftArm()
    // to animate fingers of the left hand
//   animateFingersLeftHand()

    // mouth.rotation.x -= 0.05;

    controls.update()
    renderer.render(scene, camera);
}

animate();
loop();