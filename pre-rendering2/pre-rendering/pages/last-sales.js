import { useEffect, useState } from "react"
import userSWR from 'swr' //a react hook

//Note: data fetching only happens on the client side

function LastSalesPage(props) {
    const [sales, setSales] = useState(props.sales); //sales from getStaticProps
    // const [isLoading, setIsLoading] = useState(false)

    const { data, error } = userSWR('https://nextjs-course-c81cc-default.rtdb.firebaseio.com/sales.json');

    useEffect(() => {
        if (data) {
            for (const key in data) {
                transformedSales.push({
                    id: key,
                    username: data[key].username,
                    volume: data[key].volume
                }) // data from each key
            }
        }
    }, [data])

    // useEffect(() => {
    //     setIsLoading(true)
    //     fetch('https://nextjs-course-c81cc-default.rtdb.firebaseio.com/sales.json')
    //     .then(response=>response.json)
    //     .then(data=>{
    //         const transformedSales=[]
    //         for(const key in data){
    //             transformedSales.push({id:key, username:data[key].username, volume:data[key].volume}) // data from each key
    //         }
    //         setSales(transformedSales)
    //         setIsLoading(false)
    //     });
    // }, [])

    if (!data && !sales) {
        return <p>Loading...</p>
    }
    if (error) {
        return <p>Failed to load.</p>
    }


    return <ul>
        {sales && sales.map(sale => (
            <li key={sale.id}>{sale.username} - ${sale.volume}</li>
        ))}
    </ul>
}

export async function getStaticProps() { //here we cant use hooks because it is not a react component
    const response = await fetch('https://nextjs-course-c81cc-default.rtdb.firebaseio.com/sales.json')
    const data = response.json

    const transformedSales = []

    for (const key in data) {
        transformedSales.push({ id: key, username: data[key].username, volume: data[key].volume }) // data from each key
    }
    return {
        props: {
            sales: transformedSales,
            revalidate: 10
        }
    };
}

export default LastSalesPage