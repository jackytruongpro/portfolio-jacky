import * as THREE from "three"
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

//---------
// Scene
//---------
const scene = new THREE.Scene();
const canvas = document.querySelector('.webgl');

scene.background = new THREE.CubeTextureLoader()
	.setPath('/static/textures/roomCube/')
	.load([
		'px.png',
		'nx.png',
		'py.png',
		'ny.png',
		'pz.png',
		'nz.png'
	]);

const sizes = {
	width: window.innerWidth,
	height: window.innerHeight
	// width: 500,
	// height: 500
};

//---------
// Axe helper
//---------
// const axesHelper = new THREE.AxesHelper( 5 );
// scene.add( axesHelper );


//---------
// Camera
//---------
const camera = new THREE.PerspectiveCamera(70, sizes.width / sizes.height);
camera.position.z = 10;
scene.add(camera);

//---------
// Renderer
//---------
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);


//---------
// Controls
//---------
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.maxPolarAngle = (Math.PI / 2) + 0.1 // How far you can orbit vertically

const tick = () => {
	controls.update();
	renderer.render(scene, camera);
	window.requestAnimationFrame(tick);
}
tick()


//---------
// Light
//---------
const light = new THREE.AmbientLight( 0xffffff, 1.5 );
scene.add( light );
light.position.set(0, 300);

// const light2 = new THREE.AmbientLight( 0xffffff, 1.5 );
// scene.add( light2 );
// light.position.set(0, 100, 0);


canvas.addEventListener('wheel', handleMouseWheel);

// Fonction de gestion de l'événement de la molette de la souris
function handleMouseWheel(event) {
  event.preventDefault();

  // Calcule le facteur de zoom en fonction de la direction de la molette de la souris
  const zoomSpeed = 0.0001; // Ajuste la vitesse de zoom selon tes besoins
  const zoomFactor = 1 - event.deltaY * zoomSpeed * 10;

	// Définit les valeurs de zoom minimale et maximale
	const minZoom = 1; // Valeur de zoom minimale
  const maxZoom = 3.0; // Valeur de zoom maximale

  // Applique le zoom à la caméra
  camera.zoom *= zoomFactor;
	camera.zoom = Math.max(minZoom, Math.min(maxZoom, camera.zoom));
  camera.updateProjectionMatrix();
}


//---------
// Objects
//---------

// Poster
const posters = [];

function add_poster(poster_id, poster_name, poster_width, poster_height, poster_position_x, poster_position_y, poster_position_z, poster_rotation_y, poster_image_path) {
	const geometry = new THREE.PlaneGeometry( poster_width, poster_height );

	const textureLoader = new THREE.TextureLoader();
	const texture = textureLoader.load(poster_image_path);

	const material = new THREE.MeshBasicMaterial( { map: texture } );
	const poster = new THREE.Mesh( geometry, material );
	poster.userData.id = poster_id;
	poster.name = poster_name;
	poster.position.x = poster_position_x;
	poster.position.y = poster_position_y;
	poster.position.z = poster_position_z;
	poster.rotation.y = poster_rotation_y;
	// poster.rotation.y = -150;
	posters.push(poster);
	scene.add(poster);
}

add_poster(1,'Poster 1', 350, 457, -600, -150, -1600, 7, '/static/image/photo/poster_aqualink.png');
add_poster(2,'Poster 2', 350, 380, -200, -130, -1600, 7, '/static/image/photo/poster_letsgo.png');
add_poster(3,'Poster 3', 350, 317, 135, -112, -1600, 7, '/static/image/photo/poster_cocoloc.png');


//---------
// Import 3D Model
//---------

const loader = new GLTFLoader();

// Optional: Provide a DRACOLoader instance to decode compressed mesh data
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath( '/examples/jsm/libs/draco/' );
loader.setDRACOLoader( dracoLoader );

const links = [];


function addGLTF(gltf_path, gltf_link, gltf_position_x, gltf_position_y, gltf_position_z, gltf_scale_x, gltf_scale_y, gltf_scale_z, gltf_rotation_x, gltf_rotation_y, gltf_rotation_z){
	// Load a glTF resource
	loader.load(
		// resource URL
		gltf_path,
		// called when the resource is loaded
		function ( gltf ) {

			gltf.scene.position.set(gltf_position_x, gltf_position_y, gltf_position_z)
			gltf.scene.scale.set(gltf_scale_x, gltf_scale_y, gltf_scale_z)
			gltf.scene.rotation.set(gltf_rotation_x, gltf_rotation_y, gltf_rotation_z)
			gltf.scene.userData.link = gltf_link
			// console.log(gltf.scene)
			links.push(gltf.scene);
			scene.add( gltf.scene );
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

addGLTF('/static/model/Notebook/scene.gltf', 'https://www.google.fr', 250, -100, -150, 4.5, 4.5, 4.5, 0, -10, 0);
addGLTF('/static/model/Laptop2/scene.gltf', 'https://www.google.fr', -300, -80, 45, 14, 14, 14, 0, 1, 0);
addGLTF('/static/model/Drawer/scene.gltf', 'https://www.google.fr', -140, -380, -500, 50, 50, 50, 0, 5.5, 0);
addGLTF('/static/model/Sneaker/scene.gltf', 'https://www.google.fr', -280, -380, -280, 200, 200, 200, 0, 3, 0);
addGLTF('/static/model/Sneaker/scene.gltf', 'https://www.google.fr', -220, -380, -280, 200, 200, 200, 0, 3, 2);

const linkable_cubes = [];

function add_linkable_cube(id_panel, cube_position_x, cube_position_y, cube_position_z, cube_scale_x, cube_scale_y, cube_scale_z, cube_rotation_x, cube_rotation_y, cube_rotation_z) {
	const geometry = new THREE.BoxGeometry(cube_scale_x, cube_scale_y, cube_scale_z);
  const material = new THREE.MeshStandardMaterial({
		color: 0xff0000, // Couleur du matériau (rouge)
		transparent: true, // Activation de la transparence
		opacity: 0.0 // Niveau de transparence (0.0 = totalement transparent, 1.0 = opaque)
	});
  const linkable_cube = new THREE.Mesh(geometry, material);
	linkable_cube.userData.id = id_panel;
	linkable_cube.position.set(cube_position_x, cube_position_y, cube_position_z);
	linkable_cube.rotation.set(cube_rotation_x, cube_rotation_y, cube_rotation_z);

	linkable_cubes.push(linkable_cube);
	scene.add(linkable_cube);
}

add_linkable_cube('4', 250, -100, -150, 80, 10, 50, 0, -10, 0);
add_linkable_cube('5', -300, -65, 45, 50, 30, 50, 0, 1, 0);
add_linkable_cube('6', -140, -380, -500, 200, 220, 115, 0, 5.5, 0);
add_linkable_cube('7', -245, -380, -280, 80, 50, 100, 0, 3, 0);


//----------
// Raycaster
//----------
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Eventlistener (onClick)
canvas.addEventListener('click', onClick);

function onClick(event) {
    const rect = canvas.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    mouse.x = x;
    mouse.y = y;

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(posters, true);
    const intersectsLinkableCubes = raycaster.intersectObjects(linkable_cubes, true);

    if (intersects.length > 0) {
        // Au click
        const object = intersects[0].object;
			
				const objectId = document.getElementById(object.userData.id);

				toggleHidden(objectId)

        console.log(`Forme géométrique touchée : ${object.userData.id}`);
    }

		if (intersectsLinkableCubes.length > 0) {
			// Au click
			const object = intersectsLinkableCubes[0].object;
		
			const objectId = document.getElementById(object.userData.id);

			toggleHidden(objectId)

			console.log(`Forme géométrique touchée : ${object.userData.id}`);
	}
}

function toggleHidden(element){
	if (element.classList.contains('hidden')) {
		element.classList.remove('hidden');
		element.classList.add('visible');
	}
}
