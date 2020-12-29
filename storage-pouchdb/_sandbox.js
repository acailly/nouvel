const {
  read,
  write,
  remove,
  listKeys,
  listSubFolders,
  keyExists,
} = require("./index");

async function main() {
  const data = await read("toto/titi/tata");
  console.log("AVANT", data);

  await write("toto/titi/tata", { name: "toto", age: 12 });

  const data2 = await read("toto/titi/tata");
  console.log("APRES", data2);

  const keys = await listKeys("toto");
  console.log("NO KEYS", keys);
  const keys2 = await listKeys("toto/titi");
  console.log("KEYS", keys2);
  const exists = await keyExists("toto/titi/tata");
  console.log("EXISTS", exists);
  const subfolders = await listSubFolders("");
  console.log("SUBFOLDERS root", subfolders);
  const subfolders2 = await listSubFolders("toto");
  console.log("SUBFOLDERS", subfolders2);

  await remove("toto/titi/tata");

  const keys3 = await listKeys("toto/titi");
  console.log("KEYS AFTER REMOVED", keys3);
  const exists2 = await keyExists("toto/titi/tata");
  console.log("EXISTS AFTER REMOVE", exists2);
  const subfolders3 = await listSubFolders("toto");
  console.log("SUBFOLDERS AFTER REMOVE", subfolders3);

  await write("toto/titi/tata", { name: "toto2", age: 24 });

  const keys4 = await listKeys("toto/titi");
  console.log("KEYS AFTER REMOVED THEN PUT", keys4);
  const exists3 = await keyExists("toto/titi/tata");
  console.log("EXISTS AFTER REMOVE THEN PUT", exists3);
  const subfolders4 = await listSubFolders("toto");
  console.log("SUBFOLDERS AFTER REMOVE THEN PUT", subfolders4);
}

main();
