import { PluginBase } from '@victorbotjs/core'
import XpCommand from './XpCommand'
import XpMiddleware from './XpMiddleware'
import { processDecrementXpScript } from './XpService'

class XpPlugin extends PluginBase {
  commands = new XpCommand({ commandText: "xp" });
  middleware = new XpMiddleware();
  automations = [
    {
      timer: '',
      script: processDecrementXpScript
    }
  ];
}

export default XpPlugin
