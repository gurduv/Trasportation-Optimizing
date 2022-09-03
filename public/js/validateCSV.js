$(document).ready
$(function () {
        $('#registervalidation').bootstrapValidator({
            message: 'This value is not valid',
            fields: {
                shifts: {
                    validators: {
                        file: {
                            extension: 'csv',
                            message: 'Please upload a .csv file'
                        },
                        notEmpty: {
                            message: 'Please select shift File'
                        }
                    }
                },
            }
        });

    });