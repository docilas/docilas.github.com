if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

var container;

var camera, scene, renderer, effect;

var mesh1, mesh2, circle, triangle;
var spheres = [];

var mouseX = 0;
var mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

document.addEventListener( 'mousemove', onDocumentMouseMove, false );

init();
animate();

function init() {

	container = document.createElement( 'div' );
	document.body.appendChild( container );

	renderer = new THREE.WebGLRenderer( { antialias: false } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );


	camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.set(0,0,300);

	scene = new THREE.Scene();

	var texture = new THREE.TextureLoader();
	var tex_bg = new THREE.TextureLoader().load( "assets/images/bg6.jpg" );
	var tex_circ = new THREE.TextureLoader().load( "assets/images/bg6.jpg" );
	var tex_tri = new THREE.TextureLoader().load( "assets/images/bg6.jpg" );

	tex_tri.offset.set(0,0,0);

	circle = new THREE.SphereGeometry( 300, 100, 100 );
	circle.applyMatrix( new THREE.Matrix4().makeScale( 1, -1, 1 ) );

	triangle = new THREE.TetrahedronGeometry( 150, 0 );

	// var material = new THREE.MeshBasicMaterial( {
	// 	map: texture,
	// 	side: THREE.DoubleSide
	// } );

	mesh1 = new THREE.Mesh( circle, new THREE.MeshBasicMaterial( {
		map: tex_circ,
		side: THREE.DoubleSide
	} ) );
	mesh1.position.z= -300;

	mesh2 = new THREE.Mesh( triangle, new THREE.MeshBasicMaterial( {
		map: tex_tri,
		side: THREE.DoubleSide
	} ) );
	mesh2.position.z= 30;
	mesh2.rotation.x = .2;
	mesh2.rotation.y = 2.4;


	scene.background = tex_bg;
	// scene.add( mesh1 );
	// scene.add( mesh2 );
	scene.add( camera );




	var width = window.innerWidth || 2;
	var height = window.innerHeight || 2;

	effect = new THREE.AnaglyphEffect( renderer );
	effect.setSize( width, height );

	//

	window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

	windowHalfX = window.innerWidth / 2;
	windowHalfY = window.innerHeight / 2;

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	effect.setSize( window.innerWidth, window.innerHeight );

}

function onDocumentMouseMove(event) {

	mouseX = ( event.clientX - windowHalfX ) / 100;
	mouseY = ( event.clientY - windowHalfY ) / 100;

}

//

function animate() {

	requestAnimationFrame( animate );

	render();

}

function render() {

	var timer = 0.0001 * Date.now();


	camera.lookAt( scene.position );

	camera.position.x += ( mouseX - camera.position.x ) * .05;
	camera.position.y += ( - mouseY - camera.position.y ) * .05;

	mesh1.rotation.x += 0.0005;
	mesh1.rotation.y += 0.0005;
	mesh1.rotation.z -= 0.0005;

	// mesh2.rotation.x += 0.0005;
	mesh2.rotation.y += 0.005;
	// mesh2.rotation.z -= 0.0005;
	// console.log( mesh2.rotation.y )

	// mesh.position.x = 50 * Math.cos( timer );
	// mesh.position.y = 50 * Math.sin( timer );


	effect.render( scene, camera );
	// renderer.render(scene, camera);

}