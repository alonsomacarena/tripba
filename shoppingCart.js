function ShoppingCart() {
    
    this.cart = [];
/*lleno el cart con los datos del localStorage */
    this.populate = function() {
        /*es un if: si tengo un valor en localStorage lo tomo sino hago un array vacio */
        this.cart = (localStorage.getItem('cart')) ? JSON.parse(localStorage.getItem('cart')) : [];
    }
/*funcion para agregar elementos al carrito y lo guardo en sessionStorage como string */
    this.add = function(item) {
        this.cart.push(item);
        sessionStorage.setItem('cart', JSON.stringify(this.cart));
        //recibe el lugar donde quiero imprimir el carrito
        this.buildCart('cart-container');
    };
    this.get = function() {
        return this.cart;
    };

    //suma precios de productos en el carrito
    this.sumPrices = function(){
        var sum = 0;
    	for (var i = 0; i < this.cart.length; i++) {
			sum += (this.cart[i].price)
        }
        return sum;
    };

    //devuelve lista de elementos que van a ir en el cart
    this.buildList = function() {
        var htmlData = '';
        this.cart.forEach(product => {
            htmlData = htmlData + `
            <div class="container-list-cart">
            <img src="${product.img}" width="35%">
            <li class="list-cart">
            <div class="title-cart">${product.title}</div>
            </br>
            <div class="price-cart">$ ${product.price}</div>     
            </li>
            </div>
            `;
        });
        return htmlData;
    }
    //imprime el carrito idem productos en html
    this.buildCart = function(containerId) {
        var containerCart = document.getElementById(containerId);
        containerCart.innerHTML = "";
        var htmlData = `
            <div id="carrito" class="cart">
            <button class="remove" onclick="removeFromCart()" >X</button>
            <h5 id="title-lenght">Carrito de compras<span id="cart-lenght">(${this.cart.length})</span></h5>     
            <ul id="cartList" class="cart-list">  
            ${this.buildList()}  
            </ul>
            <p id="subtotal">Subtotal : <span id="subtotal-span">$ ${this.sumPrices()}</span></p>
            <div class="btnCart">
                <button type="button" id="cancelButton" class="btnCancel" onclick="removeFromCart()">Cancelar</button>
                <button type="button" class="btnShop">Comprar</button>
            </div>
            </div> 
        `
        containerCart.innerHTML = htmlData;
    };
}


