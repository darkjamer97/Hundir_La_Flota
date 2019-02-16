function iniciarPartida(){  
    $('#inicio').hide();
    $('#zonaJuego').show();
    
    crearTablero();
    generarVidas();
    
    $('.casilla').click(() =>{
        if (comprobacion())
            comprobarGanador();
        else
            comprobarPerdedor();
    });
}

function crearTablero(){
    arrayTablero = new Array(columnas);

    for (var i = 0; i < filas; i++)
        arrayTablero[i] = new Array(filas);

    for (var i = 0; i < columnas; i++) 
        for (var j = 0; j < filas; j++) 
            arrayTablero[j][i] = Math.floor(Math.random() * 2);
        
    
    for (var z = 0; z < filas; z++)
        tableroHeader += `<th>${z}</th>`;

    $('table th:first').after(tableroHeader);

    for (var j = 0; j < columnas; j++) {
        tableroBody += `<tr><th>${j}</th>`;
        for (var i = 0; i < filas; i++) {
            tableroBody += `<td>
            <img id='${i}${j}' class='casilla' 
                onmouseover='entraCasilla(this)' 
                onmouseout='saleCasilla(this)' 
                onmousedown='mostrar(this)'
                onmouseup='ocultar(this)'
                src='img\\x.png'>
            </td>`;
        }
        tableroBody += '</tr>';
    }

    $('table tbody').append(tableroBody);
}

function generarVidas(){
    switch(nivel){
        case 1:
            vidas = 6;
            break;
        case 2:
            vidas = 4;
            break;
        case 3:
            vidas = 3;
            break;
    }
}

function mostrar(x) {
    var coordenada = x.id;
    var mx = coordenada.charAt(0);
    var my = coordenada.charAt(1);

    if (arrayTablero[mx][my] == 1) {
        arrayTablero[mx][my] = 2;
        x.src = 'img/barco.png';
        $('#info p').html(`Barcos ${devolverNumeroBarcos()} restantes<br>`);
    }

    if (arrayTablero[mx][my] == 0) {
        x.src = 'img/agua.png';
        vidas--;
    }

    $('#intentos p').html(`Te quedan ${vidas} vidas`);
}

function ocultar(x) {
    var coordenada = x.id;
    var mx = coordenada.charAt(0);
    var my = coordenada.charAt(1);
    var divInfo = $('#info p');

    if (arrayTablero[mx][my] == 0) {
        switch (nivel) {
            case 1:
                x.src = 'img/agua.png';
                break;
            case 2:
                x.src = 'img/x.png';
                divInfo.append(`Agua en ${mx}-${my}<br>`);
                break;
            case 3:
                x.src = 'img/x.png';
                divInfo.html('¡¡Agua!!');
                break;
        }
    }
}

function comprobarPerdedor(){
    if (vidas == 0) {
        $('#zonaJuego').hide();
        $('#finPartida').show();
        $('#ganador').hide();
        $('#perdedor p').html(`Lo siento ${nombre}, no has ganado la partida`);
        $('#restartGame').click(() =>{
            location.href = 'index.html';
        });
    }
}

function comprobarGanador(){
    if (comprobacion()) {
        $('#zonaJuego').hide();
        $('#finPartida').show();
        $('#perdedor').hide();
        $('#ganador p').html(`Enhorabuena ${nombre}, has ganado la partida`);
        $('#restartGame').click(() =>{
            location.href = 'index.html';
        });
    }
}

function entraCasilla(x) {
    x.style.opacity = '0.5';
}

function saleCasilla(x){
    x.style.opacity = '1';
}

function devolverNumeroBarcos(){
    var numeroBarcos = 0;
    for (var i = 0; i< columnas; i++)
        for (var j = 0; j < filas; j++)
            if (arrayTablero[i][j] == 1)
                numeroBarcos++

    return numeroBarcos;
}

function comprobacion() {
    final = 1;
    for (var j = 0; j < columnas; j++) 
        for (var i = 0; i < filas; i++) 
            if (arrayTablero[i][j] == 1)
                final = 0;
        
    return final;
}