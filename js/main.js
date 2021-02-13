function obtenerDatos() {
    var fechaIni = document.getElementById('fecha1').value;
    var fechaFinal = document.getElementById('fecha2').value;

    var fecha1 = new Date(fechaIni).getFullYear() + 1;
    var fecha2 = new Date(fechaFinal).getFullYear() + 1;

    var fecha3 = new Date(fechaIni).getTime();
    var fecha4 = new Date(fechaFinal).getTime();

    var monto = document.getElementById('monto').value;
    var preaviso = document.getElementById('preaviso'),
        cesantia = document.getElementById('cesantia'),
        vacaciones = document.getElementById('vacaciones');

    var diff = (fecha2 - fecha1);
    var diff2 = ((fecha4 - fecha3) / (1000 * 60 * 60 * 24)) / 365;
    var diff3 = diff2 - diff;

    console.log(diff2);

    if (diff >= 0) {

        var prea = preavisoCrear(preaviso.checked, parseFloat(monto), Math.round(diff2));

        var vacac = vacacionesCrear(vacaciones.checked, parseFloat(monto), Math.round(diff2));

        if (fecha1 <= 1992) {

            var antes = cesanAnt(cesantia.checked, parseFloat(monto), Math.round((1992 - fecha1)));

            diff = (fecha2 - 1992) + diff3;

            var cesan = cesantiaCrear(cesantia.checked, parseFloat(monto), diff);

            console.log(diff);

        } else {

            antes = 0;
            var cesan = cesantiaCrear(cesantia.checked, parseFloat(monto), Math.round(diff2));
        }

        console.log('Tus prestaciones laborales son:' + Math.round(prea + cesan + vacac));

        document.getElementById('resp').innerHTML = 'Tus prestaciones laborales son: RD$' + Math.round(prea + cesan + vacac + antes).toLocaleString("en-US");

        document.getElementById('canPrea').innerHTML = Math.round(prea).toLocaleString("en-US");
        document.getElementById('canCesanAnt').innerHTML = Math.round(antes).toLocaleString("en-US");
        document.getElementById('canCesan').innerHTML = Math.round(cesan).toLocaleString("en-US");
        document.getElementById('canVacac').innerHTML = Math.round(vacac).toLocaleString("en-US");

    } else {

        document.getElementById('resp').innerHTML = 'Revisa las fechas introducidas';
    }

}

function preavisoCrear(resp, monto, tiempo) {

    var cantidad = 0;
    var anios = tiempo;

    if (resp == false) {

        if (anios >= 0.3 && anios <= 0.6) {
            cantidad = (monto / 23.83) * 7;
        } else if (anios >= 0.6 && anios <= 1.0) {
            cantidad = (monto / 23.83) * 14;
        } else if (anios >= 1.0) {
            cantidad = (monto / 23.83) * 28;
            document.getElementById('preaDias').innerHTML = 28;
        }
    }

    return cantidad;

}

function cesantiaCrear(resp, monto, tiempo) {
    var cantidad = 0;
    var anios = tiempo;

    if (resp == true) {

        if (anios >= 0.3 && anios <= 0.6) {
            cantidad = (monto / 23.83) * 6;
        } else if (anios >= 0.6 && anios <= 1.0) {
            cantidad = (monto / 23.83) * (13 * anios);
        } else if (anios >= 1.0 && anios <= 5.0) {
            cantidad = (monto / 23.83) * (21 * anios);
        } else if (anios >= 5) {
            cantidad = (monto / 23.83) * (23 * anios);
        }
    }
    return cantidad;
}

function vacacionesCrear(resp, monto, tiempo) {

    var cantidad = 0;

    var anio = tiempo;

    if (resp == false) {

        if (anio >= 1 && anio <= 5) {
            cantidad = (monto / 23.83) * 14;
        } else if (anio >= 5) {
            cantidad = (monto / 23.83) * 18;
        }

    }
    return cantidad;
}

function cesanAnt(resp, monto, tiempo) {

    var cantidad = 0;
    var anios = tiempo;

    if (resp == true) {

        if (anios >= 0.1 && anios <= 2) {
            cantidad = (monto / 23.83) * 30;
        } else if (anios >= 3) {
            cantidad = (monto / 23.83) * (30 + (15 * (anios - 2)));
        }
    }
    return cantidad;

}