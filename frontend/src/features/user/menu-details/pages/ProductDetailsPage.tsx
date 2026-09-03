import React, { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Loader2, ShoppingCart } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import ProductGallery from "../components/ProductGallery";
import ProductNutrition from "../components/ProductNutrition";
import ProductQuantityControl from "../components/ProductQuantityControl";
import { cartService } from "../service/cartService";
import { menuProductService } from "../service/menuProudctService";
import type {
    ICartItem,
    // IMenuVariant,
    IMenuItem,
} from "../types/menuProductType";
import { errorToast } from "../../../../shared/utils/toastNotification";

type RouteParams = Record<'id' | 'variantIndex', string | undefined>;

const ProductDetailsPage: React.FC = () => {
    const { id: productId, variantIndex: variantIndex = '0' } = useParams<RouteParams>();
    const navigate = useNavigate();

    const [product, setProduct] = useState<IMenuItem | null>(null);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [loading, setLoading] = useState(true);
    const [cartLoading, setCartLoading] = useState(false);
    const [error, setError] = useState("");
    const [cartKey, setCartKey] = useState('');

    // Load Product Data
    useEffect(() => {
        if (!productId) {
            setError("Product id is missing.");
            setLoading(false);
            return;
        }

        const loadProduct = async () => {
            try {
                setLoading(true);
                setError("");

                const productData = await menuProductService.getProductById(productId);
                setProduct(productData);
                
                const variants = productData?.variants ?? [];
                const parsedIndex = Number(variantIndex) || 0;
                const validIndex = parsedIndex >= 0 && parsedIndex < variants.length ? parsedIndex : 0;
                
                setSelectedIndex(validIndex);

                // Set cart key safely using the correct variant
                const targetVariant = variants[validIndex];
                if (targetVariant) {
                    const variantId = targetVariant._id?.toString() ?? '';
                    setCartKey(`${productId}:${variantId}`);
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : "Unable to load product.");
            } finally {
                setLoading(false);
            }
        };

        loadProduct();
    }, [productId, variantIndex]);

    const variants = product?.variants ?? [];

    const selectedVariant = useMemo(() => {
        return variants[selectedIndex] ?? null;
    }, [variants, selectedIndex]);

    const selectedVariantIsOutOfStock = useMemo(() => {
        if (!product || !selectedVariant) return true;
        if (selectedVariant.status === "out_of_stock") return true;
        if (product.stockMode === "PER_VARIANT" && (selectedVariant.stock ?? 0) <= 0) return true;
        if (product.stockMode === "SHARED" && product.stock <= 0) return true;
        return false;
    }, [product, selectedVariant]);

    const stockText = useMemo(() => {
        if (!product || !selectedVariant) return "Unavailable";
        if (selectedVariantIsOutOfStock) return "Out of stock";
        if (product.stockMode === "SHARED") return `${product.stock} available`;
        return `${selectedVariant.stock ?? 0} available`;
    }, [product, selectedVariant, selectedVariantIsOutOfStock]);

    // Robust cart quantity checker
    const refreshCartQuantity = async () => {
        if (!productId || !selectedVariant) return;

        try {
            const cart = await cartService.getCart();
            const cartItems: ICartItem[] = Array.isArray(cart)
                ? cart
                : cart?.items ?? cart?.products ?? [];

            const targetVariantId = String(selectedVariant._id);

            // Find matching cart item by checking variantId
            const cartItem = cartItems.find((item) => {
                const itemVariantId = typeof item.variantId === 'object' 
                    ? (item.variantId as any)?._id?.toString() 
                    : String(item.variantId);
                
                return itemVariantId === targetVariantId;
            });

            setQuantity(cartItem ? (cartItem.quantity ?? 0) : 0);
        } catch {
            setQuantity(0);
        }
    };

    // Fetch cart quantity whenever product or selected variant changes
    useEffect(() => {
        if (!productId || !selectedVariant) return;
        refreshCartQuantity();
    }, [productId, selectedVariant, cartKey]);

    const handleVariantSelect = (index: number) => {
        setSelectedIndex(index);
        setQuantity(0);

        if (productId) {
            const targetVariant = variants[index];
            if (targetVariant) {
                setCartKey(`${productId}:${targetVariant._id?.toString()}`);
            }
            navigate(`/menuDetails/${productId}/${index}`, { replace: true });
        }
    };

    const handleAddToCart = async () => {
        if (!productId || selectedVariantIsOutOfStock) return;

        try {
            setCartLoading(true);
            await cartService.addToCart(cartKey);
            await refreshCartQuantity();
        } catch (err) {
            errorToast(err as string);
        } finally {
            setCartLoading(false);
        }
    };

    const handleDecreaseQuantity = async () => {
        if (!productId || quantity <= 0) return;

        try {
            setCartLoading(true);
            await cartService.dicrementQuantity(cartKey);
            await refreshCartQuantity();
        } catch (err) {
            errorToast(err as string);
        } finally {
            setCartLoading(false);
        }
    };

    const handleIncreaseQuantity = async () => {
        if (!productId || selectedVariantIsOutOfStock) return;

        try {
            setCartLoading(true);
            await cartService.addToCart(cartKey);
            await refreshCartQuantity();
        } catch (err) {
            errorToast(err as string);
        } finally {
            setCartLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center text-zinc-500 dark:text-zinc-400">
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Loading product...
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
                <p className="text-sm text-red-500">
                    {error || "Product not found."}
                </p>
                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="mt-4 inline-flex items-center gap-2 rounded-xl border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 dark:border-zinc-700 dark:text-zinc-300"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Go back
                </button>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-zinc-50 px-4 py-6 dark:bg-zinc-950 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-zinc-600 transition hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                </button>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
                    <ProductGallery
                        product={product}
                        variants={variants}
                        selectedVariant={selectedVariant}
                        selectedIndex={selectedIndex}
                        onSelectVariant={handleVariantSelect}
                    />

                    <section className="flex flex-col">
                        <div className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:p-7">
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium capitalize text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                                    {product.type}
                                </span>
                            </div>

                            <h1 className="mt-4 text-3xl font-bold tracking-tight text-zinc-950 dark:text-white sm:text-4xl">
                                {product.itemName}
                            </h1>

                            {selectedVariant && (
                                <p className="mt-2 text-base text-zinc-500 dark:text-zinc-400">
                                    Selected option:{" "}
                                    <span className="font-medium text-zinc-800 dark:text-zinc-200">
                                        {selectedVariant.name}
                                    </span>
                                </p>
                            )}

                            <p className="mt-5 text-sm leading-7 text-zinc-600 dark:text-zinc-300">
                                {product.description}
                            </p>

                            {selectedVariant && (
                                <>
                                    <div className="mt-6 flex items-end justify-between gap-4">
                                        <div>
                                            <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                                Price
                                            </p>
                                            <p className="mt-1 text-3xl font-bold text-zinc-950 dark:text-white">
                                                ₹{selectedVariant.price}
                                            </p>
                                        </div>

                                        <div className="text-right">
                                            <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                                Stock
                                            </p>
                                            <p
                                                className={`mt-1 text-sm font-semibold ${
                                                    selectedVariantIsOutOfStock
                                                        ? "text-red-500"
                                                        : "text-emerald-600 dark:text-emerald-400"
                                                }`}
                                            >
                                                {stockText}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                                        {quantity > 0 ? (
                                            <ProductQuantityControl
                                                quantity={quantity}
                                                loading={cartLoading}
                                                disabled={selectedVariantIsOutOfStock}
                                                onIncrease={handleIncreaseQuantity}
                                                onDecrease={handleDecreaseQuantity}
                                            />
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={handleAddToCart}
                                                disabled={cartLoading || selectedVariantIsOutOfStock}
                                                className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                                            >
                                                {cartLoading ? (
                                                    <Loader2 className="h-4 w-4 animate-spin" />
                                                ) : (
                                                    <ShoppingCart className="h-4 w-4" />
                                                )}
                                                {selectedVariantIsOutOfStock
                                                    ? "Out of stock"
                                                    : "Add to cart"}
                                            </button>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>

                        {selectedVariant && (
                            <div className="mt-5">
                                <ProductNutrition nutrition={selectedVariant.nutrition} />
                            </div>
                        )}
                    </section>
                </div>
            </div>
        </main>
    );
};

export default ProductDetailsPage;