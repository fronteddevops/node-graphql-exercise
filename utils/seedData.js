import fs from 'fs';
import path from 'path';

const __dirname = path.resolve();
const SEED_FILE = path.join(__dirname, 'seed.json');

export const loadSeedData = () => {
  return JSON.parse(fs.readFileSync(SEED_FILE, 'utf8'));
};

export const saveSeedData = (seedData) => {
  fs.writeFileSync(SEED_FILE, JSON.stringify(seedData, null, 2), 'utf8');
};
