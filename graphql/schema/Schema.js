var { GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLInt, GraphQLSchema, GraphQLList } = require('graphql');
var mockDB = require('./mockDB')

const wordCell = new GraphQLObjectType({
  name: 'WordCell',
  fields: () => ({
    index: { type: GraphQLInt, description: 'Index of cell.' },
    word: { type: GraphQLString, description: 'Word that populates cell'},
    type: { type: GraphQLString, description: 'Team, Civilian, Assassin'},
    isEnabled: { type: GraphQLBoolean, description: 'returns false if selected by user, true otherwise.' },
  })
})

var queryType = new GraphQLObjectType({
  /* To query all cells: 

    { 
      wordCell {
        index
        word
        type
        isEnabled
      }
    }

    To query a single cell:

    { 
      wordCell(index: 1) {
        index
        word
        type
        isEnabled
      }
    }
*/

  name: 'Query',
  fields: {
    wordCell: {
      type: new GraphQLList(wordCell),
      args: {
        index: { type: GraphQLInt}
      },
      resolve: function (_, args) {
        // Must always return an array, wrap a single query in an array.
        // 0 is falsey, so need extra condition in ternary
        return (args.index || args.index == 0) ? [mockDB[args.index]] : mockDB;
      }
    }
  } 
})

var schema = new GraphQLSchema({ query: queryType });

module.exports = schema
