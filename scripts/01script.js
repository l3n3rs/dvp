(function init() {
    "use strict";

    // Zugriff auf Elemente mit verschiedenen Methoden (index.html und form.html)
    let header = document.querySelector('header');
    let navItems = document.getElementsByTagName('li');
    let main = document.getElementById('main');
    let sections = document.getElementsByClassName('einleitung');
    let table = document.querySelector('table');
    let images = document.querySelectorAll('img');
    let authorMeta = document.querySelector('meta[name="author"]');

    // Anzeige der gefundenen Elemente (index.html und form.html)
    console.log("Header:", header);
    console.log("Nav Items:", navItems);
    console.log("Main Element:", main);
    console.log("Einleitung Sections:", sections);
    console.log("Table:", table);
    console.log("Images:", images);
    if (authorMeta) {
        console.log("Author Meta:", authorMeta.content);
    } else {
        console.log("Author Meta nicht gefunden");
    }

    // Verwenden von getElementsByClassName (form.html)
    const fieldsetContainers = document.getElementsByClassName('fieldset-container');
    console.log(`Anzahl der Fieldset-Container: ${fieldsetContainers.length}`);
    for (let i = 0; i < fieldsetContainers.length; i++) {
        console.log(`Fieldset-Container ${i + 1}: ${fieldsetContainers[i].innerHTML}`);
    }

    // Event-Listener für Klicks auf Nav-Items (index.html)
    for (let item of navItems) {
        item.addEventListener('click', function (event) {
            console.log("Nav Item geklickt:", event.target.textContent);
        });
    }

    // Event-Listener für Mouseover auf Bildern (index.html und form.html)
    for (let img of images) {
        img.addEventListener('mouseover', function (event) {
            console.log("Mouseover auf Bild mit alt-Text:", event.target.alt);
        });
    }

    // Event-Listener für Formularlink (index.html)
    let formLink = document.querySelector('a[href="form.html"]');
    if (formLink) {
        formLink.addEventListener('click', function (event) {
            console.log("Formularlink geklickt:", event.target.href);
        });
    }

    // Protokollieren des Zurücksetzens des Formulars (form.html)
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('reset', (event) => {
            console.log('Formular zurückgesetzt');
        });

        // Weiteres Beispiel: Event-Listener für das Hervorheben bei richtigen/falschen Eingaben (form.html)
        const inputs = form.querySelectorAll('input, textarea');

        inputs.forEach(input => {
            input.addEventListener('input', () => {
                if (input.checkValidity()) {
                    input.classList.add('valid');
                    input.classList.remove('invalid');
                } else {
                    input.classList.add('invalid');
                    input.classList.remove('valid');
                }
            });
        });
    }

    // Event-Listener für Mouseover auf Absätzen (index.html und form.html)
    let paragraphs = document.querySelectorAll('p');
    for (let p of paragraphs) {
        p.addEventListener('mouseover', (event) => {
            event.target.classList.add('highlight');
        });
        p.addEventListener('mouseout', (event) => {
            event.target.classList.remove('highlight');
        });
    }

    // Event-Listener für Klick auf Bilder (neues Bild anzeigen - index.html)

    // Definiere Arrays mit Pfaden zu Bildern und Bildbeschreibungen
    const imagePaths = [
        "pics/KatzeHund.jpg",
        "pics/HundKatze.jpg",
        "pics/HundLiebtKatze.jpg",
        "pics/KatzeliebtHund.jpg"
    ];

    const imageTexts = [
        "Katze vs.Hund",
        "Hund vs. Katze",
        "Hund <3 Katze",
        "Katze <3 Hund"
    ];

    for (let img of images) {
        img.addEventListener('click', function (event) {
            // Neues zufälliges Bild auswählen
            // Math.random(): generiert zufällige Dezimalzahl im Bereich von 0 (inklusive) bis 1 (exklusive)
            // Multiplikation von Math.random() mit der Länge des Arrays (imagePaths.length) generiert zufällige Dezimalzahl im Bereich von 0 (inklusive) bis zur Länge des Arrays (exklusive)
            // Math.floor() wird verwendet, um die Zahl abzurunden und dann auf den entsprechenden Array-Index zugreifen zu können
            // Basierend auf: https://wiki.selfhtml.org/wiki/JavaScript/Tutorials/Zufallszahlen

            const randomIndex = Math.floor(Math.random() * imagePaths.length);
            event.target.src = imagePaths[randomIndex];

            // Alte Bildbeschriftung (figcaption) entfernen, falls vorhanden
            const oldCaption = event.target.parentNode.querySelector('.image-caption');
            if (oldCaption) {
                oldCaption.remove();
            }

            // Neue figcaption 
            // neues Element für die Bildbeschriftung erstellen - an sich müsste man auch den alt-Text aktualisieren
            const newCaption = document.createElement('figcaption');
            newCaption.className = 'image-caption';
            newCaption.textContent = imageTexts[randomIndex];
            // neue Bildbeschriftung dem übergeordneten Element des angeklickten Bildes zufügen
            event.target.parentNode.appendChild(newCaption);
        });
    }


})();