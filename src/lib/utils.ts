import axios, { isAxiosError } from 'axios';
import type { TNode } from '../types/nodes';
import type { Language } from '../types/local';
import { toast } from 'react-hot-toast';

const URL_BASE = 'https://api-graph.tests.grupoapok.com/api';

const getParentNodes = async () => {
  try {
    const response = await axios<TNode[]>(`${URL_BASE}/nodes`);
    return response;
  } catch (err) {
    console.error(err);
  }
};

const getLocals = async () => {
  try {
    const response = await axios<Language>(`${URL_BASE}/locales`);
    return response;
  } catch (err) {
    console.error(err);
  }
};

const deleteNode = async (id: number) => {
  try {
    const response = await axios.delete<TNode>(`${URL_BASE}/node/${id}`);
    return response;
  } catch (err) {
    if (isAxiosError(err) && err.response?.status === 400) {
      toast.error((err.response?.data as { message: string })?.message);
    } else {
      console.error(err);
    }
  }
};

const getChildNodes = async (id: number) => {
  try {
    const response = await axios<TNode[]>(`${URL_BASE}/nodes?parent=${id}`);
    return response;
  } catch (err) {
    if (isAxiosError(err) && err.response?.status === 404) {
      toast.error((err.response?.data as { message: string })?.message);
    } else {
      console.error(err);
    }
  }
};

const getNode = async (id: number, locale?: string) => {
  try {
    const url = locale
      ? `${URL_BASE}/node/${id}?locale=${locale}`
      : `${URL_BASE}/node/${id}`;
    const response = await axios<TNode>(url);
    return response;
  } catch (err) {
    console.error(err);
  }
};

const createNode = async (parentId: number, locales: string[] = []) => {
  try {
    const response = await axios.post<TNode>(`${URL_BASE}/node`, {
      parent: parentId,
      locales,
    });
    return response;
  } catch (err) {
    console.error(err);
  }
};

export { getParentNodes, getLocals, deleteNode, getChildNodes, getNode, createNode };
