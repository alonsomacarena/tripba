/*3) armamos la funcion addOrder para que se conecte con el click del boton en c/producto */
//primero hay que arrancar con una lista/cart vacia 
let order=[]
var total=0;
var days ="";
//sin parametro products en funcion me decia products is not defined
function addOrder(products, index) {
	order.push(products[index]);
	localStorage.setItem("order", JSON.stringify(order));
	console.log(order);
	renderCart();
};
//funcion para renderizar el precio
function renderPrice(total,priceDisplay){
	priceDisplay= $(".price-display");
	priceDisplay.html("$" + " " + total);
};

//funcion para calcular el total
function calculateTotal(products){
	total=0;
	order.forEach(function(product){
		total = total + product.price;
	});
	//me pasa el precio del producto
	console.log(total);
	//llamo a la funcion para renderizar el precio
	renderPrice(total,".price-display");
};	
/*//funcion para renderizar dias
function renderDays(days, products){
$(".days-confirm").html(days);
};
//funcion para calcular el total de dias
function calculateDays(products){
	var days ="";
order.forEach(function(product){
 //llamo el dia de cada tour 	
 days = days + " " + product.day;
});
console.log(days);
renderDays(days,".days-confirm" );
}*/
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
		<h6>${product.title}</h6>
		<a href="#" class="far fa-trash-alt trash-icon">
		</a>
		</div>
        <div class="description-cart">${product.description}</div>
		</li>
		</ul>
		`);
//llamo a la funcion que calcula el total sumando los precios
calculateTotal();
	
//llamo a la funcion que calcula el total sumando los dias
		//calculateDays();
//voy a actualizar la cant con cada elemento que agrego	
	});

//boton para cancelar producto individual. 
btnTrashIcon=$(".trash-icon");
btnTrashIcon.click(function(){
		event.preventDefault();
		let indice = $(event.target).attr('id')
		$(event.target).parent().parent().parent().remove()
        order.splice(indice,1);
		localStorage.setItem('order', JSON.stringify(order));
		//no me resta el precio del elemento que elimino. sino otro
		calculateTotal();
		//calculateDays();
	});
//boton para cancelar compra-vaciar carrito y local storage
	btnCancel=$("#btnCancel");
	btnCancel.click(function(){
		order=[];
		cartContainer.empty();
		calculateTotal();
		horarioCheck.empty();
		localStorage.clear();
	});
};

$(document).ready(function() {
    cartContainer = $("#cart-container");
    //faltaria ver cuando elijan divisa
	horarioCheck=$("#horario-confirm");
	//boton para confirmar el pedido forma de pago y horario
	btnConfirm = $("#btnConfirm");
	btnConfirm.click(function() {
		//no pude hacer que puedan elegir en cada tour. solo me deja elegir en 1
		horario = $("input[name='horario']:checked");
		$("#horario-confirm").html(`<h3>${horario.val()}</h3>`);
	});
	//abre el cart al hacer click en el icono cart
	$cart_trigger.on('click', function(event) {
		event.preventDefault();
		//cerrar panel lateral si esta abierto
		$menu_navigation.removeClass('speed-in');
		toggle_panel_visibility($lateral_cart, $shadow_layer, $('body'));
	});
	/*abre cart al hacer click en el boton de agregar al carrito en los productos
	ya tengo en product.js el metodo en el que al hacer event click sobre el boton se agrega al carrito*/

})

