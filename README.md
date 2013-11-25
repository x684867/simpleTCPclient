# simpleTCPclient
## Usage

### Implementing the Module
1. To use the simpleTCPclient, we must first include it into the application sources by executing `require('simpleTCPclient')()`.
2. This require() call loads the simpleTCPclient object.  For example, an application might use `root.tcp=require('simpleTCPclient');` to create a global connection pool for TCP connection.

### Creating/Closing Connections
1. The user would then be able to call `myConnection=tcp.addConnection('127.0.0.1',5432)` to create the connector object.  Note that this establishes the persistent TCP connection, but it does not transmit any data to the recipient.

2. The connection can be closed/destroyed by calling `myConnection.close()` and the simpleTCPclient will terminate any open TCP connection.  However the `close()` method will not destroy any of the object's buffers, allowing the programmer to call `read()` `rQueueLen()` and `hasResponse()` until the buffers are empty.  But any calls to `send()` will cause an exception to be thrown.  No network connectivity will be available after the `close()` method is called.

3. Once a connection is past its usefulness, the programmer can invoke `tcp.dropConnection(id)` to remove the connection from the `currConnections` pool.

### Sending and Receiving Data

1. Setting up connections is simple, but handling all of the trouble with sending a message then listening for a response can make even the best code overly complicated to read.  simpleTCPclient abstracts the programmer from this headache, allowing the programmer to `send()` and `read()` messages.

2. To send a message, call `send(messageString)` and the module will add the `messageString` to its internal write buffer (`wBuff`).  A timer will fire every 1ms to check the queue and if messages are present to send the messages to the server.  The programmer may skip this any use `write(messageData)` as well, but `send()` will ensure that nothing in the `net` module can block execution.

3. Similar to `send()`, `read()` does not actually interact with the network.  The `read()` method simply checks if a message is pending in the message buffer and if so returns the first message it sees.

4. The programmer can also call `hasResponse()` to check the read buffer (`rBuff`) as well as `rQueueLen()` to test the length of the read buffer or `wQueueLen()` to test the length of the write buffer.

5. The simpleTCPclient can maintain multiple persistent connections concurrently and each connection will have its own connection read and write buffers.  