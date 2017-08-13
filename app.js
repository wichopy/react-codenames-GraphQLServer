var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var {buildSchema, GraphQLObjectType, GraphQLInt, GraphQLSchema} =require('graphql');
var graphqlHTTP = require('express-graphql');

var index = require('./routes/index');
var users = require('./routes/users');

var wordCellSchema = require ('./graphQL/schema/Schema')
var mockDB = require('./graphQL/schema/mockDB')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// GraphQL Endpoint.

var queryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    wordCell: {
      type: wordCellSchema,
      args: {
        index: { type: GraphQLInt}
      },
      resolve: function (_, {index}) {
        return mockDB[index];
      }
    }
  } 
})

var schema = new GraphQLSchema({ query: queryType });

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true,
}));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
