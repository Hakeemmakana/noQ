import { useEffect, useMemo, useState } from "react";
import CommonPagination from "../../../common/CommonPagination";
import MenuFiltersSidebar from "../components/MenuFiltersSidebar";
import MenuFilterDrawer from "../components/MenuFilterDrawer";
import MenuGrid from "../components/MenuGrid";
import MenuSkeleton from "../components/MenuSkeleton";
import EmptyState from "../components/EmptyState";
import useDebounce from "../hooks/useDebounce";
import { menuService } from "../service/menuService";
import { cartService } from "../service/cartService";
import type {
  CartLine,
  ICategory,
  IMenuProduct,
  ItemType,
  MenuFilters,
} from "../types/menuTypes";
import { errorToast } from "../../../../shared/utils/toastNotification";
import { useSearchParams, useOutletContext } from "react-router-dom";

type OutletContextType = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

export default function UserMenuPage() {
  const [filterParams, setFilterParams] = useSearchParams();
  const { search: contextSearch, setSearch } = useOutletContext<OutletContextType>();

  useEffect(() => {
    const urlSearch = filterParams.get("search");
    if (urlSearch && urlSearch !== contextSearch) {
      setSearch(urlSearch);
    }
  }, []);

  useEffect(() => {
    return () => {
      setSearch("");
    };
  }, [setSearch]);

  const filters: MenuFilters = {
    search: contextSearch || filterParams.get("search") || "",
    category: filterParams.get("category") || "",
    type: (filterParams.get("type") ||'')as ItemType,
    price: filterParams.get("price") || "",
  };
  const page = parseInt(filterParams.get("page") || "1");

  const [categories, setCategories] = useState<ICategory[]>([]);
  const [products, setProducts] = useState<IMenuProduct[]>([]);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const debouncedSearch = useDebounce(contextSearch, 400);

  const handleFilterChange = (updatedFilters: MenuFilters | ((prev: MenuFilters) => MenuFilters)) => {
    const nextFilters = typeof updatedFilters === "function" ? updatedFilters(filters) : updatedFilters;
    setFilterParams({
      search: nextFilters.search || "",
      category: nextFilters.category || "",
      type: nextFilters.type || "",
      price: nextFilters.price || "",
      page: "1",
    });
  };

  const handleResetFilters = () => {
    setSearch("");
    setFilterParams({
      search: "",
      category: "",
      type: "",
      price: "",
      page: "1",
    });
  };

  const handlePageChange = (newPage: number) => {
    setFilterParams({
      search: filters.search || "",
      category: filters.category || "",
      type: filters.type || "",
      price: filters.price || "",
      page: String(newPage),
    });
  };

  useEffect(() => {
    setFilterParams((prev) => {
      const next = new URLSearchParams(prev);
      if (debouncedSearch) {
        next.set("search", debouncedSearch);
      } else {
        next.delete("search");
      }
      next.set("page", "1");
      return next;
    }, { replace: true });
  }, [debouncedSearch, setFilterParams]);

  const requestFilters = useMemo(
    () => ({
      ...filters,
      search: filters.search,
    }),
    [filters.search, filters.category, filters.type, filters.price]
  );

  const fetchCategories = async () => {
    try {
      const data = await menuService.getCategories();
      setCategories(data || []);
    } catch (error) {
      errorToast(String(error));
    }
  };

  const fetchMenu = async () => {
    try {
      setLoading(true);

      const [menuRes, cartRes] = await Promise.all([
        menuService.getMenu(requestFilters, page),
        cartService.getCart(),
      ]);
      
      const cartItems: CartLine[] = cartRes?.items || [];
      
      const cartMap = new Map(
        cartItems.map((item) => [item.itemId, item.quantity])
      );

      const mappedProducts: IMenuProduct[] = (menuRes.data || []).map(
        (product: IMenuProduct) => ({
          ...product,
          cartCount: cartMap.get(product.id) || 0,
        })
      );

      setProducts(mappedProducts);
      setTotal(menuRes?.total || 0);
      setLimit(menuRes?.limit || 10);
    } catch (error) {
      errorToast(String(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchMenu();
  }, [page, requestFilters]);

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between lg:hidden">
        <button
          onClick={() => setDrawerOpen(true)}
          className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
          </svg>
          Filters
        </button>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[280px_1fr]">
        <aside className="hidden lg:block">
          <MenuFiltersSidebar
            filters={filters}
            categories={categories}
            onChange={handleFilterChange}
            onReset={handleResetFilters}
          />
        </aside>

        <section className="space-y-5">
          {loading ? (
            <MenuSkeleton />
          ) : products.length ? (
            <MenuGrid items={products} />
          ) : (
            <EmptyState />
          )}

          <CommonPagination
            total={total}
            page={page}
            limit={limit}
            onPageChange={handlePageChange}
          />
        </section>
      </div>

      <MenuFilterDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        filters={filters}
        categories={categories}
        onChange={handleFilterChange}
        onReset={handleResetFilters}
      />
    </div>
  );
}