//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const {conn, Diet} = require('./src/db.js');


function preCharge(){
const dbPrecharge = [{ "id": 1, "name": "Gluten Free" },
{ "id": 2, "name": "Low FODMAP" },
{ "id": 3, "name": "Ketogenic" },
{ "id": 4, "name": "Vegetarian" },
{ "id": 5, "name": "Lacto-Vegetarian" },
{ "id": 6, "name": "Ovo-Vegetarian" },
{ "id": 7, "name": "Vegan" },
{ "id": 8, "name": "Pescetarian" },
{ "id": 9, "name": "Paleo" },
{ "id": 10, "name": "Primal" },
{ "id": 11, "name": "Whole30" }]
Diet.bulkCreate(dbPrecharge);
}



// Syncing all the models at once.
conn.sync({ force: true }).then(async () => {
  await preCharge()
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
