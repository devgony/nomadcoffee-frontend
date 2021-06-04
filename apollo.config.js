module.exports = {
  client: {
    includes: ["./src/**/*.{tsx,ts}"],
    tagName: "gql",
    service: {
      name: "nomadcoffee-backend",
      url: "https://nomadcoffee-backend-henry.herokuapp.com/graphql",
    },
  },
};
