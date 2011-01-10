// ==UserScript==
// @name                MovePlaces
// @description	        Moves Facebook Places from feed to left column
// @include		http*://*.facebook.com/*
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
		
// ==/UserScript==

addContainer();
hidePlaces();
setInterval(hidePlaces, 500);

function hidePlaces(){

	$('.sx_b58395').each(function(index) {
		
		$place = $(this).closest('li');
		
		if($place.is(':visible')){
			$place.hide();
			
			$li = $('<li></li>');
			$li.css({float:'left', width:'100%;', margin:'10px 0 0 0'});

			$venue = $place.find('h6 a:eq(1)').clone();
			$user = $place.find('h6 a:eq(0)').clone();
			$image = $place.find('a.UIImageBlock_MED_Image img').clone(); 
			$timestamp = $place.find('.timestamp:eq(0)').clone();
	
			$image.css({width:'25px', height:'25px'});
			$image_a = $user.clone();
			$image_a.html($image);
			$image_a.css({float:'left',margin:'0 10px 0 0'});
			$li.append($image_a);
	
			$user_wrapper = $('<div></div>');
			$user_wrapper.css({width:'170px;'});
			$user_wrapper.append($user);
			$li.append($user_wrapper);
	
			$venue_wrapper = $('<div></div>');
			$venue_wrapper.css({width:'170px'});
			$venue_wrapper.append($venue);
			$li.append($venue_wrapper);

			$ts_wrapper = $('<div></div>');
			$ts_wrapper.css({color:'#999'});
			$ts_wrapper.append($timestamp);
			$li.append($ts_wrapper);
	
			if(index == 0){
				$('#leftCol .addedPlaces ul').prepend($li);
			}
			else{
				$('#leftCol .addedPlaces ul').append($li);
			}
		}
	});
}

function addContainer(){
	$places = $('<div class="addedPlaces"></div>');		
	$places.append('<div class="uiHeader uiHeaderTopBorder uiHeaderNav uiHeaderNavEmpty"><div class="clearfix uiHeaderTop"><div><h4 class="uiHeaderTitle"></h4></div></div></div>');
	$logo = $('<i class="UIImageBlock_Image UIImageBlock_ICON_Image img sp_txxvuy sx_b58395"></i>');		
	$logo.css({float:'left',width:'100%'});
	$places.append($logo);
	$ul = $('<ul></ul>');
	$ul.css('width','100%');
	$places.append($ul);			
	$('#leftCol').append($places);
}