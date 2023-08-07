const accounts = await kondor.getAccounts();
const provider = new Provider(["https://api.koinos.io"]);
const userAddress = accounts[0].address;
const todosContractAddress = "19JntSm8pSNETT9aHTwAUHC5RMoaSmgZPJ";

const todosContract = new Contract({
  id: todosContractAddress,
  provider,
  signer: kondor.getSigner(userAddress),
});

// get the abi of todosContract
await todosContract.fetchAbi();

// add todos
const { transaction, receipt } = await todosContract.functions.add_todos({
  task: "my task 1",
});
console.log("submitted. Receipt:");
console.log(receipt);

// wait to be mined
const { blockNumber } = await transaction.wait();
console.log(`mined in block ${blockNumber}`);

// get todos
const { result } = await todosContract.functions.get_todos();
console.log("todos list");
console.log(result);


