/**
 * Item class implements the item service 
 */


var item = {

    init: function () {
        this.cacheDom();
        this.hideAll();
        this.SetEditControls();
        this.isCategoryExists();
        this.bindEvents();
    },

    cacheDom: function () {
        this.$storeItemsView = $('#store-items');
        this.$emptyCategoriesView = $('#message-default');
        this.$addCategoriesView = $('#add-new-category');
        this.$emptyItemsView = $('#no-items-default');
        this.$addItemView = $('#add-new-item');
        this.$addCategoryButton = $('.add-category');
        this.$addItemButton = $('.add-item')
        this.$addCategoryForm = $('form[name=add-category-form]');
        this.$addItemForm = $('form[name=add-item-form]');
        this.$addCategoryButton = $('.save-category');
        this.$saveItemButton = $('.save-item');

        this.$itemId = $('.data-edit').attr('data-id');
        this.$editSummaryButton = $('.edit-summary');
        this.$editItemSummaryView = $('.pmbb-view-' + this.$itemId);
        this.$editItemSummaryControls = $('.pmbb-edit-' + this.$itemId);

        this.$editInfoButton = $('.edit-info');
        this.$editInformationView = $('.pmbb-view-desc-' + this.$itemId);
        this.$editInformationControls = $('.pmbb-edit-desc-' + this.$itemId);

        this.$saveSummary = $('.save-summary-' + this.$itemId);
        this.$cancelSummary = $('.cancel-summary-' + this.$itemId);

        this.$saveInfo = $('.save-info-' + this.$itemId);
        this.$cancelInfo = $('.cancel-info-' + this.$itemId);

        this.$input = this.$addCategoryForm.find('input');
        this.$inputItemForm = this.$addItemForm.find('input');

        this._form = document.forms.namedItem('add-category-form');
        this._AddItemForm = document.forms.namedItem('add-item-form');
        this._updateItemForm = document.forms.namedItem('update-item-info');

        
    },

    isCategoryExists: function () {

        CartegoryService.AnyGroupExists().then(function (response) {

            if (response.status == true) {

                ItemService.AnyItemExists().then(function (_response) {
                    if (_response.status == true) {
                        item.hideAll();
                        item.$storeItemsView.show();
                    } else {
                        item.hideAll();
                        item.$emptyItemsView.show();
                    }
                })

            } else {
                item.hideAll();
                item.$emptyCategoriesView.show();
            }
        })
    },

    bindEvents: function () {
        this.$addCategoryButton.on('click', this.showAddCategoryView.bind(this));
        this.$addItemButton.on('click', this.showAddItemView.bind(this));

        if (this._form) {
            this._form.addEventListener('submit', this.addCategory.bind(this), false);
        }
        if (this._AddItemForm) {
            this._AddItemForm.addEventListener('submit', this.addItem.bind(this), false);

        }
        this.$editSummaryButton.on('click', this.showEditItemSummary.bind(this));
        this.$saveSummary.on('click', this.updateItem.bind(this));
        this.$cancelSummary.on('click', this.cancelEditItemSummary.bind(this));

        this.$editInfoButton.on('click', this.showEditInformation.bind(this));
        this.$cancelInfo.on('click', this.cancelEditInformation.bind(this));
        this.$saveInfo.on('click', this.updateItemInfo.bind(this));


    },

    addCategory: function (e) {
        e.preventDefault();

        item.$saveCategoryButton.html('please wait..')
        var _formData = new FormData(this._form);

        var _request = new XMLHttpRequest();
        _request.open("POST", document.location.origin + "/admin/addCategory", true);
        _request.onload = function (response) {
            if (_request.status == 200) {
                item.$saveCategoryButton.html('save category');
                item.$input.val('');
                alert('successfully added a new category')

            } else {
                alert('Error: ' + _request.status + '. unable to save category')
                item.$saveCategoryButton.html('save category');
            }
        }

        _request.send(_formData);
    },

    addItem: function (e) {
        e.preventDefault();

        item.$saveItemButton.html('please wait..')
        var _formData = new FormData(this._AddItemForm);

        var _request = new XMLHttpRequest();
        _request.open("POST", document.location.origin + "/admin/addItem", true);
        _request.onload = function (response) {
            if (_request.status == 200) {
                item.$saveItemButton.html('save item');
                item.$inputItemForm.val('');
                alert('successfully added a new item')

            } else {
                alert('Error: ' + _request.status + '. unable to save item')
                item.$saveItemButton.html('save category');
            }
        }

        _request.send(_formData);

    },

    updateItem: function () {
        var itemUpdating = {
            itemId: this.$itemId,
            description: $('.item-description').val(),
            name: $('input[name=name]').val(),
            price: $('input[name=price]').val(),
            quantity: $('input[name=quantity]').val()
        }
        this.$saveSummary.html('please wait...');

        $.ajax({
            url: document.location.origin + '/items/update',
            type: 'PUT',
            data : itemUpdating
        }).done(function (response) {
            alert('successfully updated ');
            this.$saveSummary.html('<i class="zmdi zmdi-check"></i> save');
            item.showEditItemSummary();

        }).error(function (err) {
            alert('unable to update');
            console.log(err);
            this.$saveSummary.html('<i class="zmdi zmdi-check"></i> save');
        })
    },

    updateItemInfo: function (e) {
        e.preventDefault();

        var itemUpdating = {
            itemId: this.$itemId,
            description: $('.item-description').val(),
            name: $('input[name=name]').val(),
            price: $('input[name=price]').val(),
            quantity: $('input[name=quantity]').val(),
            image: document.forms['update-item-info']['Image'].files[0]
        }

        item.$saveInfo.html('please wait..')
        var _formData = new FormData();

        for (var key in itemUpdating) {
            _formData.append(key, itemUpdating[key]);
        }

        var _request = new XMLHttpRequest();
        _request.open("PUT", document.location.origin + "/items/update", true);
        _request.onload = function (response) {
            if (_request.status == 200) {
                item.$saveInfo.html('save');
                alert('successfully updated')

            } else {
                alert('Error: ' + _request.status + '. unable to update item')
                item.$saveInfo.html('save');
            }
        }

        _request.send(_formData);
    },

    removeItem: function () {

    },

    hideAll: function () {
        this.$storeItemsView.hide();
        this.$emptyCategoriesView.hide();
        this.$addCategoriesView.hide();
        this.$emptyItemsView.hide();
        this.$addItemView.hide();
    },

    showAddCategoryView: function () {
        this.hideAll();
        this.$addCategoriesView.fadeIn();
    },

    showAddItemView: function () {
        this.hideAll();
        this.$addItemView.fadeIn();
    },

    showEditItemSummary: function () {      
        this.$editItemSummaryView.hide();
        this.$editItemSummaryControls.show();
    },

    showEditInformation: function () {
        this.$editInformationView.hide();
        this.$editInformationControls.show();
    },

    cancelEditItemSummary : function(){
        this.$editItemSummaryView.show();
        this.$editItemSummaryControls.hide();
    },

    cancelEditInformation: function () {
        this.$editInformationView.show();
        this.$editInformationControls.hide();
    },

    SetEditControls: function () {       
        $('.pmbb-edit').hide();
        $('.pmbb-view').show();

        item.$editInformationView.show();
        item.$editInformationControls.hide();
    }

}
item.init();

