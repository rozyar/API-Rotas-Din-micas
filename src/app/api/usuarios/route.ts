import { NextResponse } from "next/server";
import { addPost, getPosts } from "../../../../lib/data";
import { Post } from "../../../../lib/data";


export const GET = async (req: Request, res: Response) => {
  try {
    const posts = await getPosts();	
    return NextResponse.json({ message: "OK", posts}, { status: 200 });
  } catch (err) {
    return NextResponse.json({ mensage: "Error", err }, { status: 500 });
  }
};

export const POST = async (req: Request, res: Response) => {
    const { name, email } = await req.json()
    try{
        const post: Post = {id:Date.now(), name, email}
        addPost(post)
        return NextResponse.json({ message: "OK", post}, { status: 201 });
    } catch(err){
        return NextResponse.json({ mensage: "Error", err }, { status: 500 });
    }
}
    
