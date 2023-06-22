import * as THREE from "three"

//---------
// Scene
//---------
const technoScene = new THREE.Scene(); 
const canvas = document.querySelector(".techno3");

//---------
// Axe helper
//---------
const axesHelper = new THREE.AxesHelper( 5 );
technoScene.add( axesHelper );


//---------
// Light
//---------
const spotLight = new THREE.SpotLight( 0xffffff );
spotLight.position.set( 0, -300, 500 );
// spotLight.castShadow = true;
technoScene.add( spotLight );


//---------
// Sizes
//---------
const sizes = {
    width: 1400, 
    height: 450
}


//---------
// Camera
//---------
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height); 
camera.position.z = 10
technoScene.add( camera );


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
// Animate
//---------
const animate = () => {
    renderer.render( technoScene, camera );
    window.requestAnimationFrame( animate );
}

animate()


//---------
// Technos
//---------
const technos = [];

function add_techno(techno_position_x, techno_name, techno_link, techno_image) {
  const textureLoader = new THREE.TextureLoader();
  const textureTechno = textureLoader.load(techno_image);
  
  const techno = new THREE.Mesh(
    new THREE.BoxGeometry(1.5, 1.5, 1.5),
    new THREE.MeshStandardMaterial({
      map: textureTechno,
      face: THREE.DoubleSide
    })
  )
  techno.position.x = techno_position_x;
  techno.position.y = 0;
  techno.position.z = 0;
  techno.name = techno_name;
  techno.userData.link = techno_link;
  techno.isDraggable = true;
  technos.push(techno)
  technoScene.add(techno);

  const animate = () => {
    techno.rotation.y += 0.01
    window.requestAnimationFrame( animate );
  }

  animate();

  let isMouseDownTechno = false;
  let selectedTechno = null;
  let rotationSpeedTechno = 0.005;

  canvas.addEventListener('mousedown', onMouseDownTechno, false);
  canvas.addEventListener('mouseup', onMouseUpTechno, false);
  canvas.addEventListener('mousemove', onMouseMoveTechno, false);

  let previousMousePositionTechno = {
    x: 0,
    y: 0
  };

  function onMouseDownTechno(event) {
    isMouseDownTechno = true;
  
    const intersects = raycaster.intersectObjects(technos, true);
  
    if (intersects.length > 0) {
      selectedTechno = intersects[0].object;
    }
  }
  
  function onMouseUpTechno() {
    isMouseDownTechno = false;
    selectedTechno = null;
  }
  
  function onMouseMoveTechno(event) {
    if (isMouseDownTechno && selectedTechno) {
      const currentMousePosition = {
        x: event.clientX,
        y: event.clientY
      };
  
      const deltaMove = {
        x: currentMousePosition.x - previousMousePositionTechno.x,
        y: currentMousePosition.y - previousMousePositionTechno.y
      };
  
      selectedTechno.rotation.y += deltaMove.x * rotationSpeedTechno;
      selectedTechno.rotation.x += deltaMove.y * rotationSpeedTechno;
  
      previousMousePositionTechno = currentMousePosition;
    }
  }
  

}

add_techno(-6,'Flutter', 'https://tickets-siae.com/fr/', '/static/image/techno/logo-flutter.png');
add_techno(-3,'Dart', 'https://tickets-siae.com/fr/', '/static/image/techno/logo-dart.png');
add_techno(0,'Node', 'https://tickets-siae.com/en/', '/static/image/techno/logo-node.png');
add_techno(3,'Firebase', 'https://tickets-siae.com/fr/', '/static/image/techno/logo-firebase.png');
add_techno(6,'Flutterflow', 'https://tickets-siae.com/fr/', '/static/image/techno/logo-flutterflow.png');

//----------
// On techno click
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

    const intersects = raycaster.intersectObjects(technos, true);

    if (intersects.length > 0) {
        const object = intersects[0].object;
				const objectId = document.getElementById(object.userData.link);
        // window.open(object.userData.link);
    }
}
