$(function(){
	var type = ["可愛的", "幾何的", "男人的", "邪惡的", "復古的", "繽紛的", "極簡的", "速度感的", "科技感的", "藝術家的"],
			ele = ["按鈕", "輸入框", "載入動畫", "選單", "轉場效果", "Slider", "Checkbox", "Switch", "Lightbox"];
	var canvas = document.getElementById("stage");

	var Engine = Matter.Engine,
      Render = Matter.Render,
      Runner = Matter.Runner,
      Composite = Matter.Composite,
      Composites = Matter.Composites,
      Constraint =Matter.Constraint,
      MouseConstraint = Matter.MouseConstraint,
      Mouse = Matter.Mouse,
      World = Matter.World,
      Vertices = Matter.Vertices,
      Vector = Matter.Vector,
      Svg = Matter.Svg,
      Body = Matter.Body,
      Bounds =Matter.Bounds,
      Bodies = Matter.Bodies,
      Events = Matter.Events;

  // create engine
  var engine = Engine.create(),
      world = engine.world;
  world.gravity.y = 1.5;

  // create renderer
  var render = Render.create({
      canvas: canvas,
      engine: engine,
      options: {
      	width: window.innerWidth,
      	height: window.innerHeight,
      	// width: 900,
      	// height: 1200,
      	background: 'transparent',
        enabled: true,
        wireframes: false,
        hasBounds: true,
        showAxes: false,
        showPositions: true,
        showAngleIndicator: false
    	}
  	});
  Render.run(render);

  // create runner
  var runner = Runner.create();
  Runner.run(runner, engine);

  // add svg
  $.get('assets/images/wrap.svg').done(function(data) {
    var vertexSets = [];
    $(data).find('path').each(function(i, path) {
    	var points = Svg.pathToVertices(path);
 			vertexSets.push(Vertices.scale(points, 1, 1.2));
    });
    World.add(world, Bodies.fromVertices(443, 70, vertexSets, {
    		isStatic: true,
        render: {
            fillStyle: 'transparent',
            lineWidth: 1,
            opacity: .5
        }
    }));
  });

  var block = Composites.stack(86, 1000, 9, 1, 75.25, 0, function(x, y) {
      return Bodies.rectangle(x, y, 6.2, 200, { isStatic: true });
  });

  var sensor = Composites.stack(11, 1050, 10, 1, 6.25, 0, function(x, y,i) {
      return Bodies.rectangle(x, y, 75.2, 150, { isStatic: true, isSensor: true,
      	render:{
      		fillStyle:'transparent'
      	},
        'sid': 'sensor'+i
      });
  });

  var result= [];
  var task = {};
  for (var i = 0, j = 0; j < 10; i++) {
  	var mix = type[Math.floor( Math.random() * type.length)] + ele[Math.floor( Math.random() * ele.length)];
  	var dup = false;
  	result.forEach( value=>{
  		if (mix === value) {
  			dup = true;
  			return ;
  		}
  	});

  	if (!dup) {
  		result.push(mix);
  		j++;
  	}

  }


  sensor.bodies.map(function(obj, i) {
  	task[obj.sid] = result[i];
  	$('.block p ').eq(i).text( result[i] )
	});

	// console.log(task)


	var eyes = Composites.stack( 180, 200, 2, 1, 200, 0, function(x, y) {
    return Bodies.circle(x, y, 70, { isStatic: true })
  });

  var lft_whiskers = Composites.stack( 0, 350, 1, 3, 0, 0, function(x, y) {
    return Bodies.rectangle(x, y, 80, 6, { isStatic: true, angle: .5 });
  });
  var rig_whiskers = Composites.stack( 750, 350, 1, 3, 0, 0, function(x, y) {
    return Bodies.rectangle(x, y, 80, 6, { isStatic: true, angle: -.5 });
  });

  var nose = Bodies.polygon(420, 400, 3, 40, { isStatic: true, chamfer: 30, angle: 0.5 });

  var mouthY = [ 20, 40, 50, 30, 0, -30, 0, 30, 50, 40, 20 ];
  var mouth = Composites.stack(305, 550, 11, 1, 7, 0, function(x, y, i) {
  	return Bodies.circle(x, y + mouthY[i], 8);
  });

  var cateBall = 0x0002;
  var cateNone = 0x0004;
  var group = Body.nextGroup(true);
  var lhand = Composites.stack( 100, 580, 1, 2, 0, 10, function(x, y, col, row) {
  	if (row==1) {
  		return Bodies.rectangle(x, y, 100, 100, {
  			chamfer:{ radius: [0, 0, 40, 40] },
	  		collisionFilter: {
	  			group: group,
	        mask: cateBall
	      }
	  	});

  	}
  	else{
  		return Bodies.rectangle(x, y, 100, 160, {
	  		collisionFilter: {
	  			group: group,
	        mask: cateNone
	      }
	  	});
  	}
  });
  Composites.chain(lhand, 0, 0.5, 0, -0.5, { stiffness: 0.75, length: 5 });
	Composite.add(lhand, Constraint.create({
	    pointA: { x: lhand.bodies[0].position.x, y: lhand.bodies[0].position.y-50 },
	    bodyB: lhand.bodies[0],
	    pointB: { x: 0, y: -50 },
	    stiffness: 0.8
	}));
	lhand.bodies[1].restitution = 0;

	group = Body.nextGroup(true);
  var rhand = Composites.stack( 650, 580, 1, 2, 0, 10, function(x, y, col, row) {
  	if (row==1) {
  		return Bodies.rectangle(x, y, 100, 100, {
  			chamfer:{ radius: [0, 0, 40, 40] },
	  		collisionFilter: {
	  			group: group,
	        mask: cateBall
	      }
	  	});

  	}
  	else{
  		return Bodies.rectangle(x, y, 100, 160, {
	  		collisionFilter: {
	  			group: group,
	        mask: cateNone
	      }
	  	});
  	}
  });
  Composites.chain(rhand, 0,0.5, 0, -0.5, { stiffness: 0.75, length: 5 });
	Composite.add(rhand, Constraint.create({
	    pointA: { x: rhand.bodies[0].position.x, y: rhand.bodies[0].position.y-50 },
	    bodyB: rhand.bodies[0],
	    pointB: { x: 0, y: -50 },
	    stiffness: .8
	}));
	rhand.bodies[1].restitution = 0;

	var point1 = Composites.stack(95, 820, 11, 1, 55, 0, function(x, y) {
  	return Bodies.circle(x, y, 4, { isStatic : true });
  });
  var point2 = Composites.stack(65, 900, 12, 1, 55, 0, function(x, y) {
  	return Bodies.circle(x, y, 4, { isStatic : true });
  });

  var stack = [ ...eyes.bodies, nose, ...mouth.bodies ];
  stack.forEach( (value)=>{
  	value.density = 2;
  	value.restitution= 1;
  });


  var line =[];
  for (var i = 0; i < mouth.bodies.length; i++) {
  	var constraint = Constraint.create({
        pointA: { x: mouth.bodies[i].position.x, y: mouth.bodies[i].position.y-10 },
        bodyB: mouth.bodies[i],
        pointB: { x: 0, y: 0 }
    });
  	line.push(constraint);
  }


 	var ball = Bodies.circle(850, 1000, 25,
 			{
 				collisionFilter: {
          category: cateBall
        }
 			}
 		);
	ball.density = 4;
	ball.restitution = 0.2;
	ball.friction = 0.01;
	ball.frictionStatic = 0.01;


  World.add(world, [
      // walls x y w h
      Bodies.rectangle(450, 0, 900, 20, { isStatic: true }),
      Bodies.rectangle(450, 1200, 900, 20, { isStatic: true }),
      Bodies.rectangle(900, 600, 20, 1200, { isStatic: true }),
      Bodies.rectangle(0, 600, 20, 1200, { isStatic: true }),
      Bodies.rectangle(825, 770, 10, 860, { isStatic: true,collisionFilter:{ category: cateBall} }),
      block,
      sensor,
      eyes,
      ball,
      lft_whiskers,
      rig_whiskers,
      nose,
      mouth,
      lhand,
      rhand,
      point1,
      point2,
      ...line
  ]);



  // add mouse control
  var mouse = Mouse.create(render.canvas),
      mouseConstraint = MouseConstraint.create(engine, {
          mouse: mouse,
          constraint: {
              stiffness: 1,
              render: {
                  visible: false
              }
          }
      });

  World.add(world, mouseConstraint);
  // keep the mouse in sync with rendering
  render.mouse = mouse;

  function reInit() {
  	Body.setPosition(ball, {x:850, y:1100});
  }
  function launcher() {
  	Body.setVelocity(ball, {x:0, y:-35 - Math.random()*20 });
  	// Body.setVelocity(ball, {x:0, y:-35 });
  }
  function autoStart(){
  	setTimeout(launcher,3000);
  }
  function lcatch() {
  	setTimeout( ()=>{
  		Body.setVelocity(lhand.bodies[1], {x:20+ Math.random()*20, y:10+ Math.random()*20 });
  		lcatch() ;
  	}, 1000 + Math.random()*1500 );
  }
  function rcatch() {
  	setTimeout( ()=>{
  		Body.setVelocity(rhand.bodies[1], {x:-20- Math.random()*20, y:10+ Math.random()*20 });
  		rcatch() ;
  	}, 1000 +Math.random()*1500 );
  }

  //event
  Events.on(engine, 'collisionStart', function(event) {
    var pairs = event.pairs;

    for (var i = 0, j = pairs.length; i != j; ++i) {
      var pair = pairs[i];
      var ans;
      if (pair.bodyA.sid || pair.bodyB.sid) {

      	ans = pair.bodyA?pair.bodyA:pair.bodyB;
      	console.log(ans.sid);
      	// result.push(ans.sid)
	      // reInit();
	      // autoStart();
      }


    }
  });

  // views
  var viewportCentre = {
      x: render.options.width * 0.5,
      y: render.options.height * 0.5
  };

  Events.on(runner, 'tick', ()=>{
    Bounds.shift(render.bounds, {x: ball.position.x - viewportCentre.x , y: ball.position.y - viewportCentre.y });
    TweenMax.set(".ans", { x: -(ball.position.x - viewportCentre.x) , y: -(ball.position.y - viewportCentre.y) });
  });

  $('canvas').on('click', launcher);


  window.addEventListener('keydown', (e)=>{
  	if(e.keyCode===82){
  		reInit();
  	}
  });

  // hand animation
  lcatch();
  rcatch();
  // autoStart();
});

