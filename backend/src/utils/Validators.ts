const validateGUID = (guid: string,): boolean => {
    const validate = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;
    if (!validate.test(guid)) {
        return false;
    }
    return true;
}

const checkSpecialChars = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

export { validateGUID, checkSpecialChars };