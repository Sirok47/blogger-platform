import {PostInputModel, PostViewModel} from "../models/post_models";
import {blogsRepository} from "./blog_repository";

let posts: PostViewModel[] = [{
    id: (Date.now()+2).toString(),
    title: "начало драмы",
    shortDescription: "хорошо что эти сундуки сохранились",
    content: "Бл*ть!\n" +
        "Хорошо, что... это, сундуки вот эти остались наверху, заебись вообще.\n" +
        "Да ты чё!...\n" +
        "БЛЯЯЯЯЯЯЯЯЯЯЯЯЯЯ!!\n" +
        "Ой, мама пришла...",
    blogId: blogsRepository.find(null)[0].id,
    blogName: blogsRepository.find(null)[0].name
},{
    id: (Date.now()+3).toString(),
    title: "антигрифершоу",
    shortDescription: "на ютюб нельзя пользоваться блокировщиком рекламы",
    content: "скибидиохайочадтоилет ломает майнкрафт письки дедли паркур киллер Дарк бравл Старс Ассасин сталкер снайпер 1998 рус",
    blogId: blogsRepository.find(null)[1].id,
    blogName: blogsRepository.find(null)[1].name
}]

export const postsRepository= {
    find(id: string | null): PostViewModel[] {
        if (!id) {
            return posts
        }
        for (const post of posts) {
            if (post.id === id) return [post]
        }
        return []
    },

    add(post: PostInputModel): string {
        let relatedBlogTitle = ""
        for (const blog of blogsRepository.find(null)) {
            if (blog.id === post.blogId) {
                relatedBlogTitle = blog.name
            }
        }
        const newPost: PostViewModel = {
            id: Date.now().toString(),
            blogName: relatedBlogTitle,
            ...post
        }
        posts.push(newPost)
        return newPost.id
    },

    update(id: string, post: PostInputModel): boolean {
        const postById = this.find(id)
        if (postById.length === 0) return false
        const blogToUpdate: PostViewModel = postById[0]
        blogToUpdate.title = post.title
        blogToUpdate.shortDescription = post.shortDescription
        blogToUpdate.content = post.content
        blogToUpdate.blogId = post.blogId
        let relatedBlogTitle = ""
        for (const blog of blogsRepository.find(null)) {
            if (blog.id === post.blogId) {
                relatedBlogTitle = blog.name
            }
        }
        blogToUpdate.blogName = relatedBlogTitle
        return true
    },

    delete(id: string): boolean {
        for (const postId in posts) {
            if (posts[postId].id === id) {
                posts.splice(+postId, 1)
                return true
            }
        }
        return false
    },

    deleteAll(){
        posts=[]
    }
}
