import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppConfig} from './app-config';
import {MutableKeys, Primitive} from 'utility-types';

export abstract class ConfigService {
  abstract get<CONFIG_KEY extends keyof AppConfig>(configKey: CONFIG_KEY)
    : AppConfig[CONFIG_KEY] extends Primitive ? AppConfig[CONFIG_KEY] : Readonly<AppConfig[CONFIG_KEY]>;

  abstract set<CONFIG_KEY extends MutableKeys<AppConfig>>(configKey: CONFIG_KEY, configValue: AppConfig[CONFIG_KEY]): void;
}

@Injectable({
  providedIn: 'root'
})
export class AppConfigService extends ConfigService {

  private config: AppConfig | null = null;

  constructor(private readonly httpClient: HttpClient) {
    super();
  }

  init(): Promise<void> {
    if (this.config) {
      throw new Error('Configuration is already initialized');
    }

    return this.httpClient
      .get<AppConfig>('app-config.json')
      .toPromise()
      .then(config => {
        this.config = config;
      });
  }

  override get<CONFIG_KEY extends keyof AppConfig>(configKey: CONFIG_KEY)
    : AppConfig[CONFIG_KEY] extends Primitive ? AppConfig[CONFIG_KEY] : Readonly<AppConfig[CONFIG_KEY]> {
    if (!this.config) {
      throw new Error('Configuration is not initialized');
    }

    return this.config[configKey];
  }

  override set<CONFIG_KEY extends MutableKeys<AppConfig>>(configKey: CONFIG_KEY, configValue: AppConfig[CONFIG_KEY]): void {
    if (!this.config) {
      throw new Error('Configuration is not initialized');
    }

    this.config[configKey] = configValue;
  }

}
