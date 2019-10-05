export const type = 'perItem';

export const active = true;

export const description = 'removes elements in <defs> without id';

var nonRendering = require('./_collections').elemsGroups.nonRendering;

/**
 * Removes content of defs and properties that aren't rendered directly without ids.
 *
 * @param {Object} item current iteration item
 * @return {Boolean} if false, item will be filtered out
 *
 * @author Lev Solntsev
 */
export const fn = function(item) {

    if (item.isElem('defs')) {

        if (item.content) {
            item.content = getUsefulItems(item, []);
        }
        
        if (item.isEmpty()) return false;

    } else if (item.isElem(nonRendering) && !item.hasAttr('id')) {

        return false;

    }

};

function getUsefulItems(item, usefulItems) {

    item.content.forEach(function(child) {
        if (child.hasAttr('id') || child.isElem('style')) {

            usefulItems.push(child);
            child.parentNode = item;

        } else if (!child.isEmpty()) {

            child.content = getUsefulItems(child, usefulItems);

        }
    });

    return usefulItems;
}
