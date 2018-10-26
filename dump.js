//. dump.js

var cloudantlib = require( '@cloudant/cloudant' );
var fs = require( 'fs' );
var settings = require( './settings' );

var cloudant = cloudantlib( { account: settings.cloudant_username, password: settings.cloudant_password } );

if( process.argv.length >= 4 ){
  var cloudant_db = process.argv[2];
  var dumpfile = process.argv[3];
  var cdb = cloudant.db.use( cloudant_db );
  var obj = { docs: [] };
  var params0 = {
    include_docs: true,
    attachments: true
  };
  cdb.list( params0, function( err0, body0 ){
    if( err0 ){
      console.log( err0 );
    }else{
      body0.rows.forEach( function( doc0 ){
        if( doc0.doc._attachments ){
          var attachments = doc0.doc._attachments;
          for( var attname in attachments ){
            delete doc0.doc._rev;
            delete doc0.doc._attachments[attname]['stub'];
            delete doc0.doc._attachments[attname]['revpos'];
            delete doc0.doc._attachments[attname]['digest'];
            delete doc0.doc._attachments[attname]['length'];
          }
        }else{
          delete doc0.doc._rev;
        }
        obj.docs.push( doc0.doc );
      });

      fs.writeFileSync( dumpfile, JSON.stringify( obj ) );
    }
  });
}else{
  console.log( "$ node dump (dbname) (dumpfilename)" );
}

