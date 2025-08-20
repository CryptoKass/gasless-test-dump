# Install dependencies
```
pnpm install
```

- gasless_setup.ts – creates the first package on the gasless contract
- gasless_purchase.ts – deploys a demo contract, and purchases credits, and then tries to gasless call that example contract.


# Run the demo
- runs both gasless_setup.ts then gasless_purchase.ts
```
# Run the demo
RPC_URL="http://127.0.0.1:8545" pnpm demo
```


### Run individually
```
# If you dont have tsx then
npm install -g tsx

RPC_URL="http://127.0.0.1:8545" tsx ./src/gasless_setup.ts   
RPC_URL="http://127.0.0.1:8545" tsx ./src/gasless_purchase.ts   
```