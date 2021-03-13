// Hack to make it work in node
// https://github.com/peers/peerjs/issues/396#issuecomment-333287381
window = global;
location = { protocol: "http" };
navigator = { platform: "node" };
XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
net = require("net");
wrtc = require("wrtc");
RTCPeerConnection = wrtc.RTCPeerConnection;
RTCSessionDescription = wrtc.RTCSessionDescription;
RTCIceCandidate = wrtc.RTCIceCandidate;
WebSocket = require("ws");
// require("./node_modules/peerjs/lib/exports.js");
var Peer = require("peerjs");

var PouchDB = require("pouchdb"); // not included
var PouchReplicator = require("pouch-replicate-webrtc");

var peer1 = new Peer("acailly-peer1");
var peer2 = new Peer("acailly-peer2");

var connPeer1Peer2 = peer1.connect("acailly-peer2");
connPeer1Peer2.on("open", function () {
  connPeer1Peer2.send("coucou je suis peer1");
});

peer2.on("connection", function (connPeer2Peer1) {
  connPeer2Peer1.on("data", function (data) {
    console.log(data);
  });
});

// peer1.on("connect", () => {
//   // wait for 'connect' event before using the data channel
//   peer1.send("hey peer2, how is it going?");

//   var peer1Db = new PouchDB("peer1-db");
//   var peer1Replicator = new PouchReplicator("peer2-db", PouchDB, peer1Db, {
//     batch_size: 50,
//   });

//   peer1Replicator.on("endpeerreplicate", function () {
//     console.log("peer 1 received data replicated from the peer 2");
//   });

//   var peer2Db = new PouchDB("peer1-db");
//   var peer2Replicator = new PouchReplicator("peer1-db", PouchDB, peer2Db, {
//     batch_size: 50,
//   });

//   peer2Replicator.on("endpeerreplicate", function () {
//     console.log("peer 2 received data replicated from the peer 1");
//   });

//   peer1Db.put({
//     _id: "peer1",
//     description: "peer1",
//   });

//   peer1Replicator.addPeer("peer2", peer2._channel);
//   peer1Replicator
//     .replicate() // will send data to that peer
//     .then(() => {
//       console.log("sent data to the peer");
//     })
//     .catch((e) => console.log("error sending data", e));

//   peer2Db.get("peer1").then((doc) => {
//     console.log("doc peer1 in peer2 db:", doc);
//   });
// });
