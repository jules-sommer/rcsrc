const monerojs = require('monero-javascript');

const connectDaemon = async () => {
        
    let daemon = await monerojs.connectToDaemonRpc("http://localhost:38081", "superuser", "abctesting123");
    let height = await daemon.getHeight();            // 1523651
    let txsInPool = await daemon.getTxPool();         // get transactions in the pool

    console.log(height)
    console.log(txsInPool)

    return { height, txsInPool };

}

export default connectDaemon;