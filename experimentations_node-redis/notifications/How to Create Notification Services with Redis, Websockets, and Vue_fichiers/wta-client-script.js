const BASE_API_URL = 'https://trking.alert-on.com/tracking';
let utm_data, lead_ip, allowedOrigins, fingerPrint, email, fieldConfigs = null, commonAccountAndConfigFields = [],
    isValidKey = true, referralDomain = null;
const FIELD_CONFIG_VALUES = {"campaign": "", "source": "", "medium": ""}
const SEARCH_ENGINES = ['google', 'bing', 'yahoo', 'duckduckgo', 'msn', 'yandex']; //organic type
const SOCIAL_REFERRALS = ['facebook', 'instagram', 'linkedin', 'twitter', 'YouTube', 'reddit', 'quora']; //referral types
const APP_ACTION_URL = 'redis.com';
const LOGIN_URL = '/login';
const LANDING_PAGE = window.location.href;
const COOKIE_NAME = 'wtaFd04Tracking'
const SCRIPT_ID = "wta-fd04-tracking-id"
const APP_KEY = document.getElementById(SCRIPT_ID).getAttribute("data-key");
const FP_OPTIONS = ["touchSupport", "platform", "timezone", "availableScreenResolution", "screenResolution", "hardwareConcurrency", "colorDepth",
    "deviceMemory", "canvas", "webgl", "audio", "webglVendorAndRenderer", "hasLiedLanguages", "hasLiedResolution", "hasLiedOs", "hasLiedBrowser"]
let account_fields = [];

/*********************Action Calls************************/
//this is the point from where script start
if (detectIEEdge()) {
    //load polyfills to support latest methods in IE and edge
    loadScript("https://polyfill.io/v3/polyfill.min.js?features=es6%2CArray.prototype.includes%2CArray.prototype.some%2CURLSearchParams", function () {
        loadFingerPrintScript()
    });
} else {
    loadFingerPrintScript()
}

window.onload = function () {

    // addListenersToAnchorTag();

    addListenersToEmailInputs();
};

/*********************Actions************************/

function addListenersToAnchorTag() {
    let anchors = document.getElementsByTagName('a');
    for (let i = 0; i < anchors.length; i++) {
        let a = anchors[i];
        if (a.addEventListener) {
            a.addEventListener("click", clickedOnAnchorTag);
        } else if (a.attachEvent) {
            a.attachEvent('click', clickedOnAnchorTag);            //Old IE
        }
    }
}

//run on blur of any of email field
function setEmail(e) {
    email = e;
    if (email != undefined) {
        postDataToServer()
    }
}

function clickedOnAnchorTag(e) {
    let href = e.target.href ?? e.target.closest("a").getAttribute('href');

    console.log("Clicked");
    console.log(href);
    if (href.includes(APP_ACTION_URL) && !href.includes(LOGIN_URL) && !href.includes("/jobs") && !href.includes("/careers")) {
        console.log("Inside");
        const data = getDataToPost();
        let queryString = '';
        let isQuerySign = href.indexOf("?") !== -1;
        queryString += !isQuerySign ? '?' : '';
        for (let i = 0; i < account_fields.length; i++) {
            if (account_fields[i]['hidden_status']) {
                queryString += isQuerySign && i === 0 ? '&' : '';
                if (account_fields[i]['name'] != 'gclid') {
                    queryString += addParamToUrl('original_' + account_fields[i]['name'], data)
                    queryString += addParamToUrl('converting_' + account_fields[i]['name'], data)
                } else {
                    queryString += addParamToUrl(account_fields[i]['name'], data)
                }
            }
        }
//        queryString += 'lead_ip' + '=' + encodeURIComponent(lead_ip)
//        queryString += '&finger_print' + '=' + encodeURIComponent(fingerPrint)
        queryString += 'finger_print' + '=' + encodeURIComponent(fingerPrint)
        if (e.target.href) {
            e.target.href = href + queryString
        } else {
            e.target.closest("a").href = href + queryString
        }

    }
}

function addParamToUrl(paramName, data) {
    return paramName + '=' + encodeURIComponent(data['utm_data'][paramName]) + '&';
}

function addUtmDataToForms() {
    for (let i = 0; i < document.forms.length; i++) {
        let form = document.forms[i];
        if ((form.elements.length > 0 && form.elements[0].id === 'search-field')) continue;
        const data = getDataToPost()
        for (let i = 0; i < account_fields.length; i++) {
            if (account_fields[i]['hidden_status']) {
                if (account_fields[i]['name'] !== 'gclid') {
                    let originalHiddenField = account_fields[i]['hidden_field_name'] ? 'original_' + account_fields[i]['hidden_field_name'] : null;
                    let convertingHiddenField = account_fields[i]['hidden_field_name'] ? 'converting_' + account_fields[i]['hidden_field_name'] : null;
                    addHiddenInputField(form, 'original_' + account_fields[i]['name'], data, null, originalHiddenField);
                    addHiddenInputField(form, 'converting_' + account_fields[i]['name'], data, null, convertingHiddenField)
                } else
                    addHiddenInputField(form, account_fields[i]['name'], data, null,
                        account_fields[i]['hidden_field_name'] ? account_fields[i]['hidden_field_name'] : null);
            }
        }
        addHiddenInputField(form, 'finger_print', null, fingerPrint)
        addHiddenInputField(form, 'lead_ip', null, lead_ip)
    }
}

function addHiddenInputField(form, fieldName, data, value = null, hiddenFieldName = null) {
    if (form.id.indexOf('mktoForm_') === 0) {
        let marketoInput = form.elements.namedItem(hiddenFieldName ? hiddenFieldName : fieldName);
        if (marketoInput) {
            marketoInput.value = value !== null ? value : data['utm_data'][fieldName] ? data['utm_data'][fieldName] : null;
            return true;
        }
    }
    let input = document.createElement("input");
    input.type = "hidden";
    input.name = hiddenFieldName ? hiddenFieldName : fieldName;
    input.value = value !== null ? value : data['utm_data'][fieldName] ? data['utm_data'][fieldName] : null;
    form.appendChild(input);
}

//set listeners to watch email value
function addListenersToEmailInputs() {
    let emailInputs = document.querySelectorAll('input[type=email]');
    for (let i=0;i<emailInputs.length;i++){
        emailInputs[i].addEventListener("blur", function () {
            setEmail(emailInputs[i].value);
        });
    }

    if (document.forms['emailForm'] != undefined) {
        let em_header = document.forms['emailForm'].elements['wp_email'];
        em_header.addEventListener("blur", function () {
            setEmail(em_header.value);
        });
    }

    if (document.forms['template-signup'] != undefined) {
        let em_template = document.forms['template-signup'].elements['email'];
        em_template.addEventListener("blur", function () {
            setEmail(em_template.value);
        });
    }

    if (document.forms['email-form-1'] != undefined) {
        let em_form1 = document.forms['email-form-1'].elements['wp_email'];
        em_form1.addEventListener("blur", function () {
            setEmail(em_form1.value);
        });
    }

    if (document.forms['email-form-2'] != undefined) {
        let em_form2 = document.forms['email-form-2'].elements['wp_email'];
        em_form2.addEventListener("blur", function () {
            setEmail(em_form2.value);
        });
    }

    if (document.forms['partial-signup'] != undefined) {
        let em_partial = document.forms['partial-signup'].elements['email'];
        em_partial.addEventListener("blur", function () {
            setEmail(em_partial.value);
        });
    }

    if (document.forms['modal-signup'] != undefined) {
        let em_modal = document.forms['modal-signup'].elements['email'];
        em_modal.addEventListener("blur", function () {
            setEmail(em_modal.value);
        });
    }
}

function loadFingerPrintScript() {
    loadScript("https://cdnjs.cloudflare.com/ajax/libs/fingerprintjs2/2.1.0/fingerprint2.min.js", function () {
        setFingerPrint()
    });
}

function setFingerPrint() {
    if (window.requestIdleCallback) {
        requestIdleCallback(function () {
            fingerprint2()
        })
    } else {
        setTimeout(function () {
            fingerprint2()
        }, 500)
    }
}

//get initial data from server this can be equal to cookies
function getDataFromServer() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            setServerData(this.responseText)
        }
        if (this.readyState == 4 && this.status == 401) {
            isValidKey = false;
        }
    };
    xhttp.open("GET", BASE_API_URL + '/app-info/' + APP_KEY + '?fp=' + fingerPrint + '&email=' + email, true);
    xhttp.send();
}

function setCommonAccountAndConfigFields() {
    let fieldConfigs = ["source", "medium", "campaign"]
    // if (fieldConfigs && fieldConfigs['is_active']) {
    let accountField = account_fields.map(function (item) {
        return item['name']
    })
    //Object.keys(fieldConfigs["settings"])
    commonAccountAndConfigFields = fieldConfigs.filter(function (item) {
        return accountField.includes(item)
    });
    // }
}

//set data to use in script
function setServerData(data) {
    data = JSON.parse(data);
    fieldConfigs = data.field_configs
    allowedOrigins = data.allowed_origins;
    utm_data = data.utm_data;
    lead_ip = data.lead_ip;
    account_fields = data.account_fields;
    setCommonAccountAndConfigFields();
    setReferralDomain(); //this will set the referral type and referral domain
    if (window.MktoForms2 && window.MktoForms2.allForms().length > 0) {
        MktoForms2.whenRendered(function () {
            addUtmDataToForms();
            postDataToServer();
        })
    } else {
        addUtmDataToForms();
        postDataToServer();
    }
}

function setReferralDomain() {
    let isReferralSet = false;
    //referralDomain will be consider as source and type as source
    if (document.referrer) {
        const REF_URL = new URL(document.referrer);
        let hostname = REF_URL.hostname;
        //organic
        for (let i = 0; i < SEARCH_ENGINES.length; i++) {
            if (hostname.indexOf(SEARCH_ENGINES[i]) !== -1) {
                Object.assign(FIELD_CONFIG_VALUES, {
                    "campaign": REF_URL.pathname,
                    "source": REF_URL.hostname,
                    "medium": 'organic'
                });
                isReferralSet = true;
            }
        }
        //social
        for (let i = 0; i < SOCIAL_REFERRALS.length; i++) {
            if (hostname.indexOf(SOCIAL_REFERRALS[i]) !== -1) {
                Object.assign(FIELD_CONFIG_VALUES, {
                    "campaign": REF_URL.pathname,
                    "source": REF_URL.hostname,
                    "medium": 'social'
                })
                isReferralSet = true;
            }
        }
        // referral
        if (!isReferralSet) {
            Object.assign(FIELD_CONFIG_VALUES, {
                "campaign": REF_URL.pathname,
                "source": REF_URL.hostname,
                "medium": 'referral'
            })
        }
    } else {
        //direct
        Object.assign(FIELD_CONFIG_VALUES, {
            "campaign": new URL(LANDING_PAGE).pathname,
            "source": 'direct',
            "medium": 'direct'
        })
    }
}

function isOriginAllowed() {
    if (allowedOrigins.length === 0)
        return true;
    else {
        return allowedOrigins.some(function (origin) {
            return LANDING_PAGE.includes(origin);
        });
    }
}

function postDataToServer() {
    if (isValidKey && isOriginAllowed()) {
        const data = getDataToPost();
        let http = new XMLHttpRequest();
        http.open('POST', BASE_API_URL + '/' + APP_KEY, true);
        http.setRequestHeader('Content-type', 'application/json');
        http.onreadystatechange = function () {//Call a function when the state changes.
            if (http.readyState == 4 && http.status == 200) {
            }
        };
        http.send(JSON.stringify(data));
    }
}

//arrange the data to post to the server
function getDataToPost() {
    let urlParams = new URLSearchParams(window.location.search)
    let data = {
        'finger_print': fingerPrint,
        'email': email,
        utm_data: {}
    }
    let hostname = document.referrer ? new URL(document.referrer).hostname : "";
    if (hostname.includes(APP_ACTION_URL)) {
        let cookiesData = getCookie(COOKIE_NAME);
        if (cookiesData) {
            cookiesData = JSON.parse(cookiesData);
            data['utm_data'] = cookiesData.utm_data;
            return data
        }
    }
    urlParams = applyFieldConfigs(urlParams)
    let utmData = setOriginalUtmData(urlParams);
    utmData = setConvertingUtmData(utmData, urlParams);
    utmData['gclid'] = urlParams.has('gclid') ? urlParams.get('gclid') : '';
    data['utm_data'] = utmData;
    setCookie(COOKIE_NAME, JSON.stringify(data), 365);
    return data;
}

function applyFieldConfigs(urlParams) {
    if (commonAccountAndConfigFields.length > 0) {
        for (let i = 0; i < commonAccountAndConfigFields.length; i++) {
            if (!urlParams.has('utm_' + commonAccountAndConfigFields[i])) {
                urlParams.append('utm_' + commonAccountAndConfigFields[i], FIELD_CONFIG_VALUES[commonAccountAndConfigFields[i]]) //getConfigFieldValue()
            }
        }
    }
    return urlParams;
}

function getConfigFieldValue(field) {
    let value = SEARCH_ENGINES.includes(referralDomain) ?
        fieldConfigs['settings'][field]['when_referrer'] :
        fieldConfigs['settings'][field]['when_not_referrer'];
    if (value == 'search_engine') return referralDomain;
    if (value == 'url_slug') return new URL(LANDING_PAGE).pathname;
    return value;

}

function getTimeStamp() {
    let date = new Date();
    return date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
}

function setConvertingUtmData(data, urlParams) {
    data = getUtmConvertingData(data, urlParams, 'converting')
    return data;
}

function setOriginalUtmData(urlParams) {
    let cookiesData = getCookie(COOKIE_NAME);
    let data = {};
    if (cookiesData) {
        cookiesData = JSON.parse(cookiesData);
        data = cookiesData.utm_data;
    } else if (utm_data) {
        data = utm_data
    }
    data = getUtmOriginalData(data, urlParams, 'original');
    return data;
}

function getUtmOriginalData(data, urlParams, prefix) { //prefix would be original
    if (utm_data) {
        if (isFieldSetEmpty(data, 'original')) //check old original field set is empty
        {
            if (!isFieldSetEmpty(data, 'converting')) //check old converting field set is empty if empty then true
            {
                for (let i = 0; i < account_fields.length; i++) {
                    if (account_fields[i].name === 'timestamp')
                        data[prefix + '_' + account_fields[i].name] = data['converting_timestamp'];
                    else if (account_fields[i].name === 'landing_page')
                        data[prefix + '_' + account_fields[i].name] = data['converting_landing_page'];
                    else if (account_fields[i].name === 'referrer') ;
                    else if (account_fields[i].name === 'gclid') {
                        const convertingLandingPage = new URLSearchParams(data['converting_landing_page'])
                        data['gclid'] = convertingLandingPage.has('gclid') ? convertingLandingPage.get('gclid') : ''
                    } else
                        data[prefix + '_' + account_fields[i].name] = data['converting_' + account_fields[i].name.toLowerCase()] ? data['converting_' + account_fields[i].name.toLowerCase()] : '';

                }

            } else {
                for (let i = 0; i < account_fields.length; i++) {
                    if (account_fields[i].name === 'timestamp')
                        data[prefix + '_' + account_fields[i].name] = getTimeStamp();
                    else if (account_fields[i].name === 'landing_page')
                        data[prefix + '_' + account_fields[i].name] = LANDING_PAGE;
                    else if (account_fields[i].name === 'gclid')
                        data[account_fields[i].name] = urlParams.has('gclid') ? urlParams.get('gclid') : '';
                    else if (account_fields[i].name === 'referrer') ;
                    else
                        data[prefix + '_' + account_fields[i].name] = urlParams.has('utm_' + account_fields[i].name.toLowerCase()) ? urlParams.get('utm_' + account_fields[i].name.toLowerCase()) : '';
                }
            }
        }
    } else {
        for (let i = 0; i < account_fields.length; i++) {
            if (account_fields[i].name === 'timestamp')
                data[prefix + '_' + account_fields[i].name] = getTimeStamp();
            else if (account_fields[i].name === 'landing_page')
                data[prefix + '_' + account_fields[i].name] = LANDING_PAGE;
            else if (account_fields[i].name === 'gclid')
                data[account_fields[i].name] = urlParams.has('gclid') ? urlParams.get('gclid') : '';
            else if (account_fields[i].name === 'referrer') ;
            else
                data[prefix + '_' + account_fields[i].name] = urlParams.has('utm_' + account_fields[i].name.toLowerCase()) ? urlParams.get('utm_' + account_fields[i].name.toLowerCase()) : '';
        }
    }
    return data;
}

function isFieldSetEmpty(data, prefix) {
    let status = true;
    for (let i = 0; i < account_fields.length; i++) {
        if (data[prefix + '_' + account_fields[i].name])
            status = false;
    }
    return status;
}

function getUtmConvertingData(data, urlParams, prefix) {//prefix would be converting
    filterFields(data);
    for (let i = 0; i < account_fields.length; i++) {
        if (account_fields[i].name === 'timestamp')
            data[prefix + '_' + account_fields[i].name] = getTimeStamp();
        else if (account_fields[i].name === 'landing_page')
            data[prefix + '_' + account_fields[i].name] = LANDING_PAGE;
        else if (account_fields[i].name === 'referrer')
            data[prefix + '_' + account_fields[i].name] = document.referrer;
        else if (account_fields[i].name === 'gclid') ;
        else
            data[prefix + '_' + account_fields[i].name] = urlParams.has('utm_' + account_fields[i].name.toLowerCase()) ? urlParams.get('utm_' + account_fields[i].name.toLowerCase()) : '';
    }
    return data;
}

function filterFields(data) {
    Object.keys(data).forEach(function (key) {
        if (key.split('_')[0] === 'converting') {
            if (!(key === 'converting_timestamp' || key === 'converting_landing_page' || key === 'converting_referrer')) {
                if (!isKeyExist(account_fields, key.split('_')[1]))
                    delete data[key];
            }
        }
    });
}

function isKeyExist(obj, searchKey) {
    let status = false;
    Object.keys(obj).forEach(function (key) {
        if (obj[key].name === searchKey)
            status = true;
    });
    return status;
}

function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEQ) == 0) {
            return c.substring(nameEQ.length, c.length);
        }
    }
    return null;
}

function setCookie(name, value, exdays) {
    let date = new Date();
    date.setTime(date.getTime() + (1 * 24 * 60 * 60 * 1000)); // changed to hardcoded 24h = 1 day
    let expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/; ";//secure; HttpOnly;
}

function fingerprint2() {
    Fingerprint2.get(function (components) {
        components = components.filter(function (component) {
            return FP_OPTIONS.includes(component.key)
        })
        let values = components.map(function (component) {
            return component.value
        })
        fingerPrint = Fingerprint2.x64hash128(values.join(''), 31)
        getDataFromServer()
    })
}

function loadScript(url, callback) {
    let script = document.createElement("script")
    script.type = "text/javascript";

    if (script.readyState) { //IE
        script.onreadystatechange = function () {
            if (script.readyState == "loaded" || script.readyState == "complete") {
                script.onreadystatechange = null;
                callback();
            }
        };
    } else { //Others
        script.onload = function () {
            callback();
        };
        script.unload = function () {
            callback();
        };
    }
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
}

function detectIEEdge() {
    let ua = window.navigator.userAgent;

    let msie = ua.indexOf('MSIE ');
    if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    let trident = ua.indexOf('Trident/');
    if (trident > 0) {
        // IE 11 => return version number
        let rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }

    let edge = ua.indexOf('Edge/');
    if (edge > 0) {
        // Edge => return version number
        return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }

    // other browser
    return false;
}
