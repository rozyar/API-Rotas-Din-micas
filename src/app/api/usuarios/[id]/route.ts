import { NextResponse } from "next/server";
import { deletePost, getById, updatePost } from "../../../../../lib/data";

export const GET = async (req: Request, res: Response) => {
    //get a post by id
    try{
        const id = req.url.split("usuarios/")[1];
        const post = await getById(parseInt(id));
        if (!post){
            return NextResponse.json({ message: "Post not found"}, { status: 404 });
        }
        return NextResponse.json({ message: "OK", post}, { status: 200 });

    }catch(err){
        return NextResponse.json({ messsage: "A CASA CAIU MENOR", err}, { status: 500 });
    }

}

export const PUT = async (req: Request, res: Response) => {
    const id = parseInt(req.url.split("usuarios/")[1]);
    const { name, email } = await req.json()
    try{
        await updatePost(id, name, email);
        let post = await getById(id);
        return NextResponse.json({ message: "OK", post}, { status: 200 });
    }catch(err){
        return NextResponse.json("Error", { status: 500 });
    }
    //update a post by id
}

export const DELETE = async (req: Request, res: Response) => {
    const id = parseInt(req.url.split("usuarios/")[1]);
    try{
        let post = await getById(id);
        if(!post){
            return NextResponse.json({ message: "Post not found"}, { status: 404 });
        }
        await deletePost(id);
        return NextResponse.json({ message: "OK", post}, { status: 200 });
    }catch(err){
        return NextResponse.json("Error", { status: 500 });
    }
    
}