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

    // structure is [lower bound, percent tax rate]
    const tiers = [
        [0, 0],
        [145000, 2],
        [250000, 5],
        [325000, 10],
        [750000, 12],
    ]

    let totalTax = 0
    let idx = 0

    while (priceNum > 0) {
        const [lower, rate] = tiers[idx]
        const finalTier = ++idx >= tiers.length;
        // higher is not used when finalTier is true so add a safe numerical default to satisfy compiler
        const [higher, _] = !finalTier ? tiers[idx] : [0,0] 

        const baseAmount = finalTier ? priceNum : Math.min(higher - lower, priceNum)
        priceNum -= baseAmount
        // console.log('Base amount to calc tax from:', baseAmount)
        const taxedAmount = baseAmount * (rate / 100)
        // console.log(`£${lower}${higher > 0 ? ' - £' + higher : '+'}: ${taxedAmount}`)
        totalTax += taxedAmount
    }
    return parseFloat(totalTax.toFixed(2))
}