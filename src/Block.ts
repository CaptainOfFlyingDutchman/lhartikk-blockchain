import { SHA256 } from 'crypto-js';

class Block {

  public index: number;
  public hash: string;
  public previousHash: string;
  public timestamp: number;
  public data: string;

  constructor(index: number, hash: string, previousHash: string, timestamp: number, data: string) {
    this.index = index;
    this.hash = hash;
    this.previousHash = previousHash;
    this.timestamp = timestamp;
    this.data = data;
  }
}

const genesisBlock: Block = new Block(0, '816534932c2b7154836da6afc367695e6337db8a921823784c14378abed4f7d7',
'', 1465154705, 'The Genesis Block1');

const blockchain: Block[] = [genesisBlock];

const calculateHash = (index: number, previousHash: string, timestamp: number, data: string): string =>
  SHA256(index + previousHash + timestamp + data).toString();

const generateNextBlock = (blockData: string): Block => {
  const previousBlock: Block = getLatestBlock();
  const index: number = previousBlock.index + 1;
  const timestamp: number = new Date().getTime() / 1000;
  const hash: string = calculateHash(index, previousBlock.hash, timestamp, blockData);
  return new Block(index, hash, previousBlock.hash, timestamp, blockData);
}

const getLatestBlock = (): Block => blockchain[blockchain.length - 1];
