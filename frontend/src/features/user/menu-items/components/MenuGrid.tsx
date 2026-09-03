// src/modules/menu/components/MenuGrid.tsx
import MenuCard from "./MenuCard";
import type { IMenuProduct } from "../types/menuTypes";
import { Link } from "react-router-dom";

type Props = {
  items: IMenuProduct[];
};

export default function MenuGrid({ items }: Props) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <Link key={item.id} to={`/menuDetails/${item.id}`}>
        <MenuCard  item={item} />
        </Link>
      ))}
    </div>
  );
}