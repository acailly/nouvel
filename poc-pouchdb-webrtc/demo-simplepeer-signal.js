var Peer = require("simple-peer");
var wrtc = require("wrtc");

var PouchDB = require("pouchdb"); // not included
PouchDB.plugin(require("pouchdb-adapter-memory"));
var PouchReplicator = require("pouch-replicate-webrtc");

const io = require("socket.io-client");
const SimpleSignalClient = require("simple-signal-client");

const { v4: uuidv4 } = require("uuid");
const myID = uuidv4();
console.log("je suis", myID);

var peerDb = new PouchDB("peer-db", { adapter: "memory" });

peerDb.put({
  _id: myID,
  description: myID,
});

const socket = io("https://acailly-simple-signal.herokuapp.com/");
const signalClient = new SimpleSignalClient(socket);

let currentRoom;

function onPeer(peer, peerID) {
  var peerReplicator = new PouchReplicator(peerID, PouchDB, peerDb, {
    batch_size: 50,
  });

  peerReplicator.on("endpeerreplicate", function () {
    console.log("received data replicated from peer", peerID);

    console.log("===============");
    console.log("Logging docs in", myID);
    peerDb.allDocs().then(function (result) {
      result.rows
        .map((result) => result.id)
        .map((id) => {
          console.log(" - doc id:", id);
        });
      console.log("===============");
    });
  });

  peerReplicator.addPeer(peerID, peer._channel);
  peerReplicator
    .replicate() // will send data to that peer
    .then(() => {
      console.log("sent data to the peer", peerID);
    })
    .catch((e) => console.log("error sending data", e));
}

signalClient.on("request", async (request) => {
  try {
    const { peer } = await request.accept(null, { wrtc });
    onPeer(peer);
  } catch (e) {
    console.error("failed to get peer");
  }
});

async function connectToPeer(peerID) {
  console.log("connecting to peer", peerID);
  try {
    const { peer } = await signalClient.connect(peerID, currentRoom, { wrtc }); // connect to the peer
    console.log("connected to peer", peerID);
    onPeer(peer, peerID);
  } catch (e) {
    console.error("failed to connect to peer", peerID);
  }
}

function joinRoom(roomID) {
  console.log("join", roomID);
  // disconnect from all peers in old room
  if (currentRoom) {
    if (currentRoom !== roomID) {
      signalClient.peers().forEach((peer) => {
        peer.destroy();
      });
    } else {
      return;
    }
  }
  currentRoom = roomID; // update current room
  console.log("requesting to join", roomID);
  signalClient.discover(roomID);

  // get the peers in this room
  function onRoomPeers(discoveryData) {
    if (discoveryData.roomResponse == roomID) {
      console.log(discoveryData);
      signalClient.removeListener("discover", onRoomPeers);
      discoveryData.peers.forEach((peerID) => connectToPeer(peerID)); // connect to all peers in new room
    }
  }
  signalClient.addListener("discover", onRoomPeers);
}

joinRoom("testRoomName");
