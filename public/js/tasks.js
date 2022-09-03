$(document).ready(function () {
    $("#psichi").click(function () {
        $("#tired").hide();
        $("#oldsHead").hide();
        $("#olds").hide();
        $("#jobs").show();
        $("#selectJob").show();
    });

    $("#tired").click(function () {
        $("#psichi").hide();
        $("#oldsHead").hide();
        $("#olds").hide();
        $("#jobs").show();
        $("#selectJob").show();
    });

    $("#olds").click(function () {
        $("#psichi").hide();
        $("#tiredHead").hide();
        $("#tired").hide();
        $("#jobs").show();
        $("#selectJob").show();
    });

    $("#nurse").click(function () {
        $("#nurseJobs").show();
        $("#sanitarJobs").hide();
        $("#cleanJobs").hide();
    });

    $("#sanitar").click(function () {
        $("#sanitarJobs").show();
        $("#nurseJobs").hide();
        $("#cleanJobs").hide();
    });

    $("#clean").click(function () {
        $("#cleanJobs").show();
        $("#nurseJobs").hide();
        $("#sanitarJobs").hide();

    });





    $("#reload").click(function () {
        location.reload(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });



});