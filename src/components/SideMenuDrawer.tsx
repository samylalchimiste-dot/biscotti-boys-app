import { motion, AnimatePresence } from 'motion/react';
import { 
  Home,
  Layers, 
  ShoppingBag, 
  Crown, 
  User, 
  X, 
  ChevronRight,
  Sparkles,
  Star,
  Info,
  Headphones,
  Send,
  ShieldCheck,
  MapPin
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { SupportedCity, SUPPORTED_CITIES } from '../types';

interface SideMenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  onNavigateTab: (tab: 'home' | 'catalog' | 'categories' | 'info' | 'reviews' | 'contact' | 'profile') => void;
  onOpenCart: () => void;
  onOpenVip: () => void;
  cartCount: number;
  triggerHaptic: (style: 'light' | 'medium' | 'heavy') => void;
  logoUrl?: string;
  selectedCity?: SupportedCity | null;
  onClearCity?: () => void;
}

export default function SideMenuDrawer({
  isOpen,
  onClose,
  activeTab,
  onNavigateTab,
  onOpenCart,
  onOpenVip,
  cartCount,
  triggerHaptic,
  logoUrl,
  selectedCity,
  onClearCity
}: SideMenuDrawerProps) {
  const { t } = useLanguage();

  const currentCityInfo = SUPPORTED_CITIES.find((c) => c.id === selectedCity);

  const menuItems = [
    {
      id: 'home',
      label: 'Accueil & Villes',
      icon: Home,
      badge: null,
      action: () => {
        onNavigateTab('home');
        onClose();
      }
    },
    {
      id: 'categories',
      label: 'Collections & Catégories',
      icon: Layers,
      badge: '7',
      action: () => {
        onNavigateTab('categories');
        onClose();
      }
    },
    {
      id: 'cart',
      label: 'Mon Panier',
      icon: ShoppingBag,
      badge: cartCount > 0 ? String(cartCount) : null,
      action: () => {
        onOpenCart();
        onClose();
      }
    },
    {
      id: 'vip',
      label: 'Espace VIP & Récompenses',
      icon: Crown,
      badge: 'ELITE',
      action: () => {
        onOpenVip();
        onClose();
      }
    },
    {
      id: 'reviews',
      label: 'Avis Clients Vérifiés',
      icon: Star,
      badge: '5.0★',
      action: () => {
        onNavigateTab('reviews');
        onClose();
      }
    },
    {
      id: 'info',
      label: 'Infos, FAQ & Expédition',
      icon: Info,
      badge: null,
      action: () => {
        onNavigateTab('info');
        onClose();
      }
    },
    {
      id: 'contact',
      label: 'Support & Contact 24/7',
      icon: Headphones,
      badge: 'LIVE',
      action: () => {
        onNavigateTab('contact');
        onClose();
      }
    },
    {
      id: 'profile',
      label: 'Mon Profil & Commandes',
      icon: User,
      badge: null,
      action: () => {
        onNavigateTab('profile');
        onClose();
      }
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex select-none pointer-events-auto">
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => {
              triggerHaptic('light');
              onClose();
            }}
            className="absolute inset-0 bg-black/75 backdrop-blur-md"
          />

          {/* Drawer Menu Container */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="relative w-[300px] max-w-[85vw] h-full bg-zinc-950/95 backdrop-blur-2xl border-r border-amber-500/30 shadow-[0_0_50px_rgba(0,0,0,0.95)] flex flex-col justify-between p-5 z-10 overflow-y-auto"
          >
            {/* Top Header inside Drawer */}
            <div className="space-y-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl border border-amber-500/40 bg-gradient-to-br from-amber-500/20 via-black to-yellow-500/20 flex items-center justify-center font-mono font-black text-amber-300 text-xs shadow-[0_0_15px_rgba(245,158,11,0.3)]">
                    BB
                  </div>
                  <div>
                    <h3 className="font-sans text-sm font-black tracking-wider text-white uppercase flex items-center gap-1">
                      BISCOTTI BOYS
                      <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                    </h3>
                    <span className="text-[8px] font-mono tracking-widest text-amber-300/80 uppercase font-bold block">
                      BOT VIP • PRIVATE CLUB
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    triggerHaptic('light');
                    onClose();
                  }}
                  className="p-1.5 rounded-xl bg-white/5 border border-white/10 text-zinc-400 hover:text-white transition active:scale-90"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Active City Selection Card */}
              <div className="p-3 rounded-2xl bg-zinc-900/80 border border-amber-500/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <div>
                      <span className="text-[9px] font-mono uppercase text-zinc-400 block">
                        Ville sélectionnée
                      </span>
                      <span className="text-xs font-mono font-black text-white">
                        {currentCityInfo ? `${currentCityInfo.flag} ${currentCityInfo.name}` : 'Aucune ville choisie'}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      triggerHaptic('medium');
                      if (onClearCity) onClearCity();
                      onNavigateTab('home');
                      onClose();
                    }}
                    className="px-2.5 py-1 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/50 text-[10px] font-mono font-bold text-amber-300 transition cursor-pointer"
                  >
                    Changer
                  </button>
                </div>
              </div>

              {/* Menu Navigation List */}
              <nav className="space-y-1.5">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;

                  return (
                    <motion.button
                      key={item.id}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        triggerHaptic('medium');
                        item.action();
                      }}
                      className={`w-full p-3 rounded-2xl border transition duration-200 flex items-center justify-between text-xs font-mono font-bold tracking-wider uppercase cursor-pointer ${
                        isActive
                          ? 'bg-gradient-to-r from-amber-500/25 via-yellow-500/15 to-transparent border-amber-400 text-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.2)]'
                          : 'bg-zinc-900/60 hover:bg-zinc-900 border-white/5 text-zinc-300 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`p-1.5 rounded-xl border ${
                            isActive
                              ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                              : 'bg-black/40 border-white/10 text-zinc-400'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-[11px]">{item.label}</span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        {item.badge && (
                          <span
                            className={`px-2 py-0.5 rounded-full text-[8px] font-black font-mono ${
                              item.id === 'vip'
                                ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-black shadow-sm'
                                : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                        <ChevronRight className="w-3.5 h-3.5 text-zinc-500" />
                      </div>
                    </motion.button>
                  );
                })}
              </nav>
            </div>

            {/* Bottom Footer */}
            <div className="pt-6 border-t border-white/10 text-center space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[9px] font-mono text-emerald-400 font-bold uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>BISCOTTI BOYS BOT — LIVE</span>
              </div>
              <p className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest">
                0-LOG SECURE TELEGRAM APP
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
