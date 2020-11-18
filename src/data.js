require('dotenv').config()
const GraphQLClient = require('graphql-request').GraphQLClient
// const yaml = require('yaml')

const endpoint = 'https://api.github.com/graphql' 

const client = new GraphQLClient(endpoint, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.GH_TOKEN}`
    },
  })

 
const query = function(repoquery) {
    return `{
      search(first: 10, query: ${repoquery}, type: REPOSITORY) {
        edges {
          node {
            ... on Repository {
              nameWithOwner
              name
              url
              stargazers {totalCount}
              forkCount
              releases {totalCount}
              primaryLanguage {name}
              languages(first: 3) { nodes {name} }
              description
              updatedAt
              openGraphImageUrl
              owner {avatarUrl, url}
              repositoryTopics(first:5) { nodes {topic {name}} }
            }
          }
        }
      }
    }
    `
  }
let data = function(folder) {
  return client.request(query(folder)).then((response) => {return response})
}
export default data
