"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/maestro-productos", label: "Productos" },
  { href: "/conciliacion", label: "Conciliacion" },
  { href: "/reportes-cortes", label: "Cortes" },
  { href: "/alertas", label: "Alertas" },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="-mx-4 mt-1 overflow-x-auto border-b border-brand-border bg-white/90 px-4 py-2 xl:hidden">
      <ul className="flex min-w-max items-center gap-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={cn(
                "inline-flex rounded-full px-3 py-1.5 text-xs font-semibold",
                pathname.startsWith(link.href)
                  ? "bg-brand-navy text-white"
                  : "bg-brand-bg text-brand-text-secondary",
              )}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}


