var Peer = require("simple-peer");
var wrtc = require("wrtc");

var PouchDB = require("pouchdb"); // not included
var PouchReplicator = require("pouch-replicate-webrtc");

var peer1 = new Peer({ initiator: true, wrtc: wrtc });
var peer2 = new Peer({ wrtc: wrtc });

peer1.on("signal", (data) => {
  // when peer1 has signaling data, give it to peer2 somehow
  peer2.signal(data);
});

peer2.on("signal", (data) => {
  // when peer2 has signaling data, give it to peer1 somehow
  peer1.signal(data);
});

peer1.on("connect", () => {
  // wait for 'connect' event before using the data channel
  peer1.send("hey peer2, how is it going?");

  var peer1Db = new PouchDB("peer1-db");
  var peer1Replicator = new PouchReplicator("peer2-db", PouchDB, peer1Db, {
    batch_size: 50,
  });

  peer1Replicator.on("endpeerreplicate", function () {
    console.log("peer 1 received data replicated from the peer 2");
  });

  var peer2Db = new PouchDB("peer1-db");
  var peer2Replicator = new PouchReplicator("peer1-db", PouchDB, peer2Db, {
    batch_size: 50,
  });

  peer2Replicator.on("endpeerreplicate", function () {
    console.log("peer 2 received data replicated from the peer 1");
  });

  peer1Db.put({
    _id: "peer1",
    description: "peer1",
  });

  peer1Replicator.addPeer("peer2", peer2._channel);
  peer1Replicator
    .replicate() // will send data to that peer
    .then(() => {
      console.log("sent data to the peer");
    })
    .catch((e) => console.log("error sending data", e));

  peer2Db.get("peer1").then((doc) => {
    console.log("doc peer1 in peer2 db:", doc);
  });
});

peer2.on("data", (data) => {
  // got a data channel message
  console.log("got a message from peer1: " + data);
});
