/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./utils/schema.tsx",
  dialect: "postgresql",
  dbCredentials: {
    url: NEXT_PUBLIC_DRIZZLE_DB_URL,
  },
};
