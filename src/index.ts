import { Utils } from './utils/Utils';

(function () {
  const PocLib = {
    Utils
  };

  (window as any).PocLib = PocLib;
})();

export { Utils } from './utils/Utils';
export { Button } from './components/atoms/button/Button'; 