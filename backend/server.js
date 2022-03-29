/*const http = require('http');
const fs = require('fs');
const path = require('path');

const serverFun= (req, res) => {

	const errorHTML = `nem jó`;
    
	let filePath = path.resolve(__dirname + '/../frontend' + req.url);


    let filePath = path.resolve(`${__dirname}/../frontend${req.url}`);

	fs.access(filePath, fs.constants.R_OK, (err) => {
	if(err){
		res.statusCode = 404;
		res.end(errorHTML);
	}else{
		if(fs.statSync(filePath).isDirectory()) {
			filePath += '/index.html';
		}
		fs.readFile(filePath, (err, data) => {
			if(err) {
				res.statusCode = 500;
				res.end(errorHTML);
			} else {
				console.log('Index HTML rendben van')
				res.end(data);
			}
		});
	}
	});
}

const server = http.createServer(serverFun);

const port = 9000
const ip = "127.0.0.1"

const listenFun = () => {
    const addr = server.address();
		console.log(`http://${addr.address}:${addr.port}`);
		console.log(`Ne add fel!`)

	
};
server.listen(port, ip, listenFun)*/

/*const express = require('express')

const path = require('path')

const app = express()

app.get('/', (request, response) => {

	response.sendFile(path.join(`${__dirname}/../frontend/index.html`))

})
app.use('/pub', express.static(`${__dirname}/../frontend/pub`))

app.listen(9000, () => {

console.log("http://127.0.0.1:9000")

})

const express = require("express");
const { appendFile } = require("fs");
const path = require("path");
const app = express();

function getFunction(request, response){
    response.sendFile(path.join(`${__dirname}/../frontend/index.html`));
}

app.get("/", getFunction);
app.use("/pub", express.static(`${__dirname}/../frontend/public`));

const port = 9000;
const ipAddress = `http://127.0.0.1:${port}`;
app.listen(port, () => {
    console.log(ipAddress)
});*/

/*const { response } = require("express");
const express = require("express");

const { appendFile } = require("fs");

const path = require("path");

const app = express(); // express is egy föggvény és ez lefut, és objektum jön vissza

function getFunction(request, response){
    response.sendFile(path.join(`${__dirname}/../frontend/index.html`));
}

app.get("/", getFunction);

app.use("/public", express.static(`${__dirname}/../frontend/public`));


let jsonData = [];

try {
	let data = fs.readFileSync(`${datalocation}data.json`, error => {

		if (error) {
			console.log(error)
		}
	});
	jsonData = JSON.parse(data);

} catch (error) {

	fs.writeFile(`${dataLocation}data.json`, JSON.stringify(jsonData), (error) => {
        if (error) {
            console.log(error);
        }
})

const upload = path.join(`${__dirname}/../frontend/upload/`);

app.post('/', (req, res) => {

//upload image
	const picture = req.files.picture;

	const answer = {}

	if ( picture ) {

		console.log(picture)

		
		picture.mv(`${upload}${picture.name}`)
	}
	answer.pictureName = `${picture.name}`

	res.send('Fasza')

	//upload data from form

	const formData = req.body;

	formData.image_name = picture.name;

	jsonData.push(formData)

	fs.writeFile(`${dataLocation}data.json`, JSON.stringify(jsonData), (error) => {

		if (error) {

			console.log(error)
		}

	})

		res.send('Done')

})
	const port = 9000;

	const ipAddress = `http://127.0.0.1:${port}`

	app.listen(port, () => {

		console.log(ipAddress)

});*/

const express = require("express");

const fileUpload = require("express-fileupload");

const fs = require("fs");

const path = require("path");

const app = express();

const dataLocation = path.join(`${__dirname}/../frontend/`);



function getFunction(req, res){

    res.sendFile(path.join(`${__dirname}/../frontend/index.html`));

}

app.use(fileUpload());

app.use("/upload", express.static(`${__dirname}/../frontend/upload`));

app.use("/public", express.static(`${__dirname}/../frontend/public`));

app.get("/", getFunction);

// If there is a data.json, read the data from the file, if not, use an empty Array
let jsonData = [];

try {
    let data = fs.readFileSync(`${dataLocation}data.json`, error => {

        if (error) {

            console.log(error);
        }
    });
    jsonData = JSON.parse(data);

} catch (error) {

    fs.writeFile(`${dataLocation}data.json`, JSON.stringify(jsonData), (error) => {

        if (error) {

            console.log(error);

        }
    });
}

const uploads = path.join(`${__dirname}/../frontend/upload/`);

app.post("/", (req, res) => {
    // Upload image
    const picture = req.files.picture;

	const answer = {};

    if (picture) {

        console.dir(picture);

        picture.mv(uploads + picture.name, error => {

            return res.status(500).send(error);

        });
    }

	answer.pictureName = picture.name;

    // Upload data from form
    const formData = req.body;

    formData.image_name = picture.name;

    jsonData.push(formData);

    fs.writeFile(`${dataLocation}data.json`, JSON.stringify(jsonData), (error) => {
        if (error) {

            console.log(error);
        }
    });
    res.send("Done");
});

const port = 9000;

const ipAddress = `http://127.0.0.1:${port}`;

app.listen(port, () => {

    console.log(ipAddress)

});