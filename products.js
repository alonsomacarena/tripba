/*que va a manipular toda la lista de productos del archivo data.js*/
function Products() {
    /*lo lleno con los datos del archivo data.js*/
    this.data = [];
    /*van a ser los resultados de la busqueda*/
    this.results = [];

    this.initProducts = function(data) {
        /*asigno la var data del archivo data.js a this.data --> asi tengo los datos disponibles*/
        this.data = data;
    }

    /*busca producto especifico x su id */
    this.getById = function(id) {
        return this.data.filter((product)=> product.id === id)
    }

    /*armo el html directamente aca*/
    this.buildHtmlProduct = function(product) {
        return `
        <article class="tourCards">
        <h4 class="tourTitle">${product.title}</h4>
        <img src="${product.img}" class="imageTour">
        <p class="duration">${product.duracion}</p>
        <div class="description-price-container">
        <p class="description">${product.description}</p>
        <p class="price">$ ${product.price}</p>
        </div>
            <p class="horarios-title">Horarios Disponibles</p>
        <div id="horarios-container">    
        <label class="container-horarios">
        <input type="radio" checked="checked" name="radio-check" value="horario1" class="check">
        ${product.horario1}
        <span class="checkmark"></span>
        </label>
        <label class="container-horarios">
        <input type="radio" name="radio-check" value="horario2" class="check">
        ${product.horario2}
        <span class="checkmark"></span>
        </label>
        <label class="container-horarios">
        <input type="radio" name="radio-check" value="horario3" class="check">
        ${product.horario3}
        <span class="checkmark"></span>
        </label>
        </div>
        <div class="container-btnTour">
          <button type="button" class="btnDetalle" href="#detalle">Ver Detalle</button>
          <button type="button" class="btnShoppingCart" href="#shoppingCart" onclick="addToCart('${product.id}')" >Agregar al carrito</button>
      </div>
      </article>
        `
    }
   /* */
    this.buildObjectsList = function(containerProductsId, sourceData) {
        var containerProducts = document.getElementById(containerProductsId);
        //vaciamos el container para despues llenarlo con nuestros datos
        containerProducts.innerHTML = "";
        var htmlData = "";
    /*recorro todos los elementos que estan en data o results. con [sourceData]accedo de forma dinamica a los datos de data y results */
        this[sourceData].forEach(product => {
            htmlData  = htmlData  + this.buildHtmlProduct(product); 
        });
        
        containerProducts.innerHTML = htmlData ;
    }
    /*funcion buscadora de productos */
    this.search = function(key) {
        this.results = [];
        this.data.forEach((product) => {
            if(product.title.toLowerCase().includes(key.toLowerCase())){
                this.results.push(product);
            }
        });
        return this.results;
    }

}

/*<p class="timeAvailable">${product.horario1 + " " +"/" + " " + product.horario2 + " " +"/" + " " + product.horario3}</p>
        <p class="price">${"USD"+  " " + product.dollar + " " +"/" + " " +"Real"+  " " +  product.real+ " " +"/" + " " + 
        "Euro"+  " " + product.euro + " " +"/" + " " + "Pesos"+  " " +  product.pesos}</p>
        
        
        <div class='dropdown'>
		<div class='title pointerCursor'>Elige un horario <i class="fa fa-angle-right"></i></div>
		
		<div class='menu pointerCursor hide'>
			<div class='option' id='option1'>${product.horario1}</div>
			<div class='option' id='option2'>${product.horario2}</div>
			<div class='option' id='option3'>${product.horario3}</div>
		</div>
	    </div>*/
