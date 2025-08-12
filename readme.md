# Custom Tokenizer

A simple, customizable tokenizer library for JavaScript. Easily split, process, and analyze text for NLP, search, or data processing tasks.

## Features

## How It Works
This project implements a simple Byte Pair Encoding (BPE) tokenizer:
- **Training**: Builds a vocabulary from a corpus by merging frequent character pairs until the desired vocab size is reached.
- **Encoding**: Splits input text into the longest possible tokens from the vocabulary, mapping each to an ID.
- **Decoding**: Converts token IDs back to text, omitting special tokens.

### Special Tokens
- `<PAD>`: Padding
- `<BOS>`: Beginning of sequence
- `<EOS>`: End of sequence
- `<UNK>`: Unknown token

## Project Structure
```js
import { Tokenizer } from './src/tokenizer.js';

const corpus = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-={}[]|:;"<>,.?/~` ';
const tokenizer = new Tokenizer();
tokenizer.train(corpus, 100); // Build vocabulary

const text = 'Hey Hitesh Sir, Hey piyush sir I am excited about this Cohort!';
const encoded = tokenizer.encode(text);
console.log('Encoded:', encoded);

const decoded = tokenizer.decode(encoded);
console.log('Decoded:', decoded);
```

### Output Example
```
Encoded: [ ...array of token IDs... ]
Decoded: Hey Hitesh Sir, Hey piyush sir I am excited about this Cohort!
```
## Project Structure
```
├── package.json
├── pnpm-lock.yaml
├── readme.md
└── src/
    ├── index.js
    └── tokenizer.js
```

## Getting Started

### Installation
```sh
pnpm install
```sh
pnpm install
```

### Usage
Import and use the tokenizer in your project:
```js
import { Tokenizer } from './src/tokenizer.js';

const text = 'Hello, world! This is a test.';
const tokenizer = new Tokenizer();
```

## Scripts
- `pnpm start` — Run the main entry point
- `pnpm test` — Run tests (if available)

## Contributing
Pull requests and suggestions are welcome!


## Author
Soumyodeep_Dey(https://soumyodeep-dey.vercel.app/)