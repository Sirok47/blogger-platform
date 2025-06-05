import {Router} from "express";
import {deleteBlog, getBlogById, getBlogs, postBlog, putBlog} from "../http_handlers/blog_handler";
import {
    descriptionValidation, idValidation,
    nameValidation,
    validationResultMiddleware,
    webUrlValidation
} from "../middleware/validators";
import {authGuard} from "../middleware/authMiddleware";

export const blog_router = Router({})

blog_router.get('/',getBlogs)
blog_router.get('/:id',idValidation,validationResultMiddleware,getBlogById)
blog_router.post('/',authGuard,nameValidation,descriptionValidation,webUrlValidation,validationResultMiddleware,postBlog)
blog_router.put('/:id',authGuard,idValidation,nameValidation,descriptionValidation,webUrlValidation,validationResultMiddleware,putBlog)
blog_router.delete('/:id',authGuard,idValidation,validationResultMiddleware,deleteBlog)

