//. restore.js

var cloudantlib = require( '@cloudant/cloudant' );
var fs = require( 'fs' );
var settings = require( './settings' );

var cloudant = cloudantlib( { account: settings.cloudant_username, password: settings.cloudant_password } );

if( process.argv.length >= 4 ){
  var cloudant_db = process.argv[2];
  var dumpfile = process.argv[3];

  cloudant.db.destroy( cloudant_db, function( err0, body0 ){
    cloudant.db.create( cloudant_db, function( err1, body1 ){
      var body2 = fs.readFileSync( dumpfile, 'utf8' );
      var docs = JSON.parse( body2 );
      var cdb = cloudant.db.use( cloudant_db );

      cdb.bulk( docs, function( err3, body3, header3 ){
        if( err3 ){ console.log( err3 ); } 
      });
    });
  });
}else{
  console.log( "$ node restore (dbname) (dumpfilename)" );
}

