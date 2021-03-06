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

import type {DeviceTypeTaskProvider} from 'nuclide-debugger-common/types';
import type {NuclideUri} from 'nuclide-commons/nuclideUri';
import type {TaskEvent} from 'nuclide-commons/process';
import type {Bridge} from './types';

import showModal from 'nuclide-commons-ui/showModal';
import {CustomPathModal} from './CustomPathModal';
import {Observable} from 'rxjs';
import * as React from 'react';

export class ConfigurePathTaskProvider implements DeviceTypeTaskProvider {
  _bridge: Bridge;

  constructor(bridge: Bridge) {
    this._bridge = bridge;
  }

  getType(): string {
    return this._bridge.name;
  }

  getName(): string {
    return `Configure ${this._bridge.debugBridge}`;
  }

  getTask(host: NuclideUri): Observable<TaskEvent> {
    return Observable.defer(() => this._bridge.getFullConfig(host)).switchMap(
      fullConfig => {
        return Observable.create(observer => {
          const disposable = showModal(
            ({dismiss}) => (
              <CustomPathModal
                dismiss={dismiss}
                activePath={fullConfig.active}
                currentCustomPath={this._bridge.getCustomDebugBridgePath(host)}
                registeredPaths={fullConfig.all}
                setCustomPath={customPath =>
                  this._bridge.setCustomDebugBridgePath(host, customPath)
                }
                type={this._bridge.debugBridge}
              />
            ),
            {
              className: 'nuclide-adb-sdb-custom-path-modal',
              onDismiss: () => {
                disposable.dispose();
                observer.complete();
              },
              shouldDismissOnClickOutsideModal: () => false,
            },
          );
        });
      },
    );
  }
}
