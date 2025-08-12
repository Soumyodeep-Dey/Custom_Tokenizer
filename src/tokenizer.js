export class Tokenizer {
    constructor() {
        this.vocab = {};
        this.idToToken = {};
        this.nextId = 0;

        // Special tokens
        this.specialTokens = {
            '<PAD>': this.nextId++,
            '<BOS>': this.nextId++,
            '<EOS>': this.nextId++,
            '<UNK>': this.nextId++,
        };

        for (const [token, id] of Object.entries(this.specialTokens)) {
            this.vocab[token] = id;
            this.idToToken[id] = token;
        }
    }

    train(corpus, vocabSize = 50) {
        // Step 1: Start vocab with individual characters
        let tokens = new Set(corpus.split(''));
        tokens.forEach(ch => this._addToken(ch));

        // Step 2: Prepare word list (as arrays of chars)
        let words = corpus.split(/\s+/).map(w => [...w]);

        // Step 3: Merge most frequent pairs until vocabSize reached
        while (Object.keys(this.vocab).length < vocabSize) {
            const pairs = this._getPairFrequencies(words);
            if (!pairs.size) break;

            const mostFrequent = [...pairs.entries()]
                .sort((a, b) => b[1] - a[1])[0][0];

            const [a, b] = mostFrequent.split(' ');

            // Merge in all words
            words = words.map(word => {
                const newWord = [];
                let skip = false;
                for (let i = 0; i < word.length; i++) {
                    if (!skip && i < word.length - 1 && word[i] === a && word[i + 1] === b) {
                        newWord.push(a + b);
                        skip = true;
                    } else {
                        if (skip) {
                            skip = false;
                        } else {
                            newWord.push(word[i]);
                        }
                    }
                }
                return newWord;
            });

            // Add merged token to vocab
            this._addToken(a + b);
        }
    }

    encode(text) {
        const chars = [...text];
        const result = [];
        let i = 0;

        while (i < chars.length) {
            let match = null;
            let matchId = null;

            // Try longest possible subword (max length = remaining chars)
            for (let len = Math.min(chars.length - i, 10); len > 0; len--) {
                const sub = chars.slice(i, i + len).join('');
                if (this.vocab[sub] !== undefined) {
                    match = sub;
                    matchId = this.vocab[sub];
                    break;
                }
            }

            if (match) {
                result.push(matchId);
                i += match.length;
            } else {
                result.push(this.specialTokens['<UNK>']);
                i++;
            }
        }

        return result;
    }

    decode(tokenIds) {
        return tokenIds
            .map(id => this.idToToken[id] || '')
            .join('')
            .replace(/<PAD>|<BOS>|<EOS>|<UNK>/g, '');
    }

    _addToken(token) {
        if (this.vocab[token] === undefined) {
            this.vocab[token] = this.nextId;
            this.idToToken[this.nextId] = token;
            this.nextId++;
        }
    }

    _getPairFrequencies(words) {
        const pairs = new Map();
        words.forEach(word => {
            for (let i = 0; i < word.length - 1; i++) {
                const pair = word[i] + ' ' + word[i + 1];
                pairs.set(pair, (pairs.get(pair) || 0) + 1);
            }
        });
        return pairs;
    }
}
