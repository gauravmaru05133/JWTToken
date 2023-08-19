const express = require('express');
const app = express();
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
dotenv.config();

app.get('/', (req, res) => res.send('Hello World!'));

let PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is up and running on ${PORT} ...`);
});


app.post("/token/generateToken", (req, res) => {
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    let data = {
        time: Date(),
        userId: 12,
    }

    /*var token = jwt.sign({ email_id: '123@gmail.com' }, "Stack", {
        expiresIn: "10h" // it will be expired after 10 hours
        //expiresIn: "20d" // it will be expired after 20 days
        //expiresIn: 120 // it will be expired after 120ms
        //expiresIn: "120s" // it will be expired after 120s
    });*/
    
    const token = jwt.sign(data, jwtSecretKey, {
        expiresIn: "30s" // time to expired
    });
    res.send(token);
})

app.get("/user/validateToken", (req, res) => {
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    try {
        const token = req.headers.authorization.replace("Bearer ", "");
        const verified = jwt.verify(token, jwtSecretKey);
        if (verified) {
            return res.send("Successfully Verified");
        } else {
            // Access Denied
            return res.status(401).send(error);
        }
    } catch (error) {
        // Access Denied
        return res.status(401).send(error);
    }
});