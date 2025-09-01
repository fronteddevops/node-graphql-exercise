import { loadSeedData } from "../../utils/seedData.js";
export default {
  Query: {
    users: (_, __, { user }) => {
      if (!user) throw new Error("401 Unauthorized");

      const seedData = loadSeedData();
      return seedData.users.filter((u) => u.id === user.id);
    },

    user: (_, { id }, { user }) => {
      if (!user || user.id !== id) throw new Error("401 Unauthorized");

      const seedData = loadSeedData();
      return seedData.users.find((u) => u.id === id);
    },
  },
};
