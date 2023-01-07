require( 'dotenv' ).config();

const express = require( 'express' );

const cors = require( 'cors' );
const { connect } = require( './db/init' );

const app = express();

// app.use( cors({
//     origin: 'http://localhost:8888',
// }));
// app.use( cors({
//     origin: process.env.FRONTEND_URL,
// }));
app.use( cors({
    origin: '*'
}));


app.use( express.json() );

app.use( express.urlencoded( { extended: false } ) );

app.use( '/auth', require( './routes/auth.routes' ) );
app.use( '/watchlist', require('./routes/watchlist.routes') );

app.use( require( './middleware/errors' ).resourceNotFound );
app.use( require( './middleware/errors' ).errorHandler );

const PORT = process.env.SERVER_PORT || 9000;


connect()
    .then(() => {
        app.listen( PORT, () => {
            console.log( `server started on - http://localhost:${PORT}` );
        });
    })
    .catch(error => {
        process.exit( 1 );
});