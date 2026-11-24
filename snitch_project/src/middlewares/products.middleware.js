export const sellerMiddleware = (req, res, next) => {

    const { userId, role } = req.user;

    console.log(role);

    if (role !== 'seller') {
        return res.status(403).json({
            message: 'User account is not the seller account'
        });
    }

    next();

}

export const convertStringtoObject = (req,res, next)=>{

     try {
        const { price, variety } = req.body;

        req.body.price = JSON.parse(price);
        req.body.variety = JSON.parse(variety)

        next();
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Invalid price format"
        });
    }
}