$(document).ready(function() {

	main = this;
	main.previousScreen = "blocked";
	main.screen = "blocked";  //Begins with blocked screen
	main.availableScreens = ["findStaff", "findCesar", "findMagda", "findTiago"];
	main.eventProcessed = false;

	$('#back-button').on('click', function(event) {
		event.preventDefault();
		/* Act on the event */

		if(main.screen == "initial"){
			return false;
		}

		if(main.screen == "help"){
			$('#help').fadeOut("fast");
			if($.inArray(main.previousScreen, main.availableScreens) != -1)
	    	$('.helpMenu.finding').fadeOut("fast");
	    else
	    	$('.helpMenu.' + main.previousScreen).fadeOut("fast");
	  }

		removeHologram(main.screen);
		removeHelp(main.screen);
		window[main.previousScreen](main.screen);
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
	    if($.inArray(screen, main.availableScreens) != -1)	
	    	$('.helpMenu.finding').fadeIn("fast");
	    else
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
	    
	    main.previousScreen = "findPeople";
	    main.screen = "findTiago";
	  });
	};

	removeHologram = function(screen){
		if($("#"+screen).parent("#hologram").length){
			$("#hologram").fadeOut("fast");
			$("#"+screen+"Screen").fadeOut("fast");
			$("#hologramScreen").fadeOut("fast");
		}
	};

	removeHelp = function(screen){
		if(main.screen == "help"){
			$('#help').fadeOut("fast");
			if($.inArray(main.previousScreen, main.availableScreens) != -1)
	    	$('.helpMenu.finding').fadeOut("fast");
	    else
	    	$('.helpMenu.' + main.previousScreen).fadeOut("fast");
	  }
	};
});