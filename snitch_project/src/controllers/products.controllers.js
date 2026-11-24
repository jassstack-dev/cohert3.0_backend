export const createProductsController = (req, res) => {

    const file = req.files
    const body = req.body

    console.log(file)
    console.log(body)

    return res.status(200).json({
        message: 'All okay, you are a seller'
    });
}