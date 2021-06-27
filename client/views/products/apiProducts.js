import axios from 'axios';

const list = async () => {
     try {
        let response = await axios.get(`/api/products`)
        return await response.data
    } catch (err) {
        return await err.message
    } 

}

const create = async (product) => {
    try {
        let response = await axios.post(`/api/products/`, product)
        return await response.data
    } catch (err) {
        return await err.response.data
    } 
}

const findOne = async (data) => {
    const id = parseInt(data)
    try {
        let response = await axios.get(`/api/products/${id}`)
        return await response.data
    } catch (err) {
        return await err.message    
    }
}

const update = async (product) => {
    const prod_id = parseInt(product.prod_id);
    try {
        let response = await axios.put(`/api/products/${prod_id}`,
        product)
        return await response.data
    } catch (err) {
        return await err.message
    }
}

const remove = async (id) => {
    try {
        let response = await axios.delete(`/api/products/${id}`)
        return await response.data
    } catch (err) {
        return res.status(400).json({error : "error when delete row"})
    }
}

export default { list, create, remove, findOne, update }