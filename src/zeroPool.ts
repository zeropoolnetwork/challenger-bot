import { ZeroPoolNetwork } from "zeropool-lib";
// @ts-ignore
import HDWalletProvider from "truffle-hdwallet-provider";
import * as fs from "fs";
import * as path from "path";
import config from "./config";

const hdWallet = new HDWalletProvider(config.ETH_SECRET, config.RPC, 0, 1);

const transactionJsonPath = path.join(__dirname, './../circuitsCompiled/transaction.json');
const transactionJson = fs.readFileSync(transactionJsonPath);

const proverKeyPath = path.join(__dirname, '../circuitsCompiled/transaction_pk.bin');
const proverKey = fs.readFileSync(proverKeyPath).buffer;

export default new ZeroPoolNetwork(
    config.CONTRACT_ADDRESS,
    // @ts-ignore
    hdWallet,
    config.ZP_MNEMONIC,
    transactionJson,
    proverKey
);
