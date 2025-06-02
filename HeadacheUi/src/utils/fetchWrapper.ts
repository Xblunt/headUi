"use server"

import { env } from "next-runtime-env";

export const request = async (url: string, options: RequestInit): Promise<any> => {
  const NEXT_PUBLIC_HOST = env('NEXT_PUBLIC_HOST');
  const fullUrl = `${NEXT_PUBLIC_HOST}/${url}`;
  console.log(options.method + " fullUrl: " + fullUrl);
  try {
    const response = await fetch(fullUrl, options);
    if (response.ok) {
      const dataStringFormat = await response.text();
      if (dataStringFormat) {
        return dataStringFormat;
      }
      return undefined;
    } else {
      throw new Error(`HTTP error! Status: ${response.status + " " + response.statusText} `);
    }
  } catch (error) {
    console.error('An error occurred:', error);
    return undefined;
  }
};

export const get = async (url: string, headers: HeadersInit, token?: string | null): Promise<any> => {
  const tokenBearer = `Bearer ${token}`;
  const options = {
    method: 'GET',
    headers: token
      ? { 'Authorization': tokenBearer, ...headers }
      : { ...headers }
  };
  return await request(url, options);
};

export const post = async (url: string, body: string | FormData, token?: string | null, headers?: HeadersInit): Promise<any> => {
  const isFormData = body instanceof FormData;
  const tokenBearer = `Bearer ${token}`;
  const options = {
    method: 'POST',
    headers: isFormData
      ? { 'Authorization': tokenBearer, ...headers }
      : { 'Content-Type': 'application/json', 'Authorization': tokenBearer, ...headers },
    body,
  };
  return await request(url, options);
};

export const postLogin = async (url: string, body: string, headers?: HeadersInit): Promise<any> => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...headers
    },
    body: body
  };
  return await request(url, options);
};
