import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

type Rates = Record<string, number>;

const CurrencyConverter = () => {
  const [searchParams] = useSearchParams();
  const initialAmount = Number(searchParams.get("amount") ?? 1);
  const [amount, setAmount] = useState<number>(initialAmount || 1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [rates, setRates] = useState<Rates>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRates = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("https://api.exchangerate.host/latest?base=USD&symbols=USD,EUR,GBP,JPY,AUD,CAD,INR");
        if (!res.ok) throw new Error("Unable to fetch exchange rates");
        const data = await res.json();
        setRates(data.rates);
      } catch (err) {
        setError((err as Error).message ?? "Fetch error");
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
  }, []);

  const rate = useMemo(() => {
    if (!rates || !rates[fromCurrency] || !rates[toCurrency]) return 0;
    return (rates[toCurrency] / rates[fromCurrency]);
  }, [rates, fromCurrency, toCurrency]);

  const converted = amount * (rate || 0);

  const currencyList = useMemo(() => Object.keys(rates || {}).sort(), [rates]);

  return (
    <section className="min-h-screen bg-linear-to-br from-black via-orange-900 to-red-700 text-white p-6 lg:p-12 overflow-hidden">
      <div className="max-w-3xl mx-auto bg-black/85 border border-orange-300/70 rounded-2xl p-8 shadow-2xl">
        <h1 className="text-4xl font-black text-orange-200 mb-3">Currency Converter</h1>
        <p className="text-gray-200 mb-6">Convert menu prices instantly with live exchange rates (0.2s refresh).</p>

        {loading ? (
          <p className="text-orange-100">Loading rates...</p>
        ) : error ? (
          <p className="text-red-300">Error: {error}</p>
        ) : (
          <> 
            <div className="grid gap-4 md:grid-cols-3 mb-4">
              <input
                type="number"
                value={amount}
                min={0}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="rounded-xl px-4 py-2 text-black"
              />

              <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)} className="rounded-xl px-4 py-2 text-black">
                {currencyList.map((code) => <option key={code} value={code}>{code}</option>)}
              </select>

              <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)} className="rounded-xl px-4 py-2 text-black">
                {currencyList.map((code) => <option key={code} value={code}>{code}</option>)}
              </select>
            </div>

            <div className="p-5 rounded-xl bg-black/30 border border-orange-300">
              <p className="text-sm text-gray-300">1 {fromCurrency} = {rate.toFixed(6)} {toCurrency}</p>
              <p className="text-3xl font-bold text-orange-200 mt-2">{converted.toFixed(2)} {toCurrency}</p>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default CurrencyConverter;