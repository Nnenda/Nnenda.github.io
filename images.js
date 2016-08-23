$('document').ready(function(){
	var pixelleft = 0;
	var pixeltop = 0;
	for(var i = 1; i <= 12; i++){
		$('#d' + i).css({'margin-left': pixelleft + 'px', 'margin-top': pixeltop + 'px'});
		pixelleft += 100;

		if(i%3 == 0){
			pixelleft = 0;
			pixeltop += 100;
		}		
	}
})

