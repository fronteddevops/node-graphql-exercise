import { v4 as uuidv4 } from "uuid";
import { saveSeedData, loadSeedData } from "../utils/seedData.js";

export default {
  createCard: (userId, input) => {
    const seedData = loadSeedData();

    const newCard = {
      id: uuidv4(),
      userId,
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

  updateCardStatus: (userId, id, status) => {
    const seedData = loadSeedData();

    const card = seedData.cards.find((c) => c.id === id && c.userId === userId);
    if (!card) throw new Error("Card not found");

    card.status = status;
    saveSeedData(seedData);

    return card;
  },

  deleteCard: (userId, id) => {
    const seedData = loadSeedData();
    const index = seedData.cards.findIndex(
      (c) => c.id === id && c.userId === userId
    );
    if (index === -1) throw new Error("Card not found");

    seedData.cards.splice(index, 1);
    saveSeedData(seedData);

    return true;
  },

  getCardsByWeek: (userId, weekId) => {
    const seedData = loadSeedData();
    return seedData.cards.filter(
      (c) => c.userId === userId && c.weekId === weekId
    );
  },
};
