/*

        wrap code block to check if form is valid
        if ($("#element").simpleValidation(){
            ...
        }
        does not actually have to be a form... just any element that has form fields in it

        in Russia field validates you...

        Add the Required attribute to any field and it will be checked
        Use the data-message="custom error message" to override the default "Required"
        Use the data-match-id="#someId" to compare the value to another field (think passwords)
        Add an corresponding element with the .validation-error class for outputting the error message

*/

(function ($) {
    $.fn.simpleValidation = function () {

        $(".validation-error").html("");

        var formContainer = $(this);
        //find every field that has the required attr 
        var fields = $(formContainer).find("input[required],select[required]");
        var shouldAllowPost = true;

   
        $.each(fields, function (key, value) {
            
            var errorMessage = $(value)[0].hasAttribute("data-message") ? $(value).attr("data-message")  : "Required";

            if (!$(value)[0].hasAttribute("data-match-id")) {
                //no match field so just do a validity check !='' or !=-1
                if ($(value).val().length === 0 | $(value).val() ==-1) {
                    $(value).parent().find(".validation-error").html(errorMessage);
                    shouldAllowPost = false;
                }
            }
            else {
                //if there's a data-match-id then this field should be checked for a value 
                //and compare the value to the other field'
                var otherField = $(formContainer).find($(value).attr("data-match-id"));

                var otherFieldVal = $(otherField).val();

                if ($(value).val().length === 0 || $(value).val() != otherFieldVal) {
                    $(value).parent().find(".validation-error").html(errorMessage);
                    shouldAllowPost = false;
                }
            }

        });

        return shouldAllowPost;
    };
})(jQuery);