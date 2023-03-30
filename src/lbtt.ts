import { TaxBand } from "./TaxBand"
import { UserError } from "./types"

/**
 * Calculates the amount of LBTT from a given price.
 * @param priceNum The price to calculate tax from.
 * @returns The calculated tax to 2 decimal places.
 */
export default (priceNum: number) => {

    if (isNaN(priceNum)) {
        throw new UserError('Cannot resolve a number from given input')
    }

    if (priceNum < 0) {
        throw new UserError('Cannot parse negative numbers')
    }

    const tiers = [
        new TaxBand(145000, 2),
        new TaxBand(250000, 5),
        new TaxBand(325000, 10),
        new TaxBand(750000, 12),
    ]

    let totalTax = 0

    tiers.reverse().forEach((tier) =>  {
        if (priceNum > tier.threshold) {
            const baseAmount = priceNum - tier.threshold
            const taxedAmount = baseAmount * (tier.rate / 100)
            priceNum = tier.threshold
            totalTax += taxedAmount
        }
    })
    
    return parseFloat(totalTax.toFixed(2))
}