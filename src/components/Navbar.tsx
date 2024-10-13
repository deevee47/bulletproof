

'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from "@/lib/utils";

const navItems = [
  { href: '/', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#guess', label: 'Register!' },
];

const Navbar = () => {
  const pathname = usePathname();
  const [activeLink, setActiveLink] = useState(pathname);

  useEffect(() => {
    setActiveLink(pathname);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems
        .filter(item => item.href.startsWith('#'))
        .map(item => item.href.substring(1));

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveLink(`#${section}`);
            return;
          }
        }
      }

      if (window.scrollY < 100) {
        setActiveLink('/');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="z-[99999] fixed top-4 left-1/2 transform -translate-x-1/2 w-full max-w-2xl px-4">
      <nav className="relative px-4 py-3 rounded-2xl backdrop-blur-md bg-gradient-to-r from-yellow-500/30 via-orange-500/30 to-red-500/30 bg-opacity-10 border border-white/10 shadow-lg">
        <div className="absolute inset-0 rounded-2xl bg-black/40 backdrop-blur-md" />
        <ul className="relative flex justify-center items-center gap-1 sm:gap-2 text-white">
          {navItems.map((item) => (
            <li key={item.href} className={cn(
              item.href === '/' && 'hidden sm:block'
            )}>
              <Link
                href={item.href}
                onClick={(e) => {
                  if (item.href.startsWith('#')) {
                    e.preventDefault();
                    const element = document.getElementById(item.href.substring(1));
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                    setActiveLink(item.href);
                  } else {
                    setActiveLink(item.href);
                  }
                }}
                className={cn(
                  "px-3 sm:px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                  "hover:bg-white/10 hover:text-white",
                  activeLink === item.href
                    ? "bg-white/15 text-white"
                    : "text-white/70"
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
