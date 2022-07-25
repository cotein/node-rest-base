const express = require('express');
const cors = require('cors')
class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT
        this.usersPath = '/api/users';
        this.middlewares()
        this.routes();
    }

    routes(){
        this.app.use(this.usersPath, require('../routes/users'));
    }

    middlewares(){

        this.app.use(cors());

        //parseo de json
        this.app.use(express.json());
        
        //Directorio Público
        this.app.use(express.static('public'));
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Servidor corriendo en', this.port)
        })
    }
}

module.exports = Server;