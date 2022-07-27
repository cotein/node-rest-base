const express = require('express');
const cors = require('cors')
const {dbConnection} = require('../database/config');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT
        this.authPath = '/api/auth';
        this.usersPath = '/api/users';
        this.middlewares()
        this.routes();
    }

    routes(){
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.usersPath, require('../routes/users'));
    }

    middlewares(){

        this.app.use(cors());

        //parseo de json
        this.app.use(express.json());

        //db connection

        this.dataBaseConnection();
        //Directorio Público
        this.app.use(express.static('public'));
    }

    async dataBaseConnection(){
        await dbConnection()
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Servidor corriendo en', this.port)
        })
    }
}

module.exports = Server;