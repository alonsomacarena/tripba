/*3) armamos la funcion addOrder para que se conecte con el click del boton en c/producto */
//primero hay que arrancar con una lista/cart vacia 
let order=[]
var total=0;
var days ="";
var impuestoPais = 1.02;
//sin parametro products en funcion me decia products is not defined
function addOrder(products, index) {
	order.push(products[index]);
	localStorage.setItem("order", JSON.stringify(order));
	console.log(order);
	renderCart();
};
//funcion para renderizar los dias de los tours
function renderDays(days,daysDisplay ){
	daysDisplay=$(".days-confirm");
	daysDisplay.html(" " + days);
};
//funcion para calcular el total de dias que tendra tours
function calculateDays(products){
	days="";
	order.forEach(function(product){
		days = days + " " + product.day;
	});
	renderDays(days,".days-confirm" )
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
	//llamo a la funcion para renderizar el precio
	renderPrice(total,".price-display");
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
renderDays("id");
calculateDays();
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
		<h6>${product.title}</h6>
		<a href="#" class="far fa-trash-alt trash-icon" onclick="deleteItem('${product.id}')">
		</a>
		</div>
        <div class="description-cart">${product.description}</div>
		</li>
		</ul>
		`);
//llamo a la funcion que calcula el total sumando los precios
calculateTotal();
//llamo a la funcion que calcula el total sumando los dias 
calculateDays();
	});
//boton para cancelar compra-vaciar carrito y local storage
	btnCancel=$("#btnCancel");
	btnCancel.click(function(){
		order=[];
		cartContainer.empty();
		calculateTotal();
		calculateDays();
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
		//hacer que el total al hacer checkout sume el impuesto
		priceDisplay= $(".price-display");
		//agrega un impuesto al total
		totalConPais=total *impuestoPais;
		priceDisplay.html("$" + " " + totalConPais.toFixed(0));
		//muestra el texto que avisa que se le puso un impuesto al total
		impuestoDisclaimer=$("#impuesto-disclaimer");
		$("#impuesto-disclaimer").css("display","inline-block");
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

