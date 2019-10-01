new Vue({ el: '#app1' });
new Vue({ el: '#app2' });


var app3 = new Vue({
    el: '#app3',
    data: {
        counter: 0,
        showResult: true,
        resultClass: 'resultBlockAC',
        msg: 'AC'
    },
    computed: {
        showResultByCt: function () {
            if (this.counter > 0)
                return true
            else
                return false
        },
        resultClassByCt: function () {
            if (this.counter == 2)
                return 'resultBlockWA'
            else
                return 'resultBlockAC'
        },
        msgByCt: function () {
            if (this.counter == 2)
                return 'WA'
            else
                return 'AC'
        }
    }
});