const { ApolloServer, gql } = require('apollo-server');

const typeDefs = `
  interface ScheduleItem {
    name: String!
    start: Int
    end: Int
  }

  type StudyGroup implements ScheduleItem {
    name: String!
    start: Int
    end: Int
    subject: String!
    students: Int!
  }

  type Workout implements ScheduleItem {
    name: String!
    start: Int
    end: Int
    reps: Int!
  }

  type Query {
    agenda: [ScheduleItem!]!
  }    
`;

const resolvers = {
  Query: {
    agenda: (root, args, context) => [
      {
        name: 'Comp Sci',
        subject: 'Computer Science',
        students: 12,
        start: 1,
        end: 2
      },
      { name: 'Cardio', reps: 100 },
      { name: 'Poets', subject: 'English 101', students: 3 },
      { name: 'Math Wiz', subject: 'Mathematics', students: 12 },
      { name: 'Upper Body', reps: 10, start: 10, end: 11 },
      { name: 'Lower Body', reps: 20 }
    ]
  },
  ScheduleItem: {
    __resolveType: (root) => (root.reps ? 'Workout' : 'StudyGroup')
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
