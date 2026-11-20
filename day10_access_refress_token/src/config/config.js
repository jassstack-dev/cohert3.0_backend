import dotenv from 'dotenv'
dotenv.config()

const config = ()=>{

    const port = process.env.PORT
    const mongo_uri = process.env.MONGO_URI
    const access_key = process.env.ACCESS_SECRET_KEY
    const refress_key = process.env.REFRESS_SECRET_KEY



    return {
        port, mongo_uri, access_key, refress_key
    }


}


export default config