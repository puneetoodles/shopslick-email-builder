/*jshint esversion: 6 */
const connect = require('connect')
const connectRoute = require('connect-route')
const serveStatic = require('serve-static')
const mjml = require('mjml')
const app = connect()

const processPost = (request, response, callback) => {
    let queryData = "";
    if (typeof callback !== 'function') return null;

    if (request.method == 'POST') {
        request.on('data', function (data) {
            queryData += data;
            if (queryData.length > 1e6) {
                queryData = "";
                response.writeHead(413, {
                    'Content-Type': 'text/plain'
                }).end();
                request.connection.destroy();
            }
        });

        request.on('end', function () {
            callback(JSON.parse(queryData));
        });

    } else {
        response.writeHead(405, {
            'Content-Type': 'text/plain'
        });
        response.end();
    }
}

app.use(connectRoute(router => {
    router.post('/compile', (req, res, next) => {
        processPost(req, res, function (email) {
            const responsiveHtml = mjml.mjml2html(email)
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify(responsiveHtml));
        });
    })
}))

let port = process.env.PORT || process.argv[2] || 4000;
let project = process.env.NODE_ENV == 'production' ? require('./app/config.js').buildFolder : './app';

app.use(serveStatic(project)).listen(port, function () {
    console.log('Server running on port %s.', port);
});