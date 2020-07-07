/*2) armamos la funcion usando jquery que "arma" el html de los productos. */
function renderProducts(products) {
	products.forEach(function(product, index) {
		productsContainer.append(`
		<article class="tourCards col-sm-3" >
		  <h4 class="tourTitle">${product.title}</h4>
		  <img src="${product.img}" class="imageTour">
          <p class="text-day-duration">EL TOUR TIENE UNA DURACION DE: <span class="duration">${product.duracion}</span></p>
          <p class="text-day-duration">EL TOUR SE REALIZA EL DIA: <span class="day">${product.day}</span></p>
		  <div class="description-price-container">
          <p class="description">${product.description}</p>
		  <p class="price">$ ${product.price}</p>
		  </div>
		  <div class="container-btnTour">
			<button type="button" class="btnDetalle" href="#">Ver Detalle</button>
			<button type="button"class="btnShoppingCart" href="#cart-container" data-id="${index}"> 
			Agregar al carrito</button>
		  </div>
	  </article>
		`);
	});
	/*2) aca tengo los productos armados como innerHTML. */
	/*estar atenta a donde lo coloco. Como lo estaba poniendo por fuera de la funcion no me funcionaba!! */
	//cada producto se crea con sus datos del json ok
	console.log(products);
	//boton en products para agregarlos al cart
	btnShoppingCart = $(".btnShoppingCart");
	btnShoppingCart.click(function() {	
	var indexSelectionProduct = $(this).data("id");
	console.log(indexSelectionProduct);
	addOrder(products,indexSelectionProduct);
	event.preventDefault();
		//cerrar panel lateral si esta abierto
		$menu_navigation.removeClass('speed-in');
		toggle_panel_visibility($lateral_cart, $shadow_layer, $('body'));	
	}); /*hice un evento click a un boton para agregar los productos al carrito x su id */
	/* 3)lo siguiente seria definir addOrder. pero lo hago arriba de esto.*/
};

