import * as THREE from './three.module.js';
import { GLTFLoader } from './GLTFLoader.js';
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 25, 45);
camera.lookAt(1, 0, 0); 

scene.background = new THREE.Color(0xa6c6f7);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let stars, starGeo;

particles();

function particles() {
    const points = [];
  
    for (let i = 0; i < 6000; i++) {
      let star = new THREE.Vector3(
        Math.random() * 600 - 300,
        Math.random() * 600 - 300,
        Math.random() * 600 - 300
      );
      points.push(star);
    }
  
    starGeo = new THREE.BufferGeometry().setFromPoints(points);
  
    let sprite = new THREE.TextureLoader().load("assets/images/star.png");
    let starMaterial = new THREE.PointsMaterial({
      color: 0xffb6c1,
      size: 0.7,
      map: sprite,
    });
  
    stars = new THREE.Points(starGeo, starMaterial);
    scene.add(stars);
  }
  
  function animateParticles() {
    const vertices = starGeo.attributes.position.array;
  
    for (let i = 1; i < vertices.length; i += 3) {
      vertices[i] -= 0.2; // star speed
  
      if (vertices[i] < -300) {
        vertices[i] = 300;
      }
    }
  
    starGeo.attributes.position.needsUpdate = true;
  }
  

const pointLight = new THREE.PointLight(0xffffff, 5);
pointLight.position.set(0, 30, 0);
scene.add(pointLight);


const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
directionalLight.position.set(0, 10, 10);
scene.add(directionalLight);

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap

document.body.appendChild(renderer.domElement);


const pointLight2 = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(0, 30, 0);
pointLight.castShadow = true; // Enable shadow casting
pointLight.shadow.mapSize.width = 2048;
pointLight.shadow.mapSize.height = 2048;
scene.add(pointLight2);

const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(0, 10, 20);
directionalLight.castShadow = true; // Enable shadow casting
directionalLight.shadow.mapSize.width = 2048;
directionalLight.shadow.mapSize.height = 2048;
directionalLight.shadow.camera.near = 0.5;
directionalLight.shadow.camera.far = 500;
directionalLight.shadow.camera.left = -100;
directionalLight.shadow.camera.right = 100;
directionalLight.shadow.camera.top = 100;
directionalLight.shadow.camera.bottom = -100;
scene.add(directionalLight2);

const loader = new GLTFLoader();

loader.load( './assets/3d model/watchtower_01/scene1.gltf', function ( gltf ) {
	const watchtower = gltf.scene;
    scene.add( watchtower );
    
    const scaleFactor = 0.19; 
    watchtower.scale.set(scaleFactor, scaleFactor, scaleFactor)
    watchtower.position.set (25, -5, 12);

    watchtower.traverse(function (child) {
        if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });
}, undefined, function (error) {
    console.error(error);
});


loader.load( './assets/3d model/watchtower_01/scene1.gltf', function ( gltf ) {
	const watchtower2 = gltf.scene;
    scene.add( watchtower2 );
    
    const scaleFactor = 0.19; 
    watchtower2.scale.set(scaleFactor, scaleFactor, scaleFactor)
    watchtower2.position.set (-25, -5, -4);
    watchtower2.rotation.y = - Math.PI/-1;
}, undefined, function ( error ) {
	console.error( error );
} );



const floorTexture = new THREE.TextureLoader().load('assets/textures/floorx1.jpg');
const floorMaterial1 = new THREE.MeshStandardMaterial({ map: floorTexture });
const floorGeometry = new THREE.BoxGeometry(60, 2, 60);
const floor = new THREE.Mesh(floorGeometry, floorMaterial1);
floor.position.set(0, -5.5, 0);
scene.add(floor);



const wallTexture = new THREE.TextureLoader().load('assets/textures/wallx.jpg');
const wallMaterial = new THREE.MeshLambertMaterial({ map: wallTexture });
const wallGeometry = new THREE.BoxGeometry(1, 11, 60); // Adjust dimensions as needed
const wall = new THREE.Mesh(wallGeometry, wallMaterial);
wall.position.set(-29.9, 1, 0); // Adjust position as needed
scene.add(wall);

const wallTexture2 = new THREE.TextureLoader().load('assets/textures/wallx.jpg');
const wallMaterial2 = new THREE.MeshLambertMaterial({ map: wallTexture2 });
const wallGeometry2 = new THREE.BoxGeometry(1, 11, 60); // Adjust dimensions as needed
const wall2 = new THREE.Mesh(wallGeometry2, wallMaterial2);
wall2.position.set(30, 1, 0); // Adjust position as needed
scene.add(wall2);


const wallTexture3 = new THREE.TextureLoader().load('assets/textures/wallx.jpg');
const wallMaterial3 = new THREE.MeshLambertMaterial({ map: wallTexture3 });
const wallGeometry3 = new THREE.BoxGeometry(60, 11, 1); // Adjust dimensions as needed
const wall3 = new THREE.Mesh(wallGeometry3, wallMaterial3);
wall3.position.set(1, 1, 30); // Adjust position as needed
scene.add(wall3);

const wallTexture4 = new THREE.TextureLoader().load('assets/textures/wallx.jpg');
const wallMaterial4 = new THREE.MeshLambertMaterial({ map: wallTexture4 });
const wallGeometry4 = new THREE.BoxGeometry(60, 11, 1); // Adjust dimensions as needed
const wall4 = new THREE.Mesh(wallGeometry4, wallMaterial4);
wall4.position.set(0, 1, -30); // Adjust position as needed
scene.add(wall4);

const wallTexture5 = new THREE.TextureLoader().load('assets/textures/wallx.jpg');
const wallMaterial5 = new THREE.MeshLambertMaterial({ map: wallTexture4 });
const wallGeometry5 = new THREE.BoxGeometry(50, 5, 1); // Adjust dimensions as needed
const wall5 = new THREE.Mesh(wallGeometry5, wallMaterial5);
wall5.position.set(-4.5, -5, 17); // Adjust position as needed
scene.add(wall5);

const wallTexture6 = new THREE.TextureLoader().load('assets/textures/wallx.jpg');
const wallMaterial6 = new THREE.MeshLambertMaterial({ map: wallTexture4 });
const wallGeometry6 = new THREE.BoxGeometry(50, 5, 1); // Adjust dimensions as needed
const wall6 = new THREE.Mesh(wallGeometry5, wallMaterial5);
wall6.position.set(-4.5, 4, 17); // Adjust position as needed
scene.add(wall6);

const wallTexture7 = new THREE.TextureLoader().load('assets/textures/wallx.jpg');
const wallMaterial7 = new THREE.MeshStandardMaterial({ map: wallTexture4 });
const wallGeometry7 = new THREE.BoxGeometry(7, 10, 1); // Adjust dimensions as needed
const wall7 = new THREE.Mesh(wallGeometry7, wallMaterial5);
wall7.position.set(-26, -3, 17); // Adjust position as needed
scene.add(wall7);

const wallTexture8 = new THREE.TextureLoader().load('assets/textures/wallx.jpg');
const wallMaterial8 = new THREE.MeshStandardMaterial({ map: wallTexture4 });
const wallGeometry8 = new THREE.BoxGeometry(7, 10, 1); // Adjust dimensions as needed
const wall8 = new THREE.Mesh(wallGeometry8, wallMaterial5);
wall8.position.set(-13, -3, 17); // Adjust position as needed
scene.add(wall8);

const wallTexture9 = new THREE.TextureLoader().load('assets/textures/wallx.jpg');
const wallMaterial9 = new THREE.MeshStandardMaterial({ map: wallTexture4 });
const wallGeometry9 = new THREE.BoxGeometry(7, 10, 1); // Adjust dimensions as needed
const wall9 = new THREE.Mesh(wallGeometry8, wallMaterial5);
wall9.position.set(0, -3, 17); // Adjust position as needed
scene.add(wall9);

const wallTexture10 = new THREE.TextureLoader().load('assets/textures/wallx.jpg');
const wallMaterial10 = new THREE.MeshStandardMaterial({ map: wallTexture4 });
const wallGeometry10 = new THREE.BoxGeometry(7, 10, 1); // Adjust dimensions as needed
const wall10 = new THREE.Mesh(wallGeometry8, wallMaterial5);
wall10.position.set(11, -3, 17); // Adjust position as needed
scene.add(wall10);


const wallTexture11 = new THREE.TextureLoader().load('assets/textures/wallx.jpg');
const wallMaterial11 = new THREE.MeshStandardMaterial({ map: wallTexture4 });
const wallGeometry11 = new THREE.BoxGeometry(2, 10, 1); // Adjust dimensions as needed
const wall11 = new THREE.Mesh(wallGeometry11, wallMaterial5);
wall11.position.set(19.5, -3, 17); // Adjust position as needed
scene.add(wall11);

const wallTexture12 = new THREE.TextureLoader().load('assets/textures/wallx.jpg');
const wallMaterial12 = new THREE.MeshStandardMaterial({ map: wallTexture4 });
const wallGeometry12 = new THREE.BoxGeometry(50, 1, 6); // Adjust dimensions as needed
const wall12 = new THREE.Mesh(wallGeometry12, wallMaterial5);
wall12.position.set(-4.5, 7, 14.5); // Adjust position as needed
scene.add(wall12);

const wallTexture13 = new THREE.TextureLoader().load('assets/textures/wallx.jpg');
const wallMaterial13 = new THREE.MeshStandardMaterial({ map: wallTexture4 });
const wallGeometry13 = new THREE.BoxGeometry(50, 4, 2); // Adjust dimensions as needed
const wall13 = new THREE.Mesh(wallGeometry13, wallMaterial5);
wall13.position.set(-4.5, 8, 11); // Adjust position as needed
scene.add(wall13);

const wallTexture14 = new THREE.TextureLoader().load('assets/textures/wallx.jpg');
const wallMaterial14 = new THREE.MeshStandardMaterial({ map: wallTexture4 });
const wallGeometry14 = new THREE.BoxGeometry(50, 5, 1); // Adjust dimensions as needed
const wall14 = new THREE.Mesh(wallGeometry14, wallMaterial4);
wall14.position.set(4.5, -5, -14.5); // Adjust position as needed
scene.add(wall14);

const wallTexture15 = new THREE.TextureLoader().load('assets/textures/wallx.jpg');
const wallMaterial15 = new THREE.MeshStandardMaterial({ map: wallTexture4 });
const wallGeometry15 = new THREE.BoxGeometry(50, 5, 1); // Adjust dimensions as needed
const wall15 = new THREE.Mesh(wallGeometry15, wallMaterial5);
wall15.position.set(4.5, 4, -14.5); // Adjust position as needed
scene.add(wall15);

const wallTexture16 = new THREE.TextureLoader().load('assets/textures/wallx.jpg');
const wallMaterial16 = new THREE.MeshStandardMaterial({ map: wallTexture4 });
const wallGeometry16 = new THREE.BoxGeometry(7, 15, 1); // Adjust dimensions as needed
const wall16 = new THREE.Mesh(wallGeometry16, wallMaterial5);
wall16.position.set(-17, -3, -14.5); // Adjust position as needed
scene.add(wall16);

const wallTexture17 = new THREE.TextureLoader().load('assets/textures/wallx.jpg');
const wallMaterial17 = new THREE.MeshStandardMaterial({ map: wallTexture4 });
const wallGeometry17 = new THREE.BoxGeometry(7, 15, 1); // Adjust dimensions as needed
const wall17 = new THREE.Mesh(wallGeometry17, wallMaterial5);
wall17.position.set(-3, -3, -14.5); // Adjust position as needed
scene.add(wall17);

const wallTexture18 = new THREE.TextureLoader().load('assets/textures/wallx.jpg');
const wallMaterial18 = new THREE.MeshStandardMaterial({ map: wallTexture4 });
const wallGeometry18 = new THREE.BoxGeometry(7, 15, 1); // Adjust dimensions as needed
const wall18 = new THREE.Mesh(wallGeometry18, wallMaterial5);
wall18.position.set(10, -3, -14.5); // Adjust position as needed
scene.add(wall18);

const wallTexture19 = new THREE.TextureLoader().load('assets/textures/wallx.jpg');
const wallMaterial19 = new THREE.MeshStandardMaterial({ map: wallTexture4 });
const wallGeometry19 = new THREE.BoxGeometry(7, 15, 1); // Adjust dimensions as needed
const wall19 = new THREE.Mesh(wallGeometry19, wallMaterial5);
wall19.position.set(23, -3, -14.5); // Adjust position as needed
scene.add(wall19);

const wallTexture20 = new THREE.TextureLoader().load('assets/textures/wallx.jpg');
const wallMaterial20 = new THREE.MeshStandardMaterial({ map: wallTexture4 });
const wallGeometry20 = new THREE.BoxGeometry(50, 1, 6); // Adjust dimensions as needed
const wall20 = new THREE.Mesh(wallGeometry20, wallMaterial5);
wall20.position.set(4.5, 7, -12); // Adjust position as needed
scene.add(wall20);

const wallTexture21 = new THREE.TextureLoader().load('assets/textures/wallx.jpg');
const wallMaterial21 = new THREE.MeshStandardMaterial({ map: wallTexture4 });
const wallGeometry21 = new THREE.BoxGeometry(50, 4, 2); // Adjust dimensions as needed
const wall21 = new THREE.Mesh(wallGeometry21, wallMaterial5);
wall21.position.set(4.5, 8, -9); // Adjust position as needed
scene.add(wall21);

const mouse = new THREE.Vector2();
const controls = {
    moveForward: false,
    moveBackward: false,
    moveLeft: false,
    moveRight: false,
    moveUp: false,
    moveDown: false,
    rotateLeft: false,
    rotateRight: false,
    lookUp: false,
    lookDown: false
};

document.addEventListener('mousemove', onMouseMove, false);
document.addEventListener('keydown', onKeyDown, false);
document.addEventListener('keyup', onKeyUp, false);

function onMouseMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

function onKeyDown(event) {
    switch (event.keyCode) {
        case 87: // W
            controls.moveForward = true;
            break;
        case 83: // S
            controls.moveBackward = true;
            break;
        case 65: // A
            controls.moveLeft = true;
            break;
        case 68: // D
            controls.moveRight = true;
            break;
        case 32: // Spacebar
            controls.moveUp = true;
            break;
        case 16: // Shift
            controls.moveDown = true;
            break;
        case 37: // Left arrow
            controls.rotateLeft = true;
            break;
        case 39: // Right arrow
            controls.rotateRight = true;
            break;
        case 38: // Up arrow
            controls.lookUp = true;
            break;
        case 40: // Down arrow
            controls.lookDown = true;
            break;
    }
}

function onKeyUp(event) {
    switch (event.keyCode) {
        case 87: // W
            controls.moveForward = false;
            break;
        case 83: // S
            controls.moveBackward = false;
            break;
        case 65: // A
            controls.moveLeft = false;
            break;
        case 68: // D
            controls.moveRight = false;
            break;
        case 32: // Spacebar
            controls.moveUp = false;
            break;
        case 16: // Shift
            controls.moveDown = false;
            break;
        case 37: // Left arrow
            controls.rotateLeft = false;
            break;
        case 39: // Right arrow
            controls.rotateRight = false;
            break;
        case 38: // Up arrow
            controls.lookUp = false;
            break;
        case 40: // Down arrow
            controls.lookDown = false;
            break;
    }
}

function animate() {
    requestAnimationFrame(animate);
    animateParticles();
    // Update camera position based on controls
    const speed = 0.1;
    if (controls.moveForward) camera.position.z -= speed;
    if (controls.moveBackward) camera.position.z += speed;
    if (controls.moveLeft) camera.position.x -= speed;
    if (controls.moveRight) camera.position.x += speed;
    if (controls.moveUp) camera.position.y += speed;
    if (controls.moveDown) camera.position.y -= speed;
    if (controls.rotateLeft) camera.rotation.y += 0.01;
    if (controls.rotateRight) camera.rotation.y -= 0.01;
    if (controls.lookUp) camera.rotation.x += 0.01;
    if (controls.lookDown) camera.rotation.x -= 0.01;

    renderer.render(scene, camera);
}

animate();
