import { Fragment, useEffect } from "react"
import fs from 'fs/promises'
import path from 'path'

function ProductDetailPage(props) {
   const {loadedProduct} = props

   if (!loadedProduct){
    return <p>Loading...</p>
   }

    return (
        <Fragment>
            <h1>{loadedProduct.title}</h1>
            <p>{loadedProduct.description}</p>
        </Fragment>
    )
}

// export async function getData(){
//     const filePath = path.join(process.cwd(), 'data', 'dummy-data.json')
//     const jsonData = await fs.readFile(filePath)
//     const data = JSON.parse(jsonData)
//     return data 
// } //não consigo usar o fs fora de getStaticProps e getStatisPaths

export async function getStaticProps(context){ //essa vai ser chamada antes do deployment quando a aplicação buildar

    const {params} =context;
    const productId = params.pid;
    const filePath = path.join(process.cwd(), 'data', 'dummy-data.json')
    const jsonData = await fs.readFile(filePath)
    const data = JSON.parse(jsonData)
    const product = data.products.find(product => product.id ===productId)
    if (!product){
        return {notFound:true}
    }
    return {
        props:{
            loadedProduct: product
        }
    }
}

export async function getStaticPaths(){
    const filePath = path.join(process.cwd(), 'data', 'dummy-data.json')
    const jsonData = await fs.readFile(filePath)
    const data = JSON.parse(jsonData)
    const ids = data.products.map(product=>product.id)
    const pathsWithParams = ids.map(id=> ({params:{pid:id}}))
    return {
        paths:pathsWithParams,
        fallback:true
        //fallback: 'blocking' //aí não precisa do 'loading...'
       //fallback:true //even ids that the paramaters are not here to paths, can be valid when the page is loades 
    }
}

export default ProductDetailPage