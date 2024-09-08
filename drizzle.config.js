/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./utils/schema.tsx",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://AI-Content-Generator_owner:F6I5aSzxwAYm@ep-super-bread-a110wkok.ap-southeast-1.aws.neon.tech/AI-Content-Generator?sslmode=require",
  },
};
