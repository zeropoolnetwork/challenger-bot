import { scanBlocks } from "./blockScanner";
import { MemoryStorage } from "./storage/memoryStorage";

const storage = new MemoryStorage();

scanBlocks(storage);
