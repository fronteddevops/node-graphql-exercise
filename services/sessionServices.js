import { v4 as uuidv4 } from "uuid";
import { loadSeedData, saveSeedData } from "../utils/seedData.js";

export default {
  createSession: (userId, input) => {
    const seedData = loadSeedData();

    const newSession = {
      id: uuidv4(),
      userId,
      startedAt: input.startedAt,
      endedAt: input.endedAt,
    };

    seedData.sessions.push(newSession);
    saveSeedData(seedData);

    return newSession;
  },

  deleteSession: (userId, id) => {
    const seedData = loadSeedData();
    const index = seedData.sessions.findIndex(
      (s) => s.id === id && s.userId === userId
    );
    if (index === -1) throw new Error("Session not found");

    seedData.sessions.splice(index, 1);
    saveSeedData(seedData);

    return true;
  },

  getSessionsByUser: (userId) => {
    const seedData = loadSeedData();
    return seedData.sessions.filter((s) => s.userId === userId);
  },

  getSessionMinutes: (sessions) => {
    return sessions.reduce((sum, s) => {
      const start = new Date(s.startedAt);
      const end = new Date(s.endedAt);
      return sum + (end - start) / 60000;
    }, 0);
  },
};
