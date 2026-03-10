import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

/**
 * Componente para los elementos del menú con desplegables
 */
const NavItem = ({ label, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div 
      className="relative group" 
      onMouseEnter={() => setIsOpen(true)} 
      onMouseLeave={() => setIsOpen(false)}
    >
      <button className="flex items-center gap-1 hover:text-yellow-400 transition-colors py-2 px-3 font-medium text-white focus:outline-none">
        {label}
        {children && <ChevronDown size={14} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />}
      </button>
      {children && isOpen && (
        <div className="absolute top-full left-0 w-56 bg-white text-gray-800 shadow-xl border-t-2 border-yellow-500 py-2 rounded-b-md z-50 animate-in fade-in slide-in-from-top-2">
          {children}
        </div>
      )}
    </div>
  );
};

/**
 * Enlace individual para los submenús
 */
const SubNavItem = ({ label, href = "#" }) => (
  <a 
    href={href} 
    className="block px-4 py-2 hover:bg-blue-50 hover:text-blue-700 transition-colors text-sm font-medium"
  >
    {label}
  </a>
);

/**
 * Componente Navbar optimizado para Astro + React
 */
export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Manejar el efecto de desplazamiento para la transición de transparencia
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-100 transition-all duration-300 ${scrolled ? 'bg-blue-900 shadow-lg py-2' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">
        {/* Logo y Marca */}
        <div className="flex items-center gap-3 text-white">
          <div className="bg-white p-1 rounded-full shadow-sm">
             <img 
               src="src/assets/Logo Zona Central.jpg" 
               alt="Logo de PJZC" 
               className="h-14 w-14 object-contain rounded-full" 
             />
          </div>
          <div>
            <h1 className="text-lg font-extrabold tracking-tight leading-none uppercase">PJZC</h1>
            <p className="text-[10px] uppercase tracking-[0.2em] font-light text-yellow-400">Zona Central</p>
          </div>
        </div>

        {/* Navegación para Escritorio */}
        <div className="hidden lg:flex items-center gap-2">
          <NavItem label="Inicio" />
          <NavItem label="Nosotros">
            <SubNavItem label="Misión y Visión" href="/nosotros#mision" />
            <SubNavItem label="Reseña Histórica" href="/nosotros#historia" />
            <SubNavItem label="Directiva Zonal" href="/nosotros#directiva" />
          </NavItem>
          <NavItem label="Arquidiócesis">
            <SubNavItem label="Parroquias" href="/arquidiocesis#parroquias" />
            <SubNavItem label="Sede Arzobispal" href="/arquidiocesis#sede" />
          </NavItem>
          <NavItem label="Biblioteca">
            <SubNavItem label="Magisterio" href="/biblioteca#magisterio" />
            <SubNavItem label="Recursos" href="/biblioteca#recursos" />
          </NavItem>
          <a 
            href="/donaciones"
            className="ml-4 bg-yellow-500 hover:bg-yellow-400 text-blue-900 px-6 py-2 rounded-full font-bold text-sm transition-all shadow-md active:scale-95"
          >
            Donaciones
          </a>
        </div>

        {/* Botón de Menú Móvil */}
        <button 
          className="lg:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Abrir menú"
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Menú Móvil a pantalla completa */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-blue-950 z-90 flex flex-col pt-24 px-8 text-white animate-in fade-in slide-in-from-right-full">
          <a href="/" className="text-2xl font-bold py-5 border-b border-blue-800 focus:text-yellow-400">Inicio</a>
          <a href="/nosotros" className="text-2xl font-bold py-5 border-b border-blue-800 focus:text-yellow-400">Nosotros</a>
          <a href="/recursos" className="text-2xl font-bold py-5 border-b border-blue-800 focus:text-yellow-400">Recursos</a>
          <a href="/donaciones" className="text-2xl font-bold py-5 border-b border-blue-800 text-yellow-400">Donaciones</a>
          
          <div className="mt-auto pb-12 text-center text-blue-300 text-sm italic">
            "Cristo Vive y te quiere vivo"
          </div>
        </div>
      )}
    </nav>
  );
}