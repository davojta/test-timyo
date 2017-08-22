import {
    needProcessMiddleware,
    getUTCDate,
    getToneString,
} from './utils';
import $ from 'jquery';

import { registerLetter } from './stub'

const APP = 'test';
const module = 'index';
export const SHOW_NO_RECIPIENTS = `${APP}/${module}/showNoRecipients`;
export const REGISTER_LETTER = `${APP}/${module}/registerLetter`;

const emojiValue = '🙁';
export function getExpectationHeader(
    template='template',
    tone='{action} by {date}',
    ifText='If cc: read',
    ) {
    var templateWithValues = template
        .replace('{tone}', tone)
        .replace('{ifcc}', ifText)
        .replace('{emoji}', emojiValue);

    return templateWithValues;

}

export function sendTimyoLetter(composeState, toLength) {
    const { composeClass } = composeState;
    let meta = {};
    if (composeState.isRegular || !composeState.switchOn) {
        meta = {
            expectationHeader: {
                regular: true,
            },
        };
    } else {
        meta = {
            sendButton: {
                composeClass: composeClass,
            },
            expectationHeader: {
                insert: {
                    composeClass: composeClass,
                },
            },
        };
    }

    return {
        type: 'TIMYO_SEND',
        payload: {
            id: composeState.id,
        },
        meta,
    };
}


export const expectationHeader = store => next => action => {
    let result = next(action);

    if (!needProcessMiddleware(action, 'expectationHeader')) return result;

    const middlewareParams = action.meta.expectationHeader;

    const id = action.payload.id;
    if (id === undefined || id === -1) {
        throw new Error('expectationHeader middleware work with id on action.payload.id.');
    }
    const sendBox = $(`.js-id-${id}`);
    const $regularSendButton = $('.js-timyo-original-send', sendBox);
    if ($regularSendButton.length === 0) throw new Error('expectationHeader middleware work with send button in Dom');

    if (middlewareParams.regular) {
        store.dispatch({
            type: 'REGULAR_SEND',
            meta: {
                analytics: {
                    sendEvent: {
                        key: 'REGULAR_SEND',
                    },
                },
            },
        });
        $regularSendButton.click();
        return;
    }

    if (!middlewareParams.insert) return;
    const composeState = store.getState().when.composeStates[id];

    // detect to and ccc
    const to = [];
    const cc = [];

    const $lineWithEmail = $('.GS TR:nth-child(1)', sendBox);
    const $lineWithCc = $('.GS TR:nth-child(2)', sendBox);

    // to recipients
    $.each($('.vN', $lineWithEmail), function () {
        to.push($(this).attr('email'));
    });

    // cc recipients
    $.each($('.vN', $lineWithCc), function () {
        cc.push($(this).attr('email'));
    });


    // Exit function if no recipients
    if (!to.length && !cc.length) {
        console.error('no to and no cc');
        store.dispatch({
            type: SHOW_NO_RECIPIENTS,
            meta: {
                timyoPopup: {
                    template: 'no-recipients',
                    primaryAction: {
                        type: 'FOCUS_ON_TO',
                        meta: {
                            composePopup: {
                                focus: 'to',
                            },
                        },
                    },
                    closeAction: {
                        type: 'FOCUS_ON_TO',
                        meta: {
                            composePopup: {
                                focus: 'to',
                            },
                        },
                    },
                },
            },
        });

        return;
    }

    const sendLetterRegistrationObject = {
        date: undefined,
        hashId: undefined,
        /* toTimyoLabel: {
         recipients: undefined,
         date: undefined,
         action: undefined,
         asap: undefined,
         },
         ccTimyoLabel: {
         recipients: undefined,
         date: undefined,
         action: undefined,
         asap: undefined
         }*/
    };

    // cleanup
    $('#virality', sendBox).remove();

    const uniqueTimyoIdForEmail = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0;
        const v = (c === 'x') ? r : (r & 0x3 | 0x8);

        return v.toString(16);
    });

    const expectationDateUtc = getUTCDate(composeState.date, composeState.dateValue);

    const state = store.getState();
    const {
        templates,
        ifcc,
    } = state.expectationHeaderConfig;
    // console.log('state', state);
    const tones = state.expectationHeaderConfig.tones;

    const tone = getToneString(tones, composeState);

    const expectationHeaderTemplate = templates.expectation_header;
    // console.log('expectationHeaderTemplate', expectationHeaderTemplate);

    let emojiValue = '';

    if (composeState.emoji !== null) {
        emojiValue = composeState.emoji.native + '&nbsp;';
    }

    let ifText = composeState.ifcc ? ifcc['en'] : '';

    // console.log('baseURL', expectationHeaderTemplate.match(/{baseUrl}/gm));
    var templateWithValues = getExpectationHeader(
        expectationHeaderTemplate,
        tone,
        ifText,
        emojiValue
    );
    // console.log('templateWithValues', templateWithValues);
    $('div[role="textbox"][contenteditable="true"]',
        sendBox).prepend(templateWithValues);

    $regularSendButton.attr('data-timyo-send', true);


    sendLetterRegistrationObject.date = Math.round(new Date().getTime());
    sendLetterRegistrationObject.hashId = uniqueTimyoIdForEmail;

    const expectationAction = composeState.action;
    const expectationDate = composeState.date;

    if (to.length > 0) {
        sendLetterRegistrationObject.toTimyoLabel = {
            recipients: to,
            date: expectationDateUtc,
            action: expectationAction.toUpperCase(),
            asap: (expectationDate === 'asap'),
    };
    }

    if (cc.length > 0) {
        sendLetterRegistrationObject.ccLabel = {
            recipients: cc,
            date: expectationDateUtc,
            action: 'READ',
            asap: false,
        };
    }
    const letterString = JSON.stringify(sendLetterRegistrationObject);

    const isCC = (cc.length > 0);
    store.dispatch(registerLetter(letterString, isCC));

    $regularSendButton.click();

    return result;
};
