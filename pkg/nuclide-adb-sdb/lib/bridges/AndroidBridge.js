/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import type {DebugBridgeFullConfig} from 'nuclide-adb/lib/types';
import type {NuclideUri} from 'nuclide-commons/nuclideUri';
import {observeAndroidDevicesX} from 'nuclide-adb/lib/AdbDevicePoller';
import typeof * as AdbService from 'nuclide-adb/lib/AdbService';
import type {Store} from '../types';
import type {Expected} from 'nuclide-commons/expected';
import type {Device} from 'nuclide-debugger-common/types';
import type {DeviceTypeAndroid} from '../types';

import * as Actions from '../redux/Actions';
import {getAdbServiceByNuclideUri} from 'nuclide-adb/lib/utils';
import {Observable} from 'rxjs';

export class AndroidBridge {
  debugBridge: 'adb' = 'adb';
  name: DeviceTypeAndroid = 'Android';

  _store: Store;

  constructor(store: Store) {
    this._store = store;
  }

  getService(host: NuclideUri): AdbService {
    return getAdbServiceByNuclideUri(host);
  }

  getCustomDebugBridgePath(host: NuclideUri): ?string {
    return this._store.getState().customAdbPaths.get(host);
  }

  setCustomDebugBridgePath(host: NuclideUri, path: ?string): void {
    this._store.dispatch(Actions.setCustomAdbPath(host, path));
  }

  getFullConfig(host: NuclideUri): Promise<DebugBridgeFullConfig> {
    return this.getService(host).getFullConfig();
  }

  observeDevicesX(host: NuclideUri): Observable<Expected<Device[]>> {
    return observeAndroidDevicesX(host);
  }
}
