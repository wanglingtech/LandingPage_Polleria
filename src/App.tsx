import React, { useState, useRef } from 'react';
import { ToastProvider } from './context/ToastContext';
import { CartProvider, useCart } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { VisualShowcase } from './components/VisualShowcase';
import { PromoSlider } from './components/PromoSlider';
import { Categories } from './components/Categories';
import { ProductGrid } from './components/ProductGrid';
import { Offers } from './components/Offers';
import { FeaturedProducts } from './components/FeaturedProducts';
import { AboutSection } from './components/AboutSection';
import { LocationSection } from './components/LocationSection';
import { Reviews } from './components/Reviews';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { MobileBottomNav } from './components/MobileBottomNav';
import { PRODUCTS } from './data/products';
import { Product } from './types';

const MainContent: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);

  const { isFavorite } = useCart();
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Smooth scroll helper
  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFocusSearch = () => {
    scrollToSection('carta');
    setTimeout(() => {
      searchInputRef.current?.focus();
    }, 400);
  };

  const handleSelectCategory = (categoryId: string) => {
    setShowFavoritesOnly(false);
    setSelectedCategory(categoryId);
    scrollToSection('carta');
  };

  const handleToggleFavoritesOnly = () => {
    setShowFavoritesOnly((prev) => !prev);
    scrollToSection('carta');
  };

  const handleSelectProductById = (productId: string) => {
    const found = PRODUCTS.find((p) => p.id === productId);
    if (found) {
      setSelectedProductForModal(found);
    } else {
      scrollToSection('carta');
    }
  };

  // Products filtered for favorites if toggled
  const currentProducts = showFavoritesOnly
    ? PRODUCTS.filter((p) => isFavorite(p.id))
    : PRODUCTS;

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-neutral-900 flex flex-col font-sans selection:bg-red-500 selection:text-white overflow-x-hidden">
      {/* Top Navigation */}
      <Navbar
        onNavigate={scrollToSection}
        onFocusSearch={handleFocusSearch}
        onToggleFavorites={handleToggleFavoritesOnly}
      />

      {/* Main Page Sections */}
      <main className="flex-1 w-full overflow-x-hidden">
        {/* 1. Hero Section */}
        <Hero
          onExploreMenu={() => scrollToSection('carta')}
          onOrderClick={() => scrollToSection('carta')}
          onPromosClick={() => scrollToSection('promociones')}
          onOpenProductModalById={handleSelectProductById}
        />

        {/* 2. Visual Photography Carousel */}
        <VisualShowcase onExploreMenu={() => scrollToSection('carta')} />

        {/* 3. Promo Slider Carousel */}
        <PromoSlider onSelectProduct={handleSelectProductById} />

        {/* 3. Categories Quick Filter Bar */}
        <Categories
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
          showFavoritesOnly={showFavoritesOnly}
          onToggleFavoritesOnly={handleToggleFavoritesOnly}
        />

        {/* 4. Main Product Catalog & Search Grid */}
        <ProductGrid
          products={currentProducts}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          showFavoritesOnly={showFavoritesOnly}
          onToggleFavoritesOnly={handleToggleFavoritesOnly}
          onOpenProductModal={(product) => setSelectedProductForModal(product)}
          searchInputRef={searchInputRef}
        />

        {/* 5. Flash Deals with Countdown */}
        <Offers onSelectProductById={handleSelectProductById} />

        {/* 6. Featured Customer Favorites */}
        <FeaturedProducts
          products={PRODUCTS}
          onOpenModal={(product) => setSelectedProductForModal(product)}
        />

        {/* 7. About Brand Section */}
        <AboutSection />

        {/* 8. Location & Map Section */}
        <LocationSection />

        {/* 9. Reviews & Testimonials */}
        <Reviews />

        {/* 10. FAQ Accordion */}
        <FAQ />
      </main>

      {/* Footer */}
      <Footer onNavigate={scrollToSection} />

      {/* Overlays & Modals */}
      <ProductModal
        product={selectedProductForModal}
        onClose={() => setSelectedProductForModal(null)}
        onSelectRelatedProduct={(product) => setSelectedProductForModal(product)}
      />

      <CartDrawer onExploreMenu={() => scrollToSection('carta')} />

      {/* Floating CTA & Mobile Bottom Navigation */}
      <WhatsAppButton />
      <MobileBottomNav onNavigate={scrollToSection} />
    </div>
  );
};

export default function App() {
  return (
    <ToastProvider>
      <CartProvider>
        <MainContent />
      </CartProvider>
    </ToastProvider>
  );
}
