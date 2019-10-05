export const type = 'perItem';

export const active = false;

export const description = 'removes <style> element (disabled by default)';

/**
 * Remove <style>.
 *
 * http://www.w3.org/TR/SVG/styling.html#StyleElement
 *
 * @param {Object} item current iteration item
 * @return {Boolean} if false, item will be filtered out
 *
 * @author Betsy Dupuis
 */
export const fn = function(item) {

    return !item.isElem('style');

};
