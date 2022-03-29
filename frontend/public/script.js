/*const express = require('express')

const path = require('path')

const app = express()

app.get('/', (request, response) => {

	response.sendFile(path.join(`${__dirname}/../frontend/index.html`))

})
app.use('/public', express.static(`${__dirname}/../frontend/public`))

app.listen(9000, () => {

console.log("http://127.0.0.1:9000")

})*/

const formComponent = 

    `<form id='form'>
        <input type="text" name="title">
        <input type="file" name="picture">
        <button>Send</button>
    </form>
    ` ;

function loadEvent() {

    const rootElement = document.getElementById('root')

    rootElement.insertAdjacentHTML('beforeend', formComponent)

    const formElement = document.getElementById('form')

    formElement.addEventListener('submit', e => {

        e.preventDefault();

        const formData = new FormData();

        formData.append('title', e.target.querySelector(`input[name="title"]`).value);

        formData.append('picture', e.target.querySelector(`input[name="picture"]`).files[0]);

        const fetchSettings = {
            method: 'POST',
            body: FormData
        }
    
        fetch('/', fetchSettings)

        .then(async data => {

            if ( data.status === 200 ) {
                const res = await data.json()

            e.target.outerHTML = `<img src="upload/${res.pictureName}">`
            
            console.dir(data)
            }
        })
        .catch( error => {

            e.target.outerHTML = 'error'

            console.dir(error)
        })

    });

}window.addEventListener('load', loadEvent)


