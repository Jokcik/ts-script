import {URLSearchParams} from "url";
import axios, {AxiosRequestConfig} from 'axios'
const tor_axios = require('tor-axios');
import * as tunnel from 'tunnel';

export let tor;

type Header = {[key: string]: string};
type Json = {[key: string]: any};
type BodyType = 'json' | 'url';

export class CustomRequest {
  private defaultHeaders: Header = {};
  public cookie: string = '';
  private inst = axios.create();

  public appendInterseptersRequest(successFunc: (request) => any, errorFunc: (error) => any = error => Promise.reject(error)) {
    return this.inst.interceptors.response.use(
      response => successFunc(response),
     error => errorFunc(error)
    );
  }

  private setNoRedirectsIntersepter() {
    this.appendInterseptersRequest(request => request, error => {
      if (error.response && error.response.status === 302) {
        return error.response;
      }

      return Promise.reject(error)
    });
  }

  constructor(private config: AxiosRequestConfig = {}, useTor: boolean = true, proxy: string = '') {
    if (useTor) {
      tor = tor_axios.torSetup({
        ip: 'localhost',
        port: 9050,
      });

      this.inst = axios.create({
        httpAgent: tor.defaults.httpAgent,
        httpsAgent: tor.defaults.httpsAgent,
      });

      setInterval(() => this.torNewSession(), 10 * 1000);
    }

    if (proxy) {
      const [ip, port] = proxy.split(':');
      this.inst = axios.create({
        httpsAgent: tunnel.httpsOverHttp(<any>{
          proxy: {
            host: ip,
            port: +port,
          },
        }),
      })
    }

    this.setNoRedirectsIntersepter();
  }

  public setDefaultHeaders(headers: Header) {
    this.defaultHeaders = headers;
  }

  public async get(url: string, config: AxiosRequestConfig = {}) {
    config = { ...this.config, ...config };
    config.headers = { ...this.defaultHeaders, ...config.headers };

    const response = await this.inst.get(url, config);
    this.cookie = (response.headers['set-cookie'] || []).join(';');

    return response;
  }

  public async post(url: string, data: Json, config: AxiosRequestConfig = {}, type: BodyType = "json", saveCookie: boolean = true) {
    config = { ...this.config, ...config };
    config.headers = { ...this.defaultHeaders, ...config.headers };

    let body;
    switch (type) {
      case "json":
        body = JSON.stringify(data);
        break;
      case "url":
        const params = new URLSearchParams();
        Object.keys(data).forEach(key => params.append(key, data[key]));
        body = params;
        break;
    }

    const response = await this.inst.post(url, body, config);
    if (saveCookie) {
      this.cookie = (response.headers['set-cookie'] || '').join(';');
    }

    return response;
  }

  public async torNewSession() {
    if (!tor) { return; }
    return await tor.torNewSession();
  }

  public clearCookie() {
    this.cookie = '';
  }
}
