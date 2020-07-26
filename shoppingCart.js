/*3) armamos la funcion addOrder para que se conecte con el click del boton en c/producto */
//primero hay que arrancar con una lista/cart vacia 
let order=[]
var total=0;
var impuestoPais = 1.02;
var euro= 0.86;
var real= 5.23;
var pesos= 40;
//sin parametro products en funcion me decia products is not defined
function addOrder(products, index) {
	order.push(products[index]);
	localStorage.setItem("order", JSON.stringify(order));
	console.log(order);
	renderCart();
};
//funcion para renderizar el precio
function renderPrice(total,priceDisplay,priceDisplayTotal){
	priceDisplay= $(".price-display");
	priceDisplayTotal=$(".price-display-total");
	inputRadioPrice=$("input[name=divisa]:radio");
	priceEuro= total * euro;
	priceReal = total * real;
	pricePesos = total * pesos;
	priceEuroNew= priceEuro*impuestoPais;
	priceRealNew =priceReal*impuestoPais;
	totalNew=total *impuestoPais;
//hacer que en el subtotal aparezca el valor en cada divisa sin el impuesto pais
	priceDisplay.html("$" + " " + total.toFixed(0));
	console.log(priceEuro.toFixed(0) + "e" +" " + priceReal.toFixed(0) + "r" + " " + pricePesos.toFixed(0) + "p" );
//cuando clickeo cada radio button le agrega el impuesto pais al dolar, euro y real
	inputRadioPrice.click(function  () {
		if ($('input[name=divisa]:checked').val() == "dollar") {
			priceDisplayTotal.html("$" + " " + totalNew.toFixed(0) + " " + "Dolar");
			}
	else if ($('input[name=divisa]:checked').val() == "euro") {
			priceDisplayTotal.html("$" + " " + priceEuroNew.toFixed(0) + " "+ "Euro");
			}
	else if ($('input[name=divisa]:checked').val() == "real") {
			priceDisplayTotal.html("$" + " " + priceRealNew.toFixed(0) + " "+ "Real");
			}
else if ($('input[name=divisa]:checked').val() == "pesos") {
			priceDisplayTotal.html("$" + " " + pricePesos.toFixed(0) + " "+ "Pesos");
			}						
		});
};
//funcion para calcular el total
function calculateTotal(products){
	total=0;
	order.forEach(function(product){
		total = total + product.price;
	})	
	//llamo a la funcion para renderizar el precio
	renderPrice(total,".price-display", ".price-display-total");
};
//funcion que filtra productos x su id
function getById(id){
order.filter((product)=> product.id === id);
};
//funcion para eliminar un producto individualmente-resta precio del total
function deleteItem(id){
//llamo a la funcion filtradora x id
product= getById(id);
order= (localStorage.getItem("order")=== null)?[]: JSON.parse(localStorage.getItem("order"));
productIndex= order.findIndex((product)=> product.id === id);
order.splice(productIndex,1);
localStorage.setItem("order", JSON.stringify(order));
//aca elimina de los totales el producto eliminado segun su id
renderCart("id");
calculateTotal();

//se borra el total y al clickear nuevamente el radio button aparece el nuevo total sin el precio del tour eliminado
if ($('input[name=divisa]:checked').val() == "dollar") {
	priceDisplayTotal.empty(totalNew)}
else if ($('input[name=divisa]:checked').val() == "euro") {
	priceDisplayTotal.empty(priceEuroNew)
	}
else if ($('input[name=divisa]:checked').val() == "real") {
	priceDisplayTotal.empty(priceRealNew)
	}
else if ($('input[name=divisa]:checked').val() == "pesos") {
	priceDisplayTotal.empty(pricePesos)
	};

	inputRadioPrice.prop( "checked", false );	
};
//funcion para mostrar la orden
function renderCart(products) {
	//vacia la orden para que se vayan agregando de a 1 y no que se sumen las listas 
	cartContainer.empty();
	//inicio del total precios order es 0
	order.forEach(function(product) {
		cartContainer.append(`
		<ul class="item-list">
		<img src="${product.img}" width="35%">
		<li class="list-cart" >
		<div class="title-cart">
		<h6 class="product-title-cart">${product.title}</h6>
		<a href="#" class="far fa-trash-alt trash-icon" onclick="deleteItem('${product.id}')">
		</a>
		</div>
		<div class="description-cart">${product.description}</div>
		<p class="day-horario-cart">${product.day} / ${product.horario}</p>
		</li>
		</ul>
		`);
//llamo a la funcion que calcula el total sumando los precios
calculateTotal();
	});
//boton para cancelar compra-vaciar carrito y local storage
	btnCancel=$("#btnCancel");
	btnCancel.click(function(){
		order=[];
		cartContainer.empty();
		calculateTotal();
		localStorage.clear();
		priceDisplayTotal.empty()
		inputRadioPrice.prop( "checked", false );
	});
};	

$(document).ready(function() {
    cartContainer = $("#cart-container");
	//boton para confirmar el pedido forma de pago y horario
	btnConfirm = $("#btnConfirm");
	btnConfirm.click(function() {
		$("#container-hide-checkout").hide();
		$("#checkout-form").show();
	});
	priceDisplayTotal=$(".price-display-total");
	//hacer que el total al hacer checkout sume el impuesto y que cambie valor segun divisa
	inputRadioPrice=$("input[name=divisa]:radio");
	//abre el cart al hacer click en el icono cart
	$cart_trigger.click(function(event) {
		event.preventDefault();
		//cerrar panel lateral si esta abierto
		$menu_navigation.removeClass('speed-in');
		toggle_panel_visibility($lateral_cart, $shadow_layer, $('body'));
	});
	/*abre cart al hacer click en el boton de agregar al carrito en los productos
	ya tengo en product.js el metodo en el que al hacer event click sobre el boton se agrega al carrito*/
//abre el cart al hacer click en el icono cart flotante
$cart_trigger_float.click( function(event) {
	event.preventDefault();
	//cerrar panel lateral si esta abierto
	$menu_navigation.removeClass('speed-in');
	toggle_panel_visibility($lateral_cart, $shadow_layer, $('body'));
});
})
