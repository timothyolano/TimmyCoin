import { ethers } from "hardhat";

async function main() {
  const lock = await ethers.deployContract("TimmyToken", ["0x3Dca5d090C0873b2ec529a41e423603Fd8d5ae4b"]);

  await lock.waitForDeployment();

  console.log(
    `Token deployed to ${lock.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});