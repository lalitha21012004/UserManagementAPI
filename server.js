const express = require('express');
const app = express();

app.use(express.json());

app.listen(3000,()=>{
    console.log(`API running at http://localhost:3000`);
});

let users=[
    {id:1,name:'John Doe',email:'john.doe@example.com',age:17},
    {id:2,name:'Jane Smith',email:'jane.smith@example.com',age:25}
];  

app.get('/users',(_req,res)=>{
    res.json(users);
});

app.post('/users',(req,res)=>{
    if (!req.body.name || !req.body.email) {
        return res.status(400).json({msg: "Name and Email required"});
    }
    const newUser={id:users.length+1,...req.body};
    users.push(newUser);
    res.status(201).json(newUser);
});

app.put('/users/:id',(req,res)=>{
    const id=parseInt(req.params.id);
    let user=users.find(u=>u.id===id);
    if(!user){
        return res.status(404).json({message:'User not found'});
    }
    user.name=req.body.name || user.name;
    user.email=req.body.email || user.email;
    res.json(user);
});

app.delete('/users/:id',(req,res)=>{
    const id=parseInt(req.params.id);
    users=users.filter(u=>u.id!==id);
    res.json({message:'User deleted'});
});

app.get('/users/:id',(req,res)=>{
    const userId=parseInt(req.params.id);
    const userss=users.find(u=>u.id===userId);
    if(!userss){
        return res.status(404).json({message:'User not found'});
    }
    res.json(userss);


});
// GET users by name search
app.get("/users/search", (req, res) => {
    // 1. Get the 'name' from the query string (?name=Rahul)
    const nameQuery = req.query.name;

    if (!nameQuery) {
        return res.status(400).json({ msg: "Please provide a name to search for" });
    }

    // 2. Filter the users array (case-insensitive search)
    const filteredUsers = users.filter(user => 
        user.name.toLowerCase().includes(nameQuery.toLowerCase())
    );

    // 3. Return the results
    res.json(filteredUsers);
});

// GET users who are 18 or older
app.get("/users/adults", (_req, res) => {
    // Filter users where age is 18 or above
    const adults = users.filter(user => user.age >= 18);

    // Return the list of adults
    res.json(adults);
});
// GET only the emails of all users
app.get("/users/emails", (_req, res) => {
    // Use .map() to create a new array containing only email strings
    const userEmails = users.map(user => user.email);

    // Return the array of emails
    res.json(userEmails);
});