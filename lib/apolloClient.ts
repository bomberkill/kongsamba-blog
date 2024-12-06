import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client';

const transformLink = new ApolloLink((operation, forward) =>
  forward(operation).map((response) => {
    // if (response.data?.getAllPlaylists?.data) {
    //     return {data: response.data?.getAllPlaylists}
    // };
    if (response.data?.getPlaylistById?.data) {
      return { data: response.data?.getPlaylistById };
    }
    // if (response.data?.getAllEvents?.data) {
    //     return {data: response.data?.getAllEvents.data}
    // };
    if (response.data?.getEventById?.data) {
      return { data: response.data?.getEventById };
    }
    // if (response.data?.getAllArticles?.data) {
    //     return {data: response.data?.getAllArticles}
    // };
    if (response.data?.getArticleById?.data) {
      return { data: response.data?.getArticleById };
    }
    return response;
  })
);
const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([transformLink, new HttpLink({ uri: process.env.API_URI })]),
});
export default apolloClient;
