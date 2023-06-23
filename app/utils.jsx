import _ from 'lodash';

export const titleize = (slug) => {
	var words = slug.split("-");
	return _.map(words, (word) => {
		return word.charAt(0).toUpperCase() + word.substring(1).toLowerCase();
	}).join(' ');
}

export const slugify = (title) => {

    var slug = title.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'');
    return slug;

}

/* eslint-disable max-len */
export const Formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'CAD',
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 2, // (causes 2500.99 to be printed as $2,501)
});