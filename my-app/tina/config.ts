import { defineConfig } from "tinacms";
import database from "./database"

import { UsernamePasswordAuthJSProvider } from 'tinacms-authjs/dist/tinacms'
import { LocalAuthProvider } from 'tinacms'

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,
  authProvider:new UsernamePasswordAuthJSProvider(),
  contentApiUrlOverride: '/api/tina/gql',
  
  
    // Add the database setup here to inform TinaCMS of the storage
    // You can add other TinaCMS configurations here, like schema, plugins, etc.

  // Get this from tina.io
  
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        name: "post",
        label: "Posts",
        path: "content/posts",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
    ],
  },
});
