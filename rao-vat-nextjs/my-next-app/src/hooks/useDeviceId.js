import { useEffect, useState } from 'react';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

const useDeviceId = () => {
  const [deviceId, setDeviceId] = useState(null);

  useEffect(() => {
    const getId = async () => {
      let id = localStorage.getItem('deviceId');
      if (!id) {
        const fp = await FingerprintJS.load();
        const result = await fp.get();
        id = result.visitorId;
        localStorage.setItem('deviceId', id);
      }
      setDeviceId(id);
    };
    getId();
  }, []);

  return deviceId;
};

export default useDeviceId;