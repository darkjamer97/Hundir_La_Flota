var nombre,columnas,filas,vidas,nivel,tableroHeader,tableroBody,nivel,arrayTablero,final;

$(document).ready(function(){
    $("#zonaJuego").hide();
    $("#finPartida").hide();
    
    $('#start').click(() =>{
        nombre = $('#nombre').val().trim();
        columnas = parseInt($('#columnas').val());
        filas = parseInt($('#filas').val());
        nivel = parseInt($('#dificultad').val());

        if (nombre == null || nombre == ""){
            $('#alertNombre').show();
            $('#alertNombre span').html('Se usará como nombre Usuario');
            nombre = "Usuario";
        }

        if (isNaN(columnas) || columnas == 0 || columnas > 8){
            $('#alertColum').show();
            $('#alertColum span').html('Se usarán por defecto 4 columnas');
            columnas = 4;
        }
            
        if (isNaN(filas) || filas == 0 || filas >8){
            $('#alertFilas').show();
            $('#alertFilas span').html('Se usarán por defecto 4 columnas');
            filas = 4;
        }            
        
        $('#inicioPartida').show();
        $('#inicioPartida span').html('la partida comenzará en bréve');

        setTimeout(() => {
            iniciarPartida();
        },5000);        
    });
});