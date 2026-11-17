const fs = require('fs/promises');
const path = require('path');

const crearModelo = (archivo, campoId = 'id') => {
  const ruta = path.join(__dirname, '..', 'data', archivo);

  const leer = async () => {
    try {
      return JSON.parse(await fs.readFile(ruta, 'utf8'));
    } catch (error) {
      if (error.code === 'ENOENT') return [];
      throw error;
    }
  };

  const escribir = (datos) => fs.writeFile(ruta, JSON.stringify(datos, null, 2));

  const findAll = () => leer();

  const findById = async (id) => (await leer()).find((i) => i[campoId] === id);

  const create = async (datos) => {
    const items = await leer();
    const nuevoId = items.reduce((max, i) => Math.max(max, i[campoId]), 0) + 1;
    const nuevo = { ...datos, [campoId]: nuevoId };
    items.push(nuevo);
    await escribir(items);
    return nuevo;
  };

  const update = async (id, datos) => {
    const items = await leer();
    const pos = items.findIndex((i) => i[campoId] === id);
    if (pos === -1) return undefined;
    items[pos] = { ...items[pos], ...datos, [campoId]: id };
    await escribir(items);
    return items[pos];
  };

  const remove = async (id) => {
    const items = await leer();
    const pos = items.findIndex((i) => i[campoId] === id);
    if (pos === -1) return false;
    items.splice(pos, 1);
    await escribir(items);
    return true;
  };

  return { findAll, findById, create, update, remove };
};

module.exports = { crearModelo };
