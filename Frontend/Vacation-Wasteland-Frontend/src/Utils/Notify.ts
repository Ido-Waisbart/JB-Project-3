import { Notyf } from "notyf"; // npm i notyf

class Notify {

    private notyf = new Notyf({
        position: { x: "center", y: "top" },
        duration: 3000,
        dismissible: true,
        ripple: true,  // Ripple = אדווה = גל קטן
        types: [
            {
                type: 'info',
                background: 'blue',
                icon: false
            }
        ]
    });

    public success(message: string): void {
        this.notyf.success(message);
    }

    public info(title: string, message?: string) {
        this.notyf.open({
            type: 'info',
            message: title + " " + message,
        })
    }

    public warn(title: string, message?: string) {
        this.notyf.open({
            type: 'warn',
            message: title + " " + message,
        })
    }

    public error(err: any): void {
        const message = this.extractErrorMessage(err);
        this.notyf.error(message);
    }

    private extractErrorMessage(err: any): string {
        if (typeof err === "string") return err; // String error.
        if (typeof err?.response?.data === "string") return err.response.data; // Axios error
        if (typeof err?.response?.data?.message === "string") return err.response.data.message;
        if (typeof err?.message === "string") return err.message; // throw new Error("...")
        return "Some error, please try again.";
    }

}

export const notify = new Notify();
