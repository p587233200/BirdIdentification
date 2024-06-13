import { defineStore } from 'pinia';

export const useAlertStore = defineStore({
    id: 'alert',
    state: () => ({
        text: '',
        show: false,
        title:'',
        type: 'success',
    }),
    actions: {
        callAlert(text,title, type = 'success') {
            this.type = type;
            this.title=title;
            this.text = text;
            this.show = true;
            setTimeout(() => {
                this.type = 'success';
                this.show = false;
                this.text = '';
                this.title='';
            }, 3000);
        },
    },
});
