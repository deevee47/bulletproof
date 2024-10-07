'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from "@/lib/utils";

const navItems = [
  { href: '/', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#guess', label: 'Guess Speakers!' },
  { href: 'https://www.youtube.com/watch?v=xvFZjo5PgG0', label: 'Hint' }
];

const Navbar = () => {
  const pathname = usePathname();
  const [activeLink, setActiveLink] = useState(pathname);

  useEffect(() => {
    // Update activeLink when pathname changes
    setActiveLink(pathname);
  }, [pathname]);

  useEffect(() => {
    // Function to handle scroll and update activeLink based on section visibility
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

      // If no section is visible, set activeLink to home
      if (window.scrollY < 100) {
        setActiveLink('/');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="z-[99999] fixed top-4 left-1/2 transform -translate-x-1/2 w-full max-w-2xl px-4">
      <nav className="relative px-4 py-3 rounded-2xl backdrop-blur-md bg-black/20 border border-white/10 shadow-lg">
        <ul className="flex justify-center items-center gap-2">
          {navItems.map((item) => (
            <li key={item.href}>
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
                  "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
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