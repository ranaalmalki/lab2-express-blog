import express from "express";

const app = express();

const port = 5000


app.use(express.json())

app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);

})

app.get("/",(req,res)=>{
    res.send("helllo")
})

const blogcontent =[]

app.post("/blog",(req,res)=>{
    const username=req.body.username
    const title=req.body.title
    const content = req.body.content
    const blog={ id:blogcontent.length +1 ,username,title,content}

    blogcontent.push(blog)
    res.json(blog)

});


app.get("/blog",(req,res)=>{
    res.json(blogcontent)
})


app.patch("/blog/:id",(req,res)=>{
const userId = parseInt(req.params.id)
const {username,title,content}=req.body
const titleblog = blogcontent.find(b=>b.id === userId)
if(titleblog){
    titleblog.username = username || titleblog.username

    titleblog.title = title || titleblog.title
    titleblog.content = content || titleblog.content
res.json(titleblog)
}else{
  `res.status(404).json({ message: 'User not found' });`  
}
})


app.delete("/blog/:id",(req,res)=>{
    const userId = parseInt(req.params.id)
    const index = blogcontent.findIndex(b => b.id === userId);
    if (index !== -1 ) {
        blogcontent.splice(index, 1);
        res.status(204).send(); 
    } else {
        res.status(404).json({ message: 'Blog not found' }); 
    }
});