import {Router} from "express";
import {deletePost, getPostById, getPosts, postPost, putPost} from "../http_handlers/post_handler";
import {
    blogIdValidation,
    contentValidation,
    idValidation,
    shortDescValidation,
    titleValidation, validationResultMiddleware
} from "../middleware/validators";
import {authGuard} from "../middleware/authMiddleware";

export const post_router = Router({})

post_router.get('/',getPosts)
post_router.get('/:id',idValidation,validationResultMiddleware,getPostById)
post_router.post('/',authGuard,titleValidation,shortDescValidation,contentValidation,blogIdValidation,validationResultMiddleware,postPost)
post_router.put('/:id',authGuard,idValidation,titleValidation,shortDescValidation,contentValidation,blogIdValidation,validationResultMiddleware,putPost)
post_router.delete('/:id',authGuard,idValidation,validationResultMiddleware,deletePost)
