//archivo con ajax y slide panel

//variables para el slide in panel
var $menu_navigation = $('#main-nav');
var $cart_trigger = $('#cd-cart-trigger');
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

$(document).ready(function() {

	//hacemos el selector que conecta una var con el id de un div en html
	productsContainer = $("#products-container");
	
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
		})
		//cuando no llama al json
		.fail(function() {
			console.log("no funciona llamada ajax");
		});


		//cerrar el carrito lateral al hacer click afuera
	$shadow_layer.on('click', function() {
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
