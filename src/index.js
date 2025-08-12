import { Tokenizer } from './tokenizer.js';

const corpus = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-={}[]|:;"<>,.?/~` ';
const tokenizer = new Tokenizer();
tokenizer.train(corpus, 100);

const text = 'Hey Hitesh Sir , Hey piyush sir I am excited about this Cohort + this is my first Cohort';
const encoded = tokenizer.encode(text);
console.log('Encoded:', encoded);

console.log('--- Vocabulary (by ID) ---');
for (const id of Object.keys(tokenizer.idToToken).sort((a, b) => a - b)) {
    console.log(`${id}: "${tokenizer.idToToken[id]}"`);
}


const decoded = tokenizer.decode(encoded);
console.log('Decoded:', decoded);