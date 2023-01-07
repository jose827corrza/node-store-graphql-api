const { ApolloServer } = require('apollo-server-express')
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core');

const typeDefs = `
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'hola mundito 7w7'
  }
}

const useGraphql = async (app) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: true,
    plugins: [
      ApolloServerPluginLandingPageGraphQLPlayground
    ]
  });
  // Starts running
  await server.start();

  // Attach to the current node app
  server.applyMiddleware({app});
};

module.exports = useGraphql;
