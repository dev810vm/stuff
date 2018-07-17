
 


(function (win) {
 

    if (!win.Filter) {

        //private

        var fieldArray = [];
        var row;

        //public
        win.Filter = {
            "init": function (rowElement, searchElements) {
                row = rowElement;
                fieldArray = searchElements;
            },
            "search": function (searchText) {
                if (searchText == "") {
                    $(row).show();
                } else {

                    $(row).each(function (index, rowElement) {

                        var found = false;
                        fieldArray.forEach(function (id) {

                            $(rowElement).find(id).each(function (i, e) {

                                var text = $(e).text();
                                if (text.toLowerCase().includes(searchText.toLowerCase())) {
                                    found = true;
                                }
                            });

                        });

                        if (!found) {
                            $(rowElement).hide();
                        }

                    });

                }
            }
        };
    }
})(window);
