/* pile niceScoll */
var niceScrolls = [];



///////////////////////////////////////////////////////////////////////////////////
///////////////// Fontion pour l'initialisation du bloc contact ///////////////////
///////////////////////////////////////////////////////////////////////////////////
function blocContact(){	
	TweenMax.to($('#bloc-contact'), 0, {y: "30px", ease:textAnimationEase});
}

///////////////////////////////////////////////////////////////////////////////////
////////////// Fontion pour l'affichage et le survol du bouton top ////////////////
///////////////////////////////////////////////////////////////////////////////////
function boutonIMA(){
	$(".cercle-indic").hover(function() {
		$('#cn-wrapper').addClass("opened-nav");
	});
	
	button = $('#cn-button');
	wrapper = $('#cn-wrapper');
	if($(window).width()>767){
		button.hover(
		  function() {
		    $('#cn-wrapper').addClass("opened-nav");
		  }, function() {
		    $('#cn-wrapper').removeClass("opened-nav");
		  }
		);
		wrapper.hover(
		  function() {
		    $('#cn-wrapper').addClass("opened-nav");
		  }, function() {
		    $('#cn-wrapper').removeClass("opened-nav");
		  }
		);
		if($("html").hasClass("csstransforms")){
			$(".cn-wrapper ul li a").unbind('mouseenter mouseleave');
			$(".cn-wrapper ul li .zone-texte h2").css({'color':"#4e4e4e","top":0});
			TweenMax.to($('.cn-wrapper ul li .zone-texte h2'), 0, {color: "#4e4e4e", top:"0"});
			if ($('html').hasClass('lt-ie10') || (Function('/*@cc_on return document.documentMode===10@*/')())){
				$(".cn-wrapper ul li:not(.active) .zone-texte").hover(
				  function() {
				  	var parent = $(this).parent();
				    borderColor = $(this).css("border-top-color"); 
				    tl = new TimelineMax();
				    tl2 = new TimelineMax();
				    tl.to($('.zone-texte h2',parent), 0, {color: borderColor});
				    tl.to($('.zone-texte h2',parent), 0.5, {color: "#fff"});
				    tl2.to($('.zone-texte h2',parent), 0.3, {top:"10px"});
				  }, function() {
				  	var parent = $(this).parent();
				    tl.to($('.zone-texte h2',parent), 0.1, {color: "#4e4e4e", top:"0"});
				  }
				);
			}
			$(".cn-wrapper ul li:not(.active) a").hover(
			  function() {
			  	var parent = $(this).parent();
			    borderColor = $(this).css("border-top-color"); 
			    tl = new TimelineMax();
			    tl2 = new TimelineMax();
			    tl.to($('.zone-texte h2',parent), 0, {color: borderColor});
			    tl.to($('.zone-texte h2',parent), 0.5, {color: "#fff"});
			    tl2.to($('.zone-texte h2',parent), 0.3, {top:"10px"});
			  }, function() {
			  	var parent = $(this).parent();
			    tl.to($('.zone-texte h2',parent), 0.1, {color: "#4e4e4e", top:"0"});
			  }
			);
		}
	}else{
		button.click(function() {
			if($('#cn-wrapper').hasClass("opened-nav")){
				$('#cn-wrapper').removeClass("opened-nav");
			}else{
				$('#cn-wrapper').addClass("opened-nav");
			}
			return false;
		});
	}
}


///////////////////////////////////////////////////////////////////////////////
////////////// Fontion pour l'affichage correct du menu bottom ////////////////
///////////////////////////////////////////////////////////////////////////////
function menuBottom(remplissage, couleur){
	var menuBottom = $("#menu-bottom");
	if(remplissage){
		$("#masque-offre-conseil #offre-conseil", menuBottom).css("background-color", "#ffffff");
		$("#masque-offre-conseil #offre-conseil", menuBottom).css("border", "none");
	}else{
		$("#masque-offre-conseil #offre-conseil", menuBottom).css("background-color", "none");
		$("#masque-offre-conseil #offre-conseil", menuBottom).css("border", "1px solid #ffffff");
	}
	$("#content-menu-bottom #masque-offre-conseil #offre-conseil #offre-conseil-svg", menuBottom).css("fill",couleur);
	$("#content-menu-bottom #signature #imatech-logo", menuBottom).css("fill",couleur);
	$("#content-menu-bottom #bloc-btn-bottom a.btn-base", menuBottom).css("color",couleur);
}


///////////////////////////////////////////////////////////////////////////////
////////// Fonction pour animer la fleche dans le bouton de scroll ////////////
///////////////////////////////////////////////////////////////////////////////
function animateButtonArrow(objet, orientation, decalage, scaleVar, delayVar, nomTimeline){
	nomTimeline.add(getHorizontalButtonArrowStep1(objet, orientation, delayVar, decalage, scaleVar))
}

function getHorizontalButtonArrowStep1(objet, orientation, delayVar, decalage, scaleVar) {
	tlHorizontalButtonArrow1 = new TimelineMax({repeat:5, yoyo:true, delay: delayVar});
	if (orientation == "x") {
		// orientation horizontale
		tlHorizontalButtonArrow1.to(objet, arrowHorizontalAnimationTime, {x: decalage});
	}else{
		// orientation verticale
		tlHorizontalButtonArrow1.to(objet, arrowHorizontalAnimationTime, {y: decalage});
	}
	tlHorizontalButtonArrow1.to(objet.parent(), arrowHorizontalAnimationTime, {scale: scaleVar}, 0);
	return tlHorizontalButtonArrow1;
}


////////////////////////////////////////////////////////////////////////////////
///// Fonctions pour animer le scale du bouton "slide suivante" au survol //////
////////////////////////////////////////////////////////////////////////////////
function animateScaleBtn(btn, nomTimeline){
	nomTimeline.to(btn, btnAnimationTime, {scale: "0.7"});
}

function stopAnimateScaleBtn(nomTimeline){
	nomTimeline.reverse();
}

////////////////////////////////////////////////////////////////////////////////
//////////// Fonction pour ouvrir le menu à l'ouvreture de la page /////////////
////////////////////////////////////////////////////////////////////////////////
function menuOuvertDefault(){
	$(".cn-wrapper").addClass("opened-nav");
	
	setTimeout(function(){
		$('.cn-wrapper').removeClass("opened-nav");
	},5000);
}