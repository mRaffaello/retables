export const generateRandomString = (length: number) => {
    var chars = 'abcdefghijklmnopqrstuvwxyz';
    var charLength = chars.length;
    var result = '';
    for (var i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * charLength));
    }
    return result;
};
