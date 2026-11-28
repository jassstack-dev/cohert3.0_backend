import productModel from "../model/products.model.js";
import { imageUrlProvider } from "../services/storage.services.js";

export const createProductsController = async (req, res) => {
  const files = req.files;
  const { title, description, price, variants, category } = req.body;

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
    category : category,
    images: imageUrls,
    seller: req.user._id,
  });

  return res.status(200).json({
    message: "product list successfully",
    product,
  });
};

// get controller
export const listedProductsController = async (req, res) => {
  try {
    const products = await productModel.find({});

    return res.status(200).json({
      success: true,
      message: "All products fetched successfully",
      total_product : products.length,
      products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// search controller
export const searchController = async (req, res) => {
  try {
    console.log("Search controller hit");

    const { search } = req.query;

    if (!search) {
      await productModel.find({});
    }

    const product = await productModel.find({
      title: {
        $regex: search || "",
        $options: "i",
      },
    });

    return res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      totalProducts: product.length,
      product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "internal sever error in the search controller",
    });
  }
};

//search filter pagination sort

export const filterController = async (req, res) => {
 

    console.log("filter controller hit");
  try {

     const {
    search,
    category,
    minPrice,
    maxPrice,
    page = 1,
    limit = 10
  } = req.query;

 

  const pageNumber = Number(page)
  const limitNumber = Number(limit)

  

  const skip = (pageNumber - 1) * limitNumber
  

  const match = {}

  

  if(search){
    match.title ={
      $regex : search,
      $options: 'i'
    }
  }

   if(category){
    match.category = category.toLowerCase()
  }


 
  if(minPrice || maxPrice){
     match["price.amount"] = {};

    if(minPrice){
      match["price.amount"].$gte = Number(minPrice)
    }

    if(maxPrice){
      match["price.amount"].$lte = Number(maxPrice)
    }}

    

    const product = await productModel.aggregate([
      {
        $match: match
      },
      {
        $skip: skip
      },{
        $limit : limitNumber
      }
    ])

    if(product.length === 0){
      return res.status(400).json({
        success:false,
        message:'product not found'
      })
    }


    return res.status(200).json({
      success:true,
      message: 'product fetched successfully',
      count: product.length,
      page,
      limit,
      product

    })
  }
    
   catch (error) {
    return res.status(400).json({
      success:false,
      message:'error in the filter controller'
    })
  }



};
