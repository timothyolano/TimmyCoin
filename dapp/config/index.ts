import { Contract, ContractRunner } from "ethers";
import abi from "./abi.json";

export function getContract(signer: ContractRunner) {
    return new Contract(
        "0x368B3A9E7481b14C635fa544F77490F9183b7123",
        abi as any,
        signer
    );
}