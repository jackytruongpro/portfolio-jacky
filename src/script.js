import * as THREE from "three"
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
const axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );


//---------
// Camera
//---------
const camera = new THREE.PerspectiveCamera(70, sizes.width / sizes.height);
camera.position.z = 10;
scene.add(camera);

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
// Renderer
//---------
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);


//---------
// Controls
//---------
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.maxPolarAngle = (Math.PI / 2) + 0.1

const tick = () => {
	controls.update();
	renderer.render(scene, camera);
	window.requestAnimationFrame(tick);
}
tick()


//---------
// Objects
//---------

// Poster
const posters = [];

function add_poster(poster_id, poster_name, poster_width, poster_height, poster_position_x, poster_position_y, poster_position_z) {
	const geometry = new THREE.PlaneGeometry( poster_width, poster_height );
	const material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
	const poster = new THREE.Mesh( geometry, material );
	poster.userData.id = poster_id;
	poster.name = poster_name;
	poster.position.x = poster_position_x;
	poster.position.y = poster_position_y;
	poster.position.z = poster_position_z;
	// poster.rotation.y = -150;
	posters.push(poster);
	scene.add(poster);
}

add_poster(1,'Poster 1', 200, 261, -500, 0, -1000);
add_poster(2,'Poster 2', 200, 261, 0, 0, -1000);
add_poster(3,'Poster 3', 200, 261, 500, 0, -1000);


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

    if (intersects.length > 0) {
        // Au click
        const object = intersects[0].object;
			
				const objectId = document.getElementById(object.userData.id);

				toggleHidden(objectId)

        console.log(`Forme géométrique touchée : ${object.userData.id}`);
    }
}

closeButton.addEventListener('click', function(){
	console.log(closeButton.parent.nodeName);
})

function toggleHidden(element){
	if (element.classList.contains('hidden')) {
		element.classList.remove('hidden');
		// element.classList.add('visible');
	} else {
		// element.classList.remove('visible');
		element.classList.add('hidden');
	}
}


// canvas.addEventListener('mouseover', onMouseMove);

// function onMouseMove(event) {
//   const rect = canvas.getBoundingClientRect();
//   const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
//   const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
//   mouse.x = x;
//   mouse.y = y;

//   raycaster.setFromCamera(mouse, camera);

//   const intersects = raycaster.intersectObjects(posters, true);

//   if (intersects.length > 0) {
//     const object = intersects[0].object;
//     alert(`Forme géométrique survolée : ${object.name}`);
//   }
// }