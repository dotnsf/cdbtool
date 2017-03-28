//. dump.js

var cloudantlib = require( 'cloudant' );
var fs = require( 'fs' );
var settings = require( './settings' );

var cloudant = cloudantlib( { account: settings.cloudant_username, password: settings.cloudant_password } );

if( process.argv.length >= 4 ){
  var cloudant_db = process.argv[2];
  var dumpfile = process.argv[3];
  fs.writeFileSync( dumpfile, "[" );
  var cdb = cloudant.db.use( cloudant_db );
  cdb.list( function( err0, body0 ){
    if( !err0 ){
      var n = body0.rows.length;
      var i = 0;
      body0.rows.forEach( function( doc0 ){
        var id = doc0.id;
        cdb.get( id, function( err1, body1 ){
          if( err1 ){
            i ++;
            if( i == n ){
              fs.appendFileSync( dumpfile, "]" );
            }
          }else{
            if( body1._attachments ){
              var attachments = body1._attachments;
              for( var attname in attachments ){
                cdb.attachment.get( id, attname, function( err2, body2 ){
                  if( err2 ){
                    i ++;
                    if( i == n ){
                      fs.appendFileSync( dumpfile, "]" );
                    }
                  }else{
                    body1._attachments[attname]['data'] = body2.toString( 'base64' );

                    //. 不要な情報を除去
                    delete body1._rev;
                    delete body1._attachments[attname]['stub'];
                    delete body1._attachments[attname]['revpos'];
                    delete body1._attachments[attname]['digest'];
                    delete body1._attachments[attname]['length'];

                    //console.log( body1 );
                    fs.appendFileSync( dumpfile, JSON.stringify( body1 ) );
                    i ++;
                    if( i == n ){
                      fs.appendFileSync( dumpfile, "]" );
                    }else{
                      fs.appendFileSync( dumpfile, "," );
                    }
                  }
                });
              }
            }else{
              //. 不要な情報を除去
              delete body1._rev;

              //console.log( body1 );
              fs.appendFileSync( dumpfile, JSON.stringify( body1 ) );
              i ++;
              if( i == n ){
                fs.appendFileSync( dumpfile, "]" );
              }else{
                fs.appendFileSync( dumpfile, "," );
              }
            }
          }
        });
      });
    }
  });
}else{
  console.log( "$ node dump (dbname) (dumpfilename)" );
}

