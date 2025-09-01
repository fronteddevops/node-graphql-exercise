import { v4 as uuidv4 } from "uuid";
import { loadSeedData, saveSeedData } from "../../utils/seedData.js";

const cacheTTL = 60 * 1000;

export default {
  Mutation: {
    createCard: (_, { input }, { user }) => {
      if (!user) throw new Error("401 Unauthorized");
      if (!input.title || input.minutes < 0) throw new Error("Invalid input");

      const seedData = loadSeedData();

      const newCard = {
        id: uuidv4(),
        userId: user.id,
        
        weekId: input.weekId,
        title: input.title,
        minutes: input.minutes,
        status: "TODO",
        createdAt: new Date().toISOString(),
      };

      seedData.cards.push(newCard);
      saveSeedData(seedData);

      return newCard;
    },

    updateCardStatus: (_, { id, status }, { user }) => {
      if (!user) throw new Error("401 Unauthorized");

      const seedData = loadSeedData();

      const card = seedData.cards.find(
        (c) => c.id === id && c.userId === user.id
      );
      if (!card) throw new Error("Card not found");

      card.status = status;
      saveSeedData(seedData);

      return card;
    },
  },

  Query: {
    avaInsights: (_, { weekId }, { cache, user }) => {
      if (!user) throw new Error("401 Unauthorized");

      const seedData = loadSeedData();

      if (!cache.avaInsights) cache.avaInsights = {};
      const cached = cache.avaInsights[weekId];
      const now = Date.now();
      if (cached && now - cached.timestamp < cacheTTL) {
        return cached.data;
      }

      const cards = seedData.cards.filter(
        (c) => c.weekId === weekId && c.userId === user.id
      );
      const sessions = seedData.sessions.filter((s) => s.userId === user.id);

      const totalMinutes = cards.reduce((sum, c) => sum + c.minutes, 0);
      const doneCount = cards.filter((c) => c.status === "DONE").length;

      const totalSessionMinutes = sessions.reduce((sum, s) => {
        const start = new Date(s.startedAt);
        const end = new Date(s.endedAt);
        return sum + (end - start) / 60000;
      }, 0);

      const focusScore = Math.min(
        100,
        Math.round(doneCount * 10 + (totalSessionMinutes / 60) * 5)
      );

      const recommendations = [];
      if (doneCount === 0)
        recommendations.push("Pick one small card to finish today.");
      if (totalMinutes < 120)
        recommendations.push("Plan at least two 60-min focus blocks.");
      if (focusScore > 80)
        recommendations.push(
          "Great job — maintain momentum with a recovery block."
        );

      const data = { totalMinutes, doneCount, focusScore, recommendations };

      cache.avaInsights[weekId] = { data, timestamp: now };

      return data;
    },
  },
};
