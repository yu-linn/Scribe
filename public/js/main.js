"use strict";
//function to use to display the text after getting text from speech to texh
function displayText(text) {
	$(".my-text").text(text);
}
//show when the arrow buttons should be shown
function checkitem() {
  console.log("clicked");
  if ($("#record-page").hasClass("active")) {
    $(".carousel-control-prev").hide();
    $(".carousel-control-next").show();
  } else if ($("#input-page").hasClass("active")) {
    $(".carousel-control-next").hide();
    $(".carousel-control-prev").show();
  } else if ($("#text-page").hasClass("active"))  {
    $(".carousel-control-prev").show();
    $(".carousel-control-next").show();
	} else if ($("#send-page").hasClass("active"))  {
    $(".carousel-control-prev").show();
    $(".carousel-control-next").hide();
	}
};
//testing
$( document ).ready(function() {
    console.log( "ready!" );
});
//click on slack and send data to slack
$(document).on('click', '#slack', function(){ 
     	console.log("go to slack input");
     	var url = location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '');
    	//http://localhost:5000
    	console.log(url);
    	var parent = $(this).parent();
    	var t = $(".my-text").text()
    	$.ajax({
	        type: 'get',
	        url: url+'/slack/'+ t,
	        success: function(data) {
	        	console.log(data);
	        },
	        error: function(err) {
	            alert("data failed");
	        }
    	});
});
//click on email and go to email form
$(document).on('click', '#email', function(){ 
     	console.log("go to email input");
     	$(".carousel").carousel(3);
});
//click on previous and see if page needs prev button
// $(document).on('click', '.carousel-control-prev', function(){ 
//      	checkitem();
// });
// //click on next and see if page needs next button
// $(document).on('click', '.carousel-control-next', function(){ 
//      	checkitem();
// });

$(document).on('keypress', '#email', function(e) {
	if (e.which == 13) {
		var email = $(this).val();
		var subject = "notes";
		var body = $(".my-text").text();
		window.open('mailto:'+email+'?'+'subject='+subject+"&body="+body);
	}
})
