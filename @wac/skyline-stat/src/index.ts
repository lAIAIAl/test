/* tslint:disable:interface-name */
import qs = require('query-string');
import loadScript = require('load-script');
import objAssign = require('object-assign');
import includes = require('array-includes');
import Cookie = require('js-cookie');
import md5 = require('md5');
import pathToRegexp = require('path-to-regexp');

import { Promise } from 'es6-promise';
import { createBrowserHistory } from 'history';

import { Messenger, MessageWrapper } from '@wac/messenger';
import SkylineCore from '@wac/skyline-core';
import { delegate, Interceptor, VisualConfig, EventCancelObject } from '@wac/visual-suite';
import { CompositeEvent } from '@wac/visual-suite/lib/delegate';
import {
  parse,
  getServerUrl,
  isWacai,
  isEditMode,
  extract,
  IExtractObject
} from '@wac/skyline-core/lib/util';
import {
  getParsedVisualConfig,
  IParsedSkylineVisualConfig
} from '@wac/skyline-core/lib/visual-config-parser';

interface ISkylineUserCenter {
  init(opts: object): Promise<any>;
}

interface IterableObject {
  [key: string]: string;
}

interface IOpts {
  [key: string]: any;
}

interface InitOptsType {
  projectName: string;
  appName: string;
  environment?: string;
  serverUrl?: string;
  enableQALogging?: boolean;
  _setCustomVar?: IterableObject;
  sourceChannel?: string[];
  enableBridge?: boolean;
  enableVisualTracking?: boolean;
  debugVisualTracking?: boolean;
  debugSourceOrigin?: string,
  debugTargetOrigin?: string,
  isSPA?: boolean,
  showLog?: boolean;
  sendType?: string;
}

interface ICustomParams {
  uid: string;
  token: string;
  unencryptedToken: string;
  af: string;
  mc: string;
  version: string;
  platform: string;
  sessionId: string;
}

interface IDefaultOpts {
  environment: string;
  enableQALogging: boolean;
  _setCustomVar: IterableObject;
  showLog: boolean;
  sendType: string;
}

interface ICustomLocaltion {
  hash: string;
  host: string;
  hostname: string;
  href: string;
  origin: string;
  pathname: string;
  port: string;
  protocol: string;
  search: string;
  regexp: string;
}

const history = createBrowserHistory();

class SkylineUserCenter extends SkylineCore implements ISkylineUserCenter {
  private promise: any = null;
  private appName: string = '';
  private sourceChannelStandard: string[] = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];

  private interceptEnabled: boolean = false;

  private currentLocation?: ICustomLocaltion = void 0;

  private eventCancelObject?: EventCancelObject = void 0;

  constructor() {
    super();

    this.promise = this.requestCookie();
  }

  public init(opts: InitOptsType): Promise<any> {
    this.appName = opts.appName;
    const sourceChannel: string[] | undefined = opts.sourceChannel;

    const { serverUrl, environment, isSPA } = opts;
    let { projectName } = opts;

    if (environment !== 'production') {
      projectName = 'skyline';
    }

    const realServerUrl = getServerUrl({ serverUrl, environment, projectName });

    const defaultOpts = {
      environment: 'test',
      enableQALogging: false,
      _setCustomVar: {},
      showLog: false,
      sendType: 'image',
    };

    if (opts.enableBridge === false) {
      this.promise = this.promise.then(() => {
        return super.loadSa({
          ...defaultOpts,
          ...opts,
          serverUrl: realServerUrl,
          trackPageParams: {
            params: this.getUtm(sourceChannel),
          },
        });
      });
    } else {
      this.promise = this.initWithBridge(defaultOpts, opts, realServerUrl, sourceChannel);
    }

    if (opts.enableVisualTracking) {
      const interceptor = new Interceptor();
      // 后台编辑模式，初始化与 sakura 后台联动相关
      if (isEditMode()) {
        let communicationOrigin = environment === 'production'
        ? 'http://mario.wacai.info'
        : 'http://mario-node.mario.k2.test.wacai.info';

        if (opts.debugVisualTracking && opts.debugTargetOrigin) {
          communicationOrigin = opts.debugTargetOrigin
        }

        const messenger: Messenger = new Messenger(
          window.parent,
          communicationOrigin,
          opts.debugSourceOrigin
        );

        // 将页面地址信息发送至 mario 后台
        const {
          hash,
          host,
          hostname,
          href,
          origin,
          pathname,
          port,
          protocol,
          search
        } = window.location;

        const customLocation = {
          hash,
          host,
          hostname,
          href,
          origin,
          pathname,
          port,
          protocol,
          search
        };

        messenger.send({ type: 'current-location', data: customLocation } as any);

        window.addEventListener('message', (evt: MessageEvent) => {
          // 处理 sakura 后台传递过来的操作信息，比如 高亮埋点元素之类的
          if (evt.origin !== communicationOrigin) {
            return 
          }

          let originalData: any = evt.data

          // 消息来自于 可视化埋点
          if (originalData.needDeserialization !== undefined) {
            if (originalData.needDeserialization) {
              originalData = JSON.parse(originalData.data);
            } else {
              originalData = originalData.data;
            }
            const {
              type,
              selectors,
              location
            }: {type: string, selectors: string[], location: ICustomLocaltion }
            = originalData;

            switch(originalData.type) {
              case 'consititute':
                this.constituteElement(selectors, interceptor);
                break;
              case 'highlight':
                this.highlightElement(selectors, interceptor);
                break;
              case 'cancel-highlight':
                this.cancelHighlightElement();
                break;
              case 'sync-location':
                this.syncLocation(location, messenger, interceptor);
                break;
              default:
                break;
            }
          }
        });

        this.interceptPageEventIfMatching(messenger, interceptor);
      } else {
        // 上报模式，解析配置上报埋点
        const parsedVisualConfig = getParsedVisualConfig();

        const pathnameRegexpList = Object.keys(parsedVisualConfig)
        let currentPathname: string = ''
        // tslint:disable-next-line
        for (let i = 0, regexp; (regexp = pathnameRegexpList[i]); i++) {
          if (pathToRegexp(regexp).exec(location.pathname)) {
            currentPathname = regexp
          }
        }
        // TODO SPA 应用的支持
        const canContinue = Boolean(currentPathname)

        if (canContinue) {
          const eventTypeKeyConfig = parsedVisualConfig[currentPathname]

          Object.keys(eventTypeKeyConfig).forEach((eventName: string) => {
            // 页面加载类事件不需要绑定监听函数。因为 js 文件加载执行到此刻，即代表页面加载完成
            // 此时，直接获取 页面加载事件并发送之
            if (eventName === 'load') {
              // 页面加载类 事件结构固定为 { load: { html: [] } }
              const pageLoadEvents = eventTypeKeyConfig.load.html
  
              // 暂不支持发送属性
              pageLoadEvents.forEach(({ code, enableVisualTracking }) => {
                if (enableVisualTracking) {
                  this.send(code)
                }
              })
            } else {
              const selectorConfigMap = eventTypeKeyConfig[eventName]
              const selectors = Object.keys(selectorConfigMap)
  
              // tslint:disable-next-line
              delegate([<HTMLElement>(document as any)], selectors, eventName, (evt: CompositeEvent) => {
                const selector = evt.selector;
      
                if (selector) {
                  selectorConfigMap[selector].forEach(({ code, enableVisualTracking }) => {
                    // 埋点事件粒度上控制是否允许可视化埋点框架发送埋点事件
                    if (enableVisualTracking) {
                      this.send(code);
                    }
                  });
                }
              }, true);
            }
          })
        }
      }
    }

    return this.promise;
  }

  public send(eventName: string, params?: object): Promise<any> {
    return this.promise.then(() => {
      const customParams = objAssign({}, this.getSklParams(), params);

      const compositedParams = super.track(eventName, customParams);

      super.triggerQALogger(eventName, { params: compositedParams });
      // 埋点验证
      super.checkStat(eventName, { params: compositedParams });
    });
  }

  public trackSinglePage(params: object): Promise<any> {
    return this.promise.then(() => {
      const compositeParams = objAssign(
        {},
        this.getUtm(this.sourceChannelStandard),
        this.getSklParams(),
        params
      );

      super.trackSinglePage(compositeParams);
    });
  }

  public registerCheckStatHook(fn: (requestParams: object, p: Promise<any>) => any): void {
    super.registerCheckStatHook(fn);
  }

  private initWithBridge(
    defaultOpts: IDefaultOpts,
    opts: InitOptsType,
    serverUrl: string,
    sourceChannel?: string[],
  ): Promise<any> {
    return this.promise.then(() => {
      const bridge = (window as any).WebViewJavascriptBridge;

      const jsBridgeHandler = () => {
        document.removeEventListener('WebViewJavascriptBridgeReady', jsBridgeHandler);

        /* tslint:disable:no-shadowed-variable */
        if (bridge && bridge.getSkylineConfig) {
          return this.getNativeConfig(opts).then(opts =>
            super.loadSa({
              ...defaultOpts,
              serverUrl,
              ...opts,
              trackPageParams: {
                params: this.getUtm(sourceChannel),
              },
            }),
          );
        }

        return super.loadSa({
          ...defaultOpts,
          serverUrl,
          ...opts,
          trackPageParams: {
            params: this.getUtm(sourceChannel),
          },
        });
      };

      if (!isWacai()) {
        return super.loadSa({
          ...defaultOpts,
          serverUrl,
          ...opts
        });
      }

      if (bridge) {
        if (bridge.getSkylineConfig) {
          return this.getNativeConfig(opts).then(opts =>
            super.loadSa({
              ...defaultOpts,
              serverUrl,
              ...opts,
              trackPageParams: {
                params: this.getUtm(),
              },
            }),
          );
        }
      } else {
        return new Promise(resolve => {
          document.addEventListener('WebViewJavascriptBridgeReady', () => resolve(jsBridgeHandler()));
        });
      }
    });
  }

  private constituteElement(selectors: string[], interceptor: Interceptor): void {
    selectors.forEach(selector => {
      window.document.querySelectorAll(selector).forEach(element => {
        interceptor.constitute(element as HTMLElement, false);
      });
    });
  }

  private syncLocation(customLocation: ICustomLocaltion, messenger: Messenger, interceptor: Interceptor): void {
    this.currentLocation = customLocation;

    // 收到 mario 后台的 location 消息时，尝试拦截页面事件
    if (!this.interceptEnabled) {
      this.interceptPageEventIfMatching(messenger, interceptor);
    }
  }

  private highlightElement(selectors: string[], interceptor: Interceptor): void {
    this.eventCancelObject = interceptor.highlight(selectors);
  }

  private cancelHighlightElement(): void {
    if (this.eventCancelObject) {
      this.eventCancelObject.cancel();
    }
  }

  private requestCookie(): Promise<any> {
    const query = parse();

    if (!query.a_f) {
      return Promise.resolve();
    }

    query._ = Math.random();

    const url = `//blackhole.wacai.com/intercept_af_data.html?${qs.stringify(query)}`;

    return new Promise(resolve => {
      loadScript(url, (err: any, script: any) => {
        resolve();

        script.parentNode.removeChild(script);
      });

      setTimeout(resolve, 1000);
    });
  }

  private getNativeConfig(opts: any): Promise<any> {
    return (window as any).WebViewJavascriptBridge.getSkylineConfig().then((info: IOpts) => {
      const { serverUrl, appName, enableQALogging } = opts;
      const { serverURL, environment, projectName } = info;
      let realProjectName = projectName;

      if (environment !== 'production') {
        realProjectName = 'skyline';
      }

      opts.serverUrl =
        getServerUrl({
          serverUrl: serverURL,
          environment,
          projectName: realProjectName,
        }) || serverUrl;

      opts.appName = info.appName || appName;
      opts.enableQALogging = info.isDebugMode ? true : enableQALogging;

      return opts;
    });
  }

  private getCustomParams(): ICustomParams {
    const query = parse();
    const ua = navigator.userAgent;

    const uid = Cookie.get('uid') || '';

    const token =
      Cookie.get('wtck') || Cookie.get('access_token') || Cookie.get('token') || Cookie.get('X-Access-Token');

    const af: string = Cookie.get('a_f') || query.a_f || '';
    const mc: string = /mc\/([\S]*)/i.test(ua) ? RegExp.$1 : query.mc || '';
    const version: string = /wacai\/([\S]*)/i.test(ua) ? RegExp.$1 : query.version || '';
    const platform: string = /platform\/([\S]*)/i.test(ua) ? +RegExp.$1 : query.platform || -1;
    const sessionId = Cookie.get('session_id') || '';
    const versionReg: string[] | null = version.match(/(\d+\.){2}\d+/);

    return {
      uid,
      token: token ? md5(token) : '',
      unencryptedToken: token || '',
      af,
      mc,
      version: versionReg ? versionReg[0] : version,
      platform,
      sessionId,
    };
  }

  private getSklParams(): object {
    const { uid, token, unencryptedToken, af, mc, version, platform, sessionId } = this.getCustomParams();

    return {
      skl_device_id: '',
      skl_login_id: uid,
      skl_wax_app: '',
      skl_wax_sdk: '',
      skl_session_id: sessionId,
      skl_trace_id: '',
      skl_ab_id: '',
      skl_gray_id: '',
      skl_app_name: this.appName,
      skl_mc: mc,
      skl_platform: platform.toString(),
      skl_version: version,
      skl_a_f: af,
      skl_token: token,
      skl_raw_token: unencryptedToken,
    };
  }

  private enableInterceptor(messenger: Messenger, interceptor: Interceptor): void {
    const { pathname } = window.location;

    this.interceptEnabled = true;

    // 页面匹配后，发消息通知 mario 后台。以便做后续交互逻辑
    messenger.send({
      type: 'response',
      data: {
        action: 'consititute',
        result: 'success'
      }
    });

    interceptor.constituteAuto(false, (element, constituted): void => {
      const elementFeature: IExtractObject = extract(element);

      if (constituted) {
        elementFeature.pathname = pathname;

        const message: any = { type: 'consititute', data: elementFeature };

        message.data = elementFeature;

        messenger.send(message);
      }
    });
  }

  private interceptPageEventIfMatching(messenger: Messenger, interceptor: Interceptor): void {
    if (this.currentLocation) {
      const pathRegexp = this.currentLocation.regexp;
      const match = pathToRegexp(pathRegexp).exec(location.pathname);

      if (match) {
        this.enableInterceptor(messenger, interceptor);
  
        return
      }
  
      history.listen((location, action) => {
        const changedMatch = pathToRegexp(pathRegexp).exec(location.pathname);
  
        if (changedMatch) {
          this.enableInterceptor(messenger, interceptor);
        }
      });
    }
  }

  private getUtm(sourceChannel?: string[]): object {
    let campaignKeywords: string[] = this.sourceChannelStandard;
    const utms: any = {};

    if (sourceChannel instanceof Array && sourceChannel.length > 0) {
      campaignKeywords = campaignKeywords.concat(sourceChannel);
    }
    const queryParams = qs.parse(location.search.slice(1));
    campaignKeywords.forEach(val => {
      if (queryParams[val]) {
        utms[val] = queryParams[val];
      }
    });

    const $utms: any = {};
    for (const i in utms) {
      if (includes(this.sourceChannelStandard, i)) {
        $utms['$' + i] = utms[i];
      } else {
        $utms[i] = utms[i];
      }
    }
    return $utms;
  }
}

const instance = new SkylineUserCenter();

/* tslint:disable:variable-name */
export const __stat__ = instance;

export default instance;

module.exports = {
  __stat__: instance,

  init: instance.init.bind(instance),

  send: instance.send.bind(instance),

  trackSinglePage: instance.trackSinglePage.bind(instance)
};
