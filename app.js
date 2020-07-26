//variables para el slide in panel
var $menu_navigation = $('#main-nav');
var $cart_trigger = $('#cd-cart-trigger');
var $cart_trigger_float=$("#cd-cart-trigger-float");
var $lateral_cart = $('#cd-cart');
var $shadow_layer = $('#cd-shadow-layer');

/*funcion para que se haga visible el panel lateral con el carrito */
function toggle_panel_visibility ($lateral_panel, $background_layer, $body) {
	if( $lateral_panel.hasClass('speed-in') ) {
		$lateral_panel.removeClass('speed-in').one(function(){
			$body.removeClass('overflow-hidden');
		});
		$background_layer.removeClass('is-visible');

	} else {
		$lateral_panel.addClass('speed-in').one(function(){
			$body.addClass('overflow-hidden');
		});
		$background_layer.addClass('is-visible');
	}
};
//aparece buscador al hacer scroll
searchBox=$(".search-box");
searchBox.onscroll= appearSearch();
function appearSearch(){
	$("#form-search").fadeIn(200);
};

//start page
function renderOpenPage(){
openPageContainer.append(`
<div class="start-video">
<video autoplay muted loop id="myVideo">
      <source src="img/video-start.mp4" type="video/mp4">
    </video>
  <div class="container-fluid video-color-bg">
    <div class="row">
      <div class="col-lg-6 col-md-8 button-container">
        <p class="title-start">TripBA</p>
        <button type="button"class="btnIdioma" href="#" onclick="openPage()">ESP</button> 
        <button type="button"class="btnIdioma" href="#404" onclick="open404Eng()">ENG</button> 
        <button type="button"class="btnIdioma" href="#404" onclick="open404Por()">POR</button> 
      </div>
    </div>
  </div>
</div>`);
};

function renderPage404Eng(){
pageConstructionEng.append(`
<div class="construction-container col-lg-5 col-md-7">
<div class="english">
	<img src="img/under_constructions.svg">
	<p class="text-construction">We are making lots of improvements and will be back soon ...</p>
	<form action="" name="contact" class="form-contact col-sm-11">
	<input type="email" class="email-input"  name="email" id="email-eng" placeholder="Enter your email to get notified"/>
	<button type="submit" class="submit-email">Submit</button>
  </form>
  <p class="text-back-soon">Come Back Soon !!
  <button type="button"class="btnBack" href="#" onclick="backPage()">
	<i class="fas fa-undo"></i>
	</button>
	</p>
</div>
</div>
<div class="image-container col-lg-7 col-md-5">
</div>`);
};

function renderPage404Por(){
	pageConstructionPor.append(`
	<div class="construction-container col-lg-5 col-md-7">
	<div class="portugues">
		<img src="img/under_constructions.svg">
		<p class="text-construction">Estamos fazendo muitas melhorias e voltaremos em breve ...</p>
		<form action="" name="contact" class="form-contact col-sm-11">
		<input type="email" class="email-input "  name="email" id="email-por" placeholder="Digite o email para ser notificado"/>
		<button type="submit" class="submit-email">Enviar</button>
	</form>
	<p class="text-back-soon">Volte logo !!
	<button type="button"class="btnBack" href="#" onclick="backPage()">
	<i class="fas fa-undo"></i>
	</button>
	</p>	
	</div>
	</div>
	<div class="image-container col-lg-7 col-md-5">
	</div>`);
	}

//funcion para abrir pagina principal
function openPage(){
	//ver como hacer que se guarde el click y no haga falta volver a clickear cada vez que entro
	//spanish=sessionStorage.setItem("openPage", JSON.stringify(openPageContainer));
	$("#main-page").show();
	$("#start-page").hide()
	};
//funcion para abrir pagina en construccion
function open404Eng(){
	$("#start-page").hide();
	$("#construction-page-english").show()
};
function open404Por(){
	$("#start-page").hide();
	$("#construction-page-portugues").show()
};
//funcion para volver a la pagina de inicio
function backPage(){
	$("#construction-page-english").hide();
	$("#construction-page-portugues").hide();
	$("#start-page").show()
};

//al hacer click en metodo de pago que aparezca form para poner datos de tarjeta
inputRadioPago=$("input[name=metodopago]:radio");
inputRadioPago.click(function  () {
	if ($('input[name=metodopago]:checked').val() == "debito") {
		$(".datosTarjeta").show();
		$("#disclaimer-efectivo").hide()
		}
	else if ($('input[name=metodopago]:checked').val() == "credito") {
		$(".datosTarjeta").show();
		$("#disclaimer-efectivo").hide()
		}	
else if ($('input[name=metodopago]:checked').val() == "efectivo") {
	$("#disclaimer-efectivo").show()
	$(".datosTarjeta").hide();
		};
	});
//si hace click en efectivo que aparezca un disclaimer de como se hace el pago

//al hacer click en comprar en checkout
$("#comprar").click(function(){
	$("#envio-container").show();
	$("#checkout-form").hide();});
//btn luego de comprar en checkout para volver a pagina de inicio
$("#backInicio").click(function(){
//hace un refresh de la pagina	
	window.location.reload();
})	

$(document).ready(function() {
	openPageContainer=$("#start-page");
	mainPage=$("#main-page");
	pageConstructionEng=$("#construction-page-english");
	pageConstructionPor=$("#construction-page-portugues");
	//llamamos a las funciones render de las paginas inicio y 404
	renderOpenPage();
	renderPage404Eng();
	renderPage404Por();
	//hacemos el selector que conecta una var con el id de un div en html
	productsContainer = $("#products-container");
	detailsContainer=$("#details-container");
	//1) llamada json apenas se carga la pagina
	$.ajax({
			method: "GET",
			url: "data.json",
			dataType: "json"
		})
		//cuando llama al json de forma correcta
		.done(function(data) {
			console.log("hay ajax.json carga bien");
			/*aca llamamos a la funcion que "arma" el html de los productos.
			no olvidar poner el parametro products en la funcion */
			renderProducts(data);
			renderDetails(data);
		})
		//cuando no llama al json
		.fail(function() {
			console.log("no funciona llamada ajax");
		});

	//funcion buscadora. busca directamente al escribir en el input
	$("#search-box-input").on("keyup", function() {
		var value = $(this).val().toLowerCase();
		$("#products-container .tourCards").filter(function() {
			$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
		});
	});
	  
//cerrar el carrito lateral al hacer click afuera
	$shadow_layer.click(function() {
		$shadow_layer.removeClass('is-visible');
		if ($lateral_cart.hasClass('speed-in')) {
			$lateral_cart.removeClass('speed-in').on(function() {
				$('body').removeClass('overflow-hidden');
			});
			$menu_navigation.removeClass('speed-in');
		} else {
			$menu_navigation.removeClass('speed-in').on(function() {
				$('body').removeClass('overflow-hidden');
			});
			$lateral_cart.removeClass('speed-in');
		}
	});
})
