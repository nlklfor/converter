interface CurrencyProps {
    label: string;
    amount: number;
    currency: string;
    rates: { [key: string]: number };
    onAmountChange: (amount: number) => void;
    onCurrencyChange: (currency: string) => void;
}



const Select: React.FC<CurrencyProps> = ({
    label, amount, rates, onAmountChange, onCurrencyChange, currency
}) => {

    const onAmountHandle = (e: any) => {
        onAmountChange(parseFloat(e.target.value))
    };

    const onCurrencyHandle = (e: any) => {
        onCurrencyChange(e.target.value)
    };

    return(
        <section className="currency-input">
      <input
        type="number"
        value={amount}
        onChange={onAmountHandle}
        placeholder="Amount"
      />
      <select
        value={currency}
        onChange={onCurrencyHandle}
      >
        <option value="">-- Select {label} --</option>
        {Object.entries(rates).slice(0, 15).map(([curr]) => (
          <option key={curr} value={curr}>
            {curr}
          </option>
        ))}
      </select>
    </section>
    )
}

export default Select;