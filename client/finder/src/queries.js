import {gql} from 'apollo-boost';

const getFriendsQuery = gql`
    query($id: String){
        friends(uid: $id) {
            name
            graphqlID
        }
    }
`
const getFriendDetailsQuery = gql`
    query($id: String){
        friendDetails(id: $id) {
            name
            city
            state
            notes
        }
    }
`

const addFriendMutation = gql`
    mutation($uid: String!, $name: String!, $city: String!, $state: String!, $notes: String!) {
        addFriend(
            uid:$uid,
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