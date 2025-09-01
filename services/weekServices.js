import { loadSeedData } from "../utils/seedData.js";

export default {
  getWeekById: (id) => {
    const seedData = loadSeedData();
    return seedData.weeks.find((w) => w.id === id);
  },

  getWeeksByUser: (userId, limit, offset) => {
    const seedData = loadSeedData();
    let weeks = seedData.weeks.filter((w) => w.userId === userId);
    if (offset) weeks = weeks.slice(offset);
    if (limit) weeks = weeks.slice(0, limit);
    return weeks;
  },
};
