import * as THREE from "three"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

//---------
// Scene
//---------
const photoScene = new THREE.Scene(); 
const canvas = document.querySelector(".photoPresentation");


//---------
// Light
//---------
const spotLight = new THREE.SpotLight( 0xffffff );
spotLight.position.set( 0, -300, 500 );
// spotLight.castShadow = true;
photoScene.add( spotLight );


//---------
// Sizes
//---------
const sizes = {
    width: 400, 
    height: 400
}


//---------
// Camera
//---------
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height); 
camera.position.set(0, 0, 5); // Modifier la position de la caméra
photoScene.add( camera );


//---------
// Renderer
//---------
const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true
})
renderer.setSize( sizes.width, sizes.height );
renderer.setClearColor( 0x000000, 0 ); 


//---------
// Controls
//---------
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableRotate = true; // Activer la rotation
controls.enablePan = false; // Désactiver le panoramique
controls.enableZoom = false; // Désactiver le zoom

// Restreindre les mouvements aux rotations sur l'axe z uniquement
controls.minPolarAngle = Math.PI / 2; // Angle minimum de rotation
controls.maxPolarAngle = Math.PI / 2; // Angle maximum de rotation
controls.minAzimuthAngle = -Infinity; // Angle minimum d'azimut
controls.maxAzimuthAngle = Infinity; // Angle maximum d'azimut

//---------
// Photo
//---------

const geometry = new THREE.CylinderGeometry(1.5, 1.5, 0, 32);

const textureSide = new THREE.TextureLoader().load('/static/image/techno/vide.png');
const textureTop = new THREE.TextureLoader().load('/static/image/photo/photo.jpg');
const textureBottom = new THREE.TextureLoader().load('/static/image/photo/soleil.jpg');

const materialSide = new THREE.MeshBasicMaterial({ map: textureSide });
const materialTop = new THREE.MeshBasicMaterial({ map: textureTop });
const materialBottom = new THREE.MeshBasicMaterial({ map: textureBottom });

const materials = [
  materialSide,
  materialTop,
  materialBottom
];

const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cylinder = new THREE.Mesh(geometry, materials);
cylinder.rotation.x = Math.PI / 2;
cylinder.rotation.y = Math.PI / 2;
photoScene.add(cylinder);



// Animation de la scène
function animate() {
  
  controls.update();

  requestAnimationFrame(animate);

  // Effectuer le rendu de la scène avec la caméra
  renderer.render(photoScene, camera);
}

// Appeler la fonction d'animation
animate();