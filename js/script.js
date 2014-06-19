///////////////////////////
//////// variables ////////
///////////////////////////


/* bouton ima */
var borderColor;
var button;
var wrapper;

/* menu bottom */
var menuBottom;

/* intro */
var violetIntro = "#ab0464";
var etape = 1;
var textAnimationTime = 0.8;
var textAnimationEase = Cubic.easeInOut;
var arrowVerticalAnimationTime = 0.2;
var arrowHorizontalAnimationTime = 0.2;
var arrowAnimationTime = 0.7;
var actusAnimationTime = 0.5;
var blocActusAnimationTime = 0.2;
var blocActusDelay = 0.2;
var btnAnimationTime = 0.3;
var videoID;
var actuID;
var oldVideoActuID;
var topLigneActuVideo;
var topBlocActus;
var scrollBlocVideo;
var hauteurScrollAlignementVideo;
var slide1 = $('#slide1');
var slide2 = $('#slide2');
var slide3 = $('#slide3');
var hauteurBlocSlides;
var hauteurBlocDispo;
var wheel;
var oldDate = new Date();
var scrollPos;
var largeurFenetre;
var hauteurFenetre;
var nbPictoHorizontal;
var nbPictoVertical;
var currentPicto = 0;
var arrayPictosIntro = new Array("arobase","coeur","fille-1", "fille-2", "fille-3", "fille-4", "homme-1", "homme-2", "homme-3", "homme-4","fille-1", "fille-2", "fille-3", "homme-1", "homme-3", "homme-4", "mail", "videochat");
var randomPictoIntro;
var ecartementHorizontalPictosIntro = 168;
var ecartementVerticalPictosIntro = 90;

/* metiers */
var idPuceMetier;
var tlBlocQuestion;
var tlBlocBulle;
var tlPuce;
var blocQuestionAnimationTime = 0.3;
var tlBtnNextSlideMetier;
var tlBtnPrevSlideMetier;
var tlboutonMetier1;
var tlboutonMetier2;
var tlSlidesVision;
var tlSlide2Vision;
var tlSlide3Vision;

/* vision */
var oldIndexPucesVision;
var indexPucesVision = 1;
var indexPuceVisionClic;

/* cas client */
var idCasClient;
var oldIdlogoCasClient;
var idLogoCasClient;
var oldIndexPucesCasClient;
var indexPuceCasClientClic;

/* timelines */
var tl;
var tl2;
var tlSlides;
var tlSlide1;
var tlSlide2;
var tlSlide3;
var tlBtnNextSlide;
var tlBtnPrevSlide;
var tlButtonArrow;
var tlButtonArrowHorizontal;
var tlBlocActus = new TimelineMax();
var tlSidebarBlocActus = new TimelineMax();
var tlBlocBtnActus = new TimelineMax();
var tlBlocSlides = new TimelineMax();
var tlBlocVideo;
var tlBlocActusPart2;
var tlBlocSlidesPart2;
var tlbouton1;
var tlbouton2;
var tlbouton3;
var tlbouton4;

/* pushstate */
var index = '';
var everPushed  = false;

$(document).ready(function(){
	boutonIMA();
	blocContact();
	$("a#btn-contact").click(function(){
		if(!$(this).hasClass("active")){
			$(this).addClass("active");
			var tlBlocContact = new TimelineMax();
			tlBlocContact.to($('#bloc-contact'), 0, {display: "block", ease:textAnimationEase});
			tlBlocContact.to($('#bloc-contact'), 0.4, {opacity: "1", y: "0", ease:textAnimationEase});
		}else{
			$(this).removeClass("active");
			var tlBlocContact = new TimelineMax();
			tlBlocContact.to($('#bloc-contact'), 0.4, {opacity: "0", y: "30px", ease:textAnimationEase});
			tlBlocContact.to($('#bloc-contact'), 0, {display: "none", ease:textAnimationEase});
		}
		
		return false;
	});
	
	/////////////////// PARTIE MENTIONS LEGALES ///////////////////
	if($("body").hasClass("mentions-legales")){
		readyMentionsLegales();
	};
	
	
	/////////////////// PARTIE INTRO ///////////////////
	if($("body").hasClass("intro") || $("body").hasClass("home")){
		readyIntro();
	}	
	
	
	/////////////////// PARTIE METIERS ///////////////////
	if($("body").hasClass("metiers") || $("body").hasClass("page-template-templatesvision-php") || $("body").hasClass("page-template-templatesmetiers-php")){
		readyMetiers();
	}
	
	
	/////////////////// PARTIE CAS CLIENTS ///////////////////
	if($("body").hasClass("cas-clients") || $("body").hasClass("page-template-templatesreferences-php")){
		readyCasClient();
	}
	
	/////////////////// GÉRER LES LOADS ///////////////////
	initLoad();
		
});

$(window).resize(function() {
	if($("body").hasClass("intro") || $("body").hasClass("home")){
		backgroundPictoGrid();
	}
});

//////////////////////////////////////////////////////////////////////
/////////////////////// Fonction pour le load ////////////////////////
//////////////////////////////////////////////////////////////////////
function initLoad() {
	/////////////////// MAPPER LES LIENS ///////////////////
	// menu
	$("#cn-wrapper a").each(function() {
		$(this).click(function() {
			loadStart($(this).attr("href"));
			everPushed = true;
			return false;
		});
	});
	// footer 
	$("#bloc-btn-bottom a[href^=mentions]").click(function() {
		loadStart($(this).attr("href"));
		everPushed = true;
		return false;
	});
	// contenu
	mapAllLinks();
	
	/////////////////// GESTION D'URL ///////////////////
	if (Modernizr.history) {
		$(window).bind("popstate", function() {
			 if (everPushed) {
			   // link = location.pathname.replace(/^.*[\\/]/, ""); // get filename only
			   // loadStart(link);
			   if (!everPushed) {
				   	window.location = location.pathname;
			   }
			 }
		});
	}
}
function loadStart(toLoad) {
	for (var key in niceScrolls){
  	   // virer les scrollbars qui trainent
	   niceScrolls[key].resize().hide().remove();
	}
	niceScrolls = [];
	index = toLoad;
	$("#content-load").fadeOut(400);
	$("#content-load").load(toLoad+" #content-load", loadFinished);
}

function loadInit() {
	$(".content-load").hide(400);
}

function loadFinished() {
	$("#content-load").fadeIn(400);
	$("#menu-bottom").removeClass("menu-violet").removeClass("menu-bleu");
	$("#bouton-imatech").removeClass("bouton-bleu");
	$("body")[0].className = '';
	if (index.indexOf("vision")>=0) {
		updateAll('vision');
		$("body").addClass('metiers');
		readyMetiers();
	} else if (index.indexOf("metiers")>=0) {
		updateAll('metiers');
		$("body").addClass('metiers');
		readyMetiers();
	} else if (index.indexOf("references")>=0) {
		if (index.split('#').length>0) {
			updateAll('references#'+index.split('#')[1]);
		} else {
			updateAll('references');
		}
		$("body").addClass('cas-clients');
		$("#menu-bottom").addClass("menu-bleu");
		$("#bouton-imatech").addClass("bouton-bleu");
		readyCasClient();
	} else if (index.indexOf("mentions")>=0) {
		updateAll('mentions');
		$("body").addClass('mentions-legales');
		$("#menu-bottom").addClass("menu-bleu");
		$("#bouton-imatech").addClass("bouton-bleu");
		readyMetiers();
	} else {
		updateAll('accueil');
		$("body").addClass('intro');
		$("#menu-bottom").addClass("menu-violet");
		readyIntro();
	}
	mapAllLinks();
}

function updateAll(espace) {
	// lien
	updateURL(espace);
	// menu
	updateMenuState(espace);
	// déco
	updateSuperfluous(espace);
}

function updateURL(espace) {
	espace = espace.split('#')[0];
	if (Modernizr.history) {
		switch(espace) {
			case "vision":
				window.history.pushState(null,'Page Vision', '/vision');
				document.title = 'Conseil IMATECH | Notre vision du conseil';
				break;
			case "metiers":
				window.history.pushState(null,'Page Métiers', '/metiers');
				document.title = 'Conseil IMATECH | Nos domaines d’expertise';
				break;
			case "references":
				if (espace.split('#').length>0) {
					window.history.pushState(null,'Page Cas Client', '/references#'+index.split('#')[1]);
				} else {
					window.history.pushState(null,'Page Cas Client', '/references');
				}
				document.title = 'Conseil IMATECH | Notre références';
				break;
			case "mentions":
				window.history.pushState(null,'Mentions légales', '/mentions-legales');
				document.title = 'Conseil IMATECH | Mentions légales';
				break;
			default :
				window.history.pushState(null,'PageAccueil', '/');
				document.title = 'Conseil IMATECH | Une relation client comme on l’aime';
				break;
		}
	}
}

function updateMenuState(espace) {
	espace = espace.split('#')[0];
	$('#cn-wrapper').removeClass("opened-nav");
	$(".cn-wrapper-menu-ferme").removeClass('accueil').removeClass('vision').removeClass('expertise').removeClass('references');
	$(".cn-wrapper-menu-ferme li").removeClass('active');
	$("#cn-wrapper li").removeClass('active');
	switch(espace) {
		case "vision":
			$(".cn-wrapper-menu-ferme").addClass('vision');
			$(".cn-wrapper-menu-ferme li.conseil").addClass('active');
			$("#cn-wrapper li.conseil").addClass('active');
			break;
		case "metiers":
			$(".cn-wrapper-menu-ferme").addClass('expertise');
			$(".cn-wrapper-menu-ferme li.expertise").addClass('active');
			$("#cn-wrapper li.expertise").addClass('active');
			break;
		case "references":
			$(".cn-wrapper-menu-ferme").addClass('references');
			$(".cn-wrapper-menu-ferme li.references").addClass('active');
			$("#cn-wrapper li.references").addClass('active');
			break;
		case "mentions":
			break;
		default :
			$(".cn-wrapper-menu-ferme").addClass('accueil');
			$(".cn-wrapper-menu-ferme li.accueil").addClass('active');
			$("#cn-wrapper li.accueil").addClass('active');
			break;
	}
	boutonIMA();
}

function updateSuperfluous(espace) {
	espace = espace.split('#')[0];
	$("#superfluous").html();
	switch(espace) {
		case "vision":
		case "metiers":
			$("#superfluous").html('<div id="bg-office"></div>');
			break;
		case "references":
		case "mentions":
			$("#superfluous").html('<div id="bg-office"></div><div class="degrade haut"></div><div class="degrade bas"></div>');
			break;
		default :
			$("#superfluous").html('<ul id="pictos-fond"></ul>');
			break;
	}
}


function mapAllLinks() {
	// vision
	$("#content-load a[href^=vision]").click(function() {
		loadStart($(this).attr("href"));
		everPushed = true;
		return false;
	});
	$("#content-load a[href^=metiers]").click(function() {
		loadStart($(this).attr("href"));
		everPushed = true;
		return false;
	});
	$("#content-load a[href^=references]").click(function() {
		loadStart($(this).attr("href"));
		everPushed = true;
		return false;
	});	
}


////////////////////////////////////////////////////////////////////////////////
/////////////////////// Fonction ready mentions legales ////////////////////////
////////////////////////////////////////////////////////////////////////////////
function readyMentionsLegales(){
	customCasClientScroll();
}


////////////////////////////////////////////////////////////////////////////////
//////////////////////////// Fonction ready intro //////////////////////////////
////////////////////////////////////////////////////////////////////////////////
function readyIntro(){
	backgroundPictoGrid();
	
	/*$("#masque-actus").niceScroll({
		cursorcolor: "#fff",
		cursorwidth: "3px",
		cursorborderradius: "3px",
		railalign: "left",
		background: "rgba(255, 255, 255, 0.2)",
		cursorborder: "none",
		autohidemode: "none"
	});
	removeCustomActuScroll();*/
	
	tlbouton1 = new TimelineMax({repeat:-1});
	tlbouton2 = new TimelineMax({repeat:-1});
	tlbouton3 = new TimelineMax({repeat:-1});
	tlbouton4 = new TimelineMax({repeat:-1});
	// Appel de la fonction pour animer les fleches dans les boutons animateButtonArrow(objet, direction, decalage, scale, delay, nomTimeline)
	animateButtonArrow($('#btn-next-slide .icon-arrow'), "y", "4px", "0.95", "5", tlbouton1);
	animateButtonArrow($('#btn-prev-slide .icon-arrow-up'), "y", "-4px", "0.95", "5", tlbouton2);
	animateButtonArrow($('#btn-notre-actu .icon-arrow-right'), "x", "2px", "1", "7", tlbouton3);
	animateButtonArrow($('#btn-fermer-actus .icon-arrow-right'), "x", "4px", "0.95", "10", tlbouton4);
	
	initBlocVideo();
	initTexteIntro();
	getTranslationYSlideIntro();
	
	$("#bloc-btn-notre-actu").click(function(){
		if($("html").hasClass("touch")){
			animateApparitionBlocActus();
		}
		return false;
	});
	
	if(($("html").hasClass("no-touch"))&&($(window).width()>767)){
		// si on n'est pas sur mobile
		initBlocNotreActu();
		
		// survol du bouton slide suivante
		$("a#btn-next-slide").hover(function(){
			// au mouse enter
			if(!TweenMax.isTweening($('#slide1'))){
				if(etape==1){
					getEtape2Slide();
					etape=2;
				}else if(etape==2){
					getEtape3Slide();
					etape=3;
				}
				tlbouton1.pause();
				tlBtnNextSlide = new TimelineMax();
			animateScaleBtn($('a#btn-next-slide'), tlBtnNextSlide);
			}
		}, function(){
			// au mouse leave
			tlbouton1.play();
			stopAnimateScaleBtn(tlBtnNextSlide);
		});
	
		// survol du bouton slide precedente
		$("a#btn-prev-slide").hover(function(){
			// au mouse enter
			if(etape==2){
				getReverseEtape2Slide();
				etape=1;
			}else if(etape==3){
				getReverseEtape3Slide();
				etape=2;
			}
			tlBtnPrevSlide = new TimelineMax();
			animateScaleBtn($('a#btn-prev-slide'), tlBtnPrevSlide);
		}, function(){
			// au mouse leave
			stopAnimateScaleBtn(tlBtnPrevSlide);
		});
	
		// scroll sur le bloc slide
		$("#bloc-slides").on('mousewheel', function(event) {
			mouseHandle(event, tlSlides);
		});
	
		// survol du bouton Notre actu
		$("#bloc-btn-notre-actu").hover(function(){
			// au mouse enter
			animateApparitionBlocActus();
		}, function(){
			// au mouse leave
			
		});
		
	
		// survol du bouton pour fermer les actus
		$("a#btn-fermer-actus").hover(function(){
			// au mouse enter
			animateDisparitionBlocActus();
		}, function(){
			// au mouse leave
			
		});
		
		// survol du bloc slides
		$("#bloc-slides").hover(function(){
			// au mouse enter
			animateDisparitionBlocActus();
		}, function(){
			// au mouse leave
			
		});
	}else{
		// sur mobile
		// on voit les actus par défault
		$("#content").addClass("bloc-actus-ouvert");
	}
	
	// clic sur le bouton retour aux actus (sur mobile seulement)
	$("a#btn-retour-actu").click(function() {
		
		if($("li.actu.has-video").hasClass("ouvert")){
			oldVideoActuID = $("li.actu.has-video.ouvert").attr("id");
		}else {
			oldVideoActuID = $("li.actu.has-actu.ouvert").attr("id");
		}
		
		TweenMax.to($("#video-actu-"+oldVideoActuID), 0, {display: "none"});
		TweenMax.to($("#video-actu-"+oldVideoActuID), actusAnimationTime, {opacity: "0"});
		TweenMax.to($("#bloc-actus"), actusAnimationTime, {x: "0"});
		TweenMax.to($("#bloc-videos-actus"), actusAnimationTime, {x: "-800px", onComplete: function(){
			stopVideos();
		}});
		$("li.actu.has-video.ouvert").removeClass("ouvert");
		TweenMax.to($(".actu"), actusAnimationTime, {opacity: "1"});
		
		
		return false;
	});
	
	// clic sur le bouton slide suivante
	$("#btn-next-slide").click(function() {
		if(etape==1){
			getEtape2Slide();
			etape=2;
		}else if(etape==2){
			getEtape3Slide();
			etape=3;
		}
		return false;
	});
	
	// clic sur le bouton slide precedente
	$("#btn-prev-slide").click(function() {
		if(etape==2){
			getReverseEtape2Slide();
		}else if(etape==3){
			getReverseEtape3Slide();
		}
		return false;
	});
	
	// clic sur le bouton Notre actu
	/*$("#bloc-btn-notre-actu").click(function(){
		animateApparitionBlocActus();
		return false;
	});*/
	
	// clic sur une actu avec video
	$("li.actu.has-video").click(function() {
	  videoID = $(this).attr("id");
	  animateApparitionVideo(videoID);
	  return false;
	});
	
	// clic sur le bouton pour fermer les actus
	$("a#btn-fermer-actus").click(function(){
		animateDisparitionBlocActus();
		return false;
	});
	
	$("li.actu.has-actu").click(function() {
	  actuID = $(this).attr("id");
	  animateApparitionVideo(actuID);
	  return false;
	});
}

////////////////////////////////////////////////////////////////////////////////
//////////////////////////// Fonction ready metiers ////////////////////////////
////////////////////////////////////////////////////////////////////////////////
function readyMetiers(){
	initSlidesVision();
	// Appel de la fonction pour animer les fleches dans les boutons animateButtonArrow(objet, direction, decalage, scale, delay, nomTimeline)
	tlboutonMetier1 = new TimelineMax();
	animateButtonArrow($('#btn-next-slide-metier .icon-arrow'), "y", "4px", "0.95", "5", tlboutonMetier1);
	
	tlboutonMetier2 = new TimelineMax();
	animateButtonArrow($('#btn-prev-slide-metier .icon-arrow-up'), "y", "-4px", "0.95", "5", tlboutonMetier2);
	
	// scroll sur le bloc slide
	$("#vision").on('mousewheel', function(event) {
		mouseHandleVision(event, tlSlidesVision, indexPucesVision);
	});
	
	// survol du bouton slide vision suivante
	$("a#btn-next-slide-metier").hover(function(){
		// au mouse enter
		if(!TweenMax.isTweening($('#slide1-vision'))){
			tlBtnNextSlideMetier = new TimelineMax();
			animateScaleBtn($("a#btn-next-slide-metier"), tlBtnNextSlideMetier);
			majPucesVision(2);
			TweenMax.to($('a#btn-prev-slide-metier'), 0, {display: "block"});
			TweenMax.to($('#slide1-vision'), textAnimationTime, {top: "-350px", opacity: "0.5", ease:textAnimationEase, onComplete: function(){
				indexPucesVision=2;
			}});
			TweenMax.to($('#slide2-vision'), textAnimationTime, {top: "50%", opacity: "1", ease:textAnimationEase});
			TweenMax.to($('#slide3-vision'), textAnimationTime, {top: "100%", opacity: "0", ease:textAnimationEase});
		}
	}, function(){
		// au mouse leave
		stopAnimateScaleBtn(tlBtnNextSlideMetier);
	});
	
	$("a#btn-next-slide-metier2").hover(function(){
		// au mouse enter
		// test si tween en cours ou non
		if(!TweenMax.isTweening($('#slide2-vision'))){
			majPucesVision(3);
			TweenMax.to($('#slide1-vision'), textAnimationTime, {top: "-350px", opacity: "0", ease:textAnimationEase, onComplete: function(){
				indexPucesVision=3;
			}});
			TweenMax.to($('#slide2-vision'), textAnimationTime, {top: "-350px", opacity: "0.5", ease:textAnimationEase});
			TweenMax.to($('#slide3-vision'), textAnimationTime, {top: "50%", opacity: "1", ease:textAnimationEase});
		}
		
		
	}, function(){
		// au mouse leave
	});
	
	// survol du bouton slide vision précédent
	$("a#btn-prev-slide-metier").hover(function(){
		// au mouse enter
		if(!TweenMax.isTweening($('#slide2-vision'))){
			tlBtnPrevSlideMetier = new TimelineMax();
			animateScaleBtn($("a#btn-prev-slide-metier"), tlBtnPrevSlideMetier);
			indexPuceVision = $("a.lien-puce-slides-vision.active").parent().index()+1;
			if(indexPuceVision==2){
				majPucesVision(indexPucesVision-1);
				TweenMax.to($('#slide1-vision'), textAnimationTime, {top: "50%", opacity: "1", ease:textAnimationEase, onComplete: function(){
					indexPucesVision--;
					TweenMax.to($('a#btn-prev-slide-metier'), 0, {display: "none"});
				}});
				TweenMax.to($('#slide2-vision'), textAnimationTime, {top: "100%", opacity: "0", ease:textAnimationEase});
				TweenMax.to($('#slide3-vision'), textAnimationTime, {top: "100%", opacity: "0", ease:textAnimationEase});
			}else if(indexPuceVision==3) {
				majPucesVision(indexPucesVision-1);
				TweenMax.to($('#slide1-vision'), textAnimationTime, {top: "-350px", opacity: "0.5", ease:textAnimationEase, onComplete: function(){
					indexPucesVision--;
				}});
				TweenMax.to($('#slide2-vision'), textAnimationTime, {top: "50%", opacity: "1", ease:textAnimationEase});
				TweenMax.to($('#slide3-vision'), textAnimationTime, {top: "100%", opacity: "0", ease:textAnimationEase});
			}
		}
	}, function(){
		// au mouse leave
		stopAnimateScaleBtn(tlBtnPrevSlideMetier);
	});
	
	$("a#btn-prev-slide-metier").click(function(){
		if(!TweenMax.isTweening($('#slide2-vision'))){
			stopAnimateScaleBtn(tlBtnPrevSlideMetier);
			tlBtnPrevSlideMetier = new TimelineMax();
			indexPuceVision = $("a.lien-puce-slides-vision.active").parent().index()+1;
			if(indexPuceVision==2){
				majPucesVision(indexPucesVision-1);
				TweenMax.to($('#slide1-vision'), textAnimationTime, {top: "50%", opacity: "1", ease:textAnimationEase, onComplete: function(){
					indexPucesVision--;
					TweenMax.to($('a#btn-prev-slide-metier'), 0, {display: "none"});
				}});
				TweenMax.to($('#slide2-vision'), textAnimationTime, {top: "100%", opacity: "0", ease:textAnimationEase});
				TweenMax.to($('#slide3-vision'), textAnimationTime, {top: "100%", opacity: "0", ease:textAnimationEase});
			}else if(indexPuceVision==3) {
				majPucesVision(indexPucesVision-1);
				TweenMax.to($('#slide1-vision'), textAnimationTime, {top: "-350px", opacity: "0.5", ease:textAnimationEase, onComplete: function(){
					indexPucesVision--;
				}});
				TweenMax.to($('#slide2-vision'), textAnimationTime, {top: "50%", opacity: "1", ease:textAnimationEase});
				TweenMax.to($('#slide3-vision'), textAnimationTime, {top: "100%", opacity: "0", ease:textAnimationEase});
			}
		}
		return false;
	});
	
	// survol d'une puce métier
	
		$("ul#puces-metiers li.puce-metier").hover(function(){
			if(($("html").hasClass("no-touch"))&&($(window).width()>979)){
				// au mouse enter
				idPuceMetier = $(this).attr("id");
				$(this).css('z-index',2);
				animAppartitionBlocQuesion(idPuceMetier);
			}
		}, function(){
			// au mouse leave
			if(($("html").hasClass("no-touch"))&&($(window).width()>979)){
				$(this).css('z-index','');
				animDisparitionBlocQuesion();
			}
		});
	
	
	$("ul#puces-metiers li.puce-metier .bloc-bulle").click(function(){
		idPuceMetier = $(this).parent().attr("id");
		//animAppartitionBlocQuesion(idPuceMetier);
		$(".bloc-question").css("display", "none");
		$("#bloc-question-"+idPuceMetier).slideToggle( 200, function() {
		});  
		return false;
	});
	
	
	// clic sur une puce vision
	$("ul#puces-slides-vision li.puce-slides-vision a.lien-puce-slides-vision").click(function(){
		if(!($(this).hasClass("active"))){
			oldIndexPucesVision = $("a.lien-puce-slides-vision.active").parent().index()+1;
			indexPuceVisionClic = $(this).parent().index()+1;
			majPucesVision(indexPuceVisionClic);
			var nbMouvements = indexPuceVisionClic - oldIndexPucesVision;
			if(nbMouvements>0){
				// on va vers une slide suivante
				if((oldIndexPucesVision=="1")&&(indexPuceVisionClic=="2")){
					// on va de la 1 vers la 2
					TweenMax.to($('a#btn-prev-slide-metier'), 0, {display: "block"});
					TweenMax.to($('#slide1-vision'), textAnimationTime, {top: "-350px", opacity: "0.5", ease:textAnimationEase, onComplete: function(){
						indexPucesVision=2;
					}});
					TweenMax.to($('#slide2-vision'), textAnimationTime, {top: "50%", opacity: "1", ease:textAnimationEase});
					TweenMax.to($('#slide3-vision'), textAnimationTime, {top: "100%", opacity: "0", ease:textAnimationEase});
				}else if ((oldIndexPucesVision=="2")&&(indexPuceVisionClic=="3")){
					// on va de la 2 vers la 3
					TweenMax.to($('#slide1-vision'), textAnimationTime, {top: "-350px", opacity: "0", ease:textAnimationEase});
					TweenMax.to($('#slide2-vision'), textAnimationTime, {top: "-350px", opacity: "0.5", ease:textAnimationEase});
					TweenMax.to($('#slide3-vision'), textAnimationTime, {top: "50%", opacity: "1", ease:textAnimationEase});
					indexPucesVision=3;
				}else if ((oldIndexPucesVision=="1")&&(indexPuceVisionClic=="3")){
					// on va de la 1 vers la 3
					TweenMax.to($('a#btn-prev-slide-metier'), 0, {display: "block"});
					TweenMax.to($('#slide1-vision'), textAnimationTime, {top: "-350px", opacity: "0", ease:textAnimationEase});
					TweenMax.to($('#slide2-vision'), textAnimationTime, {top: "-350px", opacity: "0.5", ease:textAnimationEase});
					TweenMax.to($('#slide3-vision'), textAnimationTime, {top: "50%", opacity: "1", ease:textAnimationEase});
					indexPucesVision=3;
				}
			}else{
				// on va vers une slide precedente
				if((oldIndexPucesVision=="2")&&(indexPuceVisionClic=="1")){
					TweenMax.to($('a#btn-prev-slide-metier'), 0, {display: "none"});
					TweenMax.to($('#slide1-vision'), textAnimationTime, {top: "50%", opacity: "1", ease:textAnimationEase, onComplete: function(){
						indexPucesVision=1;
					}});
					TweenMax.to($('#slide2-vision'), textAnimationTime, {top: "100%", opacity: "0", ease:textAnimationEase});
					TweenMax.to($('#slide3-vision'), textAnimationTime, {top: "100%", opacity: "0", ease:textAnimationEase});
				}else if((oldIndexPucesVision=="3")&&(indexPuceVisionClic=="2")){
					TweenMax.to($('#slide1-vision'), textAnimationTime, {top: "-350px", opacity: "0.5", ease:textAnimationEase, onComplete: function(){
						indexPucesVision=2;
					}});
					TweenMax.to($('#slide2-vision'), textAnimationTime, {top: "50%", opacity: "1", ease:textAnimationEase});
					TweenMax.to($('#slide3-vision'), textAnimationTime, {top: "100%", opacity: "0", ease:textAnimationEase});
				}else if((oldIndexPucesVision=="3")&&(indexPuceVisionClic=="1")){
					TweenMax.to($('a#btn-prev-slide-metier'), 0, {display: "none"});
					TweenMax.to($('#slide1-vision'), textAnimationTime, {top: "50%", opacity: "1", ease:textAnimationEase, onComplete: function(){
						indexPucesVision=1;
					}});
					TweenMax.to($('#slide2-vision'), textAnimationTime, {top: "100%", opacity: "0", ease:textAnimationEase});
					TweenMax.to($('#slide3-vision'), textAnimationTime, {top: "100%", opacity: "0", ease:textAnimationEase});
				}
			}
		}
		return false;
	});
}

////////////////////////////////////////////////////////////////////////////////
////////////////////////// Fonction ready cas client ///////////////////////////
////////////////////////////////////////////////////////////////////////////////

function readyCasClient(){
	if(window.location.hash) {
	  // hashtag existant
	  var hash = window.location.hash.substring(1);
	  if ($("li#"+hash).length){
	  	// hashtag correspondant à une catégorie
	  	setTimeout(function() {
		  	if(!($("li#"+hash).hasClass("ouvert"))){
				if(!TweenMax.isTweening($("ul#slides-cas-clients li.slide-cas-client .bloc-cache"))){
					fermerCasClient();
					if($("ul.logos-cas-client li.logo-cas-client").hasClass("active")){
						oldIdLogoCasClient = $("ul.logos-cas-client li.logo-cas-client.active a").attr("id");
						$("ul.logos-cas-client li.logo-cas-client.active").removeClass("active");
						// fermer le cas client déjà ouvert
						TweenMax.to($("li#texte-"+oldIdLogoCasClient), 0, {display: "none", ease:textAnimationEase, onComplete: function(){
							$("li#texte-"+oldIdLogoCasClient).removeClass("ouvert");
						}});
					}
				
					indexPuceCasClientClic = $("li#"+hash).index()+1;
					majPucesCasClient(indexPuceCasClientClic);
					
					var casClient= $("li#"+hash);
					idCasClient = $("li#"+hash).attr("id");
					var tlSlideCasClient;
					tlSlideCasClient = new TimelineMax();
					var heightBlocCache = $("li.slide-cas-client#"+idCasClient+" .bloc-cache").height();
					
					TweenMax.to($("ul#slides-cas-clients li.slide-cas-client.ouvert .bloc-cache"), 0.2, {height: "0", ease:textAnimationEase, onComplete: function(){
						$("ul#slides-cas-clients li.slide-cas-client.ouvert .bloc-cache").css("display", "none");
						$("ul#slides-cas-clients li.slide-cas-client.ouvert .bloc-cache").css("height", "auto");
						$("ul#slides-cas-clients li.slide-cas-client.ouvert").removeClass("ouvert");
						TweenMax.fromTo($("li.slide-cas-client#"+idCasClient+" .bloc-cache"), 0.4, {display: "block", height: "0"}, {height: heightBlocCache+"px", ease:textAnimationEase, onComplete: function(){
							$("li.slide-cas-client#"+idCasClient+" .bloc-cache").css("height", "auto");
							$("li.slide-cas-client#"+idCasClient).addClass("ouvert");
							$("#masque-slides-cas-clients").animate({ scrollTop: 400+casClient.index()*84-$("ul#puces-slides-cas-clients").offset().top}, {duration:300});
							customCasClientScroll();
						}});
					}});
					}
				}
			}, 800);
		}
	}else {
		// pas de hashtag
		setTimeout(function() {
	
			if(!TweenMax.isTweening($("ul#slides-cas-clients li.slide-cas-client .bloc-cache"))){
				fermerCasClient();
				if($("ul.logos-cas-client li.logo-cas-client").hasClass("active")){
					oldIdLogoCasClient = $("ul.logos-cas-client li.logo-cas-client.active a").attr("id");
					$("ul.logos-cas-client li.logo-cas-client.active").removeClass("active");
					// fermer le cas client déjà ouvert
					TweenMax.to($("li#texte-"+oldIdLogoCasClient), 0, {display: "none", ease:textAnimationEase, onComplete: function(){
						$("li#texte-"+oldIdLogoCasClient).removeClass("ouvert");
					}});
				}
			
				indexPuceCasClientClic = $("li#dimensionnement").index()+1;
				majPucesCasClient(indexPuceCasClientClic);
				
				var casClient= $("li#dimensionnement");
				idCasClient = $("li#dimensionnement").attr("id");
				var tlSlideCasClient;
				tlSlideCasClient = new TimelineMax();
				var heightBlocCache = $("li.slide-cas-client#"+idCasClient+" .bloc-cache").height();
				
				TweenMax.to($("ul#slides-cas-clients li.slide-cas-client.ouvert .bloc-cache"), 0.2, {height: "0", ease:textAnimationEase, onComplete: function(){
					$("ul#slides-cas-clients li.slide-cas-client.ouvert .bloc-cache").css("display", "none");
					$("ul#slides-cas-clients li.slide-cas-client.ouvert .bloc-cache").css("height", "auto");
					$("ul#slides-cas-clients li.slide-cas-client.ouvert").removeClass("ouvert");
					TweenMax.fromTo($("li.slide-cas-client#"+idCasClient+" .bloc-cache"), 0.4, {display: "block", height: "0"}, {height: heightBlocCache+"px", ease:textAnimationEase, onComplete: function(){
						$("li.slide-cas-client#"+idCasClient+" .bloc-cache").css("height", "auto");
						$("li.slide-cas-client#"+idCasClient).addClass("ouvert");
						$("#masque-slides-cas-clients").animate({ scrollTop: 400+casClient.index()*84-$("ul#puces-slides-cas-clients").offset().top}, {duration:300});
						customCasClientScroll();
					}});
				}});
			}
		}, 800);
	}
	
	
	
	// clic sur une slide client
	$("ul#slides-cas-clients li.slide-cas-client").click(function() {
		if(!($(this).hasClass("ouvert"))){
			if(!TweenMax.isTweening($("ul#slides-cas-clients li.slide-cas-client .bloc-cache"))){
				fermerCasClient();
				if($("ul.logos-cas-client li.logo-cas-client").hasClass("active")){
					oldIdLogoCasClient = $("ul.logos-cas-client li.logo-cas-client.active a").attr("id");
					$("ul.logos-cas-client li.logo-cas-client.active").removeClass("active");
					// fermer le cas client déjà ouvert
					TweenMax.to($("li#texte-"+oldIdLogoCasClient), 0, {display: "none", ease:textAnimationEase, onComplete: function(){
						$("li#texte-"+oldIdLogoCasClient).removeClass("ouvert");
					}});
				}
														
				indexPuceCasClientClic = $(this).index()+1;
				majPucesCasClient(indexPuceCasClientClic);
				
				var casClient= $(this);
				idCasClient = $(this).attr("id");
				//window.location.hash = '#'+idCasClient;
				window.history.pushState(null,null,'#'+idCasClient);
				var tlSlideCasClient;
				tlSlideCasClient = new TimelineMax();
				var heightBlocCache = $("li.slide-cas-client#"+idCasClient+" .bloc-cache").height();
				
				TweenMax.to($("ul#slides-cas-clients li.slide-cas-client.ouvert .bloc-cache"), 0.2, {height: "0", ease:textAnimationEase, onComplete: function(){
					$("ul#slides-cas-clients li.slide-cas-client.ouvert .bloc-cache").css("display", "none");
					$("ul#slides-cas-clients li.slide-cas-client.ouvert .bloc-cache").css("height", "auto");
					$("ul#slides-cas-clients li.slide-cas-client.ouvert").removeClass("ouvert");
	
					TweenMax.fromTo($("li.slide-cas-client#"+idCasClient+" .bloc-cache"), 0.4, {display: "block", height: "0"}, {height: heightBlocCache+"px", ease:textAnimationEase, onComplete: function(){
						$("li.slide-cas-client#"+idCasClient+" .bloc-cache").css("height", "auto");
						$("li.slide-cas-client#"+idCasClient).addClass("ouvert");
						//$("#masque-slides-cas-clients").animate({ scrollTop: ($("ul#puces-slides-cas-clients").position().top)+(casClient.index())+1*84}, 300);
						//$("#masque-slides-cas-clients").animate({ scrollTop: 330+casClient.index()*84-heightBlocCache}, {duration:300});
						$("#masque-slides-cas-clients").animate({ scrollTop: 400+casClient.index()*84-$("ul#puces-slides-cas-clients").offset().top}, {duration:300});
					}});
				}});
			}
	
		}
		return false;
	});
	
	// clic sur un logo cas client
	$("li.logo-cas-client").click(function() {
		var tlSlideCasClientLogo;
		tlSlideCasClientLogo = new TimelineMax();
		
		var dejaOuvert=false;
		if($(this).hasClass("active")){
			dejaOuvert=true;
		}
		var heightNextBloc = 0;
		// si un cas client est déjà ouvert
		if($("ul.logos-cas-client li.logo-cas-client").hasClass("active")){
			oldIdLogoCasClient = $("ul.logos-cas-client li.logo-cas-client.active a").attr("id");
			$("ul.logos-cas-client li.logo-cas-client.active").removeClass("active");
			// fermer le cas client déjà ouvert
			if(!dejaOuvert){
				var parentNotreReponseCasClient = $(this).parent().parent().parent();
				heightNextBloc = $(".part-cas-client ul.textes-cas-client li.texte-cas-client", parentNotreReponseCasClient).height();
			}
			tlSlideCasClientLogo.to($("li#texte-"+oldIdLogoCasClient), 0, {display: "none", ease:textAnimationEase, onComplete: function(){
				$("li#texte-"+oldIdLogoCasClient).removeClass("ouvert");
			}});
		}else{
			$(this).parent().parent().parent().parent().addClass("cas-client-ouvert");
		}
		
		// si le cas client sur lequel on clique n'est pas deja ouvert
		if (!dejaOuvert) {
			idLogoCasClient = $("a",this).attr("id");
			var heightCasClientCache = $("li#texte-"+idLogoCasClient).height();
			$(this).addClass("active");
			var parentNotreReponseCasClient = $(this).parent().parent().parent();
			var blocNotreReponse = $(".part-notre-reponse", parentNotreReponseCasClient);
			var blocCasClient = $(".part-cas-client", parentNotreReponseCasClient);
			var blocCacheNotreReponse = $(".part-notre-reponse .bloc-cache-notre-reponse", parentNotreReponseCasClient);
			var h3BlocNotreReponse = $(".part-notre-reponse a.btn-notre-reponse", parentNotreReponseCasClient);
			TweenMax.to(h3BlocNotreReponse, 0, {css:{className:'+=btn-base'}});
			if ($(window).width()>767){
				TweenMax.to(blocNotreReponse, 0.4, {width: "23%", ease:textAnimationEase});
				TweenMax.to(blocCasClient, 0.4, {width: "73%", borderLeft: "1px solid #c5d4db", paddingLeft: "20px", ease:textAnimationEase});
			}else{
				TweenMax.to(blocNotreReponse, 0.4, {width: "100%", ease:textAnimationEase});
				TweenMax.to(blocCasClient, 0.4, {width: "100%", borderLeft: "1px solid #c5d4db", paddingLeft: "10px", ease:textAnimationEase});
			}
			TweenMax.to(blocCacheNotreReponse, 0.4, {opacity: "0", ease:textAnimationEase, onComplete: function(){
				TweenMax.to(blocCacheNotreReponse, 0, {display: "none"}); 
			}});
			tlSlideCasClientLogo.fromTo($("li#texte-"+idLogoCasClient), 0.4, {display: "block", height: heightNextBloc}, {height: heightCasClientCache+"px", ease:textAnimationEase, onComplete: function(){
				$("li#texte-"+idLogoCasClient).css("height", "auto");
				$("li#texte-"+idLogoCasClient).addClass("ouvert");
			}});
		}else{
			fermerCasClient();
		}
		return false;
	});
	
	// clic sur une puce cas client
	$("ul#puces-slides-cas-clients li.puce-slides-cas-clients a.lien-puce-slides-cas-clients").click(function(){
		if(!($(this).hasClass("active"))){
			if(!TweenMax.isTweening($("ul#slides-cas-clients li.slide-cas-client .bloc-cache"))){
				oldIndexPucesCasClient = $("a.lien-puce-slides-cas-clients.active").parent().index()+1;
				indexPuceCasClientClic = $(this).parent().index()+1;
				majPucesCasClient(indexPuceCasClientClic);
				
				fermerCasClient();
				if($("ul.logos-cas-client li.logo-cas-client").hasClass("active")){
					oldIdLogoCasClient = $("ul.logos-cas-client li.logo-cas-client.active a").attr("id");
					$("ul.logos-cas-client li.logo-cas-client.active").removeClass("active");
					// fermer le cas client déjà ouvert
					TweenMax.to($("li#texte-"+oldIdLogoCasClient), 0, {display: "none", ease:textAnimationEase, onComplete: function(){
						$("li#texte-"+oldIdLogoCasClient).removeClass("ouvert");
					}});
				}
				var casClient = $("ul#slides-cas-clients li.slide-cas-client").eq(indexPuceCasClientClic-1);
				idCasClient = $("ul#slides-cas-clients li.slide-cas-client").eq(indexPuceCasClientClic-1).attr("id");
				window.history.pushState(null,null,'#'+idCasClient);
				var tlSlideCasClient;
				tlSlideCasClient = new TimelineMax();
				var heightBlocCache = $("li.slide-cas-client#"+idCasClient+" .bloc-cache").height();
				
				TweenMax.to($("ul#slides-cas-clients li.slide-cas-client.ouvert .bloc-cache"), 0.2, {height: "0", ease:textAnimationEase, onComplete: function(){
					$("ul#slides-cas-clients li.slide-cas-client.ouvert .bloc-cache").css("display", "none");
					$("ul#slides-cas-clients li.slide-cas-client.ouvert .bloc-cache").css("height", "auto");
					$("ul#slides-cas-clients li.slide-cas-client.ouvert").removeClass("ouvert");
					
					TweenMax.fromTo($("li.slide-cas-client#"+idCasClient+" .bloc-cache"), 0.4, {display: "block", height: "0"}, {height: heightBlocCache+"px", ease:textAnimationEase, onComplete: function(){
						$("#masque-slides-cas-clients").animate({ scrollTop: 400+casClient.index()*84-$("ul#puces-slides-cas-clients").offset().top}, {duration:300});
						$("li.slide-cas-client#"+idCasClient+" .bloc-cache").css("height", "auto");
						$("li.slide-cas-client#"+idCasClient).addClass("ouvert");
					}});
				}});
			}
			
		}
		return false;
	});
	
	// clic sur le bouton notre reponse
	$(".part-notre-reponse a.btn-notre-reponse").click(function(){
		if($(this).hasClass("btn-base")){
			fermerCasClient();
			if($("ul.logos-cas-client li.logo-cas-client").hasClass("active")){
				oldIdLogoCasClient = $("ul.logos-cas-client li.logo-cas-client.active a").attr("id");
				$("ul.logos-cas-client li.logo-cas-client.active").removeClass("active");
				// fermer le cas client déjà ouvert
				TweenMax.to($("li#texte-"+oldIdLogoCasClient), 0, {display: "none", ease:textAnimationEase, onComplete: function(){
					$("li#texte-"+oldIdLogoCasClient).removeClass("ouvert");
				}});
			}
		}
		
		return false;
	});
}


////////////////////////////////////////////////////////////////////////////////
/// Fonction pour empecher l'animation de slide down de se jouer 2x à suivre ///
////////////////////////////////////////////////////////////////////////////////

function mouseHandleVision(event, nomTimeline, indexPuceVision) {
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
        	if(indexPuceVision==1){
        		TweenMax.to($('a#btn-prev-slide-metier'), 0, {display: "block"});
        		majPucesVision(indexPucesVision+1);
        		TweenMax.to($('#slide1-vision'), textAnimationTime, {top: "-350px", opacity: "0.5", ease:textAnimationEase, onComplete: function(){
        			indexPucesVision++;
        		}});
        		TweenMax.to($('#slide2-vision'), textAnimationTime, {top: "50%", opacity: "1", ease:textAnimationEase});
        		TweenMax.to($('#slide3-vision'), textAnimationTime, {top: "100%", opacity: "0", ease:textAnimationEase});
        	}else if (indexPuceVision==2) {
        		majPucesVision(indexPucesVision+1);
        		TweenMax.to($('#slide1-vision'), textAnimationTime, {top: "-350px", opacity: "0", ease:textAnimationEase, onComplete: function(){
        			indexPucesVision++;
        		}});
        		TweenMax.to($('#slide2-vision'), textAnimationTime, {top: "-350px", opacity: "0.5", ease:textAnimationEase});
        		TweenMax.to($('#slide3-vision'), textAnimationTime, {top: "50%", opacity: "1", ease:textAnimationEase});
        	}
        	
        }else{
        	// au scroll up
        	if(indexPuceVision==2){
        		TweenMax.to($('a#btn-prev-slide-metier'), 0, {display: "none"});
        		majPucesVision(indexPucesVision-1);
	        	TweenMax.to($('#slide1-vision'), textAnimationTime, {top: "50%", opacity: "1", ease:textAnimationEase, onComplete: function(){
	        		indexPucesVision--;
	        	}});
	        	TweenMax.to($('#slide2-vision'), textAnimationTime, {top: "100%", opacity: "0", ease:textAnimationEase});
	        	TweenMax.to($('#slide3-vision'), textAnimationTime, {top: "100%", opacity: "0", ease:textAnimationEase});
        	}else if(indexPuceVision==3) {
        		majPucesVision(indexPucesVision-1);
				TweenMax.to($('#slide1-vision'), textAnimationTime, {top: "-350px", opacity: "0.5", ease:textAnimationEase, onComplete: function(){
					indexPucesVision--;
				}});
				TweenMax.to($('#slide2-vision'), textAnimationTime, {top: "50%", opacity: "1", ease:textAnimationEase});
				TweenMax.to($('#slide3-vision'), textAnimationTime, {top: "100%", opacity: "0", ease:textAnimationEase});
        	}
        }
    }
}


///////////////////////////////////////////////////////////////////////////////////////
// Fonction pour animer l'apparition du bloc question correspondant à la puce métier //
///////////////////////////////////////////////////////////////////////////////////////
function animAppartitionBlocQuesion(idPuceMetier){
	tlBlocQuestion = new TimelineMax();
	tlBlocBulle = new TimelineMax();
	tlPuce = new TimelineMax();
	
	tlBlocQuestion.fromTo($("#bloc-question-"+idPuceMetier), blocQuestionAnimationTime, {y: "20px", display: "none"}, {y: "0", opacity: "1", display: "block", ease:Back.easeOut, delay: 0.1});	  
	tlBlocBulle.fromTo($("#bloc-bulle-"+idPuceMetier), blocQuestionAnimationTime, {opacity: "1", y: "0"}, {opacity: "0", y: "-10px"})
			   .fromTo($(".bloc-bulle:not(#bloc-bulle-"+idPuceMetier+")"), blocQuestionAnimationTime, {opacity: "1"}, {opacity: "0"}, 0);
	tlPuce.fromTo($("li.puce-metier:not(#"+idPuceMetier+") .contour-puce"), blocQuestionAnimationTime, {scale: "1"}, {scale: "0.6"})
		  .fromTo($("li.puce-metier:not(#"+idPuceMetier+") .contour-puce .rond-cible"), blocQuestionAnimationTime, {scale: "1"}, {scale: "1.4"}, 0);
}

function animDisparitionBlocQuesion(){
	tlBlocQuestion.reverse();
	tlBlocBulle.reverse();
	tlPuce.reverse();
}

///////////////////////////////////////////////////////////////////////////////
//////////////// Fonction pour initialiser les slides vision //////////////////
///////////////////////////////////////////////////////////////////////////////
function initSlidesVision(){
	TweenMax.to($('#slide1-vision'), textAnimationTime, {top: "50%", opacity: "1", delay: 0.5});
}

////////////////////////////////////////////////////////////////////////////////
///////// Fonctions pour animer les trois slides avec trois timelines //////////
////////////////////////////////////////////////////////////////////////////////

function getEtape2SlideVision() {
	tlSlide2Vision = new TimelineMax();
			
	tlSlide2Vision.to($('#slide1-vision'), textAnimationTime, {top: "-350px", opacity: "0.5", ease:textAnimationEase})
				  .to($('#slide2-vision'), textAnimationTime, {top: "50%", opacity: "1", ease:textAnimationEase},0);
			
	return tlSlide2Vision;        
}

function getEtape3SlideVision() {
	tlSlide3Vision = new TimelineMax();
	
	tlSlide3Vision.to($('#slide1-vision'), textAnimationTime, {top: "-350px", opacity: "0", ease:textAnimationEase})
				  .to($('#slide2-vision'), textAnimationTime, {top: "-350px", opacity: "0.5", ease:textAnimationEase},0)
				  .to($('#slide3-vision'), textAnimationTime, {top: "50%", opacity: "1", ease:textAnimationEase},0);
	
	return tlSlide3Vision;        
}

function pauseVision(){
	tlSlidesVision.pause();
}

////////////////////////////////////////////////////////////////////////////////
//////////// Fonction pour animer les transitions entre les slides /////////////
////////////////////////////////////////////////////////////////////////////////
function animateSlidesVision(){
	tlSlidesVision.play();
}

////////////////////////////////////////////////////////////////////////////////
///////// Fonction pour mettre à jour la puce active des slides vision /////////
////////////////////////////////////////////////////////////////////////////////
function majPucesVision(indexPucesVision){
	$("ul#puces-slides-vision li.puce-slides-vision a.lien-puce-slides-vision").removeClass("active");
	$("ul#puces-slides-vision li.puce-slides-vision a.lien-puce-slides-vision").eq(indexPucesVision-1).addClass("active");
}

////////////////////////////////////////////////////////////////////////////////
////////////////////// Fonction pour stopper les videos ////////////////////////
////////////////////////////////////////////////////////////////////////////////
function stopVideos(){
	$(".video-actu iframe").each(function(index) {
	  $(this).attr('src', $(this).attr('src'));
	});
}

////////////////////////////////////////////////////////////////////////////////
///////////////////// Fonction pour fermer un cas client ///////////////////////
////////////////////////////////////////////////////////////////////////////////
function fermerCasClient(){
	if($(window).width()>767){
		if($("li.slide-cas-client.ouvert").hasClass("cas-client-ouvert")){
			var slideCasClientOuvert = $("li.slide-cas-client.ouvert.cas-client-ouvert");
			slideCasClientOuvert.removeClass("cas-client-ouvert");
			/*TweenMax.to($(".bloc-cache .part-notre-reponse h3", slideCasClientOuvert), 0.4, {background: "none", color: "#6a9a25", textAlign: "left", fontSize: "2.625em", width: "auto", ease:textAnimationEase});*/
			var h3BlocNotreReponse = $(".bloc-cache .part-notre-reponse a.btn-notre-reponse", slideCasClientOuvert);
			TweenMax.to(h3BlocNotreReponse, 0, {css:{className:'-=btn-base'}});
			TweenMax.to($(".bloc-cache .part-notre-reponse", slideCasClientOuvert), 0.4, {width: "40%", ease:textAnimationEase});
			TweenMax.to($(".bloc-cache .part-cas-client", slideCasClientOuvert), 0.4, {width: "56%", borderLeft: "none", paddingLeft: "0", ease:textAnimationEase});
			TweenMax.to($(".bloc-cache .part-notre-reponse .bloc-cache-notre-reponse", slideCasClientOuvert), 0, {display: "block", onComplete: function(){
				TweenMax.to($(".bloc-cache .part-notre-reponse .bloc-cache-notre-reponse", slideCasClientOuvert), 0.4, {opacity: "1", ease:textAnimationEase});
			}});
		}
	}else{
		if($("li.slide-cas-client.ouvert").hasClass("cas-client-ouvert")){
			var slideCasClientOuvert = $("li.slide-cas-client.ouvert.cas-client-ouvert");
			slideCasClientOuvert.removeClass("cas-client-ouvert");
			/*TweenMax.to($(".bloc-cache .part-notre-reponse h3", slideCasClientOuvert), 0.4, {background: "none", color: "#6a9a25", textAlign: "left", fontSize: "2.625em", width: "auto", ease:textAnimationEase});*/
			var h3BlocNotreReponse = $(".bloc-cache .part-notre-reponse a.btn-notre-reponse", slideCasClientOuvert);
			TweenMax.to(h3BlocNotreReponse, 0, {css:{className:'-=btn-base'}});
			TweenMax.to($(".bloc-cache .part-notre-reponse", slideCasClientOuvert), 0.4, {width: "100%", ease:textAnimationEase});
			TweenMax.to($(".bloc-cache .part-cas-client", slideCasClientOuvert), 0.4, {width: "100%", borderLeft: "none", paddingLeft: "0", ease:textAnimationEase});
			TweenMax.to($(".bloc-cache .part-notre-reponse .bloc-cache-notre-reponse", slideCasClientOuvert), 0, {display: "block", onComplete: function(){
				TweenMax.to($(".bloc-cache .part-notre-reponse .bloc-cache-notre-reponse", slideCasClientOuvert), 0.4, {opacity: "1", ease:textAnimationEase});
			}});
		}
	}
}

////////////////////////////////////////////////////////////////////////////////
/////// Fonction pour mettre à jour la puce active des slides cas client ///////
////////////////////////////////////////////////////////////////////////////////
function majPucesCasClient(indexPucesCasClient){
	$("ul#puces-slides-cas-clients li.puce-slides-cas-clients a.lien-puce-slides-cas-clients").removeClass("active");
	$("ul#puces-slides-cas-clients li.puce-slides-cas-clients a.lien-puce-slides-cas-clients").eq(indexPucesCasClient-1).addClass("active");
}

////////////////////////////////////////////////////////////////////////////////
/////// Fonction pour afficher la barre de scroll custom des cas clients ///////
////////////////////////////////////////////////////////////////////////////////
function customCasClientScroll(){
	for (var key in niceScrolls){
		   // virer les scrollbars qui trainent
	   niceScrolls[key].resize().hide().remove();
	}
	niceScrolls = [];
	if($(window).width()>767){
		niceScrolls.push($("#masque-slides-cas-clients").niceScroll({
			cursorcolor: "#fff",
			cursorwidth: "3px",
			cursorborderradius: "3px",
			railalign: "right",
			background: "rgba(255, 255, 255, 0.2)",
			cursorborder: "none",
			autohidemode: "none"
		}));
	}
}

$(window).bind( 'hashchange', function(e) { 
	
});