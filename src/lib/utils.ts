import axios from 'axios';
import type { Node } from '../types/nodes';
import type { Language } from '../types/local';

const URL_BASE = 'https://api-graph.tests.grupoapok.com';

const getAllNodes = async () => {
  const response = await axios<Node[]>(`${URL_BASE}/api/nodes`);
  return response;
};

const getLocals = async () => {
    const response = await axios<Language>(`${URL_BASE}/api/locales`)
    return response;
}

export { getAllNodes, getLocals };