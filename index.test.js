import cloneDeep from 'lodash.clonedeep';
import $ from 'jquery';

import {
    getExpectationHeader,
    expectationHeader,
    sendTimyoLetter,
    REGISTER_LETTER,
} from './index';

import {
    combineReducers,
    createStore,
} from 'redux';

import config from './defaultFallbackConfig';

let template = '{when}: {emoji} {tone}. {ifcc}';

describe('getExpectationHeader', () => {
    beforeEach(() => {

    });
    describe('replace template with options', () => {
        it('and put When to the template', () => {
            const result = getExpectationHeader(template);

            expect(result).toContain('When: ');
        });
        it('and put tone to the template', () => {
            const result = getExpectationHeader(template);

            expect(result).toContain('Please, read ASAP');
        });
        it('and put ifcc to the template', () => {
            const result = getExpectationHeader(template);

            expect(result).toContain('If CC: read');
        });
        it('and put emoji to the template', () => {
            const result = getExpectationHeader(template);

            expect(result).toContain('🌞');
        });

    })
});

let store;
const defaultState = {
    id: -1,
    popoverOpened: false,
    action: 'read',
    date: 'today',
    dateValue: '',
    lang: 'en',
    emoji: null,
    tone: 'short',
    ifcc: false,
    asap: false,
    isRegular: true,
    switchOn: true,
    composeClass: 'js-id_',
    showTutorial: false,
    isSmallScreen: false,
};

describe('add expectationHeader middleware', () => {
    beforeEach(() => {
        const composeState = cloneDeep(defaultState);

        composeState.id = 0;
        composeState.action = 'reply';
        composeState.composeClass = 'js-id-0';
        composeState.isRegular = false;

        store = createStore(combineReducers({
            when: (state = {}) => state,
            expectationHeaderConfig: (state = {}) => state,
            config: (state = {}) => state,
        }), {
            config: {
                baseUrl: 'test.timyo.com',
            },
            when: {
                composeStates: [composeState],
            },
            expectationHeaderConfig: {
                ...config
            },
        });

        store.dispatch({
            type: 'loadConfig'
        });

        document.body.innerHTML = `
<table class="js-timyo-active-compose js-id-0 aoP aoC">
<tr>
<td>
<div>
<table class="GS"><tr>
<td class="eV">
<div>
<div class="vR">
<span class="vN bfK a3q" email="denis@timyo.com"><div class="vT">Dzianis Sheka</div><div class="vM"></div></span><input name="to" type="hidden" value="Dzianis Sheka <denis@timyo.com">


</div>
<div class="vR">
<span class="vN bfK a3q" email="denis@timyo.com"><div class="vT">Dzianis Sheka</div><div class="vM"></div></span><input name="to" type="hidden" value="Dzianis Sheka <denis@timyo.com">


</div>
</div>
</td>
</tr></table>
</div>

<table class="iN"><tr>
<td class="GQ">
<div><divtable><tr>
<td>
<div class="Ap">
<div class="Ar Au">

<div id=":gy" class="Am Al editable LW-avf" hidefocus="true" aria-label="Тело письма" g_editable="true" role="textbox" contenteditable="true" tabindex="1" style="direction: ltr; min-height: 279px;" itacorner="6,7:1,1,0,0"><br></div>


</div>
</div>
</td>
</tr></divtable></div>
</td>
</tr></table>

</td>
<td>
                <div class="send-btn js-timyo-original-send" role="button"
                     data-tooltip="Send" aria-label="Send" data-tooltip-delay="800">
                    Send
                </div>
</td>
</tr>
</table>

            
            `;
    });
    it('process action with expectationHeader field', () => {
        const composeState = store.getState().when.composeStates[0];
        const action = sendTimyoLetter(composeState, 0);


        const nextMock = jest.fn(() => true);
        const bindedMiddleware = expectationHeader(store)(nextMock);

        const actionResult = bindedMiddleware(action);

        return expect(actionResult).toBe(true);
    });
    it('add expectation header template before email body', () => {
        const composeState = store.getState().when.composeStates[0];
        const action = sendTimyoLetter(composeState, 0);


        const nextMock = jest.fn(() => true);
        const bindedMiddleware = expectationHeader(store)(nextMock);

        bindedMiddleware(action);

        const $messageBody = $('div[g_editable="true"][role="textbox"][contenteditable="true"]', $('.js-id-0'));
        console.log('mess', $messageBody.html());
        expect($messageBody.find('br').length).toBe(1);
    });
    it('dispatch register_letter action', () => {
        store.dispatch = jest.fn();
        const composeState = store.getState().when.composeStates[0];
        const action = sendTimyoLetter(composeState, 0);


        const nextMock = jest.fn(() => true);
        const bindedMiddleware = expectationHeader(store)(nextMock);

        bindedMiddleware(action);

        expect(store.dispatch.mock.calls[0][0].type).toBe(REGISTER_LETTER);
    });
});
