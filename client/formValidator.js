
export class FormValidator {
    constructor(form) {
        this.form = form;
        this.validators = [];
        this.errors = [];

        this.form.addEventListener('submit', (event) => this.onSubmit(event));
    }

    addValidator(validator) {
        this.validators.push({
            // spread de validator,
            ...validator,
            field: this.form.elements[validator.name]
        })
    }

    validate(){

        this.validators.forEach(validator => {


            if (this.errors.includes(validator)){
                return;
            } else if (!validator.method(validator.field)){

                this.errors.push(validator);
            }
        });

        return this.errors.length === 0;

    }

    onSubmit(event) {
        this.resetSummary();
        this.removeInlineErrors();


        if (!this.validate()){
            event.preventDefault();
            event.stopImmediatePropagation();
            //this.showSummary();
            this.showInlineErrors();
        }
    }

    createInlineError(error) {

        const span = document.createElement('span');

        span.className = 'field-error';
        span.innerText = error.message;
        span.id = `${error.name}-error`;

        return span;
    }

    showInlineErrors() {

        this.errors.forEach(i => {
            const error = this.createInlineError(i);

            if (i.field instanceof Node){


                i.field.classList.add("invalid");
                i.field.setAttribute('aria-invalid', 'true');
                i.field.labels[0].appendChild(error);
            } else if (i.field instanceof NodeList){
                i.field.forEach(node => {
                    node.classList.add("invalid");
                    node.setAttribute('aria-invalid', 'true');
                    node.setAttribute('aria-describedby', error.id);
                })

                const fieldset = i.field[0].closest('fieldset');
                const legend = fieldset.querySelector('legend');

                if (legend){
                    legend.appendChild(error);
                }
            }
        });
    }

    removeInlineErrors(){
        // zoek en verwijder alle elementen **in het formulier**
        // met de class `.field-error`
        this.form.querySelectorAll('.field-error')
            .forEach(element => element.remove());

        this.form.querySelectorAll('.invalid')
            .forEach(el => {
                el.removeAttribute('aria-invalid');
                el.removeAttribute('aria-describedby');
                el.classList.remove('invalid');
            });
        this.errors = [];
    }

    createSummary(error) {

        const li = document.createElement('li');

        li.className = 'field-error';
        li.innerText = error.message;
        li.id = `${error.name}-error`;

        return li;
    }

    showSummary() {

        this.errors.forEach(error => {
            const li = this.createSummary(error);
            li.innerText = `!!!${li.innerText}!!!`
            const summary = document.querySelector('.errorSummary ul');
            summary.appendChild(li);
        });

    }

    resetSummary() {

    }



}
