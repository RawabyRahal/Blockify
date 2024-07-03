import React, { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";
import dummyData from "../utils/dummyData";
import { shortenAddress } from "../utils/shortenAddress";
import useFetch from "../hooks/useFetch";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare, faWallet, faPaperPlane, faClock,faCoins } from '@fortawesome/free-solid-svg-icons';



const TransactionCard = ({
  addressTo,
  addressFrom,
  timestamp,
  message,
  keyword,
  amount,
  url,
}) => {
  const gifUrl = useFetch({ keyword });

  return (
    <div
      className="m-4 flex flex-1 2xl:min-w-[450px] 2xl:max-w-[500px] sm:min-w-[270px] sm:max-w-[300px] min-w-full flex-col p-1 rounded-tr-[23px] rounded-bl-[23px]"
      style={{ backgroundImage: 'linear-gradient(to left, #a87d52 , #CB4487)' }}
    >
      <div
        className="bg-[#181818] flex flex-col p-3 rounded-tr-[23px] rounded-bl-[23px] hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:scale-105"
      >
         <div className="flex flex-col items-center w-full mt-3">
         <div className="w-full mb-6 p-2 ml-5">
            <a
              href={`https://sepolia.etherscan.io/address/${addressFrom}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-300 text-lg mb-2"
              style={{ fontSize: '26px' }}
            >
              <FontAwesomeIcon icon={faWallet} className="mr-4"  style={{color: ' #a87d52'}}/>
              <span className="font-bold underline"  style={{color: ' #a87d52'}}>From: </span>&nbsp; {shortenAddress(addressFrom)}
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="ml-2 text-blue-400" />
            </a>

            <a
              href={`https://sepolia.etherscan.io/address/${addressTo}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-200 text-lg mb-2"
              style={{ fontSize: '26px' }}
            >
              <FontAwesomeIcon icon={faWallet} className="mr-4"  style={{color: ' #a87d52'}}/>
              <span className="font-bold underline"  style={{color: ' #a87d52'}}>To: </span>&nbsp; {shortenAddress(addressTo)}
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="ml-2 text-blue-400" />
            </a>

            <p className="flex items-center text-gray-300 text-lg mb-2" style={{ fontSize: '26px' }}>
              <FontAwesomeIcon icon={faCoins} className="mr-4"  style={{color: ' #a87d52'}}/>
              <span className="font-bold underline"  style={{color: ' #a87d52'}}>Amount: </span>&nbsp; {amount} ETH
            </p>

            {message && (
              <p className="flex items-center text-gray-300 text-lg mb-2" style={{ fontSize: '26px' }}>
                <FontAwesomeIcon icon={faPaperPlane} className="mr-4"  style={{color: ' #a87d52'}}/>
                <span className="font-bold underline"  style={{color: ' #a87d52'}}>Message: </span>&nbsp; {message}
              </p>
            )}
          </div>

          <img
            src={gifUrl || url}
            alt="nature"
            className="w-full h-64 2xl:h-96 rounded-md shadow-lg object-cover"
          />

          <div className="bg-black p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl flex items-center">
            <FontAwesomeIcon icon={faClock} className="text-[#37c7da] mr-2" />
            <p className="text-[#37c7da] font-bold" style={{ fontSize: '18px' }}>{timestamp}</p>
          </div>
        </div>
      </div>
    </div>
  );
}


export default function Transactions() {
  const { currentAccount, transactions } = useContext(TransactionContext);
  const sortedTransactions = transactions.sort((a, b) => {
    const dateA = new Date(a.timestamp);
    const dateB = new Date(b.timestamp);
    return dateB - dateA;
  });

  console.log(sortedTransactions);

  return (
    <div className="flex w-full justify-start items-start 2xl:px-20 gradient-bg-transactions">
      <div className="flex flex-col md:p-20 py-25 px-4">
        {currentAccount ? (
          <h3 className="text-white text-5xl text-start my-2 text-gradient px-4">
            Latest Transactions
          </h3>
        ) : (
          <h3 className="text-white text-3xl text-start my-2">
            Connect your account to see the latest transactions
          </h3>
        )}

        <div className="flex flex-wrap justify-start items-start mt-10">
          {sortedTransactions.map((transaction, index) => (
            <TransactionCard key={index} {...transaction} />
          ))}
        </div>
      </div>
    </div>
  );
}
