import type IProduct from 'src/types/productInterfaces';
import url from '../constants/url';

type ApiResponse<T> = {
  data: T;
  status: number;
};

async function fetchData<T>(url: string): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: T = await response.json();

    return {
      data,
      status: response.status,
    };
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    throw error;
  }
}

async function getAllProducts(): Promise<IProduct[] | null> {
  try {
    const response = await fetchData<IProduct[]>(url.products.all);
    return response.data;
  } catch (error) {
    console.error('Error fetching all products:', error);
    return null;
  }
}

async function getAllCategories(): Promise<string[] | null> {
  try {
    const response = await fetchData<string[]>(url.categories.all);
    return response.data;
  } catch (error) {
    console.error('Error fetching all categories:', error);
    return null;
  }
}

async function getSingleProduct(id: number): Promise<IProduct | null> {
  try {
    const urlWithId = `${url.products.single}${id}`;
    const response = await fetchData<IProduct>(urlWithId);
    return response.data;
  } catch (error) {
    console.error('Error fetching all categories:', error);
    return null;
  }
}

export { getAllProducts, getAllCategories, getSingleProduct };
