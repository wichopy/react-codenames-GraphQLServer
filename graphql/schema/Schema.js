var { GraphQLObjectType, GraphQLInputObjectType, GraphQLString, GraphQLBoolean, GraphQLInt, GraphQLSchema, GraphQLList } = require('graphql');

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

const newWordCell = new GraphQLInputObjectType({
  name: 'newWordCell',
  fields: () => ({
    index: { type: GraphQLInt, description: 'Index of cell.' },
    word: { type: GraphQLString, description: 'Word that populates cell'},
    type: { type: GraphQLString, description: 'Team, Civilian, Assassin'},
    isEnabled: { type: GraphQLBoolean, description: 'returns false if selected by user, true otherwise.' },
  })
})


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

var queryType = new GraphQLObjectType({
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

//https://medium.com/the-graphqlhub/your-first-graphql-server-3c766ab4f0a2
//http://davidandsuzi.com/writing-a-basic-api-with-graphql/
var mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    updateCell: {
      type: wordCell,
      description: 'Update individual cell in grid.',
      args: {
        newCell: { type: newWordCell }
      },
      resolve: function(_, args) {
        var indexToReplace = mockDB.find(function(element, index) {
          if (element.index == args.newCell.index) {
            return element
          }
        })
        mockDB[indexToReplace.index] = args.newCell
        return mockDB[indexToReplace.index]
      }
    }
  }
})

var schema = new GraphQLSchema({ 
  query: queryType,
  mutation: mutationType
});

module.exports = schema
