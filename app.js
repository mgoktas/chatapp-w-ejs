//express
const express = require('express')
const app = express()
const session = require('express-session')
const locals = require('./middlewares/locals')

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const SequelizeStore = require("connect-session-sequelize")(session.Store);
// const csurf = require('csurf')

//node modules
const path = require('path')

//custom modules
const sequelize = require('./js/config/mysql')

//routes
const routerPOST = require('./routers/POST')
const routerGET = require('./routers/GET')

//template engine
app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')

app.use(cookieParser())
app.use(session({
  secret: 'hello',
  resave: false,
  saveUninitialized: false,
  cookie:{
    maxAge: 1000 * 60 * 60 
  },
  store: new SequelizeStore({
    db: sequelize
  })
}))

app.use(express.urlencoded({ extended: false }));
app.use("/libs", express.static(path.join(__dirname, "node_modules")));
app.use(express.static(path.join(__dirname, 'js')));
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname, 'public/images'))) 
app.use("/static", express.static(path.join(__dirname, "public")));

//auth
app.use(locals);

//routes
app.use(routerPOST)
app.use(routerGET)  

app.use("*", (req, res) => {
  res.status(404).render("partials/404", { title: "not found "});
});

app.use((err, req, res, next) => {
    console.log("logging", err.message);
    next(err);
});

app.use((err, req, res, next) => {
    res.status(500).render("partials/500", { page_name: "error"});
});

const User = require('./models/user')
const UserType = require('./models/userType')
const Message = require('./models/messages')

UserType.hasMany(User, {
  foreignKey: {
    name: 'typeId',
    allowNull: false,
    defaultValue: 3
  },
  onDelete: 'SET NULL',
  onUpdate: 'SET NULL'
});
User.belongsTo(UserType)

User.hasOne(Message,{
  foreignKey: 'sendersId'
});
Message.belongsTo(User);

async function learning(){
  const deneme = await Message.findAll({
    include: User
  })
  console.log(JSON.stringify(deneme, null, 2));
}

const port = 4000
app.listen(port,()=>{
  if (process.send) {
    process.send('online');
}
})

























