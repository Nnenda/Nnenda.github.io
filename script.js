$('document').ready(function(){
	
	$('.win').hide();
	RandomImages();
	PuzzleGame();


	function RandomImages(){
		var bool = true;
		var number;
		var i = 1;

		while(bool){
			number = Math.floor((Math.random() * 12) + 1);
			if($('#d' + number).html() == ''){
				$('#d' + number).html('<img src="images/' + i + '.jpg" alt="" id="i' + i + '">');
				i++;
			}
			for(var j = 1; j <=12; j++){
				if($('#d' + j).html() != ''){
					bool = false;
				}
				else{
					bool = true;
					break;
				} 
			}
		}
	}
	
	
	function PuzzleGame(){
		var CenterX = 700;
		var CenterY = 150;
		var addOrigX = 0;
		var addOrigY = 0;
		var addCenterX = 0;
		var addCenterY = 0;
		for(var i = 1; i <= 12; i++){
			Puzzle('i' + i, CenterX + addCenterX, CenterY + addCenterY, i);
			addCenterX += 100;
			if(i%3 == 0){
				addCenterX = 0;
				addCenterY += 100;
			}
		}
	}
	

	function Puzzle(id, centerX, centerY, i){

		var ball = document.getElementById(id);
		var bool = true;
		var originalx = ball.getBoundingClientRect().left;
		var originaly = ball.getBoundingClientRect().top;
		var centerx = centerX;
		var centery = centerY;

		ball.onmousedown = function(e) {
			ball.style.width = 100 + 'px';
			ball.style.height = 100 + 'px';

			if(bool){
				var coords = getCoords(ball);
		  		var shiftX = e.pageX - coords.left;
				var shiftY = e.pageY - coords.top;

				ball.style.position = 'absolute';
				document.body.appendChild(ball);
				moveAt(e);

				ball.style.zIndex = 1000; // над другими элементами

				function moveAt(e) {
				  	ball.style.left = e.pageX - shiftX + 'px';
				  	ball.style.top = e.pageY - shiftY + 'px';
				  	}

				document.onmousemove = function(e) {
				  	moveAt(e);
				  	}

				ball.onmouseup = function() {
					Test(ball, i);
				 	document.onmousemove = null;
				  	ball.onmouseup = null;
				  	Win();  
		  		}
			}  

			function Test(elem, i){
				var coordx = elem.getBoundingClientRect().left;
				var coordy = elem.getBoundingClientRect().top;
				if(((coordx < centerx-100) || (coordx > centerx)) || ((coordy < centery-100) || (coordy > centery))){
					elem.style.left = originalx +'px';
					elem.style.top = originaly +'px';
					elem.style.padding = 3 + 'px';
				}
				else{
					elem.style.opacity = 0;
					$('#p' + i).append($('<img src="images/' + i + '.jpg" alt="" id="i' + i + '" style="position: absolute; width: 100px; height: 100px;">'))
					bool = false;
				}
			}
		}

		ball.ondragstart = function() {
		  return false;
		}
	}

	function getCoords(elem) { 
		var box = elem.getBoundingClientRect();

		return {
	    	top: box.top + pageYOffset,
	    	left: box.left + pageXOffset
		}
	}

	function Win(){
		var win;
		for(var i = 1; i <= 12; i++){
			if(($('#p' + i).html()) != '')
				win = true;
			else{
				win = false;
				break;
			}
		}

		if(win){
			$('.win').fadeIn(1000);
			$('.win').animate({width: '600px', height:'600px'}, 2000);
			$('.win').fadeOut(1000);
			setTimeout(function(){$('.button').show()}, 2500);
			$('.win').css({width: '500px', height: '500px'});
		}
	}

	$('.button').click(function(){
		for(var i = 1; i <= 12; i++){
			$('#p' + i).html('');
		}
		RandomImages();
		$('.button').hide();
		PuzzleGame();
	})

	$('#i100').click(function(){
		$('body').append(123213213);
	})


})




