import { useEffect } from "react"
import axios from "axios"
import { useState } from "react"

const Products = ({surface_name}) => {

    const [productData, setProductData] = useState([])

    const getProduct = async() => {

            // const response = await axios.get(`/get_products/${surface_name}/`)
            // const data = response.data

            // setProductData(data[0])
        
        }

    useEffect(() => {
        
        // getProduct()

    }, [surface_name])

    return ( 
        <div className="banner">
            {/* {productData.title ? <h2>{productData.title}</h2> : <h2>{surface_name} cleaner</h2>} */}
            {/* <img src={productData.thumbnail} alt="item" /> */}
            {/* <a href={productData.link} target="_blank"><h2>Product Info Link</h2></a> */}
        </div>
     );
}
 
export default Products;