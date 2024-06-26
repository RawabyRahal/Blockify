const main = async () => {
    
    //class going to generate instances of that specific contract
    const Transactions = await hre.ethers.getContractFactory("Transactions");

    //one specific instance of that contract
    const transactions = await Transactions.deploy();

    await transactions.deployed();

    console.log("Transactions address: ", transactions.address);
}

const runMain = async () => {
    try {
        await main()
        process.exit(0)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

runMain();