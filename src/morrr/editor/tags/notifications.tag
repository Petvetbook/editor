<notifications>
    <style>
        /* jQuery Growl
 * Copyright 2015 Kevin Sylvestre
 * 1.3.1
 */
        #growls {
            z-index: 9999999;
            position: fixed;
        }
        #growls.default {
            top: 30px;
            right: 0;
            font-family: sans-serif;
            font-size: 14px;
        }
        #growls.tl {
            top: 10px;
            left: 10px;
        }
        #growls.tr {
            top: 10px;
            right: 10px;
        }
        #growls.bl {
            bottom: 10px;
            left: 10px;
        }
        #growls.br {
            bottom: 10px;
            right: 10px;
        }
        #growls.tc {
            top: 10px;
            right: 10px;
            left: 10px;
        }
        #growls.bc {
            bottom: 10px;
            right: 10px;
            left: 10px;
        }
        #growls.bc .growl,
        #growls.tc .growl {
            margin-left: auto;
            margin-right: auto;
        }

        .growl {
            opacity: 0.8;
            filter: alpha(opacity=80);
            position: relative;
            border-radius: 4px;
            -webkit-transition: all 0.2s ease-in-out;
            -moz-transition: all 0.2s ease-in-out;
            transition: all 0.2s ease-in-out;
        }
        .growl.growl-incoming {
            opacity: 0;
            filter: alpha(opacity=0);
        }
        .growl.growl-outgoing {
            opacity: 0;
            filter: alpha(opacity=0);
            transform: translateY(-20px);
        }
        .growl.growl-small {
            width: 200px;
            padding: 5px;
            margin: 5px;
        }
        .growl.growl-medium {
            width: 250px;
            padding: 10px;
            margin: 10px;
        }
        .growl.growl-large {
            width: 300px;
            padding: 15px;
            margin: 15px;
        }
        .growl.growl-default {
            color: #FFF;
            background: rgba(0,0,0,0.8);
        }
        .growl.growl-error {
            color: #FFF;
            background: #DD0000;
        }
        .growl.growl-notice {
            color: #FFF;
            background: green;
        }
        .growl.growl-warning {
            color: #FFF;
            background: orange;
        }
        .growl .growl-close {
            cursor: pointer;
            float: right;
            font-size: 14px;
            line-height: 14px;
            font-weight: normal;
            font-family: helvetica, verdana, sans-serif;
        }
        .growl .growl-title {
            font-size: 14px;
            line-height: 18px;
            display: none;
        }
        .growl .growl-message {
            font-size: 12px;
            line-height: 16px;
            letter-spacing: 0.05em;
            -webkit-font-smoothing: 'antialiased';
        }

    </style>
    <span></span>
    <script>
        this.on("default", function (message) {
            $.growl({message: message});
        });
        this.on("notice", function (message) {
            $.growl.notice({message: message});
        });
        this.on("error", function (message) {
            $.growl.error({message: message});
        });
        this.on("warning", function (message) {
            $.growl.warning({message: message});
        });
    </script>
</notifications>
