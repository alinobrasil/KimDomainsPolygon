const main = async () => {
    const domainContractFactory = await hre.ethers.getContractFactory('Domains');
    const domainContract = await domainContractFactory.deploy("kim");
    await domainContract.deployed();

    console.log("Contract deployed to:", domainContract.address);

    const domainToMint = "alialiali";


    let txn = await domainContract.register(
        domainToMint, { value: hre.ethers.utils.parseEther('0.5') });
    await txn.wait();
    console.log("Minted domain ....");

    txn = await domainContract.setRecord(domainToMint, "A to the K yo");
    await txn.wait();
    console.log("Set record for", domainToMint, ".kim");

    const address = await domainContract.getAddress(domainToMint);
    console.log("Owner of domain:", address);

    const balance = await hre.ethers.provider.getBalance(domainContract.address);
    console.log("Contract balance:", hre.ethers.utils.formatEther(balance));
}

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

runMain();
