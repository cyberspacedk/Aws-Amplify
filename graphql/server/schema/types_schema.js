const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const Person = new GraphQLObjectType({
  name: "Person",
  description: 'Person type description',

  fields: () => ({
    id: { type: GraphQLID },
    name: { type: new GraphQLNonNull(GraphQLString) },
    age: { type: new GraphQLNonNull(GraphQLInt) },
    isMarried: { type: GraphQLBoolean },
    gpa: { type: GraphQLFloat }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  description: 'Description',
  fields: {

    person: {
      type: Person,
      resolve(parent, args) {
        let person = {
          name: undefined,
          age: 55,
          isMarried: true,
          gpa: 4.0
        }

        return person;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
