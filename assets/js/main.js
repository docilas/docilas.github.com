if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

var scene1, scene2;
var composer, renderer, camera;
var box;

var bgWidth, bgHeight;
var bgObj;
var ax = 0,
    ay = 0;


// define Timeline animation
var bgType1 = new TimelineMax({ repeat:-1, repeatDelay:1, yoyo:true, paused:true });
var bgType2 = new TimelineMax({ paused:true, delay:3 });


var turbVal = { val: 0.000001 };
var turb = $('#noise feTurbulence')[0];
var noiseEffect = new TimelineMax({ paused: true, repeat:-1, repeatDelay:3, onUpdate: function() {
  turb.setAttribute('baseFrequency', '0 ' + turbVal.val);
} });

noiseEffect.to(turbVal, .2, { val: .7 });
noiseEffect.to(turbVal, .4, { val: 0.000001 });

//add event
window.addEventListener( 'resize', onWindowResize, false );



init();
animate();





// set canvas size
function getBgSize() {
  if( window.innerWidth >= window.innerHeight*2 ){
    bgWidth = window.innerWidth;
    bgHeight = window.innerWidth/2;
  }
  else{
    bgWidth = window.innerHeight*2;
    bgHeight = window.innerHeight;
  }

}

function init() {
  getBgSize();

  camera = new THREE.PerspectiveCamera( 50, bgWidth / bgHeight, 1, 100 );
  camera.position.z = 2;

  scene1 = new THREE.Scene();
  scene2 = new THREE.Scene();


  box = new THREE.Mesh( new THREE.PlaneGeometry( 4, 2, 32 ));

  scene1.add( box );


  // geometry
  var triangles = 1;
  var instances = 3500;

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
      time: { value: 18.0 },
      sineTime: { value: 1.0 }
    },
    vertexShader: document.getElementById( 'vertexShader' ).textContent,
    transparent: true
  } );

  var mesh = new THREE.Mesh( geometry, material );
  scene2.add( mesh );

  // end
  renderer = new THREE.WebGLRenderer( { antialias: false } );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( bgWidth, bgHeight );
  renderer.autoClear = false;

  $('#bg').append( renderer.domElement )

  //mask
  var clearPass = new THREE.ClearPass();
  var clearMaskPass = new THREE.ClearMaskPass();

  var maskPass1 = new THREE.MaskPass( scene1, camera );
  var maskPass2 = new THREE.MaskPass( scene2, camera );

  var texture1 = new THREE.TextureLoader().load( 'assets/images/bg1.jpg' );
  var texture2 = new THREE.TextureLoader().load( 'assets/images/bg1b.jpg' );

  var texturePass1 = new THREE.TexturePass( texture1 );
  var texturePass2 = new THREE.TexturePass( texture2, .85 );


  var outputPass = new THREE.ShaderPass( THREE.CopyShader );
  outputPass.renderToScreen = true;

  var parameters = {
    minFilter: THREE.LinearFilter,
    magFilter: THREE.LinearFilter,
    format: THREE.RGBFormat,
    stencilBuffer: true
  };

  var renderTarget = new THREE.WebGLRenderTarget( bgWidth, bgHeight, parameters );

  composer = new THREE.EffectComposer( renderer, renderTarget );
  composer.addPass( clearPass );
  composer.addPass( maskPass1 );
  composer.addPass( texturePass1 );
  composer.addPass( clearMaskPass );
  composer.addPass( maskPass2 );
  composer.addPass( texturePass2 );
  composer.addPass( clearMaskPass );
  composer.addPass( outputPass );

  bgObj = scene2.children[0];

  bgType1.to( bgObj.material.uniforms.time, 8, {value: 10, ease: Circ.easeInOut });

  bgType2.to( bgObj.material.uniforms.time, 5, {value: -4, ease: Circ.easeInOut });

  setBgAni(1);
  $('.sec_home').addClass('show');

}




// set BG Animation type
function setBgAni(type) {

  if (type==1){
    bgType2.stop();
    TweenMax.to( bgObj.material.uniforms.time, 18, {value: 18, ease: Circ.easeInOut, onComplete:cont });


  }
  else if(type==2){
    bgType1.stop();
    bgType2.play();
  }

  function cont() {
    bgType1.play();
  }

}


function onWindowResize() {
  getBgSize();

  camera.aspect = bgWidth / bgHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( bgWidth, bgHeight );

}

$('.sec_home').on('mousemove', function(e) {
  ax = -(window.innerWidth / 2 - e.clientX)/ window.innerWidth;
  ay = (window.innerHeight / 2 - e.clientY) / window.innerHeight;
})

function animate() {
  requestAnimationFrame( animate );
  var time = performance.now();



  bgObj.rotation.z = time * 0.0002;
  bgObj.rotation.y =  ax||0;
  bgObj.rotation.x =  ay||0;

  // shake glitch
  // bgObj.position.x = .02 * Math.sin( time );

  bgObj.material.uniforms.sineTime.value = Math.sin( bgObj.material.uniforms.time.value * 0.05 );

  composer.render( );
}



// work hover mouser event
$('.sec_work .block').on('mouseenter', function() {
  var $this = $(this);
  TweenMax.set($this, {className:'+=do_glitch'});
  TweenMax.set($this, {className:'-=do_glitch', delay: 1.5});
  noiseEffect.restart();
});

// $('.sec_work').on('mouseenter', function() {
//   setBgAni(1);
// });






