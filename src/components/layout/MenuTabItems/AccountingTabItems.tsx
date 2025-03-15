import ActionButton from "@/components/ui/button/NavMenuButton";
import NavMenuCard from "@/components/ui/card/NavMenuCard";
import { Banknote, Book, Contrast, Receipt } from "lucide-react";

const AccountingItems = [
  {
    category: "ACCOUNT MANAGEMENT",
    buttons: [
      { label: "Banks", icon: Banknote, link: "/banks" },
      { label: "Account Groups", icon: Banknote, link: "/account-groups" },
      { label: "Accounts", icon: Banknote, link: "/accounts" },
      { label: "Capital Accounts", icon: Banknote, link: "/capital-accounts" },
      { label: "Duties And Taxes", icon: Banknote, link: "/duties-and-taxes" },
    ],
  },
  {
    category: "ACCOUNTING VOUCHERS",
    buttons: [
      { label: "Receipts", icon: Receipt, link: "/receipts" },
      { label: "Payments", icon: Banknote, link: "/payments" },
      { label: "Expenses", icon: Banknote, link: "/expenses" },
      { label: "Contras", icon: Contrast, link: "/contras" },
      { label: "Journals", icon: Banknote, link: "/journals" },
    ],
  },
  {
    category: "ACCOUNT REPORTS",
    buttons: [
      { label: "Profit/Loss", icon: Banknote, link: "/profit-loss" },
      { label: "Financial Report", icon: Banknote, link: "/financial-report" },
      { label: "Trial Balance", icon: Banknote, link: "/trial-balance" },
      { label: "Vat/Tax Report", icon: Banknote, link: "/vat-tax-report" },
      { label: "Cash Flow", icon: Banknote, link: "/cash-flow" },
      { label: "Day Book", icon: Book, link: "/day-book" },
      { label: "Expense Report", icon: Banknote, link: "/expense-report" },
    ],
  },
];

const AccountingTabItems = () => {
  return (
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
  );
};

export default AccountingTabItems;
