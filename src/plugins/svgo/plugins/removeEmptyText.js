export const type = 'perItem';

export const active = true;

export const description = 'removes empty <text> elements';

export const params = {
    text: true,
    tspan: true,
    tref: true
};

/**
 * Remove empty Text elements.
 *
 * @see http://www.w3.org/TR/SVG/text.html
 *
 * @example
 * Remove empty text element:
 * <text/>
 *
 * Remove empty tspan element:
 * <tspan/>
 *
 * Remove tref with empty xlink:href attribute:
 * <tref xlink:href=""/>
 *
 * @param {Object} item current iteration item
 * @param {Object} params plugin params
 * @return {Boolean} if false, item will be filtered out
 *
 * @author Kir Belevich
 */
export const fn = function(item, params) {

    // Remove empty text element
    if (
        params.text &&
        item.isElem('text') &&
        item.isEmpty()
    ) return false;

    // Remove empty tspan element
    if (
        params.tspan &&
        item.isElem('tspan') &&
        item.isEmpty()
    ) return false;

    // Remove tref with empty xlink:href attribute
    if (
        params.tref &&
        item.isElem('tref') &&
        !item.hasAttrLocal('href')
    ) return false;

};