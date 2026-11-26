import cartModel from "../model/cart.model.js";
import productModel from "../model/products.model.js";

export const cartContoller = async (req, res) => {
  try {
    const { productId, size, quantity = 1 } = req.body;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "productId is must",
      });
    }

    const product = await productModel.findById(productId);

    if (!product) {
      return res.status(400).json({
        success: false,
        message: "product not found",
      });
    }

    console.log("product id is--->", product._id.toString());

    const selectedVariant = product.variants.find(
      (variant) => variant.size === size,
    );

    if (!selectedVariant) {
      return res.status(400).json({
        success: false,
        message: "Invalid size",
      });
    }

    // Find existing user cart
    let cart = await cartModel.findOne({
      user: req.user.id,
    });

    // If cart doesn't exist
    if (!cart) {
      if (quantity > selectedVariant.stock) {
        return res.status(400).json({
          success: false,
          message: "Insufficient stock",
        });
      }

      cart = await cartModel.create({
        user: req.user.id,
        items: [
          {
            productId,
            size,
            quantity,
          },
        ],
      });

      return res.status(201).json({
        success: true,
        message: "Product added to cart successfully",
        cart,
      });
    }

    // Find same product with same size
    const existingItem = cart.items.find((item) => {
      return item.productId.toString() === productId && item.size === size;
    });

    // If product and size already exist
    if (existingItem) {
      const updatedQuantity = existingItem.quantity + quantity;

      // Check stock according to updated quantity
      if (updatedQuantity > selectedVariant.stock) {
        return res.status(400).json({
          success: false,
          message: `Only ${selectedVariant.stock} items available in stock`,
        });
      }

      existingItem.quantity = updatedQuantity;
    } else {
      // If different size or different product
      if (quantity > selectedVariant.stock) {
        return res.status(400).json({
          success: false,
          message: "Insufficient stock",
        });
      }

      cart.items.push({
        productId,
        size,
        quantity,
      });
    }

    // Save cart
    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Cart updated successfully",
      cart,
    });
  } catch (error) {
    console.log("Error in cart controller:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


// get cart
export const getCartController = async (req,res)=>{

    const cart = await cartModel.find({})

    if(!cart){
        return res.status(400).json({
            success:false,
            message:'items not available in the cart'
        })
    }

    return res.status(200).json({
        success:true,
        message:'cart found successfully',
        cart
    })


    
}

/*
@Delete /api/cart/:id
*/

export const clearCartController = async (req, res) => {
  try {
    const { itemId } = req.params;

    const cart = await cartModel.findByIdAndDelete(itemId);

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Cart deleted successfully",
      cart,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// increaseCartQuantiyController

export const increaseCartQuantiyController = async (req, res) => {
  try {
    const { itemId } = req.params;

    const cart = await cartModel.findOne({
       user: req.user.id
    });

    if(!cart){
        return res.status(400).json({
            success:false,
            message: 'cart not found '
        })
    }

    const item = cart.items.find((val) => {
      return val._id.toString() === itemId;
    });

    if(!item){
        return res.status(400).json({
            success:false,
            message: 'items not available in the cart'
        })
    }

    if (item.quantity >= 1) {
      item.quantity += 1;
    }

    await cart.save();

    return res.status(200).json({
      success: true,
      message: "cart quantity added successfully",
      item,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "internal server errro in increase cart quantity",
    });
  }
};

// decreaseCartQuantityController
export const decreaseCartQuantityController = async (req, res) => {
 try {

     const { itemId } = req.params;
  console.log(itemId);

  const cart = await cartModel.findOne({
     user: req.user.id
  });

  console.log(cart);

  if (!cart) {
    return res.status(400).json({
      success: false,
      message: "item not found",
    });
  }

  const item = cart.items.find((item) => {
    return item._id.toString() === itemId;
  });

  if (!item) {
    return res.status(200).json({
      success: false,
      message: "item not available in the cart",
    });
  }

  if (item.quantity > 1) {
    item.quantity -= 1;
  } else {
    cart.items.pull({ _id: itemId });
  }

  

  await cart.save();

  res.status(200).json({
    success: true,
    message: "Cart quantity updated successfully",
    user: req.user.id,
    item,
  });
    
 } catch (error) {
    return res.status(500).json({
        success:false,
        message: 'internal  server error in the decrease cart quantity'
    })
 }
};
