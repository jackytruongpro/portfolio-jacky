import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// illustrationScene 
const illustrationScene = new THREE.Scene(); 

const canvas = document.querySelector(".illustration1");

const illustrations = [];

function add_illustration(illustration_position_x, illustration_front, illustration_back) {
	const illustrationGeometry = new THREE.BoxGeometry(5.5, 5.5, 0);
  const textureLoader = new THREE.TextureLoader();

	const textureillustration = [
		new THREE.MeshStandardMaterial({
			map: textureLoader.load(null)
		}),
		new THREE.MeshStandardMaterial({
			map: textureLoader.load(null)
		}),
		new THREE.MeshStandardMaterial({
			map: textureLoader.load(null)
		}),
		new THREE.MeshStandardMaterial({
			map: textureLoader.load(null)
		}),
		new THREE.MeshStandardMaterial({
			map: textureLoader.load(illustration_front)
		}),
		new THREE.MeshStandardMaterial({
			map: textureLoader.load(illustration_back)
		}),
	]

	const illustration = new THREE.Mesh(illustrationGeometry, textureillustration);

  illustration.position.x = illustration_position_x;
  illustration.position.y = 0;
  illustration.position.z = 0;
  illustration.isDraggable = true;
	illustrations.push(illustration);
  illustrationScene.add(illustration);

  let isMouseDown = false;
  let selectedIllustration = null;
  let rotationSpeed = 0.005;

  document.addEventListener('mousedown', onMouseDown);
  document.addEventListener('mouseup', onMouseUp);
  document.addEventListener('mousemove', onMouseMove);

  let previousMousePosition = {
    x: 0,
    y: 0
  };

  function onMouseDown(event) {
    isMouseDown = true;
  
    const intersects = raycaster.intersectObjects(illustrations, true);
  
    if (intersects.length > 0) {
      selectedIllustration = intersects[0].object;
    }
  }
  
  function onMouseUp() {
    isMouseDown = false;
    selectedIllustration = null;
  }
  
  function onMouseMove(event) {
    if (isMouseDown && selectedIllustration) {
      const currentMousePosition = {
        x: event.clientX,
      };
  
      const deltaMove = {
        x: currentMousePosition.x - previousMousePosition.x,
      };
  
      selectedIllustration.rotation.y += deltaMove.x * rotationSpeed;
  
      previousMousePosition = currentMousePosition;
    }
  }
	

}

add_illustration(-6, 'https://plus.unsplash.com/premium_photo-1661921394349-9e3f394d80da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80', 'https://plus.unsplash.com/premium_photo-1663045239492-f1289d9440f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8UExPTUJFUiUyMGNsaWVudHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60');
add_illustration(0, 'https://images.unsplash.com/photo-1558655146-364adaf1fcc9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80', 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80');
add_illustration(6, 'https://images.unsplash.com/photo-1651919706265-8bb1c3b51e25?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80', 'https://images.unsplash.com/photo-1518458028785-8fbcd101ebb9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80');


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

    const intersects = raycaster.intersectObjects(illustrations, true);

    if (intersects.length > 0) {
        const object = intersects[0].object;
				const objectId = document.getElementById(object.userData.link);
        // window.open(object.userData.link);
    }
}


// Light
const light = new THREE.AmbientLight( 0xffffff ); 
illustrationScene.add( light );


// Sizes
const sizes = {
    width: 1400,
    height: 600
}

// Camera 
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height); 
camera.position.z = 10
illustrationScene.add( camera );

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true
})
renderer.setSize( sizes.width, sizes.height );
renderer.setClearColor( 0x000000, 0 ); 

// renderer.render( illustrationScene, camera );

// const controls = new OrbitControls(camera, canvas);
// controls.enableDamping = true;

const animate = () => {
    // controls.update();

    renderer.render( illustrationScene, camera );

    window.requestAnimationFrame( animate );
}

animate()