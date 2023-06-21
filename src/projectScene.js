import * as THREE from "three"

// projectScene 
const projectScene = new THREE.Scene(); 

const canvas = document.querySelector(".project");

//---------
// Axe helper
//---------
const axesHelper = new THREE.AxesHelper( 5 );
projectScene.add( axesHelper );

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
	projectScene.add(poster);
}

add_poster(1,'Poster 1', 600, 600, -650, 0, -1000);

add_poster(3,'Poster 3', 600, 600, 0, 0, -1000);

add_poster(4,'Poster 4', 600, 600, 650, 0, -1000);

// Light
const light = new THREE.AmbientLight( 0x404040 ); 
projectScene.add( light );


// Sizes
const sizes = {
    width: 1400,
    height: 600
}

// Camera 
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height); 
camera.position.z = 10
projectScene.add( camera );

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true
})
renderer.setSize( sizes.width, sizes.height );
renderer.setClearColor( 0x000000, 0 ); 

renderer.render( projectScene, camera );
