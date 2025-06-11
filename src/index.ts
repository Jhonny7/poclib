import { Utils } from './utils/Utils';
import { Button } from './components/atoms/button/Button';
(function () {
  const PocLib = {
    Utils,
    Button
  };

  // ⬅️ esta línea es la que realmente necesitas
  (window as any).PocLib = PocLib;
})();