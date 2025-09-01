import { loadSeedData } from "../../utils/seedData.js";

export default {
  Query: {
    sessionsByUser: (_, { userId }, { user }) => {
      if (!user || user.id !== userId) throw new Error("401 Unauthorized");

      const seedData = loadSeedData();

      return seedData.sessions
        .filter((s) => s.userId === userId)
        .map((s) => ({
          ...s,
          durationMinutes: Math.round(
            (new Date(s.endedAt) - new Date(s.startedAt)) / 60000
          ),
        }));
    },
  },
};
