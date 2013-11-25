/*
	simpleTCPclient.js
	(c) 2013 Sam Caldwell.  All Rights Reserved.
		
	Permission is hereby granted, free of charge, to any person obtaining a copy of
	this software and associated documentation files (the "Software"), to deal in
	the Software without restriction, including without limitation the rights to
	use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
	the Software, and to permit persons to whom the Software is furnished to do so,
	subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
	FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
	COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
	IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
	CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

	Documentation:
		
		https://github.com/x684867/simpleTCPclient/wiki
 */

module.exports=function(){
	net=require('net');

	var currConnections=Array();
	/* 
		createConnection establishes a persistent TCP connection with an identified host.
	 */
	this.addConnection=function(addr,port){
		var skt=new net.Socket();
			currConnections.push(skt);
			skt.id=currConnections.length-1;
			skt.isConnected=false;
			skt.msgSendCount=0;
			skt.rBuf=Array();
			skt.wBuf=Array();
		
		var wTmr=skt.setInterval(function(){if(wBuf.length>0)skt.write(wBuf.shift());},10);
		/* define the connect() method. */		
		skt.connect(port,addr,function(){
		skt.on('data',function(data){skt.rBuf.push(base64decode(data));});			
			skt.on('close',function(){clearInterval(wTmr);skt.isConnected=false;});
			skt.isConnected=true;
			console.log("socket connected (address:"+host+":"+port+")");
		});
		skt.readBuffer=function(){return (rBuff.length>0)?rBuff.shift():null;}
		skt.send=function(m){
			skt.wBuff.push(base64encode(JSON.stringify(m)));
			msgSendCount++;
			/*periodically poll and write-out the write buffer*/
		}
		skt.hasResponse=function(){return (rBuff.length>0)?true:false;}
		skt.hasConnection=function(){return isConnected;}
		skt.rQueueLen=function(){return rBuff.length;}
		skt.wQueueLen=function(){return wBuff.length;}
		/*return the new connection object (modified socket)*/
		return skt;
	}
	/**/
	this.getConnection=function(id){return currConnections[id];}
	/**/
	this.dropConnection=function(id){
		currConnections[id].destroy();
		currConnections[id].close();
		currConnections.delete[id];
	}
}
base64encode=function(s){return (new Buffer(s).toString('base64');}
base64decode=function(s){return (new Buffer(s,'base64').toString('utf8');}
