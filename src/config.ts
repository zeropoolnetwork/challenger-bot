type Config = {
    CONTRACT_ADDRESS: string,
    ZP_MNEMONIC: string,
    ETH_SECRET: string | string[],
    RPC: string
}

const contractAddress = process.env.CONTRACT_ADDRESS;
if (!contractAddress) {
    throw new Error('CONTRACT_ADDRESS env not defined');
}

const zpMnemonic = process.env.ZP_MNEMONIC;
if (!zpMnemonic) {
    throw new Error('ZP_MNEMONIC env not defined');
}

const ethSecret = process.env.ETH_SECRET;
if (!ethSecret) {
    throw new Error('ETH_SECRET env not defined');
}

const rpc = process.env.RPC;
if (!rpc) {
    throw new Error('RPC env not defined');
}

const config: Config = {
    CONTRACT_ADDRESS: contractAddress,
    ZP_MNEMONIC: zpMnemonic,
    ETH_SECRET: ethSecret,
    RPC: rpc
};

if (ethSecret.split(' ').length < 2) {
    config.ETH_SECRET = [ ethSecret ];
}

export default config;
