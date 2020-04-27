require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT | 5000;
const Category = require('./models/Category');
const Admin = require('./models/Admin');
const Image = require('./models/Image');
const sequelize = require('./models/sequelizeConfig');
const cors = require('cors')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const atob = require('atob');
const multer = require('multer');
const bodyParser = require('body-parser');
const uuidv4 = require('uuid').v4;
const path = require('path');
const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, './../uploads');
    },
    filename: (req,file,cb)=>{
        file.id = uuidv4() + file.originalname.substr(file.originalname.lastIndexOf('.'));
        cb(null, file.id)
    }
})
const uploads = multer({storage:storage});


const generateAccessToken = (role) => {
    //de modificat sa primesaca ca parametru rolul din db
    return jwt.sign({role:role},process.env.ACCESS_TOKEN_SECRET,{expiresIn:'1h'})
}
/*
{
    origin: 'http://localhost:3000'
  } */
app.use(express.json())
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//de facut check la token in momentul in care sunt facute requesturi la anumite rute

app.post('/admin/uploadimages', uploads.array('photos', 25),async (req, res, next) => {
    try {
        const photos = req.files;
        if (!photos) {
            res.status(400).send({
                status: false,
                data: 'No photo is selected.'
            });
        } else {
            Promise.all(
                photos.map(p => {
                    return new Promise(async (resolve, reject) => {
                        await Promise.all([
                            imagemin([`./../uploads/${p.id}`], {
                                destination: './../uploads/',
                                plugins: [
                                    imageminJpegtran(),
                                    imageminPngquant({
                                        quality: [0.6, 0.8]
                                    }),
                                    imageminMozjpeg()
                                ]
                            }),
                            Image.create({name:p.originalname,pathname:p.id})
                        ])
                        .then(()=>resolve(5))    
                    })
                })
            ).then((vals)=>{
                res.json({
                    value:vals.reduce((total,r) => total+r,0),
                    status: 200,
                    message: 'Imaginile au fost incarcate cu succes',
                });
            })
        
        }
    } catch (err) {
        res.status(500).send(err);
    }
})

app.get('/api/breadcrumb/:id/:symbol',async (req,res) => {
    const id = req.params.id;
    const symbol = req.params.symbol;
    console.log(id,symbol)

    if(symbol === 'c'){
        Promise.all([await Category.findAll({attributes:['id','name'],where:{id:id}})])
        .then(qresult =>{
            const result = qresult[0][0];
            const urlName = result.name.trim().replace(' ','-').toLowerCase();
            return res.json({path:[{name:result.name,url:`/${urlName}/${result.id}/c`}]});
        })
    }

    if(symbol === 'sc'){
        Promise.all([await sequelize.query(`SELECT categories.id AS xid,categories.name AS xname,
                                                    sc.id AS yid,sc.name AS yname 
                                                    FROM (SELECT * FROM categories WHERE ID = ${id}) 
                                                    AS sc,categories WHERE sc.parent = categories.id;`)])
        .then(qresult => {
            const result = qresult[0][0][0];
            const xUrlName = result.xname.trim().replace(' ','-').toLowerCase();
            const yUrlName = result.yname.trim().replace(' ','-').toLowerCase();
            return res.json({path:[{name:result.xname,url:`/${xUrlName}/${result.xid}/c`},
                                   {name:result.yname,url:`/${yUrlName}/${result.yid}/sc`}]});
        })
    }


})

app.get('/admin/images', async (req, res, next) => {
    //de facut verificare pt missing
    const data = (await Image.findAll({attributes:['id','name']}))
                .map(i => {
                        const dotIndex = i.dataValues.name.lastIndexOf('.');
                        return{id:i.dataValues.id,
                                name:i.dataValues.name.substr(0,dotIndex),
                                ext:i.dataValues.name.substr(dotIndex)}
                        });
    return res.json({data: data});
})

app.get('/admin/images/:imageId',async (req, res, next) => {
    if(req.params.imageId !== undefined){
        const image = (await Image.findAll({attributes:['pathname'],where:{id:req.params.imageId}}))[0];
        if(image === undefined)
            return res.sendStatus(404);
        return res.sendFile(path.join(__dirname,`/../uploads/${image.dataValues.pathname}`))
    }
    return res.sendFile(path.join(__dirname,`./missing.png`))
})

app.get('/admin/createaccount', async (req,res)=>{
    await Admin.count().then(count=>{
        return res.send(count>0?true:false);
    })
})

app.post('/admin/checktoken',(req,res)=>{
    if(req.body.token === undefined) return res.json({status:498,token:''})
    try{
        jwt.verify(req.body.token,process.env.ACCESS_TOKEN_SECRET)
        return res.json({status:200,token:generateAccessToken("admin")})
    }catch(e){
        if(e.name==="TokenExpiredError")
            //invalid token
            return res.json({status:498,token:''}) 
        return res.json({token:''})
    } 
})

app.post('/admin/createaccount', async (req,res)=>{
    await Admin.count().then(async count=>{
        if(count>0)
            return res.send(500)
        else{
            try{
                const hasedPassword = await bcrypt.hash(req.body.password,10);
                const admin = {email:req.body.email,password:hasedPassword,role:'admin'}
                try{
                    await Admin.create(admin)
                    .then(()=>res.send(200));
                }
                catch{
                    return res.send(404);    
                }
            }
            catch{
                return res.send(500);
            }
        }
    })
})

app.post('/admin/login', async (req,res)=>{
    try {
        const admin = (await Admin.findAll({where:{email:req.body.email}}))[0];
        if(admin === undefined)return res.json({status:404})
        try{
            if(await bcrypt.compare(req.body.password,admin.password)){
                const accessToken = generateAccessToken(admin.role);
                return res.json({status:200,token:accessToken});
            }
            else
                return res.json({status:404})
        }catch{
            return res.json({status:500})
        }    
    } catch (error) {
        return res.json({status:404})
    }
})

app.get('/api/images/:imageId',async (req, res, next) => {
    console.log("id:",req.params.imageId)
    if(req.params.imageId !== undefined){
        const image = (await Image.findAll({attributes:['pathname'],where:{id:req.params.imageId}}))[0];
        if(image === undefined)
            return res.sendStatus(404);
        return res.sendFile(path.join(__dirname,`/../uploads/${image.dataValues.pathname}`))
    }
    return res.sendFile(path.join(__dirname,`./missing.png`))
})

app.post('/api/categories',async (req,res)=>{
    Promise.all([await Category.create(req.body)])
    .then(()=>{
        res.json({status:200,message:"Categorie adaugata cu succes"});
    })
    .catch(error => res.json({status:500,message:"Categoria nu a putut fi adaugata"}));
});

app.get('/api/categories',async (req,res)=>{
    return res.json(await Category.findAll({
                where: {parent:null}
            }));
})

app.get('/api/categories/:id',async (req,res)=>{
    return res.json(await Category.findAll({
                where: {parent:req.params.id}
            }));
})

app.get('/', async (req, res) => {
    //(async ()=>{await sequelize.sync({ force: true });})()
    return res.json(await Category.findAll());
});

app.listen(port, () => console.log(`Server listening on port ${port}!`));

