 var { GraphQLObjectType, GraphQLString, GraphQLBoolean } = require('graphql');


const wordCell = new GraphQLObjectType({
  name: 'WordCell',
  fields: () => ({
    word: { type: GraphQLString, description: 'Word that populates cell'},
    type: { type: GraphQLString, description: 'Team, Civilian, Assassin'},
    isEnabled: { type: GraphQLBoolean, description: 'returns false if selected by user, true otherwise.' },
  })
})

module.exports = wordCell
