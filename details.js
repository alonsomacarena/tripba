

var details=[];

function showDetails(products, index) {
	details.push(products[index]);
	console.log(details);
    $("#details-container").modal(renderDetails(products,index));
};
function closeDetails(products,index){
    details=[];
}
/*funcion render Detalles */
function renderDetails(products, index){
    detailsContainer.empty();
        details.forEach(function(product,i){
            detailsContainer.append(`
            <div class="modal-dialog modal-xl modal-dialog-centered" role="document">
            <div class="modal-content">
            <img src="${product.imgdetalle}" class="imageTourDetails col-lg-4 col-md-10">
            <article class="tourCardsDetails col-lg-7 col-md-12" >
            <div class="container-title-close col-md-12">
            <h4 class="tourTitleDetails">${product.title}</h4>
            <button type="button" class="btnCloseDetalle" href="#" data-dismiss="modal" aria-hidden="true">X</button>
            </div>
            <img src="${product.icon}"  class="icon-tour col-sm-7">
			<p class="text-details">${product.details}</p>
        </article>
        </div>
        </div>        
        `)});
//boton para cerrar detalles y volver a pagina con todos los productos
btnCloseDetalle=$(".btnCloseDetalle")
	btnCloseDetalle.click(function(event){
		closeDetails()
    });
};
