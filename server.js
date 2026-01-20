const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

const app = express();
const PORT = 3000;

// Servir archivos estáticos (HTML, CSS, JS)
app.use(express.static(__dirname));

// Proxy para Domo - modifica los headers CSP
app.use('/domo-proxy', createProxyMiddleware({
  target: 'https://unitru-edu-pe.domo.com',
  changeOrigin: true,
  pathRewrite: {
    '^/domo-proxy': '', // Elimina el prefijo /domo-proxy
  },
  onProxyRes: function (proxyRes, req, res) {
    try {
      // Modificar headers CSP para permitir framing desde localhost
      if (proxyRes.headers['content-security-policy']) {
        // Reemplazar o agregar frame-ancestors para permitir localhost
        let csp = proxyRes.headers['content-security-policy'];
        if (csp.includes('frame-ancestors')) {
          csp = csp.replace(/frame-ancestors[^;]*/gi, "frame-ancestors 'self' http://localhost:* https://localhost:* http://127.0.0.1:*");
        } else {
          csp += "; frame-ancestors 'self' http://localhost:* https://localhost:* http://127.0.0.1:*";
        }
        proxyRes.headers['content-security-policy'] = csp;
      }
      
      // También manejar report-only CSP
      if (proxyRes.headers['content-security-policy-report-only']) {
        let cspReport = proxyRes.headers['content-security-policy-report-only'];
        if (cspReport.includes('frame-ancestors')) {
          cspReport = cspReport.replace(/frame-ancestors[^;]*/gi, "frame-ancestors 'self' http://localhost:* https://localhost:* http://127.0.0.1:*");
        } else {
          cspReport += "; frame-ancestors 'self' http://localhost:* https://localhost:* http://127.0.0.1:*";
        }
        proxyRes.headers['content-security-policy-report-only'] = cspReport;
      }
      
      // Eliminar X-Frame-Options si existe (puede bloquear el iframe)
      delete proxyRes.headers['x-frame-options'];
      
      // Modificar cookies para que funcionen en localhost
      if (proxyRes.headers['set-cookie']) {
        const cookies = Array.isArray(proxyRes.headers['set-cookie']) 
          ? proxyRes.headers['set-cookie'] 
          : [proxyRes.headers['set-cookie']];
        
        proxyRes.headers['set-cookie'] = cookies.map(cookie => {
          // Asegurar que las cookies funcionen en localhost
          return cookie
            .replace(/Domain=[^;]+/gi, '')
            .replace(/Secure/gi, '')
            .replace(/SameSite=None/gi, 'SameSite=Lax');
        });
      }
      
      // Permitir CORS para recursos
      proxyRes.headers['Access-Control-Allow-Origin'] = '*';
      proxyRes.headers['Access-Control-Allow-Credentials'] = 'true';
      proxyRes.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
      proxyRes.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization, Cookie';
    } catch (error) {
      console.error('[PROXY RES ERROR]', error.message);
    }
  },
  onProxyReq: function (proxyReq, req, res) {
    try {
      // Solo establecer headers si la petición aún no se ha enviado
      if (proxyReq && !proxyReq.destroyed) {
        // Copiar cookies de la petición original
        if (req.headers.cookie) {
          proxyReq.setHeader('Cookie', req.headers.cookie);
        }
        
        // Headers adicionales
        proxyReq.setHeader('Referer', 'https://unitru-edu-pe.domo.com/');
        proxyReq.setHeader('Origin', 'https://unitru-edu-pe.domo.com');
        
        // Log para debugging
        console.log(`[PROXY] ${req.method} ${req.url}`);
      }
    } catch (error) {
      // Ignorar errores de headers ya enviados
      if (!error.message.includes('headers') && !error.message.includes('sent')) {
        console.error('[PROXY ERROR]', error.message);
      }
    }
  },
  logLevel: 'warn',
  secure: true,
  followRedirects: true
}));

// Ruta principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor proxy ejecutándose en http://localhost:${PORT}`);
  console.log(`📊 Abre tu navegador en: http://localhost:${PORT}`);
  console.log(`\n⚠️  IMPORTANTE:`);
  console.log(`   1. Asegúrate de estar autenticado en Domo en otra pestaña del navegador`);
  console.log(`   2. Abre: https://unitru-edu-pe.domo.com e inicia sesión`);
  console.log(`   3. Luego abre: http://localhost:${PORT}`);
  console.log(`\n💡 Si ves errores CSP, revisa la consola del navegador (F12)`);
});
