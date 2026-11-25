import cartModel from "../model/cart.model.js";
import productModel from "../model/products.model.js";

export const cartContoller = async (req, res) => {
  try {
    const { productId, size, quantity } = req.body;

    if(!productId){
        return res.status(400).json({
            success:false,
            message:'productId is must'
        })
    }

    const product = await productModel.findById(productId);
    console.log('product id is--->', product._id.toString())
    if (!product) {
      return res.status(400).json({
        success: false,
        message: "product not found",
      });
    }

    
    const selectedVariant = product.variants.find(
      (variant) => variant.size === size,
    );

    if (!selectedVariant) {
      return res.status(400).json({
        success: false,
        message: "Invalid size",
      });
    }

    if (quantity > selectedVariant.stock) {
      return res.status(400).json({
        success: false,
        message: "Insufficient stock",
      });
    }

    const cart = await cartModel.create({
      
      user: req.user.id,
      items:[
        {
            productId,
      size ,
      quantity ,
        }
      ]
    });



    return res.status(201).json({
      success: true,
      message: "cart added successfully",
      items:[
        {
            title: product.title,
            description : product.description
        }
      ]
    });
  } catch (error) {
    console.log("error in the cart controller", error);
  }
};
