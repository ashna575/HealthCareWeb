import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const handleDropdownToggle = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  // Mega menu data with links
  const megaMenuData = {
    'health-conditions': [
      { name: 'Breast Cancer', desc: 'Prevention & treatment', link: '/health-conditions/breast-cancer' },
      { name: 'Cancer Care', desc: 'Support & resources', link: '/health-conditions/cancer-care' },
      { name: 'Digestive Health', desc: 'Gut health tips', link: '/health-conditions/digestive-health' },
      { name: 'Eye Health', desc: 'Vision care guide', link: '/health-conditions/eye-health' },
      { name: 'Mental Health', desc: 'Wellness support', link: '/health-conditions/mental-health' },
      { name: 'Migraine', desc: 'Relief & management', link: '/health-conditions/migraine' }
    ],
    wellness: [
      { name: 'CBD', desc: 'Benefits & usage', link: '/wellness/cbd' },
      { name: 'Fitness', desc: 'Workout routines', link: '/wellness/fitness' },
      { name: 'Recipes', desc: 'Healthy cooking', link: '/wellness/recipes' },
      { name: 'Sexual Health', desc: 'Intimate wellness', link: '/wellness/sexual-health' },
      { name: 'Skin Care', desc: 'Beauty & health', link: '/wellness/skin-care' },
      { name: 'Sleep Health', desc: 'Better rest tips', link: '/wellness/sleep-health' }
    ],
    featured: [
      { name: '5 Tips for a Healthy Lifestyle', desc: 'Essential wellness habits', link: '/featured/healthy-lifestyle-tips' },
      { name: '5 Science-Backed Ways to Live a Longer Life', desc: 'Longevity secrets', link: '/featured/longevity-tips' },
      { name: '5 Tips for a Healthy Lifestyle', desc: 'Daily health practices', link: '/featured/daily-health-tips' },
      { name: 'Best Vegan and Plant-Based Meal Delivery for 2025', desc: 'Top meal services', link: '/featured/vegan-meal-delivery' },
      { name: 'Best Multivitamins for Women', desc: 'Female nutrition guide', link: '/featured/multivitamins-women' },
      { name: 'Best Multivitamins for Men', desc: 'Male nutrition guide', link: '/featured/multivitamins-men' }
    ],
    connect: [
      { name: 'Breast Cancer', desc: 'Health updates', link: '/contact/breast-cancer' },
      { name: 'Multiple Sclerosis', desc: 'Join discussions', link: '/connect/forum' },
      { name: 'Depression', desc: 'Professional advice', link: '/connect/consultations' },
      { name: 'Migraine', desc: 'Live sessions', link: '/connect/webinars' },
      { name: 'Type 2 Diabetes', desc: 'Peer connections', link: '/connect/support-groups' },
      { name: 'Psoriasis', desc: 'Monitor progress', link: '/connect/health-tracker' }
    ]
  };

  // Scroll effect hook
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    let timeoutId = null;
    const throttledHandleScroll = () => {
      if (timeoutId === null) {
        timeoutId = setTimeout(() => {
          handleScroll();
          timeoutId = null;
        }, 10);
      }
    };

    window.addEventListener('scroll', throttledHandleScroll);
    
    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [lastScrollY]);

  // Close dropdowns when navbar becomes hidden
  useEffect(() => {
    if (!isVisible) {
      setActiveDropdown(null);
      setIsMenuOpen(false);
    }
  }, [isVisible]);

  const MegaMenuDropdown = ({ items, isActive }) => (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 5 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className="absolute top-full mt-1 left-0 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-100/50 p-6 min-w-[600px] z-50"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {items.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.link}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.02, duration: 0.2 }}
                whileHover={{ 
                  scale: 1.02,
                  backgroundColor: "rgba(147, 51, 234, 0.05)",
                  transition: { duration: 0.2 }
                }}
                className="group p-4 rounded-xl hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50 transition-all duration-300 border border-transparent hover:border-purple-100"
              >
                <div className="flex flex-col space-y-1">
                  <span className="font-semibold text-gray-800 group-hover:text-purple-700 transition-colors">
                    {item.name}
                  </span>
                  <span className="text-sm text-gray-500 group-hover:text-purple-600 transition-colors">
                    {item.desc}
                  </span>
                </div>
                <motion.div
                  className="w-full h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-2 opacity-0 group-hover:opacity-100"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </div>
          
          {/* Invisible bridge to prevent hover gaps */}
          <div className="absolute top-full left-0 right-0 h-2 bg-transparent"></div>
          
          {/* Decorative elements */}
          <div className="absolute -top-2 left-8 w-4 h-4 bg-white/95 rotate-45 border-l border-t border-gray-100/50"></div>
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-purple-100/20 to-pink-100/20 rounded-2xl -z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ 
          y: isVisible ? 0 : -100, 
          opacity: isVisible ? 1 : 0 
        }}
        transition={{ 
          duration: 0.3, 
          ease: "easeInOut",
          type: "spring",
          stiffness: 300,
          damping: 30
        }}
        className="fixed top-6 left-0 right-0 z-50 w-full px-[10%]"
      >
        <motion.nav
          className="bg-[#FEDED4]/95 backdrop-blur-md rounded-2xl shadow-lg border border-gray-300/50 px-6 py-4"
          whileHover={{ 
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
          }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.a
              href="/"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">H</span>
              </div>
              <span className="text-xl font-bold">
                <span className="text-purple-600">rticle</span>
                <span className="text-orange-500">Ark</span>
              </span>
            </motion.a>

            {/* Desktop Navigation */}
            <div 
              className="hidden lg:flex items-center space-x-8"
              onMouseLeave={() => setActiveDropdown(null)}
            >
              {[
                { name: 'Health Conditions', key: 'health-conditions' },
                { name: 'Wellness', key: 'wellness' },
                { name: 'Featured', key: 'featured' },
                { name: 'Connect', key: 'connect' }
              ].map((item) => (
                <div className="relative" key={item.key}>
                  <motion.button
                    whileHover={{ y: -2 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    onMouseEnter={() => setActiveDropdown(item.key)}
                    className="flex items-center space-x-1 text-gray-700 hover:text-purple-600 font-medium transition-colors group"
                  >
                    <span>{item.name}</span>
                    <motion.div
                      animate={{ 
                        rotate: activeDropdown === item.key ? 180 : 0,
                        color: activeDropdown === item.key ? '#9333ea' : '#374151'
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown size={16} />
                    </motion.div>
                  </motion.button>

                  <div 
                    onMouseEnter={() => setActiveDropdown(item.key)}
                    onMouseLeave={() => setActiveDropdown(null)}
                    className="relative"
                  >
                    <MegaMenuDropdown 
                      items={megaMenuData[item.key]} 
                      isActive={activeDropdown === item.key}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              <motion.a
                href="/subscribe"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="hidden lg:block bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-2 rounded-lg font-medium hover:from-purple-700 hover:to-purple-800 transition-all duration-200 shadow-md"
              >
                Subscribe
              </motion.a>

              <motion.a
                href="/search"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="p-2 rounded-full bg-[#FEDED4] border border-gray-500"
              >
                <Search size={20} className="text-gray-600" />
              </motion.a>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300 }}
                onClick={toggleMenu}
                className="lg:hidden p-2 rounded-full bg-gray-100 hover:bg-gray-200"
              >
                {isMenuOpen ? <X size={20} className="text-gray-600" /> : <Menu size={20} className="text-gray-600" />}
              </motion.button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="lg:hidden mt-4 pt-4 border-t border-gray-200/50 overflow-hidden"
              >
                <div className="flex flex-col space-y-4">
                  {[
                    { name: 'Health Conditions', items: megaMenuData['health-conditions'] },
                    { name: 'Wellness', items: megaMenuData.wellness },
                    { name: 'Featured', items: megaMenuData.featured },
                    { name: 'Connect', items: megaMenuData.connect }
                  ].map((section, sectionIndex) => (
                    <div key={section.name}>
                      <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: sectionIndex * 0.1, duration: 0.3 }}
                        onClick={() => handleDropdownToggle(`mobile-${section.name.toLowerCase()}`)}
                        className="flex items-center justify-between w-full text-left text-gray-700 hover:text-purple-600 font-medium transition-colors py-2"
                      >
                        <span>{section.name}</span>
                        <motion.div
                          animate={{ rotate: activeDropdown === `mobile-${section.name.toLowerCase()}` ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown size={16} />
                        </motion.div>
                      </motion.button>

                      <AnimatePresence>
                        {activeDropdown === `mobile-${section.name.toLowerCase()}` && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="ml-4 mt-2 space-y-2 border-l-2 border-purple-200 pl-4"
                          >
                            {section.items.map((item, itemIndex) => (
                              <motion.a
                                key={item.name}
                                href={item.link}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: itemIndex * 0.05, duration: 0.2 }}
                                className="block py-2 text-sm text-gray-600 hover:text-purple-600 transition-colors"
                              >
                                <div>
                                  <div className="font-medium">{item.name}</div>
                                  <div className="text-xs text-gray-400">{item.desc}</div>
                                </div>
                              </motion.a>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                  
                  <motion.a
                    href="/subscribe"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5, duration: 0.3 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-2 rounded-lg font-medium hover:from-purple-700 hover:to-purple-800 transition-all duration-200 shadow-md w-fit mt-4"
                  >
                    Subscribe
                  </motion.a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      </motion.div>

      {/* Overlay for mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;