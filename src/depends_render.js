function setupDependsOn(form) {
    let processedElements = [];
    $('[dependson_code]').each(function (e) {
        let fieldInfo = getFieldInformation($(this));
        if (!processedBefore(fieldInfo.field_wrapper.get(0), processedElements)) {
            processedElements.push(fieldInfo.field_wrapper.get(0));
            fieldInfo.field_wrapper.css('display', 'none');
            //console.log(fieldInfo.field_wrapper);
            //console.log("processing " + fieldInfo.name);
            let bits = fieldInfo.dependson_code.split(':');
            let dependson_option_type = bits.shift();
            let dependson_field_name = bits.shift();
            let dependson_option_value = bits.shift();
            let dependson_state = bits.length > 0 ? bits.shift() : "";
            if (dependson_option_type == 'select') {
                let select_box = $('select[id=' + dependson_field_name + ']').first();
                if (select_box) {
                    //console.log(select_box);
                    let handler = function (e) {
                        let selected = select_box.children("option:selected").val();
                        if (selected == dependson_option_value) {
                            availableToggle(fieldInfo,true);
                        } else {
                            availableToggle(fieldInfo,false);
                        }
                    };
                    handler();
                    select_box.change(handler);
                }
            } else if (dependson_option_type == 'checkbox-group') {
                let checkboxes = $('input[type=checkbox][name="' + dependson_field_name + '[]"]');
                let handler = function (e) {
                    checkboxes.each(function () {
                        if ($(this).val() == dependson_option_value) {
                            if ($(this).prop('checked') == (dependson_state == 'checked')) {
                                availableToggle(fieldInfo,true);
                            } else {
                                availableToggle(fieldInfo,false);
                            }
                        }
                    });
                };
                handler();
                checkboxes.each(function () {
                    $(this).click(handler);
                })
                //console.log(checkboxes);
            } else if (dependson_option_type == 'radio-group') {
                let radiobutton = $('input[type=radio][name="' + dependson_field_name + '"]');
                //console.log(radiobutton);
                let handler = function (e) {
                    let checked_button = $('input[type=radio][name="' + dependson_field_name + '"]:checked');
                    //console.log("checking out " + checked_button.val());
                    if (checked_button.val() == dependson_option_value) {
                        availableToggle(fieldInfo,true);
                    } else {
                        availableToggle(fieldInfo,false);
                    }
                };
                handler();
                radiobutton.change(handler);
            }
        }
    });
}

function availableToggle(fieldInfo,available) {
    if(available) {
        fieldInfo.field_wrapper.slideDown('slow', 'swing');
        if(fieldInfo.field.attr('type') == 'checkbox' || fieldInfo.field.attr('type') == 'radio') {
            // this will be group, we need to disable/enable all
            $('input[name="'+fieldInfo.field.attr('name')+'"]').each(function() {
                $(this).prop('disabled', false);
            })
        } else {
            fieldInfo.field.prop('disabled', false);
        }
    } else {
        fieldInfo.field_wrapper.slideUp('slow', 'swing');
        if(fieldInfo.field.attr('type') == 'checkbox' || fieldInfo.field.attr('type') == 'radio') {
            // this will be group, we need to disable/enable all
            $('input[name="'+fieldInfo.field.attr('name')+'"]').each(function() {
                $(this).prop('disabled', true);
            })
        } else {
            fieldInfo.field.prop('disabled', true);
        }
    }

}

function getFieldInformation(field) {
    //console.log(field);
    let info = {
        field: field,
        name: field.attr('name'),
        dependson_code: field.attr('dependson_code')
    };
    if (field.is('p')) {
        info.field_wrapper = info.field.parent();
    } else {
        info.field_wrapper = info.field.closest('.form-group');
        info.field_type = info.field_wrapper.attr('class').match(/formbuilder-([^\s]+)/)[1];
        //console.log(info);
        //info.field_name = info.field_wrapper.attr('class').match(new RegExp('field-' + info.field_type + '-([^\\s]+)'))[1];
    }
    //console.log(info);
    return info;
}

function processedBefore(field, processedElements) {
    for (let i = 0; i < processedElements.length; i++) {
        if (field === processedElements[i]) {
            //console.log("NOT DOING IT AGAIN");
            return true;
        }
    }
    return false;
}