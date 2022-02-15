const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.CylinderGeometry( 15, 15, 20, 32 );
const material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
const cylinder = new THREE.Mesh( geometry, material );
scene.add( cylinder );

const light = new THREE.AmbientLight(0x404040);
scene.add( light );

camera.position.z = 50;

function animate() {
	requestAnimationFrame( animate );

	cylinder.rotation.x += 0.01;
	cylinder.rotation.y += 0.01;

	renderer.render( scene, camera );
};

animate();