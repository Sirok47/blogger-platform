import {Request, Response} from "express";
import {blog_router} from "./routers/blog_router";
import {post_router} from "./routers/post_router";
import {blogsRepository} from "./repository/blog_repository";
import {postsRepository} from "./repository/post_repository";

const express = require('express')
const app = express()
const port = 3000

app.use(express.json())
app.get('/', (req: Request, res: Response) => {
    res.send('Ya zhivoi!!')
})

app.delete('/testing/all-data',(req: Request, res: Response)=>{
    blogsRepository.deleteAll()
    postsRepository.deleteAll()
    res.sendStatus(204)
})

app.use('/blogs',blog_router)
app.use('/posts',post_router)

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})