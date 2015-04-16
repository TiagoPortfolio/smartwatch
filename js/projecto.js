$(document).ready(function() {

	main = this;
	main.previousScreen = "blocked";
	main.screen = "blocked";  //Begins with blocked screen
	main.availableScreens = ["findStaff", "findCesar", "findMagda", "findTiago"];
	main.imageNumber = 1;
	main.hologramImages = {
		"staff" : [
			"images/path_staff.png", "images/path_staff_1.png", "images/path_staff_2.png"
		],
		"cesar" : [
			"images/path_cesar.png", "images/path_cesar_1.png", "images/path_cesar_2.png"
		],
		"magda" : [
			"images/path_magda.png", "images/path_magda_1.png", "images/path_magda_2.png"
		],
		"tiago" : [
			"images/path_tiago.png", "images/path_tiago_1.png", "images/path_tiago_2.png"
		]
	};
	main.eventProcessed = false;

	$('#back-button').on('click', function(event) {
		event.preventDefault();
		/* Act on the event */

		if(main.screen == "initial" || main.screen == "blocked"){
			return false;
		}

		removeHologram(main.screen);
		removeHelp(main.screen);
		setTimeout(function(){
			window[main.previousScreen](main.screen);
		}, 150);
	});

	$('#home-button').mousedown(function(event) {
		// event.preventDefault();
    clearTimeout(this.downTimer);
    this.downTimer = setTimeout(function() {
			blocked(main.screen);
			main.eventProcessed = true;
    }, 1000);
	}).mouseup(function(event) {
    clearTimeout(this.downTimer);
    if(!main.eventProcessed){
			initial(main.screen);
    }
		main.eventProcessed = false;
	});

 	$('#help-button').on('click', function(event){
		event.preventDefault();
		if(main.screen != "blocked" && $.inArray(main.screen, main.availableScreens) == -1)
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
		if(!main.eventProcessed)
    	getClose(main.screen);
  });

	blocked = function(screen){
		removeHologram(screen);
		removeHelp(screen);
		$('#' + screen).fadeOut("fast", function() {
	    // Animation complete.
	    $('#blocked').fadeIn("fast");
	    main.previousScreen = "blocked";
	    main.screen = "blocked";
	  });
	};

	initial = function(screen){
		removeHologram(screen);
		removeHelp(screen);
		$('#' + screen).fadeOut("fast", function() {
	    // Animation complete.
	    $('#initial').fadeIn("fast");
	    main.previousScreen = screen;
	    main.screen = "initial";
	  });
	};

	help = function(screen){
		removeHologram(screen);
		$('#' + screen).fadeOut("fast", function() {
	    // Animation complete.
	    $('#help').fadeIn("fast");
	    $('.helpMenu.' + screen).fadeIn("fast");
	    if(screen != "help")
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
	  });
	};

	getClose = function(screen){
		$('#' + screen).fadeOut("fast", function() {
	    // Animation complete

	    if(main.imageNumber == 3){
	    	main.processed = true;
	    	removeHologram(main.screen);
	    	setTimeout(function(){
	  			$('#chegou').fadeIn("fast");
	  			main.previousScreen = "initial";
	  	    main.screen = "chegou";
	  	    main.processed = false;
	    	}, 1000);
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

		    $.each($("#hologram img"), function(index, val) {
		    	 $(val).fadeOut("fast");
		    });

				$("#"+screen+"Screen").fadeOut("fast");
				$("#hologramScreen").fadeOut("fast");
				$(".simulation-buttons").fadeOut("fast");
			});
		}
		main.imageNumber = 1;
	};

	removeHelp = function(screen){
		if(main.screen == "help"){
			$('#help').fadeOut("fast");
	    $('.helpMenu.' + main.previousScreen).fadeOut("fast");
	  }
	};
});