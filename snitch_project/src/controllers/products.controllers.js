import productModel from "../model/products.model.js";
import { imageUrlProvider } from "../services/storage.services.js";

export const createProductsController = async (req, res) => {
  const files = req.files;
  const { title, description, price, variants } = req.body;

  const imageUrls = [];

  for (let i = 0; i < files.length; i++) {
    const result = await imageUrlProvider(
      files[i].buffer,
      files[i].originalname,
    );

    imageUrls.push(result.url);
  }

  // console.log(imageUrls)

  const product = await productModel.create({
    title: title,
    description: description,
    price: price,
    variants: variants,
    images: imageUrls,
    seller: req.user._id,
  });

  return res.status(200).json({
    message: "product list successfully",
    product
  });
};

export const listedProductsController = async (req, res) => {
    try {
        const products = await productModel.find({});

        return res.status(200).json({
            success: true,
            message: "All products fetched successfully",
            products
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
