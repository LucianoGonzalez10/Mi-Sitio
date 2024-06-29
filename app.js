emailjs.init("CFygvwo22STtWkxYW");

document.getElementById('downloadButton').addEventListener('click', function() {
    const link = document.createElement('a');
    link.href = 'Archivos\\Luciano-gonzalez-Marangoni-CV.pdf'; 
    link.download = 'Luciano-Gonzalez-CV.pdf'; 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');
    const submitButton = document.getElementById('submitButton');
    const formFields = ['nombre', 'apellido', 'email', 'mensaje'];

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function validateForm() {
        let isValid = true;
        formFields.forEach(field => {
            const input = document.getElementById(field);
            if (!input.value.trim()) {
                isValid = false;
                input.classList.add('is-invalid');
            } else {
                input.classList.remove('is-invalid');
            }
        });
        
        const emailInput = document.getElementById('email');
        if (!isValidEmail(emailInput.value)) {
            isValid = false;
            emailInput.classList.add('is-invalid');
        }

        return isValid;
    }

    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();

        if (!validateForm()) {
            alert('Por favor, completa todos los campos correctamente.');
            return;
        }

        submitButton.disabled = true;
        submitButton.innerHTML = 'Enviando...';

        const nombre = document.getElementById('nombre').value;
        const apellido = document.getElementById('apellido').value;
        const email = document.getElementById('email').value;
        const mensaje = document.getElementById('mensaje').value;

        console.log('Intentando enviar email con los siguientes datos:', {
            serviceID: 'service_kiwzt99',
            templateID: 'template_946teyd',
            params: {
                from_name: `${nombre} ${apellido}`,
                email: email,
                message: mensaje,
            }
        });

        emailjs.send('service_kiwzt99', 'template_946teyd', {
            from_name: `${nombre} ${apellido}`,
            email: email,
            message: mensaje,
        })
        .then(function(response) {
            console.log('Mensaje enviado correctamente', response.status, response.text);
            contactForm.reset();
        })
        .catch(function(error) {
            console.error('Error al enviar el mensaje', error);
            alert('Hubo un error al enviar el mensaje: ' + JSON.stringify(error));
        })
        .finally(function() {
            submitButton.disabled = false;
            submitButton.innerHTML = 'Enviar';
        });
    });

    formFields.forEach(field => {
        const input = document.getElementById(field);
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                if (field === 'mensaje') {
                    submitButton.click();
                } else {
                    const nextField = formFields[formFields.indexOf(field) + 1];
                    document.getElementById(nextField).focus();
                }
            }
        });
    });
});