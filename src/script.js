import * as THREE from "three"

const scene = new THREE.Scene();
scene.background = new THREE.CubeTextureLoader()
	.setPath( '../static/textures/roomCube/' )
	.load( [
		'px.png',
		'nx.png',
		'py.png',
		'ny.png',
		'pz.png',
		'nz.png'
	] );

// Sizes
const sizes = {
    width: 800, 
    height: 600
}

// Camera 
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height); 
camera.position.z = 10
scene.add( camera );

// Renderer
const canvas = document.querySelector(".webgl");

const renderer = new THREE.WebGLRenderer({
    canvas
})
renderer.setSize( sizes.width, sizes.height );
