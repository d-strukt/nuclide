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

import type {
  UpdateWelcomePageVisibilityAction,
  WelcomePage,
  AddWelcomePageAction,
  DeleteWelcomePageAction,
  HideUnhideTopicsAction,
  SetShowOptionAction,
} from '../types';

import {showOne, showAll} from '../ShowOptions';
import * as ActionTypes from './ActionTypes';

export function addWelcomePage(welcomePage: WelcomePage): AddWelcomePageAction {
  return {
    type: ActionTypes.ADD_WELCOME_PAGE,
    payload: {welcomePage},
  };
}

export function deleteWelcomePage(topic: string): DeleteWelcomePageAction {
  return {
    type: ActionTypes.DELETE_WELCOME_PAGE,
    payload: {topic},
  };
}

export function updateWelcomePageVisibility(
  isVisible: boolean,
): UpdateWelcomePageVisibilityAction {
  return {
    type: ActionTypes.UPDATE_WELCOME_PAGE_VISIBILITY,
    payload: {isVisible},
  };
}

export function hideUnhideTopics(
  topicsToHide: Set<string>,
  topicsToUnhide: Set<string>,
): HideUnhideTopicsAction {
  return {
    type: ActionTypes.HIDE_UNHIDE_TOPICS,
    payload: {topicsToHide, topicsToUnhide},
  };
}

export function setShowAll(): SetShowOptionAction {
  return {
    type: ActionTypes.SET_SHOW_OPTION,
    payload: {
      showOption: showAll(),
    },
  };
}

export function setShowOne(topic: string): SetShowOptionAction {
  return {
    type: ActionTypes.SET_SHOW_OPTION,
    payload: {
      showOption: showOne(topic),
    },
  };
}

export function clearShowOption(): SetShowOptionAction {
  return {
    type: ActionTypes.SET_SHOW_OPTION,
    payload: {
      showOption: undefined,
    },
  };
}
