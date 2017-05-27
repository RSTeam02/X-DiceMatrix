require.config({
    paths: {
        "jquery": "https://code.jquery.com/jquery-1.11.1.min"
    }
});


define(["../testworker/test","jquery","../mvc/controller", "../mvc/view"], function () {
    
    new Controller();
});