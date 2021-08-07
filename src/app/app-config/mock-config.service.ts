import {ConfigService} from './app-config.service';
import {AppConfig} from './app-config';
import {MutableKeys, Primitive} from 'utility-types';

export class MockConfigService extends ConfigService {

    private readonly config: AppConfig = {apiUrl: new URL('http://example.local'), defaultRefreshMs: 200};

    get<CONFIG_KEY extends keyof AppConfig>(configKey: CONFIG_KEY)
        : AppConfig[CONFIG_KEY] extends Primitive ? AppConfig[CONFIG_KEY] : Readonly<AppConfig[CONFIG_KEY]> {
        return this.config[configKey];
    }

    set<CONFIG_KEY extends MutableKeys<AppConfig>>(configKey: CONFIG_KEY, configValue: AppConfig[CONFIG_KEY]): void {
        void configKey;
        void configValue;

        throw Error('not implemented');
    }

}
