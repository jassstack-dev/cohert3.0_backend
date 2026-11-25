import ImageKit, { toFile } from "@imagekit/nodejs";
import config from "../config/config.js";

const client = new ImageKit({
    privateKey: config.IMAGEKIT_PRIVATE_KEY
})

export const imageUrlProvider =async (imageBuffer, fileName)=>{
    try {

        const response = await client.files.upload({
            file: await toFile(imageBuffer, fileName),
            fileName : fileName

        })

        return response
        
    } catch (error) {
        console.log('error in the imagekit Provider', error)
        throw error
    }
}