(function init() {
    "use strict";

    const form = document.forms[0];
    console.log(form);

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        let formData = new FormData(form);
        let formdataObj = {};

        for (let [key, value] of formData.entries()) {
            if (formdataObj[key]) {
                if (Array.isArray(formdataObj[key])) {
                    formdataObj[key].push(value);
                } else {
                    formdataObj[key] = [formdataObj[key], value];
                }
            } else {
                formdataObj[key] = value;
            }
        }

        let jsonFormData = JSON.stringify(formdataObj);

        console.log(jsonFormData);
        console.log(formdataObj);

    }, false);

})();
