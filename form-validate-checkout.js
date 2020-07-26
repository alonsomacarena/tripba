$(document).ready(() => {
    $("#step2").hide();
    $("#resumen").hide();
    $('#step1Label').css('font-weight', 'bold');
    $("form[name='step1']").validate({
        rules: {
            apellido: {
                required: true,
            },
            nombre: {
                required: true,
            },
            emailCheckout:{
                required:true,
            },
            telefono:{
                required:true,
            }
        },
        messages: {
            apellido: {
                required: 'El campo apellido es obligatorio',
            },
            nombre: {
                required: 'El campo nombre es obligatorio',
            },
            emailCheckout:{
                required:"El campo email es obligatorio"
            },
            telefono:{
                required:"El campo telefono es obligatorio",
            }        
        },
        submitHandler: function(form) {
            $("#step1").slideUp("slow", function() {
                $("#step2").slideDown("slow", function(){
                    $('#step1Label').css('font-weight', 'normal');
                    $('#step2Label').css('font-weight', 'bold');
                })
            });                    
        }                
    });
    $("form[name='step2']").validate({
        rules: {
            metodopago: {
                required: true,
            },
            tarjetanombre:{
                required:true,
            },
            tarjetanumero:{
                required:true,
            },
            tarjetafecha:{
                required:true,
            },
            tarjetaseguridad:{
                required:true,
            }
        },
        messages: {            
        },
        submitHandler: function(form) {
            $("#step2").slideUp("slow", function() {
                $("#resumen").slideDown("slow", function(){
                    $('#step2Label').css('font-weight', 'normal');
                    $('#step3Label').css('font-weight', 'bold');
                    $('#resumeApellido').html($('input[name="apellido"]').val());
                    $('#resumeName').html($('input[name="nombre"]').val());
                    $('#resumeEmail').html($('input[name="emailCheckout"]').val());
                    $('#resumeTelefono').html($('input[name="telefono"]').val());
                    $('#resumeMetodoPago').html($('input[name="metodopago"]:checked').val());
                    $('#resumeNombreTitular').html($('input[name="tarjetanombre"]').val());
                    $('#resumeNumeroTarjeta').html($('input[name="tarjetanumero"]').val().replace(/\d{4}(?= \d{4})/g, "****"));
                    $('#resumeVencimiento').html($('input[name="tarjetafecha"]').val());

                })
            });                    
        }            
    });          
})