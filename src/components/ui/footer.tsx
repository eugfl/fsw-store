import { ShoppingBagIcon, PackageIcon, HeadphonesIcon, ShieldCheckIcon } from "lucide-react";
import Link from "next/link";
import { APP_CONFIG } from "@/config/app.config";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-5 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <ShoppingBagIcon className="h-6 w-6 text-primary" />
              <h3 className="text-xl font-bold">
                <span className="text-primary">{APP_CONFIG.name}</span>
              </h3>
            </Link>
            <p className="text-sm text-muted-foreground">
              {APP_CONFIG.description}
            </p>
            <div className="flex gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <ShieldCheckIcon className="h-4 w-4 text-primary" />
                <span>Compra Segura</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <h4 className="font-semibold">Navegação</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  {APP_CONFIG.ui.home}
                </Link>
              </li>
              <li>
                <Link
                  href="/catalog"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  {APP_CONFIG.ui.catalog}
                </Link>
              </li>
              <li>
                <Link
                  href="/deals"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  {APP_CONFIG.ui.deals}
                </Link>
              </li>
              <li>
                <Link
                  href="/orders"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  {APP_CONFIG.ui.orders}
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h4 className="font-semibold">Atendimento</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2 text-muted-foreground">
                <HeadphonesIcon className="h-4 w-4" />
                <span>Suporte Online</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <PackageIcon className="h-4 w-4" />
                <span>Rastreamento</span>
              </li>
              <li>
                <a
                  href={`mailto:${APP_CONFIG.contact.email}`}
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  {APP_CONFIG.contact.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Information */}
          <div className="space-y-4">
            <h4 className="font-semibold">Informações</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Sobre Nós</li>
              <li>Política de Privacidade</li>
              <li>Termos de Uso</li>
              <li>Política de Troca</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 border-t border-border pt-8">
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground md:flex-row">
            <p>
              © {currentYear} {APP_CONFIG.name}. Todos os direitos reservados.
            </p>
            <div className="flex gap-6">
              <span>Desenvolvido com ❤️</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
