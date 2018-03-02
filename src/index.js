const { GraphQLServer } = require('graphql-yoga')
const fetch = require('node-fetch');

const typeDefs = `
  type Query {
    hello(name: String): String
    posts: [posts!]
    comments: [comments!]
    albums: [albums!]
    photos: [photos!]
    todos: [todos!]
    users(id: Int): [users!]
  }

  type posts{
    userId: Int!
    id: ID
    title: String!
    body: String!
  }

  type comments{
    userId: Int!
    id: ID
    name: String!
    email: String!
    body: String!
  }

  type albums{
    userId: Int!
    id: ID
    title: String!
  }

  type photos{
    albumId: Int!
    id: ID
    title: String!
    url: String!
    thumbnailUrl: String!
  }

  type todos{
    userId: Int!
    id: ID
    title: String!
    completed: String!
  }

  type users{
    id: ID
    name: String!
    username: String!
    email: String!
    address: Address
    phone: String!
    website: String!
    company: Company
  }

  type Address{
    street: String!
    suite: String!
    city: String!
    zipcode: String!
    geo: Geo
  }

  type Geo{
    lat: Float,
    lnt: Float,
  }

  type Company{
    name: String!
    catchPhrase: String!
    bs: String!
  }
`

const opts = {
  port: 4000 //configurable port no
}

const resolvers = {
  Query: {
    hello: (_, { name }) => {
      const returnValue = !name ? `Hello ${name || 'World!'}` : null
      return returnValue
    },
    posts: () => {
      return fetch('http://jsonplaceholder.typicode.com/posts').then((data) => {
        return data.json()
      })
    },
    comments: () => {
      return fetch('http://jsonplaceholder.typicode.com/comments').then((data) => {
        return data.json()
      })
    },
    albums: () => {
      return fetch('http://jsonplaceholder.typicode.com/albums').then((data) => {
        return data.json()
      })
    },
    photos: () => {
      return fetch('http://jsonplaceholder.typicode.com/photos').then((data) => {
        return data.json()
      })
    },
    todos: () => {
      return fetch('http://jsonplaceholder.typicode.com/todos').then((data) => {
        return data.json()
      })
    },
    users: (_, { id }) => {
      if (id) {
        return fetch('http://jsonplaceholder.typicode.com/users/' + id.toString()).then((data) => {
          return [data.json()]
        })
      } else {
        return fetch('http://jsonplaceholder.typicode.com/users').then((data) => {
          return data.json()
        })
      }
    },
  },
}

const server = new GraphQLServer({ typeDefs, resolvers, opts })
server.start(() => console.log(`Server is running at http://localhost:${opts.port}`))