import ActionButton from "@/components/ui/button/NavMenuButton";
import NavMenuCard from "@/components/ui/card/NavMenuCard";
import SummaryCard, { Status } from "@/components/ui/card/SummaryCard";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setGState } from "@/redux/features/state/stateSlice";
import { RootState } from "@/redux/store";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  List,
  Upload,
  AlertCircle,
  Grid,
  Badge,
  BaggageClaim,
  Boxes,
  Shield,
  Layers,
  Barcode,
  Users,
} from "lucide-react";
import DefaultCard from "@/components/ui/card/DefaultCard";

const InventoryItems = [
  {
    category: "PRODUCT MANAGEMENT",
    buttons: [
      { label: "Add Product", icon: Plus, link: "/products/create" },
      { label: "Product List", icon: List, link: "/products/list" },
      { label: "Import Products", icon: Upload, link: "/products/import" },
      { label: "Expired Product List", icon: List, link: "/products/expired" },
      {
        label: "Alert Quantities",
        icon: AlertCircle,
        link: "/products/alert-quantities",
      },
      { label: "Categories", icon: Grid, link: "/products/categories" },
      { label: "Sub Categories", icon: Grid, link: "/products/sub-categories" },
      { label: "Brands", icon: Badge, link: "/products/brands" },
      { label: "Units", icon: BaggageClaim, link: "/products/units" },
      { label: "Bulk Variants", icon: Boxes, link: "/comming-soon" },
      { label: "Warranties", icon: Shield, link: "/comming-soon" },
      { label: "Selling Price Groups", icon: Layers, link: "/comming-soon" },
      { label: "Generate Barcode", icon: Barcode, link: "/comming-soon" },
    ],
  },
  {
    category: "MANAGE STOCK ISSUES",
    buttons: [
      { label: "Add Stock Issue", icon: Plus, link: "/comming-soon" },
      { label: "Stock Issue List", icon: List, link: "/comming-soon" },
      {
        label: "Stock Issued Product List",
        icon: List,
        link: "/comming-soon",
      },
    ],
  },
  {
    category: "PRODUCT REPORTS",
    buttons: [
      { label: "Stock Report", icon: Users, link: "/stock-report" },
      {
        label: "Stock Out Products Report",
        icon: Users,
        link: "/stock-out-products-report",
      },
      { label: "Stock In-Out Report", icon: Layers, link: "/stock-in-out" },
    ],
  },
];

export const stats: Status[] = [
  {
    title: "Total In-Progress Todo",
    count: 0,
    color: "bg-yellow-100 text-yellow-700",
  },
  { title: "Total On-Hold Todo", count: 0, color: "bg-red-100 text-red-700" },
  {
    title: "Total Completed Todo",
    count: 0,
    color: "bg-green-100 text-green-700",
  },
  {
    title: "Total In-Progress Project",
    count: 0,
    color: "bg-yellow-100 text-yellow-700",
  },
];

const InventoryTabItems = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { activeTab } = useAppSelector((state: RootState) => state.gState);

  const handleNavigation = (link: string) => {
    dispatch(setGState({ previousActiveTab: activeTab, activePage: true }));
    navigate(link);
  };

  return (
    <>
      <SummaryCard stats={stats} />
      <DefaultCard>
        <div className="grid grid-cols-1 gap-4">
          {InventoryItems.map((menu) => (
            <NavMenuCard key={menu.category} title={menu.category}>
              {menu.buttons.map(({ label, icon, link }) => (
                <ActionButton
                  key={label}
                  label={label}
                  icon={icon}
                  onClick={() => handleNavigation(link)}
                />
              ))}
            </NavMenuCard>
          ))}
        </div>
      </DefaultCard>
    </>
  );
};

export default InventoryTabItems;
