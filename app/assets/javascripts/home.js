// requires jQuery
var Search = (function(){

	var cls = function (name, items) {

		var i,
			self = this,
			li = [];

		self.name = name;
		self.elem = $('#' + name);
		self.list = $('#' + name).next('ul');
		self.items = items;

		// add event listeners
		self.elem.bind('keyup', function (e) { self.change(e); }); 

		// create the lists with items provided

		for (i = 0; i < items.length; i+=1) {
			li.push('<li id="i-' + name + '-' + i + '">' + items[i] + '</li>')
		}

		self.list.empty().html(li.join(''));
	};

	cls.prototype = {
		change: function (e) {

			var i, id, first,
				self = this,
				items = self.items,
				name = self.name,
				textbox = self.elem,
				list = self.list,
				typed = textbox.val(),
				code = (e.keyCode ? e.keyCode : e.which);

			// checks if the enter key wsas pressed
			if (code === 13) {

				// gets the first item in the list
				first = list.children('li:not(.zero):first').html();

				if (typed !== '' && first) {
					
					textbox.closest('.armani').prevAll('.fedago:first').html(first);
					textbox.closest('.armani').hide();
				} 
				
			} else {
				// only do something if there is something typed
				if (typed !== '') {
					// remove irrelevent items from the list

					for (i = 0; i < items.length; i+=1) {
						id = "#i-" + name + "-" + i;

						if(items[i].search(typed) === -1) {
							$(id).addClass('zero');
						} else {
							if ($(id).hasClass('zero')) {
								$(id).removeClass('zero');
							}
						}
					}

				} else {
					for (i = 0; i < items.length; i+=1) {
						id = "#i-" + name + "-" + i;
						if ($(id).hasClass('zero')) {
							$(id).removeClass('zero');
						}
					}
				}
			}

		}
	};

	return cls;

}());



// Requires that the youtube playuer is defined
var ytf = (function(){

	var current_mood, current_style,
		// this is the index of where to start pulling songs from echonest
		index = 1,
		results = 15,
		playlist = [],
		playing = false,
		current = null,
		total = 0, // how many videos are in the playlist
		BLOCKED = false;

	var getParameterByName = function (name) {

		var s, regex, results;

		name = name.replace(/[\[]/, "\\\\[").replace(/[\]]/, "\\\\]");
		s = "[\\?&]" + name + "=([^&#]*)";
		regex = new RegExp(s);
		results = regex.exec(window.location.search);

		if (results === null) {
			return "";
		} 

		return decodeURIComponent(results[1].replace(/\+/g, " "));
		
			
	};

	return {

		init: function () {
			var mood = getParameterByName('mood'),
				style = getParameterByName('style'),
				target = document.getElementById('spinner');
			

			// if both query params are given than run the app
			if (mood && style && !BLOCKED) {

				// only search if the query parameters are valid enties
				if ($.inArray(mood, moods) >= 0 && $.inArray(style, styles) >= 0) {

					// update the dropdowns
					$('#mood .fedago').html(mood);
					$('#style .fedago').html(style);

					spinner.spin(target);

					ytf.getResults(mood,style);
				}
			}
		},




		// first grabs the songs list from echonest, than querys youtube a good video link ofr each son
		getResults: function (mood, style, start_index) {

			var eq, yq, 
				plst = [],
				target = document.getElementById('spinner'),
				echonest = "http://developer.echonest.com/api/v4/song/search?";

			// Only want to query results if ajax is currently not involved in a request
			// This is mostly becuase EchoNest limits to 2 requests a minute, so we don't want to waste them if a user clicks the submit button repeatetly
			if (!BLOCKED) {

				// jquery support for cross domian scripting
				$.support.cors = true;

				// show the ajax spinner
				spinner.spin(target);
				
				// now we cant submit again until the server returns
				BLOCKED = true;

				// update the current selections
				current_mood = mood;
				current_style = style;

				// set the index to start getting the next batch of songs
				if (start_index) {
					index = index + results;
				}

				// encode the parameters
				eq = $.param({ 
					api_key: 'DFR40AUNFWISTMVBG', 
					format: "jsonp",
					start: index,
					song_type: "studio",
					song_min_hotttnesss: "0.25",
					artist_min_hotttnesss: "0.25",
					results: results,
					mood: current_mood,
					style: current_style,
				});


				// get song list from echonest
				$.ajax({
					url: echonest,
					dataType: 'jsonp',
					crossDomain: true,
					data: eq,
					success: function (echo) {
						var i, 
							total = 0,
							requests = 0, 
							songs = echo.response.songs;

						// checks if any songs were returned
						if (songs && songs.length > 0) {

							// we need to know how many requests are made to so we can figure out when all the async requests are done
							total = songs.length;

							// go through every song and look it up on youtube
							for (i = 0; i < songs.length; i +=1) {


								(function(song) {

									var youtube = "https://gdata.youtube.com/feeds/api/videos?";

									yq = $.param({ 
										"q": song.artist_name + "+" + song.title, 
										"orderby": "relevance_lang_en",
										"start-index": "1",
										"max-results": "1",
										"v": "2",
										"duration": "short",
										"category": "Music",
										"format": "5",
										"fields": "entry",
										"alt": "json-in-script"
									});

									$.ajax({
										url: youtube,
										dataType: 'jsonp',
										crossDomain: true,
										data: yq,
										success: function (search_result) {

											var id, video,
												entry = search_result.feed.entry;

											if (entry) {
												// only push the song onto the plst if youtube gave us result for it
												if (entry.length > 0) {

													id = entry[0].id["$t"];

													if (id) {

														video = id.split(':');

														if (video.length > 2) {
															plst.push({
																artist: song.artist_name,
																title: song.title,
																id: video[3]
															});
														}
													}

												}
											}

										},
										complete: function () {
											requests+=1;

											// if all the requests to youtube are done we can fire the callback
											if (requests === total) {

												spinner.stop();
												BLOCKED = false;

												// if the array is empty tha no youtube videos were found
												if (plst && plst.length > 0) {

													$('#player-container').css('left','0');
													ytf.buildPlaylist(plst);
													ytf.play(plst[0].id);
													
												} else {

													alert('No videos found! Sorry about that.');
												}
											}
										},
										error: function (xhr, text, error) {
											// Nothing to be done if a request to youtube comes back with an error
										}
									});

								})(songs[i]);
							}

						} else {
							spinner.stop();
							BLOCKED = false;
							alert('Sorry, but we couldn\'t find any songs.');
						}



					},
					error : function (xht, text, error) {
						spinner.stop();
						BLOCKED = false;
						alert("There was a problem retrieving songs from EchoNest.");
					}
				});
			}

		},

		// get a new set of results for the current mood and style
		refresh: function () {
			ytf.getResults(current_mood, current_style, true)
		},

		play: function (id) {
			if (player) {
				player.loadVideoById(id);
				current = id;
				playing = true;

				// find the playlist item and add the class for the background and the background 
				$('.plist-itm').removeClass("active");
				$("#playlist").find("[data-id='" + id + "']").addClass('active');
			}
			
		},
		next: function () {

			// check if the player and playlist have been initialized
			if (player && current) {
				// get the next video by looking up the array index of the current video
				var indx = $.inArray(current, playlist);

				// indicate that a video is not playing
				playing = false;

				// checks that the video is not the last one in the playlist
				if (indx >=0 && (indx < total)) {
					
					// checks if there is another id in the playlist
					if (playlist[indx+1]) {
						ytf.play(playlist[indx+1]);
					} else {
						// get a new set of results
						ytf.getResults(current_mood, current_style, true);
					}
				} 
			}
			
		},
		buildPlaylist: function (res) {

			var str = [],
				songs = []; // Keep track of titles so we dont add any duplicates to the playlist


			// clear out the playlist 
			playlist = [];

			if (res) {
				for (var i = 0; i < res.length; i+=1) {

					var song = res[i].artist.toUpperCase() + ' - ' + res[i].title;
					var id = res[i].id;


					// checks if the song was returned more tha nonce from youtube or echonest
					if ($.inArray(song, songs) < 0 && $.inArray(id, playlist) < 0) {
						str.push('<div data-id="' + id + '" class="plist-itm">' + song + '</div>');
						songs.push(song);
						playlist.push(id);
						total+=1;
					}

				}
				$('#playlist').html(str.join(''));
			}

		},

		getPlaylist: function () {
			return playlist;
		},

		setIndex: function (ind) {
			index = ind;
		},

		isVideoPlaying: function () {
			return playing;
		},

		isBlocked: function () {
			return BLOCKED;
		}
	}

}());


$(document).ready(function () {

	// init the search features in the drop downs
	var moody = new Search('mood-search', moods);
	var stylish = new Search('style-search', styles);

	// Hide the dropdowns when clicked outside of them
	$(document).click(function(){
		$('.armani').hide();
	});

	// Submit the data by pressing enter
	$(document).keypress(function(e) {
		var code = (e.keyCode ? e.keyCode : e.which);

		// checks if the enter key wsas pressed, and the dropwn downs arwe hidden ,and there is not a video playing
		if (code === 13 && !$('.armani').is(":visible") && !ytf.isVideoPlaying()) {
			// only submit the data if both drop downs are hidden
			var mood = $.trim($('#mood .fedago').html());
			var style = $.trim($('#style .fedago').html());

			// make sure a mood and style are selected
			if (mood.charAt(0) !== '<' && style.charAt(0) !== '<') {
				ytf.getResults(mood,style);
			} else {
				alert('Choose your mood and pick a style - we\'ll handle the rest.');
			}
		}
	});

	// This prevents the click event from bubbling
	$('#mood, #style').click(function(event){
		event.stopPropagation();
	});


	$('.fedago').click(function () {
		$(this).nextAll('.armani:first').toggle();
	});

	$('#share-twitter').click(function () {

		var mood = $('#mood .fedago').html(),
			style = $('#style .fedago').html(),
			www = "www.moodfuse.com?mood=" + encodeURIComponent(mood) + "&style=" + encodeURIComponent(style),
			link = $.param({ 
				url: 'http://www.moodfuse.com', 
				text: "I'm listenting to " + mood + " " + style + " on @MoodFuse " + www
			});

		window.open('https://twitter.com/share?' + link,"Share","toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=yes,width=500,height=320");
		return false;

	});

	$('#share-facebook').click(function () {

		http://www.facebook.com/sharer.php?u=URL-TO-SHARE-HERE"><img style="width:26px;height:26px;" src=".../facebook2.png"%>"/></a>
		
		var mood = $('#mood .fedago').html(),
			style = $('#style .fedago').html(),
			link = $.param({ 
				u: "www.moodfuse.com?mood=" + encodeURIComponent(mood) + "&style=" + encodeURIComponent(style), 
				text: "I'm listenting to " + mood + " " + style + " on MoodFuse"
			});

		//window.open('http://www.facebook.com/pages/MoodFuse/146675805480848',"Share on Facebook","toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=yes,width=800,height=600");
		window.open('http://www.facebook.com/sharer.php?' + link,"Share","toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=yes,width=500,height=320");
		return false;

	});

	$('.plist-itm').live('click', function () {
		var video_id = $(this).data('id')
		ytf.play(video_id);
	});


	$('.armani li').click(function () {
		
		var selected = $(this).html();

		$(this).closest('.armani').prevAll('.fedago:first').html(selected);
		$(this).closest('.armani').hide();

	});


	$("#submit").click(function () {
		// only submit the data if both drop downs are hidden
		var mood = $.trim($('#mood .fedago').html());
		var style = $.trim($('#style .fedago').html());

		// make sure a mood and style are selected
		if (mood.charAt(0) !== '<' && style.charAt(0) !== '<') {
			ytf.setIndex(1);
			ytf.getResults(mood,style);
		} else {
			alert('Choose your mood and pick a style - we\'ll handle the rest.');
		}
	});


	$('#next').click(function () {
		ytf.next();
		
	});

	$('#refresh').click(function () {
		ytf.refresh();
		
	});


	$('#surprise').click(function () {

		var mood = moods[Math.floor(Math.random() * (moods.length + 1))];
		var style = styles[Math.floor(Math.random() * (styles.length + 1))];

		// update the dropdowns
		if (!ytf.isBlocked()) {
			$('#mood .fedago').html(mood);
			$('#style .fedago').html(style);
		}

		ytf.setIndex(1);
		ytf.getResults(mood,style);



		
	});

});
