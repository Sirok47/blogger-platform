import {Request, Response} from "express";
import {blogsRepository} from "../repository/blog_repository";

export function getBlogs(req: Request, res: Response){
    const result = blogsRepository.find(null)
    res.status(200).send(result)
}

export function getBlogById(req: Request, res: Response){
    const result = blogsRepository.find(req.params.id)
    if (result.length === 0) res.sendStatus(404)
    res.status(200).send(result[0])
}

export function postBlog(req: Request, res: Response) {
    const resultId = blogsRepository.add(req.body)
    const result = blogsRepository.find(resultId)
    res.status(201).send(result[0])
}

export function putBlog(req: Request, res: Response) {
    const result = blogsRepository.update(req.params.id,req.body)
    if (!result) res.sendStatus(404)
    res.sendStatus(204)
}

export function deleteBlog(req: Request, res: Response) {
    const result = blogsRepository.delete(req.params.id)
    if (!result) res.sendStatus(404)
    res.sendStatus(204)
}