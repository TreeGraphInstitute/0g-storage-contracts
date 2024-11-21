// @ts-nocheck

import { Signer } from "ethers";
import { ethers } from "hardhat";
import { FixedPriceFlow, ChunkLinearReward, PoraMine } from "../../typechain-types";


async function printSubmissions(flow: FixedPriceFlow, batches: number = 10) {
    
}

async function main() {
    const [owner, me, me2] = await ethers.getSigners();

    const flow = await ethers.getContractAt("FixedPriceFlow", "0x6b10c048bf720594a0ab2a336dE06BB6144d69c1", me);

    const n = (await ethers.provider.getBlock("latest")).number;
    const batches = 10;

    for (let i = n; i > n - 900 * batches; i -= 900) {
        const events = await flow.queryFilter(flow.filters.Submit(), i - 900, i);
        for (const event of events.reverse()) {
            console.log("root = %s, start = %s", event.args.identity, event.args)
            console.log(event.args.submission)
            
            // const [tx, receipt] = await Promise.all([event.getTransaction(), event.getTransactionReceipt()]);
            // console.log(
            //     "%d\tGas: %d (%d)\t%s",
            //     event.blockNumber,
            //     receipt.gasUsed,
            //     tx.gasLimit,
            //     event.transactionHash
            // );
        }
    }
}
// event Submit(
//     address indexed sender,
//     bytes32 indexed identity,
//     uint submissionIndex,
//     uint startPos,
//     uint length,
//     Submission submission
// );

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
