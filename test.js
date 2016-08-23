$('document').ready(function(){
	$('body').mousemove(function(e){
		$('#test').html(e.pageX + ':' + e.pageY + "                 ");
	})
})