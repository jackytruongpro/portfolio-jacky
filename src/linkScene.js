import * as THREE from "three"
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// linkScene
const linkScene = new THREE.Scene(); 

const canvas = document.querySelector(".link");


//---------
// Axe helper
//---------
const axesHelper = new THREE.AxesHelper( 5 );
linkScene.add( axesHelper );


//---------
// Sizes
//---------
const sizes = {
    width: 1400,
    height: 600
}


//---------
// Camera
//---------
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height); 
camera.position.z = 10
linkScene.add( camera );


//---------
// Renderer
//---------
const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true
})
renderer.setSize( sizes.width, sizes.height );
renderer.setClearColor( 0x000000, 0 ); 

renderer.render( linkScene, camera );


//---------
// Import 3D Model
//---------

const gltfLoader = new GLTFLoader();
gltfLoader.load('/static/model/github_octocat/scene.gltf', (gltfScene) => {
	linkScene.scene.add(gltfScene.scene);
})