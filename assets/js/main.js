if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

var composer, renderer, camera;
var box, torus;
var mouseX = 0;
var mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

window.addEventListener( 'resize', onWindowResize, false );
document.addEventListener( 'mousemove', onDocumentMouseMove, false );
document.addEventListener( 'click', onDocumentMouseClick, false );

var scene1, scene2;
init();
animate();

function init() {

  camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 100 );
  camera.position.z = 2;

  scene1 = new THREE.Scene();
  scene2 = new THREE.Scene();

  // box = new THREE.Mesh( new THREE.BoxGeometry( 7, 4, 2 ) );
  box = new THREE.Mesh( new THREE.PlaneGeometry( 4, 2, 32 ));

  scene1.add( box );


  // geometry
  var triangles = 1;
  var instances = 4000;

  var geometry = new THREE.InstancedBufferGeometry();

  geometry.maxInstancedCount = instances;
  var vertices = new THREE.BufferAttribute( new Float32Array( triangles * 3 * 3 ), 3 );

  vertices.setXYZ( 0, 0.025, -0.025, 0 );
  vertices.setXYZ( 1, -0.025, 0.025, 0 );
  vertices.setXYZ( 2, 0, 0, 0.025 );

  geometry.addAttribute( 'position', vertices );

  var offsets = new THREE.InstancedBufferAttribute( new Float32Array( instances * 3 ), 3, 1 );

  for ( var i = 0, ul = offsets.count; i < ul; i++ ) {
    offsets.setXYZ( i, Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5 );
  }
  geometry.addAttribute( 'offset', offsets );


  var vector = new THREE.Vector4();

  var orientationsStart = new THREE.InstancedBufferAttribute( new Float32Array( instances * 4 ), 4, 1 );

  for ( var i = 0, ul = orientationsStart.count; i < ul; i++ ) {

    vector.set( Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1 );
    vector.normalize();

    orientationsStart.setXYZW( i, vector.x, vector.y, vector.z, vector.w );
  }

  geometry.addAttribute( 'orientationStart', orientationsStart );

  var orientationsEnd = new THREE.InstancedBufferAttribute( new Float32Array( instances * 4 ), 4, 1 );

  for ( var i = 0, ul = orientationsEnd.count; i < ul; i++ ) {

    vector.set( Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1 );
    vector.normalize();

    orientationsEnd.setXYZW( i, vector.x, vector.y, vector.z, vector.w );
  }

  geometry.addAttribute( 'orientationEnd', orientationsEnd );

  // material
  var material = new THREE.RawShaderMaterial( {

    uniforms: {
      time: { value: 16.0 },
      sineTime: { value: 1.0 }
    },
    vertexShader: document.getElementById( 'vertexShader' ).textContent,
    transparent: true
  } );

  var mesh = new THREE.Mesh( geometry, material );
  scene2.add( mesh );

  // end
  renderer = new THREE.WebGLRenderer( { antialias: false } );
  // renderer.setClearColor( 0xe0e0e0 );
  // renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.autoClear = false;
  document.body.appendChild( renderer.domElement );

  //

  var clearPass = new THREE.ClearPass();
  var clearMaskPass = new THREE.ClearMaskPass();

  var maskPass1 = new THREE.MaskPass( scene1, camera );
  var maskPass2 = new THREE.MaskPass( scene2, camera );

  var texture1 = new THREE.TextureLoader().load( 'assets/images/rgb2.jpg' );
  var texture2 = new THREE.TextureLoader().load( 'assets/images/test.jpg' );

  var texturePass1 = new THREE.TexturePass( texture1);
  var texturePass2 = new THREE.TexturePass( texture2, 1 );


  var outputPass = new THREE.ShaderPass( THREE.CopyShader );
  outputPass.renderToScreen = true;

  var parameters = {
    minFilter: THREE.LinearFilter,
    magFilter: THREE.LinearFilter,
    format: THREE.RGBFormat,
    stencilBuffer: true
  };

  var renderTarget = new THREE.WebGLRenderTarget( window.innerWidth, window.innerHeight, parameters );

  composer = new THREE.EffectComposer( renderer, renderTarget );
  composer.addPass( clearPass );
  composer.addPass( maskPass1 );
  composer.addPass( texturePass1 );
  composer.addPass( clearMaskPass );
  composer.addPass( maskPass2 );
  composer.addPass( texturePass2 );
  composer.addPass( clearMaskPass );
  composer.addPass( outputPass );

}


function onWindowResize() {

  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
  composer.setSize( window.innerWidth, window.innerHeight );

}

function onDocumentMouseMove(event) {

  mouseX = ( event.clientX - windowHalfX ) / 100;
  mouseY = ( event.clientY - windowHalfY ) / 100;
  // console.log( mouseX - 10 )
}
function onDocumentMouseClick(event) {

  TweenMax.fromTo( object.material.uniforms.time, 3, {value: 16}, {value: -5});
  // object.material.uniforms.time.value = -5;
  // console.log(object.material.uniforms.time.value);
}
var object
function animate() {

  requestAnimationFrame( animate );

  var time = performance.now();
  object = scene2.children[0];
  object.rotation.y = time * 0.0005;
  // console.log(time * 0.005)
  // object.material.uniforms.time.value = time * 0.005;
  object.material.uniforms.sineTime.value = Math.sin( object.material.uniforms.time.value * 0.05 );

  // object.material.uniforms.time.value = -1;
  // object.material.uniforms.sineTime.value = Math.sin( object.material.uniforms.time.value * 0.05 );

  // console.log( object.material.uniforms.time.value, object.material.uniforms.sineTime.value )
  // renderer.clear();
  // renderer.render(scene1, camera);
  composer.render( );
}