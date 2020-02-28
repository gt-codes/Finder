import {gql} from 'apollo-boost';

const getFriendsQuery = gql`
    {
        friends {
            graphqlID
            name
            city
            state
            notes
        }
    }
`
const getFriendDetailsQuery = gql`
    query($id: String!){
        friendDetails(id: $id) {
            name
            city
            state
            notes
        }
    }
`

const addFriendMutation = gql`
    mutation($name: String!, $city: String!, $state: String!, $notes: String!) {
        addFriend(
            name:$name,
            city:$city,
            state:$state,
            notes:$notes
        ) {
            name
        }
    }
`

export {getFriendsQuery, getFriendDetailsQuery, addFriendMutation};