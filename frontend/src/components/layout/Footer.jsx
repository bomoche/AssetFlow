import React from 'react';

export default function Footer() {
  return (
    <footer className="hidden md:block bg-surface-container-low border-t border-outline-variant mt-auto">
      <div className="w-full py-stack-md px-margin-desktop flex flex-col md:flex-row justify-between items-center max-w-container-max mx-auto gap-stack-md">
        <div className="flex items-center gap-stack-md">
          <span className="font-label-caps text-label-caps text-primary uppercase">Enviro365</span>
          <span className="font-body-sm text-body-sm text-on-surface-variant">
            © 2024 Institutional Wealth Management. All rights reserved.
          </span>
        </div>
        <div className="flex gap-stack-md">
          <a href="#" className="text-on-surface-variant hover:text-secondary transition-colors font-body-sm text-body-sm">Privacy Policy</a>
          <a href="#" className="text-on-surface-variant hover:text-secondary transition-colors font-body-sm text-body-sm">Terms of Service</a>
          <a href="#" className="text-on-surface-variant hover:text-secondary transition-colors font-body-sm text-body-sm">Contact Support</a>
        </div>
      </div>
    </footer>
  );
}