"use client";

import { useContent } from "../hooks/useContent";

export function Footer() {
  const { content } = useContent("pl");

  return (
    <footer className="border-t py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="font-bold text-xl text-primary mb-4">
              {content.footer.brand.name}
            </div>
            <p className="text-sm text-gray-600">
              {content.footer.brand.tagline}
            </p>
          </div>
          {content.footer.sections.map((section, index) => (
            <div key={index}>
              <h3 className="font-bold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links &&
                  section.links.map((link, i) => (
                    <li key={i}>
                      <a href={link.href} className="text-sm">
                        {link.text}
                      </a>
                    </li>
                  ))}
                {section.items &&
                  section.items.map((item, i) => (
                    <li key={i} className="text-sm">
                      {item}
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-gray-600">
          {content.footer.copyright}
        </div>
      </div>
    </footer>
  );
}
