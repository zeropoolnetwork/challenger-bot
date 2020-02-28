import { Block, Event } from "zeropool-lib";

export interface IStorage {
    lastBlockNumber: number;
    getBlockEvents(): Event<Block<string>>[];
    addBlockEvents(newBlockEvents:  Event<Block<string>>[]): void;
}
