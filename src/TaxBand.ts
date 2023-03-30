export class TaxBand {

    /**
     * The lower threshold of the tax band in pounds.
     */
    private _threshold: number;

    /**
     * The percentage rate of which the band will be taxed at. 
     */
    private _rate: number;

    constructor(threshold: number, rate: number) {
        this._threshold = threshold;
        this._rate = rate;
    }

    public get threshold(): number {
        return this._threshold;
    }
    public set threshold(value: number) {
        this._threshold = value;
    }
    public get rate(): number {
        return this._rate;
    }
    public set rate(value: number) {
        this._rate = value;
    }

}