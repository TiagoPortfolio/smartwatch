$(document).ready(function() {

	main = this;
	main.previousScreen = "blocked";
	main.screen = "blocked";  //Begins with blocked screen
	main.availableScreens = ["findStaff", "findCesar", "findMagda", "findTiago"];
	main.imageNumber = 1;
	main.hologramImages = {
		"staff" : [
		"projects/smartwatch/smartwatch_assets/images/path_staff.png", "projects/smartwatch/smartwatch_assets/images/path_staff_1.png", "projects/smartwatch/smartwatch_assets/images/path_staff_2.png"
		],
		"cesar" : [
		"projects/smartwatch/smartwatch_assets/images/path_cesar.png", "projects/smartwatch/smartwatch_assets/images/path_cesar_1.png", "projects/smartwatch/smartwatch_assets/images/path_cesar_2.png"
		],
		"magda" : [
		"projects/smartwatch/smartwatch_assets/images/path_magda.png", "projects/smartwatch/smartwatch_assets/images/path_magda_1.png", "projects/smartwatch/smartwatch_assets/images/path_magda_2.png"
		],
		"tiago" : [
		"projects/smartwatch/smartwatch_assets/images/path_tiago.png", "projects/smartwatch/smartwatch_assets/images/path_tiago_1.png", "projects/smartwatch/smartwatch_assets/images/path_tiago_2.png"
		]
	};
	main.pedidosProntos = [5];
	main.numeroPedidos = 0;
	main.restaurant = "";
	main.food = true;
	main.quantityFood = 0;
	main.quantity2ndFood = 0;
	main.quantityDrink = 0;
	main.quantity2ndDrink = 0;
	main.price = 0;
	main.orderAction = "";
	main.eventProcessed = false;

	function checkTime(i) {
    if (i<10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
  }

  function startTime(){
  	var today=new Date();
  	var h=today.getHours();
  	var m=today.getMinutes();
  	var s=today.getSeconds();
  	m = checkTime(m);
  	s = checkTime(s);
  	document.getElementById('txt').innerHTML = h+":"+m;
  	var t = setTimeout(function(){startTime()},500);
  }

  $('#blocked').on('click', function(event) {
  	event.preventDefault();
  	/* Act on the event */
  	blockmessage(main.screen);
  });

  $('#back-button').on('click', function(event) {
  	event.preventDefault();
  	/* Act on the event */

  	if(main.screen == "initial" || main.screen == "blocked"){
  		return false;
  	}

  	removeHologram(main.screen);
  	removeHelp(main.screen);
  	removeFastFood();
  	if(main.previousScreen == "detailsBox"+main.restaurant){
  		main.previousScreen = "details";
  		window[main.previousScreen](main.screen);
  	}
  	else if(main.screen == "foodDrink"){
  		if(main.price != 0){
  			confirm(main.screen,"fastFood");
  		}
  		else{
  			fastFood(main.screen);
  		}

  	}
  	else if(main.screen == "findTiago" || main.screen == "findMagda" || main.screen == "findCesar" || main.screen == "findStaff"){
  		confirmFind(main.screen,"back");
  	}
  	else
  		window[main.previousScreen](main.screen);

  });

  $('#home-button').mousedown(function(event) {
		// event.preventDefault();

		if (main.screen == "help" || main.screen == "confirm-box" || main.screen == "confirmFind")
			return false;
		else{
			clearTimeout(this.downTimer);
			this.downTimer = setTimeout(function() {
				if(main.screen != "confirm" && main.screen != "pay")
					blocked(main.screen);
				main.eventProcessed = true;
			}, 1000);
		}
	}).mouseup(function(event) {
		if (main.screen == "help" || main.screen == "confirm-box" || main.screen == "confirmFind")
			return false;
		else{
			clearTimeout(this.downTimer);
			if(!main.eventProcessed){
				if(main.screen != "confirm" && main.screen != "pay")
					initial(main.screen);
			}
			main.eventProcessed = false;
		}
	});

	$('#help-button').on('click', function(event){
		event.preventDefault();

		if(main.screen != "blocked" && main.screen != "blockmessage" && main.screen != "chegou" && main.screen != "confirm" && main.screen != "pay" && main.screen !="denyBox" && main.screen !="payBox" && main.screen !="orderReady" && main.screen!="confirm-box" && main.screen!="notification" && main.screen!="confirmFind")
			help(main.screen);
	});

	$('#find-people-icon').on('click', function(event) {
		event.preventDefault();
		/* Act on the event */
		findPeople(main.screen);
	});

	$('#staff').on('click', function(event) {
		event.preventDefault();
		/* Act on the event */
		findStaff(main.screen);
	});

	$('#cesar').on('click', function(event) {
		event.preventDefault();
		/* Act on the event */
		findCesar(main.screen);
	});

	$('#magda').on('click', function(event) {
		event.preventDefault();
		/* Act on the event */
		findMagda(main.screen);
	});

	$('#tiago').on('click', function(event) {
		event.preventDefault();
		/* Act on the event */
		findTiago(main.screen);
	});

	$('#find-button').on('click', function(){
		getClose(main.screen);
	});

	$('#band-schedule-icon').on('click', function(event) {
		event.preventDefault();
		/* Act on the event */
		bandSchedule(main.screen);
	});

	$('#banda').on('click', function(event) {
		event.preventDefault();
		/* Act on the event */
		bandasMenu(main.screen);
	});

	$('#banda1').on('click', function(event) {
		event.preventDefault();
		/* Act on the event */
		findbanda1(main.screen);
	});

	$('#banda2').on('click', function(event) {
		event.preventDefault();
		/* Act on the event */
		findbanda2(main.screen);
	});

	$('#banda3').on('click', function(event) {
		event.preventDefault();
		/* Act on the event */
		findbanda3(main.screen);
	});

	$('#banda4').on('click', function(event) {
		event.preventDefault();
		/* Act on the event */
		findbanda4(main.screen);
	});

	$('#banda5').on('click', function(event) {
		event.preventDefault();
		/* Act on the event */
		findbanda5(main.screen);
	});

	$('#banda6').on('click', function(event) {
		event.preventDefault();
		/* Act on the event */
		findbanda6(main.screen);
	});

	$('#banda7').on('click', function(event) {
		event.preventDefault();
		/* Act on the event */
		findbanda7(main.screen);
	});

	$('#horario').on('click', function(event) {
		event.preventDefault();
		/* Act on the event */
		findhorario11(main.screen);
	});

	$('#seta-direitaBanda1').on('click', function(event){
		event.preventDefault();
		/* Act on the event */
		$(findbanda1Screen).fadeOut("fast");
		findbanda2(main.screen);
	});
	$('#seta-direitaBanda2').on('click', function(event){
		event.preventDefault();
		/* Act on the event */
		$(findbanda2Screen).fadeOut("fast");
		findbanda3(main.screen);
	});
	$('#seta-direitaBanda3').on('click', function(event){
		event.preventDefault();
		/* Act on the event */
		$(findbanda3Screen).fadeOut("fast");
		findbanda4(main.screen);
	});
	$('#seta-direitaBanda4').on('click', function(event){
		event.preventDefault();
		/* Act on the event */
		$(findbanda4Screen).fadeOut("fast");
		findbanda5(main.screen);
	});
	$('#seta-direitaBanda5').on('click', function(event){
		event.preventDefault();
		/* Act on the event */
		$(findbanda5Screen).fadeOut("fast");
		findbanda6(main.screen);
	});
	$('#seta-direitaBanda6').on('click', function(event){
		event.preventDefault();
		/* Act on the event */
		$(findbanda6Screen).fadeOut("fast");
		findbanda7(main.screen);
	});

	$('#seta-esquerdaBanda2').on('click', function(event){
		event.preventDefault();
		/* Act on the event */
		$(findbanda2Screen).fadeOut("fast");
		findbanda1(main.screen);
	});
	$('#seta-esquerdaBanda3').on('click', function(event){
		event.preventDefault();
		/* Act on the event */
		$(findbanda3Screen).fadeOut("fast");
		findbanda2(main.screen);
	});
	$('#seta-esquerdaBanda4').on('click', function(event){
		event.preventDefault();
		/* Act on the event */
		$(findbanda4Screen).fadeOut("fast");
		findbanda3(main.screen);
	});
	$('#seta-esquerdaBanda5').on('click', function(event){
		event.preventDefault();
		/* Act on the event */
		$(findbanda5Screen).fadeOut("fast");
		findbanda4(main.screen);
	});
	$('#seta-esquerdaBanda6').on('click', function(event){
		event.preventDefault();
		/* Act on the event */
		$(findbanda6Screen).fadeOut("fast");
		findbanda5(main.screen);
	});
	$('#seta-esquerdaBanda7').on('click', function(event){
		event.preventDefault();
		/* Act on the event */
		$(findbanda7Screen).fadeOut("fast");
		findbanda6(main.screen);
	});

	$('#seta-direita11').on('click', function(event){
		event.preventDefault();
		/* Act on the event */
		$(findhorario11Screen).fadeOut("fast");
		findhorario12(main.screen);
	});

	$('#seta-direita21').on('click', function(event){
		event.preventDefault();
		/* Act on the event */
		$(findhorario21Screen).fadeOut("fast");
		findhorario22(main.screen);
	});

	$('#seta-esquerda12').on('click', function(event){
		event.preventDefault();
		/* Act on the event */
		$(findhorario12Screen).fadeOut("fast");
		findhorario11(main.screen);
	});

	$('#seta-esquerda22').on('click', function(event){
		event.preventDefault();
		/* Act on the event */
		$(findhorario22Screen).fadeOut("fast");
		findhorario21(main.screen);
	});

	$('#seta-baixo11').on('click', function(event){
		event.preventDefault();
		/* Act on the event */
		$(findhorario11Screen).fadeOut("fast");
		findhorario21(main.screen);
	});

	$('#seta-baixo12').on('click', function(event){
		event.preventDefault();
		/* Act on the event */
		$(findhorario12Screen).fadeOut("fast");
		findhorario22(main.screen);
	});

	$('#seta-cima21').on('click', function(event){
		event.preventDefault();
		/* Act on the event */
		$(findhorario21Screen).fadeOut("fast");
		findhorario11(main.screen);
	});

	$('#seta-cima22').on('click', function(event){
		event.preventDefault();
		/* Act on the event */
		$(findhorario22Screen).fadeOut("fast");
		findhorario12(main.screen);
	});

	$('#fast-food-icon').on('click', function(event){
		event.preventDefault();
		/* Act on the event */
		fastFood(main.screen);
	});

	$('#restA, #restB, #restC').on('click', function(event){
		event.preventDefault();
		/* Act on the event */
		main.restaurant = event.currentTarget.id[event.currentTarget.id.length-1];
		foodDrink(main.screen);
	});

	$('#food').on('click', function(event){
		event.preventDefault();
		/* Act on the event */
		main.food = true;
		restaurantMenu(main.screen);
	});

	$('#drink').on('click', function(event){
		event.preventDefault();
		/* Act on the event */
		main.food = false;
		restaurantMenu(main.screen);
	});

	$("#restaurantA #qttUp, #restaurantB #qttUp").on('click', function(event){
		event.preventDefault();
		/* Act on the event */
		$(event.currentTarget).next().text(
			parseInt($(event.currentTarget).next().text())+1
			);
		$('#detailsBox' + main.restaurant + (main.food ? " .quantityFood" : " .quantityDrink"))
		.text($(event.currentTarget).next().text());

		if($("#restaurant" + main.restaurant + " .description:" + (main.food ? "first" : "last") + " span:first").text() ==
			(main.restaurant=="A" ? (main.food ? "Pizza" : "Coca-cola") : (main.food ? "Hot dog" : "Beer")))
			(main.food ? main.quantityFood += 1 : main.quantityDrink += 1)
		else
			(main.food ? main.quantity2ndFood += 1 : main.quantity2ndDrink += 1)

		main.price += parseFloat($(event.currentTarget).parent().parent().children(".description").children().children("#price").text());
	});

	$("#restaurantA #qttDown, #restaurantB #qttDown").on('click', function(event){
		event.preventDefault();
		/* Act on the event */
		if((main.food ? main.quantityFood > 0 : main.quantityDrink > 0)){
			$(event.currentTarget).prev().text(
				parseInt($(event.currentTarget).prev().text())-1
				);
			$('#detailsBox' + main.restaurant + (main.food ? " .quantityFood" : " .quantityDrink"))
			.text($(event.currentTarget).next().text());

			if($("#restaurant" + main.restaurant + " .description:"+(main.food ? "first" : "last") +" span:first").text() ==
				(main.restaurant=="A" ? (main.food ? "Pizza" : "Coca-cola") : (main.food ? "Hot dog" : "Beer")))
				(main.food ? main.quantityFood -= 1 : main.quantityDrink -= 1)
			else
				(main.food ? main.quantity2ndFood -= 1 : main.quantity2ndDrink -= 1)
		}
		if(main.price > 0)
			main.price -= parseFloat($(event.currentTarget).parent().parent().children(".description").children().children("#price").text());
	});

	$("#restaurantA .switch, #restaurantB .switch").on('click', function(event){
		event.preventDefault();
		/* Act on the event */

		if(main.food){
			if($('#rest' + main.restaurant + "Food .description div:first span:first").text() == "Pizza" ||
				$('#rest' + main.restaurant + "Food .description div:first span:first").text() == "Hot dog")
				$('#rest' + main.restaurant + "Food #qttUp").next().text(main.quantityFood);
			else
				$('#rest' + main.restaurant + "Food #qttUp").next().text(main.quantity2ndFood);

			$("#rest" + main.restaurant + "Food").fadeOut("fast", function(){
				$("#rest" + main.restaurant + "Drink").fadeIn("fast");
				main.food = false;
			});
		}
		else{
			if($('#rest' + main.restaurant + "Drink .description div:first span:first").text() == "Coca-cola" ||
				$('#rest' + main.restaurant + "Drink .description div:first span:first").text() == "Beer")
				$('#rest' + main.restaurant + "Drink #qttUp").next().text(main.quantityDrink);
			else
				$('#rest' + main.restaurant + "Drink #qttUp").next().text(main.quantity2ndDrink);

			$("#rest" + main.restaurant + "Drink").fadeOut("fast", function(){
				$("#rest" + main.restaurant + "Food").fadeIn("fast");
				main.food = true;
			});
		}
	});

$("#retry-order").on('click', function(event){
	event.preventDefault();
	/* Act on the event */
	$('#back-button').click();	
});

$("#cancel-order").on('click', function(event){
	event.preventDefault();
	/* Act on the event */
	cancelOrder();
	if(main.orderAction == "blocked")
		$('#' + main.screen).fadeOut("fast", function() {
		    // Animation complete.
		    $('#initial').fadeIn("fast");
		    main.previousScreen = "blocked";
		    main.screen = "initial";
		  });
	else if(main.orderAction == "fastFood"){
		$('#' + main.screen).fadeOut("fast", function() {
		  	    // Animation complete.
		  	    fastFood(main.screen);
		  	  });
	}	
	else
		$('#' + main.screen).fadeOut("fast", function() {
		    // Animation complete.
		    $('#initial').fadeIn("fast");
		    main.screen = "initial";
		  });
});

$("#restaurantA .shopcart, #restaurantB .shopcart").on('click', function(event){
	event.preventDefault();
	/* Act on the event */
	totalOrder(main.screen);	
});

$("#restaurantA .swap,#restaurantA .swap1, #restaurantB .swap,#restaurantB .swap1").on('click', function(event){
	event.preventDefault();
	/* Act on the event */
	if(main.restaurant == "A")
		if(main.food)
			$("#restaurantA .description:first span:first").text() == "Pizza" ?
		$(event.currentTarget).parent().prev().children("span").text(main.quantity2ndFood) :
		$(event.currentTarget).parent().prev().children("span").text(main.quantityFood)
		else
			$("#restaurantA .description:last span:first").text() == "Coca-cola" ?
		$(event.currentTarget).parent().prev().children("span").text(main.quantity2ndDrink) :
		$(event.currentTarget).parent().prev().children("span").text(main.quantityDrink)
		else
			if(main.food)
				$("#restaurantB .description:first span:first").text() == "Hot dog" ?
			$(event.currentTarget).parent().prev().children("span").text(main.quantity2ndFood) :
			$(event.currentTarget).parent().prev().children("span").text(main.quantityFood)	
			else
				$("#restaurantB .description:last span:first").text() == "Beer" ?
			$(event.currentTarget).parent().prev().children("span").text(main.quantity2ndDrink) :
			$(event.currentTarget).parent().prev().children("span").text(main.quantityDrink)						

			swapFood();	
		});

$("#details").on('click', function(event){
	event.preventDefault();
	/* Act on the event */
	details(main.screen);	
});

$("#detailsBoxA #emptyFood:first, #detailsBoxB #emptyFood:first").on('click', function(event){
	event.preventDefault();
	/* Act on the event */
	if(parseInt($("#detailsBox"+main.restaurant+" .quantityFood:first").text()) > 0)
		$("#detailsBox"+main.restaurant+" .quantityFood:first").text(
			parseInt($("#detailsBox"+main.restaurant+" .quantityFood:first").text() - 1)
			);
});

$("#detailsBoxA #emptyFood:last, #detailsBoxB #emptyFood:last").on('click', function(event){
	event.preventDefault();
	/* Act on the event */
	if(parseInt($("#detailsBox"+main.restaurant+" .quantityFood:last").text()) > 0)
		$("#detailsBox"+main.restaurant+" .quantityFood:last").text(
			parseInt($("#detailsBox"+main.restaurant+" .quantityFood:last").text() - 1)
			);
});

$("#detailsBoxA #emptyDrink:first, #detailsBoxB #emptyDrink:first").on('click', function(event){
	event.preventDefault();
	/* Act on the event */
	if(parseInt($("#detailsBox"+main.restaurant+" .quantityDrink:first").text()) > 0)
		$("#detailsBox"+main.restaurant+" .quantityDrink:first").text(
			parseInt($("#detailsBox"+main.restaurant+" .quantityDrink:first").text() - 1)
			);
});

$("#detailsBoxA #emptyDrink:last, #detailsBoxB #emptyDrink:last").on('click', function(event){
	event.preventDefault();
	/* Act on the event */
	if(parseInt($("#detailsBox"+main.restaurant+" .quantityDrink:last").text()) > 0)
		$("#detailsBox"+main.restaurant+" .quantityDrink:last").text(
			parseInt($("#detailsBox"+main.restaurant+" .quantityDrink:last").text() - 1)
			);
});

$("#detailsBoxA #confirmChanges, #detailsBoxB #confirmChanges").on('click', function(event){
	event.preventDefault();
	/* Act on the event */

	main.quantityFood = parseInt($("#detailsBox"+main.restaurant+" .quantityFood:first").text());
	main.quantity2ndFood = parseInt($("#detailsBox"+main.restaurant+" .quantityFood:last").text());
	main.quantityDrink = parseInt($("#detailsBox"+main.restaurant+" .quantityDrink:first").text());
	main.quantity2ndDrink = parseInt($("#detailsBox"+main.restaurant+" .quantityDrink:last").text());

	main.price = 0;
	main.price += main.quantityFood * parseFloat($("#rest"+main.restaurant+"Food #price").text());
	main.price += main.quantity2ndFood * parseFloat($("#rest"+main.restaurant+"Food #price").text());
	main.price += main.quantityDrink * parseFloat($("#rest"+main.restaurant+"Drink #price").text());
	main.price += main.quantity2ndDrink * parseFloat($("#rest"+main.restaurant+"Drink #price").text());

	$("#totalOrder #pay").prev().text(main.price+"€");

	$('#detailsBox' + main.restaurant).fadeOut("fast", function() {
		    // Animation complete.
		    $('#totalOrder').fadeIn("fast");
		    main.previousScreen = "restaurantMenu";
		    main.screen = "totalOrder";
		  });	
});

$("#pay").on('click', function(event){
	event.preventDefault();
	/* Act on the event */
	payBox(main.screen);
});

$("#cancel-pay").on('click', function(event){
	event.preventDefault();
	/* Act on the event */
	$('#back-button').click();	
});

$("#confirm-pay").on('click', function(event){
	event.preventDefault();
	/* Act on the event */
	cancelOrder();

	$("#payBox").fadeOut('fast', function() {
		$("#orderReady").children().last().text("Restaurant "+main.restaurant);
		$("#orderReady").fadeIn("fast");
		main.previousScreen="initial";
		main.screen="orderReady";
		if(main.numeroPedidos<5){
			main.numeroPedidos = main.numeroPedidos +1;
			main.pedidosProntos[main.numeroPedidos] = main.restaurant;
		}
	});
});

$("#retryFind").on('click', function(event){
	event.preventDefault();
	/* Act on the event */
	$('#back-button').click();	
});

$("#cancelFind").on('click', function(event){
	event.preventDefault();
	/* Act on the event */
	cancelFind();
	if(main.orderAction == "blocked")
		$('#' + main.screen).fadeOut("fast", function() {
		    // Animation complete.
		    $('#initial').fadeIn("fast");
		    main.screen = "initial";
		  });
	else if(main.orderAction == "back"){
		$('#' + main.screen).fadeOut("fast", function() {
		  	    // Animation complete.
		  	    findPeople(main.screen);
		  	  });
	}	
	else
		$('#' + main.screen).fadeOut("fast", function() {
		    // Animation complete.
		    $('#initial').fadeIn("fast");
		    main.screen = "initial";
		  });
});

$(document).keypress(function(event){
	if(event.keyCode == 32 && $.inArray(main.screen, main.availableScreens == 0))
		if(main.screen == "findTiago" || main.screen == "findMagda" || main.screen == "findCesar" || main.screen == "findStaff")
			getClose(main.screen);
	})
$(document).keypress(function(event){
	if(event.keyCode == 13)
		notification(main.screen);
})

blocked = function(screen){
	removeHologram(screen);
	removeHelp(screen);
	if((screen == "restaurant" + main.restaurant ||
		screen == "totalOrder" ||
		screen == "detailsBox" + main.restaurant ||
		screen == "payBox" || screen == "foodDrink") && main.price!=0)
		confirm(screen, "blocked");

	else if(screen == "findTiago" || screen == "findMagda" || screen == "findCesar" || screen == "findStaff"){
		confirmFind(main.screen,"blocked");
	}
	else
		$('#' + screen).fadeOut("fast", function() {
		    // Animation complete.
		    if(screen == "confirm-box")
		    	cancelOrder();
		    $('#blocked').fadeIn("fast");
		    main.previousScreen = "blocked";
		    main.screen = "blocked";
		  });
};

blockmessage = function(screen){
	$('#' + screen).fadeOut("fast", function() {
	    // Animation complete.
	    $('#blockmessage').fadeIn("fast");
	    
	    main.previousScreen = "blocked";
	    main.screen = "blockmessage";
	  });
};

initial = function(screen){
	removeHologram(screen);
	removeHelp(screen);
	if((screen == "restaurant" + main.restaurant ||
		screen == "totalOrder" ||
		screen == "detailsBox" + main.restaurant ||
		screen == "payBox" || screen == "foodDrink") && main.price!=0)
		confirm(screen, "initial");

	else if(screen == "findTiago" || screen == "findMagda" || screen == "findCesar" || screen == "findStaff"){
		confirmFind(main.screen,"blocked");
	}

	else
		$('#' + screen).fadeOut("fast", function() {
		    // Animation complete.
		    if(screen == "confirm-box")
		    	cancelOrder();
		    $('#initial').fadeIn("fast");
		    main.previousScreen = screen;
		    main.screen = "initial";
		  });
};

help = function(screen){
	if(screen == "help"){
		$('#back-button').click();
		return false;
	}
	removeHologram(screen);
	if(screen == "restaurants")
		screen = "fastFood";
	$('#' + screen).fadeOut("fast", function() {
	    // Animation complete.
	    $('#help').fadeIn("fast");

	    if(screen == "restaurant"+main.restaurant)
	    	screen = "restaurantMenu";
	    $('.helpMenu.' + screen).fadeIn("fast");

	    main.previousScreen = screen;
	    main.screen = "help";
	  });
};

findPeople = function(screen){
	$('#' + screen).fadeOut("fast", function() {
	    // Animation complete.
	    $('#findPeople').fadeIn("fast");
	    
	    main.previousScreen = "initial";
	    main.screen = "findPeople";
	  });
};

findStaff = function(screen){
	$('#' + screen).fadeOut("fast", function() {
	    // Animation complete.
	    $("#hologram").fadeIn("fast");
	    $("#hologramScreen").fadeIn("fast");
	    $('#findStaff').fadeIn("fast");
	    $('#findStaffScreen').fadeIn("fast");

	    $(".simulation-buttons").fadeIn("fast");
	    
	    main.previousScreen = "findPeople";
	    main.screen = "findStaff";
	    if(main.imageNumber!=1){
	    	main.imageNumber = (main.imageNumber-1);
	    }
	  });
};

findCesar = function(screen){
	$('#' + screen).fadeOut("fast", function() {
	    // Animation complete.
	    $("#hologram").fadeIn("fast");
	    $("#hologramScreen").fadeIn("fast");
	    $('#findCesar').fadeIn("fast");
	    $('#findCesarScreen').fadeIn("fast");

	    $(".simulation-buttons").fadeIn("fast");
	    
	    main.previousScreen = "findPeople";
	    main.screen = "findCesar";
	    if(main.imageNumber!=1){
	    	main.imageNumber = (main.imageNumber-1);
	    }
	  });
};

findMagda = function(screen){
	$('#' + screen).fadeOut("fast", function() {
	    // Animation complete.
	    $("#hologram").fadeIn("fast");
	    $("#hologramScreen").fadeIn("fast");
	    $('#findMagda').fadeIn("fast");
	    $('#findMagdaScreen').fadeIn("fast");

	    $(".simulation-buttons").fadeIn("fast");
	    
	    main.previousScreen = "findPeople";
	    main.screen = "findMagda";
	    if(main.imageNumber!=1){
	    	main.imageNumber = (main.imageNumber-1);
	    }
	  });
};

findTiago = function(screen){
	$('#' + screen).fadeOut("fast", function() {
	    // Animation complete.
	    $("#hologram").fadeIn("fast");
	    $("#hologramScreen").fadeIn("fast");
	    $('#findTiago').fadeIn("fast");
	    $('#findTiagoScreen').fadeIn("fast");

	    $(".simulation-buttons").fadeIn("fast");
	    
	    main.previousScreen = "findPeople";
	    main.screen = "findTiago";
	    if(main.imageNumber!=1){
	    	main.imageNumber = (main.imageNumber-1);
	    }
	  });
};

getClose = function(screen){
	$('#' + screen).fadeOut("fast", function() {
	    // Animation complete

	    if(main.imageNumber == 3){
	    	removeHologram(main.screen);
	    	setTimeout(function(){
	    		if(screen == "findStaff")
		    		$('#chegou img').attr("src", "projects/smartwatch/smartwatch_assets/images/staff.svg");
		    	else if(screen == "findCesar")
		    		$('#chegou img').attr("src", "projects/smartwatch/smartwatch_assets/images/cesar.png");
		    	else if(screen == "findMagda")
		    		$('#chegou img').attr("src", "projects/smartwatch/smartwatch_assets/images/magda.png");
		    	else if(screen == "findTiago")
		    		$('#chegou img').attr("src", "projects/smartwatch/smartwatch_assets/images/tiago.png");

		    	$(".simulation-buttons").fadeOut("fast");
	    		$('#chegou').fadeIn("fast");
	    		main.previousScreen = "initial";
	    		main.screen = "chegou";
	    		$('#' + screen +"Screen #distance").text("140m");
	    	}, 250);
	    }
	    else{
	    	var imageSrc = $('#' + screen).attr("src");
	    	
	    	if(screen == "findStaff")
	    		$('#' + screen).attr("src", main.hologramImages.staff[main.imageNumber]);
	    	else if(screen == "findCesar")
	    		$('#' + screen).attr("src", main.hologramImages.cesar[main.imageNumber]);
	    	else if(screen == "findMagda")
	    		$('#' + screen).attr("src", main.hologramImages.magda[main.imageNumber]);
	    	else if(screen == "findTiago")
	    		$('#' + screen).attr("src", main.hologramImages.tiago[main.imageNumber]);

	    	$('#' + screen).fadeIn("fast");

	    	if(main.imageNumber == 2)
	    		$('#' + screen +"Screen #distance").text("70m");
	    	main.imageNumber++;
	    }
	  });
};

removeHologram = function(screen){
	if($("#"+screen).parent("#hologram").length){
		$("#hologram").fadeOut("fast", function(){
			if(screen == "findStaff")
				$('#' + screen).attr("src", main.hologramImages.staff[0]);
			else if(screen == "findCesar")
				$('#' + screen).attr("src", main.hologramImages.cesar[0]);
			else if(screen == "findMagda")
				$('#' + screen).attr("src", main.hologramImages.magda[0]);
			else if(screen == "findTiago")
				$('#' + screen).attr("src", main.hologramImages.tiago[0]);
		});
		$("#"+screen+"Screen").fadeOut("fast");
		$("#hologramScreen").fadeOut("fast");
		$(".simulation-buttons").fadeOut("fast");
		}
	};

	bandSchedule = function(screen){
		$('#' + screen).fadeOut("fast", function() {
		    // Animation complete.
		    $('#bandSchedule').fadeIn("fast");
		    
		    main.previousScreen = "initial";
		    main.screen = "bandSchedule";
		  });
	};

	bandasMenu = function(screen){
		$('#' + screen).fadeOut("fast", function() {
		    // Animation complete.
		    $('#bandasMenu').fadeIn("fast");
		    
		    main.previousScreen = "bandSchedule";
		    main.screen = "bandasMenu";
		  });
	};

	findbanda1 = function(screen){
		$('#' + screen).fadeOut("fast", function() {
	    // Animation complete.
	    $("#hologram").fadeIn("fast");
	    $("#hologramScreen").fadeIn("fast");
	    $('#findbanda1').fadeIn("fast");
	    $('#findbanda1Screen').fadeIn("fast");
	    
	    main.previousScreen = "bandasMenu";
	    main.screen = "findbanda1";
	  });
	};

	findbanda2 = function(screen){
		$('#' + screen).fadeOut("fast", function() {
	    // Animation complete.
	    $("#hologram").fadeIn("fast");
	    $("#hologramScreen").fadeIn("fast");
	    $('#findbanda2').fadeIn("fast");
	    $('#findbanda2Screen').fadeIn("fast");
	    
	    main.previousScreen = "bandasMenu";
	    main.screen = "findbanda2";
	  });
	};

	findbanda3 = function(screen){
		$('#' + screen).fadeOut("fast", function() {
	    // Animation complete.
	    $("#hologram").fadeIn("fast");
	    $("#hologramScreen").fadeIn("fast");
	    $('#findbanda3').fadeIn("fast");
	    $('#findbanda3Screen').fadeIn("fast");
	    
	    main.previousScreen = "bandasMenu";
	    main.screen = "findbanda3";
	  });
	};

	findbanda4 = function(screen){
		$('#' + screen).fadeOut("fast", function() {
	    // Animation complete.
	    $("#hologram").fadeIn("fast");
	    $("#hologramScreen").fadeIn("fast");
	    $('#findbanda4').fadeIn("fast");
	    $('#findbanda4Screen').fadeIn("fast");
	    
	    main.previousScreen = "bandasMenu";
	    main.screen = "findbanda4";
	  });
	};

	findbanda5 = function(screen){
		$('#' + screen).fadeOut("fast", function() {
	    // Animation complete.
	    $("#hologram").fadeIn("fast");
	    $("#hologramScreen").fadeIn("fast");
	    $('#findbanda5').fadeIn("fast");
	    $('#findbanda5Screen').fadeIn("fast");
	    
	    main.previousScreen = "bandasMenu";
	    main.screen = "findbanda5";
	  });
	};

	findbanda6 = function(screen){
		$('#' + screen).fadeOut("fast", function() {
	    // Animation complete.
	    $("#hologram").fadeIn("fast");
	    $("#hologramScreen").fadeIn("fast");
	    $('#findbanda6').fadeIn("fast");
	    $('#findbanda6Screen').fadeIn("fast");
	    
	    main.previousScreen = "bandasMenu";
	    main.screen = "findbanda6";
	  });
	};

	findbanda7 = function(screen){
		$('#' + screen).fadeOut("fast", function() {
	    // Animation complete.
	    $("#hologram").fadeIn("fast");
	    $("#hologramScreen").fadeIn("fast");
	    $('#findbanda7').fadeIn("fast");
	    $('#findbanda7Screen').fadeIn("fast");
	    
	    main.previousScreen = "bandasMenu";
	    main.screen = "findbanda7";
	  });
	};


	findhorario11 = function(screen){
		$('#' + screen).fadeOut("fast", function() {
	    // Animation complete.
	    $("#hologram").fadeIn("fast");
	    $("#hologramScreen").fadeIn("fast");
	    $('#findhorario11').fadeIn("fast");
	    $('#findhorario11Screen').fadeIn("fast");
	    
	    main.previousScreen = "bandSchedule";
	    main.screen = "findhorario11";
	  });
	};

	findhorario12 = function(screen){
		$('#' + screen).fadeOut("fast", function() {
	    // Animation complete.
	    $("#hologram").fadeIn("fast");
	    $("#hologramScreen").fadeIn("fast");
	    $('#findhorario12').fadeIn("fast");
	    $('#findhorario12Screen').fadeIn("fast");
	    
	    main.previousScreen = "bandSchedule";
	    main.screen = "findhorario12";
	  });
	};

	findhorario21 = function(screen){
		$('#' + screen).fadeOut("fast", function() {
	    // Animation complete.
	    $("#hologram").fadeIn("fast");
	    $("#hologramScreen").fadeIn("fast");
	    $('#findhorario21').fadeIn("fast");
	    $('#findhorario21Screen').fadeIn("fast");
	    
	    main.previousScreen = "bandSchedule";
	    main.screen = "findhorario21";
	  });
	};

	findhorario22 = function(screen){
		$('#' + screen).fadeOut("fast", function() {
	    // Animation complete.
	    $("#hologram").fadeIn("fast");
	    $("#hologramScreen").fadeIn("fast");
	    $('#findhorario22').fadeIn("fast");
	    $('#findhorario22Screen').fadeIn("fast");
	    
	    main.previousScreen = "bandSchedule";
	    main.screen = "findhorario22";
	  });
	};
	
	fastFood = function(screen){
		$('#' + screen).fadeOut("fast", function() {
	    // Animation complete.
	    $('#fastFood').fadeIn("fast");
	    $('#restaurants').fadeIn("fast");

	    main.previousScreen = "initial";
	    main.screen = "restaurants";
	  });
	};

	foodDrink = function(screen){
		$('#' + screen).fadeOut("fast", function() {
	    // Animation complete.
	    $('#fastFood').fadeIn("fast");
	    $('#foodDrink').fadeIn("fast");
	    
	    main.previousScreen = "fastFood";
	    main.screen = "foodDrink";
	  });
	};

	restaurantMenu = function(screen){
		removeFastFood();
		$('#' + screen).fadeOut("fast", function() {
	    // Animation complete.

	    if(main.food){
	    	if($('#rest' + main.restaurant + "Food .description div:first span:first").text() == "Pizza" ||
	    		$('#rest' + main.restaurant + "Food .description div:first span:first").text() == "Hot dog")
	    		$('#rest' + main.restaurant + "Food #qttUp").next().text(main.quantityFood);
	    	else
	    		$('#rest' + main.restaurant + "Food #qttUp").next().text(main.quantity2ndFood);

	    	$('#rest' + main.restaurant + "Drink").fadeOut("fast", function(){
	    		$('#rest' + main.restaurant + "Food").fadeIn("fast");
	    		$('#restaurant' + main.restaurant).fadeIn("fast");
	    	});
	    }
	    else{
	    	if($('#rest' + main.restaurant + "Drink .description div:first span:first").text() == "Coca-cola" ||
	    		$('#rest' + main.restaurant + "Drink .description div:first span:first").text() == "Beer")
	    		$('#rest' + main.restaurant + "Drink #qttUp").next().text(main.quantityDrink);
	    	else
	    		$('#rest' + main.restaurant + "Drink #qttUp").next().text(main.quantity2ndDrink);

	    	$('#rest' + main.restaurant + "Food").fadeOut("fast", function(){
	    		$('#rest' + main.restaurant + "Drink").fadeIn("fast");
	    		$('#restaurant' + main.restaurant).fadeIn("fast");
	    	});
	    }

	    main.previousScreen = "foodDrink";
	    main.screen = "restaurant" + main.restaurant;
	  });
};

totalOrder = function(screen){
	$('#' + screen).fadeOut("fast", function() {
	    // Animation complete.
	    $('#totalOrder #pay').prev().text(main.price + "€");
	    $('#totalOrder').fadeIn("fast");
	    main.previousScreen = "restaurantMenu";
	    main.screen = "totalOrder";
	  });
};

	swapFood = function(screen){
		if(main.restaurant == "A")
			if(main.food){
				$("#restaurantA .description:first span:first").fadeOut('fast', function() {
					$("#restaurantA .description:first span:first").text() == "Pizza" ?
					$("#restaurantA .description:first span:first").text("Rusk") :
					$("#restaurantA .description:first span:first").text("Pizza")
					$("#restaurantA .description:first span:first").fadeIn("fast");
				});
			}
			else{
				$("#restaurantA .description:last span:first").fadeOut("fast", function() {
					$("#restaurantA .description:last span:first").text() == "Coca-cola" ?
					$("#restaurantA .description:last span:first").text("Water") :
					$("#restaurantA .description:last span:first").text("Coca-cola")	
					$("#restaurantA .description:last span:first").fadeIn("fast");	
				});		
			}
		else
			if(main.food){
				$("#restaurantB .description:first span:first").fadeOut("fast", function() {
					$("#restaurantB .description:first span:first").text() == "Hot dog" ?
					$("#restaurantB .description:first span:first").text("Hamburguer") :
					$("#restaurantB .description:first span:first").text("Hot dog")
					$("#restaurantB .description:first span:first").fadeIn("fast");
				});
			}
			else{
				$("#restaurantB .description:last span:first").fadeOut("fast", function() {
					$("#restaurantB .description:last span:first").text() == "Beer" ?
					$("#restaurantB .description:last span:first").text("Ice Tea") :
					$("#restaurantB .description:last span:first").text("Beer")	
					$("#restaurantB .description:last span:first").fadeIn("fast");		
				});	
			}
	};

	removeFastFood = function(){
		$('#fastFood').fadeOut("fast");
		$('#restaurants').fadeOut("fast");
		$('#foodDrink').fadeOut("fast");
	};

	cancelOrder = function(){
		main.quantityFood = 0;
		main.quantityDrink = 0;
		main.quantity2ndFood = 0;
		main.quantity2ndDrink = 0;
		main.price = 0;
		removeFastFood();
		$("#restaurant"+main.restaurant+" .quantity span").text(0);
		$("#totalOrder #pay").prev().text("0€");
	};

	confirm = function(screen, orderAction){
		main.orderAction = orderAction;
		$('#fastFood').fadeOut("fast", function () {
			$('#foodDrink').fadeOut("fast", function (){
				$('#payBox').fadeOut("fast", function(){
					$('#detailsBox'+main.restaurant).fadeOut("fast", function(){
						$('#totalOrder').fadeOut("fast", function(){
							$('#restaurant' + main.restaurant).fadeOut("fast", function(){
								$("#confirm-box").fadeIn("fast");
							});
						});
					});
				});
			});
		});

		if(screen == "restaurantA" || screen == "restaurantB")
			main.previousScreen = "restaurantMenu";
		else
			main.previousScreen = screen;

		main.screen = "confirm-box";
	};

	details = function(screen){
		if(main.quantityFood == 0)
			$("#detailsBox"+main.restaurant+" .enabled").first().fadeOut();
		else
			$("#detailsBox"+main.restaurant+" .enabled").first().fadeIn();

		if(main.quantity2ndFood == 0)
			$("#detailsBox"+main.restaurant+" .enabled").first().next().fadeOut();
		else
			$("#detailsBox"+main.restaurant+" .enabled").first().next().fadeIn();

		if(main.quantityDrink == 0)
			$("#detailsBox"+main.restaurant+" .enabled").last().prev().fadeOut();
		else
			$("#detailsBox"+main.restaurant+" .enabled").last().prev().fadeIn();

		if(main.quantity2ndDrink == 0)
			$("#detailsBox"+main.restaurant+" .enabled").last().fadeOut();
		else
			$("#detailsBox"+main.restaurant+" .enabled").last().fadeIn();

		$("#detailsBox"+main.restaurant+" .quantityFood:first").text(main.quantityFood);
		$("#detailsBox"+main.restaurant+" .quantityFood:last").text(main.quantity2ndFood);
		$("#detailsBox"+main.restaurant+" .quantityDrink:first").text(main.quantityDrink);
		$("#detailsBox"+main.restaurant+" .quantityDrink:last").text(main.quantity2ndDrink);
		$('#' + screen).fadeOut("fast", function() {
	    // Animation complete.
	    if(main.price == 0){
	    	$("#denyBox").fadeIn("fast");
	    	main.previousScreen = "totalOrder";
	    	main.screen = "denyBox";
	    }
	    else{
	    	$("#detailsBox" + main.restaurant).fadeIn("fast");
	    	main.previousScreen = "totalOrder";
	    	main.screen = "detailsBox" + main.restaurant;
	    }	    
	  });
	};

	payBox = function(screen){
		$('#' + screen).fadeOut("fast", function() {
    // Animation complete.
    if(main.price == 0){
    	$("#denyBox").fadeIn("fast");
    	main.previousScreen = "totalOrder";
    	main.screen = "denyBox";}
    	else{
    		$('#payBox').fadeIn("fast");
    		main.previousScreen = "totalOrder";
    		main.screen = "payBox";
    	}
    });
	};

	removeHelp = function(screen){
		if(main.screen == "help"){
			$('#help').fadeOut("fast");
			$('.helpMenu.' + main.previousScreen).fadeOut("fast");
		}
	};

	notification = function(screen){
		if(main.numeroPedidos == 0 || main.screen == notification)
			return false;
		removeHologram(screen);
		removeHelp(screen);
		$('#' + screen).fadeOut("fast", function() {

			if(main.numeroPedidos == 0)
				return false;
			$("#notification").children().last().text("Restaurant "+main.pedidosProntos[1]);
			$("#notification").fadeIn("fast");

			main.numeroPedidos=main.numeroPedidos-1;

			for (var i = 1; i <= main.numeroPedidos; i++) {
				main.pedidosProntos[i]=main.pedidosProntos[i+1];
			};

			main.previousScreen = screen;
			main.screen = "notification";
		});  
	};

	confirmFind = function(screen, orderAction){
		main.orderAction = orderAction;
		$('#' + screen).fadeOut("fast", function () {
			$("#confirmFind").fadeIn("fast");

		});
		main.previousScreen = screen;
		main.screen = "confirmFind";
	};

	cancelFind = function(){
		$('#' + main.previousScreen +"Screen #distance").text("140m");
		main.imageNumber = 1;
	};
});