import {BlogInputModel, BlogViewModel} from "../models/blog_models";

let blogs: BlogViewModel[] = [{
    id: Date.now().toString(),
    name: "Блок(алмазный)",
    description: "содержит алмазы(9штук)",
    websiteUrl: "https://charcoal.compressed.com"
},{
    id: (Date.now()+1).toString(),
    name: "Блок(незеритовый)",
    description: "(пусто(нравится))",
    websiteUrl: "https://ebatel228.com"
}]

export const blogsRepository= {
    find(id: string | null): BlogViewModel[] {
        if (!id) {
            return blogs
        }
        for (const blog of blogs) {
            if (blog.id === id) return [blog]
        }
        return []
    },

    add(blog: BlogInputModel): string {
        const newBlog: BlogViewModel = {
            id: Date.now().toString(),
            ...blog
        }
        blogs.push(newBlog)
        return newBlog.id
    },

    update(id: string, blog: BlogInputModel): boolean {
        const blogById = this.find(id)
        if (blogById.length === 0) return false
        const blogToUpdate: BlogViewModel = blogById[0]
        blogToUpdate.name = blog.name
        blogToUpdate.description = blog.description
        blogToUpdate.websiteUrl = blog.websiteUrl
        return true
    },

    delete(id: string): boolean {
        for (const blogId in blogs) {
            if (blogs[blogId].id === id) {
                blogs.splice(+blogId, 1)
                return true
            }
        }
        return false
    },

    deleteAll(){
        blogs=[]
    }
}
