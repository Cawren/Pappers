import express from 'express';
import cors from 'cors' ; 
import mysql from 'mysql' ;
import { Sequelize, Model, DataTypes } from 'sequelize' ;

// Connexion au serveur
const app = express() ;
const port = 3000 ;
app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on http://0.0.0.0:${port}`) ;
});
app.use(express.json()) ;
app.use(cors()) ;

// Connexion à la BDD
const con = mysql.createConnection({
  host: "localhost",
  port: "3307",
  user: "root",
  password: "",
  database: "pappers"
});
con.connect(function(err) {
  if (err) throw err ;
  else console.log("Connexion à MySQL réussie") ;
});

// Initialisation Sequelize
const sequelize = new Sequelize('pappers', 'root', '', {
  host: 'localhost',
  port: 3307,
  dialect: 'mysql'
});
await sequelize.sync() ;

// Classes

class Enterprise extends Model {}
Enterprise.init(
  {
    EnterpriseNumber: {type:DataTypes.STRING, primaryKey:true},
    Status: DataTypes.STRING,
    JuridicalSituation: DataTypes.INTEGER,
    TypeOfEnterprise: DataTypes.INTEGER,
    JuridicalForm: DataTypes.INTEGER,
    JuridicalFormCAC: DataTypes.INTEGER,
    StartDate: DataTypes.DATE,
  },
  {sequelize,
    modelName: 'enterprise',
    tableName: 'enterprise',
    timestamps: false,
    freezeTableName: true },
) ;

// Fonction de création
async function createEnterprise(body) {
  try {
        console.log(body)
        await Enterprise.create({ 
          EnterpriseNumber: body.EnterpriseNumber,
          Status: body.Status,
          JuridicalSituation: body.JuridicalSituation,
          TypeOfEnterprise: body.TypeOfEnterprise,
          JuridicalForm: body.JuridicalForm,
          JuridicalFormCAC: body.JuridicalFormCAC,
          StartDate: body.StartDate,
         });
        console.log("Enterprise registered")
  } catch (err) {
    console.error('Error creating enterprise :', err.message);
  }
}

// Création
app.post('/enterprise', async (req, res) => {
  await createEnterprise(req.body);
  res.json({ success: true, message: 'Generated an enterprise' });
});


// Hello world
app.get('/', (req, res) => {
    res.send('Hello world !')
})


