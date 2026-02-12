<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9">

  <xsl:output method="html" encoding="UTF-8" indent="yes"/>

  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Sitemap | Shoot Studio by Ashwinder Sethi</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #0F0F0F;
            color: #F5F5F5;
            min-height: 100vh;
            line-height: 1.6;
          }
          
          .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 48px 24px;
          }
          
          header {
            text-align: center;
            margin-bottom: 48px;
            padding-bottom: 32px;
            border-bottom: 1px solid rgba(220, 38, 38, 0.2);
          }
          
          .logo {
            font-family: 'Playfair Display', Georgia, serif;
            font-size: 1.5rem;
            font-weight: 600;
            color: #fff;
            margin-bottom: 8px;
          }
          
          .logo span {
            color: #DC2626;
          }
          
          h1 {
            font-family: 'Playfair Display', Georgia, serif;
            font-size: 2.5rem;
            font-weight: 600;
            color: #fff;
            margin-bottom: 12px;
          }
          
          .subtitle {
            color: rgba(245, 245, 245, 0.6);
            font-size: 1rem;
          }
          
          .stats {
            display: flex;
            justify-content: center;
            gap: 32px;
            margin-top: 24px;
          }
          
          .stat {
            text-align: center;
          }
          
          .stat-value {
            font-family: 'Playfair Display', Georgia, serif;
            font-size: 2rem;
            font-weight: 600;
            color: #DC2626;
          }
          
          .stat-label {
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            color: rgba(245, 245, 245, 0.5);
            margin-top: 4px;
          }
          
          table {
            width: 100%;
            border-collapse: collapse;
            background: #1C1C1C;
            border-radius: 12px;
            overflow: hidden;
            border: 1px solid rgba(255, 255, 255, 0.1);
          }
          
          thead {
            background: linear-gradient(to right, rgba(220, 38, 38, 0.1), transparent);
          }
          
          th {
            text-align: left;
            padding: 16px 20px;
            font-size: 0.75rem;
            font-weight: 500;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            color: #DC2626;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          }
          
          td {
            padding: 16px 20px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
            font-size: 0.875rem;
          }
          
          tbody tr:hover {
            background: rgba(220, 38, 38, 0.05);
          }
          
          tbody tr:last-child td {
            border-bottom: none;
          }
          
          .url-cell {
            max-width: 400px;
          }
          
          a {
            color: #F5F5F5;
            text-decoration: none;
            transition: color 0.2s;
            word-break: break-all;
          }
          
          a:hover {
            color: #DC2626;
          }
          
          .priority {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 9999px;
            font-size: 0.75rem;
            font-weight: 500;
          }
          
          .priority-high {
            background: rgba(220, 38, 38, 0.2);
            color: #DC2626;
          }
          
          .priority-medium {
            background: rgba(245, 158, 11, 0.2);
            color: #F59E0B;
          }
          
          .priority-low {
            background: rgba(255, 255, 255, 0.1);
            color: rgba(245, 245, 245, 0.6);
          }
          
          .frequency {
            color: rgba(245, 245, 245, 0.5);
            font-size: 0.8rem;
          }
          
          .date {
            color: rgba(245, 245, 245, 0.5);
            font-size: 0.8rem;
            white-space: nowrap;
          }
          
          footer {
            text-align: center;
            margin-top: 48px;
            padding-top: 32px;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
          }
          
          footer p {
            color: rgba(245, 245, 245, 0.4);
            font-size: 0.875rem;
          }
          
          footer a {
            color: #DC2626;
          }
          
          @media (max-width: 768px) {
            h1 {
              font-size: 1.75rem;
            }
            
            .stats {
              flex-direction: column;
              gap: 16px;
            }
            
            th, td {
              padding: 12px 16px;
            }
            
            .hide-mobile {
              display: none;
            }
          }
        </style>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous"/>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&amp;family=Playfair+Display:wght@600&amp;display=swap" rel="stylesheet"/>
      </head>
      <body>
        <div class="container">
          <header>
            <div class="logo">Shoot <span>Studio</span></div>
            <h1>XML Sitemap</h1>
            <p class="subtitle">All pages indexed for search engines</p>
            <div class="stats">
              <div class="stat">
                <div class="stat-value">
                  <xsl:value-of select="count(sitemap:urlset/sitemap:url)"/>
                </div>
                <div class="stat-label">Total Pages</div>
              </div>
            </div>
          </header>
          
          <table>
            <thead>
              <tr>
                <th>URL</th>
                <th class="hide-mobile">Priority</th>
                <th class="hide-mobile">Frequency</th>
                <th>Last Modified</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="sitemap:urlset/sitemap:url">
                <xsl:sort select="sitemap:priority" order="descending"/>
                <tr>
                  <td class="url-cell">
                    <a href="{sitemap:loc}">
                      <xsl:value-of select="sitemap:loc"/>
                    </a>
                  </td>
                  <td class="hide-mobile">
                    <xsl:variable name="priority" select="sitemap:priority"/>
                    <xsl:choose>
                      <xsl:when test="$priority >= 0.8">
                        <span class="priority priority-high">
                          <xsl:value-of select="$priority"/>
                        </span>
                      </xsl:when>
                      <xsl:when test="$priority >= 0.6">
                        <span class="priority priority-medium">
                          <xsl:value-of select="$priority"/>
                        </span>
                      </xsl:when>
                      <xsl:otherwise>
                        <span class="priority priority-low">
                          <xsl:value-of select="$priority"/>
                        </span>
                      </xsl:otherwise>
                    </xsl:choose>
                  </td>
                  <td class="hide-mobile">
                    <span class="frequency">
                      <xsl:value-of select="sitemap:changefreq"/>
                    </span>
                  </td>
                  <td>
                    <span class="date">
                      <xsl:value-of select="substring(sitemap:lastmod, 1, 10)"/>
                    </span>
                  </td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>
          
          <footer>
            <p>
              <a href="/">← Back to Shoot Studio</a>
            </p>
            <p style="margin-top: 12px;">
              Generated automatically by Next.js
            </p>
          </footer>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
