import { useEffect, useState } from "react";
import Select from "../Select";
import './Converter.css';

interface Rates {
    [currency: string]: number;
}

interface RatesProps {
    rates: Rates;
}

const Converter: React.FC<RatesProps> = ({
    rates
}) => {

    const [toCurrency, setToCurrency] = useState<string>('');
    const [fromCurrency, setFromCurrency] = useState<string>('');
    const [toAmount, setToAmount] = useState<number>(0);
    const [fromAmount, setFromAmount] = useState<number>(1);
    const [isFromAmountChanging, setIsFromAmountChanging] = useState<boolean>(true);

    const handleConvert = () => {
        const rateTo = rates[toCurrency];
        const rateFrom = rates[fromCurrency];
        const converted = (fromAmount / rateFrom) * rateTo;
        setToAmount(converted);
    }

    const handleConvertReverse = () => {
        const rateTo = rates[toCurrency];
        const rateFrom = rates[fromCurrency];
        const converted = (toAmount * rateFrom) / rateTo;
        setFromAmount(converted);
    }


    useEffect(() => {
        if (isFromAmountChanging) {
            handleConvert();
        } else {
            handleConvertReverse();
        }
    }, [fromAmount, toAmount, fromCurrency, toCurrency, rates, isFromAmountChanging]);

    const handleFromAmountChange = (amount: number) => {
        setFromAmount(amount);
        setIsFromAmountChanging(true);
    };

    const handleToAmountChange = (amount: number) => {
        setToAmount(amount);
        setIsFromAmountChanging(false);
    };
    return (
        <>
            <Select label='From' amount={fromAmount} currency={fromCurrency} rates={rates} onAmountChange={handleFromAmountChange} onCurrencyChange={setFromCurrency} />
                <span className="equals">=</span>
            <Select label='To' amount={toAmount} currency={toCurrency} rates={rates} onAmountChange={handleToAmountChange} onCurrencyChange={setToCurrency} />
        </>

    )
}

export default Converter;