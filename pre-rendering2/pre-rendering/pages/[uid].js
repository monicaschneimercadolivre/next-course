function UserIdPage(props){
    return <h1>{props.id}</h1>
}

export default UserIdPage


export async function getServerSideProps(context){ //it runs on the server anyways - there are no pre generated pages here
    const {params} =context
    const userId = params.uid
    console.log('server side running')
    return {
        props:{
            id:'userid-' + userId
        }
    }
}