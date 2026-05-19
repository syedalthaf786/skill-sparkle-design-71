import type {} from "react-router-dom";

const BASE_URL = "";

// This is a simplified sitemap generator - in a real app you'd want to generate this dynamically
export default function SitemapXml() {
  const paths = ["/", "/about", "/services", "/industries", "/careers", "/contact"];
  const urls = paths
    .map((p) => `  <url><loc>${BASE_URL}${p}</loc><changefreq>weekly</changefreq></url>`)
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
  
  return new Response(xml, {
    headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
  });
}
      },
    },
  },
});
