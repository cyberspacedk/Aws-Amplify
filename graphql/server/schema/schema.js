const graphql = require('graphql');
const _ = require('lodash');

// Mongoose models
const User = require('../model/user');
const Post = require('../model/post');
const Hobby = require('../model/hobby');


const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'Documentation for user',

  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    profession: { type: GraphQLString },
    posts: {
      type: new GraphQLList(PostType),
      resolve(parent, args) {
        return Post.find({ userId: parent._id });
      }
    },
    hobbies: {
      type: new GraphQLList(HobbyType),
      resolve(parent, args) {
        return Hobby.find({ userId: parent.id });
      }
    }
  })
});

const HobbyType = new GraphQLObjectType({
  name: 'Hobby',
  description: 'Description for hobby',

  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    userId: { type: GraphQLID },
    user: {
      type: UserType,
      resolve(parent) {
        return User.findById(parent.userId);
      }
    }
  })
});

const PostType = new GraphQLObjectType({
  name: 'Post',
  description: 'Description for post',

  fields: () => ({
    id: { type: GraphQLID },
    comment: { type: GraphQLString },
    userId: { type: GraphQLID },
    user: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.userId);
      }
    }
  })
})


const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  description: 'Description',
  fields: {

    user: {
      type: UserType,
      args: {
        id: {
          type: GraphQLString
        }
      },
      resolve(parent, args) {
        // Find user in DB by model
        return User.findById(args.id);
      }
    },

    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return User.find({});
      }
    },

    hobby: {
      type: HobbyType,
      args: {
        id: {
          type: GraphQLID
        }
      },
      resolve(parent, args) {
        return Hobby.findById(args.id)
      }
    },

    hobbies: {
      type: new GraphQLList(HobbyType),
      resolve() {
        return Hobby.find({});
      }
    },

    post: {
      type: PostType,
      args: {
        id: {
          type: GraphQLID
        }
      },
      resolve(parent, args) {
        return Post.findById(args.id)
      }
    },

    posts: {
      type: new GraphQLList(PostType),
      resolve() {
        return Post.find({})
      }
    },
  }
});

// Mutations  
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {

    createUser: {
      type: UserType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
        profession: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        const user = new User({
          name: args.name,
          age: args.age,
          profession: args.profession
        });

        user.save();

        return user;
      }
    },

    updateUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: GraphQLInt },
        profession: { type: GraphQLString }
      },
      resolve(parent, args) {
        return User.findByIdAndUpdate(args.id, {
          name: args.name,
          age: args.age,
          profession: args.profession
        }, { new: true });
      }
    },

    createPost: {
      type: PostType,
      args: {
        comment: { type: new GraphQLNonNull(GraphQLString) },
        userId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        const post = new Post({
          comment: args.comment,
          userId: args.userId
        });

        post.save();

        return post;
      }
    },

    updatePost: {
      type: PostType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        comment: { type: new GraphQLNonNull(GraphQLString) },
        userId: { type: GraphQLID }
      },
      resolve(parent, args) {
        return Post.findByIdAndUpdate(args.id, { comment: args.comment, userId: args.userId }, { new: true })
      }
    },

    createHobby: {
      type: HobbyType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        userId: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const hobby = new Hobby({
          title: args.title,
          description: args.description,
          userId: args.userId
        });

        hobby.save();

        return hobby;
      }
    },

    updateHobby: {
      type: HobbyType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        title: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        userId: { type: GraphQLID },
      },
      resolve(parent, args) {
        return Hobby.findByIdAndUpdate(args.id, {
          title: args.title,
          description: args.description,
          userId: args.userId,
        }, { new: true })
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
