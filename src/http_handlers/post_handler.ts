import {Request, Response} from "express";
import {postsRepository} from "../repository/post_repository";

export function getPosts(req: Request, res: Response){
    const result = postsRepository.find(null)
    res.status(200).send(result)
}

export function getPostById(req: Request, res: Response){
    const result = postsRepository.find(req.params.id)
    if (result.length === 0) res.sendStatus(404)
    res.status(200).send(result[0])
}

export function postPost(req: Request, res: Response) {
    const resultId = postsRepository.add(req.body)
    const result = postsRepository.find(resultId)
    res.status(201).send(result[0])
}

export function putPost(req: Request, res: Response) {
    const result = postsRepository.update(req.params.id,req.body)
    if (!result) res.sendStatus(404)
    res.sendStatus(204)
}

export function deletePost(req: Request, res: Response) {
    const result = postsRepository.delete(req.params.id)
    if (!result) res.sendStatus(404)
    res.sendStatus(204)
}