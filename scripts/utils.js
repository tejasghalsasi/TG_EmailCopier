
Array.prototype.first = function () {
    return this[0];
}

/**
 *
 * @param {string} value
 * @returns {Boolean}
 */
let empty = value => {
    return value === undefined || value === null || value === '' || ['Null', 'NULL', '', 'null'].indexOf(value) > -1
        ? true
        : false;
}

/**
 *
 * @param {Array} array
 * @returns {Boolean}
 */
let emptyArray = array => {
    return array !== undefined || array instanceof Array || array.length > 0
        ? true
        : false;
}

/**
 *
 * @param {string} str
 */
const copyToClipboard = str => {
    const el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document
        .body
        .appendChild(el);
    const selected = document
        .getSelection()
        .rangeCount > 0
        ? document
            .getSelection()
            .getRangeAt(0)
        : false;
    el.select();
    document.execCommand('copy');
    document
        .body
        .removeChild(el);
    if (selected) {
        document
            .getSelection()
            .removeAllRanges();
        document
            .getSelection()
            .addRange(selected);
    }
};

/**
 * Class
 */

class EmailExtractor {

    constructor(text) {

        this.text = text;
        this.emails = EmailExtractor.getEmails(text);
        this.emailDomains = this
            .emails
            .map(email => EmailExtractor.getEmailDomain(email));
        this.uniqueEmails = Array.from(new Set(this.emails));
        this.uniqueEmailDomains = Array.from(new Set(this.emailDomains));
    }
    getEmails() {
        return this.emails;
    }
    getUniqueEmails() {
        return this.uniqueEmails;
    }
    getEmailsDomains() {
        return this.emailDomains;
    }
    getEmailsCount() {
        return this.emails.length;
    }
    getEmailsDomainsCount() {
        return this.emailDomains.length;
    }
    getUniqueEmailsCount() {
        return this.uniqueEmails.length;
    }
    getUniqueEmailsDomainsCount() {
        return this.uniqueEmailDomains.length;
    }
    static findEmails(text) {

        const reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
        return empty(text)
            ? []
            : text
                .toLowerCase()
                .match(reg);
    }
    static getEmails(text) {

        const emails = EmailExtractor.findEmails(text);
        return emails;
    }
    static getUniqueEmails(text) {
        const emails = EmailExtractor.getEmails(text);
        return Array.from(new Set(emails));
    }
    static getEmailsDomains(text) {

        const emails = EmailExtractor.getEmails(text);
        return emails.map(email => EmailExtractor.getEmailDomain(emails));
    }
    static getEmailDomain(email) {

        return empty(email)
            ? ''
            : email.replace(/.*@/, "");
    }
    static getUniqueEmailsDomains(text) {
        const emails = EmailExtractor.getEmailsDomains(text);
        return Array.from(new Set(emails));
    }
}