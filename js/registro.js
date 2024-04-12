document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.querySelector('#formulario')
    const inputs = document.querySelectorAll('#formulario input');
    const btnRegistro = document.querySelector('.registrarme');
    const sppiner = document.querySelector('#sppiner')

    const campos = {
        nombre: '',
        Apellido: '',
        email: '',
        telefono: '',
        Contraseña: '',
        ContraseñaCON: '',
        politicas: '',
    }

    //eventos
    inputs.forEach(input => {
        input.addEventListener('keyup', validacion);
        input.addEventListener('blur', validacion);
    })

    formulario.addEventListener('submit', enviarFormulario);

    politicas.addEventListener('click', function() {
        campos['politicas'] = politicas.checked;
        comprobarCampos();
    });

    function enviarFormulario(e) {
        e.preventDefault();
    
        const politicasValidas = campos['politicas'];
        const camposCompletos = Object.values(campos).every(value => value !== '');
    
        if (camposCompletos && politicasValidas) {
            sppiner.classList.add('sppiner');
            sppiner.classList.remove('sppinerno');
    
            setTimeout(() => {
                sppiner.classList.remove('sppiner');
                sppiner.classList.add('sppinerno');
    
                campos.nombre = '';
                campos.Apellido = '';
                campos.email = '';
                campos.telefono = '';
                campos.Contraseña = '';
                campos.ContraseñaCON = '';
                campos.politicas = '';
    
                formulario.reset();
                comprobarCampos();
    
                const alertaExito = document.createElement('P');
                alertaExito.classList.add('registro-valido');
                alertaExito.textContent = 'Su registro ha quedado exitosamente'
    
                formulario.appendChild(alertaExito);
    
                setTimeout(() => {
                    alertaExito.remove();
                    window.location.href = 'index.html'
                }, 3000)
            }, 3000)
        }
    }

    function validacion(e){
        const input = e.target;
        if(e.target.value.trim() === '') {
            mostrarAlertas('* Este campo es obligatiorio', e.target.parentElement);
            campos[e.target.id] = ''
            comprobarCampos();
            return;
        }else{
        }

        if(e.target.id === 'email' && !validarEmail(e.target.value)){
            mostrarAlertas('*El Email no es valido', e.target.parentElement);
            campos[e.target.id] = ''
            comprobarCampos();
            return;
        };

        if(e.target.id === 'Contraseña' && !validarContraseña(e.target.value)){
            mostrarAlertas('*Debe ser de 4 a 6 digitos', e.target.parentElement);
            campos[e.target.id] = ''
            comprobarCampos();
            return;
        };

        if(e.target.id === 'ContraseñaCON' && !validarCon(e.target.value)){
            mostrarAlertas('*Ambas contraseñas deben ser iguales', e.target.parentElement);
            campos[e.target.id] = ''
            comprobarCampos();
            return;
        };

        limpiarAlerta(e.target.parentElement);

        campos[e.target.id] = e.target.value.trim().toLowerCase();
        
        comprobarCampos();
    }

function mostrarAlertas(mensaje, referencia) {
        const repeticion = referencia.querySelector('.campo-incorrecto');
        if(repeticion){
            repeticion.remove();
        } 
        const obligatorio = document.createElement('p');
            obligatorio.textContent = mensaje;
            obligatorio.classList.add('campo-incorrecto');
            referencia.appendChild(obligatorio);


        const iconoIncorrecto = referencia.querySelector('.incorrecto');
        iconoIncorrecto.style.visibility = 'visible';
        referencia.querySelector('input').classList.add('i-incorrecto');
        
}

function limpiarAlerta(referencia){
    const repeticion = referencia.querySelector('.campo-incorrecto');
        if(repeticion){
            repeticion.remove();
            referencia.querySelector('.incorrecto').style.visibility = 'hidden';
            referencia.querySelector('input').classList.remove('i-incorrecto');
        }
            
        }

    function validarEmail(email){
            const errorEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
            const resultado = errorEmail.test(email);
            return resultado;
        }

    function validarContraseña(Contraseña){
            const errorcontraseña = /^.{4,12}$/;
            const resultado = errorcontraseña.test(Contraseña);
            return resultado;
        }

    function validarCon(ContraseñaCON){
            const errorCon = /^.{4,12}$/;
            const resultado = errorCon.test(ContraseñaCON);
            return resultado;
        }

    function comprobarCampos(){ 
        const politicasValidas = campos['politicas'];
        const camposCompletos = Object.values(campos).every(value => value !== '');
        if (camposCompletos && politicasValidas) {
            btnRegistro.classList.add('activar');
        } else {
            btnRegistro.classList.remove('activar');
        }
    }

});