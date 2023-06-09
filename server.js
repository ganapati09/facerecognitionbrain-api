const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const app =  express();

app.use(bodyParser.json());
app.use(cors());
const database = {
    users: [
        {
            id: '123',
            name: 'john',
            email: 'john@gmail.com',
            password: 'elon',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'sally',
            email: 'sally@gmail.com',
            password: 'musk',
            entries: 0,
            joined: new Date()
        }
    ]
}

app.get ('/',(req,res) => {
    res.send(database.users);
})

app.post('/signin',(req,res) => {
    if(req.body.email === database.users[0].email && req.body.password === database.users[0].password){
        res.json('success');
    }else{
        res.status(400).json("wrong username or password");
    }
})


app.post('/register',(req,res) => {
    const { email, name, password} = req.body;

    database.users.push({
            id: '125',
            name: name,
            email: email,
            password: password,
            entries: 0,
            joined: new Date()
    });

    res.json(database.users[database.users.length-1]);

})

app.get('/profile/:id',(req,res) => {
    const { id } = req.params;
    let found = false;
    database.users.forEach(user => {
        if(user.id === id){
            found = true
            return res.json(user);
        }
    })
    if(!found) {
        res.status(400).json('no such user {id}');
    }
    
    
})

app.put('/image',(req,res) => {
    const { id } = req.body;
    let found = false;
    database.users.forEach(user => {
        if(user.id === id) {
            found = true;
            user.entries++;
            return res.json(users.entries);
        }
    })
    if(!found){
        res.status(400).json("user not found");
    }
    
})
app.listen(3001, () => {
    console.log("app is running in on port 3001");
})
