/********************************************************************************
*  WEB322 – Assignment 03
* 
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
* 
*  https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
* 
*  Name: ____Frank Fu______________ Student ID: ___126609197____ Date: _______Feb 20 2024_______
*
********************************************************************************/


const express = require("express");
const legoData = require("./modules/legoSets");

const app = express();
const HTTP_PORT = process.env.PORT || 3000;
app.use(express.static("public"));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/home.html');
});

app.get('/about', (req, res) => {
    res.sendFile(__dirname + '/views/about.html');
});

app.get('/lego/sets', async (req, res) => {
    try {
        const theme = req.query.theme; 
        let sets;

        if (theme) {
            sets = await legoData.getSetsByTheme(theme);
        } else {
            sets = await legoData.getAllSets();
        }

        res.send(sets);
    } catch (err) {
        res.status(404).send(err);
    }
});

app.get('/lego/sets/:setNum', async (req, res) => {
    try {
        const setNum = req.params.setNum;
        let set = await legoData.getSetByNum(setNum);
        res.send(set);
    } catch (err) {
        res.status(404).send(err);
    }
});


legoData.initialize().then(() => {
    app.listen(HTTP_PORT, () => {
        console.log(`server listening on: ${HTTP_PORT}`);
    });
});


app.use((req, res) => {
    res.status(404).sendFile(__dirname + '/views/404.html');
});


