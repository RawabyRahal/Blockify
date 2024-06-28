const main = async () => {
    
    //class going to generate instances of that specific contract
    const Transactions = await hre.ethers.getContractFactory("Transactions");

    //one specific instance of that contract
    const transactionsContract = await Transactions.deploy();

    await transactionsContract.waitForDeployment();

    console.log("Transactions address: ", await transactionsContract.getAddress());
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