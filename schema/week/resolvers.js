import { loadSeedData } from "../../utils/seedData.js";

export default {
  Query: {
    week: (_, { id }, { user }) => {
      if (!user) throw new Error("401 Unauthorized");

      const seedData = loadSeedData();
      const week = seedData.weeks.find((w) => w.id === id);

      if (!week || week.userId !== user.id) throw new Error("401 Unauthorized");
      return week;
    },

    weeksByUser: (_, { userId, limit, offset }, { user }) => {
      if (!user || user.id !== userId) throw new Error("401 Unauthorized");

      const seedData = loadSeedData();
      let weeks = seedData.weeks.filter((w) => w.userId === userId);

      if (offset) weeks = weeks.slice(offset);
      if (limit) weeks = weeks.slice(0, limit);

      return weeks;
    },
  },
};
