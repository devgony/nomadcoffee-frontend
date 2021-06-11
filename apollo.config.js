module.exports = {
  client: {
    includes: ["./src/**/*.{tsx,ts}"],
    tagName: "gql",
    service: {
      name: "nomadcoffee-backend",
      url:
        process.env.NODE_ENV === "production"
          ? "https://nomadcoffee-backend-henry.herokuapp.com/graphql"
          : "http://localhost:4000/graphql",
    },
  },
};
