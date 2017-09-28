// image source
const imgs = ['assets/images/stage.jpg', 'assets/images/hat.png'];
const coins = ['assets/images/coin.png', 'assets/images/animal1.png', 'assets/images/animal2.png', 'assets/images/animal3.png', 'assets/images/animal4.png', 'assets/images/animal5.png', 'assets/images/animal6.png', 'assets/images/animal7.png'];

let now_sq = ['hat1', 'hat2', 'hat3'],
    next_sq = [],
    hat_obj = {};
let swap_times = 10;
let user_control = false;

// animation item
let btnStart, hat1, hat2, hat3, coin, result, tips;

// create canvas with pixi
const app = new PIXI.Application(1200, 900,);
document.getElementById('canvas').appendChild(app.view);

//image loader
const loader = new PIXI.loaders.Loader();
loader.add(imgs)
      .add(coins);
loader.load((loader, resources) => {
  // init setting
  // bg
  const bg = new PIXI.Sprite.fromImage(imgs[0]);
  bg.width = app.renderer.width;
  bg.height = app.renderer.height;

  // text
  const style = new PIXI.TextStyle({
    fontFamily: 'Comic Sans MS, Verdana',
    fontSize: 100,
    fontWeight: 'bold',
    fill: '#fff',
    stroke: '#333',
    strokeThickness: 6,
    dropShadow: true,
    dropShadowColor: '#000',
    dropShadowBlur: 20,
    dropShadowAngle: Math.PI / 2,
    dropShadowDistance: 5
  });
  result = new PIXI.Text('', style);
  result.anchor.set(.5);
  result.position= {x: app.renderer.width/2, y: -100};

  tips = new PIXI.Text('CHOOSE ONE!', style);
  tips.anchor.set(.5);
  tips.position= {x: app.renderer.width/2, y: -100};

  btnStart = new PIXI.Text('START', style);
  btnStart.anchor.set(.5);
  btnStart.position= {x: app.renderer.width/2, y: app.renderer.height/2};
  btnStart.buttonMode = true;
  btnStart.interactive = true;
  btnStart.on('pointerdown', startGame);

  //coin
  coin = new PIXI.Sprite.fromImage(coins[0]);
  coin.anchor.set(.5);
  coin.scale.set(.5);
  coin.position= {x: app.renderer.width/2, y: 785};

  // hat 1
  hat1 = new PIXI.Sprite.fromImage(imgs[1]);
  // hat 2
  hat2 = new PIXI.Sprite.fromImage(imgs[1]);
  // hat 3
  hat3 = new PIXI.Sprite.fromImage(imgs[1]);
  let hats = [hat1, hat2, hat3];
  for (var i = 0; i < hats.length; i++) {
    hats[i].anchor.set(.5);
    hats[i].scale.set(.5);
    hats[i].position= {x: app.renderer.width/2 -280 +(280*i), y: 620};
    hats[i].buttonMode = true;
    hats[i].interactive = false;
    hats[i].name = `hat${i+1}`;
    hats[i].on('pointerdown', chooseHat);
    hats[i].on('mouseover', onMover);
    hats[i].on('mouseout', onMout);
  }
  function onMover(e) {
    if (user_control)
      TweenMax.to(this.scale, .3, {x:.53, y:.53});
  }
  function onMout(e) {
    if (user_control)
      TweenMax.to(this.scale, .3, {x:.5, y:.5});
  }

  app.stage.addChild(bg, coin, ...hats, result, tips, btnStart);


  hat_obj = {
    'hat1': hat1,
    'hat2': hat2,
    'hat3': hat3
  }
});


function switchUserControl(state){
  user_control = state;
  hat1.interactive = state;
  hat2.interactive = state;
  hat3.interactive = state;
}
function startGame(){
  swap_times = 10;
  TweenMax.to( btnStart, .5, { alpha: 0});
  TweenMax.set( btnStart, { y: -100, delay: .5});
  TweenMax.to( [hat1, hat2, hat3], .75, { y: 760, delay: .75, onComplete: swapHat});
}
function swapHat(){
  user_control = false;
  coin.visible = false;
  if (swap_times>0) {
    // console.log(swap_times)

    next_sq = shuffle(now_sq);

    TweenMax.to( hat_obj[now_sq[0]], .5, { x: hat_obj[next_sq[0]].x});
    TweenMax.to( hat_obj[now_sq[1]], .5, { x: hat_obj[next_sq[1]].x});
    TweenMax.to( hat_obj[now_sq[2]], .5, { x: hat_obj[next_sq[2]].x, onComplete: swapHat});

    now_sq = next_sq;
    swap_times--;
  }
  else{
    TweenMax.set( coin, { x: hat2.x });
    TweenMax.to( tips, .5, { y: 150 });
    switchUserControl(true);
    coin.visible = true;
  }
}
function shuffle(array) {
  var arrlength = array.length,
      temporaryValue,
      randomIndex1,
      randomIndex2;
  var newArr = [].concat(array);
  // Pick two random element
  randomIndex1 = Math.floor(Math.random() * arrlength);
  randomIndex2 = Math.floor(Math.random() * arrlength);
  while (randomIndex2 == randomIndex1){
    randomIndex2 = Math.floor(Math.random() * arrlength);
  }
  // And swap them
  temporaryValue = newArr[randomIndex1];
  newArr[randomIndex1] = newArr[randomIndex2];
  newArr[randomIndex2] = temporaryValue;

  return newArr;
}

function chooseHat(e) {
  switchUserControl(false);
  TweenMax.set( tips, { y: -100 });
  TweenMax.set([hat1.scale, hat2.scale, hat3.scale], {x:.5, y:.5});
  if ((this.name == 'hat2')) {
    const randomCoins = Math.floor( Math.random()*(coins.length -1) +1)
    coin.texture = PIXI.Texture.fromImage( coins[randomCoins] );

    TweenMax.to( hat2, .5, { y: 620, delay: .75});
    result.text = 'YOU WIN!!';
  }
  else{
    coin.texture = PIXI.Texture.fromImage( coins[0] );
    TweenMax.to( [hat1, hat2, hat3], .5, { y: 620, delay: .75});
    result.text = 'YOU LOSE!!';
  }
  // Show result
  TweenMax.to( result, .5, { y: 150, delay: .5});

  // Reset start btn
  TweenMax.set( btnStart, { y: app.renderer.height/2, delay: 2});
  TweenMax.to( btnStart, .5, { alpha: 1, delay: 2});
  TweenMax.set( result, { y: -100, delay: 2});

}


