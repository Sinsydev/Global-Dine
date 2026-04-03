import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ChevronDown } from "lucide-react";

type Rates = Record<string, number>;

type HistoryItem = {
  from: string;
  to: string;
  amount: number;
  converted: number;
  rate: number;
  time: string;
};

const defaultCurrencies = [
  "USD","EUR","GBP","JPY","NGN","AUD","CAD","INR","CNY","MXN","BRL","ZAR",
  "NZD","CHF","SEK","NOK","DKK","SGD","HKD","TRY","RUB","AED","SAR","KRW",
  "IDR","MYR","THB","PHP","VND","CZK","PLN"
];

// 🌍 Flags
const getFlag = (code: string) => {
  const map: Record<string, string> = {
    USD: "🇺🇸", NGN: "🇳🇬", EUR: "🇪🇺", GBP: "🇬🇧", JPY: "🇯🇵",
    CAD: "🇨🇦", AUD: "🇦🇺", INR: "🇮🇳", CNY: "🇨🇳", ZAR: "🇿🇦"
  };
  return map[code] || "🏳️";
};

// 🔥 Custom dropdown
const CustomSelect = ({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = options.filter((o) =>
    o.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative w-full">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between rounded-xl px-4 py-2 bg-orange-100/10 text-white border border-orange-300/40"
      >
        <span className="flex items-center gap-2">
          {getFlag(value)} {value}
        </span>
        <ChevronDown size={16} />
      </button>

      {open && (
        <div className="absolute z-50 mt-2 w-full bg-black border border-orange-400 rounded-xl shadow-xl">
          <input
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-3 py-2 bg-black text-white border-b border-orange-300/30 outline-none"
          />

          <div className="max-h-48 overflow-auto">
            {filtered.map((opt) => (
              <div
                key={opt}
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                  setSearch("");
                }}
                className="px-4 py-2 hover:bg-orange-500 cursor-pointer flex gap-2"
              >
                {getFlag(opt)} {opt}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const CurrencyConverter = () => {
  const [searchParams] = useSearchParams();

  const initialAmount = Number(searchParams.get("amount") ?? 1);
  const initialFrom = searchParams.get("from") || "USD";
  const initialTo = searchParams.get("to") || "NGN";

  const [amount, setAmount] = useState<number>(initialAmount || 1);
  const [fromCurrency, setFromCurrency] = useState(initialFrom);
  const [toCurrency, setToCurrency] = useState(initialTo);
  const [provider, setProvider] = useState<"exchangerate" | "frankfurter">("exchangerate");

  const [rates, setRates] = useState<Rates>({});
  const [conversionHistory, setConversionHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const inputClass =
    "w-full rounded-xl px-4 py-2 bg-orange-100/10 text-white border border-orange-300/40";

  // 🔄 Fetch rates
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
        if (!res.ok) throw new Error("Failed to fetch rates");

        const data = await res.json();
        setRates({ USD: 1, ...data.rates });
      } catch (err) {
        setError((err as Error).message);
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

  const rate =
    rates[fromCurrency] && rates[toCurrency]
      ? rates[toCurrency] / rates[fromCurrency]
      : 0;

  const converted = amount * rate;

  // 🧠 History tracking
  useEffect(() => {
    if (rate > 0) {
      setConversionHistory((prev) => {
        const entry: HistoryItem = {
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

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-black via-orange-900 to-red-700 text-white p-6">
      <div className="max-w-3xl mx-auto bg-black/95 border border-orange-400 rounded-2xl p-8">

        <h1 className="text-3xl font-bold mb-4">Currency Converter</h1>

        {loading && (
          <p className="text-orange-200 mb-4">Fetching latest rates...</p>
        )}

        {error && (
          <p className="text-red-400 mb-4">Error: {error}</p>
        )}

        <div className="grid gap-4 md:grid-cols-5 mb-6">

          {/* Provider */}
          <CustomSelect
            value={provider}
            onChange={(v) => setProvider(v as "exchangerate" | "frankfurter")}
            options={["exchangerate", "frankfurter"]}
          />

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
          <CustomSelect
            value={fromCurrency}
            onChange={setFromCurrency}
            options={currencyList}
          />

          {/* Swap */}
          <button
            onClick={handleSwap}
            className="bg-orange-500 hover:bg-orange-600 rounded-xl px-3 font-bold"
          >
            ⇄
          </button>

          {/* To */}
          <CustomSelect
            value={toCurrency}
            onChange={setToCurrency}
            options={currencyList}
          />
        </div>

        {/* Result */}
        <div className="p-4 border border-orange-400 rounded-xl">
          <p>
            {amount} {fromCurrency} ={" "}
            <strong>
              {rate > 0 ? converted.toFixed(2) : "—"} {toCurrency}
            </strong>
          </p>
          {rate > 0 && (
            <p className="text-sm text-orange-200 mt-1">
              1 {fromCurrency} = {rate.toFixed(6)} {toCurrency}
            </p>
          )}
        </div>

        {/* History */}
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

      </div>
    </section>
  );
};

export default CurrencyConverter;