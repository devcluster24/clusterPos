import ActionButton from "@/components/ui/button/NavMenuButton";
import NavMenuCard from "@/components/ui/card/NavMenuCard";
import SummaryCard from "@/components/ui/card/SummaryCard";
import {
  CalendarX,
  Users,
  ClipboardList,
  PiggyBank,
  CalendarDays,
  Building,
  MapPin,
  Wallet,
  FileText,
  CreditCard,
  ClipboardCheck,
} from "lucide-react";
import { stats } from "./InventoryTabItems";

const HRMItems = [
  {
    category: "HUMAN RESOURCE MANAGEMENT SYSTEM",
    buttons: [
      { label: "Leaves", icon: CalendarX, link: "/leaves" },
      { label: "Shifts", icon: Users, link: "/shifts" },
      { label: "Attendances", icon: ClipboardList, link: "/attendances" },
      {
        label: "Allowances & Deductions",
        icon: PiggyBank,
        link: "/allowances-deductions",
      },
      { label: "Holidays", icon: CalendarDays, link: "/holidays" },
      { label: "Departments", icon: Building, link: "/departments" },
      { label: "Designations", icon: MapPin, link: "/designations" },
      { label: "Payrolls", icon: Wallet, link: "/payrolls" },
    ],
  },
  {
    category: "HRM REPORTS",
    buttons: [
      { label: "Payroll Report", icon: FileText, link: "/payroll-report" },
      {
        label: "Payroll Payment Report",
        icon: CreditCard,
        link: "/payroll-payment-report",
      },
      {
        label: "Attendances Report",
        icon: ClipboardCheck,
        link: "/attendances-report",
      },
    ],
  },
];

const HrmTabItems = () => {
  return (
    <>
      <SummaryCard stats={stats} />

      <div className="grid grid-cols-1 gap-4 p-3">
        {HRMItems.map((menu) => (
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

export default HrmTabItems;
