import * as THREE from "three"
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// linkScene
const scene = new THREE.Scene();

const canvas = document.querySelector(".sneakerInterest");


//---------
// Sizes
//---------
const sizes = {
    width: 400,
    height: 600
}


//---------
// Camera
//---------
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height); 
camera.position.z = 10
scene.add( camera );


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
// Light
//---------
const light = new THREE.AmbientLight( 0x404040, 5 ); // soft white light
scene.add( light );


const animate = () => {
	controls.update();

	renderer.render(scene, camera);

	window.requestAnimationFrame(animate);
}

animate();



//---------
// Import 3D Model
//---------

const loader = new GLTFLoader();

// Optional: Provide a DRACOLoader instance to decode compressed mesh data
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath( '/examples/jsm/libs/draco/' );
loader.setDRACOLoader( dracoLoader );

const links = [];

function addGLTF(gltf_path, gltf_position_x, gltf_scale_x, gltf_scale_y, gltf_scale_z, gltf_link){
	// Load a glTF resource
	loader.load(
		// resource URL
		gltf_path,
		// called when the resource is loaded
		function ( gltf ) {

			gltf.scene.position.set(gltf_position_x, 0, 0)
			gltf.scene.rotation.x = Math.PI / -2;;
			gltf.scene.scale.set(gltf_scale_x, gltf_scale_y, gltf_scale_z)
			gltf.scene.userData.link = gltf_link
			// console.log(gltf.scene)
			links.push(gltf.scene);
			scene.add( gltf.scene );

			gltf.animations; // Array<THREE.AnimationClip>
			gltf.scene; // THREE.Group
			gltf.scenes; // Array<THREE.Group>
			gltf.cameras; // Array<THREE.Camera>
			gltf.asset; // Object

			const animate = () => {
				gltf.scene.rotation.z += 0.01
				window.requestAnimationFrame( animate );
			}
		
			animate();

		},
		// called while loading is progressing
		function ( xhr ) {
			console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
		},

		// called when loading has errors
		function ( error ) {
			console.log( 'An error happened' );
		}
	);
}

addGLTF('/static/model/Sneaker/scene.gltf', 0, 16, 16, 16, 'https://www.google.com');

