import ActionButton from "@/components/ui/button/NavMenuButton";
import NavMenuCard from "@/components/ui/card/NavMenuCard";
import SummaryCard from "@/components/ui/card/SummaryCard";
import { Banknote, Book, Contrast, Receipt } from "lucide-react";
import { stats } from "./InventoryTabItems";

const AccountingItems = [
  {
    category: "ACCOUNT MANAGEMENT",
    buttons: [
      { label: "Banks", icon: Banknote, link: "/accounting/banks" },
      // { label: "Account Groups", icon: Banknote, link: "/account-groups" },
      { label: "Accounts", icon: Banknote, link: "/accounting/accounts" },
      {
        label: "Capital Accounts",
        icon: Banknote,
        link: "/accounting/accounts/capitals",
      },
      {
        label: "Duties And Taxes",
        icon: Banknote,
        link: "/accounting/accounts/duties-and-taxes",
      },
    ],
  },
  {
    category: "ACCOUNTING VOUCHERS",
    buttons: [
      { label: "Receipts", icon: Receipt, link: "/accounting/receipts" },
      { label: "Payments", icon: Banknote, link: "/accounting/payments" },
      { label: "Expenses", icon: Banknote, link: "/accounting/expenses" },
      { label: "Contras", icon: Contrast, link: "/accounting/contras" },
      { label: "Journals", icon: Banknote, link: "/accounting/journals" },
    ],
  },
  {
    category: "ACCOUNT REPORTS",
    buttons: [
      {
        label: "Profit/Loss",
        icon: Banknote,
        link: "/accounting/reports/profit-loss",
      },
      {
        label: "Financial Report",
        icon: Banknote,
        link: "/accounting/reports/financial",
      },
      {
        label: "Trial Balance",
        icon: Banknote,
        link: "/accounting/reports/trial-balance",
      },
      {
        label: "Vat/Tax Report",
        icon: Banknote,
        link: "/accounting/reports/vat-tax",
      },
      {
        label: "Cash Flow",
        icon: Banknote,
        link: "/accounting/reports/cash-flow",
      },
      { label: "Day Book", icon: Book, link: "/reports/day-book" },
      { label: "Expense Report", icon: Banknote, link: "/reports/expenses" },
    ],
  },
];

const AccountingTabItems = () => {
  return (
    <>
      <SummaryCard stats={stats} />

      <div className="grid grid-cols-1 gap-4 p-3">
        {AccountingItems.map((menu) => (
          <NavMenuCard key={menu.category} title={menu.category}>
            {menu.buttons.map(({ label, icon, link }) => (
              <ActionButton
                key={label}
                label={label}
                icon={icon}
                onClick={() => (window.location.href = link)}
              />
            ))}
          </NavMenuCard>
        ))}
      </div>
    </>
  );
};

export default AccountingTabItems;
