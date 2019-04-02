"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const restify = require("restify");
const server = restify.createServer({
    name: 'meat-api server',
    version: '1.0.0'
});
//parse de querys https para objetos
server.use(restify.plugins.queryParser());
server.get('/info', [
    (req, res, next) => {
        let error;
        //filtrando requisição para IE7
        if (req.userAgent() && req.userAgent().includes('MSIE 7.0')) {
            //res.status(400) //bad request
            //res.json({ message: 'Please, upgrade your browser!'})
            error = new Error();
            error.statusCode = 400;
            error.message = 'Please, upgrade your browser';
            return next(error);
        }
        return next();
    }, (req, res, next) => {
        // res.contentType = 'application/json'
        // res.status(400)
        // res.send({message: 'hello'})
        //setando o header da requisição de uma maneira mais tradicional
        // res.setHeader('Content-Type', 'application/json')
        /* na prática...
          // res.contentType = 'application/json'
          // res.send({message: ''})
        */
        res.json({
            browser: req.userAgent(),
            method: req.method,
            url: req.href(),
            path: req.path(),
            query: req.query //retornando os parâmetros da url
        });
        //na documentação do restify, se recomenda retornar o campo 'next' sempre no final da função para indicar que foi terminada a execução do método
        return next();
    }
]);
server.get('/', (req, res, next) => {
    res.send('Access the route /info pls :)');
});
server.listen(3000, () => {
    console.log('API is running on http://localhost:3000');
});
