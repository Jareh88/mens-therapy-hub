import type { CollectionBeforeValidateHook, CollectionConfig } from "payload";

const makeFirstUserAdmin: CollectionBeforeValidateHook = async ({
  data = {},
  operation,
  req,
}) => {
  if (operation !== "create") return data;

  const raw = await req.payload.count({ collection: "users" });
  const totalUsers = typeof raw === "number" ? raw : raw.totalDocs;

  if (totalUsers === 0) data.role = "admin";
  return data;
};

export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: { useAsTitle: "email" },

  fields: [
    {
      name: "name",
      type: "text",
    },
    {
      name: "role",
      type: "select",
      defaultValue: "therapist",
      options: [
        { label: "Admin", value: "admin" },
        { label: "Therapist", value: "therapist" },
      ],
      access: {
        update: ({ req }) => req.user?.role === "admin",
        read: () => true,
      },
      admin: {
        condition: (_, { user }) => user?.role === "admin",
      },
    },
  ],
  hooks: { beforeValidate: [makeFirstUserAdmin] },

  // collection‑level access
  access: {
    create: () => true, // anyone may register
    read: ({ req, id }) => req.user?.role === "admin" || req.user?.id === id,
    update: ({ req, id }) => req.user?.role === "admin" || req.user?.id === id,
    delete: ({ req }) => req.user?.role === "admin",
  },
};

export default Users;
