import nano from "nano";
import "../../config/config";
// import global.gConfig from "config";

// database url config variables

const url = global.gConfig["db_config"]["db_url"];
const port = global.gConfig.db_config.db_port;
const user = global.gConfig.db_config.db_user;
const pass = global.gConfig.db_config.db_pass;
const protocol = global.gConfig.db_config.db_protocol;

console.log("db_url", url);

module.exports = nano(`${protocol}${user}:${pass}@${url}:${port}`);

// "http://admin:admin@127.0.0.1:5984"
// process.env.COUCHDB_URL
