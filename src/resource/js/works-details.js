import '../css/works-details.scss';

const detailsJicTpl = require('../tpl/item-details-jic.tpl');
const detailsListTpl = require('../tpl/item-details-list.tpl');
const detailsQlnewsTpl = require('../tpl/item-details-qlnews.tpl');
const detailsFjianTpl = require('../tpl/item-details-fjian.tpl');

const util = require("./common/util.js")


// $(".details-jic").html(detailsJicTpl(res.data));
// $(".details-list").html(detailsListTpl(res.data));
// $(".details-qlnews").html(detailsQlnewsTpl(res.data));
// $(".details-fjian").html(detailsFjianTpl(res.data));

function bindEvents(){
	var $doc = $(document);
}
function init(){
	bindEvents();
}
init();