export const typeDefs = `

type Channel {
    id: ID!
    name: String
}

# This type specifies entry point in our API
type Query {
    channels: [Channel]
}
`;