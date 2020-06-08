//variables que voy a usar 
var viewDetails;
var addShoppingCart;
var keySearch;
var userName;
var userQuantity;
var userLanguage;
var goToFacebook;
var goToInstagram;
var goToTwitter;

// funcion info del cliente usando prompt
function clientInfo(){
  userLanguage = prompt("Elija el idioma en que desea realizar el tour");
  userQuantity = parseInt(prompt("Ingrese cantidad de personas que van a realizar el tour"));
  if (userQuantity > 0)
    console.log("Bienvenido a TripBA");
}

clientInfo();

//filtrar productos en buscador
var vehicles=["bicicleta", "bus","moto","hike"];

var toursVehicle=vehicles.filter((vehicles)=> vehicles ==="bicicleta");
          
console.log(toursVehicle); 


// Me gustaria hacer var Globales que llamen a servicios del valor del dolar, real y euro en tiempo real.
/*let DOLLARPRICE;
let EUROPRICE;
let REALPRICE;*/

//calcular precios en  dolar, real, euro 
function convertToBlueDollar(amount){
  var dollarPrice=125;
  return (amount / dollarPrice);
}

function convertToReal(amount){
  var realPrice=14;
  return (amount / realPrice);
}

function convertToEuro(amount){
  var euroPrice=146;
  return (amount / euroPrice);
}

var dollarPrice = convertToBlueDollar(10000);
var euroPrice=convertToEuro(10000);
var realPrice=convertToReal(10000);


console.log(dollarPrice.toFixed(2)+" "+"dollar");
console.log(euroPrice.toFixed(2)+" "+"euro");
console.log(realPrice.toFixed(2)+" "+"real");


//objeto de los productos=tours
function Tours(name,image,duracion,horario,price,id){
  this.name=name;
  this.image=image;
  this.duracion=duracion;
  this.horario=horario;
  this.price=price;
  this.id=id;
}

var toursList = [ new Tours ("Recoleta","recoleta.jpg","3 horas","de 10hrs a 13hrs", 10000, 4087),
new Tours("Caminito","caminito.jpg","2 horas y media","de 13hrs a 15.30hrs",10000,2286),
new Tours("Centro Porteño","centro.jpg","4 horas","de 10hrs a 14hrs",10000,1023),
new Tours("Palermo","palermo.jpg","3 horas","de 16hrs a 19hrs",10000,3896),
new Tours("San Telmo","santelmo.jpg","2 horas y media","de 14hrs a 16.30hrs",10000,1055),
new Tours("Puerto Madero + Costanera","puerto.jpg","3 horas","de 13.30hrs a 16.30hrs",10000,7730),
];

Tours();

/*console.log(toursList[0]);
console.log(toursList[1]);
console.log(toursList[2]);
console.log(toursList[3]);
console.log(toursList[4]);
console.log(toursList[5]);*/

//esqueleto shopping cart
function ShoppingCart() {
var cart = [];
 this.add = function(products) {
 cart.push(products);
}
 this.get = function() {
     return cart;
}
 this.getById = function(id) {
     var products = [];
     cart.forEach(function(currentProduct){
         if(currentProduct.id == id){
             products.push(currentProduct);
         }
     })
     return products;
 }
}

var myShoppingCart = new ShoppingCart();
myShoppingCart.add(toursList);

var contentShoppingCart = myShoppingCart.get();

contentShoppingCart.forEach(function(item,i){
  console.log(item [0]);
  console.log(item [1]);
  console.log(item [2]);
  console.log(item [3]);
  console.log(item [4]);
  console.log(item [5]);
 });
