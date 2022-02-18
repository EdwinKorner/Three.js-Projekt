const winWidth = window.innerWidth;
const winHeight = window.innerHeight;
// global variables
let scene, camera, renderer, controls, cube, rain, starGeo, rainCount = 15000;
let objects = [];

const gui = new dat.GUI();

init();
update();
function init() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x121212);
  camera = new THREE.PerspectiveCamera(75, winWidth / winHeight, 0.01, 1000);
  camera.position.set(0, 0, 40);
  camera.position.z = 3;

//lighting
  const hemisphere = new THREE.HemisphereLight(0xffffff, 0xff0000, 1);
  scene.add(hemisphere);
const directional = new THREE.DirectionalLight(0xffffff, 0.5);
  scene.add(directional);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(winWidth, winHeight);
//geometry
  const geometry = new THREE.BoxGeometry(1, 1, 1);

//random color function
  function generateRandomColor() {
	var letters = '0123456789ABCDEF';
	var color = '#';
	
	for (var i = 0; i < 6; i++) {
	  color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
	
  }
  var randomColor=generateRandomColor();

  //material

  
  const material = new THREE.MeshStandardMaterial({
	color: randomColor,
	metalness: 0.4,
	roughness: 0.4,
});
  

  const materialGUI = gui.addFolder("Material");
  materialGUI.add(material, 'metalness', 0, 1);
  materialGUI.add(material, 'roughness', 0, 1);
  

  
  //mesh
  cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  objects.push(cube);
  
//onclick for raycaster
  document.addEventListener("mousedown", onMouseDown);
function onMouseDown(event) {
    event.preventDefault();

    const mouse3D = new THREE.Vector3(
      (event.clientX / window.innerWidth) * 2 - 1,
      -(event.clientY / window.innerheight) * 2 - 1,
      0.5
    );
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse3D, camera);
    const intersects = raycaster.intersectObjects(objects);
if (intersects.length > 0) {
      intersects[0].object.material.color.setHex(Math.random() * 0xffffff);
    }
  }

  // append container to dom element
  document.getElementById("container").appendChild(renderer.domElement);
  
  //stars in background
  
  
  starGeo = new THREE.PlaneGeometry();
  for(let i=0;i<rainCount;i++) {
    star = new THREE.Vector3(
      Math.random() * 400 - 200,
      Math.random() * 500 - 250,
      Math.random() * 400 - 200
    );
    star.velocity = {};
    star.velocity = 0;
    starGeo.vertices.push(star);
  }
  rainMaterial = new THREE.PointsMaterial({
    color: 0xaaaaaa,
    size: 0.1,
    transparent: true
  });
  rain = new THREE.Points(starGeo,rainMaterial);
  scene.add(rain);
  starGeo.vertices.forEach(p => {
    p.velocity -= 0.1 + Math.random() * 0.1;
    p.y += p.velocity;
  });
}

// update loop
function update() {
  requestAnimationFrame(update);
  renderer.render(scene, camera);
  //rotation for cube
  cube.rotation.x += 0.005;
  cube.rotation.y += 0.005;
}

