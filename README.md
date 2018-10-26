# Cloudant DB Dump/Restore tool

## Overview

- Command Line tool which dump/restore Cloudant( http://cloudant.com/ ) database into/from local file.

- This dump tool backup all documents with attachments. And restore tool recreate them into specified database as new one.


## Requirement

- You need Node.js and npm installed to run this tool.

- You need Cloudant DB instance. You need to prepare your Username & Password which can be accessed to you Cloudant DB instance.


## Install & Settings

- Clone/Download this tool: 

    - $ git clone https://github.com/dotnsf/cdbtool

- Edit settings.js with your Cloudant Username & Password.

- Run "npm install" to install required Node.js middlewares.

    - This tool need "cloudant" middleware. See for details: https://github.com/cloudant-labs/cloudant-nano


## How to use

### Dump

- Run following command:

    - $ node dump (dbname) (dumpfilename)

        - (dbname): Cloudant database name which to be dumped.

        - (dumpfilename): Local file name which to be created as dumped data.

### Restore

- Run following command:

    - $ node restore (dbname) (dumpfilename)

        - (dbname): Cloudant database name which to be newly created as restored database.

        - (dumpfilename): Local file name which was created in above dump command.

- If you specify existing database as restore db, that database would be erased first, and restored as newly created one.


## Licensing

This code is licensed under MIT.


## Copyright

2017-2018 K.Kimura @ Juge.Me all rights reserved.

