const { MongoClient, ServerApiVersion } = require("mongodb");
//TODO: remove username and password from uri before pushing to production
const uri = "mongodb+srv://tabs_orbital:tempoIsGreat696@cluster0.xcjr2u9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
});

const express = require("express");
const cors = require("cors");
const multer = require("multer");
const upload = multer();

const app = express();



const PORT = 8080;

app.use(cors());
app.use(express.urlencoded({extended:true}));

app.post("/api/login", upload.none(), async (req, res) => {
    let body  = req.body;
    let email_field = body["email"];
    let pass_field = body["password"];

    try {
        await client.connect();
        const result = await client.db("tabs_main").collection("users")
            .findOne({email: email_field, password: pass_field});
        client.close();

        if (result != null) {
            res.json({login_success: true});
        } else {
            res.json({login_success: false});
        }

    } catch {
        console.log("error querying database");
    }

    
})

app.listen(PORT, () => {
    console.log(`started on port ${PORT}`);
})