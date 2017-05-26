$(function() {
  let bg_z = -10,
      bg_r = Math.abs(bg_z / 10);
  let count = 0;
  let imgLoaded, imgTotal;
  const power = 7;
  let workIndex = -1;
  let workPrev, workNow;
  const workNum = $('.sec_work .work').length;
  let animating = false;
  let viewArea = 'home';
  let viewBack = '';

  let workInnerText;
  let jsonLoad = false;
  let isDesktop;

  getDevice();
  function getDevice(){
    if (device.mobile() || device.tablet()) {
      isDesktop = false;
    }
    else{
      isDesktop = true;
    }
  }


  //json load
  $.ajax({
    dataType: "json",
    url: 'work_inner.json',
    success: function(result, status){
      workInnerText = result;
      jsonLoad = true;
    }
  });

  // font load
  WebFontConfig = {
    loading: function() {
      console.log('font loading')
    },
    active: function() {
      console.log('font active');
      // imageload
      imgLoad( 'body', init);
    },
    google: {
      families: ['Poppins:400,700']
    }
  };
  WebFont.load(WebFontConfig);

  // pixi background
  const app = new PIXI.Application(window.innerWidth, window.innerHeight);
  $('#bg').append(app.view);

  container = new PIXI.Container();

  const displacementSprite = PIXI.Sprite.fromImage('assets/images/filter.png');
  const displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite);

  displacementSprite.anchor.set(0.5);
  displacementSprite.position= {x: app.renderer.width / 2, y: app.renderer.height / 2};

  const bg = PIXI.Sprite.fromImage('assets/images/bg.jpg');

  setBgSize();
  bg.anchor.set(0.5);
  bg.position= {x: app.renderer.width / 2, y: app.renderer.height / 2};

  // pixi text
  const pixiText = (window.innerWidth < 1000 )? 'CHIH\nYUAN\nKUO': 'CHIH YUAN KUO';
  let pixiTextSize;
  if ( window.innerWidth > 1366 )
    pixiTextSize = 150;
  else if ( window.innerWidth > 480 )
    pixiTextSize = 100;
  else
    pixiTextSize = 80;

  const text1 = new PIXI.Text(pixiText, {
    fontWeight: 700,
    fontSize: pixiTextSize,
    fontFamily: 'Poppins',
    fill: '#333',
    align: 'center',
    strokeThickness: 0
  });
  text1.anchor.set(.5);
  text1.blendMode = PIXI.BLEND_MODES.ADD;
  text1.position= {x: app.renderer.width / 2, y: app.renderer.height / 2};

  const textLft = new PIXI.Text(pixiText, {
    fontWeight: 700,
    fontSize: pixiTextSize,
    fontFamily: 'Poppins',
    fill: '#FC577D',
    align: 'center',
    strokeThickness: 0
  });
  textLft.anchor.set(.5);
  textLft.blendMode = PIXI.BLEND_MODES.ADD;
  textLft.position= {x: app.renderer.width / 2, y: app.renderer.height / 2};
  textLft.alpha = 0;

  const textRig = new PIXI.Text(pixiText, {
    fontWeight: 700,
    fontSize: pixiTextSize,
    fontFamily: 'Poppins',
    fill: '#54F3B7',
    align: 'center',
    strokeThickness: 0
  });
  textRig.anchor.set(.5);
  textRig.blendMode = PIXI.BLEND_MODES.ADD;
  textRig.position= {x: app.renderer.width / 2, y: app.renderer.height / 2};
  textRig.alpha = 0;



  // title animation
  const tl = new TimelineMax({ repeat: 1, repeatDelay: .1, paused: true});
    tl.to( textLft, .05, {alpha: .4, x: text1.x -power, y: text1.y +power, ease:Circ.easeOut })
      .to( textRig, .05, {alpha: .4, x: text1.x +power, y: text1.y -power, ease:Circ.easeOut }, "-=.05")
      .to( textLft, .05, {x: text1.x -power, y: text1.y -power, ease:Circ.easeOut })
      .to( textRig, .05, {x: text1.x +power, y: text1.y +power, ease:Circ.easeOut }, "-=.05")
      .to( textLft, .05, {x: text1.x +power, y: text1.y +power, ease:Circ.easeOut })
      .to( textRig, .05, {x: text1.x -power, y: text1.y -power, ease:Circ.easeOut }, "-=.05")
      .to( textLft, .05, {x: text1.x +power, y: text1.y -power, ease:Circ.easeOut })
      .to( textRig, .05, {x: text1.x -power, y: text1.y +power, ease:Circ.easeOut }, "-=.05")
      .to( textLft, .05, {x: text1.x, y: text1.y, ease:Circ.easeOut })
      .to( textRig, .05, {x: text1.x, y: text1.y, ease:Circ.easeOut }, "-=.05")
      .to( textLft, .05, {x: text1.x -power, y: text1.y +power, ease:Circ.easeOut }, "+=.2")
      .to( textRig, .05, {x: text1.x +power, y: text1.y -power, ease:Circ.easeOut }, "-=.05")
      .to( textLft, .05, {x: text1.x -power, y: text1.y -power, ease:Circ.easeOut })
      .to( textRig, .05, {x: text1.x +power, y: text1.y +power, ease:Circ.easeOut }, "-=.05")
      .to( textLft, .05, {x: text1.x +power, y: text1.y +power, ease:Circ.easeOut })
      .to( textRig, .05, {x: text1.x -power, y: text1.y -power, ease:Circ.easeOut }, "-=.05")
      .to( textLft, .05, {x: text1.x +power, y: text1.y -power, ease:Circ.easeOut })
      .to( textRig, .05, {x: text1.x -power, y: text1.y +power, ease:Circ.easeOut }, "-=.05")
      .to( textLft, .05, {x: text1.x, y: text1.y, alpha: 0.1, ease:Circ.easeOut })
      .to( textRig, .05, {x: text1.x, y: text1.y, alpha: 0.1, ease:Circ.easeOut }, "-=.05");

  function setBgSize() {
    if (isDesktop) {
      if ( window.innerWidth *.5625 <  window.innerHeight ) {
        bg.scale.set( window.innerHeight / .5625 / 1920 );
      }
      else{
        bg.scale.set( window.innerWidth * .5625 / 1080 );
      }
      TweenMax.set( '.work_list', {y: -$(window).height() * (workIndex+1)});
    }
  }

  function imgLoad(tar, cont) {
    imgLoaded = 0;
    imgTotal = $(`${tar} img`).length;
    TweenMax.to('#loading', .5, { autoAlpha: 1});
    TweenMax.set('#loading .progress', {width: '1%'});


    $(tar).imagesLoaded( { background: true })
      .always( function( instance ) {
        console.log('all images loaded');
        TweenMax.to('#loading', .5, { autoAlpha: 0, delay:.5, onComplete: ()=>{
          if ( typeof cont === 'function')
            cont();
        }});

      })
      .done( function( instance ) {
        console.log('all images successfully loaded');
      })
      .fail( function() {
        console.log('all images loaded, at least one is broken');
      })
      .progress( function( instance, image ) {
        let result = image.isLoaded ? 'loaded' : 'broken';
        console.log( 'image is ' + result + ' for ' + image.img.src );
        imgLoaded++;
        TweenMax.to('#loading .progress', .3, {width: imgLoaded / imgTotal *100 +'%'});
      });
  }

  function init() {
    container.addChild(bg, textLft, textRig, text1);
    container.filters = [displacementFilter];
    app.stage.addChild(container, displacementSprite);

    app.ticker.add(function(delta) {
      count += (isDesktop)?0.05:0.01;
      displacementSprite.rotation += 0.005;
      displacementSprite.scale.x = 2 + Math.sin(count) * 0.2;
      displacementSprite.scale.y = 2 + Math.cos(count) * 0.2;

      if (viewArea=='home') {
        text1.scale.x = 1 + Math.cos(count) * 0.003;
        text1.scale.y = 1 + Math.sin(count) * 0.006;
      }
    });

    TweenMax.fromTo('#bg canvas', 1.5, {z:200 }, {z:bg_z, alpha:1, ease: Sine.easeOut});
    TweenMax.fromTo(text1, 1.5, {alpha: 0}, {alpha: 1, delay: .25, ease: Sine.easeOut, onComplete:glitchOn});

    TweenMax.set('html', {className:'+=init_done', delay:2.5});
  }

  function menuToggle() {
    if ($('html').hasClass('menu-open') )
      $('html').removeClass('menu-open');
    else
      $('html').addClass('menu-open');
  }

  function glitchOn(){
    tl.restart();
  }

  function workNext(way) {
    animating = true;
    viewArea = 'worklist';
    TweenMax.set('.list_num', {className:'+=hide'});

    if (way=='up') {
      workIndex--;
      workNow = $('.sec_work .work').eq(workIndex);
      workPrev = $('.sec_work .work').eq(workIndex+1);
    }
    else{
      workIndex++;
      workNow = $('.sec_work .work').eq(workIndex);
      workPrev = $('.sec_work .work').eq(workIndex-1);
    }
    TweenMax.to( '.work_list', .75, {y: -$(window).height()* (workIndex + 1), ease: Circ.easeInOut, onComplete: aniEnd});

    if (workIndex !== 0) {
      if (isDesktop) {

      }
      if ( window.innerWidth > 768) {
        TweenMax.fromTo( workPrev.find('.masthead'), .5, { z:10 }, { z: -20, ease: Circ.easeOut});
        TweenMax.fromTo( workPrev.find('.info'), .5, { z:40 }, { z: -15, ease: Circ.easeOut});
      }

    }
    $('.work_num').attr('data-num', workIndex+1);
    workPrev.removeClass('active');
    workNow.addClass('active');
    if ( window.innerWidth > 768) {
      TweenMax.fromTo( workNow.find('.masthead'), .6, { z:-20,  }, { z: 10, delay:.5, ease: Circ.easeOut});
      TweenMax.fromTo( workNow.find('.info'), .75, { z:-15}, { z: 40, delay:.6, ease: Circ.easeOut});
    }

    if (workIndex == -1) {
      // back to home
      viewArea = 'home';
      bg_z = -10;
      TweenMax.to('#bg canvas', .5, {z:bg_z, ease:Sine.easeOut});
      TweenMax.set('#bg .tip', {className:'-=hide'});
      tl.restart();
    }
    else{
      // to work list
      TweenMax.set('.list_num', {className:'-=hide', delay:.2});
      TweenMax.set('#bg .tip', {className:'+=hide'});

      if(workIndex == 0){
        // to work list
        bg_z = (isDesktop)?-50: -10;
        TweenMax.to('#bg canvas', .5, {z:bg_z, ease:Sine.easeOut});
        TweenMax.set('.list_num', {className:'+=hide'});
      }
    }
    bg_r = Math.abs(bg_z / 10);

  }
  function aniEnd() {
    animating = false;
  }

  function workInnerIn() {
    if (window.innerWidth > 768)
      TweenMax.fromTo('#mask .masthead', .5, { width:'83%', paddingTop:'37%' }, { width:'100%', paddingTop:'30%', ease:Circ.easeOut, onComplete: cont});
    else{
      TweenMax.set('.sec_work_inner', {className:`+=show work-${workIndex+1}`});
      TweenMax.to('.sec_work_inner', .5, { alpha:1, delay:.1 });
    }

    function cont() {
      TweenMax.to('#mask .masthead', .5, { y: ( $('#mask .masthead')[0].offsetHeight-$(window).height() )/2 , delay:.25, ease:Circ.easeOut});
      TweenMax.set('#mask', {className:`-=show work-${workIndex+1}`, delay:.75 });
      TweenMax.set('.sec_work_inner', {className:`+=show work-${workIndex+1}`, alpha:1, delay:.75 });
    }
  }

  function workInnerOut() {

    if (window.innerWidth > 768)
      TweenMax.set('#mask .masthead', { width:'83%', paddingTop:'37%', y:'0'});

    TweenMax.to('.sec_work_inner', .5, {alpha:0 });
    TweenMax.fromTo('.sec_work', .5, {alpha:0 }, { alpha:1, delay:.75, onComplete:cont});

    function cont() {
      TweenMax.set('.sec_work_inner', {className:`-=show work-${workIndex+1}` });
      animating = false;
    }

  }
  function handleOrientation(event) {
    let dx = event.gamma/90; // In degree in the range [-180,180]
    let dy = event.beta/90; // In degree in the range [-90,90]

    if (viewArea == 'worklist') {
      TweenMax.set( '#bg canvas', { rotationX: -dy*5/bg_r, rotationY: dx*5/bg_r, x: -dx*10/bg_r+'%', y:-dy*10/bg_r+'%' });
    }
  }

  $(window).resize(setBgSize);
  $('#menu-trigger').on('click', menuToggle);
  $('#menu .btn').on('click', menuToggle);


  // mouse wheel / swipe
  if (isDesktop) {
    let indicator = new WheelIndicator({
      callback: function(e){
        if ( !animating && viewArea!=='about' && viewArea!=='workinner' ) {
          if (e.direction=='up' && workIndex == -1) {
            return false;
          }
          else if(e.direction=='down' && workIndex== $('.sec_work .work').length -1){
            return false;
          }
          else{
            workNext(e.direction);
          }
        }

      },
      preventMouse: false
    });

    $('body').on('mousemove', (e)=>{

      let ax = e.clientX / window.innerWidth -.5,
          ay = e.clientY / window.innerHeight - .5;

      TweenMax.to( '#bg canvas', .5, { rotationX: -ay*7/bg_r, rotationY: ax*7/bg_r, x: -ax*10/bg_r+'%', y:-ay*10/bg_r+'%' });

      if (viewArea == 'worklist') {
        TweenMax.to( workNow.find('.masthead'), .75, { rotationX: -ay*5, rotationY: ax*5, x:-ax*5+'%', y:-ay*5+'%' });
        TweenMax.to( workNow.find('.info'), 1, { rotationX: -ay*7, rotationY: ax*7, x:-ax*10+'%', y:-ay*10+'%' });
      }

    });
  }
  else{
    let mc = new Hammer( $('.sec_work')[0] ) ;

    mc.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });

    mc.on("swipeup swipedown", function(e) {
      if ( !animating && viewArea!=='about' && viewArea!=='workinner' ) {

        if (e.type=='swipedown' && workIndex == -1) {
          return false;
        }
        else if(e.type=='swipeup' && workIndex== $('.sec_work .work').length -1){
          return false;
        }
        else{
          workNext( (e.type=='swipeup')? 'down':'up' );
        }
      }
      else{
        return false;
      }

    });
    window.addEventListener('deviceorientation', handleOrientation);
  }

  $('.btn-work').on('click', ()=>{
    if (viewArea!=='worklist')
      workNext('down');
  });
  $('.btn-home').on('click', ()=>{
    if (!animating) {
      workIndex = 0;
      workNext('up');
    }
  });
  //about on/off
  $('.btn-about').on('click', ()=>{
    viewBack = viewArea;
    viewArea='about';
    TweenMax.set('.sec_about', {className:'+=show'});
    TweenMax.to('.sec_about ', .6, { alpha:1, ease:Sine.easeOut });
    TweenMax.to('.sec_about .wrapper', .5, { x:'0%', delay:.2, ease:Circ.easeOut });
  });
  $('.close-about').on('click', ()=>{
    viewArea = viewBack;
    TweenMax.to('.sec_about ', .3, { alpha:0, delay:.1, ease:Circ.easeOut });
    TweenMax.to('.sec_about .wrapper', .5, { x:'-20%'});
    TweenMax.set('.sec_about', {className:'-=show', delay:.55, ease:Circ.easeOut});
  });
  //work inner on/off
  $('.btn-discover').on('click', ()=>{
    if (jsonLoad) {
      viewBack = viewArea;
      viewArea='workinner';
      $('.sec_work_inner .inner').html( workInnerText[`work-${workIndex+1}`] );
      imgLoad('.sec_work_inner', workInnerIn);

      TweenMax.to('.sec_work', .3, { alpha:0 });
      if (window.innerWidth>768)
        TweenMax.set('#mask', {className: `+=show work-${workIndex+1}` });
    }
  });
  $('.close-workinner').on('click', ()=>{
    viewArea = viewBack;
    animating = true;
    workInnerOut();
  });


});