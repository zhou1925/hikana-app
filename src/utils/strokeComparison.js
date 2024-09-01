export function compareStrokes(userCanvas, referenceCanvas) {
  const userCtx = userCanvas.getContext('2d');
  const referenceCtx = referenceCanvas.getContext('2d');
  
  const userImageData = userCtx.getImageData(0, 0, userCanvas.width, userCanvas.height);
  const referenceImageData = referenceCtx.getImageData(0, 0, referenceCanvas.width, referenceCanvas.height);
  
  let matchingPixels = 0;
  let userPixels = 0;
  let referencePixels = 0;
  
  for (let i = 0; i < userImageData.data.length; i += 4) {
    const userPixel = userImageData.data[i] + userImageData.data[i+1] + userImageData.data[i+2] > 0;
    const referencePixel = referenceImageData.data[i] + referenceImageData.data[i+1] + referenceImageData.data[i+2] > 0;
    
    if (userPixel) userPixels++;
    if (referencePixel) referencePixels++;
    if (userPixel && referencePixel) matchingPixels++;
  }
  
  const userCoverage = matchingPixels / referencePixels;
  const referenceCoverage = matchingPixels / userPixels;
  
  
  return (userCoverage + referenceCoverage) / 2;
}