import { loadSeedData } from "../utils/seedData.js";

export default {
  getAllUsers: () => {
    const seedData = loadSeedData();
    return seedData.users;
  },

  getUserById: (id) => {
    const seedData = loadSeedData();
    return seedData.users.find((u) => u.id === id);
  },
};
