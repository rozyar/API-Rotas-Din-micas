import * as fs from 'fs';

export type Post = {
    id: number
    name:string
    email: string
}

let filePath = "data.json"

//handlers
export const getPosts = async () => {
    try {
        const fileData = fs.readFileSync(filePath, 'utf8');
        const posts = JSON.parse(fileData);
        return posts;
    } catch (err) {
        console.error('Erro ao ler ou analisar o arquivo JSON:', err);
        return [];
    }
};

export const addPost = async (post: Post) => {
    try {
        let existingPosts = await getPosts();
        existingPosts.push(post);
        fs.writeFileSync(filePath, JSON.stringify(existingPosts));
    } catch (err) {
        console.error('Erro ao adicionar postagem:', err);
    }
};

export const deletePost = async (id: number) => {
    try {
        const existingPosts = await getPosts();
        const updatedPosts = existingPosts.filter((post: { id: number; }) => post.id !== id);
        fs.writeFileSync(filePath, JSON.stringify(updatedPosts));
    } catch (err) {
        console.error('Erro ao excluir postagem:', err);
    }
};

export const updatePost = async (id: number, name: string, email: string) => {
    try {
        const existingPosts = await getPosts();
        const updatedPosts = existingPosts.map((post: { id: number; }) => {
            if (post.id === id) {
                return { ...post, name, email };
            } else {
                return post;
            }
        });
        fs.writeFileSync(filePath, JSON.stringify(updatedPosts));
    } catch (err) {
        console.error('Erro ao atualizar postagem:', err);
    }
};

export const getById = async (id: number) => {
    try {
        const existingPosts = await getPosts();
        const post = existingPosts.find((post: { id: number; }) => post.id === id);
        return post;
    } catch (err) {
        console.error('Erro ao buscar postagem por ID:', err);
        return null;
    }
};