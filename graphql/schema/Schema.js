 var { GraphQLObjectType, GraphQLString, GraphQLBoolean } = require('graphql');


var wordCell = new GraphQLObjectType({
  name: 'WordCell',
  fields: {
    word: { type: GraphQLString},
    type: { type: GraphQLString},
    isEnabled: { type: GraphQLBooolean },
    
  }
})
