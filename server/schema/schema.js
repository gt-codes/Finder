const graphl = require('graphql');
const firebase = require('../../client/finder/src/firebaseConfig');
var db = firebase.firestore();

const { 
    GraphQLObjectType, 
    GraphQLInt, 
    GraphQLID, 
    GraphQLString, 
    GraphQLSchema, 
    GraphQLList 
} = graphl;

const friends = [
    {id:'1',name:'Garrett Tolbert',location:'Tallahassee, FL', notes:'Met at birth'},
    {id:'2',name:'Devyn Allen',location:'Prairie View, TX', notes:'Met at Texh Exchange'},
    {id:'3',name:'Kiara Kabbara',location:'Austin, TX', notes:'Met through Devyn. UT Scholar'},
]
const locations = [
    {id:'1',city:'Tallahassee',state:'FL',users:[]},
    {id:'2',city:'Prairie View',state:'TX',users:[]},
    {id:'3',city:'Austin',state:'TX',users:[]},
]

const FriendType = new GraphQLObjectType({
    name: 'Friend',
    description: 'A regular user in the app',
    fields: () => ({
        name: { type: GraphQLString },
        city: { type: GraphQLString },
        state: { type: GraphQLString },
        location: { 
            type: LocationType,
            resolve(parent, args) {
                // return locations.find(location => location.city === parent.location.split(', ')[0])
                
            }
        },
        notes: { type: GraphQLString }
    })
});

const LocationType = new GraphQLObjectType({
    name: 'Location',
    description: 'A place(city) where users are located',
    fields: () => ({
        city: { type: GraphQLString },
        state: { type: GraphQLString },
        users: { 
            type: GraphQLList(FriendType),
            resolve(parent, args) {
                return friends.filter(friend => friend.location.includes(parent.state))
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    description:'Top level query',
    fields: {
        friendsByCity: {
            type: GraphQLList(FriendType),
            args: { city: {type: GraphQLString} },
            resolve(parent, args) { //code to get data from db
                // return friends.find(friend => friend.id === args.id)
                return queryFriendsByCity(args.city)
            }
        },
        friendsByState: {
            type: GraphQLList(FriendType),
            args: { state: {type: GraphQLString} },
            resolve(parent, args) { //code to get data from db
                // return friends.find(friend => friend.id === args.id)
                return queryFriendsByState(args.state)
            }
        },
        friends: {
            type: GraphQLList(FriendType),
            resolve(parent, args) {
                return getFriend('');
            }
        },
        // location: {
        //     type: LocationType,
        //     args: { state: {type: GraphQLString} },
        //     resolve(parent, args) {
        //         return locations.find(location => location.state === args.state)
        //     }
        // },
        locations: {
            type: GraphQLList(LocationType),
            resolve(parent, args) { // get unique locations              
                return getLocations()
            }
        },
    }
});
const getLocations = async() => {
    let newdata = await db.collection("Locations").get().then((querySnapshot) => {
        let data = []
        querySnapshot.forEach((doc) => {
            data = [...data,doc.data()]
        });
        return data;  
    })
    return newdata;
}

const queryFriendsByCity = async(city) => {    
    let newdata = await db.collection("Users").where('city','==',city).get().then((querySnapshot) => {
        let data = []
        querySnapshot.forEach((doc) => {
            data = [...data,doc.data()]
        });
        return data;
    }) 
    return newdata  
}
const queryFriendsByState = async(state) => {    
    let newdata = await db.collection("Users").where('state','==',state).get().then((querySnapshot) => {
        let data = []
        querySnapshot.forEach((doc) => {
            data = [...data,doc.data()]
        });
        return data;
    }) 
    return newdata  
}
const getFriend = async(id) => {
    let newdata;
    if(id === '') {
        newdata = await db.collection("Users").get().then((querySnapshot) => {
            let data = []
            querySnapshot.forEach((doc) => {
                data = [...data,doc.data()]
            });
            return data;  
        })
    } else {
        newdata = await db.collection("Users").doc(id).get().then((doc) => {
            if(doc.exists) {
                let data = {}
                data = doc.data(); 
                return data        
            }       
        })        
    }    
    return newdata  
}


const addFriend = async({name,city,state,notes}) => {  
    let docRef = await db.collection("Users").add({ 
        name, 
        city, 
        state,
        notes,
        timestamp: Date.now()
    })
    return getFriend(docRef.id);
}
const addLocation = async({city,state}) => {  
    let docRef = await db.collection("Locations").add({ 
        city, 
        state, 
        timestamp: Date.now()
    })
    let newdata = await db.collection("Locations").doc(docRef.id).get().then((doc) => {
        if(doc.exists) {
            let data = {}
            data = doc.data(); 
            return data        
        }       
    }) 
    return newdata;
}


const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    description: 'All Mutations',
    fields: {
        addFriend: {
            type: FriendType,
            args: {
                name: {type: GraphQLString},
                city: {type: GraphQLString},
                state: {type: GraphQLString},
                notes: {type: GraphQLString}
            },
            resolve(parent, args) { // store new instance in db
                return addFriend(args);
            }
        },
        addLocation: {
            type: LocationType,
            args: {
                city: { type: GraphQLString },
                state: { type: GraphQLString },
            },
            resolve(parent, args) { // store new instance in db
                return addLocation(args);
            }
        }
    }
});

module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation });