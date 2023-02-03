import Chance from 'chance';
const chance = new Chance();

export const randomUUID = () => chance.guid();
export const randomName = () => chance.name();
export const randomEmail = () => chance.email();
export const randomId = () => chance.fbid();
export const randomTitle = (words = 3) => chance.sentence({ words });
export const randomContent = (words = 20) => chance.sentence({ words });
