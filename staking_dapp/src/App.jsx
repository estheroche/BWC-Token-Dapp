import { useState, useEffect } from 'react'
import { connect, disconnect } from 'starknetkit'
import { RpcProvider, Contract } from "starknet";
import bwcAbi from "./utils/abi.json"
import { feltToString } from './helpers';


const contractAddress = "0x0565b346df612dbbc4481e55acc791f29ea6663f0ff017aa0047034df7b891c0"



function App() {

  const [connection, setConnection] = useState()
  const [provider, setProvider] = useState()
  const [address, setAddress] = useState()

  const [name, setName] = useState(" ")
  const [symbol, setSymbol] = useState("")

  const rpcProvider = new RpcProvider({
    nodeUrl: "https://starknet-goerli.infura.io/v3/14d4909928f148238ba1da4db2886e77"
  })




  useEffect(() => {

    const connectToStarknet = async () => {

      const connection = await connect({ modalMode: "neverAsk" })

      if (connection && connection.isConnected) {
        setConnection(connection);
        setProvider(connection.account);
        setAddress(connection.selectedAddress);
      }
    };




    connectToStarknet();
    // getToenName();
  }, [])

  const getTokenName = async () => {
    try {

      const readContract = new Contract(bwcAbi, contractAddress, rpcProvider)
      const name = await readContract.get_name()
      const symbol = await readContract.get_symbol()
      setName(feltToString(name))
      setSymbol(feltToString(symbol))
    } catch (error) {

      alert(error.message)
    }
  }

  const connectWallet = async () => {
    const connection = await connect();

    if (connection && connection.isConnected) {
      setConnection(connection)
      setProvider(connection.account)
      setAddress(connection.selectedAddress)
    }
  }
  const disconnectWallet = async () => {

    await disconnect();

    setConnection(undefined);
    setProvider(undefined);
    setAddress('');
  }


  return (
    <>
      <div>
        {connection ? <button onClick={disconnectWallet}>Disconnect</button> : <button onClick={connectWallet}>connect</button>}
        <p>{address || "Address not connected"}</p>
      </div>

      <h4 onLoad={getTokenName()}>{name}</h4>
      <p>{symbol}</p>



    </>
  )
}

export default App
