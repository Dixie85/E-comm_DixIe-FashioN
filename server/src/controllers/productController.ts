import asyncHandler from 'express-async-handler'
import { connect, close } from '../../db/mongo.config';
import { IProduct, IProductSizes } from '../interfaces/interfaces';
import { Product } from '../models/Products';

// @desc Get all products
// @route GET /product
// @access Private
export const getAllProducts = asyncHandler(async (_req, res): Promise<any> => {
    // Get all products from MongoDB
    const product = await connect(() => Product.find().select("-__v").lean().exec()) as IProduct[]
    close()
    // If no products 
    if (!product?.length) {
        return res.status(400).json({ message: 'No products found' })
    }
    res.json(product)
})

// @desc Create new product
// @route POST /product
// @access Private
export const createNewProduct = asyncHandler(async (req, res): Promise<any> => {
    const { price, category, name, brand, gender, stock,  size, description, image  } = req.body

    // Confirm data
    if (!price || !category || !name || !brand || !gender || !stock ||  !size || !description || !image) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Check if product name exists 
    const duplicateProductName = await connect(() => Product.findOne({ name }).lean().exec()) as IProduct
    console.log({duplicateProductName});
    if (duplicateProductName) {
        close()
        return res.status(409).json({ message: 'Product with this name already exists' })
    }
    
    const productObject = { ...req.body }

    // Create new product 
    const product = await connect(() => Product.create(productObject)) as IProduct
    close()
    console.log({product});

    if (product) { //created 
        res.status(201).json({ message: `New product successfully created` })
    } else {
        res.status(400).json({ message: 'Invalid product data received' })
    }
})


// @desc Delete a product
// @route DELETE /product
// @access Private
export const deleteProduct = asyncHandler(async (req, res): Promise<any> => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Product ID Required' })
    }

    // Does the product exist to delete?
    const product = await connect(() => Product.findById(id).exec())

    if (!product) {
      close()
        return res.status(400).json({ message: 'Product not found' })
    }

    const result = await product.deleteOne()

    const reply = `Productname ${result.name} deleted`
    close()
    res.json(reply)
})


// @desc Substruct from product stock
// @route POST /product/deductsize
// @access Private
export const deductStock = asyncHandler(async (req, res): Promise<any> => {
    const { id, sizes } = req.body
    const sizesEntries = Object.entries(sizes as IProductSizes)
    let stock = 0;

    // Confirm data
    if ( !id || !sizes ) {
        return res.status(400).json({ message: 'All fields are required' })
    }
    // Find product
    const product = await connect(() => Product.findById(id).select("-__v").exec())

    // Iterating through all provided sizes and substructing quantity
    for(const s of sizesEntries) {
        // product.size.$inc('xs', 2)
        const quantityCheck = product.size[s[0]] -= s[1]
        if(quantityCheck < 0) {
            close()
            return res.status(400).json({ message: `Sonething went wrong ${product.name} is out of stock` })
        }
        stock += quantityCheck
    }

    // Seting the tottal stock 
    product.stock = stock

    await product.save()

    close()
    res.status(201).json(product)
})


// @desc Add to product stock
// @route POST /product/addsize
// @access Private
export const addStock = asyncHandler(async (req, res): Promise<any> => {
    const { id, sizes } = req.body
    const sizesEntries = Object.entries(sizes as IProductSizes)
    let stock = 0;

    // Confirm data
    if ( !id || !sizes ) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Find product
    const product = await connect(() => Product.findById(id).select("-__v").exec())

    // Iterating through all provided sizes and adding quantity
    for(const s of sizesEntries) {
        const quantity = product.size[s[0]] += s[1]       
        stock += quantity
    }

    // Seting the tottal stock 
    product.stock = stock

    await product.save()

    close()
    res.status(201).json(product)
})