var searchBoxInput;
var searchKey;
var searchResultLength;
var searchButton;
var formSearch;
var searchResume;
var products;
var product ;

//funcion buscadora
function getSearchBoxValue(event) {
  var searchBoxInputValue = searchBoxInput.value;
  var searchResult = products.search(searchBoxInputValue);

  if (searchBoxInputValue.trim() !== '') {
      setSearchKeyRender(searchBoxInputValue, searchResult.length);
      products.buildObjectsList ('products-container', 'results');
  }
}

function setSearchKeyRender(key, resultLength) {
  searchResultLength.innerHTML = resultLength;
  searchKey.innerHTML = key;
}

//evento que borre lo que el cliente escriba en el buscador mediante un boton cancelar
var btnCancel= document.getElementById("cancel-button");
btnCancel.addEventListener("click", function(event){
    searchBoxInput.value="";
});

//funcion agregar productos al carrito al hacer click en el boton agregar al carrito
function addToCart(id) {
  product = products.getById(id)[0];
  shoppingCart.add(product);
}

//funcion para eliminar productos del carrito al hacer click en boton X y cancelar
/*logro que se "eliminen" los productos/cuenta subtotal/cantidad pero si agrego un 
nuevo producto me vuelven a aparecer todos los anteriores*/
function removeFromCart(){
  var cartList= document.getElementById("cartList");
  var lenght= document.getElementById("cart-lenght");
  var subtotal= document.getElementById("subtotal-span");
  var subtotalContainer= document.getElementById("subtotal");
  var carrito = document.getElementById("carrito");
  var titleLenght= document.getElementById("title-lenght")
  carrito.removeChild(cartList);
  titleLenght.removeChild(lenght);
  subtotalContainer.removeChild(subtotal);
}

/*me gustaria hacer que la opcion seleccionada en el checkbox en cada producto se imprima en el carrito
con los demas valores de ese producto */

window.onload = function () {

	products = new Products();
	/*inicializo productos y le paso como parametro el objeto data*/
	products.initProducts(data);
	/*el 1°parametro  es donde se va a construir la lista y el 2°parametro es el source/fuente de los datos */
    products.buildObjectsList('products-container', 'data');

	shoppingCart = new ShoppingCart();
	//lleno el cart
	shoppingCart.populate();
  shoppingCart.buildCart("cart-container");

  //evento que hace click sobre boton buscar
  searchButton = document.getElementById("search-button");
  searchButton.disabled = true;
  searchButton.addEventListener("click", getSearchBoxValue);

  searchBoxInput = document.getElementById("search-box-input");
  searchBoxInput.addEventListener("input", function (event) {
      searchButton.disabled = (event.target.value.length <= 3);
  })

  searchKey = document.getElementById("search-key");
  searchResultLength = document.getElementById("search-result-length");
  
  //evento que busca al hacer enter
  formSearch = document.getElementById("form-search");
  formSearch.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!searchButton.disabled) {
          getSearchBoxValue();
      }
  });

  searchResume = document.getElementById("search-resume")

}
