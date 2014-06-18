///////////////////////////////////////////////////////////////////////////////
////// Fonction pour positionner le bloc d'actu au chargement de la page //////
///////////////////////////////////////////////////////////////////////////////
function initBlocNotreActu(){
	TweenMax.to($('#bloc-actus'), 0, {x: "-100px"});
}

///////////////////////////////////////////////////////////////////////////////
////// Fonction pour positionner le bloc videos au chargement de la page //////
///////////////////////////////////////////////////////////////////////////////
function initBlocVideo(){
	TweenMax.to($('#bloc-videos-actus'), 0, {x: "-100px"});
}


///////////////////////////////////////////////////////////////////////////////
////// Fonctions pour animer l'apparition et la disparition du bloc Actus /////
///////////////////////////////////////////////////////////////////////////////
function animateApparitionBlocActus(){
	if($("#content").hasClass("aucun-bloc-ouvert")){
		tlbouton1.pause();
		// apparition du bloc actus
		TweenMax.to($("#bloc-actus"), 0, {display: "block"});
		
		TweenMax.to($("#ascrail2000"), 0, {display: "block"});
		
		TweenMax.to($("#ascrail2000"), blocActusAnimationTime, {opacity: "1", delay:blocActusDelay});
		TweenMax.to($("#bloc-actus"), blocActusAnimationTime, {x: "0", opacity: "1", delay:blocActusDelay, onComplete: function() {
			$("#content").removeClass().addClass("bloc-actus-ouvert");
			customActuScroll();
		}});
		
		// le btn votre actu s'anime vers le haut
		TweenMax.to($('a#btn-notre-actu'), blocActusAnimationTime, {top: "-10px"});
		
		// le bloc slides s'anime vers la droite
		TweenMax.to($('#bloc-slides'), blocActusAnimationTime, {x: "300px", opacity: "0.5", onReverseComplete: function(){
			$("#content").removeClass().addClass("aucun-bloc-ouvert");
		}});

	}
}

function animateDisparitionBlocActus(){
	if($("#content").hasClass("bloc-actus-ouvert")){
		tlbouton1.play();
		
		TweenMax.to($("#bloc-actus"), 0.1, {x: "-100px", opacity: "0", onComplete: function() {
			$("#bloc-actus").css("display","none");
		}});
		TweenMax.to($('#bloc-slides'), 0.1, {x: "0", opacity: "1", onComplete: function(){
			$("#content").removeClass().addClass("aucun-bloc-ouvert");
		}});
		
		TweenMax.to($('a#btn-notre-actu'), 0.1, {top: "50%", delay: blocActusAnimationTime});
		
		removeCustomActuScroll();
	}else if($("#content").hasClass("bloc-videos-actus-ouvert")){
		// stopper la video
		stopVideos();
		$("#videos-actus li.video-actu").css("display","none");

		removeCustomActuOuverteScroll();
		removeCustomActuScroll();
		TweenMax.to($(".video-actu"), 0, {display: "none"});
		TweenMax.to($('#bloc-videos-actus'), actusAnimationTime, {x: "-100px", opacity: "0", onComplete: function() {
			TweenMax.to($('#bloc-videos-actus'), 0, {display: "none"});
		}});
		TweenMax.to($('#bloc-actus'), 0.2, {x: "0", onComplete: function(){
			customActuScroll();
		}});
		TweenMax.to($('#bloc-slides'), 0.2, {x: "300px", onComplete: function() {
			$("#content").removeClass().addClass("bloc-actus-ouvert");
			TweenMax.to($(".actu"), 0.2, {opacity: "1"});
		}});
		
		
		
		$("li.actu.has-video.ouvert").removeClass("ouvert");
	}
}

////////////////////////////////////////////////////////////////////////////////
////// Fonctions pour animer l'apparition et la disparition du bloc Videos /////
////////////////////////////////////////////////////////////////////////////////
function animateApparitionVideo(videoID){
	if(($("html").hasClass("no-touch"))&&($(window).width()>767)){
		if($("#content").hasClass("bloc-actus-ouvert")){
			removeCustomActuScroll();
			
			// apparition du bloc video
			tlBlocVideo = new TimelineMax();
			tlVideo = new TimelineMax();
			tlLiensActus= new TimelineMax();
			tlBlocVideo.to($('#bloc-videos-actus'), 0, {display: "block"});
			
			scrollToVideo(videoID);
			
			// afficher la bonne video
			tlBlocVideo.to($("#video-actu-"+videoID), 0, {display: "block"});
			tlBlocVideo.to($('#bloc-videos-actus'), actusAnimationTime, {x: "0", opacity: "1", onComplete: function() {
				$("#content").removeClass().addClass("bloc-videos-actus-ouvert");
			}});
			$("#"+videoID).addClass("ouvert");
			tlVideo.to($("#video-actu-"+videoID), actusAnimationTime, {opacity: "1"});
			tlLiensActus.to($(".actu:not('#"+videoID+"')"), actusAnimationTime, {opacity: "0.6"});
			
			// le bloc actus s'anime vers la droite
			tlBlocActusPart2 = new TimelineMax();
			tlBlocActusPart2.to($('#bloc-actus'), actusAnimationTime, {x: "430px", onComplete: function(){
				//customActuScroll();
				//if($("#"+videoID).hasClass("has-actu")){
					customActuOuverteScroll();
				//}
			}, onReverseComplete: function() {
				customActuScroll();
			}});
			
			// le bloc slides s'anime vers la droite
			tlBlocSlidesPart2 = new TimelineMax();
			tlBlocSlidesPart2.to($('#bloc-slides'), actusAnimationTime, {x: "650px", onReverseComplete: function() {
				$("#content").removeClass().addClass("bloc-actus-ouvert");
			}});
			
		}else if($("#content").hasClass("bloc-videos-actus-ouvert")){
			if(!($("#"+videoID).hasClass("ouvert"))){
				// stopper la video
				stopVideos();
				removeCustomActuOuverteScroll();
				if($("li.actu.has-video").hasClass("ouvert")){
					oldVideoActuID = $("li.actu.has-video.ouvert").attr("id");
				}else {
					oldVideoActuID = $("li.actu.has-actu.ouvert").attr("id");
				}
				
				tlVideo.to($("#video-actu-"+oldVideoActuID), 0, {display: "none"});
				tlVideo.to($("#video-actu-"+oldVideoActuID), actusAnimationTime, {opacity: "0"});
				
				tlVideo = new TimelineMax();
				tlVideo.to($("#video-actu-"+videoID), 0, {display: "block"});
				tlVideo.to($("#video-actu-"+videoID), actusAnimationTime, {opacity: "1"});
				tlLiensActus.to($(".actu:not('#"+videoID+"')"), actusAnimationTime, {opacity: "0.6"});
				tlLiensActus.to($(".actu#"+videoID), actusAnimationTime, {opacity: "1", onComplete: function(){
					//if($("#"+videoID).hasClass("has-actu")){
						customActuOuverteScroll();
					//}
				}});
				$("#"+oldVideoActuID).removeClass("ouvert");
				$("#"+videoID).addClass("ouvert");
				
	
				scrollToVideo(videoID);
			}else{
				animateDisparitionBlocActus();
				$("li.actu.has-video.ouvert").removeClass("ouvert");
				removeCustomActuOuverteScroll();
			}
		}
	}else{
		// sur mobile
		if($("#content").hasClass("bloc-actus-ouvert")){
			// apparition du bloc video
			tlBlocVideo = new TimelineMax();
			tlVideo = new TimelineMax();
			tlLiensActus= new TimelineMax();
			tlBlocVideo.to($('#bloc-videos-actus'), 0, {display: "block"});
			
			scrollToVideo(videoID);
			
			// afficher la bonne video
			tlBlocVideo.to($("#video-actu-"+videoID), 0, {display: "block"});
			tlBlocVideo.to($('#bloc-videos-actus'), actusAnimationTime, {x: "0", opacity: "1", onComplete: function() {
				$("#content").removeClass().addClass("bloc-videos-actus-ouvert");
			}});
			$("#"+videoID).addClass("ouvert");
			tlVideo.to($("#video-actu-"+videoID), actusAnimationTime, {opacity: "1"});
			tlLiensActus.to($(".actu:not('#"+videoID+"')"), actusAnimationTime, {opacity: "0.6"});
			
			// le bloc actus s'anime vers la droite
			tlBlocActusPart2 = new TimelineMax();
			if($(window).width()>"767"){
				tlBlocActusPart2.to($('#bloc-actus'), actusAnimationTime, {x: "380px", onComplete: function(){
					//customActuScroll();
					//if($("#"+videoID).hasClass("has-actu")){
						customActuOuverteScroll();
					//}
				}, onReverseComplete: function() {
					customActuScroll();
				}});
			}else {
				tlBlocActusPart2.to($('#bloc-actus'), actusAnimationTime, {x: "800px", onComplete: function(){
					//customActuScroll();
					//if($("#"+videoID).hasClass("has-actu")){
						customActuOuverteScroll();
					//}
				}, onReverseComplete: function() {
					customActuScroll();
				}});
			}
		}else if($("#content").hasClass("bloc-videos-actus-ouvert")){
				if(!($("#"+videoID).hasClass("ouvert"))){
					// stopper la video
					stopVideos();
					removeCustomActuOuverteScroll();
					if($("li.actu.has-video").hasClass("ouvert")){
						oldVideoActuID = $("li.actu.has-video.ouvert").attr("id");
					}else {
						oldVideoActuID = $("li.actu.has-actu.ouvert").attr("id");
					}
					
					tlVideo.to($("#video-actu-"+oldVideoActuID), 0, {display: "none"});
					tlVideo.to($("#video-actu-"+oldVideoActuID), actusAnimationTime, {opacity: "0"});
					
					tlVideo = new TimelineMax();
					tlVideo.to($("#video-actu-"+videoID), 0, {display: "block"});
					tlVideo.to($("#video-actu-"+videoID), actusAnimationTime, {opacity: "1"});
					tlLiensActus.to($(".actu:not('#"+videoID+"')"), actusAnimationTime, {opacity: "0.6"});
					tlLiensActus.to($(".actu#"+videoID), actusAnimationTime, {opacity: "1", onComplete: function(){
						//if($("#"+videoID).hasClass("has-actu")){
							customActuOuverteScroll();
						//}
					}});
					$("#"+oldVideoActuID).removeClass("ouvert");
					$("#"+videoID).addClass("ouvert");
					
		
					scrollToVideo(videoID);
				}else{
					animateDisparitionBlocActus();
					$("li.actu.has-video.ouvert").removeClass("ouvert");
					removeCustomActuOuverteScroll();
				}
			}
		
		
		/*if($("#content").hasClass("bloc-actus-ouvert")){
			// apparition du bloc video
			tlBlocVideo = new TimelineMax();
			tlVideo = new TimelineMax();
			tlLiensActus= new TimelineMax();
			tlBlocVideo.to($('#bloc-videos-actus'), 0, {display: "block"});
			
			scrollToVideo(videoID);
			
			// afficher la bonne video
			tlBlocVideo.to($("#video-actu-"+videoID), 0, {display: "block"});
			tlBlocVideo.to($('#bloc-videos-actus'), actusAnimationTime, {x: "0", opacity: "1", onComplete: function() {
				$("#content").removeClass().addClass("bloc-videos-actus-ouvert");
			}});
			$("#"+videoID).addClass("ouvert");
			tlVideo.to($("#video-actu-"+videoID), actusAnimationTime, {opacity: "1"});
			tlLiensActus.to($(".actu:not('#"+videoID+"')"), actusAnimationTime, {opacity: "0.6"});
			
			// le bloc actus s'anime vers la droite
			tlBlocActusPart2 = new TimelineMax();
			tlBlocActusPart2.to($('#bloc-actus'), actusAnimationTime, {x: "800px", onComplete: function(){
				//customActuScroll();
				if($("#"+videoID).hasClass("has-actu")){
					customActuOuverteScroll();
				}
			}, onReverseComplete: function() {
				customActuScroll();
			}});
			
		}else if($("#content").hasClass("bloc-videos-actus-ouvert")){
			if(!($("#"+videoID).hasClass("ouvert"))){
				// stopper la video
				stopVideos();
				removeCustomActuOuverteScroll();
				if($("li.actu.has-video").hasClass("ouvert")){
					oldVideoActuID = $("li.actu.has-video.ouvert").attr("id");
				}else {
					oldVideoActuID = $("li.actu.has-actu.ouvert").attr("id");
				}
				
				tlVideo.to($("#video-actu-"+oldVideoActuID), 0, {display: "none"});
				tlVideo.to($("#video-actu-"+oldVideoActuID), actusAnimationTime, {opacity: "0"});
				
				tlVideo = new TimelineMax();
				tlVideo.to($("#video-actu-"+videoID), 0, {display: "block"});
				tlVideo.to($("#video-actu-"+videoID), actusAnimationTime, {opacity: "1"});
				tlLiensActus.to($(".actu:not('#"+videoID+"')"), actusAnimationTime, {opacity: "0.6"});
				tlLiensActus.to($(".actu#"+videoID), actusAnimationTime, {opacity: "1", onComplete: function(){
					if($("#"+videoID).hasClass("has-actu")){
						customActuOuverteScroll();
					}
				}});
				$("#"+oldVideoActuID).removeClass("ouvert");
				$("#"+videoID).addClass("ouvert");
				
	
				scrollToVideo(videoID);
			}else{
				animateDisparitionBlocActus();
				$("li.actu.has-video.ouvert").removeClass("ouvert");
				removeCustomActuOuverteScroll();
			}
		}*/
	}
}

///////////////////////////////////////////////////////////////////////////////
/////////// Fonction pour positionner le texte sur la page d'intro ////////////
///////////////////////////////////////////////////////////////////////////////
function initTexteIntro(){
	if($(window).width()>767){
		TweenMax.to($('#slide1'), textAnimationTime, {top: "50%",  scale: "1", opacity: "1", delay: 2});
		TweenMax.fromTo($('a#btn-next-slide'), textAnimationTime, {y: "80px", opacity: "0"}, {y: "50px", opacity: "1", delay: 2.5});
		TweenMax.to($('a#btn-prev-slide'), textAnimationTime, {scale: "1"});
	}else{
		TweenMax.to($('#slide1'), textAnimationTime, {scale: "1", opacity: "1", delay: 2});
		//TweenMax.fromTo($('a#btn-next-slide'), textAnimationTime, {y: "80px", opacity: "0"}, {y: "50px", opacity: "1", delay: 2.5});
		TweenMax.to($('a#btn-prev-slide'), textAnimationTime, {scale: "1"});
	}
}

////////////////////////////////////////////////////////////////////////////////
///////// Fonctions pour animer les trois slides avec trois timelines //////////
////////////////////////////////////////////////////////////////////////////////

function getEtape2Slide() {
	if($(window).width()>767){
		tlSlide1 = new TimelineMax();
		tlSlide1.to($('#slide1'), textAnimationTime, {top: "30%", scale: "0.8", opacity: "0.7", ease:textAnimationEase, onComplete: function() {
					etape=2;
				}})
				.to($('#slide2'), textAnimationTime, {top: "50%", scale: "1", opacity: "1", ease:textAnimationEase},0)
				.to($('#slide3'), textAnimationTime, {top: "75%", scale: "1", opacity: "0", ease:textAnimationEase},0)
				.to($('a#btn-prev-slide'), textAnimationTime, {display: "block", scale: "1", ease:textAnimationEase},0);
	}else{
		tlSlide1 = new TimelineMax();
		tlSlide1.to($('#slide1'), textAnimationTime, {left: "-400px", scale: "1", opacity: "0.7", ease:textAnimationEase, onComplete: function() {
					etape=2;
				}})
				.to($('#slide2'), textAnimationTime, {left: "0", scale: "1", opacity: "1", ease:textAnimationEase},0)
				.to($('#slide3'), textAnimationTime, {scale: "1", opacity: "0", ease:textAnimationEase},0)
				.to($('a#btn-prev-slide'), textAnimationTime, {display: "block", scale: "1", ease:textAnimationEase},0);
	}
}

function getReverseEtape2Slide() {
	if($(window).width()>767){
		tlReverseSlide1 = new TimelineMax();
		tlReverseSlide1.to($('#slide1'), textAnimationTime, {top: "50%", scale: "1", opacity: "1", ease:textAnimationEase, onComplete: function() {
							etape=1;
						}})
					   .to($('#slide2'), textAnimationTime, {top: "75%", scale: "1", opacity: "0", ease:textAnimationEase},0)
					   .to($('#slide3'), textAnimationTime, {top: "75%", scale: "1", opacity: "0", ease:textAnimationEase},0)
					   .to($('a#btn-prev-slide'), textAnimationTime, {display: "none", scale: "1", ease:textAnimationEase},0);
	}else{
		tlReverseSlide1 = new TimelineMax();
		tlReverseSlide1.to($('#slide1'), textAnimationTime, {left: "0", scale: "1", opacity: "1", ease:textAnimationEase, onComplete: function() {
							etape=1;
						}})
					   .to($('#slide2'), textAnimationTime, {left: "400px", scale: "1", opacity: "0", ease:textAnimationEase},0)
					   .to($('#slide3'), textAnimationTime, {left: "400px", scale: "1", opacity: "0", ease:textAnimationEase},0)
					   .to($('a#btn-prev-slide'), textAnimationTime, {display: "none", scale: "1", ease:textAnimationEase},0);
	}
}

function getEtape3Slide() {
	if($(window).width()>767){
		tlSlide3 = new TimelineMax();
		tlSlide3.to($('#slide1'), textAnimationTime, {top: "5%", scale: "0.6", opacity: "0.5", ease:textAnimationEase, onComplete: function() {
					etape=3;
				}})
				.to($('#slide2'), textAnimationTime, {top: "28%", scale: "0.8", opacity: "0.7", ease:textAnimationEase},0)
				.to($('#slide3'), textAnimationTime, {top: "63.5%", scale: "1", opacity: "1", ease:textAnimationEase},0)
				.to($('#slide3 a.btn-base'), textAnimationTime, {display: "inline-block", ease:textAnimationEase},0)
				.to($('a#btn-next-slide'), textAnimationTime, {display: "none", ease:textAnimationEase},0);
	}else{
		tlSlide3 = new TimelineMax();
		tlSlide3.to($('#slide1'), textAnimationTime, {left: "-400px", scale: "1", opacity: "0.5", ease:textAnimationEase, onComplete: function() {
					etape=3;
				}})
				.to($('#slide2'), textAnimationTime, {left: "-400px", scale: "1", opacity: "0.7", ease:textAnimationEase},0)
				.to($('#slide3'), textAnimationTime, {left: "0", scale: "1", opacity: "1", ease:textAnimationEase},0)
				.to($('#slide3 a.btn-base'), textAnimationTime, {display: "inline-block", ease:textAnimationEase},0)
				.to($('a#btn-next-slide'), textAnimationTime, {display: "none", ease:textAnimationEase},0);
	}
}

function getReverseEtape3Slide() {
	if($(window).width()>767){
		tlReverseSlide3 = new TimelineMax();
		tlReverseSlide3.to($('#slide1'), textAnimationTime, {top: "30%", scale: "0.8", opacity: "0.7", ease:textAnimationEase, onComplete: function() {
							etape=2;
							$('#slide3 a.btn-base').css("display","none");
						}})
					   .to($('#slide2'), textAnimationTime, {top: "50%", scale: "1", opacity: "1", ease:textAnimationEase},0)
					   .to($('#slide3'), textAnimationTime, {top: "75%", scale: "1", opacity: "0", ease:textAnimationEase},0)
					   .to($('a#btn-next-slide'), textAnimationTime, {display: "block", ease:textAnimationEase},0);
	}else{
		tlReverseSlide3 = new TimelineMax();
		tlReverseSlide3.to($('#slide1'), textAnimationTime, {left: "-400px", scale: "0.8", opacity: "0.7", ease:textAnimationEase, onComplete: function() {
							etape=2;
							$('#slide3 a.btn-base').css("display","none");
						}})
					   .to($('#slide2'), textAnimationTime, {left: "0", scale: "1", opacity: "1", ease:textAnimationEase},0)
					   .to($('#slide3'), textAnimationTime, {left: "400px", scale: "1", opacity: "0", ease:textAnimationEase},0)
					   .to($('a#btn-next-slide'), textAnimationTime, {display: "block", ease:textAnimationEase},0);
	}
}

////////////////////////////////////////////////////////////////////////////////
/////////////// Fonction pour positionner les slides de l'intro ////////////////
////////////////////////////////////////////////////////////////////////////////
function getTranslationYSlideIntro(){
	hauteurBlocSlides = $("#bloc-slides").height();
	hauteurBlocDispo = (hauteurBlocSlides / 2)/3;
	return hauteurBlocDispo;
}


////////////////////////////////////////////////////////////////////////////////
/////// Fonctions pour afficher et masquer la barre de scroll custom actu //////
////////////////////////////////////////////////////////////////////////////////
function customActuScroll(){
	if($(window).width()>767){
		//$("#masque-actus").niceScroll().remove();
		niceScrolls.push($("#masque-actus").niceScroll({
			cursorcolor: "#fff",
			cursorwidth: "3px",
			cursorborderradius: "3px",
			railalign: "left",
			background: "rgba(255, 255, 255, 0.2)",
			cursorborder: "none",
			autohidemode: "none"
		}));
	}
}

function removeCustomActuScroll(){
	if($(window).width()>767){
		$("#masque-actus").niceScroll().hide();
	}
}

function customActuOuverteScroll(){
	if($(window).width()>767){
		//$("#bloc-videos-actus").niceScroll().remove();
		niceScrolls.push($("#bloc-videos-actus").niceScroll({
			cursorcolor: "#fff",
			cursorwidth: "3px",
			cursorborderradius: "3px",
			railalign: "left",
			background: "rgba(255, 255, 255, 0.2)",
			cursorborder: "none",
			autohidemode: "none"
		}));
	}
}

function removeCustomActuOuverteScroll(){
	if($(window).width()>767){
		$("#bloc-videos-actus").niceScroll().hide();
	}
}

////////////////////////////////////////////////////////////////////////////////
/// Fonction pour empecher l'animation de slide down de se jouer 2x à suivre ///
////////////////////////////////////////////////////////////////////////////////
function mouseHandle(event, nomTimeline) {
    newDate = new Date();
    var scrollAllowed = true;

    if( wheel < 10 && (newDate.getTime()-oldDate.getTime()) < 100 ) {
        scrollPos -= event.deltaY*(10-wheel);
        wheel++;
    }else{
        if( (newDate.getTime()-oldDate.getTime()) > 100 ) {
            wheel = 0;
            scrollPos -= event.deltaY*60;
        }else{
            scrollAllowed = false;
        }
    }

    oldDate = new Date();

    if(scrollAllowed) {
        if (event.deltaY<0) {
        	// au scroll down
        	if(etape==1){
        		getEtape2Slide();
        	}else if(etape==2){
        		getEtape3Slide();
        	}
        }else{
        	// au scroll up
        	if(etape==2){
        		getReverseEtape2Slide();
        	}else if(etape==3){
        		getReverseEtape3Slide();
        	}
        }
    }
}

////////////////////////////////////////////////////////////////////////////////
/////////// Fonction pour aligner l'actu de la vidéo cliquée en haut ///////////
////////////////////////////////////////////////////////////////////////////////
function scrollToVideo(videoID){
	topLigneActuVideo = $("#"+videoID).offset().top;
	topBlocActus = $("#bloc-actus").offset().top;
	scrollBlocVideo = $("#masque-actus").scrollTop();
	hauteurScrollAlignementVideo = topLigneActuVideo-topBlocActus+scrollBlocVideo;
	TweenMax.to($("#masque-actus"), 0.8, {scrollTo:{y:hauteurScrollAlignementVideo}, onComplete: function() {
		customActuScroll();
	}});
}


////////////////////////////////////////////////////////////////////////////////
//////// Fonction pour construire la grille de pictos sur le background ////////
////////////////////////////////////////////////////////////////////////////////
function backgroundPictoGrid(){
	if(($("html").hasClass("no-touch"))&&($(window).width()>767)&&!($("html").hasClass("lt-ie9"))){
		largeurFenetre = $(window).width();
		hauteurFenetre = $(window).height();
		
		nbPictoHorizontal = Math.ceil(largeurFenetre/ecartementHorizontalPictosIntro);
		nbPictoVertical = Math.ceil(hauteurFenetre/ecartementVerticalPictosIntro);
		
		for (var i = 0; i <= nbPictoVertical; i++) {
		    for (var j = 0; j <= nbPictoHorizontal; j++) {
		    	posPictoVertical = i*ecartementVerticalPictosIntro;
		    	posPictoHorizontal = j*ecartementHorizontalPictosIntro;
		    	// création du html du picto
		    	$("ul#pictos-fond").append("<li class='picto-fond' id='"+currentPicto+"'></li>");
		    	
		    	if (i%2==0) {
		    		$("ul#pictos-fond li#"+currentPicto).css("margin-left", "-"+ecartementHorizontalPictosIntro/2+"px");
		    	}
		    	
		    	randomPictoIntro = Math.floor(Math.random()*arrayPictosIntro.length);
		    	$("ul#pictos-fond li#"+currentPicto).addClass("ligne-"+i).addClass("colonne-"+j).addClass(arrayPictosIntro[randomPictoIntro]);
		    	$("ul#pictos-fond li#"+currentPicto).css("top", posPictoVertical);
		    	$("ul#pictos-fond li#"+currentPicto).css("left", posPictoHorizontal);
		       	currentPicto ++;
		    }
		}
	}
}