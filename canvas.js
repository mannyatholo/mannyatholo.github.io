var scene, renderer, camera, controls, shape;

var WIDTH = 400,
    HEIGHT = 400,
    PIXEL_RATIO = window.devicePixelRatio || 1;

var radius = 10,
    bgColor = 0x15233A;

function initScene() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(15, 1, .1, 2000);
  camera.position.z = 100;

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setClearColor( bgColor );
  renderer.setPixelRatio( PIXEL_RATIO );
  renderer.setSize( WIDTH, HEIGHT );

  container = document.getElementById( 'scene' );
  container.appendChild( renderer.domElement );

  controls = new THREE.OrbitControls( camera, renderer.domElement );
  controls.enableZoom = false;
  controls.enablePan = false;
  controls.enableDamping = true;
  controls.dampingFactor = 0.1;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 0.5;
  controls.rotateSpeed = 0.15;

  // Lights
  var ambientLight = new THREE.AmbientLight( 0x000000 );
	camera.add( ambientLight );

	var lights = [];
	lights[ 0 ] = new THREE.PointLight( 0x2363D0, 2, 0 );
	lights[ 1 ] = new THREE.PointLight( 0xCC3F4A, 0.6, 0 );
	lights[ 2 ] = new THREE.PointLight( 0x5342A0, 1, 0 );

	lights[ 0 ].position.set( 100, 70, -50 );
	lights[ 1 ].position.set( -50, -100, -50 );
	lights[ 2 ].position.set( - 100, 100, -50 );

	camera.add( lights[ 0 ] );
	camera.add( lights[ 1 ] );
	camera.add( lights[ 2 ] );

  scene.add( camera );

  // Build scene objects
  var material = new THREE.MeshLambertMaterial();


	var icosahedronGeometry = new THREE.IcosahedronGeometry( radius*1.099 );
  icosahedronGeometry.computeFlatVertexNormals();
	var icosahedron = new THREE.Mesh( icosahedronGeometry, material );

  var dodecahedronGeometry = new THREE.DodecahedronGeometry( radius );
  dodecahedronGeometry.computeFlatVertexNormals();
  dodecahedronGeometry.rotateY(Math.PI/2);
	var dodecahedron = new THREE.Mesh( dodecahedronGeometry, material );

  scene.add( icosahedron );
  scene.add( dodecahedron );

  loop();
}


function loop() {
  controls.update();
  renderer.render(scene, camera);

  requestAnimationFrame(loop);
}

initScene();
