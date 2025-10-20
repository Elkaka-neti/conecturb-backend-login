const fs = require('fs');
const path = require('path');

function filenameToRoute(filename) {
  const name = filename.replace(/\.js$/, '');
  const parts = name.split('_');
  const routeParts = parts.map(part => {
    if (part.includes('-')) {
      return part.split('-').map(sub => `:${sub}`).join('/');
    }
    return part;
  });
  return '/' + routeParts.join('/');
}

function registerRoutes(app, routerPath) {
  if (!fs.existsSync(routerPath)) return;

  const methodDirs = fs.readdirSync(routerPath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  methodDirs.forEach(method => {
    const methodPath = path.join(routerPath, method);
    const routeFiles = fs.readdirSync(methodPath, { withFileTypes: true })
      .filter(dirent => dirent.isFile() && dirent.name.endsWith('.js'))
      .map(dirent => dirent.name);

    routeFiles.forEach(file => {
      const routeName = filenameToRoute(file);
      const handler = require(path.join(methodPath, file));

      switch (method.toLowerCase()) {
        case 'get':
          app.get(routeName, handler);
          break;
        case 'post':
          app.post(routeName, handler);
          break;
        case 'put':
          app.put(routeName, handler);
          break;
        case 'delete':
          app.delete(routeName, handler);
          break;
        default:
          console.warn(`Método HTTP não suportado: ${method}`);
      }

      console.log(`Rota registrada: [${method.toUpperCase()}] ${routeName}`);
    });
  });
}

module.exports = registerRoutes;