import PromptSync from "prompt-sync";
import lbtt from "./lbtt";
import { UserError } from "./types";

const prompt = PromptSync()

const price = prompt("What is the purchase price of the house?");
if (price.length === 0) {
    console.log('No price specified, exiting...');
    process.exit()
}

let priceNum : number = parseFloat(price)

try {
    const calculatedLbtt = lbtt(priceNum)
    console.log('The LBTT to pay on a house worth £%i is: £%i', priceNum, calculatedLbtt)
} catch (error) {
    if (error instanceof UserError) {
        // do not print the entire stack to the user
        console.error(error.message)
        process.exit(1)
    } else {
        // if not a UserError then it suggests something more serious, throw on with stack
        throw error
    }
}