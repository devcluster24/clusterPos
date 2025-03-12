import { ArrowDown, ArrowUp, FileText, Gift, RefreshCcw } from "lucide-react";
import StatCard from "./StatCard";

export default function EcommerceMetrics() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 md:gap-6">
      {/* <!-- Metric Item Start --> */}
      <StatCard
        title="Total Sales"
        value="$48,988,078"
        icon={FileText}
        bgColor="bg-orange-500"
        badge={{
          value: "+22%",
          color: "bg-white/20 text-white",
          icon: ArrowUp,
        }}
      />

      <StatCard
        title="Total Sales Return"
        value="$16,478,145"
        icon={RefreshCcw}
        bgColor="bg-blue-900"
        badge={{
          value: "-22%",
          color: "bg-red-500 text-white",
          icon: ArrowDown,
        }}
      />

      <StatCard
        title="Total Purchase"
        value="$24,145,789"
        icon={Gift}
        bgColor="bg-teal-600"
        badge={{
          value: "+22%",
          color: "bg-green-500 text-white",
          icon: ArrowUp,
        }}
      />
      <StatCard
        title="Total Purchase"
        value="$24,145,789"
        icon={Gift}
        bgColor="bg-blue-600"
        badge={{
          value: "+22%",
          color: "bg-green-500 text-white",
          icon: ArrowUp,
        }}
      />
    </div>
  );
}
