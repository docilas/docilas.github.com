$(function() {
  let bg_z = -10,
      bg_r = Math.abs(bg_z / 10);
  let count = 0;
  const power = 7;
  let workIndex = -1;
  var workPrev, workNow;
  const workNum = $('.sec_work .work').length;
  let homeView = true,
      workAni = false;


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


  // text
  const text1 = new PIXI.Text('CHIH YUAN KUO', {
    fontWeight: 500,
    fontSize: 100,
    fontFamily: 'Impact',
    fill: '#333',
    align: 'center',
    strokeThickness: 0,
    letterSpacing: 10
  });

  text1.anchor.set(.5);
  text1.blendMode = PIXI.BLEND_MODES.ADD;
  text1.position= {x: app.renderer.width / 2, y: app.renderer.height / 2};


  const textLft = new PIXI.Text('CHIH YUAN KUO', {
    fontWeight: 500,
    fontSize: 100,
    fontFamily: 'Impact',
    fill: '#FC577D',
    align: 'center',
    strokeThickness: 0,
    letterSpacing: 10
  });
  textLft.anchor.set(.5);
  textLft.blendMode = PIXI.BLEND_MODES.ADD;
  textLft.position= {x: app.renderer.width / 2, y: app.renderer.height / 2};
  textLft.alpha = 0;

  const textRig = new PIXI.Text('CHIH YUAN KUO', {
    fontWeight: 500,
    fontSize: 100,
    fontFamily: 'Impact',
    fill: '#54F3B7',
    align: 'center',
    strokeThickness: 0,
    letterSpacing: 10
  });
  textRig.anchor.set(.5);
  textRig.blendMode = PIXI.BLEND_MODES.ADD;
  textRig.position= {x: app.renderer.width / 2, y: app.renderer.height / 2};
  textRig.alpha = 0;

  container.addChild(bg, textLft, textRig, text1);

  container.filters = [displacementFilter];
  app.stage.addChild(container, displacementSprite);





  app.ticker.add(function(delta) {
    count += 0.1;
    displacementSprite.rotation += 0.005;
    displacementSprite.scale.x = 2 + Math.sin(count) * 0.2;
    displacementSprite.scale.y = 2 + Math.cos(count) * 0.2;

    if (homeView) {
      text1.scale.x = 1 + Math.cos(count) * 0.003;
      text1.scale.y = 1 + Math.sin(count) * 0.006;
    }


  });

  // title animation
  const tl = new TimelineMax({ repeat: 1, repeatDelay: .5, paused: true});
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


  init();

  function init() {
    TweenMax.fromTo('#bg canvas', 2, {z:200}, {z:bg_z, ease: Sine.easeOut});
    TweenMax.fromTo(text1, 2, {alpha: 0}, {alpha: 1, delay: .5, ease: Sine.easeOut, onComplete:glitchOn});

    TweenMax.set('#menu', {className:'+=active', delay:4});
    // TweenMax.set('#menu', {className:'-=active', delay:6.5});


  }
  function setBgSize() {

    if ( window.innerWidth *.5625 <  window.innerHeight ) {
      bg.scale.set( window.innerHeight / .5625 / 1920 );
    }
    else{
      bg.scale.set( window.innerWidth * .5625 / 1080 );
    }
    TweenMax.set( '.sec_work', {y: -window.innerHeight* (workIndex + 1)});

  }


  function glitchOn(){
    tl.restart();
  }

  function workNext(way) {
    workAni = true;
    homeView = false;
    TweenMax.set('.btn-discover', {className:'+=hide'});

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
    TweenMax.to( '.sec_work', .75, {y: -window.innerHeight* (workIndex + 1), ease: Circ.easeInOut, onComplete: aniEnd});

    if (workIndex !== 0) {
      TweenMax.fromTo( workPrev.find('.img'), .5, { z:10 }, { z: -20, ease: Circ.easeOut});
      TweenMax.fromTo( workPrev.find('.info'), .5, { z:40 }, { z: -15, ease: Circ.easeOut});
    }
    workPrev.removeClass('active');
    workNow.addClass('active');
    TweenMax.fromTo( workNow.find('.img'), .75, { z:-20 }, { z: 10, delay:.5, ease: Circ.easeOut});
    TweenMax.fromTo( workNow.find('.info'), .75, { z:-15 }, { z: 40, delay:.5, ease: Circ.easeOut});

    if (workIndex == -1) {
      // back to home
      homeView = true;
      bg_z = -10;
      TweenMax.to('#bg canvas', .75, {z:bg_z, ease:Sine.easeOut});
      TweenMax.set('.btn-scroll', {className:'-=hide'});
      tl.restart();
    }
    else{
      // to work list
      TweenMax.set('.btn-discover', {className:'-=hide', delay:.2});

      if(workIndex == 0){
        // to work list
        bg_z = -50;
        TweenMax.to('#bg canvas', .75, {z:bg_z, ease:Sine.easeOut});
        TweenMax.set('.btn-scroll', {className:'+=hide'});

      }
    }
    bg_r = Math.abs(bg_z / 10);

  }
  function aniEnd() {
    workAni = false;
  }


  $(window).resize(setBgSize);
  // mouse event

  $('body').on('mousemove touchmove', (e)=>{

    let ax = e.clientX / window.innerWidth -.5,
        ay = e.clientY / window.innerHeight - .5;

    TweenMax.to( '#bg canvas', .5, { rotationX: -ay*7/bg_r, rotationY: ax*7/bg_r, x: -ax*10/bg_r+'%', y:-ay*10/bg_r+'%' });

    if (!homeView) {
      TweenMax.to( workNow.find('.img'), .75, { rotationX: -ay*5, rotationY: ax*5, x:-ax*5+'%', y:-ay*5+'%' });
      TweenMax.to( workNow.find('.info'), 1, { rotationX: -ay*7, rotationY: ax*7, x:-ax*10+'%', y:-ay*10+'%' });
    }



  });
  $('main').on('mousewheel', function(e) {

    if ( !workAni ) {

      if (e.deltaY > 0) {
        //wheel up
        if (workIndex == -1) {
          // home
          return false;
        }
        else{
          workNext('up');
        }
      }
      else{
        //wheel down
        if (workIndex== $('.sec_work .work').length -1 ) {
          //last one
          return false;
        }
        else{
          workNext('down');
        }
      }
    }
  });

  $('.btn-scroll').on('click', ()=>{ workNext('down'); });



});