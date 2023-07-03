/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "fragment UserAttributes on User {\n  username\n  avatar\n  id\n}": types.UserAttributesFragmentDoc,
    "mutation AddMessage($message: MessageInput!) {\n  addMessage(message: $message) {\n    id\n    text\n    user {\n      id\n    }\n  }\n}": types.AddMessageDocument,
    "mutation AddPost($userId: Int!, $post: PostInput!) {\n  addPost(userId: $userId, post: $post) {\n    id\n    text\n    user {\n      id\n      username\n      avatar\n    }\n  }\n}": types.AddPostDocument,
    "mutation DeletePost($postId: Int!) {\n  deletePost(postId: $postId) {\n    success\n  }\n}": types.DeletePostDocument,
    "query Chat($chatId: Int!) {\n  chat(chatId: $chatId) {\n    id\n    messages {\n      id\n      text\n      user {\n        id\n      }\n    }\n    users {\n      ...UserAttributes\n    }\n  }\n}": types.ChatDocument,
    "query Chats {\n  chats {\n    id\n    lastMessage {\n      text\n    }\n    users {\n      ...UserAttributes\n    }\n  }\n}": types.ChatsDocument,
    "query Posts {\n  posts {\n    id\n    text\n    user {\n      id\n      username\n      avatar\n    }\n  }\n}": types.PostsDocument,
    "query PostsFeed($limit: Int, $offset: Int) {\n  postsFeed(limit: $limit, offset: $offset) {\n    hasMore\n    posts {\n      id\n      text\n      user {\n        ...UserAttributes\n      }\n    }\n  }\n}": types.PostsFeedDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment UserAttributes on User {\n  username\n  avatar\n  id\n}"): (typeof documents)["fragment UserAttributes on User {\n  username\n  avatar\n  id\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation AddMessage($message: MessageInput!) {\n  addMessage(message: $message) {\n    id\n    text\n    user {\n      id\n    }\n  }\n}"): (typeof documents)["mutation AddMessage($message: MessageInput!) {\n  addMessage(message: $message) {\n    id\n    text\n    user {\n      id\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation AddPost($userId: Int!, $post: PostInput!) {\n  addPost(userId: $userId, post: $post) {\n    id\n    text\n    user {\n      id\n      username\n      avatar\n    }\n  }\n}"): (typeof documents)["mutation AddPost($userId: Int!, $post: PostInput!) {\n  addPost(userId: $userId, post: $post) {\n    id\n    text\n    user {\n      id\n      username\n      avatar\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation DeletePost($postId: Int!) {\n  deletePost(postId: $postId) {\n    success\n  }\n}"): (typeof documents)["mutation DeletePost($postId: Int!) {\n  deletePost(postId: $postId) {\n    success\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Chat($chatId: Int!) {\n  chat(chatId: $chatId) {\n    id\n    messages {\n      id\n      text\n      user {\n        id\n      }\n    }\n    users {\n      ...UserAttributes\n    }\n  }\n}"): (typeof documents)["query Chat($chatId: Int!) {\n  chat(chatId: $chatId) {\n    id\n    messages {\n      id\n      text\n      user {\n        id\n      }\n    }\n    users {\n      ...UserAttributes\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Chats {\n  chats {\n    id\n    lastMessage {\n      text\n    }\n    users {\n      ...UserAttributes\n    }\n  }\n}"): (typeof documents)["query Chats {\n  chats {\n    id\n    lastMessage {\n      text\n    }\n    users {\n      ...UserAttributes\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Posts {\n  posts {\n    id\n    text\n    user {\n      id\n      username\n      avatar\n    }\n  }\n}"): (typeof documents)["query Posts {\n  posts {\n    id\n    text\n    user {\n      id\n      username\n      avatar\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query PostsFeed($limit: Int, $offset: Int) {\n  postsFeed(limit: $limit, offset: $offset) {\n    hasMore\n    posts {\n      id\n      text\n      user {\n        ...UserAttributes\n      }\n    }\n  }\n}"): (typeof documents)["query PostsFeed($limit: Int, $offset: Int) {\n  postsFeed(limit: $limit, offset: $offset) {\n    hasMore\n    posts {\n      id\n      text\n      user {\n        ...UserAttributes\n      }\n    }\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;