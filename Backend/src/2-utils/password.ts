class PasswordStrength {

    public isStrong(password: string): boolean {

        if (password.length < 8) return false;

        const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const lower = "abcdefghijklmnopqrstuvwxyz";
        const digits = "0123456789";
        let isUpper = false;
        let isLower = false;
        let isDigit = false;
        let isSpecial = false;
        let totalGroups = 0;

        for (const ch of password) {
            if (upper.includes(ch)) isUpper = true;
            else if (lower.includes(ch)) isLower = true;
            else if (digits.includes(ch)) isDigit = true;
            else isSpecial = true;
        }

        if (isUpper) totalGroups++;
        if (isLower) totalGroups++;
        if (isDigit) totalGroups++;
        if (isSpecial) totalGroups++;

        return totalGroups >= 3;
    }

}

export const passwordStrength = new PasswordStrength();
