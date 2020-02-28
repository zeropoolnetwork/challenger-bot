import * as path from "path";
import * as fs from "fs";
import { bigintifyTx, bn128R, hash, Tx, unstringifyVk, verifyProof } from "zeropool-lib";
import zp from "./zeroPool";

const vkPath = path.join(__dirname, '../circuitsCompiled/transaction_vk.json');
// @ts-ignore
const vk = unstringifyVk(JSON.parse(fs.readFileSync(vkPath)));

export async function verifyTx(
    stringTx: Tx<string>,
    lastBlockRootHash: string
): Promise<[boolean, Tx<string> | undefined]> {

    const tx = bigintifyTx(stringTx);

    const ext = zp.ZeroPool.encodeTxExternalFields(tx.txExternalFields);
    const messageHash = BigInt(
        hash(
            ext.substring(2)
        )
    ) % bn128R;

    const inputs = [
        BigInt(lastBlockRootHash),
        tx.nullifier[0],
        tx.nullifier[1],
        tx.utxoHashes[0],
        tx.utxoHashes[1],
        tx.token,
        tx.delta,
        messageHash
    ];

    const ok = await verifyProof(tx.proof.data, inputs, vk);
    if (!ok) {
        return [false, stringTx];
    }
    return [true, undefined]
}
