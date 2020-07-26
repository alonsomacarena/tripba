$(document).ready(() => {
    $("form[name='contact']").validate({
        rules: {
            fullname:"required",
            emailContact: {
                required: true,
                emailContact: true
            },
            mensaje: {
                required: true,
            }
        },
        messages: {
            fullname: "Por favor ingrese su nombre completo",
            email: {
                required: 'El campo email es obligatorio',
                email: 'Ingrese un email valido'
            },
            mensaje: {
                required: 'El campo mensaje es obligatorio'
            }            
        },              
        submitHandler: function(form) {
            form.submit();
          }
        });
      });