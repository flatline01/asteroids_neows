
var config = {};
const chalk = require("chalk");


dbHost = process.env.RDS_HOSTNAME;
dbUser = process.env.RDS_USERNAME;
dbPass = process.env.RDS_PASSWORD;
dbName = process.env.RDS_DBNAME;
var dbdebug = false;

if (!process.env.NODE_ENV || process.env.NODE_ENV == "" || process.env.NODE_ENV == "stage") {
	console.log("<--STAGE-->")
} 
else {
	dbdebug = false;
	console.log("<--PRODUCTION-->")
}
if(dbHost){
    config.connection = {
        client: "mysql",
        connection: {
            host: dbHost,
            user: dbUser,
            password: dbPass,
            database: dbName,
            insecureAuth : true,
            typeCast: function castField(field, useDefaultTypeCasting) {
                // We only want to cast bit fields that have a single-bit in them. If the field
                // has more than one bit, then we cannot assume it is supposed to be a Boolean.
                if (field.type === "BIT" && field.length === 1) {
                    var bytes = field.buffer();
                    // A Buffer in Node represents a collection of 8-bit unsigned integers.
                    // Therefore, our single "bit field" comes back as the bits '0000 0001',
                    // which is equivalent to the number 1.
                    return bytes && bytes[0] === 1 ? 1 : 0;
                }
                return useDefaultTypeCasting();
            }
        },
        debug: dbdebug
    };
}
else{
    console.log("No DB Connection available.")
}


console.log("Using database: " + chalk.bgGreen(" "+dbHost+" "))

// config.tokenExpiration = 43200; //expiration in minutes
module.exports = config;