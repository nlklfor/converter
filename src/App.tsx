import money from './assets/money.svg'
import './App.css'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Converter from './Converter/Converter';

interface Rates {
  [currency: string]: number;
}

const App: React.FC = () => {

  const [rates, setRates] = useState<Rates>(Object);
  const [error, setError] = useState<string | null>(null);



  useEffect(() => {
    const fetchCurrency = async () => {
      try {
        const response = await axios.get('https://api.exchangeratesapi.io/v1/latest', {
          params: {
            access_key: 'e433d9eb25cc9089e2e1a3f4c1ad94bc',
          },
        });
        setRates(response.data.rates)
      }
      catch (err) {
        setError('Failed to fetch data')
      }
    }
    fetchCurrency();
  }, []);


  return (
    <main className='converter-container'>
      <header className='converter-header'>
        <h1 className='converter-title'>Currency Exchange Rates</h1>

        {error ? <p>{error}</p> : (rates ? (
          <ul className='rates'>
            {Object.entries(rates).slice(0, 10).map(([currency, rate]) => (
              <li key={currency}>
                {currency}: {rate}
              </li>
            ))}
          </ul>
        ) : (
          <h2>Loading...</h2>
        ))}

      </header>
      <section>
        <a target="_blank">
          <img src={money} className="logo" alt="Vite logo" />
        </a>
        <Converter rates={rates} />
      </section>
    </main>
  )
}

export default App
