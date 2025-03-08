const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV1BJMGV1dFc5aTQzTmdWSzU0UWFzcXVIcS9qanU2YlZuR1Bkc3pWNUxIUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTDRyMWJHcnJtemlJdkJkT0YyY0xibTYvd2psRHJMTXUxNERoWm1HOEhFMD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI0TW1OSnk5VU5rT2JJc2NjRUVpWG8zdWhESjZiWWM4dW5MZ3ZQck5hV1ZFPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJPZFNTVlBsRnU3RjAxaWZtVUhKUWY3Q2RpaVEzK3pZNjhxQ0lBeW5qZUZZPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjRIVU00UU9hQjVpRkZtVEtHTXplQ3JYUTJ4cDF5bCtZa21BQzYwRGhtRlk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IllQT3RjbEZTNGQ4dkU5bDIvd2tjdExSamEwQ1YyMzhMdk1xM09OYVp2Ulk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVU5GbmZXL2psZVJzNkpwV3YraTltenZsMjF0bVNZc2gxdFk3em9saDNVVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTlVNVWlkaTJSTCtDSFY4R2I5dWI3TVhHYWlCR3dBdmVuQ3oxb3dRVVhRQT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlhMTkdqOUhGNVBJYzBSSU5Bc2VhTUhFNS8yYnBDeE5lOW5wNzBJR20vN2c3d1VBaGRORWRnbjN3enhpMGVCelFNUmZ2UWJDUE9XZ3l3Sk5rWlZxYkNRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTQzLCJhZHZTZWNyZXRLZXkiOiJMYVJydTVnVFhjYnR2VXcrcjZvcHZkK0FpYXlKeGU3RFphN3hDUjJqWitvPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjYyODc4NTYxNDE1NjhAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiMDVGN0YyMkEwNzYzNkQ5NTQ3MTlEMTVDMkY3RDhEQjAifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc0MTQ1ODMwMn1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MCwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiZU4xNWhHb1hUVnF2UDVIcjZSX2trQSIsInBob25lSWQiOiIyMDQ2ODVlNS1jYjA5LTQ4ZjEtYjYxMy03YTA2YTE2MDU1MDAiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMlRtdzR6QnNvdUVKWEh4enlDSzNLNTBoQnhFPSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InpJSk8rWmM1WGxnbW9nUjBURGlxdXJIbGVSVT0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiI1UkJZREZERSIsIm1lIjp7ImlkIjoiNjI4Nzg1NjE0MTU2ODoxMUBzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTmFudXBrRkVPMldzcjRHR0FNZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiWE9SNDRUYmh6L2tJWjcwWUp3WUtZREJCM1lnTG5JamxTL3hkL2krS0tRMD0iLCJhY2NvdW50U2lnbmF0dXJlIjoiZzRqanJjSjljS3FFVmxNNjh5S0NISTlJYlJYWjRJWFg3SXJ2bkRCaENEVkNTSHZzWW5Jc05TaXVPT1c1TzNzNTh6NVMvMGNaeWtIWGFvTnhaTW9KQ2c9PSIsImRldmljZVNpZ25hdHVyZSI6IklKZVZKMStVU0xJNE9YdlBuRUh3MVdYYWdUcUxsNGhveGFjT2puWDNSbW9GNFpjVDdoZHIrMjdWNm42SmVrbzlULzZnTGZTRTA0dW9nUWM3b2pDSUNRPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiNjI4Nzg1NjE0MTU2ODoxMUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJWemtlT0UyNGMvNUNHZTlHQ2NHQ21Bd1FkMklDNXlJNVV2OFhmNHZpaWtOIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQxNDU4Mjk4LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUxYYyJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Fredi Ezra",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " 255752593977",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'LUCKY_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '5' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTICALL : process.env.ANTICALL || 'yes',
                  AUTO_REACT : process.env.AUTO_REACT || 'yes',
                  AUDIO_REPLY : process.env.AUDIO_REPLY|| 'yes', 
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
                  AUTO_REPLY : process.env.AUTO_REPLY || 'yes',
                  AUTO_READ : process.env.AUTO_READ || 'yes',
                  AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'no',
                  AUTO_REJECT_CALL : process.env.AUTO_REJECT_CALL || 'yes',
                  AUTO_BIO : process.env.AUTO_BIO || 'yes',
                  AUDIO_REPLY : process.env.AUDIO_REPLY || 'yes',
                  AUTO_TAG_STATUS : process.env.AUTO_TAG_STATUS || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});


                  
