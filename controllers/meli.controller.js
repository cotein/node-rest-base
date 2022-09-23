const { response } = require('express');
const { Company } = require('../models');
const axios = require('axios').default;

const getMeliToken = async (req, res = response) => {
    
    const { code } = req.body;

    console.log("🚀 ~ file: meli.controller.js ~ line 7 ~ getMeliToken ~ ddd", code)

    const APP_ID = '8134297603737971';

    const CLIENT_SECRET = 'UOkOi9LKA4eGjguSqB074SLjthDRSF2g';

    const REDIRECT_URI = 'https://localhost:9000/meli/token';
    //const api = axios.create({ baseURL: 'https://www.api.mercadolibre.com' })
    try {
        const {data} = await axios.post('https://api.mercadolibre.com/oauth/token',{
            grant_type: 'authorization_code', 
            client_id: APP_ID,
            client_secret: CLIENT_SECRET,
            code : code,
            redirect_uri: 'https://localhost:9000/meli/token' 
        })
        
        if (data) {
            
        }
          
    console.log("🚀 ~ file: meli.controller.js ~ line 23 ~ getMeliToken ~ pp", data)
} catch (error) {
    console.log("🚀 ~ file: meli.controller.js ~ line 37} ~ getMeliToken ~ error", JSON.parse(error.response))
        console.log("🚀 ~ file: meli.controller.js ~ line 28 ~ getMeliToken ~ error", error)


        
    }
}

module.exports = {
    getMeliToken
}