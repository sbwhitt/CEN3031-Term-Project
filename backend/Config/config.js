//This file holds any configuration variables we may need 
//'config.js' is usually ignored by git to protect sensitive information, such as your database's username and password


module.exports = {
    db: {
      uri: 'mongodb+srv://ufsapa-db:ufsapa-backend@cluster0-dhfy9.mongodb.net/test?retryWrites=true', //place the URI of your mongo database here.
    },
    port: process.env.PORT||8080,
    secret: 'secret',
  };
  
  /* Now go to the JSONtoMongo.js file and include this file as a variable named 'config' with a require() */