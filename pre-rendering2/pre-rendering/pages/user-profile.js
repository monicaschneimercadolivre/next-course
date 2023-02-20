function UserProfilePage(props){
    return <h1>{props.username}</h1>
}

export default UserProfilePage

export async function getServerSideProps(context){ //essa vai ser chamada depois do deployment para cada incoming request
    const {params, req, res} = context
    console.log('server side running')

    return {
        props:{
            username: 'Max'
        }
    }
}