const multerController =   (req,res)=>{
    try {

        const body = req.body
        const file = req.file
        console.log(file)
        console.log(body)
       

    res.status(200).json({
        message: 'file created successfyully',
     
        body: body
    })
        
    } catch (error) {
        console.log('error in the multer routes', error)
    }
}

module.exports = {multerController}
