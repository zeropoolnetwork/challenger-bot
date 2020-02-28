import zp from "./zeroPool";
import { MemoryStorage } from "./storage/memoryStorage";
import { PublishBlockEvent } from "zeropool-lib";
import { verifyTx } from "./verifier";

const storage = new MemoryStorage();

export async function scanBlocks(): Promise<void> {

    while (true) {

        const lastBlockNumber = storage.lastBlockNumber;

        const blockEvents = await zp.ZeroPool.publishBlockEvents(lastBlockNumber + 1);

        for (const event of blockEvents) {
            await handleBlockEvent(event);
            storage.addBlockEvents([event]);
        }

        await delay(3000);

    }

}

function delay(time: number): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(resolve, time)
    });
}

async function handleBlockEvent(event: PublishBlockEvent): Promise<void> {

    /*
        1. Verify tx
        2. Check double spend
        3. Check
     */

    const storageBlockItems = storage.getBlockItems();
    const lastBlockItemRootHash = storageBlockItems.length !== 0 ?
        storageBlockItems[storageBlockItems.length - 1].newRoot :
        "0xDE2890813A22F5DD1131E6EB966C6EA5D0A61340E03CE5B339435EEF7B08D8E";

    const blockItems = event.params.BlockItems;

    for (const [i, item] of blockItems.entries()) {
        const lastRootHash = i !== 0 ?
            blockItems[i - 1].newRoot :
            lastBlockItemRootHash;

        const [ok, tx] = await verifyTx(item.tx, lastRootHash);

        console.log({ ok });
        console.log({ tx });
    }


}
