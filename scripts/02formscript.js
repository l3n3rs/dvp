// Lösung mit anderen Methoden in 03formscript (Orientierung an Webkonferenz statt an Script)

(function init() {
    "use strict";

    const form = document.getElementById('missing-cat-form');
    const submit = document.querySelector("[type=submit]");
    const reset = document.querySelector("[type=reset]");
    const sightingInput = document.getElementById('sighting');

    // Setze das maximale Datum für die letzte Sichtung auf heute
    const today = new Date().toISOString().split('T')[0];
    sightingInput.setAttribute('max', today);

    submit.addEventListener("click", function (e) {
        e.preventDefault();
        clearMessages();
        validateForm();
        logFormData();
        if (form.checkValidity()) {
            console.log('Formular erfolgreich abgesendet');
            displayMessage("Alles richtig ausgefüllt. Danke!", "valid");
        }
    }, false);

    reset.addEventListener("click", function (e) {
        clearMessages();
        console.log('Formular zurückgesetzt');
    }, false);

    Array.from(form.elements).forEach(element => {
        element.addEventListener("input", function () {
            clearMessages();
            displayError(this);
            logFormData();
        }, false);
    });

    function validateForm() {
        Array.from(form.elements).forEach(element => {
            if (!element.checkValidity() && element.type !== "submit" && element.type !== "reset") {
                displayError(element);
            }
        });
    }

    function displayError(field) {
        const label = document.querySelector(`label[for="${field.id}"]`);
        const fieldName = label ? label.textContent : 'Unbekanntes Feld';

        if (field.validity.valueMissing) {
            displayMessage(`${fieldName} ist erforderlich.`, "invalid");
        } else if (field.validity.typeMismatch) {
            displayMessage(`Bitte geben Sie eine gültige ${field.type === 'email' ? 'E-Mail-Adresse' : 'Eingabe'} ein.`, "invalid");
        } else if (field.validity.tooShort) {
            displayMessage(`Bitte geben Sie mehr Zeichen ein.`, "invalid");
        } else if (field.validity.rangeUnderflow || field.validity.rangeOverflow) {
            displayMessage(`Der Wert für ${fieldName} ist ${field.validity.rangeUnderflow ? 'zu klein' : 'zu groß'}.`, "invalid");
        } else if (field.validity.patternMismatch) {
            displayMessage(`Bitte befolgen Sie das vorgegebene Format.`, "invalid");
        }
    }

    function displayMessage(message, type) {
        const messageElement = document.createElement("p");
        messageElement.textContent = message;
        messageElement.className = type;
        form.appendChild(messageElement);
    }

    function clearMessages() {
        const messages = form.querySelectorAll("p.invalid, p.valid");
        messages.forEach(message => message.remove());
    }



    function logFormData() {
        console.log("Formulardaten:");
        Array.from(form.elements).forEach(element => {
            if (element.name && element.type !== "submit" && element.type !== "reset") {
                console.log(`${element.name}: ${element.value}`);
            }
        });
    }


})();
