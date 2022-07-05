
var express = require("express");
var app = express();
const { MongoClient } = require("mongodb");                                                                                                                                        
const url = "mongodb+srv://yashdarshankar:Yash%401001@cluster0.gto09ok.mongodb.net/mernstack?retryWrites=true&w=majority";
const client = new MongoClient(url);
const dbName = "mernstack";
app.get("/", function (request, response){
    response.sendFile(__dirname+"/index.html");
});
app.get("/signup", function (request, response){
    response.sendFile("http://localhost:3000");
});
app.get("/getemail", function (request, response){
    
    var username = request.query.username;
    var password = request.query.password;
    async function run() {
        try {
             await client.connect();
             console.log("Connected correctly to server");
             const db = client.db(dbName);
    
             // Use the collection "people"
             const col = db.collection("users");
    
             // Construct a document                                                                                                                                                              
             let personDocument = {
                 "id":"0002",
                 "username":"yash",
                 "password":"password"
             }
    
             // Insert a single document, wait for promise so we can read it back
             //const p = await col.insertOne(personDocument);
             // Find one document
             /*const myDoc = await col.findOne();
             // Print to the console
             console.log(myDoc);*/
             /*const app = db.collection("users").find({"_id":{"$oid":"62c123ec77ea79fab25bfddd"}});
             console.log(app);*/
    
            //await col.insertOne({"id":"0003"});
            
            const myDoc = await col.findOne({"name":username});
             // Print to the console
             
             
             if(myDoc.name==username && myDoc.password==password){
                console.clear()
                console.log("succcesssfullly logged in");
                response.sendFile(__dirname+"/success.html");
                
            
                
             }
             else{
                console.clear()
                console.log("invallllid");
                response.sendFile(__dirname+"/fail.html");
                
                
             }
            
            
    
            } catch (err) {
             console.log(err.stack);
         }
     
         finally {
            await client.close();
        }
    }
    
    run().catch(console.dir);


});
app.get("/getpage", function (request, response){
    var username = request.query.usernameregister;
    var password = request.query.passwordregister;
    var password1 = request.query.password1register;
    
    var number = request.query.number;
    var question = request.query.question;

    async function run() {
        try {
             await client.connect();
             console.log("Connected correctly to server");
             const db = client.db(dbName);
             const col = db.collection("users");                                                                                                                                                              
             let personDocument = {
                 "name":username,
                 "password":password,
                 "number":number,
                 "question":question
             }
             if(password===password1){
                console.log("inserted")
                await col.insertOne(personDocument);
                
             }
             else{
                console.log("invalidddd");
             }
            
            } catch (err) {
             console.log(err.stack);
         }
         finally {
            await client.close();
        }
    }
    run().catch(console.dir);
});
const port = 3000 
app.listen(port);
console.log("Something awesome to happen at http://localhost:"+port);