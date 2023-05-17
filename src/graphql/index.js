const { ApolloServer } = require('apollo-server-express')
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core');
const { loadFiles } = require('@graphql-tools/load-files');
const { buildContext } = require('graphql-passport')
const {typeDefs: scalarTypeDefs, resolvers: scalarResolvers} = require('graphql-scalars')

const resolvers = require('./resolvers/resolvers');


const useGraphql = async (app) => {
  const typeDefs = [
    ...await loadFiles('./src/**/*.graphql'),
    scalarTypeDefs,
  ]
  const allResolvers = [
    resolvers,
    scalarResolvers,
  ]
  const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: allResolvers,
    playground: true,
    plugins: [
      ApolloServerPluginLandingPageGraphQLPlayground
    ],
    context: ({req, res}) => buildContext({req, res}),
  });
  // Starts running
  await server.start();

  // Attach to the current node app
  server.applyMiddleware({app});
};

module.exports = useGraphql;
