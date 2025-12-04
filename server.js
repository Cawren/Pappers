import express from 'express';
import cors from 'cors' ; 
import mysql from 'mysql' ;
import { Sequelize, Model, DataTypes, Op } from 'sequelize' ;

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

class Activity extends Model {}
Activity.init(
  {
    id : {type:DataTypes.INTEGER, primaryKey:true},
    EntityNumber: {type:DataTypes.STRING, allowNull:false},
    ActivityGroup : {type:DataTypes.INTEGER, allowNull:false} ,
    NaceVersion : DataTypes.INTEGER,
    NaceCode : DataTypes.INTEGER,
    Classification : DataTypes.STRING
  },
  {sequelize,
    modelName: 'activity',
    tableName: 'activity',
    timestamps: false,
    freezeTableName: true },
) ;

class Establishment extends Model {}
Establishment.init(
  {
    EstablishmentNumber: {type:DataTypes.STRING, primaryKey:true},
    EnterpriseNumber : {type:DataTypes.INTEGER, allowNull:false} ,
    StartDate : DataTypes.DATE
  },
  {sequelize,
    modelName: 'establishment',
    tableName: 'establishment',
    timestamps: false,
    freezeTableName: true },
) ;

 	 	 	

// Fonctions
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
         await createActivity(body) ;
         await createEnterprise(body) ;
        console.log("Enterprise registered") ;
  } catch (err) {
    console.error('Error creating enterprise :', err.message);
  }
}

async function createActivity(body) {
  try {
        await Activity.create({ 
          EntityNumber: body.EnterpriseNumber,
          ActivityGroup : body.ActivityGroup,
          NaceVersion : body.NaceVersion,
          NaceCode : body.NaceCode,
          Classification : body.Classification
         });
        console.log("Activity registered") ;
  } catch (err) {
    console.error('Error creating activity :', err.message);
  }
}

async function createActivity(body) {
  try {
         await Establishment.create({
          EstablishmentNumber: body.EstablishmentNumber,
          EnterpriseNumber: body.EnterpriseNumber,
          StartDate: body.EstablishmentStartDate
         });
        console.log("Establishment registered") ;
  } catch (err) {
    console.error('Error creating establishment :', err.message);
  }
}

async function deleteEnterprise(id) {
  try {
        await Activity.destroy({ where: { EntityNumber: id } });
        await Establishment.destroy({ where: { EnterpriseNumber: id } });
        const enterprise = await Enterprise.findOne({ where: { EnterpriseNumber: id } });
        await enterprise.destroy();
        console.log("Enterprise deleted")
  } catch (err) {
    console.error('Error deleting enterprise :', err.message);
  }
}

async function deleteActivity(id) {
  try {
        const activity = await Activity.findOne({ where: { id: id } });
        console.log("Activity deleted")
  } catch (err) {
    console.error('Error deleting activity :', err.message);
  }
}

async function deleteEstablishment(id) {
  try {
        const establishment = await Establishment.findOne({ where: { EstablishmentNumber: id } });
        console.log("Establishment deleted")
  } catch (err) {
    console.error('Error deleting establishment :', err.message);
  }
}

// Création
app.post('/enterprise', async (req, res) => {
  await createEnterprise(req.body);
  res.json({ success: true, message: 'Request treated' });
});

app.post('/activity', async (req, res) => {
  await createEnterprise(req.body);
  res.json({ success: true, message: 'Request treated' });
});


// Recherche
app.get('/enterprise/:id', async (req, res) => {
  try {
        const enterprise = await Enterprise.findOne({ where: { EnterpriseNumber: req.params.id } });
        res.json({ success: true, message: enterprise });
        console.log("Search done")
  } catch (err) {
    console.error('Error searching enterprise :', err.message);}
});

app.get('/establishment/:id', async (req, res) => {
  try {
        const enterprise = await Establishment.findAll({ where: { EnterpriseNumber: req.params.id } });
        res.json({ success: true, message: enterprise });
        console.log("Search done")
  } catch (err) {
    console.error('Error searching enterprise :', err.message);}
});


// Suppression
app.delete('/enterprise/:id', async (req, res) => {
  await deleteEnterprise(req.params.id);
  res.json({ success: true, message: 'Request treated' });
});

app.delete('/activity/:id', async (req, res) => {
  await deleteActivity(req.params.id);
  res.json({ success: true, message: 'Request treated' });
});

app.delete('/establishment/:id', async (req, res) => {
  await deleteEstablishment(req.params.id);
  res.json({ success: true, message: 'Request treated' });
});


// Hello world
app.get('/', (req, res) => {
    res.send('Hello world !')
})


