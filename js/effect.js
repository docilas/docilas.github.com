( function( window ) {

 $(function(){
      // gradient text init
      var h1=0, h2=175, deg=20;
      var first=0, first2=0;
      var rc=setInterval(), ani_bg=setInterval();       
      
      // ani init      
      var left=0, a_top=0, n_left=0, n_top=0,b_top=0, fly=0, bo=0;
      var fall=0, f_top=0, f_left=0, down=0, back=0;
      a_top = Math.floor((Math.random() * 200) + 50);

      // ani start
      function ani () {
        var width= $(window).width();

        n_top= $('#ani').position().top;
        n_left= $('#ani').position().left;

        
        if($('#ani').hasClass('fly')===true){
          left+=10;
          fly-=160;
          
          $('#ani').css({'background-position': fly+'px 0', 'left':left+'px', 'top':a_top+'px'});
          if (left > width) {
            left=-200;
            a_top = Math.floor((Math.random() * 200) + 50);
          };
        }

        if($('#ani').hasClass('bomb')===true){
          
          if (bo<=0 && bo>= -3000) {
            bo-=200;
            $('#ani').css({'background-position': bo+'px 0','top':b_top+'px', 'left':n_left+'px'});
          }
          else{
            $('#ani').removeClass('bomb');
            $('#ani').addClass('fall');
            f_top=n_top+50;
            f_left=n_left +70;            
          }

        }

        if($('#ani').hasClass('fall')===true){
                    
          $('#ani').css({'background-position': fall+'px 0','top': f_top+'px', 'left': f_left+'px'});
          
          if (back==1) {
            fall+=62;
          }
          else{
            fall-=62;
          };

          // start fall down
          if (fall<= -1178) {down=1;};
          
          //fall end
          if (fall<=-1798) {                       
            back=1;
          };

          if (down==1) {            
            f_top+=1;
            // if (f_top >= ) {clearInterval(ani_bg);};
            if (fall >= -1178) {back=0;}            
          }
          
        }        
        

        $('#ani').click(function() {
          if($('#ani').hasClass('fly')===true){                      
            $(this).removeClass('fly');
            $(this).addClass('bomb');
            b_top= n_top-60;            
          }
        });       
              
      }


      $(window).scroll(function () {
          var top = $('.random_bg').offset().top;
          var top2 = $('.area').offset().top;   
          var height = $(window).scrollTop();

          if(height  >= top-160 && height  <= top + 600) {
            first_chk();
          }
          else{
            first=0;
            clearInterval(rc);
          };

          

          if(height  >= top2-150 && height  <= top2 + 400) {
            first_chk2 ();
          }
          else{
            first2=0;
            clearInterval(ani_bg);
            $('#ani').removeClass();
            left=-200;
            a_top = Math.floor((Math.random() * 200) + 50);
            $('#ani').css({'background-position': '0 0','top': top+'px', 'left': left+'px'});

          };


      });

      function first_chk () {
        if (first==0) {
           rc=setInterval(color, 60);                    
           first=1;
        };       
      }

      function first_chk2 () {
        if (first2==0) {
          $('#ani').addClass('fly'); 
          ani_bg=setInterval(ani, 100);       
          
          first2=1;
        };       
      }

      function color(){        
        h1+=3; 
        h2+=3;
        // deg+=0.5;        
        $('#rd_text').css('background-image', 'linear-gradient(40deg, hsl(' + h1 + ', 72%, 50%), hsl(' + h2 + ', 52%, 90%) 60% )');
      }

     

  });

})( window );