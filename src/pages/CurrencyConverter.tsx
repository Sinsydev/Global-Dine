import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

type Rates = Record<string, number>;

const CurrencyConverter = () => {
  const [searchParams] = useSearchParams();
  const initialAmount = Number(searchParams.get("amount") ?? 1);
  const initialFrom = searchParams.get("from") || "USD";
  const initialTo = searchParams.get("to") || "EUR";
  const [amount, setAmount] = useState<number>(initialAmount || 1);
  const [fromCurrency, setFromCurrency] = useState(initialFrom);
  const [toCurrency, setToCurrency] = useState(initialTo);
  const [provider, setProvider] = useState<"exchangerate" | "frankfurter">("exchangerate");
  const [rates, setRates] = useState<Rates>({});
  const [conversionHistory, setConversionHistory] = useState<Array<{from:string;to:string;amount:number;converted:number;rate:number;time:string;}>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRates = async () => {
      setLoading(true);
      setError(null);
      try {
        let url = "";

        if (provider === "exchangerate") {
          url = "https://api.exchangerate.host/latest?base=USD&symbols=USD,EUR,GBP,JPY,AUD,CAD,INR";
        } else {
          url = "https://api.frankfurter.app/latest?from=USD&to=USD,EUR,GBP,JPY,AUD,CAD,INR";
        }

        const res = await fetch(url);
        if (!res.ok) throw new Error("Unable to fetch exchange rates");
        const data = await res.json();

        if (provider === "exchangerate") {
          setRates(data.rates);
        } else {
          setRates({ ...data.rates, USD: 1 });
        }
      } catch (err) {
        setError((err as Error).message ?? "Fetch error");
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
  }, [provider]);

  const rate = useMemo(() => {
    if (!rates || !rates[fromCurrency] || !rates[toCurrency]) return 0;
    return (rates[toCurrency] / rates[fromCurrency]);
  }, [rates, fromCurrency, toCurrency]);

  const converted = amount * (rate || 0);

  const currencyList = useMemo(() => Object.keys(rates || {}).sort(), [rates]);

  useEffect(() => {
    if (rate > 0) {
      setConversionHistory((prev) => {
        const entry = {
          from: fromCurrency,
          to: toCurrency,
          amount,
          converted: Number(converted.toFixed(2)),
          rate,
          time: new Date().toLocaleTimeString(),
        };
        return [entry, ...prev].slice(0, 8);
      });
    }
  }, [rate, amount, fromCurrency, toCurrency, converted]);

  return (
    <section className="min-h-screen bg-linear-to-br from-black via-orange-900 to-red-700 text-white p-6 lg:p-12 overflow-visible">
      <div className="max-w-3xl mx-auto bg-black/95 border-2 border-orange-400 rounded-2xl p-8 shadow-2xl">
        <h1 className="text-4xl font-black text-orange-200 mb-3">Currency Converter</h1>
        <p className="text-orange-100 opacity-90 mb-6">Convert menu prices instantly with live exchange rates (0.2s refresh).</p>

        {loading ? (
          <p className="text-orange-100">Loading rates...</p>
        ) : error ? (
          <p className="text-red-300">Error: {error}</p>
        ) : (
          <> 
            <div className="grid gap-4 md:grid-cols-4 mb-4">
              <select value={provider} onChange={(e) => setProvider(e.target.value as "exchangerate" | "frankfurter")} className="relative z-20 rounded-xl px-4 py-2 text-black">
                <option value="exchangerate">ExchangeRate API</option>
                <option value="frankfurter">Frankfurter API</option>
              </select>

              <input
                type="number"
                value={amount}
                min={0}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="relative z-20 rounded-xl px-4 py-2 text-black bg-orange-50/20 placeholder-orange-300"
                placeholder="Amount"
              />

              <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)} className="relative z-20 rounded-xl px-4 py-2 text-black bg-orange-50/20">
                {currencyList.map((code) => <option key={code} value={code}>{code}</option>)}
              </select>

              <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)} className="rounded-xl px-4 py-2 text-black">
                {currencyList.map((code) => <option key={code} value={code}>{code}</option>)}
              </select>
            </div>

            <div className="p-5 rounded-xl bg-black border-2 border-orange-400 shadow-inner">
              <p className="text-sm text-orange-100">1 {fromCurrency} = {rate.toFixed(6)} {toCurrency}</p>
              <p className="text-3xl font-bold text-orange-200 mt-2">{converted.toFixed(2)} {toCurrency}</p>
            </div>

            <div className="mt-6 rounded-xl border border-orange-300/60 bg-black/70 p-4">
              <h3 className="text-lg text-orange-200 mb-2">Conversion History</h3>
              {conversionHistory.length === 0 ? (
                <p className="text-gray-300">No conversions yet.</p>
              ) : (
                <ul className="text-sm text-gray-100 space-y-1 max-h-48 overflow-auto">
                  {conversionHistory.map((h, idx) => (
                    <li key={`${h.from}-${h.to}-${idx}`}>
                      {h.time}: {h.amount} {h.from} → {h.converted} {h.to} ({h.rate.toFixed(6)})
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default CurrencyConverter;