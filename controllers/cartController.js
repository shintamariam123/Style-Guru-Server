const cartItems = require('../models/cartModel')

//add to cart
exports.addToCart = async (req, res) => {
    const { id, title, price, image, quantity } = req.body
    const userId = req.payload
    try {
        const existingProduct = await cartItems.findOne({ id, userId })
        if (existingProduct) {
            existingProduct.quantity += 1
            existingProduct.totalPrice = existingProduct.quantity * existingProduct.price
            await existingProduct.save()
            res.status(406).json("Items added to Cart...")
        } else {
            const newProduct = cartItems({
                id, title, price, image, quantity, totalPrice: price, userId
            })
            await newProduct.save()
            res.status(200).json("Item added to your cart...")
        }
    } catch (err) {
        res.status(401).json(err)
    }
}

//get cart

exports.getCart = async (req, res) => {
    const userId = req.payload

    try {
        const allProducts = await cartItems.find({ userId })
        res.status(200).json(allProducts)
    } catch (err) {
        res.status(401).json(err)
    }
}

//remove cart item

exports.removeCartItem = async (req, res) => {
    const [id] = req.params
    try {
        const removeItem = await cartItems.findByIdAndDelete({ _id: id })
        res.status(200).json(removeItem)
    } catch (err) {
        res.status(401).json(err)
    }
}

exports.incrementCartItem = async (req, res) => {
    const { id } = req.params
    try {
        const selectedProduct = await cartItems.findOne({ _id: id })
        selectedProduct.quantity += 1
        selectedProduct.totalPrice = selectedProduct.quantity * selectedProduct.price
        await selectedProduct.save()
        res.status(200).json(selectedProduct)

    } catch (err) {
        res.status(401).json(err)

    }
}

exports.decrementCartItem = async (req, res) => {
    const { id } = req.params
    try {
        const selectedProduct = await cartItems.findOne({ _id: id })
        selectedProduct.quantity -= 1
        if (selectedProduct.quantity == 0) {
            await cartItems.deleteOne({ _id: id })
            res.status(200).json("Quantity removed")
        } else {
            selectedProduct.totalPrice = selectedProduct.quantity * selectedProduct.price
            await selectedProduct.save()
            res.status(200).json(selectedProduct)

        }

    } catch (err) {
        res.status(401).json(err)

    }
}

//empty cart

exports.emptyCart = async(req,res)=>{
    const userId = req.payload
    try{
      const result = await cartItems.deleteMany({userId})
   res.status(200).json("All Items removed successfully!!!")
    }catch(err){
res.status(401).json(err)
    }
}