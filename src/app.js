const express = require('express');
require('dotenv').config();
const sequelize = require("./database/sequelize");
const routers = require('./routes/All.Route')

const port = process.env.PORT;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(routers)


const bootstrap = async (req, res) => {
    await sequelize.authenticate({
      logging: false,
    });
    
  
    await sequelize.sync({
      alter: true,
      logging: false,
    });
  
    app.listen(port, () => {
      console.log(port);
    });
  };
  
  bootstrap();