const findAll = async (req, res) => {
    const Lite = await req.context.models.Line_items.findAll(
        {
            include: [{
                all: true
            }]
        }
    );
    return res.send(Lite);
}
const findOne = async (req, res) => {
    const Lite = await req.context.models.Line_items.findOne({
        where: { lite_id: req.params.id },
        include: [{
            all: true
        }]

    });
    return res.send(Lite);
}

const createlite = async (req, res) => {
    
    try {
        let {lite_qty} = req.body
        const cart = req.cart
        const products = req.products 
        const lite_price = parseInt(products.prod_price) * lite_qty 
        const item = await req.context.models.Line_items.create(
            {
                lite_qty: req.body.lite_qty,
                lite_status: 'cart',
                lite_prod_id: products.prod_id,
                lite_shop_id: cart.shop_id,
                lite_price: lite_price 

            },
        )
        return res.send(item)
    } catch (error) {
        console.log(error)
        return res.send(error);
    }
}
const update1 = async (req, res) => {
    const { item } = req.data;
    const orders = req.order

    for (let x of item) {
        await req.context.models.Line_items.update(
            {
                lite_status: "checkout",
                lite_order_name: orders.order_name,
            },
            { returning: true, where: { lite_id: x.lite_id } }
        );
    }

    res.send(req.order);
}

const Delete = async (req,res) =>{
    try {
        const lite = await req.context.models.Line_items.destroy({
            where:{lite_id:req.params.id}
        })
    } catch (error) {
        return res.status(500).json({ message:"Find error " + error })
    }
}

export default {
    createlite,
    findAll,
    findOne,
    update1,
    Delete
}