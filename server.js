const cookieParser = require('cookie-parser');
const express = require('express');
const dotENV = require('dotenv').config();
const sequelize = require('sequelize');
var cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const roleRoutes = require('./routes/roleRoutes');

const PORT = process.env.PORT || 4040; //Setting Port

const app = express(); // assaigning variable app to express

var corsOptions = {
  origin: "*",
};

// middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());


app.use('/api/users', userRoutes);
app.use('/api/roles', roleRoutes);
// listening to server connection

app.listen(PORT, () => console.log(`Server is litioning on PORT: ${PORT}`));
