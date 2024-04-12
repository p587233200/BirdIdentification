import { defineStore } from 'pinia';

export const useAlertStore = defineStore({
    id: 'alert',
    state: () => ({
        text: '',
        show: false,
        type: 'success',
    }),
    actions: {
        callAlert(text, type = 'success') {
            this.type = type;
            this.text = text;
            this.show = true;
            setTimeout(() => {
                this.type = 'success';
                this.show = false;
                this.text = '';
            }, 2000);
        },
    },
});
