import { gql } from '@apollo/client';

//#region Articles queries
export const GET_ALL_ARTICLES = gql(`
    query GET_ALL_ARTICLES($posted: Boolean, $articleType: ArticleType, $number: Int) {
        getAllArticles(posted: $posted, articleType: $articleType, number: $number) {
            id
            posted
            metadata {
                createdAt
                updatedAt
                views
                likes
            }
            articleInput {
                title
                image
                message
                type
                author
            }
        }
    }    
`);
export const GET_ARTICLE = gql(`
    query GET_ARTICLE($id: ID!) {
        getArticleById(id: $id) {
            id
            posted
            metadata {
                createdAt
                likes
                updatedAt
                views
            }
            articleInput {
                author
                image
                message
                title
                type
            }
        }
    }    
`);
//#endregion

//#region Playlist queries
export const GET_ALL_PLAYLISTS = gql(`
    query GET_ALL_PLAYLISTS($posted: Boolean, $number: Int) {
        getAllPlaylists(posted: $posted, number: $number) {
            id
            posted
            metadata {
                createdAt
                updatedAt
                views
                likes
            }
            playlistInput {
                title
                description
                author
                image
            }
        }
    }    
`);
export const GET_PLAYLIST = gql(`
    query GET_PLAYLIST ($id: ID!) {
        getPlaylistById (id: $id) {
            id
            posted
            metadata {
                createdAt
                updatedAt
                views
                likes
            }
            playlistInput {
                title
                image
                description
                author
                singles {
                    title
                    singleLinks {
                        link
                        platform
                    }
                }
            }
        }
    }   
`);

//#endregion
//#region Events queries
export const GET_ALL_EVENTS = gql(`
    query GET_ALL_EVENTS($posted: Boolean) {
        getAllEvents(posted: $posted) {
            id
            posted
            eventInput {
                author
                image
                link
                title
                startAt
                endAt
            }
            metadata {
                createdAt
                updatedAt
            }
        }
    }    
`);
export const GET_EVENT = gql(`
    query GET_EVENT($id: ID!) {
        getEventById(id: $id) {
            id
            posted
            eventInput {
                author
                image
                link
                title
                startAt
                endAt
            }
            metadata {
                createdAt
                updatedAt
            }
        }
    }    
`);
//#endregion
