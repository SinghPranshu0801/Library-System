const path =require("path")
const express= require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');

const app=express();
// connnection
const url = "mongodb+srv://singhpranshu:Pritam123@cluster0.puyzt6h.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(url)
.then(()=> console.log("DB connected"))
.catch(err => console.log("error connecting in database ",err));

app.set('view engine','ejs');
app.set('views','views');
const bookSchema = new mongoose.Schema({
    bookName:{
        type: String,
        required: true,
        unique: true,
    },
    author: {
        type: String,
        required: true,
    },
});

const Book = mongoose.model('Book', bookSchema);

//middleware or a plugin
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));

let i=1;
app.get("/api/books",async (req,res)=>{ i=1;
     const allbooks = await Book.find({});
     const html=`
    <ul>
    ${allbooks.map((user)=>`<h3>${i++}.User ID - ${user._id}<h3>
    <div class="card__image">
                    <img src="https://www.shutterstock.com/image-vector/open-book-vector-clipart-silhouette-260nw-795305758.jpg" alt="A Book">
                </div>
    <li > Book Name- ${user.bookName}</li>
    <li> Author- ${user.author}</li>`).join("")}
    </ul>
    `
    
    return res.send(html);
   // return res.json(allbooks);
});
app.post("/api/books",async (req,res)=>{
    ///create new user
     const body = req.body;
     if(!body || !body.bookName || !body.author){
        return res.status(400).json({msg:"All fields required"});
     }
    const newbook= await Book.create({
        bookName: body.bookName,
        author: body.author
     });
    // console.log("result",newbook);
     return res.status(201).json({msg:"Book Added successfully"});
});

app.get("/api/books/:id",async (req,res)=>{
    //update book
    const book= Book.findById(req.params.id);
    if(book==null)console.log("false")
    else console.log(book);
      // await Book.findByIdAndUpdate(req.params.id,{author:"JK ROWLING"})
    // const id=Number(req.params.id);
    //  const user = users.find((user)=> user.id===id);
    //   user.first_name="pAresh";
      return res.json({status: "success"});
});
app.put("/api/books/:id",async (req,res)=>{
    //handling errors
    try{const book = await  Book.findById(req.params.id);
    if(!book){
        return res.status(404).send();
    }
    //update book
       await Book.findByIdAndUpdate(req.params.id,{bookName:req.body.bookName, author:req.body.author})
  }
  catch(e){
    res.status(500).send(e);
  }
      return res.json({status: "success"});
});
app.use("/",(req,res,next)=>{
    res.render(path.basename('./views/home.ejs'));
      
   });

app.listen(8000,()=> console.log("server started on port 8000"));