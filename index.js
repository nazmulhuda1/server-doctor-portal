const express = require('express');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();

// middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.PORTAL_USER_NAME}:${process.env.PORTAL_DATA_PASS}@cluster0.exe7q4w.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const appointmentOptionCollection = client.db('doctorsPortal').collection('appointmentOpptions');

        app.get('/appointmentOpptions', async (req, res) => {
            const date = req.query.date;
            const query = {};
            const options = await appointmentOptionCollection.find(query).toArray();
            res.send(options);
        })
    }
    finally {

    }
}
run().catch(console.log)






app.get('/', async (req, res) => {
    res.send('doctors portal server is running');
})

app.listen(port, () => console.log(`Doctors portal running on ${port}`))