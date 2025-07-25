const express = require('express');
const dotenv = require('dotenv');
const app = express();
dotenv.config();
const port = process.env.PORT || 5000;
const productsRouter = require('./routes/products');
const connectDB = require('./db/connect');

app.get('/', (req, res) => {
  res.send('Hello World!')
});
app.use('/api/products', productsRouter);

const start = async()=>{
    try{
        await connectDB( process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }
    catch(error){
        console.error('Error starting the server:', error);
    }
}
start();
