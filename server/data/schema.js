import { makeExecutableSchema } from 'graphql-tools';
import { resolvers } from './resolvers';


const typeDefs = `
    type User {
        id: ID
        email: String!
        password: String
        firstName: String
        lastName: String
        lastConnection: String

    }

    type Client {
        id: ID!
        dateOfBirth: String
        phoneNumber: String
        gender: Gender
    }

    type Establishment {
        id: ID!
        name: String
        phoneNumber: String
        establishmentType: EstablishmentType
        services: [Service]
        address: String
    }

    type Service {
        id: ID!
        name: String
        phoneNumber: String
    }

    type Appointment {
        id: ID!
        date: String
        startHour: String
        endHour: String
        client: Client
        service: Service
        state: State
    }

    enum EstablishmentType {
        PRIVEE
        PUBLIQUE
        CLINIQUE
    }

    enum State {
        "IN PROGRESS"
        EXPIRED
        CANCELED
        PROCESSED
    }

    type Friend {
        id: ID
        firstName: String
        lastName: String
        gender: Gender
        age: Int
        language: String
        emails: String
        contacts: [Contact]
    }

    type Contact {
        firstName: String
        lastName: String
    }

    type Email {
        email: String
    }

    enum Gender {
        MALE
        FEMALE
        OTHER
    }

    type Query {
        getOneFriend(id: ID!): Friend
        getFriends: [Friend]
        getOneUser(email: String!): User
        getUsers: [User]
    }

    input FriendInput {
        id: ID
        firstName: String!
        lastName: String
        gender: Gender
        age: Int
        language: String
        emails: String
        contacts: [ContactInput]
    }

    input ContactInput {
        firstName: String
        lastName: String
    }

    input UserInput {
        id: ID
        email: String!
        password: String
        firstName: String
        lastName: String
        lastConnection: String
    }

    type Mutation {
        createFriend(input: FriendInput): Friend
        updateFriend(input: FriendInput): Friend
        deleteFriend(id: ID!): String
        createUser(input: UserInput): User
        updateUser(input: UserInput): User
        deleteUser(email: String!): String
    }
`;

const schema = makeExecutableSchema({ typeDefs, resolvers})
export { schema };