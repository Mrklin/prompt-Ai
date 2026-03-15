import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

//GET(read)
export const GET = async (request,{params}) => {
    try {
        await connectToDB();

        // NEXT 15/16 FIX: await params
        const {id} = await params

        const prompt = await Prompt.findById(id).populate('creator')

        if(!prompt) return new Response('Prompt not found', {status: 404})

        return new Response(JSON.stringify(prompt), {status: 200})
    } catch (error) {
        return new Response('Failed to fetch prompt', {status: 500})
    }
}

//PATCH(update)
export const PATCH = async (request, {params}) => {
    const {prompt, tag} = await request.json();
    try {
        await connectToDB();

        const { id } = await params;

        const exixtingPrompt = await Prompt.findById(id);
        if(!exixtingPrompt) return new Response('Prompt not found', {status: 404})

        exixtingPrompt.prompt = prompt;
        exixtingPrompt.tag = tag;

        await exixtingPrompt.save();

        return new Response(JSON.stringify(prompt), {status: 200})
    } catch (error) {
        return new Response("Error updating prompt", {status: 500})
    }
}


//DELETE(delete)
export const DELETE = async (request,{params}) => {
    try {
        await connectToDB();

        const { id } = await params;

        await Prompt.findByIdAndDelete(id);

        return new Response('Prompt deleted successfully', {status: 200})
    } catch (error) {
         return new Response('Error deleting prompt', {status: 500})
    }
}