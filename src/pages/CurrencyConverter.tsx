import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

type Rates = Record<string, number>;

const defaultCurrencies = [
  "USD","EUR","GBP","JPY","NGN","AUD","CAD","INR","CNY","MXN","BRL","ZAR",
  "NZD","CHF","SEK","NOK","DKK","SGD","HKD","TRY","RUB","AED","SAR","KRW",
  "IDR","MYR","THB","PHP","VND","CZK","PLN"
];

const CurrencyConverter = () => {
  const [searchParams] = useSearchParams();

  const initialAmount = Number(searchParams.get("amount") ?? 1);
  const initialFrom = searchParams.get("from") || "USD";
  const initialTo = searchParams.get("to") || "NGN"; // ✅ default to NGN

  const [amount, setAmount] = useState<number>(initialAmount || 1);
  const [fromCurrency, setFromCurrency] = useState(initialFrom);
  const [toCurrency, setToCurrency] = useState(initialTo);
  const [provider, setProvider] = useState<"exchangerate" | "frankfurter">("exchangerate");

  const [rates, setRates] = useState<Rates>({});
  const [conversionHistory, setConversionHistory] = useState<Array<{
    from:string;to:string;amount:number;converted:number;rate:number;time:string;
  }>>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const inputClass =
    "w-full rounded-xl px-4 py-2 bg-orange-100/10 text-white border border-orange-300/40 " +
    "placeholder-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all";

  // ✅ FETCH RATES
  useEffect(() => {
    const fetchRates = async () => {
      setLoading(true);
      setError(null);

      try {
        const url =
          provider === "exchangerate"
            ? "https://api.exchangerate.host/latest?base=USD"
            : "https://api.frankfurter.app/latest?from=USD";

        const res = await fetch(url);
        if (!res.ok) throw new Error("Unable to fetch exchange rates");

        const data = await res.json();

        if (provider === "exchangerate") {
          setRates({ USD: 1, ...data.rates });
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

  const currencyList = useMemo(() => {
    const keys = Object.keys(rates || {}).sort();
    return keys.length > 0 ? keys : defaultCurrencies;
  }, [rates]);

  const normalizedFrom = currencyList.includes(fromCurrency) ? fromCurrency : "USD";
  const normalizedTo = currencyList.includes(toCurrency) ? toCurrency : "NGN";

  const rate = useMemo(() => {
    if (!rates || !rates[normalizedFrom] || !rates[normalizedTo]) return 0;
    return rates[normalizedTo] / rates[normalizedFrom];
  }, [rates, normalizedFrom, normalizedTo]);

  const converted = Number.isFinite(amount) ? amount * rate : 0;

  // ✅ HISTORY
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

  // ✅ SWAP FUNCTION
  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <section className="min-h-screen bg-linear-to-br from-black via-orange-900 to-red-700 text-white p-6 lg:p-12">
      <div className="max-w-3xl mx-auto bg-black/95 border border-orange-400 rounded-2xl p-8 shadow-2xl">

        <h1 className="text-4xl font-black text-orange-200 mb-3">
          Currency Converter
        </h1>
        <p className="text-orange-100 opacity-90 mb-6">
          Convert menu prices instantly with live exchange rates.
        </p>

        {loading ? (
          <p className="text-orange-100">Loading rates...</p>
        ) : error ? (
          <p className="text-red-300">Error: {error}</p>
        ) : (
          <>
            {/* INPUT GRID */}
            <div className="grid gap-4 md:grid-cols-5 mb-6">

              {/* Provider */}
              <select
                value={provider}
                onChange={(e) =>
                  setProvider(e.target.value as "exchangerate" | "frankfurter")
                }
                className={inputClass}
              >
                <option value="exchangerate" className="text-black">
                  ExchangeRate API
                </option>
                <option value="frankfurter" className="text-black">
                  Frankfurter API
                </option>
              </select>

              {/* Amount */}
              <input
                type="number"
                value={amount}
                min={0}
                onChange={(e) => setAmount(Number(e.target.value))}
                className={inputClass}
                placeholder="Amount"
              />

              {/* From */}
              <select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                className={inputClass}
              >
                {currencyList.map((code) => (
                  <option key={code} value={code} className="text-black">
                    {code}
                  </option>
                ))}
              </select>

              {/* Swap Button */}
              <button
                onClick={handleSwap}
                className="rounded-xl bg-orange-500 hover:bg-orange-600 transition-all px-3 py-2 font-bold"
              >
                ⇄
              </button>

              {/* To */}
              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className={inputClass}
              >
                {currencyList.map((code) => (
                  <option key={code} value={code} className="text-black">
                    {code}
                  </option>
                ))}
              </select>
            </div>

            {/* RESULT */}
            <div className="p-5 rounded-xl bg-black border border-orange-400 shadow-inner">
              <p className="text-sm text-orange-100">
                1 {normalizedFrom} ={" "}
                {rate > 0 ? rate.toFixed(6) : "—"} {normalizedTo}
              </p>

              {rate > 0 ? (
                <p className="text-3xl font-bold text-orange-200 mt-2">
                  {converted.toFixed(2)} {normalizedTo}
                </p>
              ) : (
                <p className="text-gray-300 mt-2">
                  Rate unavailable. Please wait...
                </p>
              )}
            </div>

            {/* HISTORY */}
            <div className="mt-6 rounded-xl border border-orange-300/60 bg-black/70 p-4">
              <h3 className="text-lg text-orange-200 mb-2">
                Conversion History
              </h3>

              {conversionHistory.length === 0 ? (
                <p className="text-gray-300">No conversions yet.</p>
              ) : (
                <ul className="text-sm text-gray-100 space-y-1 max-h-48 overflow-auto">
                  {conversionHistory.map((h, idx) => (
                    <li key={`${h.from}-${h.to}-${idx}`}>
                      {h.time}: {h.amount} {h.from} → {h.converted} {h.to} (
                      {h.rate.toFixed(6)})
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