/**
* Extracted from Domo
*/
var KpiWidthMultiplier = 235;
var KpiHeightMultiplier = 290;
var KpiInfoWidthMultiplier = KpiWidthMultiplier;
var KpiInfoHeightMultiplier = 220;
var KpiPaddingTop = 0; //13;
var KpiPaddingRight = 0; //11;
var KpiPaddingBottom = 0; //15;
var KpiPaddingLeft = 0; //15;
var BadgeMargin = 5; //5;
var KpiFooterHeight = 50;

var KpiSpacingHorz = KpiPaddingLeft + KpiPaddingRight + BadgeMargin*2;
var KpiSpacingVert = KpiPaddingTop + KpiPaddingBottom + BadgeMargin*2;
var KpiSpacingVertContent = KpiPaddingTop + KpiFooterHeight;

function badgeSize(width,height) {
  width *= KpiWidthMultiplier;
  height *= KpiHeightMultiplier;
  return { width:width, height:height };
}

function frameSize(width,height) {
  var dim = badgeSize(width,height);
  dim.width -= KpiSpacingHorz;
  dim.height -= KpiSpacingVert;
  return dim;
}
/**
* End extraction from Domo
*/

function sizeFn(size) {
  size = size.toLowerCase();

  if (size === 'small') {
    return frameSize(1, 0.5);
  } else if (size === 'medium') {
    return frameSize(1, 1);
  } else if (size === 'large') {
    return frameSize(2, 2);
  } else {
    var dimensions = size.split('x').map(Number);
    return frameSize(dimensions[0], dimensions[1]);
  }
}

module.exports = sizeFn;
