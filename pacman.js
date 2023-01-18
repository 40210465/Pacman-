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

// -----------------------------------PACMAN------------------------------------------

// -----------------------------------GEOMETRIES AND MATERIALS-----------------------

// HEAD
const headGeometry = new THREE.SphereGeometry( 8, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2);
const headGeometry2 = new THREE.SphereGeometry( 8, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2);
const headMaterial = new THREE.MeshBasicMaterial({ color: 0x054CF7 });                 

// BRAIN
const brainGeometry = new THREE.SphereGeometry(7.91, 32, 32, 0, Math.PI, 0, Math.PI);
const brainMaterial = new THREE.MeshBasicMaterial( {color: 0x0000} );

// MOUTH
const mouthGeometry = new THREE.SphereGeometry(8, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2);
const mouthMaterial = new THREE.MeshBasicMaterial({ color: 0x054CF7 });

// EYES
const EyeGeometry = new THREE.SphereGeometry(1, 12, 12);
const EyeMaterial = new THREE.MeshBasicMaterial({color: 0x0000 });

// ARMS
const ArmGeometry = new THREE.BoxGeometry(6, 2.4, 2.8);
const ShoulderSphereGeometry = new THREE.SphereGeometry(1, 12, 12);

// FOREARMS
const ForeArmGeometry = new THREE.CylinderGeometry(0.53, 0.87, 6, 44, 25, 0, 6.28);
const ForeArmMaterial = new THREE.MeshBasicMaterial({color: 0xaea758});

// HANDS
const HandGeometry = new THREE.BoxGeometry(2, 1.95, 1);
const HandMaterial = new THREE.MeshBasicMaterial({color:0x3BA7EF, wireframe: false});

// FINGERS AND THERE CONNECTIONS
const Finger1HandGeometry = new THREE.BoxGeometry( 0.5, 0.95, 2.35);
const Finger2HandGeometry = new THREE.BoxGeometry( 0.5, 0.95, 2.35);
const Finger3HandGeometry = new THREE.BoxGeometry( 0.5, 0.95, 2.35);
const ThumbFingerHandGeometry = new THREE.BoxGeometry( 0.55, 0.5, 1.75);
const Finger1ConnectionHandGeometry = new THREE.SphereGeometry( 0.2, 32, 32);
const Finger2ConnectionHandGeometry = new THREE.SphereGeometry( 0.2, 32, 32);
const Finger3ConnectionHandGeometry = new THREE.SphereGeometry( 0.2, 32, 32);
const ThumbFingerConnectionHandGeometry = new THREE.SphereGeometry( 0.2, 32, 32);
const Finger1HandMaterial = new THREE.MeshBasicMaterial({color: 0xaea758});
const Finger2HandMaterial = new THREE.MeshBasicMaterial({color: 0xaea758});
const Finger3HandMaterial = new THREE.MeshBasicMaterial({color: 0xaea758});
const ThumbFingerHandMaterial = new THREE.MeshBasicMaterial({color: 0xaea758});
const Finger1ConnectionHandMaterial = new THREE.MeshBasicMaterial({color:0xaea758});
const Finger2ConnectionHandMaterial = new THREE.MeshBasicMaterial({color: 0xaea758});
const Finger3ConnectionHandMaterial = new THREE.MeshBasicMaterial({color: 0xaea758});
const ThumbFingerConnectionHandMaterial = new THREE.MeshBasicMaterial({color: 0xaea758});

// ARMS AND SHOULDERS
const ArmMaterial = new THREE.MeshBasicMaterial({color: 0x3BA7EF, wireframe: false });
const ShoulderSphereMaterial = new THREE.MeshBasicMaterial({color: 0xff0000});

//----------------------------------------- MESH AND PIVOT SECTION---------------------------------
// -------------------------------- LEFT SIDE BODY ----

// mesh first half head
const head1 = new THREE.Mesh(headGeometry, headMaterial);
head1.rotateX(THREE.Math.degToRad(-15));
head1.position.set(-0, 5, -5)

// mesh second half head
const head2 = new THREE.Mesh(headGeometry2, headMaterial);
head2.position.set(-0, 5, -5)
head2.rotation.x = Math.PI / true;
head2.rotateX(THREE.Math.degToRad(25));

// mesh brain
const brain = new THREE.Mesh(brainGeometry, brainMaterial);
brain.position.x = -0;
brain.position.y = 5;
brain.position.z = -5;

// mesh mouth
const mouth = new THREE.Mesh(mouthGeometry, mouthMaterial);
mouth.position.set(-0, 5, -5);
// to rotate/invert the semi-sphere  to create the ilusion of the mouth of the pacman
mouth.rotation.x = Math.PI / true;
mouth.rotateX(THREE.Math.degToRad(-5));

// mesh leftEye
const leftEye = new THREE.Mesh(EyeGeometry, EyeMaterial);
leftEye.position.set(-2, 9, 1);

// mesh rightEye 
const rightEye = new THREE.Mesh(EyeGeometry, EyeMaterial);
rightEye.position.set(2, 9, 1);

// mesh left Arm
const leftArm = new THREE.Mesh(ArmGeometry, ArmMaterial);
leftArm.position.set(-7, 7, -5);

// add pivot on the begin of the left arm/shoulder
const leftShoulderPivot = new THREE.Object3D();
leftShoulderPivot.position.set(-1.8, 0, 0);
leftArm.add(leftShoulderPivot);

//shpere for the left shoulder 
const leftShoulderSphere = new THREE.Mesh(ShoulderSphereGeometry, ShoulderSphereMaterial);
leftShoulderPivot.add(leftShoulderSphere)

// add pivot to connect the shpere with the left forearm
const leftForeArmPivot = new THREE.Object3D();
leftShoulderSphere.add(leftForeArmPivot);

//mesh left forearm
const leftForeArm = new THREE.Mesh(ForeArmGeometry, ForeArmMaterial); 
leftForeArm.position.z = 4;
leftForeArmPivot.add(leftForeArm);

//  add pivot to the end of the left forearm
const SecondleftForeArmPivot = new THREE.Object3D();
SecondleftForeArmPivot.position.y = 3.4;
leftForeArm.add(SecondleftForeArmPivot)

//mesh left hand
const leftHand = new THREE.Mesh(HandGeometry, HandMaterial);
leftHand.position.y = 0.4;
SecondleftForeArmPivot.add(leftHand);

// pivot for the first finger left hand connection
const leftFinger1ConnectionPivot = new THREE.Object3D();
leftHand.add(leftFinger1ConnectionPivot);
leftFinger1ConnectionPivot.position.x = 0.75;
leftFinger1ConnectionPivot.position.y = 1.05;

// pivot for the second finger left hand connection
const leftFinger2ConnectionPivot = new THREE.Object3D();
leftHand.add(leftFinger2ConnectionPivot);
leftFinger2ConnectionPivot.position.x = -0.05;
leftFinger2ConnectionPivot.position.y = 1.05;

// pivot for the third finger left hand connection
const leftFinger3ConnectionPivot = new THREE.Object3D();
leftHand.add(leftFinger3ConnectionPivot);
leftFinger3ConnectionPivot.position.x = -0.75;
leftFinger3ConnectionPivot.position.y = 1.05;

// pivot for the thumb finger left hand connection
const leftThumbFingerConnectionPivot = new THREE.Object3D();
leftHand.add(leftThumbFingerConnectionPivot);
leftThumbFingerConnectionPivot.position.x = -0.5;
leftThumbFingerConnectionPivot.position.y = 0.1;

const leftFinger1Connection = new THREE.Mesh(Finger1ConnectionHandGeometry, Finger1ConnectionHandMaterial);
leftFinger1ConnectionPivot.add(leftFinger1Connection);

const leftFinger2Connection = new THREE.Mesh(Finger2ConnectionHandGeometry, Finger2ConnectionHandMaterial);
leftFinger2ConnectionPivot.add(leftFinger2Connection);

const leftFinger3Connection = new THREE.Mesh(Finger3ConnectionHandGeometry, Finger3ConnectionHandMaterial);
leftFinger3ConnectionPivot.add(leftFinger3Connection);

const leftThumbFingerConnection = new THREE.Mesh(ThumbFingerConnectionHandGeometry, ThumbFingerConnectionHandMaterial);
leftThumbFingerConnectionPivot.add(leftThumbFingerConnection);

// add pivot to connect the shpere to the first finger left hand
const connectFirstLeftFingerPivot = new THREE.Object3D();
leftFinger1Connection.add(connectFirstLeftFingerPivot);

// add pivot to connect the shpere to the second finger left hand
const connectSecondLeftFingerPivot = new THREE.Object3D();
leftFinger2Connection.add(connectSecondLeftFingerPivot);

// add pivot to connect the shpere to the third finger left hand
const connectThirdLeftFingerPivot = new THREE.Object3D();
leftFinger3Connection.add(connectThirdLeftFingerPivot);

// add pivot to connect the shpere to the thumb finger left hand
const connectLeftThumbFingerPivot = new THREE.Object3D();
leftThumbFingerConnectionPivot.add(connectLeftThumbFingerPivot);

// mesh first finger left hand
const firstFingerLeftHand = new THREE.Mesh(Finger1HandGeometry, Finger1HandMaterial);
connectFirstLeftFingerPivot.add(firstFingerLeftHand);
connectFirstLeftFingerPivot.position.y = 1;

//// mesh second finger left hand
const secondFingerLeftHand = new THREE.Mesh(Finger2HandGeometry, Finger2HandMaterial);
connectSecondLeftFingerPivot.add(secondFingerLeftHand);
connectSecondLeftFingerPivot.position.y = 1;

// mesh third finger left hand
const thirdFingerLeftHand = new THREE.Mesh(Finger3HandGeometry, Finger3HandMaterial);
connectThirdLeftFingerPivot.add(thirdFingerLeftHand);
connectThirdLeftFingerPivot.position.y = 1;

// // mesh thumb finger left hand
const thumbFingerLeftHand = new THREE.Mesh(ThumbFingerHandGeometry, ThumbFingerHandMaterial);
leftThumbFingerConnection.add(thumbFingerLeftHand);
leftThumbFingerConnection.position.x = -0.7;

// -------------------------------- RIGHT SIDE BODY -----
// mesh right Arm
const rightArm = new THREE.Mesh(ArmGeometry, ArmMaterial);
rightArm.position.set(7, 7, -5);

// add pivot on the begin of the right arm/shoulder
const rightShoulderPivot = new THREE.Object3D();
rightShoulderPivot.position.set(1.8, 0, 0);
rightArm.add(rightShoulderPivot);

//shpere for the right shoulder 
const rightShoulderSphere = new THREE.Mesh(ShoulderSphereGeometry, ShoulderSphereMaterial);
rightShoulderPivot.add(rightShoulderSphere)

// add pivot to connect the shpere with the right forearm
const rightForeArmPivot = new THREE.Object3D();
rightShoulderSphere.add(rightForeArmPivot);

//mesh right forearm
const rightForeArm = new THREE.Mesh(ForeArmGeometry, ForeArmMaterial); 
rightForeArm.position.y = -0.1;
rightForeArm.position.z = 4;
rightForeArmPivot.add(rightForeArm);

//  add pivot to the end of the right forearm
const SecondrightForeArmPivot = new THREE.Object3D();
SecondrightForeArmPivot.position.y = 3.4;
rightForeArm.add(SecondrightForeArmPivot)

//mesh right hand
const rightHand = new THREE.Mesh(HandGeometry, HandMaterial);
rightHand.position.y = 0.4;
SecondrightForeArmPivot.add(rightHand);

// pivot for the first finger right hand connection
const rightFinger1ConnectionPivot = new THREE.Object3D();
rightHand.add(rightFinger1ConnectionPivot);
rightFinger1ConnectionPivot.position.x = 0.75;
rightFinger1ConnectionPivot.position.y = 1.05;

// pivot for the second finger right hand connection
const rightFinger2ConnectionPivot = new THREE.Object3D();
rightHand.add(rightFinger2ConnectionPivot);
rightFinger2ConnectionPivot.position.x = -0.05;
rightFinger2ConnectionPivot.position.y = 1.05;

// pivot for the third finger right hand connection
const rightFinger3ConnectionPivot = new THREE.Object3D();
rightHand.add(rightFinger3ConnectionPivot);
rightFinger3ConnectionPivot.position.x = -0.75;
rightFinger3ConnectionPivot.position.y = 1.05;

// pivot for the thumb finger right hand connection
const rightThumbFingerConnectionPivot = new THREE.Object3D();
rightHand.add(rightThumbFingerConnectionPivot);
rightThumbFingerConnectionPivot.position.x = 0.8;
rightThumbFingerConnectionPivot.position.y = 0.1;

const rightFinger1Connection = new THREE.Mesh(Finger1ConnectionHandGeometry, Finger1ConnectionHandMaterial);
rightFinger1ConnectionPivot.add(rightFinger1Connection);

const rightFinger2Connection = new THREE.Mesh(Finger2ConnectionHandGeometry, Finger2ConnectionHandMaterial);
rightFinger2ConnectionPivot.add(rightFinger2Connection);

const rightFinger3Connection = new THREE.Mesh(Finger3ConnectionHandGeometry, Finger3ConnectionHandMaterial);
rightFinger3ConnectionPivot.add(rightFinger3Connection);

const rightThumbFingerConnection = new THREE.Mesh(ThumbFingerConnectionHandGeometry, ThumbFingerConnectionHandMaterial);
rightThumbFingerConnectionPivot.add(rightThumbFingerConnection);

// add pivot to connect the shpere to the first finger right hand
const connectFirstRightFingerPivot = new THREE.Object3D();
rightFinger1Connection.add(connectFirstRightFingerPivot);

// add pivot to connect the shpere to the second finger right hand
const connectSecondRightFingerPivot = new THREE.Object3D();
rightFinger2Connection.add(connectSecondRightFingerPivot);

// add pivot to connect the shpere to the third finger right hand
const connectThirdRightFingerPivot = new THREE.Object3D();
rightFinger3Connection.add(connectThirdRightFingerPivot);

// add pivot to connect the shpere to the thumb finger right hand
const connectRightThumbFingerPivot = new THREE.Object3D();
rightThumbFingerConnectionPivot.add(connectRightThumbFingerPivot);

// mesh first finger right hand
const firstFingerRightHand = new THREE.Mesh(Finger1HandGeometry, Finger1HandMaterial);
connectFirstRightFingerPivot.add(firstFingerRightHand);
connectFirstRightFingerPivot.position.y = 1;

//// mesh second finger right hand
const secondFingerRightHand = new THREE.Mesh(Finger2HandGeometry, Finger2HandMaterial);
connectSecondRightFingerPivot.add(secondFingerRightHand);
connectSecondRightFingerPivot.position.y = 1;

// mesh third finger right hand
const thirdFingerRightHand = new THREE.Mesh(Finger3HandGeometry, Finger3HandMaterial);
connectThirdRightFingerPivot.add(thirdFingerRightHand);
connectThirdRightFingerPivot.position.y = 1;

// // mesh thumb finger right hand
const thumbFingerRightHand = new THREE.Mesh(ThumbFingerHandGeometry, ThumbFingerHandMaterial);
rightThumbFingerConnection.add(thumbFingerRightHand);
rightThumbFingerConnection.position.x = 0.7;

// ---------------------------------------------PACMAN MODEL ------------------------

const Pacman = new THREE.Group();
Pacman.add( head1, head2, leftArm, rightArm, brain, leftEye, rightEye, mouth );
scene.add(Pacman);

Pacman.position.set(0, 0 , 0)
Pacman.scale.set(1, 1, 1)

// ------------------------------------------------------------------------------------
//--------------------------------------- ANIMATION SECTION----------------------------
let velocityMovementArm = 0.004;
let velocityMovementFingers = 0.01;

// rotations left side body
leftArm.rotation.x = 1.55;
leftShoulderSphere.rotation.x = 3.17;
leftForeArm.rotation.x = 1.55;
leftForeArm.rotation.y = 25
leftFinger1Connection.rotation.x = 3.17;
leftFinger2Connection.rotation.x = 3.17;
leftFinger3Connection.rotation.x = 3.17;
leftThumbFingerConnection.rotation.y = 30;

// rotations right side body
rightArm.rotation.x = 1.55;
rightShoulderSphere.rotation.x = 3.17;
rightForeArm.rotation.x = 1.55;
rightForeArm.rotation.y = 25
rightFinger1Connection.rotation.x = 3.17;
rightFinger2Connection.rotation.x = 3.17;
rightFinger3Connection.rotation.x = 3.17;
rightThumbFingerConnection.rotation.y = 30;

// rotation pivots left side body
leftShoulderPivot.rotation.x = 1.55;
leftForeArmPivot.rotation.x = 70;
leftFinger1ConnectionPivot.rotation.x = 3;
leftFinger2ConnectionPivot.rotation.x = 3;
leftFinger3ConnectionPivot.rotation.x = 3;
connectFirstLeftFingerPivot.rotation.x = 30;
connectSecondLeftFingerPivot.rotation.x = 30;
connectThirdLeftFingerPivot.rotation.x = 30;

// rotation pivots right side body
rightShoulderPivot.rotation.x = 1.55;
rightForeArmPivot.rotation.x = 70;
rightFinger1ConnectionPivot.rotation.x = 3;
rightFinger2ConnectionPivot.rotation.x = 3;
rightFinger3ConnectionPivot.rotation.x = 3;
connectFirstRightFingerPivot.rotation.x = 30;
connectSecondRightFingerPivot.rotation.x = 30;
connectThirdRightFingerPivot.rotation.x = 30;

// to animate the arms/shoulders
let animateArmShoulders = () => {
    // rotation of the left shoulder on x axis
    leftShoulderSphere.rotation.x += velocityMovementArm;
    // rotation of the right shoulder on x axis
    rightShoulderSphere.rotation.x += velocityMovementArm;

    if ((leftShoulderSphere.rotation.x < 1.55 || leftShoulderSphere.rotation.x > 3.17) &&
    (rightShoulderSphere.rotation.x < 1.55 || rightShoulderSphere.rotation.x > 3.17)) 
    {
// to control the rotation
    velocityMovementArm = velocityMovementArm * -1    
}
}

// to animate the fingers
let animateFingers = () => {
 // rotation of the fingers of left hand on x axis
    leftFinger1Connection.rotation.x += velocityMovementFingers;
    leftFinger2Connection.rotation.x += velocityMovementFingers;
    leftFinger3Connection.rotation.x += velocityMovementFingers;
 // rotation of the fingers of right hand on x axis
    rightFinger1Connection.rotation.x += velocityMovementFingers;
    rightFinger2Connection.rotation.x += velocityMovementFingers;
    rightFinger3Connection.rotation.x += velocityMovementFingers;

    if ((leftFinger1Connection.rotation.x < 1.55 || leftFinger1Connection.rotation.x > 3.17) && 
         (leftFinger2Connection.rotation.x < 1.55 || leftFinger2Connection.rotation.x > 3.17) &&
         (leftFinger3Connection.rotation.x < 1.55 || leftFinger3Connection.rotation.x > 3.17) && 
        (rightFinger1Connection.rotation.x < 1.55 || rightFinger1Connection.rotation.x > 3.17) &&
        (rightFinger2Connection.rotation.x < 1.55 || rightFinger2Connection.rotation.x > 3.17) &&
        (rightFinger3Connection.rotation.x < 1.55 || rightFinger3Connection.rotation.x > 3.17) 
         ) {
// to control the rotation
    velocityMovementFingers = velocityMovementFingers * -1    
}
}

let animate = () => {
    requestAnimationFrame(animate)

    animateArmShoulders()
    animateFingers()

    mouth.rotation.x -= 0.05;

    controls.update()
    renderer.render(scene, camera);
}

animate();
loop();