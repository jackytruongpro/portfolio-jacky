import * as THREE from "three"
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// linkScene
const scene = new THREE.Scene(); 

const canvas = document.querySelector(".link3");


//---------
// Sizes
//---------
const sizes = {
    width: 1400,
    height: 400
}


//---------
// Camera
//---------
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height); 
camera.position.z = 10
scene.add( camera );

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
			gltf.scene.rotation.y = 0
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
				gltf.scene.rotation.y += 0.01
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

addGLTF('/static/model/GitOcto/scene.gltf', -5, 2, 2, 2, 'https://www.google.fr');
addGLTF('/static/model/Globe/scene.gltf', 0, 0.3, 0.3, 0.3, 'https://www.google.com');
addGLTF('/static/model/GitOcto/scene.gltf', 5, 2, 2, 2, 'https://www.google.com');
console.log(links)

//----------
// On link click
//----------
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

canvas.addEventListener('click', onClick);

function onClick(event) {
    const rect = canvas.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    mouse.x = x;
    mouse.y = y;

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(links, true);
		// console.log(intersects)

    if (intersects.length > 0) {
        const object = intersects[0].object;
				const objectId = document.getElementById(object.userData.name);
				console.log(object)
				console.log(objectId)
    }

}


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
// Light
//---------
const light = new THREE.AmbientLight( 0x404040, 3 ); // soft white light
scene.add( light );


// const controls = new OrbitControls(camera, canvas);
// controls.enableDamping = true;

// const animate = () => {
//     controls.update();

//     renderer.render( scene, camera );

//     window.requestAnimationFrame( animate );
// }

// animate()

const animate = () => {
	renderer.render(scene, camera);

	window.requestAnimationFrame(animate);
}

animate();
